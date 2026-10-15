<?php
/**
 * Southbound Band Website - Production Admin REST API
 * Self-contained PHP backend for client web hosting
 * 
 * Supports:
 * - JWT-style HMAC token authentication
 * - Content persistence to /data/content.json with automated backups
 * - Secure direct file uploads for Audio (.mp3, .wav) and Gallery Photos (.jpg, .png, .webp)
 * - Safe file deletion within designated media folders
 * - Password modification
 */

define('SOUTHBOUND_ADMIN_SECURE', true);

// Enable error logging while keeping output clean for JSON responses
ini_set('display_errors', '0');
error_reporting(E_ALL);

// Set CORS and JSON Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'preflight_ok']);
    exit;
}

// Locate Project Directories
$apiDir = __DIR__;
$publicDir = dirname(__DIR__); // Assuming /api is inside /public or webroot
$rootDir = dirname($publicDir); // Project root if /public exists

// Locate data/content.json
$contentFile = null;
$possibleDataPaths = [
    $publicDir . '/data/content.json',
    $apiDir . '/../data/content.json',
    $rootDir . '/public/data/content.json',
    $rootDir . '/data/content.json'
];

foreach ($possibleDataPaths as $path) {
    if (file_exists($path)) {
        $contentFile = realpath($path);
        break;
    }
}
if (!$contentFile) {
    $contentFile = $publicDir . '/data/content.json';
    $dataDir = dirname($contentFile);
    if (!is_dir($dataDir)) {
        @mkdir($dataDir, 0755, true);
    }
}

// Media storage directories
$audioDir = $publicDir . '/assets/audio';
if (!is_dir($audioDir)) {
    @mkdir($audioDir, 0755, true);
}

$galleryDir = $publicDir . '/assets/gallery';
if (!is_dir($galleryDir)) {
    @mkdir($galleryDir, 0755, true);
}

// Load or Initialize Config
$configFile = $apiDir . '/admin-config.php';
if (!file_exists($configFile)) {
    $defaultConfig = [
        'username' => 'admin',
        'default_password' => 'Southbound2026!',
        'password_hash' => '',
        'jwt_secret' => bin2hex(random_bytes(16)),
        'session_duration' => 604800
    ];
    file_put_contents($configFile, "<?php\ndefined('SOUTHBOUND_ADMIN_SECURE') or die('Direct access forbidden.');\nreturn " . var_export($defaultConfig, true) . ";\n");
}

$config = include $configFile;

// Helper: Response Formatter
function send_response($success, $data = [], $statusCode = 200) {
    http_response_code($statusCode);
    $response = array_merge(['success' => $success], $data);
    echo json_encode($response, JSON_UNESCAPED_SLASHES);
    exit;
}

// Helper: Token Generator (HMAC-SHA256)
function generate_token($username, $config, $remember = false) {
    $ttl = $remember ? (86400 * 30) : ($config['session_duration'] ?? 86400);
    $issuedAt = time();
    $expiresAt = $issuedAt + $ttl;
    
    $payload = [
        'sub' => $username,
        'iat' => $issuedAt,
        'exp' => $expiresAt
    ];
    
    $headerB64 = rtrim(strtr(base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT'])), '+/', '-_'), '=');
    $payloadB64 = rtrim(strtr(base64_encode(json_encode($payload)), '+/', '-_'), '=');
    $signature = hash_hmac('sha256', "$headerB64.$payloadB64", $config['jwt_secret'], true);
    $sigB64 = rtrim(strtr(base64_encode($signature), '+/', '-_'), '=');
    
    return [
        'token' => "$headerB64.$payloadB64.$sigB64",
        'expires' => $expiresAt
    ];
}

// Helper: Token Validator
function authenticate_token($config) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (!$authHeader && function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }

    if (!preg_match('/Bearer\s(\S+)/i', $authHeader, $matches)) {
        return null;
    }

    $token = $matches[1];
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return null;
    }

    list($headerB64, $payloadB64, $sigB64) = $parts;
    
    $expectedSig = hash_hmac('sha256', "$headerB64.$payloadB64", $config['jwt_secret'], true);
    $expectedSigB64 = rtrim(strtr(base64_encode($expectedSig), '+/', '-_'), '=');

    if (!hash_equals($expectedSigB64, $sigB64)) {
        return null;
    }

    $payloadJson = base64_decode(strtr($payloadB64, '-_', '+/'));
    $payload = json_decode($payloadJson, true);

    if (!$payload || !isset($payload['exp']) || $payload['exp'] < time()) {
        return null;
    }

    return $payload;
}

// Helper: Password Verification
function verify_admin_password($inputPassword, $config) {
    if (!empty($config['password_hash']) && password_verify($inputPassword, $config['password_hash'])) {
        return true;
    }
    if (isset($config['default_password']) && hash_equals($config['default_password'], $inputPassword)) {
        return true;
    }
    return false;
}

// Helper: Filename Sanitizer
function sanitize_filename($name) {
    $info = pathinfo($name);
    $ext = strtolower($info['extension'] ?? '');
    $filename = preg_replace('/[^a-zA-Z0-9_-]/', '-', $info['filename']);
    $filename = preg_replace('/-+/', '-', $filename);
    $filename = trim($filename, '-');
    if (empty($filename)) {
        $filename = 'upload-' . time();
    }
    return $filename . ($ext ? '.' . $ext : '');
}

// Route Request
$action = $_GET['action'] ?? $_POST['action'] ?? '';

// Parse JSON Body for POST requests
$jsonInput = [];
if ($requestMethod === 'POST' && strpos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false) {
    $rawInput = file_get_contents('php://input');
    $jsonInput = json_decode($rawInput, true) ?: [];
    if (empty($action) && isset($jsonInput['action'])) {
        $action = $jsonInput['action'];
    }
}

// ==============================================================================
// 1. PUBLIC ACTIONS
// ==============================================================================

// Health & Status check
if ($action === 'status') {
    $user = authenticate_token($config);
    send_response(true, [
        'backend' => 'php',
        'version' => '2.0.0',
        'authenticated' => ($user !== null),
        'user' => $user ? $user['sub'] : null,
        'upload_max_filesize' => ini_get('upload_max_filesize'),
        'post_max_size' => ini_get('post_max_size'),
        'content_file_exists' => file_exists($contentFile)
    ]);
}

// Admin Login
if ($action === 'login') {
    $username = trim($jsonInput['username'] ?? $_POST['username'] ?? '');
    $password = trim($jsonInput['password'] ?? $_POST['password'] ?? '');
    $remember = !empty($jsonInput['remember'] ?? $_POST['remember'] ?? false);

    if (empty($username) || empty($password)) {
        send_response(false, ['error' => 'Please provide both username and password.'], 400);
    }

    if (hash_equals($config['username'], $username) && verify_admin_password($password, $config)) {
        $tokenData = generate_token($username, $config, $remember);
        send_response(true, [
            'message' => 'Login successful',
            'token' => $tokenData['token'],
            'expires' => $tokenData['expires'],
            'user' => $username
        ]);
    } else {
        send_response(false, ['error' => 'Invalid username or password.'], 401);
    }
}

// Logout
if ($action === 'logout') {
    send_response(true, ['message' => 'Logged out successfully.']);
}

// Get Content (Public read)
if ($action === 'get_content') {
    if (file_exists($contentFile)) {
        $content = file_get_contents($contentFile);
        $data = json_decode($content, true);
        if ($data) {
            send_response(true, ['data' => $data]);
        }
    }
    send_response(false, ['error' => 'content.json not found on server.'], 404);
}

// ==============================================================================
// 2. PROTECTED ACTIONS (REQUIRE AUTHENTICATION)
// ==============================================================================

$user = authenticate_token($config);
if (!$user) {
    send_response(false, ['error' => 'Unauthorized. Please log in.'], 401);
}

// Change Password
if ($action === 'change_password') {
    $currentPassword = trim($jsonInput['current_password'] ?? $_POST['current_password'] ?? '');
    $newPassword = trim($jsonInput['new_password'] ?? $_POST['new_password'] ?? '');

    if (empty($currentPassword) || empty($newPassword)) {
        send_response(false, ['error' => 'Current and new password are required.'], 400);
    }

    if (strlen($newPassword) < 8) {
        send_response(false, ['error' => 'New password must be at least 8 characters long.'], 400);
    }

    if (!verify_admin_password($currentPassword, $config)) {
        send_response(false, ['error' => 'Current password is incorrect.'], 400);
    }

    $newHash = password_hash($newPassword, PASSWORD_DEFAULT);
    $updatedConfig = [
        'username' => $config['username'],
        'password_hash' => $newHash,
        'jwt_secret' => $config['jwt_secret'],
        'session_duration' => $config['session_duration']
    ];

    $configExport = "<?php\n/**\n * Southbound Band Website - Admin Configuration\n * Updated: " . date('Y-m-d H:i:s') . "\n */\ndefined('SOUTHBOUND_ADMIN_SECURE') or die('Direct access forbidden.');\n\nreturn " . var_export($updatedConfig, true) . ";\n";
    file_put_contents($configFile, $configExport, LOCK_EX);

    send_response(true, ['message' => 'Password changed successfully!']);
}

// Save Content (Overwrites /data/content.json with backup)
if ($action === 'save_content') {
    $contentData = $jsonInput['content'] ?? $jsonInput;
    if (isset($contentData['content'])) {
        $contentData = $contentData['content'];
    }

    if (empty($contentData) || !is_array($contentData)) {
        send_response(false, ['error' => 'Invalid content payload.'], 400);
    }

    // Create Backup of existing file
    if (file_exists($contentFile)) {
        $backupDir = dirname($contentFile) . '/backups';
        if (!is_dir($backupDir)) {
            @mkdir($backupDir, 0755, true);
        }
        $backupPath = $backupDir . '/content-backup-' . date('Ymd-His') . '.json';
        @copy($contentFile, $backupPath);
        // Also keep a quick .bak file
        @copy($contentFile, $contentFile . '.bak');
    }

    // Format and Save atomically
    $formattedJson = json_encode($contentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    $bytes = file_put_contents($contentFile, $formattedJson, LOCK_EX);

    if ($bytes === false) {
        send_response(false, ['error' => 'Failed to write content.json on server. Check directory permissions.'], 500);
    }

    send_response(true, [
        'message' => 'Website content saved successfully and is now live!',
        'bytesWritten' => $bytes,
        'timestamp' => time()
    ]);
}

// Upload Audio (.mp3, .wav, .m4a, .ogg)
if ($action === 'upload_audio') {
    $file = $_FILES['audio'] ?? $_FILES['file'] ?? null;
    if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
        $errCode = $file ? $file['error'] : 'NO_FILE';
        send_response(false, ['error' => "File upload failed (Code: $errCode)."], 400);
    }

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowedExts = ['mp3', 'wav', 'm4a', 'ogg', 'aac'];
    if (!in_array($ext, $allowedExts)) {
        send_response(false, ['error' => "Invalid audio format. Allowed: " . implode(', ', $allowedExts)], 400);
    }

    $sanitized = sanitize_filename($file['name']);
    $targetPath = $audioDir . '/' . $sanitized;

    // Avoid accidental overwrite by prepending a short timestamp if file exists
    if (file_exists($targetPath)) {
        $info = pathinfo($sanitized);
        $sanitized = $info['filename'] . '-' . time() . '.' . $info['extension'];
        $targetPath = $audioDir . '/' . $sanitized;
    }

    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        send_response(false, ['error' => 'Failed to move uploaded audio file.'], 500);
    }

    send_response(true, [
        'message' => 'Audio file uploaded successfully.',
        'file' => [
            'name' => $file['name'],
            'filename' => $sanitized,
            'url' => './assets/audio/' . $sanitized,
            'absoluteUrl' => '/assets/audio/' . $sanitized,
            'size' => filesize($targetPath),
            'format' => 'Audio Stream'
        ]
    ]);
}

// Upload Photo (.jpg, .jpeg, .png, .webp)
if ($action === 'upload_photo') {
    // Supports single or multi-photo uploads
    $uploadedPhotos = [];
    
    // Normalize $_FILES structure
    $files = [];
    if (isset($_FILES['photo'])) {
        $files[] = $_FILES['photo'];
    } elseif (isset($_FILES['file'])) {
        $files[] = $_FILES['file'];
    } elseif (isset($_FILES['photos'])) {
        if (is_array($_FILES['photos']['name'])) {
            $count = count($_FILES['photos']['name']);
            for ($i = 0; $i < $count; $i++) {
                $files[] = [
                    'name' => $_FILES['photos']['name'][$i],
                    'type' => $_FILES['photos']['type'][$i],
                    'tmp_name' => $_FILES['photos']['tmp_name'][$i],
                    'error' => $_FILES['photos']['error'][$i],
                    'size' => $_FILES['photos']['size'][$i]
                ];
            }
        } else {
            $files[] = $_FILES['photos'];
        }
    }

    if (empty($files)) {
        send_response(false, ['error' => 'No image files provided for upload.'], 400);
    }

    $allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

    foreach ($files as $f) {
        if ($f['error'] !== UPLOAD_ERR_OK) continue;

        $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
        if (!in_array($ext, $allowedExts)) continue;

        // Check image MIME type
        $imgInfo = @getimagesize($f['tmp_name']);
        if (!$imgInfo) continue;

        $sanitized = sanitize_filename($f['name']);
        $targetPath = $galleryDir . '/' . $sanitized;

        if (file_exists($targetPath)) {
            $info = pathinfo($sanitized);
            $sanitized = $info['filename'] . '-' . time() . '.' . $info['extension'];
            $targetPath = $galleryDir . '/' . $sanitized;
        }

        if (move_uploaded_file($f['tmp_name'], $targetPath)) {
            $uploadedPhotos[] = [
                'name' => $f['name'],
                'filename' => $sanitized,
                'url' => './assets/gallery/' . $sanitized,
                'absoluteUrl' => '/assets/gallery/' . $sanitized,
                'size' => filesize($targetPath),
                'width' => $imgInfo[0],
                'height' => $imgInfo[1]
            ];
        }
    }

    if (empty($uploadedPhotos)) {
        send_response(false, ['error' => 'None of the provided images could be uploaded. Ensure files are valid .jpg, .png, or .webp.'], 400);
    }

    send_response(true, [
        'message' => count($uploadedPhotos) . ' photo(s) uploaded successfully.',
        'photos' => $uploadedPhotos,
        'photo' => $uploadedPhotos[0]
    ]);
}

// Delete Media File from Server (Safety locked to assets/audio and assets/gallery)
if ($action === 'delete_file') {
    $filePath = trim($jsonInput['filePath'] ?? $_POST['filePath'] ?? '');
    if (empty($filePath)) {
        send_response(false, ['error' => 'File path is required.'], 400);
    }

    // Safety checks against directory traversal
    if (strpos($filePath, '..') !== false || strpos($filePath, '\\') !== false) {
        send_response(false, ['error' => 'Invalid file path.'], 400);
    }

    $cleanPath = ltrim($filePath, './');
    $cleanPath = ltrim($cleanPath, '/');

    // Only allow deletion within assets/audio/ or assets/gallery/
    if (strpos($cleanPath, 'assets/audio/') !== 0 && strpos($cleanPath, 'assets/gallery/') !== 0) {
        send_response(false, ['error' => 'File deletion is restricted to audio and gallery assets.'], 403);
    }

    $fullPath = $publicDir . '/' . $cleanPath;
    if (file_exists($fullPath) && is_file($fullPath)) {
        @unlink($fullPath);
        send_response(true, ['message' => 'File deleted from server.', 'path' => $cleanPath]);
    } else {
        // File may already be absent or external
        send_response(true, ['message' => 'File not found on server or already removed.', 'path' => $cleanPath]);
    }
}

// Catch-all invalid action
send_response(false, ['error' => "Action '$action' not recognized."], 400);

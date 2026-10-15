<?php
/**
 * Southbound Band Website - Admin Configuration
 * Server-side Authentication & Security Configuration
 * 
 * Default Login:
 *   Username: admin
 *   Password: Southbound2026!
 */
defined('SOUTHBOUND_ADMIN_SECURE') or die('Direct access forbidden.');

return [
    'username' => 'admin',
    'default_password' => 'Southbound2026!',
    'password_hash' => '', // Set upon password update via admin panel
    'jwt_secret' => 'sb_jwt_secret_live_revue_2026_916rock',
    'session_duration' => 604800 // 7 days (seconds)
];

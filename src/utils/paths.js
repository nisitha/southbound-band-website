/**
 * Asset Path Resolution Utility
 * 
 * Ensures media, audio, images, and document paths resolve correctly
 * regardless of whether the site is hosted at:
 * - GitHub Pages project path: /southbound-band-website/
 * - Custom domain root: /
 * - Local development: http://localhost:3000/
 */

export function resolveAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.startsWith('./') ? path.slice(2) : (path.startsWith('/') ? path.slice(1) : path);
  return `${cleanBase}${cleanPath}`;
}

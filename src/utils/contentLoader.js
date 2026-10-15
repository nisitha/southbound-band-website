/**
 * Content Loader Utility
 * Centralizes fetching of /data/content.json across components
 * Implements in-flight request deduplication and base URL resolution
 */

import { resolveAssetUrl } from './paths.js';

let contentPromise = null;

export async function fetchContent() {
  // Check for local preview override from Admin Panel (enables instant client demo on GitHub Pages/localhost)
  try {
    const localOverride = typeof window !== 'undefined' ? localStorage.getItem('sb_content_override') : null;
    if (localOverride) {
      const parsed = JSON.parse(localOverride);
      if (parsed && typeof parsed === 'object' && (parsed.videos || parsed.tracks || parsed.gallery || parsed.upcomingShows)) {
        return parsed;
      }
    }
  } catch (err) {
    // Continue with network fetch
  }

  if (contentPromise) return contentPromise;

  contentPromise = (async () => {
    const candidateUrls = [
      resolveAssetUrl('data/content.json'),
      './data/content.json',
      '/data/content.json'
    ];

    for (const url of candidateUrls) {
      try {
        const response = await fetch(url, { cache: 'no-cache' });
        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (err) {
        // Try next candidate URL
      }
    }

    console.warn('[ContentLoader] Could not fetch content.json from candidate URLs. Using fallbacks.');
    return null;
  })();

  return contentPromise;
}

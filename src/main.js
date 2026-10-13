/**
 * SOUTHBOUND BAND OFFICIAL WEBSITE
 * Application Entry Point — Full Implementation with Motion Design
 */

import './styles/main.css';
import { SECTION_COMPONENTS } from './components/index.js';
import { initScrollReveal } from './components/utils/scrollReveal.js';
import { initParallax, initScrollProgress } from './components/utils/parallax.js';

/**
 * Initializes the Southbound Web Application
 */
export function initApp() {
  const startTime = performance.now();
  console.log('⚡ [Southbound] Initializing full website with motion design...');

  // Initialize scroll reading progress indicator
  initScrollProgress();

  // Initialize scroll reveal animations
  initScrollReveal();

  // Initialize restrained parallax motion
  initParallax();

  // Initialize modular component registry
  SECTION_COMPONENTS.forEach(comp => {
    if (typeof comp.init === 'function') {
      try {
        comp.init();
      } catch (err) {
        console.error(`[Southbound] Error initializing ${comp.name || comp.id}:`, err);
      }
    }
  });

  const duration = (performance.now() - startTime).toFixed(2);
  console.log(`✓ [Southbound] Ready in ${duration}ms`);
}

// Auto-run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

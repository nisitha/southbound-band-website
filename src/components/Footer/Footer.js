/**
 * Footer Component Module
 * Enhanced footer with multi-column layout
 */

export const FooterComponent = {
  id: 'footer',
  name: 'Site Footer',
  init() {
    // Update copyright year dynamically
    const yearEls = document.querySelectorAll('.footer-year');
    const currentYear = new Date().getFullYear();
    yearEls.forEach(el => { el.textContent = currentYear; });
    console.debug('[Footer] Initialized');
  }
};

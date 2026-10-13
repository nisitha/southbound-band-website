/**
 * Press Component Module
 * Section 9: Press Kit & Downloads — Media, Documents & High-Res Assets
 * Designed for Promoters, Venue Coordinators, Festival Directors, and Journalists
 */

export const PressComponent = {
  id: 'press',
  name: 'Press Kit & Media Downloads',

  init() {
    const downloadLinks = document.querySelectorAll('.press-download-action-btn, .track-download-link');

    // Add download feedback
    downloadLinks.forEach(link => {
      link.addEventListener('click', () => {
        const fileName = link.getAttribute('download') || link.getAttribute('href');
        console.debug(`[Press] Download initiated: ${fileName}`);

        // Subtle micro-animation feedback
        link.style.transform = 'scale(0.96)';
        setTimeout(() => {
          link.style.transform = '';
        }, 150);
      });
    });

    console.debug('[Press] Press Kit & Downloads initialized');
  }
};

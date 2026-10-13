/**
 * About Component Module
 * Section 3: Sound & Repertoire Experience
 * Features:
 * - Dynamic counting animation for band statistics
 * - IntersectionObserver viewport trigger with subtle staggered timing
 * - Reduced motion and fallback safety
 */

export const AboutComponent = {
  id: 'about',
  name: 'Sound & Repertoire Experience',
  hasAnimated: false,

  init() {
    this.initCounters();
    console.debug('[About] Section initialized with statistics counter');
  },

  /**
   * Smooth number-counting animation for statistics
   */
  initCounters() {
    const statsContainer = document.querySelector('.about-stats');
    if (!statsContainer) return;

    const statValueElements = statsContainer.querySelectorAll('[data-counter]');
    if (!statValueElements.length) return;

    // Accessibility check: preserve static final numbers if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      statValueElements.forEach(el => {
        el.textContent = el.getAttribute('data-counter');
      });
      return;
    }

    // Set initial start numbers
    statValueElements.forEach(el => {
      const startVal = el.getAttribute('data-start') || '0';
      el.textContent = startVal;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          observer.unobserve(entry.target);

          // Animate each stat with a subtle stagger
          statValueElements.forEach((el, index) => {
            const target = parseInt(el.getAttribute('data-counter'), 10);
            const start = parseInt(el.getAttribute('data-start') || '0', 10);
            const delay = index * 140; // 140ms stagger between stats
            const duration = 1400;     // 1.4s smooth animation duration

            setTimeout(() => {
              this.animateValue(el, start, target, duration);
            }, delay);
          });
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.2
    });

    observer.observe(statsContainer);
  },

  /**
   * Animates a single DOM element from start to target value using requestAnimationFrame
   */
  animateValue(element, start, target, duration) {
    const startTime = performance.now();

    // Cubic ease-out curve for natural deceleration
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easedProgress = easeOutCubic(progress);

      const current = Math.round(start + (target - start) * easedProgress);
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Guarantee final value matches target exactly
        element.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  }
};

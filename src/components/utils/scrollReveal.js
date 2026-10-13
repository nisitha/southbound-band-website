/**
 * Southbound Band — Shared Scroll Reveal Utility
 * Observes elements with class "reveal" and adds "is-visible" when in viewport
 * Supports prefers-reduced-motion and responsive mobile thresholds
 */

let _observer = null;

export function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reduced motion requested or IntersectionObserver not supported — show all immediately
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  _observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          _observer.unobserve(entry.target); // animate once only
        }
      });
    },
    {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    }
  );

  document.querySelectorAll('.reveal').forEach(el => _observer.observe(el));
}

export function observeNewElements(container) {
  if (!_observer) return;
  container.querySelectorAll('.reveal').forEach(el => _observer.observe(el));
}

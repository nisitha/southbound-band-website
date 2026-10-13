/**
 * Southbound Band — Modern Cinematic Scroll Reveal & Scroll Spy System
 * Inspired by vanmorrison.com editorial pacing and fluid viewport transitions
 * 
 * Features:
 * - IntersectionObserver with optimized thresholds
 * - Mask-reveal animations (clip-path wipes for key imagery)
 * - Staggered children reveals
 * - Active section scroll-spy highlighting
 * - Complete prefers-reduced-motion safety
 */

let _revealObserver = null;
let _scrollSpyObserver = null;

export function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reduced motion: immediately make all reveal elements visible
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .reveal-mask, .reveal-editorial').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  // 1. Viewport Reveal Observer
  _revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once animated, stop observing for performance
          _revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -50px 0px',
      threshold: [0.08, 0.2]
    }
  );

  document.querySelectorAll('.reveal, .reveal-mask, .reveal-editorial').forEach(el => {
    _revealObserver.observe(el);
  });

  // 2. Active Navigation Scroll Spy
  initScrollSpy();
}

/**
 * Automatically updates active link styling in navigation header as user scrolls
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header-nav .nav-link, .mobile-nav-links .mobile-nav-link');

  if (!sections.length || !navLinks.length) return;

  _scrollSpyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('is-active');
              link.setAttribute('aria-current', 'location');
            } else if (href.startsWith('#')) {
              link.classList.remove('is-active');
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    },
    {
      rootMargin: '-30% 0px -55% 0px',
      threshold: 0
    }
  );

  sections.forEach(sec => _scrollSpyObserver.observe(sec));
}

export function observeNewElements(container) {
  if (!_revealObserver || !container) return;
  container.querySelectorAll('.reveal, .reveal-mask, .reveal-editorial').forEach(el => {
    _revealObserver.observe(el);
  });
}

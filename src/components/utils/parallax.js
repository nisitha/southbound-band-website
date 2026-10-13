/**
 * Southbound Band — Scroll Motion, Parallax & Progress Utilities
 * Features:
 *  - Restrained high-performance parallax for Hero background and photographic banners
 *  - Global scroll reading progress indicator bar
 *  - Complete prefers-reduced-motion compliance
 */

export function initParallax() {
  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const heroImg = document.getElementById('hero-img');
  const heroSection = document.getElementById('hero');
  const bandPromo = document.querySelector('.band-promo-strip');
  
  if (!heroImg && !bandPromo) return;

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // 1. Hero background restrained parallax (only while hero is in/near viewport)
        if (heroImg && heroSection) {
          const heroHeight = heroSection.offsetHeight;
          if (scrollY <= heroHeight) {
            // Move background at 30% scroll speed with gentle scale preservation
            const offset = (scrollY * 0.28).toFixed(1);
            heroImg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.02)`;
          }
        }

        // 2. Band promo strip subtle depth parallax
        if (bandPromo) {
          const rect = bandPromo.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const relativeY = (window.innerHeight - rect.top) * 0.05;
            bandPromo.style.transform = `translate3d(0, ${relativeY.toFixed(1)}px, 0)`;
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

export function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  let ticking = false;

  const updateProgress = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const progress = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
          progressBar.style.width = `${progress.toFixed(2)}%`;
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress(); // initialize immediately
}

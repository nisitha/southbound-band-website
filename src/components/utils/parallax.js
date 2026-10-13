/**
 * Southbound Band — Scroll Motion, Parallax & Depth Utilities
 * Inspired by vanmorrison.com cinematic fluid scrolling
 * 
 * Features:
 * - Multi-layered 3D depth in the Hero section (background drift vs. foreground content)
 * - Parallax floating elements on large photography and banners
 * - Vinyl record interactive depth feedback
 * - Scroll reading progress indicator
 * - 60fps locked via requestAnimationFrame & passive listeners
 * - prefers-reduced-motion safety
 */

export function initParallax() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const heroImg = document.getElementById('hero-img');
  const heroSection = document.getElementById('hero');
  const heroContent = document.querySelector('.hero-content');
  const bandPromo = document.querySelector('.band-promo-strip');
  const aboutImg = document.querySelector('.about-img-frame img');
  const vinylShowcase = document.querySelector('.vinyl-showcase');

  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // 1. Hero Multi-Layer Depth
    if (heroSection && scrollY <= heroSection.offsetHeight) {
      // Background drifts slower down
      if (heroImg) {
        const bgOffset = (scrollY * 0.32).toFixed(1);
        const scaleVal = (1.02 + (scrollY * 0.00015)).toFixed(3);
        heroImg.style.transform = `translate3d(0, ${bgOffset}px, 0) scale(${scaleVal})`;
      }

      // Foreground content has subtle upward compression
      if (heroContent) {
        const contentOffset = (scrollY * 0.12).toFixed(1);
        const contentOpacity = Math.max(0, (1 - (scrollY / (heroSection.offsetHeight * 0.85)))).toFixed(2);
        heroContent.style.transform = `translate3d(0, -${contentOffset}px, 0)`;
        heroContent.style.opacity = contentOpacity;
      }
    }

    // 2. Band Promo Strip Parallax
    if (bandPromo) {
      const rect = bandPromo.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const relativeY = ((windowHeight - rect.top) * 0.06).toFixed(1);
        bandPromo.style.transform = `translate3d(0, ${relativeY}px, 0)`;
      }
    }

    // 3. About Section Live Photo Parallax
    if (aboutImg) {
      const rect = aboutImg.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const delta = ((rect.top - (windowHeight / 2)) * 0.05).toFixed(1);
        aboutImg.style.transform = `translate3d(0, ${delta}px, 0) scale(1.04)`;
      }
    }

    // 4. Vinyl LP Record Floating Depth
    if (vinylShowcase) {
      const rect = vinylShowcase.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const tilt = Math.max(-4, Math.min(4, ((rect.top - (windowHeight / 3)) * 0.015))).toFixed(2);
        vinylShowcase.style.transform = `perspective(1000px) rotateY(${tilt}deg)`;
      }
    }

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  updateParallax(); // Initial run
}

export function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  let ticking = false;

  const updateProgress = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const progress = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
      progressBar.style.width = `${progress.toFixed(2)}%`;
    }
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  updateProgress();
}

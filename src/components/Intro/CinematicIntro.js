/**
 * Cinematic Opening Module — SOUTHBOUND
 * Inspired by vanmorrison.com editorial impact and fluid liquid-wash typography
 * 
 * Features:
 * - Dynamic SVG displacement wave & ink-wash sharpening
 * - Session-aware: Plays once on initial visit; skips on subsequent in-page navigations
 * - Accessible: Immediate skip button + ESC key listener
 * - Fallback: Completely honors prefers-reduced-motion
 */

export const CinematicIntroComponent = {
  id: 'cinematic-intro',
  name: 'Cinematic Title Reveal',
  storageKey: 'southbound_intro_seen_v1',
  introEl: null,
  skipBtn: null,
  isDismissed: false,

  init() {
    this.introEl = document.getElementById('cinematic-intro');
    this.skipBtn = document.getElementById('intro-skip-btn');

    if (!this.introEl) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadySeen = sessionStorage.getItem(this.storageKey);

    if (prefersReducedMotion || alreadySeen) {
      this.dismissImmediately();
      return;
    }

    // Bind skip button
    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', () => this.dismiss());
    }

    // Bind keyboard shortcut (ESC or Space dismisses immediately)
    const keyHandler = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        if (!this.isDismissed) {
          this.dismiss();
          document.removeEventListener('keydown', keyHandler);
        }
      }
    };
    document.addEventListener('keydown', keyHandler);

    // Run dynamic liquid wash filter interpolation
    this.runDisplacementSequence();

    // Auto-dismiss after dramatic showcase (2.6s)
    setTimeout(() => {
      if (!this.isDismissed) {
        this.dismiss();
      }
    }, 2600);
  },

  /**
   * Smoothly drives the SVG displacement map from liquid turbulence down to crystal clarity
   */
  runDisplacementSequence() {
    const dispEl = document.getElementById('intro-disp');
    const turbEl = document.getElementById('intro-turbulence');
    if (!dispEl || !turbEl) return;

    const startTime = performance.now();
    const duration = 2200; // 2.2 seconds

    const animateFilter = (now) => {
      if (this.isDismissed) return;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth ease-out curve
      const ease = 1 - Math.pow(1 - progress, 3);

      // Animate scale from 48 down to 0
      const currentScale = Math.max(0, 48 * (1 - ease));
      dispEl.setAttribute('scale', currentScale.toFixed(2));

      // Animate turbulence frequency
      const freqX = 0.04 - (0.038 * ease);
      const freqY = 0.08 - (0.076 * ease);
      turbEl.setAttribute('baseFrequency', `${freqX.toFixed(4)} ${freqY.toFixed(4)}`);

      if (progress < 1) {
        window.requestAnimationFrame(animateFilter);
      } else {
        dispEl.setAttribute('scale', '0');
      }
    };

    window.requestAnimationFrame(animateFilter);
  },

  /**
   * Smoothly transitions out of the intro into the hero section
   */
  dismiss() {
    if (this.isDismissed || !this.introEl) return;
    this.isDismissed = true;

    try {
      sessionStorage.setItem(this.storageKey, 'true');
    } catch {
      // Ignore storage restrictions if cookies disabled
    }

    this.introEl.classList.add('is-exiting');

    // Notify application that intro has completed
    document.dispatchEvent(new CustomEvent('southbound:intro-complete'));

    // Remove from layout after CSS transition finishes
    setTimeout(() => {
      if (this.introEl) {
        this.introEl.classList.add('is-dismissed');
        this.introEl.setAttribute('aria-hidden', 'true');
      }
    }, 900);
  },

  /**
   * Bypasses animation for reduced-motion or returning visitors
   */
  dismissImmediately() {
    this.isDismissed = true;
    if (this.introEl) {
      this.introEl.classList.add('is-dismissed');
      this.introEl.setAttribute('aria-hidden', 'true');
    }
    document.documentElement.classList.add('intro-already-seen');
    document.dispatchEvent(new CustomEvent('southbound:intro-complete'));
  }
};

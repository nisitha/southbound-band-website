/**
 * Header Component Module
 * Section 1: Sticky Navigation Header & Mobile Drawer
 * Mapped Assets: /assets/branding/logo-fade.png, /assets/branding/logo-round.png
 */

export const HeaderComponent = {
  id: 'header',
  name: 'Sticky Navigation Header',
  mappedAssets: [
    '/assets/branding/logo-fade.png',
    '/assets/branding/logo-round.png'
  ],
  navItems: [
    { label: 'About', href: '#about' },
    { label: 'The Band', href: '#band' },
    { label: 'Video', href: '#video' },
    { label: 'Music', href: '#music' },
    { label: 'Photos', href: '#photos' },
    { label: 'Shows', href: '#shows' },
    { label: 'Press', href: '#press' },
    { label: 'Merch', href: '#merch' },
    { label: 'Booking', href: '#booking' }
  ],
  
  init() {
    const header = document.getElementById('site-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (!header) return;

    /* 1. Sticky Scroll Elevation */
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /* 2. Mobile Drawer Controls */
    const openMenu = () => {
      if (!mobileDrawer || !menuToggle) return;
      menuToggle.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      mobileDrawer.classList.add('open');
      if (drawerOverlay) drawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Focus first link in drawer for accessibility
      const firstLink = mobileDrawer.querySelector('a, button');
      if (firstLink) firstLink.focus();
    };

    const closeMenu = () => {
      if (!mobileDrawer || !menuToggle) return;
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.classList.remove('open');
      if (drawerOverlay) drawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
      menuToggle.focus();
    };

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer && mobileDrawer.classList.contains('open');
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      });
    }

    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', closeMenu);
    }

    // Close on any link/button click inside mobile drawer
    if (mobileDrawer) {
      const drawerLinks = mobileDrawer.querySelectorAll('a, button');
      drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (mobileDrawer.classList.contains('open')) {
            closeMenu();
          }
        });
      });
    }

    // Keyboard handlers: Escape to close & Tab focus trap
    document.addEventListener('keydown', (e) => {
      if (!mobileDrawer || !mobileDrawer.classList.contains('open')) return;

      if (e.key === 'Escape') {
        closeMenu();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = Array.from(mobileDrawer.querySelectorAll('a[href], button:not([disabled])'));
        if (focusables.length === 0) return;

        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });

    /* 3. Active Nav Link Intersection Observer */
    if ('IntersectionObserver' in window && sections.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0
      };

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, observerOptions);

      sections.forEach(sec => sectionObserver.observe(sec));
    }

    console.debug('[Header] Initialized successfully with sticky navigation and mobile drawer');
  }
};

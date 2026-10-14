/**
 * Gallery Component Module
 * Section 7: Live Concert Photo Gallery
 * Features: Category filter + accessible keyboard lightbox
 */

import { resolveAssetUrl } from '../../utils/paths.js';

export const GALLERY_PHOTOS = [
  {
    id: 'festival-01',
    src: './assets/gallery/gallery-festival-01.jpg',
    caption: 'Southbound performing at a Northern California festival',
    alt: 'Southbound performing live at a Northern California outdoor festival',
    wide: true
  },
  {
    id: 'festival-02',
    src: './assets/gallery/gallery-festival-02.jpg',
    caption: 'Guitar solo at a California summer festival',
    alt: 'Guitar solo moment at a California summer festival',
    wide: false
  },
  {
    id: 'theatre-01',
    src: './assets/gallery/gallery-theatre-01.jpg',
    caption: 'Historic Opera House, Roseville',
    alt: 'Southbound performing at the Historic Opera House in Roseville',
    wide: false
  },
  {
    id: 'festival-03',
    src: './assets/gallery/gallery-festival-03.jpg',
    caption: 'Full stage at a summer festival',
    alt: 'Southbound full band on stage at an outdoor festival',
    wide: true
  },
  {
    id: 'festival-04',
    src: './assets/gallery/gallery-festival-04.jpg',
    caption: 'Festival performance — stage panorama',
    alt: 'Southbound festival performance stage panorama',
    wide: false
  },
  {
    id: 'swabbies-01',
    src: './assets/gallery/gallery-swabbies-01.jpg',
    caption: 'Swabbies on the River, Sacramento',
    alt: 'Southbound performing at Swabbies on the River in Sacramento',
    wide: false
  },
  {
    id: 'swabbies-02',
    src: './assets/gallery/gallery-swabbies-02.jpg',
    caption: 'Swabbies on the River — summer 2025',
    alt: 'Southbound summer performance at Swabbies on the River 2025',
    wide: false
  },
  {
    id: 'theatre-02',
    src: './assets/gallery/gallery-theatre-02.jpg',
    caption: 'Historic Opera House — wide stage view',
    alt: 'Wide stage view at the Historic Opera House',
    wide: true
  },
  {
    id: 'theatre-03',
    src: './assets/gallery/gallery-theatre-03.jpg',
    caption: 'Stage moment at the Opera House',
    alt: 'Stage moment under spotlights at the Historic Opera House',
    wide: false
  },
  {
    id: 'resort-01',
    src: './assets/gallery/gallery-resort-01.jpg',
    caption: "Robb's Resort — Pollock Pines, Sierra Foothills",
    alt: 'Southbound performing at Robb\'s Resort in Pollock Pines',
    wide: false
  },
  {
    id: 'club-01',
    src: './assets/gallery/gallery-club-01.jpg',
    caption: 'Corner Pocket Sports Bar, Orangevale',
    alt: 'Southbound at Corner Pocket Sports Bar in Orangevale',
    wide: false
  },
  {
    id: 'community-01',
    src: './assets/gallery/gallery-community-01.jpg',
    caption: 'Community outdoor concert',
    alt: 'Southbound performing at a community outdoor concert',
    wide: false
  },
  {
    id: 'candid-01',
    src: './assets/gallery/gallery-candid-01.jpg',
    caption: 'Backstage moment at Swabbies',
    alt: 'Southbound band members candid backstage moment at Swabbies',
    wide: false
  }
];

export const GalleryComponent = {
  id: 'gallery',
  name: 'Concert Photo Gallery',

  _items: [],
  _currentIndex: 0,
  _lightbox: null,
  _lightboxImg: null,
  _lightboxCounter: null,
  _isOpen: false,

  init() {
    this._lightbox = document.getElementById('gallery-lightbox');
    this._lightboxImg = document.getElementById('lightbox-img');
    this._lightboxCounter = document.getElementById('lightbox-counter');

    if (!this._lightbox) {
      console.debug('[Gallery] Lightbox not found — skipping init');
      return;
    }

    this._buildItemList();
    this._bindGalleryClicks();
    this._bindLightboxControls();
    this._bindKeyboard();

    console.debug(`[Gallery] Initialized with ${this._items.length} photos`);
  },

  _buildItemList() {
    this._items = Array.from(document.querySelectorAll('.gallery-item[data-full]'));
  },

  _bindGalleryClicks() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item[data-full]');
      if (!item) return;
      const idx = this._items.indexOf(item);
      if (idx === -1) return;
      this._openLightbox(idx);
    });

    // Keyboard: Enter / Space on gallery items
    grid.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const item = e.target.closest('.gallery-item[data-full]');
      if (!item) return;
      e.preventDefault();
      const idx = this._items.indexOf(item);
      if (idx === -1) return;
      this._openLightbox(idx);
    });

    // Make items focusable for keyboard nav
    this._items.forEach(item => {
      if (!item.hasAttribute('tabindex')) item.setAttribute('tabindex', '0');
      if (!item.hasAttribute('role')) item.setAttribute('role', 'button');
    });
  },

  _bindLightboxControls() {
    document.getElementById('lightbox-close')?.addEventListener('click', () => this._closeLightbox());
    document.getElementById('lightbox-prev')?.addEventListener('click', () => this._navigate(-1));
    document.getElementById('lightbox-next')?.addEventListener('click', () => this._navigate(1));

    // Click on backdrop to close
    this._lightbox.addEventListener('click', (e) => {
      if (e.target === this._lightbox) this._closeLightbox();
    });
  },

  _bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (!this._isOpen) return;
      if (e.key === 'Escape') this._closeLightbox();
      if (e.key === 'ArrowLeft') this._navigate(-1);
      if (e.key === 'ArrowRight') this._navigate(1);
    });
  },

  _openLightbox(index) {
    this._currentIndex = index;
    const item = this._items[index];
    if (!item) return;

    const src = item.dataset.full || '';
    const caption = item.dataset.caption || '';
    const imgEl = item.querySelector('.gallery-img');
    const alt = imgEl ? imgEl.alt : caption;

    this._lightboxImg.src = resolveAssetUrl(src);
    this._lightboxImg.alt = alt;
    this._updateCounter();

    this._lightbox.classList.add('is-open');
    this._lightbox.setAttribute('aria-hidden', 'false');
    this._isOpen = true;
    document.body.style.overflow = 'hidden';

    // Focus close button
    requestAnimationFrame(() => {
      document.getElementById('lightbox-close')?.focus();
    });
  },

  _closeLightbox() {
    this._lightbox.classList.remove('is-open');
    this._lightbox.setAttribute('aria-hidden', 'true');
    this._isOpen = false;
    document.body.style.overflow = '';
    this._lightboxImg.src = '';
  },

  _navigate(direction) {
    const next = (this._currentIndex + direction + this._items.length) % this._items.length;
    this._openLightbox(next);
  },

  _updateCounter() {
    if (this._lightboxCounter) {
      this._lightboxCounter.textContent = `${this._currentIndex + 1} / ${this._items.length}`;
    }
  }
};

/**
 * Gallery Component Module
 * Section 7: Live Concert Photo Gallery
 * Centralized dynamic content loaded from /data/content.json
 * Features: Unconditional full gallery rendering + accessible keyboard lightbox
 */

import { resolveAssetUrl } from '../../utils/paths.js';
import { fetchContent } from '../../utils/contentLoader.js';

export const GALLERY_PHOTOS = [
  {
    id: 'festival-01',
    src: './assets/gallery/gallery-festival-01.jpg',
    caption: 'Southbound performing at a Northern California festival',
    alt: 'Southbound performing live at a Northern California outdoor festival',
    category: 'festival',
    wide: true
  },
  {
    id: 'festival-02',
    src: './assets/gallery/gallery-festival-02.jpg',
    caption: 'Guitar solo at a California summer festival',
    alt: 'Guitar solo moment at a California summer festival',
    category: 'festival',
    wide: false
  },
  {
    id: 'theatre-01',
    src: './assets/gallery/gallery-theatre-01.jpg',
    caption: 'Historic Opera House, Roseville',
    alt: 'Southbound performing at the Historic Opera House in Roseville',
    category: 'theatre',
    wide: false
  },
  {
    id: 'festival-03',
    src: './assets/gallery/gallery-festival-03.jpg',
    caption: 'Full stage at a summer festival',
    alt: 'Southbound full band on stage at an outdoor festival',
    category: 'festival',
    wide: true
  },
  {
    id: 'festival-04',
    src: './assets/gallery/gallery-festival-04.jpg',
    caption: 'Festival performance — stage panorama',
    alt: 'Southbound festival performance stage panorama',
    category: 'festival',
    wide: false
  },
  {
    id: 'swabbies-01',
    src: './assets/gallery/gallery-swabbies-01.jpg',
    caption: 'Swabbies on the River, Sacramento',
    alt: 'Southbound performing at Swabbies on the River in Sacramento',
    category: 'swabbies',
    wide: false
  },
  {
    id: 'swabbies-02',
    src: './assets/gallery/gallery-swabbies-02.jpg',
    caption: 'Swabbies on the River — summer 2025',
    alt: 'Southbound summer performance at Swabbies on the River 2025',
    category: 'swabbies',
    wide: false
  },
  {
    id: 'theatre-02',
    src: './assets/gallery/gallery-theatre-02.jpg',
    caption: 'Historic Opera House — wide stage view',
    alt: 'Wide stage view at the Historic Opera House',
    category: 'theatre',
    wide: true
  },
  {
    id: 'theatre-03',
    src: './assets/gallery/gallery-theatre-03.jpg',
    caption: 'Stage moment at the Opera House',
    alt: 'Stage moment under spotlights at the Historic Opera House',
    category: 'theatre',
    wide: false
  },
  {
    id: 'resort-01',
    src: './assets/gallery/gallery-resort-01.jpg',
    caption: "Robb's Resort — Pollock Pines, Sierra Foothills",
    alt: 'Southbound performing at Robb\'s Resort in Pollock Pines',
    category: 'festival',
    wide: false
  },
  {
    id: 'club-01',
    src: './assets/gallery/gallery-club-01.jpg',
    caption: 'Corner Pocket Sports Bar, Orangevale',
    alt: 'Southbound at Corner Pocket Sports Bar in Orangevale',
    category: 'club',
    wide: false
  },
  {
    id: 'community-01',
    src: './assets/gallery/gallery-community-01.jpg',
    caption: 'Community outdoor concert',
    alt: 'Southbound performing at a community outdoor concert',
    category: 'festival',
    wide: false
  },
  {
    id: 'candid-01',
    src: './assets/gallery/gallery-candid-01.jpg',
    caption: 'Backstage moment at Swabbies',
    alt: 'Southbound band members candid backstage moment at Swabbies',
    category: 'festival',
    wide: false
  }
];

export const GalleryComponent = {
  id: 'gallery',
  name: 'Concert Photo Gallery',

  photosList: [],
  _items: [],
  _currentIndex: 0,
  _lightbox: null,
  _lightboxImg: null,
  _lightboxCounter: null,
  _isOpen: false,

  renderGrid(photos) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.innerHTML = photos.map(item => {
      const fullUrl = resolveAssetUrl(item.src);
      const altText = item.alt || item.caption || 'Southbound Concert Photo';
      const wideClass = item.wide ? 'gallery-wide' : '';
      return `
        <div class="gallery-item ${wideClass}" data-full="${fullUrl}" data-caption="${item.caption || ''}" role="listitem" tabindex="0">
          <img src="${fullUrl}" alt="${altText}" class="gallery-img" loading="lazy" decoding="async">
          <div class="gallery-item-overlay">
            <div class="gallery-zoom-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this._buildItemList();
    this._bindGalleryClicks();
  },

  async init() {
    this._lightbox = document.getElementById('gallery-lightbox');
    this._lightboxImg = document.getElementById('lightbox-img');
    this._lightboxCounter = document.getElementById('lightbox-counter');

    // 1. Immediately render default baseline photos synchronously (zero delay, zero blank state)
    this.photosList = GALLERY_PHOTOS;
    this.renderGrid(this.photosList);

    // 2. Setup lightbox controls
    this._bindLightboxControls();
    this._bindKeyboard();

    // 3. Asynchronously check for dynamic updates from /data/content.json
    try {
      const data = await fetchContent();
      if (data && Array.isArray(data.gallery) && data.gallery.length > 0) {
        this.photosList = data.gallery;
        this.renderGrid(this.photosList);
      }
    } catch (err) {
      console.warn('[Gallery] Using default verified photos list:', err);
    }

    console.debug(`[Gallery] Initialized with ${this._items.length} visible photos`);
  },

  _buildItemList() {
    this._items = Array.from(document.querySelectorAll('.gallery-item[data-full]'));
  },

  _bindGalleryClicks() {
    const grid = document.getElementById('gallery-grid');
    if (!grid || grid._clicksBound) return;
    grid._clicksBound = true;

    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item[data-full]');
      if (!item) return;
      this._buildItemList();
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
      this._buildItemList();
      const idx = this._items.indexOf(item);
      if (idx === -1) return;
      this._openLightbox(idx);
    });

    // Make items focusable for keyboard navigation
    this._items.forEach(item => {
      if (!item.hasAttribute('tabindex')) item.setAttribute('tabindex', '0');
      if (!item.hasAttribute('role')) item.setAttribute('role', 'button');
    });
  },

  _bindLightboxControls() {
    if (!this._lightbox || this._lightboxControlsBound) return;
    this._lightboxControlsBound = true;

    document.getElementById('lightbox-close')?.addEventListener('click', () => this._closeLightbox());
    document.getElementById('lightbox-prev')?.addEventListener('click', () => this._navigate(-1));
    document.getElementById('lightbox-next')?.addEventListener('click', () => this._navigate(1));

    // Click on backdrop to close
    this._lightbox.addEventListener('click', (e) => {
      if (e.target === this._lightbox) this._closeLightbox();
    });
  },

  _bindKeyboard() {
    if (this._keyboardBound) return;
    this._keyboardBound = true;

    document.addEventListener('keydown', (e) => {
      if (!this._isOpen) return;
      if (e.key === 'Escape') this._closeLightbox();
      if (e.key === 'ArrowLeft') this._navigate(-1);
      if (e.key === 'ArrowRight') this._navigate(1);
    });
  },

  _openLightbox(index) {
    if (!this._lightbox || !this._lightboxImg) return;
    this._buildItemList();
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

    // Focus close button for accessibility
    requestAnimationFrame(() => {
      document.getElementById('lightbox-close')?.focus();
    });
  },

  _closeLightbox() {
    if (!this._lightbox) return;
    this._lightbox.classList.remove('is-open');
    this._lightbox.setAttribute('aria-hidden', 'true');
    this._isOpen = false;
    document.body.style.overflow = '';
    if (this._lightboxImg) this._lightboxImg.src = '';
  },

  _navigate(direction) {
    if (this._items.length === 0) return;
    const next = (this._currentIndex + direction + this._items.length) % this._items.length;
    this._openLightbox(next);
  },

  _updateCounter() {
    if (this._lightboxCounter) {
      this._lightboxCounter.textContent = `${this._currentIndex + 1} / ${this._items.length}`;
    }
  }
};

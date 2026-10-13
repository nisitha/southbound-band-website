/**
 * Gallery Component Module
 * Section 7: Live Concert Photo Gallery
 * Features: Category filter + accessible keyboard lightbox
 */

export const GalleryComponent = {
  id: 'gallery',
  name: 'Concert Photo Gallery',

  _items: [],
  _filtered: [],
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
    this._bindFilterButtons();
    this._bindGalleryClicks();
    this._bindLightboxControls();
    this._bindKeyboard();

    console.debug(`[Gallery] Initialized with ${this._items.length} photos`);
  },

  _buildItemList() {
    this._items = Array.from(document.querySelectorAll('.gallery-item[data-full]'));
    this._filtered = [...this._items];
  },

  _bindFilterButtons() {
    const buttons = document.querySelectorAll('.gallery-filter-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        // Update active state
        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        // Filter items
        this._applyFilter(filter);
      });
    });
  },

  _applyFilter(filter) {
    this._items.forEach(item => {
      const cat = item.dataset.category || '';
      const show = filter === 'all' || cat === filter;
      item.classList.toggle('gallery-hidden', !show);
    });
    this._filtered = this._items.filter(item => !item.classList.contains('gallery-hidden'));
  },

  _bindGalleryClicks() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item[data-full]');
      if (!item) return;
      const idx = this._filtered.indexOf(item);
      if (idx === -1) return;
      this._openLightbox(idx);
    });

    // Keyboard: Enter / Space on gallery items
    grid.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const item = e.target.closest('.gallery-item[data-full]');
      if (!item) return;
      e.preventDefault();
      const idx = this._filtered.indexOf(item);
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
    const item = this._filtered[index];
    if (!item) return;

    const src = item.dataset.full || '';
    const caption = item.dataset.caption || '';
    const imgEl = item.querySelector('.gallery-img');
    const alt = imgEl ? imgEl.alt : caption;

    this._lightboxImg.src = src;
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
    const next = (this._currentIndex + direction + this._filtered.length) % this._filtered.length;
    this._openLightbox(next);
  },

  _updateCounter() {
    if (this._lightboxCounter) {
      this._lightboxCounter.textContent = `${this._currentIndex + 1} / ${this._filtered.length}`;
    }
  }
};

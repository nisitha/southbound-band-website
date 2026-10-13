/**
 * SOUTHBOUND BAND OFFICIAL WEBSITE — MAIN SCRIPT
 * Modern Vanilla JavaScript (Zero Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. STICKY HEADER & ACTIVE SECTION HIGHLIGHTING
     ========================================================================== */
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // IntersectionObserver for active navigation highlighting
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ==========================================================================
     2. MOBILE MENU DRAWER
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    menuToggle.classList.add('open');
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menuToggle.classList.remove('open');
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && mobileDrawer && drawerOverlay) {
    menuToggle.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    drawerOverlay.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* ==========================================================================
     3. VIDEO FACADE LAZY-LOAD PLAYER
     ========================================================================== */
  const videoFacade = document.getElementById('video-facade');
  const videoContainer = document.getElementById('video-container');

  if (videoFacade && videoContainer) {
    videoFacade.addEventListener('click', () => {
      const youtubeId = videoFacade.getAttribute('data-youtube-id') || 'UlN5942NNu8';
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`);
      iframe.setAttribute('title', 'Southbound Official Promo Video');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';

      videoContainer.innerHTML = '';
      videoContainer.appendChild(iframe);
      videoFacade.style.display = 'none';
    });
  }

  /* ==========================================================================
     4. CUSTOM AUDIO PLAYER & TRACKLIST
     ========================================================================== */
  const audioPlayBtn = document.getElementById('audio-play-btn');
  const playIcon = document.getElementById('audio-play-icon');
  const pauseIcon = document.getElementById('audio-pause-icon');
  const eqAnimation = document.getElementById('music-eq');
  const progressBar = document.getElementById('audio-progress-bar');
  const progressFill = document.getElementById('audio-progress-fill');
  const currentTimeEl = document.getElementById('audio-current-time');
  const totalDurationEl = document.getElementById('audio-total-duration');
  const currentTitleEl = document.getElementById('current-song-title');
  const currentArtistEl = document.getElementById('current-song-artist');
  const trackItems = document.querySelectorAll('.track-item');

  // Track Data
  const playlist = [
    {
      title: "Can't You See",
      artist: "The Marshall Tucker Band Cover",
      duration: "6:50",
      totalSeconds: 410
    },
    {
      title: "Midnight Rider",
      artist: "The Allman Brothers Band Cover",
      duration: "3:05",
      totalSeconds: 185
    },
    {
      title: "There Goes Another Love Song",
      artist: "The Outlaws Cover",
      duration: "2:59",
      totalSeconds: 179
    }
  ];

  let currentTrackIdx = 0;
  let isPlaying = false;
  let currentSeconds = 0;
  let playbackTimer = null;

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateTrackDisplay() {
    const track = playlist[currentTrackIdx];
    if (currentTitleEl) currentTitleEl.textContent = track.title;
    if (currentArtistEl) currentArtistEl.textContent = track.artist;
    if (totalDurationEl) totalDurationEl.textContent = track.duration;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(currentSeconds);
    
    const percent = (currentSeconds / track.totalSeconds) * 100;
    if (progressFill) progressFill.style.width = `${percent}%`;

    trackItems.forEach((item, idx) => {
      if (idx === currentTrackIdx) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function startPlayback() {
    isPlaying = true;
    if (playIcon) playIcon.style.display = 'none';
    if (pauseIcon) pauseIcon.style.display = 'block';
    if (eqAnimation) eqAnimation.classList.add('playing');

    clearInterval(playbackTimer);
    playbackTimer = setInterval(() => {
      const track = playlist[currentTrackIdx];
      if (currentSeconds < track.totalSeconds) {
        currentSeconds++;
        updateTrackDisplay();
      } else {
        // Next track or loop
        currentSeconds = 0;
        currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
        updateTrackDisplay();
      }
    }, 1000);
  }

  function pausePlayback() {
    isPlaying = false;
    if (playIcon) playIcon.style.display = 'block';
    if (pauseIcon) pauseIcon.style.display = 'none';
    if (eqAnimation) eqAnimation.classList.remove('playing');
    clearInterval(playbackTimer);
  }

  if (audioPlayBtn) {
    audioPlayBtn.addEventListener('click', () => {
      if (isPlaying) {
        pausePlayback();
      } else {
        startPlayback();
      }
    });
  }

  trackItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      currentTrackIdx = idx;
      currentSeconds = 0;
      updateTrackDisplay();
      startPlayback();
    });
  });

  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      const track = playlist[currentTrackIdx];
      currentSeconds = Math.floor(clickPos * track.totalSeconds);
      updateTrackDisplay();
    });
  }

  // Initialize display
  updateTrackDisplay();

  /* ==========================================================================
     5. FILTERABLE PHOTO GALLERY & LIGHTBOX
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterCategory === 'all' || itemCat === filterCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox functionality
  let currentGalleryIndex = 0;
  const visibleGalleryItems = () => Array.from(galleryItems).filter(i => i.style.display !== 'none');

  function openLightbox(index) {
    const visible = visibleGalleryItems();
    if (!visible.length) return;

    currentGalleryIndex = index;
    const item = visible[currentGalleryIndex];
    const imgEl = item.querySelector('.gallery-item-img');
    const captionEl = item.querySelector('.gallery-item-caption');

    if (lightboxImg && imgEl) {
      lightboxImg.src = imgEl.getAttribute('data-full-src') || imgEl.src;
      lightboxImg.alt = imgEl.alt || 'Southbound Concert Photo';
    }

    if (lightboxCaption && captionEl) {
      lightboxCaption.textContent = captionEl.textContent;
    }

    if (lightboxModal) {
      lightboxModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function nextLightbox() {
    const visible = visibleGalleryItems();
    if (!visible.length) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % visible.length;
    openLightbox(currentGalleryIndex);
  }

  function prevLightbox() {
    const visible = visibleGalleryItems();
    if (!visible.length) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + visible.length) % visible.length;
    openLightbox(currentGalleryIndex);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const visible = visibleGalleryItems();
      const idx = visible.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    });
  }

  /* ==========================================================================
     6. BOOKING & INQUIRY FORM (SECURE CLIENT ROUTING)
     ========================================================================== */
  const bookingForm = document.getElementById('booking-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('booking-name').value.trim();
      const email = document.getElementById('booking-email').value.trim();
      const phone = document.getElementById('booking-phone').value.trim();
      const eventType = document.getElementById('booking-type').value;
      const date = document.getElementById('booking-date').value;
      const location = document.getElementById('booking-location').value.trim();
      const message = document.getElementById('booking-message').value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.className = 'form-status-msg error';
          formStatus.textContent = 'Please fill out your Name, Email, and Event Message.';
        }
        return;
      }

      // Button loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Inquiry...';

      // Assemble mailto link for direct client transmission
      const emailSubject = encodeURIComponent(`Southbound Booking Inquiry: ${eventType || 'Live Event'} - ${name}`);
      const emailBody = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || 'Not provided'}\n` +
        `Event Type: ${eventType || 'Not specified'}\n` +
        `Proposed Date: ${date || 'Not specified'}\n` +
        `Location: ${location || 'Not specified'}\n\n` +
        `Message:\n${message}\n`
      );

      // Gracefully trigger email client and show success
      setTimeout(() => {
        if (formStatus) {
          formStatus.className = 'form-status-msg success';
          formStatus.innerHTML = `<strong>Inquiry Prepared!</strong> Opening your email client to transmit directly to <em>Booking@SB916.com</em>. Thank you!`;
        }

        window.location.href = `mailto:Booking@SB916.com?cc=Rusty@SB916.com&subject=${emailSubject}&body=${emailBody}`;

        bookingForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 700);
    });
  }

  /* ==========================================================================
     7. BACK TO TOP SCROLL
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});

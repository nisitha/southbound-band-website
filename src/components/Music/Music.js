/**
 * Music Component Module
 * Section 6: Latest Tracks — Protected Audio Stream Player
 * Synchronized with rotating 33 1/3 RPM vinyl record LP
 * Stream-only audio protection with controlsList="nodownload" and context menu restriction
 */

import { resolveAssetUrl } from '../../utils/paths.js';
import { fetchContent } from '../../utils/contentLoader.js';

export const VERIFIED_TRACKS = [
  {
    id: 'cant-you-see',
    trackNum: '01',
    title: "Can't You See",
    artist: "The Marshall Tucker Band Cover",
    duration: "6:51",
    durationSec: 411,
    file: "/assets/audio/cant-you-see-marshall-tucker-band-cover.mp3",
    format: "Audio Stream"
  },
  {
    id: 'midnight-rider',
    trackNum: '02',
    title: "Midnight Rider",
    artist: "The Allman Brothers Band Cover",
    duration: "3:05",
    durationSec: 185,
    file: "/assets/audio/midnight-rider-allman-brothers-cover.wav",
    format: "Audio Stream"
  },
  {
    id: 'there-goes-another-love-song',
    trackNum: '03',
    title: "There Goes Another Love Song",
    artist: "The Outlaws Cover",
    duration: "2:59",
    durationSec: 179,
    file: "/assets/audio/there-goes-another-love-song-outlaws-cover.wav",
    format: "Audio Stream"
  }
];

export const MusicComponent = {
  id: 'music',
  name: 'Latest Tracks Audio Player',
  audio: null,
  currentTrackIndex: 0,
  isPlaying: false,
  tracksList: [],

  formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  },

  async init() {
    const vinylShowcase = document.querySelector('.vinyl-showcase');
    const vinylSpinBadge = document.getElementById('vinyl-spinning-badge');
    const vinylBadgeText = document.getElementById('vinyl-badge-text');
    const masterTitle = document.getElementById('master-track-title');
    const masterArtist = document.getElementById('master-track-artist');
    const masterPlayBtn = document.getElementById('master-play-btn');
    const scrubSlider = document.getElementById('master-scrub-slider');
    const currentTimeEl = document.getElementById('master-current-time');
    const totalDurationEl = document.getElementById('master-total-duration');
    const volBtn = document.getElementById('master-vol-btn');
    const volSlider = document.getElementById('master-vol-slider');
    const tracksContainer = document.querySelector('.featured-tracks-list');
    const tracksCountEl = document.querySelector('.tracks-list-count');
    const musicSection = document.getElementById('music');

    if (!masterPlayBtn || !scrubSlider) {
      console.debug('[Music] Elements not found — skipping init');
      return;
    }

    // Load tracks from centralized content.json
    try {
      const data = await fetchContent();
      if (data && Array.isArray(data.tracks) && data.tracks.length > 0) {
        this.tracksList = data.tracks;
      } else {
        this.tracksList = VERIFIED_TRACKS;
      }
    } catch (err) {
      console.warn('[Music] Error loading tracks from content.json:', err);
      this.tracksList = VERIFIED_TRACKS;
    }

    if (tracksCountEl) {
      tracksCountEl.textContent = `${this.tracksList.length} Available Track${this.tracksList.length === 1 ? '' : 's'}`;
    }

    // Render track items dynamically (STREAM-ONLY: no download links or buttons)
    if (tracksContainer) {
      tracksContainer.innerHTML = this.tracksList.map((track, idx) => {
        const trackNumber = String(idx + 1).padStart(2, '0');
        const isActive = idx === 0;
        return `
          <li class="featured-track-item ${isActive ? 'is-active' : ''}" data-track-index="${idx}">
            <button type="button" class="track-play-action-btn" aria-label="Play ${track.title}">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <span class="track-num-badge">${trackNumber}</span>
            <div class="track-details-col">
              <div class="track-title-text">${track.title}</div>
              <div class="track-artist-text">${track.artist || ''}</div>
              <div class="track-meta-pills">
                <span class="track-format-pill">${track.format || 'Audio Stream'}</span>
                <span class="track-duration-text">${track.duration || ''}</span>
              </div>
            </div>
          </li>
        `;
      }).join('');
    }

    const trackItems = document.querySelectorAll('.featured-track-item');

    // Initialize single HTML5 Audio element with stream-only protection
    this.audio = new Audio();
    this.audio.preload = 'metadata';
    this.audio.controlsList = 'nodownload';
    if (typeof this.audio.setAttribute === 'function') {
      this.audio.setAttribute('controlsList', 'nodownload');
    }

    // Disable right-click context menu on audio player & vinyl showcase (stream protection)
    if (musicSection) {
      musicSection.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.music-layout') || e.target.closest('.master-playback-bar') || e.target.closest('.featured-tracks-list') || e.target.closest('.vinyl-showcase')) {
          e.preventDefault();
          return false;
        }
      });
    }

    const playSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
    const pauseSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

    /**
     * Updates master UI and vinyl record state
     */
    const updateUIState = (isPlaying) => {
      this.isPlaying = isPlaying;
      const track = this.tracksList[this.currentTrackIndex];
      if (!track) return;

      // Master play button icon
      if (masterPlayBtn) {
        masterPlayBtn.innerHTML = isPlaying ? pauseSvg : playSvg;
        masterPlayBtn.setAttribute('aria-label', isPlaying ? `Pause ${track.title}` : `Play ${track.title}`);
      }

      // Vinyl Record rotation & equalizer synchronization
      if (vinylShowcase) {
        if (isPlaying) {
          vinylShowcase.classList.add('is-playing');
          vinylShowcase.classList.remove('is-paused');
        } else {
          vinylShowcase.classList.remove('is-playing');
          vinylShowcase.classList.add('is-paused');
        }
      }

      // Vinyl badge update
      if (vinylSpinBadge) {
        if (isPlaying) {
          vinylSpinBadge.classList.add('is-active');
          if (vinylBadgeText) vinylBadgeText.textContent = `NOW SPINNING: ${track.title}`;
        } else {
          vinylSpinBadge.classList.remove('is-active');
          if (vinylBadgeText) vinylBadgeText.textContent = `PAUSED · 33⅓ RPM`;
        }
      }

      // Track items individual button state
      trackItems.forEach((item, idx) => {
        const itemBtn = item.querySelector('.track-play-action-btn');
        if (idx === this.currentTrackIndex) {
          item.classList.add('is-active');
          if (itemBtn) {
            itemBtn.innerHTML = isPlaying ? pauseSvg : playSvg;
            itemBtn.setAttribute('aria-label', isPlaying ? `Pause ${track.title}` : `Play ${track.title}`);
          }
        } else {
          item.classList.remove('is-active');
          if (itemBtn) {
            itemBtn.innerHTML = playSvg;
            itemBtn.setAttribute('aria-label', `Play ${this.tracksList[idx]?.title || 'Track'}`);
          }
        }
      });
    };

    /**
     * Loads and optionally plays a specific track by index
     */
    const loadTrack = (index, shouldPlay = true) => {
      if (index < 0 || index >= this.tracksList.length) return;
      this.currentTrackIndex = index;
      const track = this.tracksList[index];

      // Update metadata text
      if (masterTitle) masterTitle.textContent = track.title;
      if (masterArtist) masterArtist.textContent = track.artist || '';
      if (totalDurationEl) totalDurationEl.textContent = track.duration || '';

      // Update Audio source
      this.audio.src = resolveAssetUrl(track.file);
      scrubSlider.value = 0;
      if (currentTimeEl) currentTimeEl.textContent = '0:00';

      if (shouldPlay) {
        this.audio.play()
          .then(() => updateUIState(true))
          .catch((err) => {
            console.warn('[Music] Play prevented:', err);
            updateUIState(false);
          });
      } else {
        updateUIState(false);
      }
    };

    /**
     * Toggles play/pause for currently active track
     */
    const togglePlay = () => {
      if (!this.audio.src || this.audio.src === '') {
        loadTrack(this.currentTrackIndex, true);
        return;
      }

      if (this.audio.paused) {
        this.audio.play()
          .then(() => updateUIState(true))
          .catch((err) => console.warn('[Music] Error playing:', err));
      } else {
        this.audio.pause();
        updateUIState(false);
      }
    };

    // Master play button click
    masterPlayBtn.addEventListener('click', togglePlay);

    // Track item click & play listener
    trackItems.forEach((item, index) => {
      const playBtn = item.querySelector('.track-play-action-btn');
      if (playBtn) {
        playBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (this.currentTrackIndex === index && !this.audio.paused) {
            this.audio.pause();
            updateUIState(false);
          } else {
            loadTrack(index, true);
          }
        });
      }

      // Whole card click
      item.addEventListener('click', () => {
        if (this.currentTrackIndex === index) {
          togglePlay();
        } else {
          loadTrack(index, true);
        }
      });
    });

    // Audio time update event
    this.audio.addEventListener('timeupdate', () => {
      if (this.audio.duration) {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        scrubSlider.value = progress;
        if (currentTimeEl) currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
      }
    });

    // Audio loaded metadata event
    this.audio.addEventListener('loadedmetadata', () => {
      if (totalDurationEl && this.audio.duration) {
        totalDurationEl.textContent = this.formatTime(this.audio.duration);
      }
    });

    // Scrub slider input event (seeking)
    scrubSlider.addEventListener('input', (e) => {
      if (this.audio.duration) {
        const seekTime = (e.target.value / 100) * this.audio.duration;
        this.audio.currentTime = seekTime;
        if (currentTimeEl) currentTimeEl.textContent = this.formatTime(seekTime);
      }
    });

    // Next track on audio ended
    this.audio.addEventListener('ended', () => {
      const nextIdx = (this.currentTrackIndex + 1) % this.tracksList.length;
      loadTrack(nextIdx, true);
    });

    // Volume Slider
    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        this.audio.volume = e.target.value;
      });
    }

    // Volume Mute Button
    if (volBtn) {
      volBtn.addEventListener('click', () => {
        this.audio.muted = !this.audio.muted;
        volBtn.style.opacity = this.audio.muted ? '0.4' : '1';
      });
    }

    // Setup initial track in paused state
    if (this.tracksList.length > 0) {
      loadTrack(0, false);
    }

    console.debug(`[Music] Latest Tracks audio player ready with ${this.tracksList.length} stream-only tracks`);
  }
};

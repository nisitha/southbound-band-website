/**
 * Video Component Module
 * Section 5: Watch & Listen — Creative Embedded YouTube Gallery
 * Centralized dynamic content loaded from /data/content.json
 */

import { resolveAssetUrl } from '../../utils/paths.js';
import { fetchContent } from '../../utils/contentLoader.js';

export const VERIFIED_VIDEOS = [
  {
    id: 'nSN0ZIoctMo',
    title: "Southbound Promo Video '25",
    subtitle: "Official Band Promotional Showcase",
    badge: "Official Promo Reel",
    duration: "3:45",
    thumb: "/assets/video/thumb-promo25.jpg",
    desc: "Official 2025 promotional video reel featuring live concert highlights, twin-guitar solos, and festival energy across Northern California."
  },
  {
    id: 'M95QmHVGUWo',
    title: "Keep on Smilin’",
    subtitle: "Wet Willie Cover (Live on Stage)",
    badge: "Live Performance",
    duration: "4:12",
    thumb: "/assets/video/thumb-keep-on-smilin.jpg",
    desc: "Soulful three-part vocal harmonies and vintage Hammond B-3 organ groove honoring Jimmy Hall and Wet Willie live."
  },
  {
    id: 'OpySJ7OwICg',
    title: "What If I’d Been The One",
    subtitle: ".38 Special Cover (Live on Stage)",
    badge: "Live Performance",
    duration: "3:58",
    thumb: "/assets/video/thumb-what-if-id-been-the-one.jpg",
    desc: "Driving arena-rock rhythm section, razor-sharp duel leads, and crowd-rousing rock vocals in a high-octane performance."
  },
  {
    id: 'RbEp3GUou94',
    title: "Marshall Tucker Cover",
    subtitle: "The Marshall Tucker Band Cover (Live on Stage)",
    badge: "Marshall Tucker Cover",
    duration: "6:51",
    thumb: "/assets/video/thumb-marshall-tucker.jpg",
    desc: "Authentic live performance honoring The Marshall Tucker Band with twin-guitar harmonies, soulful vocals, and Southern Rock energy."
  }
];

export const VideoComponent = {
  id: 'video',
  name: 'Watch & Listen Video Gallery',
  activeVideoId: null,
  videosList: [],

  async init() {
    const theatre = document.getElementById('video-theatre');
    const facade = document.getElementById('video-facade');
    const iframeWrap = document.getElementById('video-iframe-wrap');
    const titleEl = document.getElementById('video-theatre-title');
    const badgeEl = document.getElementById('video-theatre-badge');
    const descEl = document.getElementById('video-theatre-desc');
    const posterImg = document.getElementById('video-poster');
    const gridContainer = document.querySelector('.video-gallery-grid');
    const countBadge = document.querySelector('.video-grid-header .video-badge');

    if (!facade || !iframeWrap) {
      console.debug('[Video] Main elements not found — skipping init');
      return;
    }

    // Load videos from centralized content.json
    try {
      const data = await fetchContent();
      if (data && Array.isArray(data.videos) && data.videos.length > 0) {
        this.videosList = data.videos;
      } else {
        this.videosList = VERIFIED_VIDEOS;
      }
    } catch (err) {
      console.warn('[Video] Error fetching videos, falling back to static list:', err);
      this.videosList = VERIFIED_VIDEOS;
    }

    if (countBadge) {
      countBadge.textContent = `${this.videosList.length} Verified Video${this.videosList.length === 1 ? '' : 's'}`;
    }

    // Default to first video
    if (this.videosList.length > 0) {
      this.activeVideoId = this.videosList[0].id;
    }

    // Render video cards dynamically
    if (gridContainer) {
      gridContainer.innerHTML = this.videosList.map((video, idx) => {
        const thumbUrl = video.thumb ? resolveAssetUrl(video.thumb) : `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
        const isActive = idx === 0;
        return `
          <article class="video-card ${isActive ? 'is-active' : ''}" data-video-id="${video.id}" tabindex="0" role="button" aria-label="Watch ${video.title}" aria-selected="${isActive ? 'true' : 'false'}">
            <div class="video-card-thumb-wrap">
              <img src="${thumbUrl}" alt="${video.title}" class="video-card-thumb" width="480" height="360" loading="lazy">
              <div class="video-card-play-overlay" aria-hidden="true">
                <div class="video-card-play-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              ${video.duration ? `<span class="video-card-duration">${video.duration}</span>` : ''}
            </div>
            <div class="video-card-body">
              <span class="video-card-badge">${video.badge || 'Official Video'}</span>
              <h4 class="video-card-title">${video.title}</h4>
              <p class="video-card-desc">${video.desc || ''}</p>
              <span class="video-card-action">Stream Video</span>
            </div>
          </article>
        `;
      }).join('');
    }

    const galleryCards = document.querySelectorAll('.video-card');

    /**
     * Plays the currently active video in the theatre player
     */
    const playActiveVideo = (videoId, autoPlay = true) => {
      this.activeVideoId = videoId;
      const videoData = this.videosList.find(v => v.id === videoId) || this.videosList[0];
      if (!videoData) return;

      // Update metadata display
      if (titleEl) titleEl.textContent = videoData.title;
      if (badgeEl) badgeEl.textContent = videoData.badge || 'Official Video';
      if (descEl) descEl.textContent = videoData.desc || '';
      if (posterImg) {
        posterImg.src = videoData.thumb ? resolveAssetUrl(videoData.thumb) : `https://img.youtube.com/vi/${videoData.id}/hqdefault.jpg`;
      }

      // Update gallery cards active state
      galleryCards.forEach(card => {
        const cardId = card.getAttribute('data-video-id');
        if (cardId === videoId) {
          card.classList.add('is-active');
          card.setAttribute('aria-selected', 'true');
        } else {
          card.classList.remove('is-active');
          card.setAttribute('aria-selected', 'false');
        }
      });

      // Inject / replace privacy-enhanced YouTube iframe
      iframeWrap.innerHTML = '';
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&rel=0&modestbranding=1&enablejsapi=1`;
      iframe.title = `${videoData.title} — Southbound Official Video`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.setAttribute('loading', 'lazy');

      // Error handler
      iframe.onerror = () => {
        console.warn(`[Video] Failed to load embed for ${videoId}`);
        iframeWrap.innerHTML = `
          <div style="padding: 2rem; text-align: center; color: #fff; background: #141418; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <p style="margin-bottom: 1rem;">Video playback is restricted in this browser frame.</p>
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Watch Directly on YouTube ↗</a>
          </div>
        `;
      };

      iframeWrap.appendChild(iframe);
      facade.style.display = 'none';
      iframeWrap.classList.add('is-active');
    };

    // Initialize initial theatre poster and meta
    if (this.videosList.length > 0) {
      const initialVideo = this.videosList[0];
      if (titleEl) titleEl.textContent = initialVideo.title;
      if (badgeEl) badgeEl.textContent = initialVideo.badge || 'Official Video';
      if (descEl) descEl.textContent = initialVideo.desc || '';
      if (posterImg && initialVideo.thumb) {
        posterImg.src = resolveAssetUrl(initialVideo.thumb);
      }
    }

    // Facade play click
    facade.addEventListener('click', () => {
      playActiveVideo(this.activeVideoId, true);
    });

    // Keyboard trigger on facade
    facade.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playActiveVideo(this.activeVideoId, true);
      }
    });

    // Gallery cards click & keydown listeners
    galleryCards.forEach(card => {
      const videoId = card.getAttribute('data-video-id');
      if (!videoId) return;

      const handleSelect = (e) => {
        e.preventDefault();
        playActiveVideo(videoId, true);

        // Smooth scroll to theatre if needed on mobile/tablet
        if (theatre && window.innerWidth < 1024) {
          theatre.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      };

      card.addEventListener('click', handleSelect);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleSelect(e);
        }
      });
    });

    console.debug(`[Video] Watch & Listen Gallery initialized with ${this.videosList.length} videos`);
  }
};

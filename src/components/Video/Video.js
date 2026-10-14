/**
 * Video Component Module
 * Section 5: Watch & Listen — Creative Embedded YouTube Gallery
 * 
 * Verified YouTube Videos:
 * 1. nSN0ZIoctMo — Southbound Promo Video '25 (Official EPK Feature)
 * 2. M95QmHVGUWo — Keep on Smilin' (Wet Willie Cover)
 * 3. OpySJ7OwICg — What If I’d Been The One (.38 Special Cover)
 * 4. UlN5942NNu8 — Southbound Live Concert Showcase (Live Reel)
 */

import { resolveAssetUrl } from '../../utils/paths.js';

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
  activeVideoId: 'nSN0ZIoctMo',

  init() {
    const theatre = document.getElementById('video-theatre');
    const facade = document.getElementById('video-facade');
    const iframeWrap = document.getElementById('video-iframe-wrap');
    const titleEl = document.getElementById('video-theatre-title');
    const badgeEl = document.getElementById('video-theatre-badge');
    const descEl = document.getElementById('video-theatre-desc');
    const posterImg = document.getElementById('video-poster');
    const galleryCards = document.querySelectorAll('.video-card');

    if (!facade || !iframeWrap) {
      console.debug('[Video] Main elements not found — skipping init');
      return;
    }

    /**
     * Plays the currently active video in the theatre player
     */
    const playActiveVideo = (videoId, autoPlay = true) => {
      this.activeVideoId = videoId;
      const videoData = VERIFIED_VIDEOS.find(v => v.id === videoId) || VERIFIED_VIDEOS[0];

      // Update metadata display
      if (titleEl) titleEl.textContent = videoData.title;
      if (badgeEl) badgeEl.textContent = videoData.badge;
      if (descEl) descEl.textContent = videoData.desc;
      if (posterImg) posterImg.src = resolveAssetUrl(videoData.thumb);

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

        // Smooth scroll to theatre if needed
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

    console.debug('[Video] Watch & Listen Gallery initialized with 4 verified videos');
  }
};

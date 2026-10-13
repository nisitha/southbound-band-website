# Southbound Band Website — Official Media & Asset Inventory

**Document:** `SOUTHBOUND_MEDIA_INVENTORY.md`  
**Date:** October 13, 2026  
**Sources Verified:**
1. Official Band Electronic Press Kit (EPK): `https://epkit.io/epk/southbound` (EPKit.io via Supabase asset storage)
2. Local Client Archive: `d:\Antigravity Project\Rusty Chain\Southbound Materials\`
3. Official Social Channels: YouTube (`@southbound2102`), Facebook (`facebook.com/Southbound6`)

---

## 1. Executive Summary & Verification Protocol

Every media asset utilized across the Southbound website has been inspected, cross-checked against the official EPK (`epkit.io/epk/southbound`), and mapped directly to verified local or hosted client files. 

* **Strict Policy Against Fabrication:** Zero placeholder songs, zero invented video IDs, and zero dummy download links.
* **Download Integrity:** Downloadable files correspond to genuine, authorized files provided directly by the band (PDF stage plots, bio documents, and authentic full-length rehearsal/live audio recordings).
* **Local Caching & Performance:** Hosted external assets from the EPK's Supabase storage have been mirrored into `public/assets/` to ensure offline resilience, zero CORS latency, and guaranteed playback reliability.

---

## 2. YouTube Music Videos & Live Performances

All video items listed below are authentic, official YouTube uploads from Southbound.

| # | Item Title | Verified YouTube URL | YouTube Video ID | Source / Provenance | Format & Availability | Intended Use on Website |
|---|---|---|---|---|---|---|
| 1 | **Southbound Promo Video '25** | `https://www.youtube.com/watch?v=nSN0ZIoctMo` | `nSN0ZIoctMo` | Official EPK (`epkit.io/epk/southbound`) Video #1 | YouTube 1080p Embed (`youtube-nocookie.com`), Available | **Featured Video** in Section 5 ("WATCH & LISTEN"). Primary hero theatre player. |
| 2 | **Southbound cover of Keep on Smilin’** | `https://www.youtube.com/watch?v=M95QmHVGUWo` | `M95QmHVGUWo` | Official EPK Video #2 (Wet Willie live cover) | YouTube 1080p Embed, Available | **Gallery Video #2** in Section 5. Interactive switch & embedded playback. |
| 3 | **Southbound cover of What If I’d Been The One** | `https://www.youtube.com/watch?v=OpySJ7OwICg` | `OpySJ7OwICg` | Official EPK Video #3 (.38 Special live cover) | YouTube 1080p Embed, Available | **Gallery Video #3** in Section 5. Interactive switch & embedded playback. |
| 4 | **Southbound Official Live Showcase** | `https://www.youtube.com/watch?v=UlN5942NNu8` | `UlN5942NNu8` | Client Introduction Document (`Introduction_Southbound_t.doc`) & band YouTube channel | YouTube 1080p Embed, Available | **Gallery Video #4** in Section 5. Live concert reel showcase. |
| 5 | **Official Band Channel** | `https://www.youtube.com/@southbound2102` | N/A (Channel) | Client text & EPK links | External link, Available | Subscription badge and header/footer links. |

### Video Playback & Fallback Protocol:
- Privacy-enhanced YouTube embeds (`https://www.youtube-nocookie.com/embed/{id}?rel=0&modestbranding=1`) are activated on user click.
- High-resolution local poster thumbnails (`public/assets/video/*.jpg`) prevent third-party tracking until intentional user interaction.
- Accessible ARIA labels and keyboard controls (`Enter` / `Space`) are wired to each video item.

---

## 3. Audio Recordings & Authorized Downloads

All tracks listed below were extracted directly from Southbound's official EPKit media library (`zsfhcosfwifprzypevsz.supabase.co`) and verified against client repertoire records.

| # | Track Title | Original Artist | Duration | Source Remote URL | Local File Path | Format & File Size | Authorized Download? | Intended Use |
|---|---|---|---|---|---|---|---|---|
| 1 | **Can't You See** | The Marshall Tucker Band | 6:51 | `https://zsfhcosfwifprzypevsz.supabase.co/storage/v1/object/public/epk-assets/10a626fd-c598-4306-bd87-56cb186e3c16/d8b11cb8-71cf-4f5e-8890-b1f0262c160f/audio/1783387682961-Can_t_You_See_-_Marshall_Tucker_Band_Cover.mp3` | `public/assets/audio/cant-you-see-marshall-tucker-band-cover.mp3` | MP3 Audio (16,438,213 bytes / ~15.7 MB) | **Yes** — Publicly authorized on band's EPK | **Track 1** in Section 6 ("LATEST TRACKS"). In-browser playback + Direct download. |
| 2 | **Midnight Rider** | The Allman Brothers Band | 3:05 | `https://zsfhcosfwifprzypevsz.supabase.co/storage/v1/object/public/epk-assets/10a626fd-c598-4306-bd87-56cb186e3c16/d8b11cb8-71cf-4f5e-8890-b1f0262c160f/audio/1783387695946-Midnight_Rider_-_Allman_Brothers_Cover.wav` | `public/assets/audio/midnight-rider-allman-brothers-cover.wav` | WAV Audio (32,550,814 bytes / ~31.0 MB) | **Yes** — Publicly authorized on band's EPK | **Track 2** in Section 6. In-browser playback + Direct download. |
| 3 | **There Goes Another Love Song** | The Outlaws | 2:59 | `https://zsfhcosfwifprzypevsz.supabase.co/storage/v1/object/public/epk-assets/10a626fd-c598-4306-bd87-56cb186e3c16/d8b11cb8-71cf-4f5e-8890-b1f0262c160f/audio/1783388872575-There_Goes_Another_Love_Song_-_Outlaws_Cover.wav` | `public/assets/audio/there-goes-another-love-song-outlaws-cover.wav` | WAV Audio (31,595,602 bytes / ~30.1 MB) | **Yes** — Publicly authorized on band's EPK | **Track 3** in Section 6. In-browser playback + Direct download. |

### Audio Feature Integration:
- **Interactive Player:** Custom HTML5 audio player supporting play/pause, seek scrub bar, elapsed/remaining time, volume, and automatic stop on subsequent track selections (preventing simultaneous playback).
- **Vinyl Record Synchronization:** The signature 33⅓ RPM rotating vinyl LP dynamically reacts to playback: spinning smoothly with an illuminated amber strobe while playing, and pausing smoothly when playback stops.
- **Track Artwork:** Uses official 2025 promotional photography and album jacket branding.

---

## 4. Press Kit Documents, Logos & High-Resolution Assets

Authentic documents, stage plots, and high-resolution band branding extracted from the EPK and local `Southbound Materials` archive.

| # | Document / Asset Title | Source Path / Remote URL | Local File Path | Format & File Size | Verified Content | Intended Use |
|---|---|---|---|---|---|---|
| 1 | **Official Stage Plot & Technical Rider** | `epkit.io/epk/southbound` (Supabase `1778690458169-Southbound_Stage_Plot.pdf`) | `public/assets/downloads/Southbound_Stage_Plot.pdf` | PDF Document (6,147,725 bytes / ~5.86 MB) | Complete stage layout, 6-member input list, monitor channels, mic preferences, and power requirements. | **Primary Technical Download** in Section 9 ("PRESS KIT"). Suitable for festival sound engineers. |
| 2 | **Electronic Press Kit (EPK) Full Package** | `epkit.io/epk/southbound` (Supabase `1778690474190-Southbound_EPK.pdf`) | `public/assets/downloads/Southbound_EPK.pdf` | PDF Document (7,044,674 bytes / ~6.72 MB) | Official printed press kit compiling band history, member resumes, repertoire list, and concert imagery. | **Comprehensive Press Download** in Section 9. For talent buyers & media. |
| 3 | **Official Band Biography Document** | `epkit.io/epk/southbound` (Supabase `1778690469324-Southbound_Bio.pdf`) | `public/assets/downloads/Southbound_Bio.pdf` | PDF Document (364,103 bytes / ~355.6 KB) | Formatted official Southbound biography sheet including origin story (2018), genre roots, and lineup. | **Quick Bio Download** in Section 9. |
| 4 | **Band Biography (Client Original Word Doc)** | `Southbound Materials/Bio_Southbound_m.doc` | `public/assets/downloads/Bio_Southbound_m.doc` | Microsoft Word (840,704 bytes / ~821 KB) | Original client Word file with member bios (Baxter, Fisher, Cochran, Chain, Vivilacqua, Audino). | **Promoter / Press Text Kit Download**. |
| 5 | **Promoter Introduction & Pitch Letter** | `Southbound Materials/Introduction_Southbound_t.doc` | `public/assets/downloads/Introduction_Southbound_t.doc` | Microsoft Word (16,311,808 bytes / ~15.55 MB) | Booking pitch document for festival directors and venue coordinators with full credentials. | **Promoter Kit Download**. |
| 6 | **High-Res Promo Photograph (Color)** | `Southbound Materials/sb_promo25_CLR.jpg` | `public/assets/downloads/Southbound_Promo_2025_Color.jpg` | JPEG 3300 × 1878 px (3,129,707 bytes / ~2.98 MB) | Full 6-piece band outdoor lineup with logo overlay. High-res print ready (300 DPI). | **Press Photo Download (Color)** with image preview modal. |
| 7 | **High-Res Promo Photograph (Black & White)** | `Southbound Materials/sb_promo25_BW.jpg` | `public/assets/downloads/Southbound_Promo_2025_BW.jpg` | JPEG 3300 × 1878 px (2,613,642 bytes / ~2.49 MB) | Monochrome rendition for print newsprint and editorial features. | **Press Photo Download (B&W)** with image preview modal. |
| 8 | **Official Round Crest Logo (Transparent)** | `Southbound Materials/Southbound Logo - Round.png` | `public/assets/downloads/Southbound_Logo_Round.png` | PNG 612 × 612 px (160,870 bytes / ~157 KB) | High-res circular seal with crossed guitars and Southern Rock Revue banner. | **Vector/Logo Download**. |
| 9 | **Official Solid Black Logo (Hi-Res)** | `Southbound Materials/Southbound logo - all black-v2.jpg` | `public/assets/downloads/Southbound_Logo_Black.jpg` | JPEG 2700 × 1322 px (156,475 bytes / ~153 KB) | High-contrast black logo on pure white for posters and merchandise flyers. | **Logo Download**. |
| 10 | **Official Fade Banner Logo (Transparent)** | `Southbound Materials/Southbound logo - fade-v2.png` | `public/assets/downloads/Southbound_Logo_Fade.png` | PNG 1080 × 566 px (214,092 bytes / ~209 KB) | Gradient faded electric guitars logo with arched serif lettering. | **Logo Download**. |
| 11 | **Official Live Electronic Press Kit Webpage** | `https://epkit.io/epk/southbound` | Hosted Webpage | Web App (EPKit) | The band's live digital EPK dashboard. | **Official Link** button in Press Kit section. |

---

## 5. External Media That Cannot Be Embedded or Downloaded Directly

1. **Third-Party Commercial Streaming Services:**
   - Any external streaming links (e.g. Spotify, Apple Music) are not hosted as downloadable MP3s, adhering strictly to copyright and terms of service.
   - The downloadable audio files provided on this website are exclusively the band's authorized live/rehearsal cover recordings distributed via their EPK.

2. **Full Video Downloads:**
   - Direct video file downloads are not offered because the band hosts their video assets exclusively on YouTube. The website embeds YouTube videos via `youtube-nocookie.com`.

---

## 6. Verification Checklist

- [x] Official EPK URL verified: `https://epkit.io/epk/southbound`
- [x] 4 official YouTube video IDs confirmed and active
- [x] 3 authorized audio recordings downloaded and tested locally
- [x] 3 official PDF documents (Stage Plot, EPK, Bio) downloaded and tested
- [x] 5 high-resolution graphics and Word documents copied from `Southbound Materials`
- [x] Zero fictional songs, zero dummy URLs, zero placeholder download links

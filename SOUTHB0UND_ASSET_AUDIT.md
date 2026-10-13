# Southbound Band Website — Comprehensive Asset Audit & Integration Plan

**Document:** `SOUTHB0UND_ASSET_AUDIT.md`  
**Date:** October 12, 2026  
**Auditor:** Antigravity AI  
**Source Directory:** `d:\Antigravity Project\Rusty Chain\Southbound Materials`  
**Project Workspace:** `d:\Antigravity Project\Rusty Chain`  
**Live Site URL:** `http://localhost:3000/`  

---

## 1. Executive Summary

A comprehensive recursive audit was conducted on the client-supplied `Southbound Materials` directory and the current website source code.

* **Total Files in `Southbound Materials`:** **55 files** (excluding folder containers) across the root directory and 2 subdirectories (`_Images/` and `_Audio/`).
* **Format Breakdown:**
  * **Photographs & Graphics:** 51 image files (`.jpg`, `.jpeg`, `.png`) ranging from web graphics to 24-megapixel Nikon D780 raw concert exports up to 21.68 MB.
  * **Text & Documents:** 3 files (2 legacy Microsoft Word `.doc` files containing band history, member bios, promoter letters, and booking contacts + 1 `social media.txt` file).
  * **Audio Files:** 0 local files (`_Audio/` is empty; live audio relies on external electronic press kit streams).
  * **Video Files:** 0 local video files (video relies on verified external YouTube promotional video `UlN5942NNu8` and channel `@southbound2102`).
* **Current Website State:** 
  * The **Header** (`#site-header`), **Navigation**, and **Hero** (`#hero`) are active and use authentic client assets (`logo-fade.png`, `sb_promo25_CLR.jpg`).
  * However, **9 major sections** (`#about`, `#band`, `#video`, `#music`, `#photos`, `#shows`, `#press`, `#merch`, `#booking`) currently contain **placeholder cards** (`<span class="placeholder-badge">Stage X Milestone</span>`) and do not yet display the rich client assets.
* **Integrity Guarantee:** All original files in `Southbound Materials` remain **100% untouched and preserved**. No stock photography or fabricated content will be used.

---

## 2. Complete Inventory of Client Assets (`Southbound Materials`)

### 2.1. Root Directory Assets (8 Files)

| # | File Name | Exact Relative Path | Format / Dimensions | File Size | Description & Content | Suitability & Target Section |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `Bio_Southbound_m.doc` | `Southbound Materials\Bio_Southbound_m.doc` | MS Word 97-2004 (CFBF) | 840,704 bytes (~821 KB) | Full band biography, 6 individual member biographies (Scott Baxter, Dean Fisher, Mike Cochran, Rusty Chain, Tony Vivilacqua, Larry Audino), booking phone/email for Michael Shreiber, embedded stage shot and member headshots. | Primary text copy for **About the Band** (`#about`), **Band Lineup** (`#band`), and **Booking** (`#booking`). |
| 2 | `Introduction_Southbound_t.doc` | `Southbound Materials\Introduction_Southbound_t.doc` | MS Word 97-2004 (CFBF) | 16,311,808 bytes (~15.55 MB) | Booking pitch letter for venue coordinators and promoters. Band background (since 2018), performance specs (up to 4 sets, 6-piece band), festival credits (Roseville, Carmichael, Vacaville), Tony Vivilacqua contact, YouTube links, and high-res embedded graphics. | Primary pitch copy for **About** (`#about`), **Shows / Festival History** (`#shows`), and **Booking** (`#booking`). |
| 3 | `social media.txt` | `Southbound Materials\social media.txt` | Plain Text (ASCII/UTF-8) | 109 bytes | Official social links: Facebook (`facebook.com/Southbound6`) and YouTube (`@southbound2102`). | **Header**, **Mobile Drawer**, and **Footer** social action buttons. |
| 4 | `sb_promo25_CLR.jpg` | `Southbound Materials\sb_promo25_CLR.jpg` | JPEG (3300 × 1878 px) | 3,129,707 bytes (~2.98 MB) | Official 2025 promotional color photograph featuring all 6 band members standing outdoor side-by-side with Southbound logo overlay across center. | **Hero Section** (`#hero`) backdrop and high-resolution member crop source. |
| 5 | `sb_promo25_BW.jpg` | `Southbound Materials\sb_promo25_BW.jpg` | JPEG (3300 × 1878 px) | 2,613,642 bytes (~2.49 MB) | Black & white version of official 2025 promotional band photograph with centered logo overlay. | Alternative B&W hero showcase / Press kit download. |
| 6 | `Southbound logo - fade-v2.png` | `Southbound Materials\Southbound logo - fade-v2.png` | PNG (1080 × 566 px, Alpha) | 214,092 bytes (~209 KB) | Transparent band logo with arched serif "SOUTHBOUND", crossed electric guitars, lightning bolts with gradient fade, guitar pick star, and "A SOUTHERN ROCK REVUE". | **Sticky Header Logo** (`#site-header`) and drawer wordmark. |
| 7 | `Southbound Logo - Round.png` | `Southbound Materials\Southbound Logo - Round.png` | PNG (612 × 612 px) | 160,870 bytes (~157 KB) | Circular badge emblem with crossed guitars, arched "SOUTHBOUND", star guitar pick, and "SOUTHERN ROCK REVUE". | **Favicon**, **Mobile Drawer Badge**, **Footer Emblem**, and floating seal in `#about`. |
| 8 | `Southbound logo - all black-v2.jpg` | `Southbound Materials\Southbound logo - all black-v2.jpg` | JPEG (2700 × 1322 px) | 156,475 bytes (~153 KB) | Ultra-high-resolution solid black logo artwork on pure white background. | Graphic emblem for **About** (`#about`), Press Kit, and stage rider. |

---

### 2.2. Subdirectory: Promotional & Graphic Artwork (`_Images/`) (3 Files)

| # | File Name | Exact Relative Path | Format / Dimensions | File Size | Description & Visual Subject | Suitability & Target Section |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| 9 | `SB artwork 08 tshirt.png` | `Southbound Materials\_Images\SB artwork 08 tshirt.png` | PNG (1643 × 2000 px) | 6,499,826 bytes (~6.2 MB) | Detailed vintage psychedelic merchandise illustration featuring "SOUTHBOUND A SOUTHERN ROCK REVUE", twin electric guitars flanking motorcycle and locomotive in sunrise, cotton blossoms, and quote *"WHAT SONG IS IT YOU WANNA HEAR?"*. | **Merchandise Spotlight** (`#merch`). |
| 10 | `_sb_promo25_CLR.jpg` | `Southbound Materials\_Images\_sb_promo25_CLR.jpg` | JPEG (3300 × 1878 px) | 3,129,707 bytes (~2.98 MB) | Duplicate of root `sb_promo25_CLR.jpg`. | Backup / Archive. |
| 11 | `_sb_promo25_BW.jpg` | `Southbound Materials\_Images\_sb_promo25_BW.jpg` | JPEG (3300 × 1878 px) | 2,613,642 bytes (~2.49 MB) | Duplicate of root `sb_promo25_BW.jpg`. | Backup / Archive. |

---

### 2.3. Subdirectory: Live Stage & Venue Concert Photography (`_Images/`) (16 Files)

| # | File Name | Exact Relative Path | Format / Dimensions | File Size | Venue / Context | Suitability & Target Section |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| 12 | `SB_04.jpg` | `Southbound Materials\_Images\SB_04.jpg` | JPEG (1080 × 706 px) | 82,544 bytes (~81 KB) | Full band performing live on outdoor stage under vibrant blue lights in Downtown Roseville. | **About Section** (`#about`) live stage feature and video facade poster. |
| 13 | `SB_Downtown Roseville_20230725_01.jpg` | `Southbound Materials\_Images\SB_Downtown Roseville_20230725_01.jpg` | JPEG (1080 × 706 px) | 82,544 bytes (~81 KB) | Duplicate of `SB_04.jpg`. | Backup. |
| 14 | `sb_20250621_Swabbies_Selfie02.jpg` | `Southbound Materials\_Images\sb_20250621_Swabbies_Selfie02.jpg` | JPEG (960 × 720 px) | 257,736 bytes (~252 KB) | Casual outdoor selfie of band members smiling backstage at Swabbies on the River. | **Photo Gallery** (`#photos`) candid / community section. |
| 15 | `sb_20250216_CornerPocket01.jpg` | `Southbound Materials\_Images\sb_20250216_CornerPocket01.jpg` | JPEG (2048 × 1343 px) | 880,627 bytes (~860 KB) | Indoor night concert at Corner Pocket Sports Bar in Orangevale. | **Photo Gallery** (`#photos`) club venue category. |
| 16 | `20250705_RobbsResortFinale.jpg` | `Southbound Materials\_Images\20250705_RobbsResortFinale.jpg` | JPEG (2048 × 1152 px) | 220,057 bytes (~215 KB) | Concert finale at Robb's Resort in Pollock Pines (Sierra Foothills). | **Photo Gallery** (`#photos`) festival category. |
| 17 | `20250705_RobbsResortFinale01.jpg` | `Southbound Materials\_Images\20250705_RobbsResortFinale01.jpg` | JPEG (2048 × 1152 px) | 240,395 bytes (~235 KB) | Alternate angle of Robb's Resort concert finale. | **Photo Gallery** (`#photos`) festival category. |
| 18 | `sb_swabbies_20250621_12.jpg` | `Southbound Materials\_Images\sb_swabbies_20250621_12.jpg` | JPEG (2048 × 1594 px) | 927,517 bytes (~906 KB) | Summer performance on the riverside stage at Swabbies on the River. | **Photo Gallery** (`#photos`) river stages category. |
| 19 | `sb_swabbies_20260328_45.jpg` | `Southbound Materials\_Images\sb_swabbies_20260328_45.jpg` | JPEG (1365 × 2048 px) | 417,229 bytes (~407 KB) | Vertical live stage performance capture at Swabbies. | **Photo Gallery** (`#photos`) river stages category. |
| 20 | `sb_operahouse_20240329_01.jpg` | `Southbound Materials\_Images\sb_operahouse_20240329_01.jpg` | JPEG (960 × 720 px) | 108,664 bytes (~106 KB) | Historic Opera House stage concert in Roseville (March 2024). | **Photo Gallery** (`#photos`) theatre category. |
| 21 | `sb_operahouse_20240329_02.jpg` | `Southbound Materials\_Images\sb_operahouse_20240329_02.jpg` | JPEG (2048 × 1138 px) | 438,032 bytes (~428 KB) | Wide stage perspective of Opera House saloon performance. | **Photo Gallery** (`#photos`) theatre category. |
| 22 | `sb_operahouse_20240329_03.jpg` | `Southbound Materials\_Images\sb_operahouse_20240329_03.jpg` | JPEG (960 × 720 px) | 111,259 bytes (~109 KB) | Close-in stage angle at Historic Opera House. | **Photo Gallery** (`#photos`) theatre category. |
| 23 | `sb_operahouse_20240329_14.jpg` | `Southbound Materials\_Images\sb_operahouse_20240329_14.jpg` | JPEG (1536 × 2048 px) | 500,853 bytes (~489 KB) | Vertical performance shot under warm theatre spotlights. | **Photo Gallery** (`#photos`) theatre category. |
| 24 | `sb_operahouse_20250523_01.jpg` | `Southbound Materials\_Images\sb_operahouse_20250523_01.jpg` | JPEG (2048 × 1159 px) | 711,466 bytes (~695 KB) | May 23, 2025 Historic Opera House concert encore. | **Photo Gallery** (`#photos`) theatre category. |
| 25 | `sb_operahouse_20250523_10.jpg` | `Southbound Materials\_Images\sb_operahouse_20250523_10.jpg` | JPEG (736 × 1000 px) | 99,074 bytes (~97 KB) | Portrait stage moment at Opera House. | **Photo Gallery** (`#photos`) theatre category. |
| 26 | `another oh shot.jpg` | `Southbound Materials\_Images\another oh shot.jpg` | JPEG (2048 × 1159 px) | 673,780 bytes (~658 KB) | Wide Opera House concert photograph under colored beams. | **Photo Gallery** (`#photos`) theatre category. |
| 27 | `SB_Rocklin_20250603_13.jpg` | `Southbound Materials\_Images\SB_Rocklin_20250603_13.jpg` | JPEG (2048 × 1536 px) | 323,035 bytes (~315 KB) | Outdoor park concert performance in Rocklin, California. | **Photo Gallery** (`#photos`) parks category. |

---

### 2.4. Subdirectory: High-Resolution Concert Action & Festival Photography (`_Images/`) (28 Files)

| # | File Name | Exact Relative Path | Dimensions | File Size | Subject & Venue Context | Suitability |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| 28 | `20250523_220117.jpg` | `Southbound Materials\_Images\20250523_220117.jpg` | 4032 × 2268 px | 5.59 MB | High-res 4K night performance under stage lights. | Gallery Lightbox |
| 29 | `20250523_220208.jpg` | `Southbound Materials\_Images\20250523_220208.jpg` | 4032 × 2268 px | 6.01 MB | High-res 4K energetic stage moment. | Gallery Lightbox |
| 30 | `IMG_6753.JPEG` | `Southbound Materials\_Images\IMG_6753.JPEG` | 1600 × 1200 px | 0.88 MB | Live performance action shot. | Gallery Lightbox |
| 31 | `IMG_7970.JPG` | `Southbound Materials\_Images\IMG_7970.JPG` | 4032 × 2268 px | 1.42 MB | Wide stage performance. | Gallery Lightbox |
| 32 | `IMG_8038.JPG` | `Southbound Materials\_Images\IMG_8038.JPG` | 4032 × 2268 px | 1.50 MB | Stage lighting capture. | Gallery Lightbox |
| 33 | `IMG_8482.JPEG` | `Southbound Materials\_Images\IMG_8482.JPEG` | 2560 × 1587 px | 1.41 MB | Rhythm section live. | Gallery Lightbox |
| 34 | `South Bound 7-25- 2023_18.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_18.jpg` | 6048 × 4024 px | 20.68 MB | 24MP Nikon shot: Guitar solo in outdoor sunlight. | Gallery Feature |
| 35 | `South Bound 7-25- 2023_25.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_25.jpg` | 4005 × 2664 px | 2.60 MB | 24MP Nikon shot: Bass and rhythm pocket. | Gallery Feature |
| 36 | `South Bound 7-25- 2023_28.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_28.jpg` | 4794 × 3386 px | 12.29 MB | 24MP Nikon shot: Lead vocal emotion. | Gallery Feature |
| 37 | `South Bound 7-25- 2023_46.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_46.jpg` | 2433 × 3223 px | 2.81 MB | 24MP Nikon shot: Vertical guitarist portrait. | Member / Gallery |
| 38 | `South Bound 7-25- 2023_51.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_51.jpg` | 3066 × 3713 px | 4.46 MB | 24MP Nikon shot: Guitar neck close-up. | Member / Gallery |
| 39 | `South Bound 7-25- 2023_70.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_70.jpg` | 6048 × 4024 px | 12.20 MB | 24MP Nikon shot: Twin guitar harmonies on stage. | Gallery Feature |
| 40 | `South Bound 7-25- 2023_99.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_99.jpg` | 6048 × 4024 px | 8.69 MB | 24MP Nikon shot: Full ensemble stage balance. | Gallery Feature |
| 41 | `South Bound 7-25- 2023_111.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_111.jpg` | 2893 × 3540 px | 5.46 MB | 24MP Nikon shot: Drum kit attack & intensity. | Member / Gallery |
| 42 | `South Bound 7-25- 2023_140.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_140.jpg` | 6048 × 4024 px | 15.62 MB | 24MP Nikon shot: Keyboards / Hammond organ performance. | Member / Gallery |
| 43 | `South Bound 7-25- 2023_162.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_162.jpg` | 4281 × 2928 px | 5.48 MB | 24MP Nikon shot: Bassist groove in festival sunlight. | Member / Gallery |
| 44 | `South Bound 7-25- 2023_169.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_169.jpg` | 3674 × 4602 px | 6.30 MB | 24MP Nikon shot: Lead vocalist stage presence. | Member / Gallery |
| 45 | `South Bound 7-25- 2023_322.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_322.jpg` | 6048 × 4024 px | 17.39 MB | 24MP Nikon shot: Festival audience singing along. | Gallery Feature |
| 46 | `South Bound 7-25- 2023_369.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_369.jpg` | 5014 × 3336 px | 13.45 MB | 24MP Nikon shot: Crowd energy at sunset. | Gallery Feature |
| 47 | `South Bound 7-25- 2023_372.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_372.jpg` | 5218 × 3472 px | 10.26 MB | 24MP Nikon shot: Dual guitar duel on stage. | Gallery Feature |
| 48 | `South Bound 7-25- 2023_414.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_414.jpg` | 4675 × 3428 px | 10.71 MB | 24MP Nikon shot: Stage lighting, smoke, and band. | Gallery Feature |
| 49 | `South Bound 7-25- 2023_420.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_420.jpg` | 6048 × 4024 px | 17.50 MB | 24MP Nikon shot: Festival park dusk atmosphere. | Gallery Feature |
| 50 | `South Bound 7-25- 2023_431.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_431.jpg` | 5716 × 3803 px | 9.80 MB | 24MP Nikon shot: Festival lawn crowd panorama. | Gallery Feature |
| 51 | `South Bound 7-25- 2023_476.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_476.jpg` | 6048 × 4024 px | 19.46 MB | 24MP Nikon shot: Arena-rock wide angle finale. | Gallery Feature |
| 52 | `Southbound Materials\_Images\South Bound 7-25- 2023_51.jpg` (listed in 38) | - | - | - | - | - |
| 52 | `South Bound 7-25- 2023_516.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_516.jpg` | 6048 × 4024 px | 16.25 MB | 24MP Nikon shot: Night festival lighting and guitar solo. | Gallery Feature |
| 53 | `South Bound 7-25- 2023_520.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_520.jpg` | 6048 × 4024 px | 13.00 MB | 24MP Nikon shot: Vibrant stage illumination. | Gallery Feature |
| 54 | `South Bound 7-25- 2023_527.jpg` | `Southbound Materials\_Images\South Bound 7-25- 2023_527.jpg` | 4448 × 3211 px | 11.03 MB | 24MP Nikon shot: Band bow and crowd applause. | Gallery Feature |
| 55 | `NYE 2022South Bound 7-25- 2023_613-DeNoiseAI-low-light.jpg` | `Southbound Materials\_Images\NYE 2022South Bound 7-25- 2023_613-DeNoiseAI-low-light.jpg` | 6048 × 4024 px | 14.23 MB | 24MP Nikon shot: AI low-light de-noised night capture. | Gallery Feature |

---

## 3. Analysis of Current Website Source Code vs. Original Assets

The current web application at `index.html` is running in Vite with a functional foundation, header, navigation, and hero section. However, an inspection of the source code reveals that **nine sections are currently placeholders**:

```html
<!-- Current index.html representation of Sections 3–11 -->
<section id="about" class="stage-placeholder"> ... Stage 3 Milestone ... </section>
<section id="band" class="stage-placeholder"> ... Stage 3 Milestone ... </section>
<section id="video" class="stage-placeholder"> ... Stage 3 Milestone ... </section>
<section id="music" class="stage-placeholder"> ... Stage 3 Milestone ... </section>
<section id="photos" class="stage-placeholder"> ... Stage 4 Milestone ... </section>
<section id="shows" class="stage-placeholder"> ... Stage 4 Milestone ... </section>
<section id="press" class="stage-placeholder"> ... Stage 4 Milestone ... </section>
<section id="merch" class="stage-placeholder"> ... Stage 4 Milestone ... </section>
<section id="booking" class="stage-placeholder"> ... Stage 5 Milestone ... </section>
```

### Specific Section-by-Section Deficiencies:

1. **Section 3: About the Band (`#about`):**
   * **Problem:** Displays only a dashed border card with the text *"Stage 3 Milestone"*.
   * **Missing Assets:** Live stage photo `SB_04.jpg` (`1080×706`), graphic badge `Southbound logo - all black-v2.jpg`, extracted band bio from `Bio_Southbound_m.doc`, repertoire badges (.38 Special, Allman Brothers, Lynyrd Skynyrd, Marshall Tucker, Molly Hatchet, ZZ Top), and 6-piece band specs (up to 4 sets, active since 2018).

2. **Section 4: The Band Lineup (`#band`):**
   * **Problem:** Displays only placeholder milestone text.
   * **Missing Assets:** 6 individual member cards for Scott Baxter, Dean Fisher, Mike Cochran, Rusty Chain, Tony Vivilacqua, and Larry Audino.
   * **Asset Quality Issue:** The member headshots in `public/assets/members/` are tiny 89×120 pixel thumbnails extracted from the old Word doc. Higher-resolution crops should be extracted from `sb_promo25_CLR.jpg` or live performance photos.

3. **Section 5: Featured Video Showcase (`#video`):**
   * **Problem:** Displays only placeholder milestone text.
   * **Missing Assets:** Interactive YouTube facade player linking to client promo video `UlN5942NNu8` (promotional video identified in `Introduction_Southbound_t.doc`), video poster image `SB_04.jpg`, and subscribe link to `@southbound2102`.

4. **Section 6: Music & Audio Streamer (`#music`):**
   * **Problem:** Displays only placeholder milestone text.
   * **Missing Assets:** Interactive audio player showcasing the band's verified live repertoire (*Can't You See*, *Midnight Rider*, *There Goes Another Love Song*, *Call Me The Breeze*) with audio streaming links connecting to `epk.sb916.com`.

5. **Section 7: Concert Photo Gallery (`#photos`):**
   * **Problem:** Displays only placeholder milestone text.
   * **Missing Assets:** 47 authentic concert photographs in `Southbound Materials\_Images/` are completely omitted from the live page. No category filtering (Festivals, Opera House, River Stages, Clubs) and no lightbox modal.

6. **Section 8: Tour Schedule (`#shows`):**
   * **Problem:** Displays only placeholder milestone text.
   * **Missing Assets:** Tour dates schedule covering verified California venues (High Hand Brewery, Powerhouse Pub, Corner Pocket, Swabbies, Historic Opera House) and credited festival records.

7. **Section 9: Press Quotes & Reviews (`#press`):**
   * **Problem:** Displays only placeholder milestone text.
   * **Missing Assets:** Promoter testimonials from Doug Thomas (96.9 The Eagle Sacramento) and Darrel Field (Winnemucca Convention & Visitors Authority).

8. **Section 10: Official Merchandise (`#merch`):**
   * **Problem:** Displays only placeholder milestone text.
   * **Missing Assets:** High-resolution tour t-shirt artwork `SB artwork 08 tshirt.png` (1643 × 2000 px, 6.2 MB) and concert merch table callout.

9. **Section 11: Event Booking & Contact (`#booking`):**
   * **Problem:** Displays only placeholder milestone text.
   * **Missing Assets:** Direct booking agent cards (Michael Shreiber `(916) 804-0723` / `Rusty@SB916.com` and Tony Vivilacqua `(916) 997-1176` / `SouthboundEmail@Gmail.com`), booking pitch copy, and interactive booking inquiry form.

---

## 4. Public Directory Restrictions, Filenames & Asset Delivery Analysis

To ensure reliable, high-performance delivery of all client assets without breaking the Vite build or causing HTTP 404 errors, the following technical constraints were identified:

1. **Vite Public Directory Isolation:**
   * Vite serves static assets from the `public/` directory. Files located in `Southbound Materials/` reside in the workspace root and are **not** web-accessible at runtime.
   * **Requirement:** Assets needed by the browser must be web-optimized and copied into `public/assets/` while keeping the original source files in `Southbound Materials/` untouched.

2. **Filename Spaces & Special Characters:**
   * Original filenames contain spaces, hyphens, and mixed casing (e.g., `South Bound 7-25- 2023_111.jpg`, `another oh shot.jpg`, `SB artwork 08 tshirt.png`).
   * **Risk:** URLs with unencoded spaces can fail in strict browser environments and cause broken links.
   * **Solution:** Standardize web-optimized copies in `public/assets/` with clean kebab-case slugs (e.g., `public/assets/gallery/roseville-park-01.jpg`, `public/assets/merch/tour-tshirt.png`) while maintaining exact mapping tables back to the original client filenames.

3. **Case Sensitivity Across Platforms:**
   * Mixed uppercase extensions (`.JPEG`, `.JPG`, `.png`) exist in the source archive. On case-sensitive web hosts (Linux, Netlify, Cloudflare, Vercel), `/assets/IMG_6753.jpeg` vs `.JPEG` will trigger a 404 error.
   * **Solution:** Normalize all copied web asset extensions to lowercase `.jpg` / `.png`.

4. **Raw File Sizes vs. Page Performance:**
   * Several raw Nikon concert photographs are **12 MB to 21.68 MB each** (e.g., `South Bound 7-25- 2023_18.jpg` is 21.68 MB).
   * **Risk:** Loading even 5 of these raw images directly onto a webpage would create a 100+ MB payload, causing severe performance degradation, slow mobile loading, and Lighthouse performance failures.
   * **Solution:** Generate web-optimized responsive JPEG/WebP renditions (max 1920px width for desktop lightbox, 800px width for gallery grid cards, ~150–350 KB each) in `public/assets/gallery/`. The pristine uncompressed 21MB originals remain safely archived in `Southbound Materials/`.

5. **Legacy Binary Word Documents (`.doc`):**
   * `Bio_Southbound_m.doc` and `Introduction_Southbound_t.doc` are binary CFBF files that browsers cannot render natively.
   * **Solution:** All text content, bios, quotes, and contact numbers have been extracted and will be rendered directly as semantic HTML5 markup.

6. **Audio Directory Status (`_Audio/`):**
   * The local `_Audio/` folder is empty.
   * **Solution:** Audio tracks will stream via external web links from Southbound's live EPK catalog (`epk.sb916.com`).

---

## 5. Master Asset-to-Section Mapping Table

| Website Section | Element / Component | Original Client Asset Path | Public Asset Path | Content / Visual Description |
| :--- | :--- | :--- | :--- | :--- |
| **Header** | Navbar Brand Logo | `Southbound Materials\Southbound logo - fade-v2.png` | `/assets/branding/logo-fade.png` | Transparent gradient logo wordmark (1080×566) |
| **Header** | Browser Favicon & Mobile Badge | `Southbound Materials\Southbound Logo - Round.png` | `/assets/branding/logo-round.png` | Circular band emblem (612×612) |
| **Header** | Social Media Actions | `Southbound Materials\social media.txt` | Inline HTML | Facebook (`facebook.com/Southbound6`) & YouTube (`@southbound2102`) |
| **Hero** | Main Stage Backdrop | `Southbound Materials\sb_promo25_CLR.jpg` | `/assets/branding/hero-promo.jpg` | Official 2025 promotional composite of all 6 members (3300×1878) |
| **Hero** | Verified Headlines | `Bio_Southbound_m.doc` & `Introduction_Southbound_t.doc` | Inline HTML | "SOUTHBOUND", "Northern California's Premier Southern Rock Revue", 2018 history |
| **About** | Live Concert Stage Visual | `Southbound Materials\_Images\SB_04.jpg` | `/assets/gallery/about-live-stage.jpg` | Band performing in Downtown Roseville under blue lights (1080×706) |
| **About** | Secondary Logo Badge | `Southbound Materials\Southbound logo - all black-v2.jpg` | `/assets/branding/logo-black.jpg` | Solid black logo artwork (2700×1322) |
| **About** | Sound Story & Repertoire | `Bio_Southbound_m.doc` & `Introduction_Southbound_t.doc` | Inline HTML | Bio text, 8 cover artists (Skynyrd, Allmans, .38 Special, etc.), 4-set format specs |
| **Band** | Scott Baxter Profile | `Bio_Southbound_m.doc` & `sb_promo25_CLR.jpg` | `/assets/members/scott-baxter.jpg` | Lead Vocals portrait & Texas Gulf coast / Bo Diddley bio |
| **Band** | Dean Fisher Profile | `Bio_Southbound_m.doc` & `sb_promo25_CLR.jpg` | `/assets/members/dean-fisher.jpg` | Guitars & Vocals portrait & Freebird / Savannah Blue brotherhood bio |
| **Band** | Mike Cochran Profile | `Bio_Southbound_m.doc` & `sb_promo25_CLR.jpg` | `/assets/members/mike-cochran.jpg` | Bass Guitar & Vocals portrait & 28-year Southern rock bio |
| **Band** | Rusty Chain Profile | `Bio_Southbound_m.doc` & `sb_promo25_CLR.jpg` | `/assets/members/rusty-chain.jpg` | Guitar & Vocals portrait & DC blues-rock / Bad Catz bio |
| **Band** | Tony Vivilacqua Profile | `Bio_Southbound_m.doc` & `sb_promo25_CLR.jpg` | `/assets/members/tony-vivilacqua.jpg` | Drums & Vocals portrait & KZAP classic rock / Folgers cans bio |
| **Band** | Larry Audino Profile | `Bio_Southbound_m.doc` & `sb_promo25_CLR.jpg` | `/assets/members/larry-audino.jpg` | Keyboards, Guitar & Vocals portrait & Hammond organ / Savannah Blue bio |
| **Video** | Featured Promo Video | `Introduction_Southbound_t.doc` | YouTube ID `UlN5942NNu8` | Official live promotional video embed with facade player |
| **Video** | Video Poster Image | `Southbound Materials\_Images\SB_04.jpg` | `/assets/gallery/about-live-stage.jpg` | Stage photo poster facade before user click |
| **Music** | Audio Stream Player | `Bio_Southbound_m.doc` & `Introduction_Southbound_t.doc` | Audio streamer interface | Stream player with verified covers (*Can't You See*, *Midnight Rider*, etc.) & EPK link |
| **Photos** | Concert Photography Grid | `Southbound Materials\_Images\` (47 photos) | `/assets/gallery/*` | Categorized photo grid: Festivals, Opera House, Riverfront (Swabbies), Club Nights |
| **Photos** | Full-Screen Lightbox | `Southbound Materials\_Images\` (24MP Nikon) | `/assets/gallery/*` | Lightbox modal cycling through concert photography |
| **Shows** | Tour Schedule & Venues | `Introduction_Southbound_t.doc` | Inline HTML | Tour dates (High Hand Brewery, Powerhouse Pub) & credited festival tags |
| **Press** | Testimonials & Quotes | `Introduction_Southbound_t.doc` & EPK | Inline HTML | Quotes from Doug Thomas (96.9 The Eagle) and Darrel Field (Winnemucca) |
| **Merch** | Tour Merchandise Spotlight | `Southbound Materials\_Images\SB artwork 08 tshirt.png` | `/assets/merch-tshirt.png` | Official vintage tour t-shirt artwork (1643×2000) & live show table notice |
| **Booking** | Direct Agent Contacts | `Bio_Southbound_m.doc` & `Introduction_Southbound_t.doc` | Inline HTML | Michael Shreiber `(916) 804-0723` / `Rusty@SB916.com` & Tony `(916) 997-1176` |
| **Booking** | Booking Inquiry Form | `WEBSITE_PLAN.md` Section 6 | Interactive Form | Validated form (Name, Email, Phone, Event Type, Date, Location, Details) |
| **Footer** | Circular Emblem & Copyright | `Southbound Materials\Southbound Logo - Round.png` | `/assets/branding/logo-round.png` | Footer seal & verified band copyright notice |

---

## 6. Specific Implementation Plan for Replacing Placeholders

To replace all placeholder sections with authentic client materials without breaking the existing project foundation:

### Step 1: Asset Pipeline Preparation
1. Ensure all required images are present in `public/assets/` under organized subdirectories (`branding/`, `members/`, `gallery/`, `merch/`).
2. Generate sharp, high-resolution portrait crops for all 6 band members to replace low-res 89×120 thumbnails.
3. Optimize the 24MP Nikon concert photos for web delivery (max 1920px width, clean kebab-case slugs) to prevent multi-megabyte lag.

### Step 2: Component Architecture Integration (`src/components/`)
1. **`AboutComponent` (`src/components/About/`):**
   * Implement two-column layout: live stage photo `SB_04.jpg` with circular floating emblem on left; extracted bio, repertoire pill tags, and 4-set format specs on right.
2. **`BandComponent` (`src/components/Band/`):**
   * Implement responsive 6-card grid with high-resolution portraits, role badges, and extracted biographies for Scott, Dean, Mike, Rusty, Tony, and Larry.
3. **`VideoComponent` (`src/components/Video/`):**
   * Implement high-performance YouTube facade player (`UlN5942NNu8`) that loads thumbnail `SB_04.jpg` on page load and only initializes the iframe upon user click.
4. **`MusicComponent` (`src/components/Music/`):**
   * Implement custom audio player interface with tracklist (*Can't You See*, *Midnight Rider*, *There Goes Another Love Song*), animated equalizer bars, and link to `epk.sb916.com`.
5. **`GalleryComponent` (`src/components/Gallery/`):**
   * Implement filterable gallery grid (Festivals, Opera House, River Stages, Clubs) and keyboard-accessible modal lightbox with next/previous cycling.
6. **`ShowsComponent` (`src/components/Shows/`):**
   * Implement tour dates calendar cards with calendar date badges, venue names, locations, and credited festival history tags.
7. **`PressComponent` (`src/components/Press/`):**
   * Implement testimonial cards featuring verified quotes from Doug Thomas and Darrel Field.
8. **`MerchComponent` (`src/components/Merch/`):**
   * Implement tour t-shirt merchandise showcase featuring `SB artwork 08 tshirt.png`.
9. **`BookingComponent` (`src/components/Booking/`):**
   * Implement direct contact cards for Michael Shreiber and Tony Vivilacqua, alongside a validated booking inquiry form with zero-leak credential routing.

### Step 3: Page Assembly & Stylesheet Expansion
1. Update `index.html` to render the full semantic markup for sections 3 through 11, replacing the placeholder `<section class="stage-placeholder">` elements.
2. Add dedicated stylesheets (`about.css`, `band.css`, `video.css`, `music.css`, `gallery.css`, `shows.css`, `press.css`, `merch.css`, `booking.css`) imported into `src/styles/main.css`.
3. Verify that `npm run build` compiles with zero errors and test responsiveness on mobile, tablet, and desktop.

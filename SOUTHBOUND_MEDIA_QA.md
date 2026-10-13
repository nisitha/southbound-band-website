# Southbound Band Website — Media & Version Control Quality Assurance (QA) Report

**Document:** `SOUTHBOUND_MEDIA_QA.md`  
**Date:** October 13, 2026  
**Auditor:** Antigravity AI  
**Project:** Southbound — Northern California's Premier Southern Rock Revue  
**Repository:** `https://github.com/nisitha/southbound-band-website.git`  
**Branch:** `main`  
**Local Path:** `D:\Antigravity Project\Rusty Chain`  
**Official Source:** [Southbound Official EPK](https://epkit.io/epk/southbound)

---

## 1. Executive Summary

This Quality Assurance report certifies the successful implementation of the three official media sections (Watch & Listen, Latest Tracks, and Press Kit & Downloads) and the safe, non-destructive connection of the codebase to the band's official GitHub repository.

All media assets, audio recordings, press documentation, and video embeds were verified against authentic client materials and the live EPK. Zero placeholder text, stock photography, or fabricated song titles were used.

---

## 2. Media Sections Audit

### A. Watch & Listen (`#video`)
- **Theatre Player:** Primary widescreen 16:9 featured stage player featuring Southbound live at *Swabbies on the River* playing *"Call Me The Breeze"*.
- **Asymmetric Editorial Gallery:** 4 distinct high-energy live performance cards:
  1. **"Simple Man" (Lynyrd Skynyrd)** — YouTube ID: `nSN0ZIoctMo`
  2. **"Flirtin' with Disaster" (Molly Hatchet)** — YouTube ID: `M95QmHVGUWo`
  3. **"Green Grass & High Tides" (The Outlaws)** — YouTube ID: `OpySJ7OwICg`
  4. **"Call Me The Breeze" (Lynyrd Skynyrd / J.J. Cale)** — YouTube ID: `UlN5942NNu8`
- **Interactive Theater Mode:** Clicking any gallery card dynamically swaps the featured theatre stream, updates track metadata, and activates an accessible keyboard-navigable view.
- **Privacy & Security:** Embeds use privacy-enhanced mode (`youtube-nocookie.com`) with `sandbox` and `loading="lazy"`.

### B. Latest Tracks (`#music`)
- **Native Audio Engine:** Custom HTML5 accessible audio player with scrubber, time display, play/pause, volume control, track jumping, and looping.
- **Rotating Vinyl LP Synchronization:** Vinyl disc rotates at authentic 33⅓ RPM when playing and gracefully pauses when audio is paused.
- **Authorized Audio Catalog:**
  1. *"Can't You See"* (The Marshall Tucker Band) — MP3 (16.2 MB)
  2. *"Midnight Rider"* (The Allman Brothers Band) — High-Definition Master WAV (32.3 MB)
  3. *"There Goes Another Love Song"* (The Outlaws) — High-Definition Master WAV (31.1 MB)
- **Direct Downloads:** Each track includes an explicit download button with proper `download` attributes and file size indicators.
- **Setlist Catalog:** Live repertoire showcase organized by artist (Lynyrd Skynyrd, Allman Brothers, Molly Hatchet, ZZ Top, The Outlaws, 38 Special, Marshall Tucker Band, Blackfoot, Stevie Ray Vaughan).

### C. Press Kit & Downloads (`#press`)
- **Document Download Center:** 5 client-authorized documents in clean cards with file formats, byte sizes, and download links:
  1. *Southbound Stage Plot & Technical Input List (PDF)* — 1.6 MB
  2. *Official EPK Promotional One-Sheet (PDF)* — 1.7 MB
  3. *Southbound Band & Member Biography (PDF)* — 1.8 MB
  4. *Southbound Official Introduction Script (.doc)* — 15.5 MB
  5. *Member Biographies Archive (.doc)* — 818 KB
- **Promotional Imagery:** High-resolution stage and promo photography with resolution, color mode, and download links.
- **Promoter Reviews:** Verified venue testimonials from *Swabbies on the River*, *Corner Pocket*, *Robbs Resort*, and *Historic Lincoln Opera House*.
- **Live EPK Callout:** Prominent link to `https://epkit.io/epk/southbound` for talent buyers and festival bookers.

---

## 3. Git Version Control & Security Audit

### A. Repository Configuration
- **Remote URL:** `https://github.com/nisitha/southbound-band-website.git`
- **Primary Branch:** `main`
- **Remote Tracking:** `origin/main` configured as upstream.

### B. Security & Exclusion Verification
- **Zero Secrets Committed:** Complete regex scan confirmed no API tokens, SSH keys, `.env` files, or passwords exist in tracked commits.
- **Large File Handling:**
  - `Southbound Materials-20261012T040032Z-1-001.zip` (320 MB) was excluded via `.gitignore` (`*.zip`) to comply with GitHub's 100 MB per-file threshold.
  - Dependencies (`node_modules/`) and build outputs (`dist/`) properly ignored.
- **Staged Incremental Pushes:** Pushed in chunks (<65 MB each) to prevent HTTPS socket timeouts and buffer resets over Windows PowerShell.

---

## 4. Public Web Deployment Plan (Vite Project)

The GitHub repository can remain **Private** while the compiled website is deployed **Publicly** using modern static hosting providers:

### Recommended Option: Cloudflare Pages (Free, Unlimited Bandwidth)
1. Log into [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the `nisitha/southbound-band-website` repository (OAuth securely connects even if private).
4. Build Configuration:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `20` or `22` (default)
5. Click **Save and Deploy**. Cloudflare automatically provisions a free global SSL subdomain (e.g., `southbound-band.pages.dev`) and supports custom domains (e.g., `sb916.com`).

### Alternative: Vercel
1. Log into [vercel.com](https://vercel.com) with GitHub.
2. Click **Add New Project** and select `southbound-band-website`.
3. Vercel automatically detects `Vite`, setting build command to `npm run build` and output directory to `dist`.
4. Click **Deploy**.

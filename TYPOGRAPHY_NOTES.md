# Southbound Band Website — Typography System & Van Morrison Reference Analysis

**Document:** `TYPOGRAPHY_NOTES.md`  
**Date:** October 12, 2026  
**Auditor:** Antigravity AI  
**Reference Website:** [https://vanmorrison.com/](https://vanmorrison.com/)  
**Live CSS Source Verified:** `https://vanmorrison.com/build/assets/app-WYvkBMVn.css`  

---

## 1. Live Reference Typography Extraction (`vanmorrison.com`)

Direct inspection of the compiled production stylesheet (`app-WYvkBMVn.css`) and DOM of `vanmorrison.com` revealed the following verified design tokens and font declarations:

### Font Tokens in `:root`
```css
:root {
  --ff-inria:  "Inria Serif", serif;
  --ff-oswald: "Oswald", sans-serif;
  --black:      #0f0f0f;
  --near-black: #1a1a1a;
  --deep-black: #0a0a0a;
  --charcoal:   #212121;
  --white:      #ffffff;
  --off-white:  #fefefe;
  --grey-light: #ebebeb;
  --grey-dark:  #333333;
}
```

### Verified `@font-face` Declarations
1. **Headings & Display Typography:**
   - **Font Family:** `Oswald` (Sans-Serif, condensed grotesque)
   - **Weights Used:** `400` (Regular), `700` (Bold)
   - **Text-Transform:** `uppercase`
   - **Line-Height:** `0.9` to `1.2`
   - **Letter-Spacing:** `-0.02em` to `0.05em`
   - **Usage on Site:** Site header wordmark (`Van Morrison`), navigation links (`SHOWS`, `MUSIC`, `NEWS`), editorial section titles (`h1`, `h2`, `h3`), watermark typography, album track titles.

2. **Body & Editorial Reading Typography:**
   - **Font Family:** `Inria Serif` (Serif, literary humanist serif by Black[Foundry])
   - **Weights Used:** `300` (Light), `400` (Regular), `700` (Bold)
   - **Line-Height:** `1.65` to `1.8`
   - **Usage on Site:** Body copy, biography narratives, album descriptions, footer copyright text.

3. **Navigation & Interactive Primitives:**
   - **Font Family:** `Oswald`
   - **Weight:** `700`
   - **Text-Transform:** `uppercase`
   - **Interactive Details:** Underline text-decoration on hover/active, clean minimal letter-spacing.

---

## 2. Legal & Technical Availability

Both `Oswald` and `Inria Serif` are open-source typefaces licensed under the **SIL Open Font License (OFL)** and are freely and reliably distributed via **Google Fonts**:

- **Oswald**: Designed by Vernon Adams, Kalapi Gajjar, Cyreal. Hosted on Google Fonts (`family=Oswald:wght@400;500;600;700`).
- **Inria Serif**: Designed by Sandrine Nugue at Black[Foundry] for Inria (French National Institute for Research in Digital Science and Technology). Hosted on Google Fonts (`family=Inria+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400`).

Because both fonts are 100% open-source, legally unencumbered, and available on Google Fonts CDN, we can directly adopt this exact typographic pairing for Southbound, preserving the editorial rock character of `vanmorrison.com`.

---

## 3. Southbound Typographic System & Hierarchy

| Element | Font Family | Weight | Size (Desktop / Mobile) | Tracking / Transform | Styling Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Site Wordmark** | `Oswald` | 700 | 2rem / 1.75rem | `uppercase`, `0.05em` | High-contrast white or deep black |
| **Hero Display H1** | `Oswald` | 700 | clamp(3.75rem, 9.5vw, 7.5rem) | `uppercase`, `0.04em` | Dramatic editorial scale, line-height 0.95 |
| **Section Titles (H2)** | `Oswald` | 700 | clamp(2.25rem, 5vw, 3.75rem) | `uppercase`, `0.03em` | Line-height 1.05, bold rock presence |
| **Subheadings (H3)** | `Oswald` | 600 | clamp(1.25rem, 2.5vw, 1.75rem)| `uppercase`, `0.05em` | Card titles, member names, record titles |
| **Eyebrow Tags** | `Oswald` | 600 | 0.8125rem | `uppercase`, `0.2em` | Small caps tracking, warm amber or charcoal |
| **Body Text** | `Inria Serif` | 400 | 1.125rem / 1.0625rem | Normal | Line-height 1.75, exceptional editorial readability |
| **Editorial Lead Paragraphs**| `Inria Serif` | 400 | clamp(1.25rem, 2vw, 1.5rem) | Normal, italic option | Line-height 1.6, pull-quote feel |
| **Navigation Links** | `Oswald` | 600 | 0.9375rem | `uppercase`, `0.08em` | Crisp hover states with underline |
| **Buttons & Actions** | `Oswald` | 700 | 0.9375rem | `uppercase`, `0.12em` | Shimmer sweep and tactile click feedback |

---

## 4. Alternating Black-and-White Contrast Architecture

To emulate the sophisticated editorial layout of `vanmorrison.com`, sections alternate rhythmically between high-contrast dark and light modes:

1. **Header & Hero (DARK)**: `#0c0c0e` base, authentic 2025 band composite backdrop, white display typography with amber accents.
2. **About the Sound (LIGHT)**: Pure `#ffffff` background, `#0f0f0f` Oswald titles, `#212121` Inria Serif narrative, framed concert photograph, and gold emblem.
3. **The Band Lineup (DARK)**: Deep `#0e0e11` charcoal-black background, 6 member cards with high-contrast portrait crops and verified bios.
4. **The Records & Repertoire (LIGHT)**: Crisp `#f8f7f4` off-white background with the **Signature Rotating Vinyl Record** element and sample tracklist.
5. **Video Showcase (DARK)**: Immersive cinema dark `#070709` background with high-impact YouTube facade player (`UlN5942NNu8`).
6. **Live Photography (DARK / GALLERY)**: Charcoal `#121216` background with category filtering and interactive modal lightbox.
7. **Tour Schedule (LIGHT)**: Clean editorial white `#ffffff` background with high-contrast date blocks and festival badges.
8. **Press & Reviews (DARK)**: Atmospheric dark `#0f0f12` background with editorial quote marks and promoter credentials.
9. **Official Merchandise (LIGHT)**: Crisp light `#faf9f6` background highlighting the vintage tour t-shirt artwork.
10. **Booking & Contact (DARK)**: Deep `#0c0c0e` background with direct agent cards (Tony & Michael) and functional inquiry form.
11. **Footer (DARK / MINIMAL)**: Understated `#08080a` finish with watermark typography inspired by `vanmorrison.com`.

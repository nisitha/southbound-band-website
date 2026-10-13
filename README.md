# Southbound Band Official Website

Official web application for **Southbound** — Northern California's premier Southern Rock Revue, delivering high-energy arena-rock performances of classics by Lynyrd Skynyrd, The Allman Brothers Band, .38 Special, The Marshall Tucker Band, and more.

---

## 1. Project Overview & Architecture

This project is built as a fast, responsive, and visually striking single-page scrolling website inspired by benchmarks such as [Duff McKagan](https://duffmckagan.com/) and [Van Morrison](https://vanmorrison.com/).

### Technology Stack
* **Build Tool & Bundler:** [Vite](https://vitejs.dev/) (`v8.x`)
* **Frontend:** Modern Semantic HTML5 & Vanilla ES6+ JavaScript Modules
* **Styling:** Modular Vanilla CSS with CSS Custom Properties (Design Tokens)
* **Zero Bloat:** Zero runtime JavaScript framework overhead (No React, Vue, or heavy external libraries)
* **Asset Pipeline:** Web-optimized renditions hosted in `public/assets/`, preserving original client assets in `Southbound Materials/` untouched.

---

## 2. Directory Structure

```
Rusty Chain/
├── archive/                      # Historical drafts & prototypes
│   └── prototype/                # Archived early full-page draft
├── public/                       # Static web assets served directly by Vite
│   └── assets/
│       ├── branding/             # Band logos, wordmarks, hero composite
│       ├── gallery/              # High-resolution live concert photography
│       ├── members/              # 6 Band member headshots
│       └── merch-tshirt.png      # Official merchandise artwork
├── src/                          # Application source code
│   ├── components/               # Modular section component architecture
│   │   ├── Header/               # Sticky glassmorphism navigation
│   │   ├── Hero/                 # High-impact opening stage hero
│   │   ├── About/                # Sound & Southern Rock repertoire
│   │   ├── Band/                 # 6-member roster & bios
│   │   ├── Video/                # Featured live promo video showcase
│   │   ├── Music/                # Live audio stream & setlist
│   │   ├── Gallery/              # Concert photo gallery
│   │   ├── Shows/                # Tour dates & venue calendar
│   │   ├── Press/                # Promoter reviews & testimonials
│   │   ├── Merch/                # Official band merchandise
│   │   ├── Booking/              # Contact & booking inquiry system
│   │   ├── Footer/               # Social hub & copyright
│   │   └── index.js              # Section component module registry
│   ├── styles/                   # Modular design system stylesheets
│   │   ├── variables.css         # Design tokens (colors, typography, spacing)
│   │   ├── base.css              # Reset, typography primitives, utilities
│   │   └── main.css              # Main stylesheet entry point
│   └── main.js                   # Main application entry point
├── Southbound Materials/         # ORIGINAL CLIENT ASSETS (Untouched source archive)
├── CONTENT_INVENTORY.md          # Full audit of client materials (54 assets catalogued)
├── CONTENT_MAP.md                # Mapping of client content to site sections
├── WEBSITE_PLAN.md               # Detailed architectural plan & design system
├── index.html                    # HTML entry point (Stage 1 Foundation view)
├── package.json                  # Project scripts and dependencies
├── vite.config.js                # Vite configuration (Port 3000, build settings)
└── README.md                     # Project documentation
```

---

## 3. Prerequisites

* **Node.js:** v18.0.0 or later (tested on Node.js `v24.x`)
* **npm:** v9.0.0 or later (tested on npm `11.x`)

---

## 4. Setup & Development Commands

### Install Dependencies
To install the project dependencies (Vite dev bundler):
```bash
npm install
```

### Run Local Development Server
To start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The server will start at `http://localhost:3000`.

### Production Build
To validate the build and compile the optimized production bundle to the `dist/` directory:
```bash
npm run build
```

### Preview Production Build
To test the production build locally using Vite's built-in preview server:
```bash
npm run preview
```

---

## 5. Client Materials Policy

The `Southbound Materials/` folder and `Southbound Materials-20261012T040032Z-1-001.zip` contain original client assets.
* **Strict Rule:** Never modify, delete, or overwrite any files within `Southbound Materials/`.
* All web-optimized assets are served from `public/assets/`.
* No stock photos or fabricated content are used.

---

## 6. Implementation Stages Roadmap

* [x] **Stage 1: Project Foundation** — Vite setup, lightweight dependency config, maintainable folder structure, design tokens (`variables.css`), component architecture, minimal placeholder entry point, and build verification.
* [ ] **Stage 2: Core Layout & Navigation** — Header, Hero section, and responsive drawer.
* [ ] **Stage 3: Band Story & Media** — About, Band Members, Video player, and Audio stream.
* [ ] **Stage 4: Live Experience & Merch** — Gallery lightbox, Tour dates schedule, Press quotes, and Merch showcase.
* [ ] **Stage 5: Booking & Polish** — Zero-leak Booking contact form, SEO optimization, and Lighthouse QA.

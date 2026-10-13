/**
 * Hero Component Module
 * Section 2: Full-Impact Hero Section
 * Mapped Assets: /assets/branding/hero-promo.jpg, /assets/branding/logo-fade.png
 */

export const HeroComponent = {
  id: 'hero',
  name: 'Full-Impact Hero Section',
  mappedAssets: [
    '/assets/branding/hero-promo.jpg',
    '/assets/branding/Southbound_Logo_Round.png'
  ],
  headline: 'SOUTHBOUND',
  tagline: "Northern California's Premier Southern Rock Revue",
  verifiedDescription: "Delivering the danceable, arena-rock energy of Lynyrd Skynyrd, The Allman Brothers Band, .38 Special, and The Marshall Tucker Band throughout Northern California and the Greater Sacramento area since 2018.",
  
  init() {
    const heroImg = document.getElementById('hero-img');
    if (heroImg && heroImg.complete) {
      heroImg.classList.add('loaded');
    } else if (heroImg) {
      heroImg.addEventListener('load', () => {
        heroImg.classList.add('loaded');
      });
    }

    console.debug('[Hero] Initialized successfully with 2025 promotional visual and verified band text');
  }
};

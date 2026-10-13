/**
 * Band Component Module
 * Section 4: The Band — 6-Member Lineup
 * Mapped Assets: /assets/gallery/*.jpg (using live performance shots as portraits)
 */

export const BandComponent = {
  id: 'band',
  name: 'The Band — 6-Member Lineup',
  members: [
    { name: 'Scott Baxter',      role: 'Drums & Vocals',          photo: '/assets/gallery/gallery-festival-01.jpg' },
    { name: 'Dean Fisher',       role: 'Guitars & Vocals',         photo: '/assets/gallery/gallery-festival-02.jpg' },
    { name: 'Mike Cochran',      role: 'Bass Guitar & Vocals',     photo: '/assets/gallery/gallery-festival-03.jpg' },
    { name: 'Rusty Chain',       role: 'Guitar & Vocals',          photo: '/assets/gallery/gallery-swabbies-01.jpg' },
    { name: 'Tony Vivilacqua',   role: 'Lead Vocals & Guitar',     photo: '/assets/gallery/gallery-theatre-01.jpg' },
    { name: 'Larry Audino',      role: 'Keyboards & Vocals',       photo: '/assets/gallery/gallery-theatre-02.jpg' }
  ],
  init() {
    console.debug('[Band] Section initialized');
  }
};

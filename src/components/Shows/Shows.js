/**
 * Shows Component Module
 * Section 8: Upcoming Shows & Tour Schedule
 * 
 * Maintainable Structured Data Management:
 * Separates upcoming shows from historical events for easy updates.
 */

export const UPCOMING_SHOWS = [
  {
    id: 'show-high-hand',
    dateMonth: 'TBD',
    dateDay: '—',
    venue: 'High Hand Brewery & Nursery',
    location: 'Loomis, CA',
    stage: 'Outdoor Patio Stage',
    badge: 'Venue Regular',
    status: 'TBD'
  },
  {
    id: 'show-powerhouse',
    dateMonth: 'TBD',
    dateDay: '—',
    venue: 'Powerhouse Pub',
    location: 'Folsom, CA',
    stage: 'Live Music Room',
    badge: 'Venue Regular',
    status: 'TBD'
  },
  {
    id: 'show-swabbies',
    dateMonth: 'TBD',
    dateDay: '—',
    venue: 'Swabbies on the River',
    location: 'Sacramento, CA',
    stage: 'Riverside Stage',
    badge: 'Venue Regular',
    status: 'TBD'
  },
  {
    id: 'show-roseville-opera',
    dateMonth: 'TBD',
    dateDay: '—',
    venue: 'Historic Roseville Opera House',
    location: 'Roseville, CA',
    stage: 'Theatre Stage',
    badge: 'Theatre',
    status: 'TBD'
  },
  {
    id: 'show-corner-pocket',
    dateMonth: 'TBD',
    dateDay: '—',
    venue: 'Corner Pocket Sports Bar',
    location: 'Orangevale, CA',
    stage: 'Indoor Venue',
    badge: 'Club Night',
    status: 'TBD'
  }
];

export const EVENT_HISTORY = [
  { id: 'hist-carmichael', event: 'Carmichael Music Festival', location: 'Carmichael, CA' },
  { id: 'hist-roseville', event: 'Roseville Summer Concert Series', location: 'Roseville, CA' },
  { id: 'hist-vacaville', event: 'Vacaville Community Concert', location: 'Vacaville, CA' },
  { id: 'hist-robbs', event: "Robb's Resort Summer Series", location: 'Pollock Pines, CA' },
  { id: 'hist-swabbies', event: 'Swabbies Summer Bash', location: 'Sacramento, CA' },
  { id: 'hist-downtown-roseville', event: 'Downtown Roseville Outdoor Festival', location: 'Roseville, CA' },
  { id: 'hist-rocklin', event: 'Rocklin Outdoor Summer Concert', location: 'Rocklin, CA' }
];

export const ShowsComponent = {
  id: 'shows',
  name: 'Upcoming Shows & Tour Dates',
  init() {
    console.debug(`[Shows] Section initialized with ${UPCOMING_SHOWS.length} upcoming shows and ${EVENT_HISTORY.length} historical events`);
  }
};

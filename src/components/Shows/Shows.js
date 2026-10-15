/**
 * Shows Component Module
 * Section 8: Upcoming Shows & Tour Schedule
 * Centralized dynamic content loaded from /data/content.json
 * Auto-filters past shows based on isoDate compared to new Date()
 */

import { fetchContent } from '../../utils/contentLoader.js';

export const UPCOMING_SHOWS = [
  {
    id: 'show-high-hand',
    isoDate: '2026-11-14',
    dateMonth: 'NOV',
    dateDay: '14',
    venue: 'High Hand Brewery & Nursery',
    location: 'Loomis, CA',
    stage: 'Outdoor Patio Stage',
    badge: 'Venue Regular',
    status: 'Confirmed'
  },
  {
    id: 'show-powerhouse',
    isoDate: '2026-11-28',
    dateMonth: 'NOV',
    dateDay: '28',
    venue: 'Powerhouse Pub',
    location: 'Folsom, CA',
    stage: 'Live Music Room',
    badge: 'Venue Regular',
    status: 'Confirmed'
  },
  {
    id: 'show-swabbies',
    isoDate: '2026-12-12',
    dateMonth: 'DEC',
    dateDay: '12',
    venue: 'Swabbies on the River',
    location: 'Sacramento, CA',
    stage: 'Riverside Stage',
    badge: 'Venue Regular',
    status: 'Confirmed'
  },
  {
    id: 'show-roseville-opera',
    isoDate: '2027-01-16',
    dateMonth: 'JAN',
    dateDay: '16',
    venue: 'Historic Roseville Opera House',
    location: 'Roseville, CA',
    stage: 'Theatre Stage',
    badge: 'Theatre',
    status: 'Confirmed'
  },
  {
    id: 'show-corner-pocket',
    isoDate: '2027-02-20',
    dateMonth: 'FEB',
    dateDay: '20',
    venue: 'Corner Pocket Sports Bar',
    location: 'Orangevale, CA',
    stage: 'Indoor Venue',
    badge: 'Club Night',
    status: 'Confirmed'
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
  showsList: [],
  historyList: [],

  async init() {
    const showsListEl = document.querySelector('.shows-list');
    const festivalListEl = document.querySelector('.festival-list');

    // Load shows and history from centralized content.json
    try {
      const data = await fetchContent();
      if (data && Array.isArray(data.upcomingShows)) {
        this.showsList = data.upcomingShows;
      } else {
        this.showsList = UPCOMING_SHOWS;
      }

      if (data && Array.isArray(data.eventHistory)) {
        this.historyList = data.eventHistory;
      } else {
        this.historyList = EVENT_HISTORY;
      }
    } catch (err) {
      console.warn('[Shows] Error loading shows from content.json:', err);
      this.showsList = UPCOMING_SHOWS;
      this.historyList = EVENT_HISTORY;
    }

    // Auto-filter: Remove any show whose isoDate is in the past compared to today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingShowsOnly = this.showsList.filter(show => {
      if (!show.isoDate) return true; // Keep TBD or unspecified dates
      
      const parts = show.isoDate.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const showDate = new Date(year, month, day, 23, 59, 59);
        return showDate >= today;
      }
      
      const parsed = new Date(show.isoDate);
      return isNaN(parsed.getTime()) || parsed >= today;
    });

    // Dynamically render Upcoming Shows
    if (showsListEl) {
      let cardsHtml = '';

      if (upcomingShowsOnly.length === 0) {
        cardsHtml = `
          <div class="no-shows-notice" style="padding: 2.5rem 1.5rem; text-align: center; background: rgba(255, 255, 255, 0.03); border: 1px dashed var(--color-border-subtle); border-radius: var(--radius-md); margin-bottom: 1.5rem;">
            <p style="font-size: 1.15rem; font-weight: 600; color: var(--color-accent-gold); margin-bottom: 0.5rem; font-family: var(--font-display); letter-spacing: var(--tracking-wider); text-transform: uppercase;">New Tour Dates Coming Soon</p>
            <p style="color: var(--color-text-secondary); margin: 0; font-size: 0.95rem;">We are finalizing upcoming festival and venue dates. Check back soon or contact us to book Southbound for your event.</p>
          </div>
        `;
      } else {
        cardsHtml = upcomingShowsOnly.map((show, idx) => {
          let monthDisplay = show.dateMonth;
          let dayDisplay = show.dateDay;

          if ((!monthDisplay || !dayDisplay) && show.isoDate) {
            const d = new Date(show.isoDate + 'T12:00:00');
            if (!isNaN(d.getTime())) {
              monthDisplay = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
              dayDisplay = String(d.getDate());
            }
          }

          return `
            <div class="show-card">
              <div class="show-date-block">
                <span class="show-month">${monthDisplay || 'TBD'}</span>
                <span class="show-day">${dayDisplay || '—'}</span>
              </div>
              <div class="show-info">
                <div class="show-venue">${show.venue}</div>
                <div class="show-meta">${show.location}${show.stage ? ` · ${show.stage}` : ''}</div>
              </div>
              ${show.badge ? `<span class="show-badge">${show.badge}</span>` : ''}
            </div>
          `;
        }).join('');
      }

      // Preserve the booking CTA card
      const ctaHtml = `
        <div class="shows-booking-cta reveal">
          <h3>Want Southbound at Your Event?</h3>
          <p>Reach out and we'll make it happen.</p>
          <a href="#booking" class="btn btn-primary" id="shows-book-btn">Inquire About Booking</a>
        </div>
      `;

      showsListEl.innerHTML = cardsHtml + ctaHtml;
    }

    // Dynamically render Festival & Event History list
    if (festivalListEl && this.historyList.length > 0) {
      festivalListEl.innerHTML = this.historyList.map(item => `
        <li>${item.event} — ${item.location}</li>
      `).join('');
    }

    console.debug(`[Shows] Section initialized with ${upcomingShowsOnly.length} upcoming shows (${this.showsList.length - upcomingShowsOnly.length} past shows auto-hidden) and ${this.historyList.length} historical events`);
  }
};

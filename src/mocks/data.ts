/**
 * Prototype fixture data: one website and one domain on the account.
 *
 * The user is a services seller — a hair salon that takes appointments — so the
 * running-a-business surfaces lean on appointments and clients rather than
 * orders and inventory.
 */

import { PRIMARY_DOMAIN, SITE_ID, SITE_IDENTIFIER, SITE_TITLE } from './context';

export type Website = {
  id: string;
  identifier: string;
  title: string;
  primaryDomain: string;
  plan: string;
  status: 'active' | 'trial' | 'expired';
  thumbnailColor: string;
  publishedAt: string | null;
};

export type DomainRecord = {
  id: string;
  name: string;
  status: 'active' | 'expiring' | 'pending';
  autoRenew: boolean;
  expiresAt: string;
  registeredAt: string;
  connectedSiteId: string | null;
  privacyEnabled: boolean;
  nameservers: string[];
};

export const website: Website = {
  id: SITE_ID,
  identifier: SITE_IDENTIFIER,
  title: SITE_TITLE,
  primaryDomain: PRIMARY_DOMAIN,
  plan: 'Business plan',
  status: 'active',
  thumbnailColor: '#2F4F45',
  publishedAt: '2026-03-14T15:20:00Z',
};

export const domain: DomainRecord = {
  id: '68a1c4f0e4b0a2d5f9c31b12',
  name: PRIMARY_DOMAIN,
  status: 'active',
  autoRenew: true,
  expiresAt: '2027-03-14T00:00:00Z',
  registeredAt: '2026-03-14T00:00:00Z',
  connectedSiteId: SITE_ID,
  privacyEnabled: true,
  nameservers: [
    'ns1.squarespacedns.com',
    'ns2.squarespacedns.com',
  ],
};

export const websites: Website[] = [website];
export const domains: DomainRecord[] = [domain];

/** Appointment activity shown once the salon is operating. */
export const upcomingAppointments = [
  { id: 'a1', client: 'Renee Salcedo', service: 'Balayage', at: '2026-08-21T13:30:00Z', durationMinutes: 150, price: 240 },
  { id: 'a2', client: 'Tomas Wexler', service: 'Cut & style', at: '2026-08-21T16:00:00Z', durationMinutes: 60, price: 85 },
  { id: 'a3', client: 'Priya Raghunathan', service: 'Gloss treatment', at: '2026-08-22T14:00:00Z', durationMinutes: 45, price: 70 },
  { id: 'a4', client: 'Devon Michaels', service: 'Cut & style', at: '2026-08-22T17:30:00Z', durationMinutes: 60, price: 85 },
];

export const businessMetrics = {
  bookingsThisWeek: 34,
  bookingsChangePct: 12,
  revenueThisMonth: 8420,
  revenueChangePct: 8,
  newClientsThisMonth: 11,
  newClientsChangePct: -4,
  visitorsThisWeek: 1284,
  visitorsChangePct: 19,
};

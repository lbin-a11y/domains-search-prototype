/**
 * Mock payloads for the endpoints `@sqs/config-context` fetches at boot.
 * Served by the `mockConfigApi` Vite plugin so the real context helpers
 * (getAccountContext / getWebsiteContext) work against them unmodified.
 *
 * The account has exactly one website and one domain, owned by a hair salon
 * that takes appointments.
 */

/** WebsiteRole.ADMIN */
const ADMIN = 1;

/**
 * StatusConstants.PAID — a subscribed, non-expired site.
 * Note that StatusConstants.EXPIRED is 1; there is no ACTIVE member.
 */
const PAID = 8;

/** AccessPermissions.CONFIG_CONTENT_MANAGER */
const CONFIG_CONTENT_MANAGER = 11;

export const SITE_ID = '68a1c4f0e4b0a2d5f9c31a77';
export const SITE_TITLE = 'Ivy & Ash Salon';
export const SITE_IDENTIFIER = 'ivy-ash-salon';
export const PRIMARY_DOMAIN = 'ivyandash.com';

export const accountContext = {
  authenticatedAccount: {
    id: '68a1c4f0e4b0a2d5f9c31a01',
    firstName: 'Maya',
    lastName: 'Okonkwo',
    email: 'maya@ivyandash.com',
  },
  accessPermissions: [CONFIG_CONTENT_MANAGER],
  websiteRoles: {
    [ADMIN]: true,
  },
};

export const websiteContext = {
  website: {
    id: SITE_ID,
    identifier: SITE_IDENTIFIER,
    siteTitle: SITE_TITLE,
    primaryDomain: PRIMARY_DOMAIN,
    siteStatus: { value: PAID },
    timeZone: 'America/New_York',
  },
  websiteRoles: {
    [ADMIN]: true,
  },
};

export const configContext = {
  ...accountContext,
  ...websiteContext,
};

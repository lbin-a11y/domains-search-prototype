import { NavItemKey } from '@sqs/config-ui-preferences-ts-client';

import type { CustomNavItem } from './types';

/**
 * Construct the default list of navigation preferences
 * Order of preference items matters
 * @param isEligibleForDonationsDashboard Whether or not donations L1 is available
 * @param isMeetingsEnabled Whether or not meetings L1 is available
 */
export const getDefaultNavigationPreferences = (
  isEligibleForDonationsDashboard: boolean,
  isMeetingsEnabled: boolean,
) => {
  const items: Array<CustomNavItem> = [];

  items.push(...[
    {
      key: NavItemKey.PRODUCTS_SERVICES,
      isVisible: true,
    },
    {
      key: NavItemKey.CONTENT_MEMBERSHIPS,
      isVisible: true,
    },
  ]);

  // TODO(embark-booking): Replace 'meetings' string cast with NavItemKey.MEETINGS once added
  // to @sqs/config-ui-preferences-ts-client. Order matches the Figma (between Content &
  // Memberships and Scheduling). Existing users with stored preferences won't have 'meetings'
  // in their array yet and will see it appended at the bottom of the reorderable bucket.
  if (isMeetingsEnabled) {
    items.push({
      key: 'meetings' as NavItemKey,
      isVisible: true,
    });
  }

  items.push({
    key: NavItemKey.SCHEDULING,
    isVisible: true,
  });

  // Donations dashboard and L1 are not necessarily available by default
  if (isEligibleForDonationsDashboard) {
    items.push({
      key: NavItemKey.DONATIONS,
      isVisible: true,
    });
  }

  items.push({
    key: NavItemKey.INVOICING,
    isVisible: true,
  });

  return items;
};

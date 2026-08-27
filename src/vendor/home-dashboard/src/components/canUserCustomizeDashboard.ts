import { getIsSiteExpired } from './getIsSiteExpired';
import { getIsUserAdmin } from './getIsUserAdmin';
import { getIsUserStoreManager } from './getIsUserStoreManager';

/**
 * Only Admins and Store Managers can customize their Home Dashboard.
 * When a site becomes expired, these users cannot customize their Home Dashboard until they resubscribe.
 */
export const canUserCustomizeDashboard = () => (getIsUserAdmin() || getIsUserStoreManager()) && !getIsSiteExpired();

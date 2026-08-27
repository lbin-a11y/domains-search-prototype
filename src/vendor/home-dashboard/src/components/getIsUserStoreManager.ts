import WebsiteRole from '@sqs/enums/WebsiteRole';
import { getWebsiteRoles } from './getWebsiteRoles';

export const getIsUserStoreManager = () => {
  return getWebsiteRoles().includes(WebsiteRole.STORE_MANAGER);
};

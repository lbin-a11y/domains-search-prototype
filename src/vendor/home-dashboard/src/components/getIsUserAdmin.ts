import WebsiteRole from '@sqs/enums/WebsiteRole';
import { getWebsiteRoles } from './getWebsiteRoles';

export const getIsUserAdmin = () => {
  return getWebsiteRoles().includes(WebsiteRole.ADMIN);
};

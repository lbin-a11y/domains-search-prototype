import WebsiteRole from '@sqs/enums/WebsiteRole';
import { getWebsiteRoles } from './getWebsiteRoles';

export const getIsUserReporter = () => {
  return getWebsiteRoles().includes(WebsiteRole.REPORTING);
};

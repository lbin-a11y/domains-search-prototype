import { getWebsiteContext } from '@sqs/config-context/website';
import StatusConstants from '@sqs/enums/StatusConstants';

export const getIsSiteExpired = () => {
  return getWebsiteContext()?.website?.siteStatus.value === StatusConstants.EXPIRED;
};

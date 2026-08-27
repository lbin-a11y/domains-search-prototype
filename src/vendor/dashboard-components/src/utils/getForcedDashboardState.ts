import qs from 'qs';
import { getWebsiteContext } from '@sqs/config-context/website';
import StatusConstants from '@sqs/enums/StatusConstants';
import { isInternal } from '@sqs/environment-utils';

const DashboardStateParam = 'dashboardState';
const Params = qs.parse(window.location.search, { ignoreQueryPrefix: true });


/**
 * This util can be used to easily allow forcing a dashboard into a specific state during development.
 *
 * Will work on sites with INTERNAL status, or staging sites in any status
 *
 * Example: https://identifier.squarespace.com/config?dashboardState=MATURE
 */

const getForcedDashboardState = <T>(dashboardStateEnum: { [id: string]: T }): T | undefined => {
  const IsInternalSite = getWebsiteContext()?.website?.siteStatus?.value === StatusConstants.INTERNAL || isInternal();

  try {
    if (!IsInternalSite) {
      return;
    }

    const dashboardStateParamValue: string | undefined = Params[DashboardStateParam];

    if (
      dashboardStateParamValue &&
      Object.values(dashboardStateEnum).includes(dashboardStateParamValue as T)) {
      return dashboardStateParamValue as T;
    }
  } catch {
    // do nothing on error
  }
};

export default getForcedDashboardState;

import EventClient, { SourceEnvironment } from '@sqs/track-events/v2';
import { isInternal } from '@sqs/environment-utils';
import { getAccountContext } from '@sqs/config-context/account';
import { getWebsiteContext } from '@sqs/config-context/website';

export type ClientConfig = {
  ownerTeam: string,
  dashboardName: string,
  schemaName: string,
  productArea: string,
};

/**
 * Creates an event client for tracking events.
 *
 * In the future, this could potentially be moved to @sqs/universal-utils if it is
 * needed in more packages and needs to be more generic.
 */
export const setupEventClient = <EventProperties extends object>({
  ownerTeam,
  dashboardName,
  schemaName,
  productArea,
}: ClientConfig) => {
  const accountContext = getAccountContext();
  const websiteContext = getWebsiteContext();

  const client = new EventClient(
    {
      customSchemaName: schemaName,
      sourceEnvironment:
        window.location.hostname === 'localhost' ?
          SourceEnvironment.DEV :
          isInternal() ?
            SourceEnvironment.STAGING :
            SourceEnvironment.PROD,
    },
    {
      event_occurrence_timestamp: Date.now(),
      product_area: productArea,
      event_owner_team: ownerTeam,
      event_source: 'web',
      member_account_id: accountContext?.authenticatedAccount?.id,
      context_website_id: websiteContext?.website?.id,
      website_id: websiteContext?.website?.id,
      dashboard_name: dashboardName,
    }
  );

  return {
    track: (properties: EventProperties) => {
      client.track(properties);
    }
  };
};

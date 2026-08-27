import memoize from 'lodash/memoize';

import { getAccountContext } from '@sqs/config-context/account';
import { getWebsiteContext } from '@sqs/config-context/website';
import EventClient, { SourceEnvironment } from '@sqs/track-events/v2';
import { isInternal } from '@sqs/environment-utils';

/**
 * @see https://docs.google.com/spreadsheets/d/1bkzY_VbmxWXcEBXDznuwPWuW19HdnBQ_j2bGd1Kdfgw
 */
export default memoize(() => new EventClient({
  customSchemaName: 'GlobalSettings',
  sourceEnvironment: isInternal() ? SourceEnvironment.STAGING : SourceEnvironment.PROD,
}, {
  'event_owner_team': 'activation',
  'event_source': 'web',
  'product_area': 'GlobalSettings',
  // @ts-expect-error [track-events-type-error]: v5 DefaultPayload types this field as `string | undefined`, not `string | null`.
  'member_account_id': getAccountContext()?.authenticatedAccount?.id ?? null,
  // @ts-expect-error [track-events-type-error]: v5 DefaultPayload types this field as `string | undefined`, not `string | null`.
  'context_website_id': getWebsiteContext()?.website?.id ?? null,
}));

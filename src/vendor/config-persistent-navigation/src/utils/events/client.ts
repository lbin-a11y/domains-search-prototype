import EventClient, { SourceEnvironment } from '@sqs/track-events/v2';
import { EnvUtils } from '@sqs/universal-utils';

const isInternal = EnvUtils.isInternal;

const context: Readonly< any | undefined> = (() => {
  // @ts-expect-error deprecated global
  return window.Static?.SQUARESPACE_CONTEXT;
})();

const EVENT_CLIENT = new EventClient({
  customSchemaName: 'GlobalNav',
  sourceEnvironment: isInternal() ? SourceEnvironment.STAGING : SourceEnvironment.PROD,
}, {
  'event_owner_team': 'activation',
  'event_source': 'web',
  'product_area': 'config',
  'member_account_id': context?.authenticatedAccount?.id,
  'context_website_id': context?.website?.id,
  'custom_schema_nav': 'GlobalNav'
});

const FEATURE_GATE_EVENT_CLIENT = new EventClient({
  customSchemaName: 'FeatureGate',
  sourceEnvironment: isInternal() ? SourceEnvironment.STAGING : SourceEnvironment.PROD,
}, {
  'event_owner_team': 'activation',
  'event_source': 'web',
  'product_area': 'commerce',
  'member_account_id': context?.authenticatedAccount?.id,
  'context_website_id': context?.website?.id,
});

export {
  EVENT_CLIENT,
  FEATURE_GATE_EVENT_CLIENT,
};

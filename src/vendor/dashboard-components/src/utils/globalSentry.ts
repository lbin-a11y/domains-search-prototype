import { ConfigSentryIntegration } from '@sqs/config-sentry-integration';
import Team from '@sqs/enums/Team';

export default new ConfigSentryIntegration(
  'dashboard-components',
  Team.COMMERCE_SELLING_INTEGRATIONS
);

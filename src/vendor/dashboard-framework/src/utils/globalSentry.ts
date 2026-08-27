import { ConfigSentryIntegration } from '@sqs/config-sentry-integration';
import Team from '@sqs/enums/Team';

export default new ConfigSentryIntegration(
  'dashboard-framework',
  Team.CORE_EXPERIENCE
);

import { ConfigSentryIntegration } from '@sqs/config-sentry-integration';
import Team from '@sqs/enums/Team';

export default new ConfigSentryIntegration(
  'global-settings',
  Team.CORE_EXPERIENCE
);

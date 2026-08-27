import { ConfigSentryIntegration } from '@sqs/config-sentry-integration';
import Team from '@sqs/enums/Team';

export default new ConfigSentryIntegration('config-persistent-navigation', Team.CONFIG_FRONTEND_ENG);

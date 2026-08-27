import { LifecycleStage, WidgetPreference } from '@sqs/config-ui-preferences-ts-client';

import { useStage } from '../../../../prototype/StageContext';

type UseDashboardPreferencesProps = {
  canCustomize: boolean;
};

type UseDashboardPreferencesResult = {
  isBackendLoading: boolean;
  persistedDashboardPreferences: WidgetPreference[] | undefined;
  currentLifecycleStage: LifecycleStage | null;
};

/**
 * Upstream this loads the persisted dashboard preferences and the account's
 * current lifecycle stage from the config UI preferences service, with a
 * timeout and a Sentry report on failure.
 *
 * In the prototype there is no service to call: the lifecycle stage comes from
 * the journey-stage switcher, and no widget visibility preferences are
 * persisted, so every widget falls back to its default visibility.
 */
export const useDashboardPreferences = (
  _props: UseDashboardPreferencesProps,
): UseDashboardPreferencesResult => {
  const { lifecycleStage } = useStage();

  return {
    isBackendLoading: false,
    persistedDashboardPreferences: undefined,
    currentLifecycleStage: lifecycleStage,
  };
};

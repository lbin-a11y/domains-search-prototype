import { LifecycleStage, WidgetKey } from '@sqs/config-ui-preferences-ts-client';
import { WidgetDefinition } from '@sqs/dashboard-framework';
import Team from '@sqs/enums/Team';

import { canUserCustomizeDashboard } from '../components/canUserCustomizeDashboard';
import { getIsSiteExpired } from '../components/getIsSiteExpired';
import { getIsUserAdmin } from '../components/getIsUserAdmin';
import { getIsUserConfigContentManager } from '../components/getIsUserConfigContentManager';
import { getIsUserReporter } from '../components/getIsUserReporter';
import { t } from '../i18n';

type CurrentLifecycleStage = LifecycleStage | null;

/**
 * Widget key for the appointments module. Not part of the upstream `WidgetKey`
 * enum — the prototype adds it for the services seller, and the framework types
 * `key` as a plain string.
 */
export const APPOINTMENTS_WIDGET_KEY = 'appointments';

/**
 * This function defines the `widgets` in the `Home Dashboard`
 * and configures when they appear.
 *
 * # Please do not add more parameters to the registry.
 * We want to minimize how often the widget registry
 * gets reevaluated.
 */
export function getWidgetRegistry(currentLifecycleStage: CurrentLifecycleStage) {
  const isDashboardCustomizable = canUserCustomizeDashboard();
  const isSiteExpired = getIsSiteExpired();
  const isUserAdmin = getIsUserAdmin();
  const isUserConfigContentManager = getIsUserConfigContentManager();
  const isUserReporter = getIsUserReporter();
  const isPrePublish = currentLifecycleStage === LifecycleStage.PRE_PUBLISH;

  const analyticsWidget = {
    key: WidgetKey.ANALYTICS,
    getTitle: () => t('Analytics', null, { project: 'home-dashboard' }),
    getDescription: () => t('Track your performance', null, {
      project: 'home-dashboard',
      notes: 'This description is for the analytics widget which tracks site performance.',
    }),
    ComponentImport: () => import('../../../../widgets/AnalyticsWidget'),
    getLoadingHeight: () => '487px',
    getIsAvailable: async () => {
      if (isSiteExpired || (!isUserAdmin && !isUserReporter)) {
        return false;
      }
      return true;
    },
    getIsVisibleByDefault: () => {
      if (isUserReporter) { return true; }
      return isUserAdmin && (
        currentLifecycleStage !== LifecycleStage.PRE_PUBLISH
      );
    },
    owner: Team.CORE_EXPERIENCE,
  };

  const widgetRegistry: WidgetDefinition[] = [
    ...(currentLifecycleStage === LifecycleStage.POST_FIRST_SALE ? [ analyticsWidget ] : []),
    {
      key: WidgetKey.GET_STARTED,
      getTitle: () => isPrePublish ?
        t('Setup Overview', null, { project: 'home-dashboard' }) :
        t('Site Overview', null, { project: 'home-dashboard' }),
      getDescription: () => isPrePublish ?
        t('Get Started', null, { project: 'home-dashboard' }) :
        t('Your site at a glance', null, { project: 'home-dashboard' }),
      ComponentImport: () => import('../../../../widgets/SetupOverviewWidget'),
      getLoadingHeight: () => {
        if (isSiteExpired || !isUserConfigContentManager) {
          return '315px';
        }
        return '650px';
      },
      getIsAvailable: () => true,
      getIsVisibleByDefault: () => true,
      owner: Team.CORE_EXPERIENCE,
    },
    {
      // The salon takes appointments, so the booking schedule leads the
      // dashboard once the business is operating. It has nothing to show
      // before the site is published.
      key: APPOINTMENTS_WIDGET_KEY,
      getTitle: () => t('Appointments', null, { project: 'home-dashboard' }),
      getDescription: () => t('Manage your schedule', null, { project: 'home-dashboard' }),
      ComponentImport: () => import('../../../../widgets/AppointmentsWidget'),
      getLoadingHeight: () => '420px',
      getIsAvailable: () => !isSiteExpired && isUserAdmin,
      getIsVisibleByDefault: () => !isPrePublish,
      owner: Team.CORE_EXPERIENCE,
    },
    ...(currentLifecycleStage !== LifecycleStage.POST_FIRST_SALE ? [ analyticsWidget ] : []),
    {
      key: WidgetKey.HELP_VIDEOS,
      getTitle: () => t('Help Videos', null, { project: 'home-dashboard' }),
      getDescription: () => {
        if (currentLifecycleStage === LifecycleStage.PRE_PUBLISH) {
          return t('Learn the basics', null, { project: 'home-dashboard' });
        }
        return t('Keep learning', null, { project: 'home-dashboard' });
      },
      ComponentImport: () => import('../../../../widgets/HelpVideosWidget'),
      getLoadingHeight: () => '450px',
      getIsAvailable: () => true,
      getIsVisibleByDefault: () => {
        if (isDashboardCustomizable) {
          return currentLifecycleStage === LifecycleStage.PRE_PUBLISH;
        }
        return true;
      },
      owner: Team.CORE_EXPERIENCE,
    },
    {
      key: WidgetKey.EMAIL_CAMPAIGNS,
      getTitle: () => t('Email Campaigns', null, { project: 'home-dashboard' }),
      getDescription: () => t('Run a campaign', null, { project: 'home-dashboard' }),
      ComponentImport: () => import('../../../../widgets/EmailCampaignsWidget'),
      getLoadingHeight: () => '416px',
      getIsAvailable: async () => getIsUserAdmin() && canUserCustomizeDashboard(),
      getIsVisibleByDefault: async () => !isPrePublish,
      owner: Team.CAMPAIGNS_DELIVERY,
    },
    {
      key: WidgetKey.AI_BUSINESS_TOOLS,
      getTitle: () => t('AI Business Tools', null, {
        project: 'home-dashboard',
        notes: 'This title refers to AI tools that help site owners with business tasks for their website.',
      }),
      getDescription: () => t('Power your business with AI', null, { project: 'home-dashboard' }),
      ComponentImport: () => import('../../../../widgets/AiToolsWidget'),
      getLoadingHeight: () => '276px',
      getIsAvailable: async () => canUserCustomizeDashboard(),
      getIsVisibleByDefault: () => true,
      owner: Team.CORE_EXPERIENCE,
    },
    {
      key: WidgetKey.FEATURE_PROMOS,
      getTitle: () => t('Feature Promos', null, { project: 'home-dashboard' }),
      getDescription: () => t('Discover more', null, { project: 'home-dashboard' }),
      ComponentImport: () => import('../../../../widgets/FeaturePromosWidget'),
      getLoadingHeight: () => '640px',
      getIsAvailable: () => isDashboardCustomizable,
      getIsVisibleByDefault: () => true,
      owner: Team.CORE_EXPERIENCE,
    },
  ];

  return widgetRegistry;
}

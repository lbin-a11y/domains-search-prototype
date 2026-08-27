import React, { useMemo, type FunctionComponent } from 'react';

import { CustomizationPopover, Dashboard, DashboardProvider } from '@sqs/dashboard-framework';
import { PageHeader } from '@sqs/rosetta-compositions';
import { Box } from '@sqs/rosetta-primitives';

import { useI18n } from '../i18n';
import { canUserCustomizeDashboard } from './canUserCustomizeDashboard';
import { useDashboardPreferences } from './useDashboardPreferences';
import { EmptyState } from './EmptyState';
import { WidgetWrapper } from './WidgetWrapper';
import { getFirstName } from './getFirstName';

import { LifecycleStage } from '@sqs/config-ui-preferences-ts-client';

import { type UniversalStoreData, UniversalStoreDataProvider } from './UniversalStoreDataProvider';
import { getWidgetRegistry } from '../registry/getWidgetRegistry';
import { useWidgetPreferences } from './useWidgetPreferences';
import ButtonVariant from '@sqs/enums/ButtonVariant';

// Props for <Dashboard /> framework to provide directly to widgets
export type HomeDashboardPropsForWidgets = {
  lifecycleStage: LifecycleStage | null;
};

type HomeDashboardProps = {
  /**
   * Page header button that supports editing the site
   */
  HomeEditSiteButton: FunctionComponent<{
    editSitePath?: string;
    variant?: ButtonVariant;
    onClick?: ({ buttonText }: { buttonText: string }) => void;
  }>;
  /**
   * Whether or not the customization feature is available via flag or test
   */
  isCustomizationEnabled: boolean;
  /**
   * Data derived from universal stores that some Home Dashboard Widgets depend on
   */
  universalStoreData: UniversalStoreData;
};

const DEFAULT_WIDGET_MARGIN_BOTTOM = 10;

export const HomeDashboard = ({
  HomeEditSiteButton,
  isCustomizationEnabled,
  universalStoreData,
}: HomeDashboardProps) => {
  const { t } = useI18n();
  const hasPermissionToCustomize = canUserCustomizeDashboard();
  const canCustomize = isCustomizationEnabled && hasPermissionToCustomize;
  const {
    isBackendLoading,
    persistedDashboardPreferences,
    currentLifecycleStage,
    // Users with permission to customize still get lifecycle stage
    // from dashboard preferences before customization is released
  } = useDashboardPreferences({ canCustomize: hasPermissionToCustomize });

  // Memoized on the lifecycle stage, as upstream: `useAvailableWidgets` keys its
  // effect on the registry's identity, so rebuilding the array on every render
  // would restart widget resolution indefinitely. The prototype's stage switcher
  // changes the stage itself, which is what invalidates this.
  const widgetRegistry = useMemo(() => {
    return getWidgetRegistry(currentLifecycleStage);
  }, [currentLifecycleStage]);

  const { widgetPreferences } = useWidgetPreferences();
  const firstName = getFirstName();
  const title = firstName ?
    t('Welcome, {firstName}', { firstName }, { project: 'home-dashboard' }) :
    t('Welcome', null, { project: 'home-dashboard' });

  // Upstream this is wrapped in <Panel><Content.Full> from
  // @sqs/universal-panel-components. That package's styles are Less files using
  // webpack's `~` import syntax, which Vite cannot resolve, and the panel host
  // it expects is not mounted here — so the two layout wrappers are plain Boxes.
  return (
    <Box>
      <Box sx={{ p: 0 }}>
        <DashboardProvider
          widgetRegistry={isBackendLoading ? null : widgetRegistry}
          dashboardPreferences={persistedDashboardPreferences}
          dashboardKey="home-dashboard"
        >
          <PageHeader px={0} pt={6} mb={8}>
            <PageHeader.Body>
              <PageHeader.Title title={title} />
              <PageHeader.Actions>
                {canCustomize && (
                  <CustomizationPopover
                    title={t('Customize Home', null, {
                      project: 'home-dashboard',
                      notes: 'A button that allows users to customize which widgets appear on their Home dashboard page'
                    })}
                    popoverStyles={{
                      constrainToScreen: { offset: '85px' },
                      bodyStyles: {
                        overflow: 'auto',
                        // subtract height of PageHeader and keep a 44px gap on the bottom
                        maxHeight: 'calc(100vh - 85px - 44px)',
                        '@supports (height: 100dvh)': {
                          maxHeight: 'calc(100dvh - 85px - 44px)',
                        }
                      }
                    }}
                  />
                )}
                <HomeEditSiteButton variant={ButtonVariant.PRIMARY} />
              </PageHeader.Actions>
            </PageHeader.Body>
          </PageHeader>
          <UniversalStoreDataProvider value={universalStoreData}>
            <Dashboard<HomeDashboardPropsForWidgets>
              EmptyStateComponent={EmptyState}
              lifecycleStage={currentLifecycleStage}
              renderWidgetWrapper={({ children, widgetKey }) => (
                <WidgetWrapper
                  marginBottom={DEFAULT_WIDGET_MARGIN_BOTTOM}
                  widgetKey={widgetKey}
                >
                  {children}
                </WidgetWrapper>
              )}
              widgetPreferences={widgetPreferences}
            />
          </UniversalStoreDataProvider>
        </DashboardProvider>
      </Box>
    </Box>
  );
};

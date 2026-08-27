import React, { useContext, useEffect } from 'react';
import { SetupEventsConfig, setupEventsV2 } from './events-v2';

export type AnalyticEventsClient = ReturnType<typeof setupEventsV2>;

const AnalyticEventsContext = React.createContext<AnalyticEventsClient | undefined>(undefined);

/**
 * To be used internally, and may return an undefined value.
 * This can be removed once the migration has been completed.
 */
const useUnsafeAnalyticEvents = () => {
  const events = useContext(AnalyticEventsContext);

  return { events };
};

// To be used externally, and requires a provider
const useAnalyticEvents = () => {
  const events = useContext(AnalyticEventsContext);
  if (!events) {
    throw new Error('useAnalyticEvents must be used within an AnalyticEventsContext');
  }
  return { events };
};

/**
 * If you are integrating this provider into a dashboard with a dashboard state,
 * make sure to mount it after the dashboard state has settled and is representative of what the user is seeing.
 *
 * Please note, **adding this provider to a dashboard will start tracking the user's interaction with the dashboard**.
 * You should ensure other event clients are removed to avoid duplicate tracking during migration.
 */
const AnalyticEventsProvider = (props: React.PropsWithChildren<SetupEventsConfig>) => {
  const { children, dashboardName, ownerTeam, dashboardState, entryPoint } = props;

  const client = React.useMemo(
    () => setupEventsV2({ dashboardName, ownerTeam, dashboardState, entryPoint } as SetupEventsConfig),
    [dashboardName, ownerTeam, dashboardState, entryPoint]
  );

  useEffect(() => {
    client.userViewsDashboard();
  }, [client]);

  return (
    <AnalyticEventsContext.Provider value={client}>
      {children}
    </AnalyticEventsContext.Provider>
  );
};

const MockAnalyticEventsContext = ({ children, ...events }: React.PropsWithChildren<Partial<AnalyticEventsClient>>) => {
  return (
    <AnalyticEventsContext.Provider
      value={{
        userViewsDashboard: () => {},
        userClicksCreateMenu: () => {},
        userClicksSettingsIcon: () => {},
        userSelectsCreateOption: () => {},
        userSelectsSettingsOption: () => {},
        userClicksHelpCenterLink: () => {},
        userClicksQuickLink: () => {},
        userClicksViewAll: () => {},
        userClicksTableItem: () => {},
        userClicksMerchandisingCard: () => {},
        userNavigatesBackwardTips: () => {},
        userViewsBanner: () => {},
        userClicksBannerCTA: () => {},
        userDismissesBannerCTA: () => {},
        userClicksChecklistItem: () => {},
        userClicksPlanWidget: () => {},
        userClicksTip: () => {},
        userNavigatesForwardTips: () => {},
        userViewsDashboardWidget: () => {},
        userViewsTip: () => {},
        userViewsTooltip: () => {},
        userClicksLink: () => {},
        userViewsGuide: () => {},
        ...events,
      }}
    >
      {children}
    </AnalyticEventsContext.Provider>
  );
};

export default AnalyticEventsProvider;
export {
  useAnalyticEvents,
  useUnsafeAnalyticEvents,
  /**
   * Use this context to mock the event client during tests
   */
  MockAnalyticEventsContext
};

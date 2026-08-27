import React, {
  createContext,
  useCallback,
  useContext,
  type PropsWithChildren,
} from 'react';

import { useAvailableWidgets } from './useAvailableWidgets';

import type {
  WidgetDefinition,
  DashboardPreference,
  DashboardFrameworkProps,
} from '../types';
import { DASHBOARD_PARENT_SPAN, REGISTRY_LOADING_SPAN } from './tracingConstants';
import useMarkMeasure from '../utils/useMarkMeasure';

const initialContext = {
  dashboardKey: 'unknown',
  enableWidget: () => {/* noop */},
  disableWidget: () => {/* noop */},
  isCustomizationPopoverOpen: false,
  setIsCustomizationPopoverOpen: () => {/* noop */},
  widgetComponents: [],
  widgetVisibilityStates: [],
  isDashboardLoading: true,
  onAllWidgetsRendered: () => {/* noop */},
};

export const DashboardContext = createContext<DashboardFrameworkProps>(initialContext);

type DashboardProviderProps = PropsWithChildren<{
  dashboardKey: string,
  widgetRegistry: WidgetDefinition[] | null;
  dashboardPreferences?: DashboardPreference[];
}>;
type LoadedDashboardProviderProps = PropsWithChildren<DashboardProviderProps & {
  onAllWidgetsRendered: () => void;
}>;

const LoadedDashboardProvider = ({
  dashboardKey,
  children,
  widgetRegistry,
  onAllWidgetsRendered,
  dashboardPreferences,
}: LoadedDashboardProviderProps) => {
  const context = useAvailableWidgets({
    widgetRegistry: widgetRegistry!,
    dashboardPreferences,
    dashboardKey
  });

  return (
    <DashboardContext.Provider value={{ ...context, onAllWidgetsRendered }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const DashboardProvider = ({ children, ...props } : DashboardProviderProps) => {
  const { dashboardKey, widgetRegistry } = props;
  const dashboardMark = useMarkMeasure(DASHBOARD_PARENT_SPAN, [ dashboardKey ]);
  dashboardMark.mark();
  const onAllWidgetsRendered = useCallback(() => {
    dashboardMark.measure();
  }, [dashboardMark]);

  const waitingMark = useMarkMeasure(REGISTRY_LOADING_SPAN, [ dashboardKey ], DASHBOARD_PARENT_SPAN);
  waitingMark.mark();

  if (!widgetRegistry) {
    return null;
  }
  waitingMark.measure();

  return (
    <LoadedDashboardProvider
      {...props}
      onAllWidgetsRendered={onAllWidgetsRendered}
    >
      {children}
    </LoadedDashboardProvider>
  );
};

export const useDashboardFrameworkContext = (): DashboardFrameworkProps => {
  return useContext(DashboardContext);
};

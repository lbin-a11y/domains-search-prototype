import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type FunctionComponent,
  type ReactNode,
} from 'react';
import { Box } from '@sqs/rosetta-primitives';

import { useDashboardFrameworkContext } from './DashboardProvider';
import { WidgetErrorBoundary } from './WidgetErrorBoundary';
import { isWidgetVisible } from './isWidgetVisible';
import type { DashboardFrameworkProps } from '../types';
import { FrameworkWidgetWrapper } from './FrameworkWidgetWrapper';
import { DASHBOARD_PARENT_SPAN, DASHBOARD_RENDER_SPAN } from './tracingConstants';
import useMarkMeasure from '../utils/useMarkMeasure';

type OnDashboardViewProps = {
  availableWidgets: Array<string>;
  visibleWidgets: Array<string>;
};

type RenderWidgetWrapperProps = {
  children: ReactNode;
  widgetKey?: string;
};

type RenderWidgetWrapper = (props: RenderWidgetWrapperProps) => ReactNode;

const defaultRenderWidgetWrapper: RenderWidgetWrapper = ({ children }) => children;

type DashboardProps<WidgetProps> = {
  EmptyStateComponent?: FunctionComponent<Pick<DashboardFrameworkProps, 'setIsCustomizationPopoverOpen'>>;
  onDashboardView?: ({ availableWidgets, visibleWidgets }: OnDashboardViewProps) => void;
  renderWidgetWrapper?: RenderWidgetWrapper;
  widgetPreferences?: Record<string, any>;
  onWidgetPreferencesChange?: (key: string, updatedPreferences: Record<string, any>) => void;
} & WidgetProps;

export function Dashboard<WidgetProps>({
  EmptyStateComponent,
  onDashboardView,
  renderWidgetWrapper = defaultRenderWidgetWrapper,
  widgetPreferences,
  onWidgetPreferencesChange,
  ...widgetProps
}: DashboardProps<WidgetProps>) {
  const {
    dashboardKey,
    widgetComponents,
    widgetVisibilityStates,
    isDashboardLoading,
    setIsCustomizationPopoverOpen,
    onAllWidgetsRendered,
  } = useDashboardFrameworkContext();

  const dashboardMark = useMarkMeasure(DASHBOARD_RENDER_SPAN, [ dashboardKey ], DASHBOARD_PARENT_SPAN);
  dashboardMark.mark();
  const renderedWidgetKeys = useRef(new Set<string>());

  const availableWidgetKeys = useMemo(() => {
    return widgetComponents.map(({ key }) => key);
  }, [widgetComponents]);

  const visibleWidgetKeys = useMemo(() => {
    return widgetComponents.filter(({ key }) => (
      isWidgetVisible(widgetVisibilityStates, key)
    )).map(({ key }) => key);
  }, [ widgetComponents, widgetVisibilityStates ]);

  const handleWidgetRendered = useCallback((widgetKey: string) => {
    renderedWidgetKeys.current.add(widgetKey);
    if (visibleWidgetKeys.every((thisKey) => renderedWidgetKeys.current.has(thisKey))) {
      dashboardMark.measure();
      onAllWidgetsRendered();
    }
  }, [dashboardMark, visibleWidgetKeys, onAllWidgetsRendered]);

  useEffect(() => {
    if (!isDashboardLoading) {
      onDashboardView?.({
        availableWidgets: availableWidgetKeys,
        visibleWidgets: visibleWidgetKeys
      });
    }
  }, [onDashboardView, widgetComponents, visibleWidgetKeys, isDashboardLoading, availableWidgetKeys]);

  const shouldShowEmptyComponent = !isDashboardLoading && visibleWidgetKeys.length === 0 && EmptyStateComponent;

  if (isDashboardLoading) {
    return null;
  }

  return (shouldShowEmptyComponent ? <EmptyStateComponent setIsCustomizationPopoverOpen={setIsCustomizationPopoverOpen}/> : (
    <>
      {widgetComponents.map(({
        key,
        component: Component,
        widgetOwner,
        loadingHeight,
        isLoaded,
        title
      }) => {
        const isVisible = isWidgetVisible(widgetVisibilityStates, key);
        return (isVisible && (
          <div key={key}>
            {!isLoaded && renderWidgetWrapper({
              widgetKey: key,
              children: <Box height={loadingHeight} />,
            })}
            {isLoaded && Component && renderWidgetWrapper({
              widgetKey: key,
              children: (
                <WidgetErrorBoundary
                  widgetOwner={widgetOwner}
                  loadingHeight={loadingHeight}
                  title={title}
                >
                  <FrameworkWidgetWrapper
                    widgetKey={key}
                    dashboardKey={dashboardKey}
                    onWidgetRendered={handleWidgetRendered}
                  >
                    <Component
                      {...widgetProps}
                      availableWidgets={availableWidgetKeys}
                      visibleWidgets={visibleWidgetKeys}
                      widgetPositionIndex={visibleWidgetKeys.indexOf(key)}
                      widgetPositionTotal={visibleWidgetKeys.length}
                      widgetPreferences={widgetPreferences?.[key]}
                      onWidgetPreferencesChange={
                        (updatedPreferences: Record<string, any>) => onWidgetPreferencesChange?.(key, updatedPreferences)
                      }
                    />
                  </FrameworkWidgetWrapper>
                </WidgetErrorBoundary>
              ),
            })}
          </div>
        ));
      })}
    </>
  ));
}

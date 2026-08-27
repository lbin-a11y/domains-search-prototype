import React, { createElement, useEffect, useMemo, useRef, useState } from 'react';

import { traceWith } from '@sqs/tracing';

import sentry from '../utils/globalSentry';

import {
  DashboardPreference,
  WidgetVisibility,
  type WidgetComponentProps,
  type WidgetDefinition,
  type WidgetVisibilityProps,
} from '../types';
import { getMarkMeasure, type MarkMeasure } from '../utils/getMarkMeasure';
import { WidgetErrorState } from './WidgetErrorState';
import {
  DASHBOARD_RENDER_SPAN,
  WIDGET_PARENT_SPAN,
  WIDGET_AVAILABILITY_SPAN,
  WIDGET_MODULE_LOAD_SPAN,
  WIDGET_VISIBILITY_SPAN
} from './tracingConstants';

type UseAvailableWidgetProps = {
  dashboardKey: string;
  widgetRegistry: WidgetDefinition[];
  dashboardPreferences?: DashboardPreference[];
};

export const useAvailableWidgets = ({
  dashboardKey,
  widgetRegistry,
  dashboardPreferences,
}: UseAvailableWidgetProps) => {
  const [isDashboardLoading, setIsDashboardLoading] = useState<boolean>(true);
  const [widgetComponents, setWidgetComponents] = useState<WidgetComponentProps[]>([]);
  const [widgetVisibilityStates, setWidgetVisibilityStates] = useState<WidgetVisibilityProps[]>([]);
  const [isCustomizationPopoverOpen, setIsCustomizationPopoverOpen] = useState(false);
  const widgetLoad = useRef(new Map<string, MarkMeasure>());
  const widgetLoadModule = useRef(new Map<string, MarkMeasure>());

  const preferencesMap = useMemo(() => {
    return dashboardPreferences?.reduce((acc, preference) => {
      acc[preference.key] = preference.visibility;
      return acc;
    }, {} as Record<string, WidgetVisibility>) ?? {};
  }, [dashboardPreferences]);

  useEffect(() => {
    const currentWidgetLoad = widgetLoad.current;
    const currentWidgetLoadModule = widgetLoadModule.current;
    const loadWidgetComponents = async () => {
      const initialComponentVisibilities: WidgetVisibilityProps[] = [];
      const widgetsToBeLoaded: WidgetComponentProps[] = [];

      for (let index = 0; index < widgetRegistry.length; index++) {
        const widgetDefinition = widgetRegistry[index];

        // Always treat getIsAvailable as async
        let isAvailable = false;
        try {
          await traceWith(WIDGET_AVAILABILITY_SPAN, async () => {
            isAvailable = await Promise.resolve(widgetDefinition.getIsAvailable());
          }, {
            spanOptions: {
              attributes: {
                'dashboard.key': dashboardKey,
                'widget.key': widgetDefinition.key,
              }
            }
          });
        } catch (cause) {
          sentry.withSquarespaceScope((scope) => {
            scope.setTag('owner', widgetDefinition.owner);
            scope.setTag('dashboardKey', dashboardKey);
            scope.setTag('widgetKey', widgetDefinition.key);
            sentry.captureException(
              new Error(`Dashboard (${dashboardKey}) failed to get availability for widget`, { cause })
            );
          });
        }
        if (!isAvailable) {
          continue;
        }
        if (!currentWidgetLoad.has(widgetDefinition.key)) {
          currentWidgetLoad.set(
            widgetDefinition.key,
            getMarkMeasure(WIDGET_PARENT_SPAN, [dashboardKey, widgetDefinition.key], DASHBOARD_RENDER_SPAN)
          );
        }
        const widgetMark = currentWidgetLoad.get(widgetDefinition.key);
        widgetMark?.mark();


        // Always treat getIsVisibleByDefault as async
        let isVisible = true;
        const widgetPreference = preferencesMap[widgetDefinition.key];
        if (widgetPreference && widgetPreference !== WidgetVisibility.UNSET) {
          isVisible = widgetPreference === WidgetVisibility.ON;
        } else {
          try {
            // Pass parent span when available - CWP-207
            await traceWith(WIDGET_VISIBILITY_SPAN, async () => {
              isVisible = await Promise.resolve(widgetDefinition.getIsVisibleByDefault());
              if (!isVisible) {
                // The "widget" measurement completes after initial render.
                // But if the widget is not visible, it'll never be rendered, so close the span now
                widgetMark?.measure();
              }
            }, {
              spanOptions: {
                attributes: {
                  'dashboard.key': dashboardKey,
                  'widget.key': widgetDefinition.key,
                }
              }
            });
          } catch (cause) {
            sentry.withSquarespaceScope((scope) => {
              scope.setTag('owner', widgetDefinition.owner);
              scope.setTag('dashboardKey', dashboardKey);
              scope.setTag('widgetKey', widgetDefinition.key);
              sentry.captureException(
                new Error(`Dashboard (${dashboardKey}) failed to get default visibility for widget`, { cause })
              );
            });
          }
        }
        initialComponentVisibilities.push({
          key: widgetDefinition.key,
          isVisible,
          visibilityPreference: widgetPreference ?? WidgetVisibility.UNSET,
        });

        widgetsToBeLoaded.push({
          key: widgetDefinition.key,
          title: widgetDefinition.getTitle(),
          description: widgetDefinition.getDescription(),
          widgetOwner: widgetDefinition.owner,
          loadingHeight: widgetDefinition.getLoadingHeight(),
          ComponentImport: widgetDefinition.ComponentImport,
          isLoaded: false,
        });
      }

      setWidgetComponents(widgetsToBeLoaded);
      setWidgetVisibilityStates(initialComponentVisibilities);
      setIsDashboardLoading(false);

      Promise.resolve().then(async () => {
        widgetsToBeLoaded.forEach((widgetDefinition) => {

          if (!currentWidgetLoadModule.has(widgetDefinition.key)) {
            currentWidgetLoadModule.set(
              widgetDefinition.key,
              getMarkMeasure(WIDGET_MODULE_LOAD_SPAN, [dashboardKey, widgetDefinition.key], WIDGET_PARENT_SPAN)
            );
          }
          const widgetMark = currentWidgetLoadModule.get(widgetDefinition.key);
          widgetMark?.mark();

          const setLoadedWidget = (loadedComponent: React.ComponentType) => {
            setWidgetComponents(prev => prev.map((prevComponent) =>
              prevComponent.key === widgetDefinition.key ? {
                ...prevComponent,
                component: loadedComponent,
                isLoaded: true
              } : prevComponent
            ));
          };

          widgetDefinition.ComponentImport()
            .then((module) => {
              setLoadedWidget(module.default);
              const widgetLoadModuleMeasure = currentWidgetLoadModule.get(widgetDefinition.key);
              widgetLoadModuleMeasure?.measure();
            }).catch(cause => {
              sentry.withSquarespaceScope((scope) => {
                scope.setTag('owner', widgetDefinition.widgetOwner);
                scope.setTag('dashboardKey', dashboardKey);
                scope.setTag('widgetKey', widgetDefinition.key);
                sentry.captureException(
                  new Error(`Dashboard (${dashboardKey}) failed to load widget`, { cause })
                );
              });
              setLoadedWidget(() => createElement(WidgetErrorState, {
                height: widgetDefinition.loadingHeight,
                title: widgetDefinition.title,
              }));
            });
        });
      });
    };

    loadWidgetComponents();

    return () => {
      currentWidgetLoad.forEach(markAndMeasure => markAndMeasure.discard());
      currentWidgetLoadModule.forEach(markAndMeasure => markAndMeasure.discard());
    };
  }, [widgetRegistry, dashboardKey, preferencesMap]);

  const enableWidget = (key: string) => {
    setWidgetVisibilityStates((oldVisibilities) =>
      oldVisibilities?.map(item => item.key === key ? { ...item, isVisible: true, visibilityPreference: WidgetVisibility.ON } : item)
    );
  };

  const disableWidget = (key: string) => {
    setWidgetVisibilityStates((oldVisibilities) =>
      oldVisibilities?.map(item => item.key === key ? { ...item, isVisible: false, visibilityPreference: WidgetVisibility.OFF } : item)
    );
  };

  return {
    enableWidget,
    disableWidget,
    widgetComponents,
    widgetVisibilityStates,
    isCustomizationPopoverOpen,
    setIsCustomizationPopoverOpen,
    isDashboardLoading,
    dashboardKey,
  };
};

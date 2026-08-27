import React, { PropsWithChildren, useEffect } from 'react';
import { WIDGET_PARENT_SPAN, WIDGET_RENDER_SPAN } from './tracingConstants';
import useMarkMeasure from '../utils/useMarkMeasure';

type FrameworkWidgetWrapperProps = PropsWithChildren<{
  dashboardKey: string,
  widgetKey: string,
  onWidgetRendered?: (widgetKey: string) => void
}>;
export const FrameworkWidgetWrapper = ({
  dashboardKey,
  widgetKey,
  children,
  onWidgetRendered
}: FrameworkWidgetWrapperProps) => {

  const widgetRenderMark = useMarkMeasure(WIDGET_RENDER_SPAN, [ dashboardKey, widgetKey ], WIDGET_PARENT_SPAN);
  // This has already been "marked" by useAvailableWidgets, retrieve here to measure it
  const widgetMark = useMarkMeasure(WIDGET_PARENT_SPAN, [ dashboardKey, widgetKey ]);
  widgetRenderMark.mark();

  useEffect(() => {
    widgetRenderMark.measure();
    widgetMark.measure();
    if (onWidgetRendered) {
      onWidgetRendered(widgetKey);
    }
  }, [dashboardKey, onWidgetRendered, widgetKey, widgetMark, widgetRenderMark]);

  return (
    <div data-testid={`${widgetKey}-widget-wrapper`}>
      {children}
    </div>
  );
};

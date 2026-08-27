import { WidgetVisibilityProps } from '../types';

export const isWidgetVisible = (widgetVisibilityStates: WidgetVisibilityProps[], key: string) =>
  widgetVisibilityStates.find(item => item.key === key)?.isVisible ?? false;

import { WidgetPreferences } from '../types';

/**
 * Upstream this loads per-widget settings from the config UI preferences
 * service. The prototype has no service to call, so widgets render with their
 * own defaults.
 */
export const useWidgetPreferences = (): { widgetPreferences: WidgetPreferences | undefined } => {
  return { widgetPreferences: undefined };
};

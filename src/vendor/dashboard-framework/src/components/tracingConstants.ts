// The parent span for the entire dashboard rendering process
export const DASHBOARD_PARENT_SPAN = 'dashboard_provider_render';

// The span for retrieving the widget registry, including any backend requests that may be needed
export const REGISTRY_LOADING_SPAN = 'dashboard_waiting_for_registry';

// The span to contain the dashboard rendering process after the registry is loaded
export const DASHBOARD_RENDER_SPAN = 'dashboard_render';

// The span to contain each widget rendering process
export const WIDGET_PARENT_SPAN = 'dashboard_widget';

// The span for rendering each widget component
export const WIDGET_RENDER_SPAN = 'dashboard_widget_initial_render';

// The span for loading each widget module
export const WIDGET_MODULE_LOAD_SPAN = 'dashboard_widget_load_module';

// The span for checking if a widget is available
export const WIDGET_AVAILABILITY_SPAN = 'dashboard_widget_availability';

// The span for checking if a widget is visible by default
export const WIDGET_VISIBILITY_SPAN = 'dashboard_widget_visibility';

// Spans with attribute `dashboard.key`
export const DASHBOARD_SCOPE_SPANS = [
  DASHBOARD_PARENT_SPAN,
  REGISTRY_LOADING_SPAN,
  DASHBOARD_RENDER_SPAN
];

// Spans with attribute `widget.key` and `dashboard.key`
export const WIDGET_SCOPE_SPANS = [
  WIDGET_PARENT_SPAN,
  WIDGET_RENDER_SPAN,
  WIDGET_MODULE_LOAD_SPAN,
  WIDGET_AVAILABILITY_SPAN,
  WIDGET_VISIBILITY_SPAN
];

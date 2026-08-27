/**
 * Trimmed entry point for the `@sqs/dashboard-components` source ported from
 * sqsp/config-frontend.
 *
 * The upstream index re-exports the whole package, including eventing and order
 * modules that reach for the V6 network layer, Statsig and the orders panel.
 * This prototype only needs the presentational components, so it exports those
 * and leaves the rest on disk untouched for reference.
 *
 * Deliberately not re-exported:
 * - `ActionBanner`, `KeyFigures`, `MarketingBanner`, `SellingCards`,
 *   `TipsCarousel`, `TableWrapper` — wired to the eventing provider.
 * - `CardGrid` — renders SellingCard, which imports the `layout` barrel.
 * - `layout/Footer`, `layout/PageHeader`, `layout/PageFooter` — depend on
 *   `@sqs/rosetta-pristine-theme`, `@sqs/universal-router` navigation and
 *   `@sqs/config-context` panels that this prototype does not mount.
 */

import AnalyticsCaption, { type AnalyticsCaptionProps } from './components/AnalyticsCaption';
import AnalyticsCard, { type AnalyticsCardProps } from './components/AnalyticsCard';
import Collapsible from './components/Collapsible';
import ProgressRing, { type ProgressRingProps, ProgressRingTesting } from './components/ProgressRing';
import SetupTodo, { type SetupTodoProps } from './components/SetupTodo';
import TableRowCard from './components/TableRowCard';

import Loader, { WidgetLoader } from './components/layout/Loader';
import Section from './components/layout/Section';
import WidgetPlaceholder from './components/layout/WidgetPlaceholder';
import Wrapper from './components/layout/Wrapper';

export const DashboardLayout = {
  Loader,
  Section,
  WidgetLoader,
  WidgetPlaceholder,
  Wrapper,
};

export * from './components/layout/constants';

export {
  AnalyticsCaption,
  AnalyticsCard,
  Collapsible,
  ProgressRing,
  ProgressRingTesting,
  SetupTodo,
  TableRowCard,
};

export type {
  AnalyticsCaptionProps,
  AnalyticsCardProps,
  ProgressRingProps,
  SetupTodoProps,
};

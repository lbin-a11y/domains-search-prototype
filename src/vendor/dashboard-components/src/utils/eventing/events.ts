

import { ClientConfig, setupEventClient } from './client';
import {
  Action,
  Actor,
  EventingDashboardState,
  ObjectType,
  EventingPlanStatus,
  EventingWidgetName,
  DashboardEntryPoint
} from './constants';
import { createUseWidgetInView } from './helpers';

type ItemCompletionList = Array<string>;

// This should be used for events that can be fired outside of a dashboard (eg the page header on the DP products Panel)
type OptionalDashboardState = {
  dashboardState: EventingDashboardState,
  entryPoint?: never
} | {
  dashboardState?: never,
  entryPoint: string
};

/**
 * Creates an event client for tracking events related to the DashboardNav schema and commerce product area.
 * Uses the setupEventClient function under the hood.
 */
export const setupEvents = <CustomWidgetName extends string = EventingWidgetName>
(config: Omit<ClientConfig, 'schemaName' | 'productArea'>) => {

  type CombinedWidgetName = EventingWidgetName | CustomWidgetName;
  type WidgetsWithCompletedItems = EventingWidgetName.CHECKLIST | EventingWidgetName.KEY_FIGURES;

  type EventProperties = {
    event_name: string,
    actor: Actor,
    action: Action,
    object_type: ObjectType,
    object_identifier?: string,
    dashboard_state: EventingDashboardState | null,
    item_completion_list?: ItemCompletionList,
    item_position_index?: number,
    item_position_total?: number,
    sub_widget_name?: string,
    widget_name?: CombinedWidgetName,
    current_plan?: EventingPlanStatus,
    entry_point?: string
  };

  const { track } = setupEventClient<EventProperties>({
    ...config,
    schemaName: 'DashboardNav',
    productArea: 'commerce'
  });

  const userViewsDashboard = ({
    dashboardState
  }: {
    dashboardState: EventingDashboardState
  }) => track({
    event_name: 'UserViewsDashboard',
    actor: Actor.USER,
    action: Action.VIEW,
    object_type: ObjectType.PAGE,
    dashboard_state: dashboardState
  });

  const userClicksCreateMenu = ({
    dashboardState,
    entryPoint,
  }: OptionalDashboardState) => track({
    event_name: 'UserClicksCreateMenu',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.MENU,
    dashboard_state: dashboardState ?? null,
    entry_point: entryPoint ?? DashboardEntryPoint
  });

  const userSelectsCreateOption = ({
    dashboardState,
    entryPoint,
    optionName
  }: {
    /**
     * snake_case of option ( eg "course" )
     */
    optionName: string
  } & OptionalDashboardState) => track({
    event_name: 'UserSelectsCreateOption',
    actor: Actor.USER,
    action: Action.SELECT,
    object_type: ObjectType.MENU_ITEM,
    dashboard_state: dashboardState ?? null,
    object_identifier: optionName,
    entry_point: entryPoint ?? DashboardEntryPoint
  });

  const userViewsDashboardWidget = ({
    dashboardState,
    widgetName,
    completedItems
  }: {
    dashboardState: EventingDashboardState,
    /**
     * A generic widget from WidgetName or a dashboard specific widget from CustomWidgetName
     */
    widgetName: Exclude<CombinedWidgetName, WidgetsWithCompletedItems>,
    /**
     * This is only relevant for the Checklist widget, where it corresponds to a list of the completed checklist items
     * eg ['donation_block', 'payments', 'publish]
     * and the Key Figures widget, where it corresponds to a list of non-zero key figures
     * eg ['revenue', 'orders']
     */
    completedItems?: never;
  } | {
    dashboardState: EventingDashboardState,
    widgetName: WidgetsWithCompletedItems,
    // TODO: make this non-optional again once we have migrated all dashboards onto the GuidanceChecklist
    // as this external component will be responsible for tracking completed items internally
    completedItems?: ItemCompletionList;
  }) => track({
    event_name: 'UserViewsDashboardWidget',
    actor: Actor.USER,
    action: Action.VIEW,
    object_type: ObjectType.SECTION,
    dashboard_state: dashboardState,
    object_identifier: widgetName,
    item_completion_list: completedItems ? [...completedItems].sort((a, b) => a.localeCompare(b)) : undefined
  });

  const userClicksCreateMerchandisingCard = ({
    cardName
  }: {
    /**
     * snake_case of card title ( eg "goal_based_campaign" )
     */
    cardName: string,
  }) => track({
    event_name: 'UserClicksMerchandisingCard',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.CARD,
    dashboard_state: EventingDashboardState.MERCHANDISING,
    object_identifier: cardName,
  });

  const userClicksHelpCenterLink = ({
    dashboardState,
    /**
     * snake_case of link title ( eg "test_a_donation" )
     */
    linkTitle,
  }: {
    dashboardState: EventingDashboardState,
    linkTitle: string
  }) => track({
    event_name: 'UserClicksHelpCenterLink',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.LINK,
    dashboard_state: dashboardState,
    object_identifier: linkTitle,
    widget_name: EventingWidgetName.HELP_CENTER
  });

  const userClicksChecklistItem = ({
    actionName,
    positionIndex,
    totalItems,
  }: {
    /**
     * snake_case of checklist item name (eg 'donation_block')
     */
    actionName: string,
    /**
     * 1 based vertical position of checklist item clicked (1,2,3)
     */
    positionIndex: number,
    /**
     * total number of items in the checklist
     */
    totalItems: number,
  }) => track({
    event_name: 'UserClicksChecklistItem',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.LINK,
    dashboard_state: EventingDashboardState.SETUP,
    item_position_index: positionIndex,
    item_position_total: totalItems,
    widget_name: EventingWidgetName.CHECKLIST,
    object_identifier: actionName
  });

  const userClicksQuickLink = ({
    dashboardState,
    /**
     * snake_case of link name (eg 'customize_checkout')
     */
    linkName
  }: {
    dashboardState: EventingDashboardState,
    linkName: string,
  }) => track({
    event_name: 'UserClicksQuickLink',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.LINK,
    dashboard_state: dashboardState,
    widget_name: EventingWidgetName.QUICK_LINKS,
    object_identifier: linkName,
  });

  const userClicksTableItem = ({
    dashboardState,
    widgetName,
    tableContent
  }: {
    dashboardState: EventingDashboardState,
    /**
     * A generic widget from WidgetName or a dashboard specific widget from CustomWidgetName
     */
    widgetName: CombinedWidgetName,
    /**
     * snake_case of the part of the table that was clicked (eg 'pricing_plan')
     */
    tableContent: string
  }) => track({
    event_name: 'UserClicksTableItem',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.LINK,
    dashboard_state: dashboardState,
    widget_name: widgetName,
    object_identifier: tableContent
  });

  const userClicksViewAll = ({
    dashboardState,
    widgetName,
    subWidgetName
  }: {
    dashboardState: EventingDashboardState,
    /**
     * A generic widget from WidgetName or a dashboard specific widget from CustomWidgetName
     */
    widgetName: CombinedWidgetName,
    /**
     * snake_case of the nested widget if relevant (eg revenue, visits, conversion_rate, etc for the key figures widget)
     */
    subWidgetName?: string,
  }) => track({
    event_name: 'UserClicksViewAll',
    actor: Actor.USER,
    action: Action.VIEW,
    object_type: ObjectType.LINK,
    dashboard_state: dashboardState,
    widget_name: widgetName,
    sub_widget_name: subWidgetName
  });

  const userClicksTip = ({
    dashboardState,
    widgetName,
    tipName
  }: {
    dashboardState: EventingDashboardState,
    widgetName?: EventingWidgetName.TIP | EventingWidgetName.FEATURE_PROMO,
    /**
     * snake_case of the part of the title of the tip that was clicked (eg 'streamline_your_customer_emails')
     */
    tipName: string
  }) => track({
    event_name: 'UserClicksTip',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.LINK,
    dashboard_state: dashboardState,
    widget_name: widgetName ?? EventingWidgetName.TIP,
    object_identifier: tipName,
  });

  const userNavigatesForwardTips = ({
    dashboardState,
    widgetName,
    tipName
  }: {
    dashboardState: EventingDashboardState,
    widgetName?: EventingWidgetName.TIP | EventingWidgetName.FEATURE_PROMO,
    /**
     * snake_case of the part of the title of the tip that was clicked (eg 'streamline_your_customer_emails')
     */
    tipName: string
  }) => track({
    event_name: 'UserNavigatesForwardTips',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.BUTTON,
    dashboard_state: dashboardState,
    widget_name: widgetName ?? EventingWidgetName.TIP,
    object_identifier: tipName,
  });

  const userNavigatesBackwardTips = ({
    dashboardState,
    widgetName,
    tipName
  }: {
    dashboardState: EventingDashboardState,
    widgetName?: EventingWidgetName.TIP | EventingWidgetName.FEATURE_PROMO,
    /**
     * snake_case of the part of the title of the tip that was clicked (eg 'streamline_your_customer_emails')
     */
    tipName: string
  }) => track({
    event_name: 'UserNavigatesBackwardTips',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.BUTTON,
    dashboard_state: dashboardState,
    widget_name: widgetName ?? EventingWidgetName.TIP,
    object_identifier: tipName,
  });

  const userViewsTip = ({
    dashboardState,
    widgetName,
    tipName
  }: {
    dashboardState: EventingDashboardState,
    widgetName?: EventingWidgetName.TIP | EventingWidgetName.FEATURE_PROMO,
    /**
     * snake_case of the part of the title of the tip that was clicked (eg 'streamline_your_customer_emails')
     */
    tipName: string
  }) => track({
    event_name: 'UserViewsTip',
    actor: Actor.USER,
    action: Action.VIEW,
    object_type: ObjectType.CARD,
    dashboard_state: dashboardState,
    widget_name: widgetName ?? EventingWidgetName.TIP,
    object_identifier: tipName,
  });

  const userClicksPlanWidget = ({
    dashboardState,
    actionName,
    currentPlan
  }: {
    dashboardState: EventingDashboardState,
    /**
     * snake_case of the action name (eg 'upgrade_plan')
     */
    actionName: string,
    /**
     * snake_case of the current plan (eg 'active' or 'trial')
     */
    currentPlan: EventingPlanStatus
  }) => track({
    event_name: 'UserClicksPlanWidget',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.BUTTON,
    dashboard_state: dashboardState,
    widget_name: EventingWidgetName.PLAN,
    object_identifier: actionName,
    current_plan: currentPlan,
  });

  const userViewsTooltip = ({
    dashboardState,
    widgetName,
    tooltipDescription
  }: {
    dashboardState: EventingDashboardState,
    widgetName: CombinedWidgetName,
    tooltipDescription: string
  }) => track({
    event_name: 'UserViewsTooltip',
    actor: Actor.USER,
    action: Action.VIEW,
    object_type: ObjectType.TOOLTIP,
    dashboard_state: dashboardState,
    widget_name: widgetName,
    object_identifier: tooltipDescription
  });

  const userClicksSettingsIcon = ({
    dashboardState,
    entryPoint
  }: OptionalDashboardState) => track({
    event_name: 'UserClicksSettingsIcon',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.BUTTON,
    dashboard_state: dashboardState ?? null,
    entry_point: entryPoint ?? DashboardEntryPoint
  });

  const userSelectsSettingsOption = ({
    dashboardState,
    entryPoint,
    optionName
  }: {
    /**
     * snake_case, name of option ( eg "payment_options" )
     */
    optionName: string,
  } & OptionalDashboardState) => track({
    event_name: 'UserSelectsSettingsOption',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.LINK,
    dashboard_state: dashboardState ?? null,
    object_identifier: optionName,
    entry_point: entryPoint ?? DashboardEntryPoint
  });

  const userClicksBannerCTA = ({
    dashboardState,
    optionName
  }: {
    dashboardState: EventingDashboardState,
    /**
     * snake_case, name of button's action ( eg "manage_payment_methods" )
     */
    optionName: string
  }) => track({
    event_name: 'UserClicksBannerCTA',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.BUTTON,
    dashboard_state: dashboardState ?? null,
    object_identifier: optionName
  });

  return {
    /**
     * Tracking functions
     */
    userViewsDashboard,
    userClicksCreateMenu,
    userSelectsCreateOption,
    userViewsDashboardWidget,
    userClicksCreateMerchandisingCard,
    userClicksHelpCenterLink,
    userClicksChecklistItem,
    userClicksQuickLink,
    userClicksTableItem,
    userClicksPlanWidget,
    userClicksViewAll,
    userClicksTip,
    userNavigatesForwardTips,
    userNavigatesBackwardTips,
    userViewsTip,
    userViewsTooltip,
    userClicksSettingsIcon,
    userSelectsSettingsOption,
    userClicksBannerCTA,
    /**
     * Helpers
     */
    useWidgetInView: createUseWidgetInView(userViewsDashboardWidget),
    /**
     * The track function should only be called directly in urgent/exceptional situations where it doesn't make
     * sense to use (or add) one of the existing helpers.
     */
    track,
  };
};

import memoize from 'lodash/memoize';
import { ClientConfig, setupEventClient } from './client';
import {
  Action,
  Actor,
  EventingDashboardState,
  ObjectType,
  EventingPlanStatus,
  EventingWidgetName,
  DashboardEntryPoint,
} from './constants';

type ItemCompletionList = Array<string>;
export type BannerType = 'large' | 'small' | 'tip';

export const DEFAULT_SCHEMA_NAME = 'DashboardNav';

// This should be used for events that can be fired outside of a dashboard (eg the page header on the DP products Panel)
export type OptionalDashboardState = {
  dashboardState: EventingDashboardState,
  entryPoint?: never
} | {
  dashboardState?: never,
  entryPoint: string
};

export type SetupEventsConfig = Pick<ClientConfig, 'ownerTeam' | 'dashboardName'> & OptionalDashboardState;

export const setupEventsV2 = (config: SetupEventsConfig) => {
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
    widget_name?: EventingWidgetName | string,
    current_plan?: EventingPlanStatus,
    entry_point?: string,
    banner_name?: string,
    banner_location?: string,
    banner_type?: BannerType,
    custom_schema_name?: string,
    is_visible?: boolean,
    guide_name?: string,
  };

  const getClient = memoize(() => setupEventClient<EventProperties>({
    ...config,
    schemaName: DEFAULT_SCHEMA_NAME,
    productArea: 'commerce'
  }));

  const track = (properties: Omit<EventProperties, 'dashboard_state' | 'entry_point'>) =>
    getClient().track({
      ...properties,
      dashboard_state: config.dashboardState ?? null,
      entry_point: config.entryPoint ?? DashboardEntryPoint,
    });

  const userViewsDashboard = () => track({
    event_name: 'UserViewsDashboard',
    actor: Actor.USER,
    action: Action.VIEW,
    object_type: ObjectType.PAGE,
  });

  const userClicksCreateMenu = () => track({
    event_name: 'UserClicksCreateMenu',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.MENU,
  });

  const userSelectsCreateOption = ({
    optionName
  }: {
    /**
     * snake_case of option ( eg "course" )
     */
    optionName: string
  }) => track({
    event_name: 'UserSelectsCreateOption',
    actor: Actor.USER,
    action: Action.SELECT,
    object_type: ObjectType.MENU_ITEM,
    object_identifier: optionName,
  });

  const userClicksMerchandisingCard = ({
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
    object_identifier: cardName,
  });

  const userClicksHelpCenterLink = ({
    /**
     * snake_case of link name ( eg "test_a_donation" )
     */
    linkName,
  }: {
    linkName: string
  }) => track({
    event_name: 'UserClicksHelpCenterLink',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.LINK,
    object_identifier: linkName,
    widget_name: EventingWidgetName.HELP_CENTER
  });

  const userViewsDashboardWidget = ({
    widgetName,
    completedItems,
  }: {
    /**
     * A generic widget from WidgetName or a dashboard specific widget from CustomWidgetName
     */
    widgetName: EventingWidgetName | string,
    /**
     * This is only relevant for the Checklist widget, where it corresponds to a list of the completed checklist items
     * eg ['donation_block', 'payments', 'publish]
     * and the Key Figures widget, where it corresponds to a list of non-zero key figures
     * eg ['revenue', 'orders']
     */
    completedItems?: never;
  } | {
    widgetName: EventingWidgetName | string,
    // TODO: make this non-optional again once we have migrated all dashboards onto the GuidanceChecklist
    // as this external component will be responsible for tracking completed items internally
    completedItems?: ItemCompletionList;
  }) => track({
    event_name: 'UserViewsDashboardWidget',
    actor: Actor.USER,
    action: Action.VIEW,
    object_type: ObjectType.SECTION,
    object_identifier: widgetName,
    item_completion_list: completedItems ? [...completedItems].sort((a, b) => a.localeCompare(b)) : undefined,
  });

  const userClicksChecklistItem = ({
    actionName,
    positionIndex,
    totalItems,
    customSchemaName = DEFAULT_SCHEMA_NAME,
    guideName
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
    /**
     * custom schema name for the eventing schema
     */
    customSchemaName?: string,
    /**
     * kebab-case, name of the checklist guide ( eg "limited-release-selling" )
     */
    guideName?: string,
  }) => track({
    event_name: 'UserClicksChecklistItem',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.LINK,
    item_position_index: positionIndex,
    item_position_total: totalItems,
    widget_name: EventingWidgetName.CHECKLIST,
    object_identifier: actionName,
    custom_schema_name: customSchemaName,
    guide_name: guideName,
  });

  const userClicksQuickLink = ({
    /**
     * snake_case of link name (eg 'customize_checkout')
     */
    linkName
  }: {
    linkName: string,
  }) => track({
    event_name: 'UserClicksQuickLink',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.LINK,
    widget_name: EventingWidgetName.QUICK_LINKS,
    object_identifier: linkName,
  });

  const userClicksTableItem = ({
    widgetName,
    tableContent
  }: {
    /**
     * A generic widget from WidgetName or a dashboard specific widget from CustomWidgetName
     */
    widgetName: string,
    /**
     * snake_case of the part of the table that was clicked (eg 'pricing_plan')
     */
    tableContent: string
  }) => track({
    event_name: 'UserClicksTableItem',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.LINK,
    widget_name: widgetName,
    object_identifier: tableContent
  });

  const userClicksViewAll = ({
    widgetName,
    subWidgetName
  }: {
    /**
     * A generic widget from WidgetName or a dashboard specific widget from CustomWidgetName
     */
    widgetName: string,
    /**
     * snake_case of the nested widget if relevant (eg revenue, visits, conversion_rate, etc for the key figures widget)
     */
    subWidgetName?: string,
  }) => track({
    event_name: 'UserClicksViewAll',
    actor: Actor.USER,
    action: Action.VIEW,
    object_type: ObjectType.LINK,
    widget_name: widgetName,
    sub_widget_name: subWidgetName
  });

  const userClicksTip = ({
    tipName,
    widgetName
  }: {
    /**
     * snake_case of the part of the title of the tip that was clicked (eg 'streamline_your_customer_emails')
     */
    tipName: string,
    widgetName?: EventingWidgetName.TIP | EventingWidgetName.FEATURE_PROMO
  }) => track({
    event_name: 'UserClicksTip',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.LINK,
    widget_name: widgetName ?? EventingWidgetName.TIP,
    object_identifier: tipName,
  });

  const userNavigatesForwardTips = ({
    tipName,
    widgetName
  }: {
    /**
     * snake_case of the part of the title of the tip that was clicked (eg 'streamline_your_customer_emails')
     */
    tipName: string,
    widgetName?: EventingWidgetName.TIP | EventingWidgetName.FEATURE_PROMO
  }) => track({
    event_name: 'UserNavigatesForwardTips',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.BUTTON,
    widget_name: widgetName ?? EventingWidgetName.TIP,
    object_identifier: tipName,
  });

  const userNavigatesBackwardTips = ({
    tipName,
    widgetName,
  }: {
    /**
     * snake_case of the part of the title of the tip that was clicked (eg 'streamline_your_customer_emails')
     */
    tipName: string,
    widgetName?: EventingWidgetName.TIP | EventingWidgetName.FEATURE_PROMO
  }) => track({
    event_name: 'UserNavigatesBackwardTips',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.BUTTON,
    widget_name: widgetName ?? EventingWidgetName.TIP,
    object_identifier: tipName,
  });

  const userViewsTip = ({
    tipName,
    widgetName
  }: {
    /**
     * snake_case of the part of the title of the tip that was clicked (eg 'streamline_your_customer_emails')
     */
    tipName: string
    widgetName?: EventingWidgetName.TIP | EventingWidgetName.FEATURE_PROMO
  }) => track({
    event_name: 'UserViewsTip',
    actor: Actor.USER,
    action: Action.VIEW,
    object_type: ObjectType.CARD,
    widget_name: widgetName ?? EventingWidgetName.TIP,
    object_identifier: tipName,
  });

  const userClicksPlanWidget = ({
    actionName,
    currentPlan
  }: {
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
    widget_name: EventingWidgetName.PLAN,
    object_identifier: actionName,
    current_plan: currentPlan,
  });

  const userViewsTooltip = ({
    widgetName,
    tooltipDescription
  }: {
    widgetName: string,
    tooltipDescription: string
  }) => track({
    event_name: 'UserViewsTooltip',
    actor: Actor.USER,
    action: Action.VIEW,
    object_type: ObjectType.TOOLTIP,
    widget_name: widgetName,
    object_identifier: tooltipDescription
  });

  const userClicksSettingsIcon = () => track({
    event_name: 'UserClicksSettingsIcon',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.BUTTON
  });

  const userSelectsSettingsOption = ({
    optionName
  }: {
    /**
     * snake_case, name of option ( eg "payment_options" )
     */
    optionName: string,
  }) => track({
    event_name: 'UserSelectsSettingsOption',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.LINK,
    object_identifier: optionName,
  });

  const userViewsBanner = ({
    optionName,
    widgetName,
    bannerName,
    bannerLocation,
    bannerType,
  }: {
    /**
     * snake_case, name of button's action ( eg "manage_payment_methods" )
     */
    optionName: string,
    widgetName?: EventingWidgetName,
    bannerName: string,
    bannerLocation: string,
    bannerType: BannerType,
  }) => track({
    event_name: 'UserViewsBanner',
    actor: Actor.USER,
    action: Action.VIEW,
    object_type: ObjectType.SECTION,
    object_identifier: optionName,
    widget_name: widgetName,
    banner_name: bannerName,
    banner_location: bannerLocation,
    banner_type: bannerType,
  });

  const userClicksBannerCTA = ({
    optionName,
    widgetName,
    bannerName,
    bannerLocation,
    bannerType,
  }: {
    /**
     * snake_case, name of button's action ( eg "manage_payment_methods" )
     */
    optionName: string,
    widgetName?: string,
    bannerName?: string,
    bannerLocation?: string,
    bannerType?: BannerType,
  }) => track({
    event_name: 'UserClicksBannerCTA',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.BUTTON,
    object_identifier: optionName,
    widget_name: widgetName,
    banner_name: bannerName,
    banner_location: bannerLocation,
    banner_type: bannerType,
  });

  const userDismissesBannerCTA = ({
    optionName,
    widgetName,
    bannerName,
    bannerLocation,
    bannerType,
  }: {
    /**
     * snake_case, name of button's action ( eg "manage_payment_methods" )
     */
    optionName: string,
    widgetName?: string,
    bannerName?: string,
    bannerLocation?: string,
    bannerType?: BannerType,
  }) => track({
    event_name: 'UserDismissesBannerCTA',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.BUTTON,
    object_identifier: optionName,
    widget_name: widgetName,
    banner_name: bannerName,
    banner_location: bannerLocation,
    banner_type: bannerType,
  });

  const userClicksLink = ({
    linkName,
    widgetName
  }: {
    /**
     * snake_case, text that describes the link ( eg "learn_more" )
     */
    linkName: string,
    widgetName?: string,
  }) => track({
    event_name: 'UserClicksLink',
    actor: Actor.USER,
    action: Action.CLICK,
    object_type: ObjectType.LINK,
    object_identifier: linkName,
    widget_name: widgetName,
  });


  const userViewsGuide = ({
    guideName,
    completedItems,
    isVisible,
    customSchemaName = DEFAULT_SCHEMA_NAME,
  }: {
    /**
     * kebab-case, name of the guide ( eg "limited-release-selling" )
     */
    guideName: string,
    completedItems: ItemCompletionList,
    isVisible: boolean,
    customSchemaName?: string,
  }) => {
    track({
      custom_schema_name: customSchemaName,
      event_name: 'UserViewsGuide',
      actor: Actor.USER,
      action: Action.VIEW,
      object_type: ObjectType.SECTION,
      object_identifier: guideName,
      guide_name: guideName,
      item_completion_list: [...completedItems].sort((a, b) => a.localeCompare(b)),
      is_visible: isVisible,
    });
  };


  return {
    /**
     * Tracking functions
     */
    userViewsDashboard,
    userClicksMerchandisingCard,
    userClicksHelpCenterLink,
    userViewsDashboardWidget,
    userClicksViewAll,
    userClicksCreateMenu,
    userSelectsCreateOption,
    userClicksChecklistItem,
    userClicksQuickLink,
    userClicksTableItem,
    userClicksTip,
    userNavigatesForwardTips,
    userNavigatesBackwardTips,
    userViewsTip,
    userClicksPlanWidget,
    userViewsTooltip,
    userClicksSettingsIcon,
    userSelectsSettingsOption,
    userViewsBanner,
    userClicksBannerCTA,
    userDismissesBannerCTA,
    userClicksLink,
    userViewsGuide,
  };
};

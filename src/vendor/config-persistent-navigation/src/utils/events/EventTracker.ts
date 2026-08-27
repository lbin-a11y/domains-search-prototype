
import { EVENT_CLIENT } from './client';
import {
  EventName,
  UserAction,
  ObjectType,
  Actor,
  EntryPoint,
  NavigationLevel,
} from './constants';
import { NavItemKey } from '@sqs/config-ui-preferences-ts-client';
import { fireEvent as trackFullStoryEvent } from './fullstory';

interface EventFiringContext {
  eventName: EventName;
  actor: Actor;
  action: UserAction;
  objectType: ObjectType;
  additionalFields?: {
    object_identifier?: NavItemKey | string;
    object_display_name?: string;
    object_value?: string;
    indirect_object_type?: ObjectType;
    indirect_object_value?: string;
    indirect_object_display_name?: string;
    destination_url?: string;
    page_path?: string;
    is_visible?: boolean;
    entrypoint?: EntryPoint;
    item_position_index?: number;
    item_position_total?: number;
    l1_parent?: string;
    navigation_level?: NavigationLevel;
  };
}

function trackAnalyticsEvent({
  eventName,
  actor,
  action,
  objectType,
  additionalFields,
}: EventFiringContext): void {
  const event = {
    event_occurrence_timestamp: Date.now(),
    event_name: eventName,
    actor: actor,
    action: action,
    object_type: objectType,
    ...additionalFields,
  };
  EVENT_CLIENT.track(event);
}

function track(eventData: EventFiringContext): void {
  trackAnalyticsEvent(eventData);
  const { eventName, ...rest } = eventData;

  trackFullStoryEvent(eventName, rest);
}

const trackUserClicksEditNavMenu = () => {
  track({
    eventName: EventName.USER_CLICKS_EDIT_NAV_CTA,
    actor: Actor.USER,
    action: UserAction.CLICK,
    objectType: ObjectType.BUTTON,
  });
};

const trackUserViewsAppStore = () => {
  track({
    eventName: EventName.USER_VIEWS_APP_STORE,
    actor: Actor.USER,
    action: UserAction.VIEW,
    objectType: ObjectType.PAGE,
  });
};

const trackUserExitsAppStore = () => {
  track({
    eventName: EventName.USER_EXITS_APP_STORE,
    actor: Actor.USER,
    action: UserAction.CLOSE,
    objectType: ObjectType.PAGE,
  });
};

const trackUserTogglesNavigationItem = (additionalFields: {
  object_identifier: NavItemKey;
  is_visible: boolean;
  entrypoint: EntryPoint;
}) => {
  track({
    eventName: EventName.USER_TOGGLES_NAVIGATION_ITEM,
    actor: Actor.USER,
    action: UserAction.CLICK,
    objectType: ObjectType.BUTTON,
    additionalFields,
  });
};

const trackUserViewsDetailsCard = (additionalFields: {
  object_identifier: NavItemKey;
  is_visible: boolean;
  item_position_index: number;
  item_position_total: number;
}) => {
  track({
    eventName: EventName.USER_VIEWS_DETAILS_CARD,
    actor: Actor.USER,
    action: UserAction.VIEW,
    objectType: ObjectType.CARD,
    additionalFields,
  });
};

const trackUserClicksDetailsCard = (additionalFields: {
  object_identifier: NavItemKey;
  is_visible: boolean;
  item_position_index: number;
  item_position_total: number;
  entrypoint: EntryPoint;
}) => {
  track({
    eventName: EventName.USER_CLICKS_DETAILS_CARD,
    actor: Actor.USER,
    action: UserAction.CLICK,
    objectType: ObjectType.CARD,
    additionalFields,
  });
};

const trackUserViewsDetailsPage = (additionalFields: {
  object_identifier: NavItemKey;
  is_visible: boolean;
}) => {
  track({
    eventName: EventName.USER_VIEWS_DETAILS_PAGE,
    actor: Actor.USER,
    action: UserAction.VIEW,
    objectType: ObjectType.MODAL,
    additionalFields,
  });
};

const trackUserClosesDetailsPage = (additionalFields: {
  object_identifier: NavItemKey;
  is_visible: boolean;
}) => {
  track({
    eventName: EventName.USER_CLOSES_DETAILS_PAGE,
    actor: Actor.USER,
    action: UserAction.CLOSE,
    objectType: ObjectType.MODAL,
    additionalFields,
  });
};

const trackUserNavigatesForwardInFeatures = (additionalFields: {
  is_visible: boolean;
}) => {
  track({
    eventName: EventName.USER_NAVIGATES_FORWARD_IN_FEATURES,
    actor: Actor.USER,
    action: UserAction.CLICK,
    objectType: ObjectType.BUTTON,
    additionalFields,
  });
};

const trackUserNavigatesBackwardInFeature = (additionalFields: {
  is_visible: boolean;
}) => {
  track({
    eventName: EventName.USER_NAVIGATES_BACKWARD_IN_FEATURES,
    actor: Actor.USER,
    action: UserAction.CLICK,
    objectType: ObjectType.BUTTON,
    additionalFields,
  });
};

const trackUserViewsFeature = (additionalFields: {
  object_identifier: string;
  is_visible: boolean;
}) => {
  track({
    eventName: EventName.USER_VIEWS_FEATURE,
    actor: Actor.USER,
    action: UserAction.VIEW,
    objectType: ObjectType.SECTION,
    additionalFields,
  });
};

const trackUserHoversOverNavItem = (additionalFields: {
  object_identifier: NavItemKey;
  is_visible: boolean;
  item_position_index: number;
  item_position_total: number;
}) => {
  track({
    eventName: EventName.USER_HOVERS_OVER_NAV_ITEM,
    actor: Actor.USER,
    action: UserAction.SELECT,
    objectType: ObjectType.LINK,
    additionalFields,
  });
};

const trackUserRepositionsNavItem = (additionalFields: {
  object_identifier: NavItemKey;
  is_visible: boolean;
  item_position_index_prev: number;
  item_position_index: number;
  item_position_total: number;
}) => {
  track({
    eventName: EventName.USER_REPOSITIONS_NAV_ITEM,
    actor: Actor.USER,
    action: UserAction.REORDER,
    objectType: ObjectType.LINK,
    additionalFields,
  });
};

const trackUserClicksNavigationItem = (additionalFields: {
  object_identifier: NavItemKey | string;
  navigation_level: NavigationLevel;
  item_position_index?: number;
  item_position_total?: number;
  l1_parent?: NavItemKey;
}) => {
  track({
    eventName: EventName.USER_CLICKS_NAVIGATION_ITEM,
    actor: Actor.USER,
    action: UserAction.CLICK,
    objectType: ObjectType.LINK,
    additionalFields,
  });
};

export {
  trackUserClicksEditNavMenu,
  trackUserViewsAppStore,
  trackUserExitsAppStore,
  trackUserTogglesNavigationItem,
  trackUserViewsDetailsCard,
  trackUserClicksDetailsCard,
  trackUserViewsDetailsPage,
  trackUserClosesDetailsPage,
  trackUserNavigatesForwardInFeatures,
  trackUserNavigatesBackwardInFeature,
  trackUserViewsFeature,
  trackUserHoversOverNavItem,
  trackUserRepositionsNavItem,
  trackUserClicksNavigationItem,
};

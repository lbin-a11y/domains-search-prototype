import { FEATURE_GATE_EVENT_CLIENT } from './client';
import { Actor, EventName, ObjectType, UserAction } from './constants';

export enum ObjectIdentifier {
  FEATURE_GATE_SUBSCRIBE = 'feature_gate_subscribe',
  FEATURE_GATE_EDIT_MENU_BUTTON = 'feature_gate_edit_menu_button',
}

interface EventFiringContext {
  eventName: EventName;
  actor: Actor;
  action: UserAction;
  objectType: ObjectType;
  objectIdentifier?: ObjectIdentifier | string;
  objectDisplayName?: string;
}

const track = ({
  eventName,
  actor,
  action,
  objectType,
  objectIdentifier,
  objectDisplayName,
}: EventFiringContext) => {
  const event = {
    'event_occurrence_timestamp': Date.now(),
    'event_name': eventName,
    'actor': actor,
    'action': action,
    'object_type': objectType,
    'object_identifier': objectIdentifier,
    'object_display_name': objectDisplayName,
  };
  FEATURE_GATE_EVENT_CLIENT.track(event);
};

export const trackUserClicksFeatureGateLabel = ({
  objectIdentifier,
}: {
  objectIdentifier: ObjectIdentifier;
}) => {
  track({
    eventName: EventName.USER_CLICKS_FEATURE_GATE_LABEL,
    actor: Actor.USER,
    action: UserAction.CLICK,
    objectType: ObjectType.BUTTON,
    objectIdentifier,
  });
};

export const trackUserViewsFeatureGateModal = ({
  objectIdentifier,
}: {
  objectIdentifier: ObjectIdentifier;
}) => {
  track({
    eventName: EventName.USER_VIEWS_FEATURE_GATE_MODAL,
    actor: Actor.USER,
    action: UserAction.VIEW,
    objectType: ObjectType.MODAL,
    objectIdentifier,
  });
};

export const trackUserClicksFeatureGateModalCTA = ({
  objectIdentifier,
  objectDisplayName,
}: {
  objectIdentifier: ObjectIdentifier;
  objectDisplayName?: string;
}) => {
  track({
    eventName: EventName.USER_CLICKS_FEATURE_GATE_MODAL_CTA,
    actor: Actor.USER,
    action: UserAction.CLICK,
    objectType: ObjectType.LINK,
    objectIdentifier,
    objectDisplayName,
  });
};

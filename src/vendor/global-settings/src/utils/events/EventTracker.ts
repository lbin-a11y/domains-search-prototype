import { useEffect } from 'react';

import getEventClient from './client';
import { EventName, UserAction, ObjectType, ObjectIdentifier, Actor } from './constants';
import sentry from '../globalSentry';

interface EventFiringContext {
  eventName: EventName,
  actor: Actor,
  action: UserAction,
  objectType: ObjectType,
  additionalFields?: {
    object_identifier?: ObjectIdentifier,
    object_display_name?: string,
    object_value?: string,
    indirect_object_type?: ObjectType,
    indirect_object_value?: string,
    indirect_object_identifier?: ObjectIdentifier,
    indirect_object_display_name?: string,
    destination_url?: string,
    page_path?: string,
  }
}

function track({ eventName, actor, action, objectType, additionalFields }: EventFiringContext): void {
  const event = {
    event_occurrence_timestamp: Date.now(),
    event_name: eventName,
    actor: actor,
    action: action,
    object_type: objectType,
    ...additionalFields,
  };
  getEventClient().track(event);
}

function mapLinkToIdentifier(link: string) {
  if (link.includes('commerce')) {
    return ObjectIdentifier.COMMERCE_SETTINGS;
  } else if (link.includes('marketing')) {
    return ObjectIdentifier.MARKETING_SETTINGS;
  } else if (link.includes('website')) {
    return ObjectIdentifier.WEBSITE_SETTINGS;
  }
  throw new Error(`Couldn't find an object identifier for link: ${link}`);
}

function userClicksContextualSettingsLink(link: string) {
  try {
    track(buildContextualSettingsEventContext(link));
  } catch (e) {
    sentry.withSquarespaceScope(() => {
      sentry.captureException(e);
    });
  }
}

function buildContextualSettingsEventContext(link: string) : EventFiringContext {
  const objectIdentifier = mapLinkToIdentifier(link);
  const eventContext = {
    eventName: EventName.USER_CLICKS_CONTEXTUAL_SETTINGS_LINK,
    actor: Actor.USER,
    action: UserAction.CLICK,
    objectType: ObjectType.LINK,
  };
  switch (objectIdentifier) {
  case ObjectIdentifier.COMMERCE_SETTINGS:
    return {
      ...eventContext,
      additionalFields: {
        object_identifier: ObjectIdentifier.COMMERCE_SETTINGS,
        object_display_name: 'Commerce Settings',
        destination_url: '/config/settings#commerce',
      },
    };
  case ObjectIdentifier.MARKETING_SETTINGS:
    return {
      ...eventContext,
      additionalFields: {
        object_identifier: ObjectIdentifier.MARKETING_SETTINGS,
        object_display_name: 'Marketing Settings',
        destination_url: '/config/settings#marketing',
      },
    };
  case ObjectIdentifier.WEBSITE_SETTINGS:
    return {
      ...eventContext,
      additionalFields: {
        object_identifier: ObjectIdentifier.WEBSITE_SETTINGS,
        object_display_name: 'Website Settings',
        destination_url: '/config/settings#website',
      },
    };
  default:
    throw new Error(`Failed to build event context for contextual settings link ${link} and object identifier ${objectIdentifier}`);
  }
}

function trackUserClicksLaunchpadSettingsCard(buttonLabel: ObjectIdentifier) {
  try {
    track({
      eventName: EventName.USER_CLICKS_LAUNCHPAD_SETTINGS_CARD,
      actor: Actor.USER,
      action: UserAction.CLICK,
      objectType: ObjectType.BUTTON,
      additionalFields: {
        object_identifier: buttonLabel,
      },
    });
  } catch (e) {
    sentry.withSquarespaceScope(() => {
      sentry.captureException(e);
    });
  }
}

function trackUserClicksDashboardSettingsIcon() {
  try {
    track({
      eventName: EventName.USER_CLICKS_DASHBOARD_SETTINGS_ICON,
      actor: Actor.USER,
      action: UserAction.CLICK,
      objectType: ObjectType.BUTTON,
    });
  } catch (e) {
    sentry.withSquarespaceScope(() => {
      sentry.captureException(e);
    });
  }
}

function trackUserViewsSettingsLanding(landingPage: ObjectIdentifier) {
  try {
    track({
      eventName: EventName.USER_VIEWS_SETTINGS_LANDING,
      actor: Actor.USER,
      action: UserAction.VIEW,
      objectType: ObjectType.LINK,
      additionalFields: {
        object_identifier: landingPage,
      },
    });
  } catch (e) {
    sentry.withSquarespaceScope(() => {
      sentry.captureException(e);
    });
  }
}

function useTrackUserViewsSettingsLanding(landingPage: ObjectIdentifier) {
  useEffect(() => {
    trackUserViewsSettingsLanding(landingPage);
  }, [landingPage]);
}

export {
  userClicksContextualSettingsLink,
  buildContextualSettingsEventContext,
  trackUserClicksLaunchpadSettingsCard,
  trackUserClicksDashboardSettingsIcon,
  useTrackUserViewsSettingsLanding,
};

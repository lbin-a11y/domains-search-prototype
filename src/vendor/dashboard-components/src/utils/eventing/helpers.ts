import { useEffect } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { isInternal } from '@sqs/environment-utils';

// We reference these via an object to enable mocking in tests
export const helpers = { useIntersectionObserver };

export const createUseWidgetInView = <Payload extends object>(userViewsDashboardWidget: (payload: Payload) => void) => {
  type Props = {
    // The view event won't fire until a non-null payload is passed through
    payload: Payload | null
    onView?: () => void;
  };

  const useWidgetInView = ({ payload, onView }: Props) => {
    const { inView, ref } = helpers.useIntersectionObserver({
      triggerOnce: true,
      threshold: 0.1,
      skip: !payload
    });

    useEffect(() => {
      if (inView) {
        // Payload should always be defined here, since we skip tracking inView if it isn't
        userViewsDashboardWidget(payload!);
        onView?.();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    return { ref };
  };

  return useWidgetInView;
};

/**
 * This function is used to ensure that an event identifier is provided before firing an event.
 */
export const withValidEventIdentifier = (eventId: string | undefined, cb: (validEventId: string) => void): void => {
  /**
   * This is a temporary flag to prevent excessive console errors before dashboards have been migrated.
   * It can be switched on locally when migrating a dashboard, and should be removed once all dashboards have been migrated.
   */
  const shoudLogError = false;

  if (!eventId) {
    if (isInternal() && shoudLogError) {
      console.error('An event identifier has not been provided for this action');
    }
    return;
  }

  return cb(eventId);
};

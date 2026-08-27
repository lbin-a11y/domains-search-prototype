import { useEffect } from 'react';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import { useUnsafeAnalyticEvents } from '../provider';

type Props = {
  // The view event won't fire until a non-null payload is passed through
  payload: { widgetName: string, completedItems?: string[] } | null;
  onView?: () => void;
};

export const useWidgetInView = ({ payload, onView }: Props) => {
  const { events } = useUnsafeAnalyticEvents();
  const { inView, ref } = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1,
    skip: !payload
  });

  const { userViewsDashboardWidget } = events ?? {};

  useEffect(() => {
    if (inView) {
      // Payload should always be defined here, since we skip tracking inView if it isn't
      userViewsDashboardWidget?.(payload!);
      onView?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return { ref };
};

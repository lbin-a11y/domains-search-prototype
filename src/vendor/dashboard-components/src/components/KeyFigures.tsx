import React from 'react';
import { KeyFigures as KeyFiguresUI } from '@sqs/rosetta-compositions';
import { useWidgetInView } from '../utils/eventing/hooks/useWidgetInView';
import { EventingWidgetName } from '../utils/eventing/constants';
import AnalyticsCard, { AnalyticsCardProps } from './AnalyticsCard';
import { FlexProps } from '@sqs/rosetta-primitives';
import { withValidEventIdentifier } from '../utils/eventing/helpers';
import { useUnsafeAnalyticEvents } from '../utils/eventing/provider';
import { AnalyticsEventIdentifier } from '../types';

type Props = {
  cards: (AnalyticsCardProps & AnalyticsEventIdentifier)[]
  /**
   * List of completed items to track in view event. If the completedItems has not been determined,
   * it should be set to null to prevent the widget from sending an event too early.
   */
  eventCompletedItems: string[] | null;
  renderCard?: (card: AnalyticsCardProps) => React.ReactNode;
} & FlexProps;

const KeyFigures = ({ cards: cardsProp, eventCompletedItems = null, renderCard, sx, ...props }: React.PropsWithChildren<Props>) => {
  const { events } = useUnsafeAnalyticEvents();
  const { ref } = useWidgetInView({
    payload: eventCompletedItems ? {
      widgetName: EventingWidgetName.KEY_FIGURES,
      completedItems: eventCompletedItems
    } : null
  });

  const cards = cardsProp.map(({ eventIdentifier, ...card }) => ({
    ...card,
    ...(card.accessory && {
      accessory: {
        ...card.accessory,
        onClick: () => {
          card.accessory?.onClick();
          withValidEventIdentifier(eventIdentifier, (validEventId) => {
            events?.userClicksViewAll({
              widgetName: EventingWidgetName.KEY_FIGURES,
              subWidgetName: validEventId,
            });
          });
        }
      }
    })
  }));

  return (
    <KeyFiguresUI
      variant="dashboard"
      ref={ref}
      sx={{
        // 2px padding prevents the outer card borders from getting clipped
        p: '2px !important', // override default padding on mobile
        // Allows the container to scroll on narrow viewports
        overflowX: 'auto',
        overflowY: 'hidden',
        ...sx
      }}
      {...props}
    >
      {cards.map(card => renderCard ? renderCard(card) : <AnalyticsCard key={card.title} {...card} />)}
    </KeyFiguresUI>
  );
};

export default KeyFigures;

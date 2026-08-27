import React from 'react';

import { Flex, Text } from '@sqs/rosetta-primitives';
import CardGrid from './CardGrid';
import { CardProps } from './SellingCard/types';
import { useWidgetInView } from '../utils/eventing/hooks/useWidgetInView';
import { EventingWidgetName } from '../utils/eventing/constants';
import { useUnsafeAnalyticEvents } from '../utils/eventing/provider';
import { withValidEventIdentifier } from '../utils/eventing/helpers';

export type SellingCardsProps = {
  title: React.ReactNode;
  cards: CardProps[];
};

export default ({ title, cards: cardsProp }: SellingCardsProps) => {
  const { events } = useUnsafeAnalyticEvents();
  const { ref } = useWidgetInView({
    payload: {
      widgetName: EventingWidgetName.CREATE_CARDS,
    }
  });

  const cards = cardsProp.map(({ eventIdentifier, ...card }) => ({
    ...card,
    ...(card.onClick && {
      onClick: () => {
        card.onClick?.();
        withValidEventIdentifier(eventIdentifier, (validEventId) => {
          events?.userClicksMerchandisingCard({ cardName: validEventId });
        });
      }
    })
  }));

  return (
    <Flex flexDirection="column" mb={10} ref={ref}>
      <Text.Title fontSize={6} my={0} mb={6} as="h2" fontWeight="medium">
        {title}
      </Text.Title>
      <CardGrid
        cards={cards}
      />
    </Flex>
  );
};

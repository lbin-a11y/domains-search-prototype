import React from 'react';
import { Flex } from '@sqs/rosetta-primitives';
import GridCard from './SellingCard/GridCard';
import { CardProps } from './SellingCard/types';

const CardMinWidth = 350;
const CardMaxWidth = 437;

type CardGridProps = {
  cards: CardProps[];
};

export default ({ cards }: CardGridProps) => {
  return (
    <Flex
      display="grid"
      sx={{
        gap: 6,
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${CardMinWidth}px, 100%), 1fr))`,
        gridAutoRows: '1fr',
        width: '100%',
        maxWidth: '100%',
        justifyItems: 'center',
      }}
      role="list"
    >
      {cards.map(card => (
        <GridCard
          key={card.title}
          sx={{
            minWidth: 0,
            width: `min(100%, ${CardMaxWidth}px)`,
          }}
          {...card}
        />
      ))}
    </Flex>
  );
};

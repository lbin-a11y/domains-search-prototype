import React from 'react';
import { Card, CardProps } from '@sqs/rosetta-elements';
import { Flex, FlexProps } from '@sqs/rosetta-primitives';

const TableRowCard = ({ children, ...props }: CardProps) => {
  return (
    <Card
      sx={{
        borderLeft: 0,
        borderRight: 0,
        borderTop: 0,
        outline: 'none',
        width: '100%',
      }}
      as='tr'
      role='row'
      {...props}
    >
      <Card.Body
        sx={{
          p: 2,
        }}
        as='td'
        role='cell'
      >
        {children}
      </Card.Body>
    </Card>
  );
};

TableRowCard.Header = (props: FlexProps) => (
  <Flex justifyContent="space-between" gap={4} {...props} />
);

TableRowCard.Body = (props: FlexProps) => (
  <Flex flexDirection="column" gap={1} mt={1} {...props} />
);

export default TableRowCard;

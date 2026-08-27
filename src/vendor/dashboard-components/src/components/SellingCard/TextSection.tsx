import React from 'react';

import { Card, CardBodyProps } from '@sqs/rosetta-elements';
import { Flex, Text } from '@sqs/rosetta-primitives';

type TextSectionProps = CardBodyProps & {
  title: string;
  subtitle?: string;
  accessory?: React.ReactElement;
};

export default ({ title, subtitle, accessory, sx, ...cardProps }: TextSectionProps) => (
  <Card.Body sx={{ pt: 4, pr: 6, pl: 6, pb: 6, ...sx }} {...cardProps}>
    <Flex gap={2} flexDirection="column">
      <Flex justifyContent="space-between">
        <Text.Subtitle m={0} color="gray.100" fontWeight="medium" as="h3">
          {title}
        </Text.Subtitle>
        {accessory}
      </Flex>
      <Text.Subtitle m={0} color="fg.muted" fontWeight="regular">
        {subtitle}
      </Text.Subtitle>
    </Flex>
  </Card.Body>
);

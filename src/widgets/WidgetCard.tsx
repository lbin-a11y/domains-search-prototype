import type { PropsWithChildren, ReactNode } from 'react';
import { Card } from '@sqs/rosetta-elements';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Text } from '@sqs/rosetta-react/text/next';
import { WidgetBorderRadius } from '@sqs/dashboard-components';

type WidgetCardProps = PropsWithChildren<{
  title: string;
  description?: string;
  actions?: ReactNode;
}>;

/**
 * Shared chrome for the prototype's Home dashboard widgets.
 *
 * Each real widget in config-frontend is its own package and brings its own card
 * treatment; this reproduces the common shell so the ported dashboard framework
 * has consistent widgets to lay out. Typography uses the Renovations `Text`.
 */
export const WidgetCard = ({ title, description, actions, children }: WidgetCardProps) => (
  <Card sx={{ borderRadius: WidgetBorderRadius, width: '100%' }}>
    <Card.Body sx={{ p: 6 }}>
      <Flex justifyContent="space-between" alignItems="flex-start" mb={5} gap={4}>
        <Box>
          <Text.Heading.Small as="h2" m={0}>
            {title}
          </Text.Heading.Small>
          {description && (
            <Text.Body color="fg.muted" m={0} mt={1}>
              {description}
            </Text.Body>
          )}
        </Box>
        {actions && <Flex gap={2}>{actions}</Flex>}
      </Flex>
      {children}
    </Card.Body>
  </Card>
);

export default WidgetCard;

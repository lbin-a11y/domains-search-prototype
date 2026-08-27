import { Card } from '@sqs/rosetta-elements';
import { WidgetCard } from './WidgetCard';
import { Button } from '@sqs/rosetta-react/button/next';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Text } from '@sqs/rosetta-react/text/next';

const PROMOS = [
  {
    id: 'memberships',
    title: 'Sell memberships',
    text: 'Offer a monthly blowout membership to keep regulars booking.',
    cta: 'Learn more',
  },
  {
    id: 'giftcards',
    title: 'Add gift cards',
    text: 'Let clients buy a gift card for a cut or color.',
    cta: 'Learn more',
  },
  {
    id: 'deposits',
    title: 'Require deposits',
    text: 'Cut down on no-shows by charging a deposit at booking.',
    cta: 'Learn more',
  },
];

const FeaturePromosWidget = () => (
  <WidgetCard title="Feature Promos" description="Discover more">
    <Flex flexDirection="column" gap={4}>
      {PROMOS.map((promo) => (
        <Card key={promo.id}>
          <Card.Body sx={{ p: 4 }}>
            <Flex justifyContent="space-between" alignItems="center" gap={4} flexWrap="wrap">
              <Box flex="1 1 260px">
                <Text.Body fontWeight="medium" m={0}>
                  {promo.title}
                </Text.Body>
                <Text.Body color="fg.muted" m={0} mt={1}>
                  {promo.text}
                </Text.Body>
              </Box>
              <Button.Subtle>{promo.cta}</Button.Subtle>
            </Flex>
          </Card.Body>
        </Card>
      ))}
    </Flex>
  </WidgetCard>
);

export default FeaturePromosWidget;

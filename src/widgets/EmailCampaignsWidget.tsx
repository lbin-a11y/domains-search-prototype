import { Card } from '@sqs/rosetta-elements';
import { WidgetCard } from './WidgetCard';
import { Button } from '@sqs/rosetta-react/button/next';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Text } from '@sqs/rosetta-react/text/next';

const STATS = [
  { label: 'Subscribers', value: '412' },
  { label: 'Open rate', value: '48%' },
  { label: 'Sent this month', value: '2' },
];

const EmailCampaignsWidget = () => (
  <WidgetCard
    title="Email Campaigns"
    description="Run a campaign"
    actions={<Button.Subtle>Create campaign</Button.Subtle>}
  >
    <Flex gap={6} flexWrap="wrap" mb={5}>
      {STATS.map(({ label, value }) => (
        <Box key={label} minWidth="120px">
          <Text.Body color="fg.muted" m={0}>
            {label}
          </Text.Body>
          <Text.Heading.Small m={0} mt={1} as="span">
            {value}
          </Text.Heading.Small>
        </Box>
      ))}
    </Flex>

    <Card>
      <Card.Body sx={{ p: 4 }}>
        <Text.Body fontWeight="medium" m={0}>
          Fall color promotion
        </Text.Body>
        <Text.Body color="fg.muted" m={0} mt={1}>
          Draft — remind clients to book their fall color appointment
        </Text.Body>
      </Card.Body>
    </Card>
  </WidgetCard>
);

export default EmailCampaignsWidget;

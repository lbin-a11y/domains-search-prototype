import { Card } from '@sqs/rosetta-elements';
import { Play } from '@sqs/rosetta-icons';
import { WidgetCard } from './WidgetCard';
import { Button } from '@sqs/rosetta-react/button/next';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Text } from '@sqs/rosetta-react/text/next';

const VIDEOS = [
  { id: 'v1', title: 'Set up your booking page', duration: '4 min' },
  { id: 'v2', title: 'Take deposits for appointments', duration: '6 min' },
  { id: 'v3', title: 'Add your services and pricing', duration: '5 min' },
  { id: 'v4', title: 'Connect a domain to your site', duration: '3 min' },
];

const HelpVideosWidget = () => (
  <WidgetCard
    title="Help Videos"
    description="Learn the basics"
    actions={<Button.Subtle>Browse all</Button.Subtle>}
  >
    <Flex flexWrap="wrap" gap={4}>
      {VIDEOS.map((video) => (
        <Card key={video.id} isHoverable sx={{ flex: '1 1 220px', cursor: 'pointer' }}>
          <Card.Body sx={{ p: 4 }}>
            <Flex
              alignItems="center"
              justifyContent="center"
              height="96px"
              mb={3}
              backgroundColor="bg.subtle"
              sx={{ borderRadius: 4 }}
            >
              <Play size={24} />
            </Flex>
            <Text.Body fontWeight="medium" m={0}>
              {video.title}
            </Text.Body>
            <Text.Body color="fg.muted" m={0} mt={1}>
              {video.duration}
            </Text.Body>
          </Card.Body>
        </Card>
      ))}
    </Flex>
    <Box mt={2} />
  </WidgetCard>
);

export default HelpVideosWidget;

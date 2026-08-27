import { Card } from '@sqs/rosetta-elements';
import { Ai } from '@sqs/rosetta-icons';
import { WidgetCard } from './WidgetCard';
import { Flex } from '@sqs/rosetta-primitives';
import { Text } from '@sqs/rosetta-react/text/next';

/**
 * AI entry points are labeled explicitly, and framed around what the owner does
 * with AI rather than what it does for them.
 */
const TOOLS = [
  { id: 'services', title: 'Draft service descriptions with AI', text: 'Generated from the services you already list' },
  { id: 'seo', title: 'Draft page titles with AI', text: 'Suggested from your site content' },
  { id: 'replies', title: 'Draft client replies with AI', text: 'Based on your past booking messages' },
];

const AiToolsWidget = () => (
  <WidgetCard title="AI Business Tools" description="Power your business with AI">
    <Flex flexWrap="wrap" gap={4}>
      {TOOLS.map((tool) => (
        <Card key={tool.id} isHoverable sx={{ flex: '1 1 240px', cursor: 'pointer' }}>
          <Card.Body sx={{ p: 4 }}>
            <Ai size={20} />
            <Text.Body fontWeight="medium" m={0} mt={3}>
              {tool.title}
            </Text.Body>
            <Text.Body color="fg.muted" m={0} mt={1}>
              {tool.text}
            </Text.Body>
          </Card.Body>
        </Card>
      ))}
    </Flex>
  </WidgetCard>
);

export default AiToolsWidget;

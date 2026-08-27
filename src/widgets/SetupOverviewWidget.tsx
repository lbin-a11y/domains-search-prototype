import { LifecycleStage } from '@sqs/config-ui-preferences-ts-client';
import { ProgressRing, SetupTodo } from '@sqs/dashboard-components';
import {
  CalendarStar,
  Checkmark,
  ColorPalette,
  Image as ImageIcon,
  Link,
  Page,
} from '@sqs/rosetta-icons';

import { website } from '../mocks/data';
import { WidgetCard } from './WidgetCard';
import { Button } from '@sqs/rosetta-react/button/next';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Text } from '@sqs/rosetta-react/text/next';

type SetupOverviewWidgetProps = {
  lifecycleStage: LifecycleStage | null;
};

type Task = {
  id: string;
  title: string;
  text: string;
  icon: typeof Page;
  isDone: boolean;
};

/**
 * Onboarding tasks for a salon getting its site ready to take bookings.
 * Mirrors what the setup guide walks a services seller through.
 */
const ONBOARDING_TASKS: Task[] = [
  { id: 'pages', title: 'Add your pages', text: 'Services, about, and contact are ready', icon: Page, isDone: true },
  { id: 'brand', title: 'Choose your colors and fonts', text: 'Match the look of the salon', icon: ColorPalette, isDone: true },
  { id: 'services', title: 'Add your services', text: 'List cuts, color, and treatments with prices', icon: CalendarStar, isDone: true },
  { id: 'photos', title: 'Add photos of your work', text: 'Show the styles you specialize in', icon: ImageIcon, isDone: false },
  { id: 'booking', title: 'Set your availability', text: 'Choose the hours clients can book', icon: CalendarStar, isDone: false },
  { id: 'domain', title: 'Connect your domain', text: `Point ${website.primaryDomain} at this site`, icon: Link, isDone: false },
];

/**
 * Once the salon is operating, the same widget becomes a site overview rather
 * than a checklist — matching how the upstream registry retitles GET_STARTED
 * from "Setup Overview" to "Site Overview" after publish.
 */
const SITE_SUMMARY = [
  { label: 'Plan', value: website.plan },
  { label: 'Primary domain', value: website.primaryDomain },
  { label: 'Services listed', value: '14' },
  { label: 'Booking page', value: 'Live' },
];

const SetupOverviewWidget = ({ lifecycleStage }: SetupOverviewWidgetProps) => {
  const isPrePublish = lifecycleStage === LifecycleStage.PRE_PUBLISH;

  if (!isPrePublish) {
    return (
      <WidgetCard
        title="Site Overview"
        description="Your site at a glance"
        actions={<Button.Subtle>Edit site</Button.Subtle>}
      >
        <Flex flexWrap="wrap" gap={6}>
          {SITE_SUMMARY.map(({ label, value }) => (
            <Box key={label} minWidth="140px">
              <Text.Body color="fg.muted" m={0}>
                {label}
              </Text.Body>
              <Text.Heading.Small m={0} mt={1} as="span">
                {value}
              </Text.Heading.Small>
            </Box>
          ))}
        </Flex>
      </WidgetCard>
    );
  }

  const doneCount = ONBOARDING_TASKS.filter((task) => task.isDone).length;
  const progress = Math.round((doneCount / ONBOARDING_TASKS.length) * 100);

  return (
    <WidgetCard
      title="Setup Overview"
      description={`${doneCount} of ${ONBOARDING_TASKS.length} steps done — publish when you're ready`}
      actions={<Button>Publish site</Button>}
    >
      <Flex gap={6} alignItems="flex-start" flexWrap="wrap">
        <ProgressRing progress={progress} radius={40} strokeWidth={3} />
        <Box flex="1 1 320px">
          {ONBOARDING_TASKS.map((task) => (
            <SetupTodo
              key={task.id}
              title={task.title}
              text={task.text}
              todoIcon={task.icon}
              doneIcon={Checkmark}
              isDone={task.isDone}
              onClick={() => undefined}
              dataTestId={`setup-todo-${task.id}`}
            />
          ))}
        </Box>
      </Flex>
    </WidgetCard>
  );
};

export default SetupOverviewWidget;

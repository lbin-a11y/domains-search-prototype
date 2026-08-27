import { Card } from '@sqs/rosetta-elements';
import { Box, Button, Flex, Text } from '@sqs/rosetta-primitives';
import React from 'react';
import useI18n from '../i18n';
import { WidgetBorderRadius } from './layout';

export type TipContent = {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export type TipProps = TipContent;

const Tip = ({ title, description, action }: TipProps) => {
  const { t } = useI18n();

  return (
    <Card
      maxWidth="100%"
      border={1}
      borderColor="gray.800"
      borderRadius={WidgetBorderRadius}
    >
      <Card.Body
        sx={{
          p: 4,
        }}
      >
        <Flex flexDirection="column">
          <Text.Label fontWeight="medium">
            {t('Tip', null, {
              project: 'dashboard-components',
              notes:
                'Heading for a Tip component that shows a useful piece of advice to the user on their dashboard',
            })}
          </Text.Label>
          <Text.Body mb="9px" mt="3px" as="p" fontWeight="medium">
            {title}
          </Text.Body>
          <Text.Body my={0} color="gray.300">
            {description}
          </Text.Body>
        </Flex>
        {action && (
          <Box mt={2}>
            <Button.Tertiary onClick={action.onClick}>
              {action.label}
            </Button.Tertiary>
          </Box>
        )}
      </Card.Body>
    </Card>
  );
};

export default Tip;

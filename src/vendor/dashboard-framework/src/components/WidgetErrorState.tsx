import React from 'react';
import useI18n from '../i18n';
import { Box, Flex, Text } from '@sqs/rosetta-primitives';

type WidgetErrorStateProps = {
  height: string;
  title: string;
};

export const WidgetErrorState = ({ height, title }: WidgetErrorStateProps) => {
  const { T } = useI18n();

  return (
    <Box mb={10}>
      <Flex
        gap={6}
        flexDirection="column"
      >
        <Text.DisplayTitle>{title}</Text.DisplayTitle>
        <Flex
          height={height}
          border={1}
          borderRadius="11px"
          borderColor="gray.800"
          justifyContent="center"
          alignItems="center"
        >
          <Text.Body color="fg.muted">
            <T project="dashboard-framework">
              Unable to load content. Refresh the page to try again.
            </T>
          </Text.Body>
        </Flex>
      </Flex>
    </Box>
  );
};

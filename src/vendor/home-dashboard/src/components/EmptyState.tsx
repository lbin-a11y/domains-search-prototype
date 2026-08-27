import React from 'react';

import { Box, Button, Flex, Text } from '@sqs/rosetta-primitives';
import { useI18n } from '../i18n';

type EmptyStateProps = {
  setIsCustomizationPopoverOpen: (isOpen: boolean) => void;
};

export const EmptyState = ({ setIsCustomizationPopoverOpen }: EmptyStateProps) => {
  const { T } = useI18n();

  return (
    <Flex
      sx={{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        // subtract height of the PageHeader
        height: 'calc(100% - 110px)',
        width: '100%',
        right: 0,
        mt: -6,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Text.Subtitle>
          <T project="home-dashboard">Turn on some widgets for the full home experience</T>
        </Text.Subtitle>
        <Text.Body color="fg.muted" mb={6}>
          <T project="home-dashboard">You can customize your content and get daily updates.</T>
        </Text.Body>
        <Button.Secondary
          size="medium"
          onClick={() => setIsCustomizationPopoverOpen(true)}
        >
          <T project="home-dashboard">Add widgets</T>
        </Button.Secondary>
      </Box>
    </Flex>
  );
};

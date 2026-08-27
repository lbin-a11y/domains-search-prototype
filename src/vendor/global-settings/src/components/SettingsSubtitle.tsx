import React from 'react';

import { Text } from '@sqs/rosetta-primitives';

type SettingsSubtitleProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof Text>;

const SettingsSubtitle = ({ children, ...props }: SettingsSubtitleProps) => {
  return (
    <Text.Subtitle fontWeight="semibold" {...props}>
      {children}
    </Text.Subtitle>
  );
};

export default SettingsSubtitle;

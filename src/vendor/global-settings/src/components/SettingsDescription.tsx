import React, { ReactNode } from 'react';

import { Text } from '@sqs/rosetta-primitives';

import useSettingsModalContext from './useSettingsModalContext';

type SettingsDescriptionProps = {
  children: ReactNode | undefined;
};

const SettingsDescription = ({ children }: SettingsDescriptionProps) => {
  const { isSettingsModalEnabled } = useSettingsModalContext();

  return isSettingsModalEnabled ? (
    <Text.Subtitle as="div" my={3} color="gray.400">
      {children}
    </Text.Subtitle>
  ) : (
    <div>{children}</div>
  );
};

export default SettingsDescription;

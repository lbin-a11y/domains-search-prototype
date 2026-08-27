import React from 'react';

import { Panel } from '@sqs/universal-panel-components';
import { Flex, Text } from '@sqs/rosetta-primitives';

import useSettingsModalContext from './useSettingsModalContext';

export const SettingsTitleTestId = 'settings-title';

export type SettingsTitleProps = React.ComponentPropsWithoutRef<typeof Flex> & {
  children: React.ReactNode;
  interiorAccessory?: any;
  interiorPre?: any;
};

const StaticNavSettingsTitle = ({
  interiorAccessory,
  interiorPre,
  children,
  ...props
}: SettingsTitleProps) => (
  <>
    <Flex
      sx={{
        justifyContent: interiorAccessory ? 'space-between' : 'flex-start',
      }}
      {...props}
    >
      {interiorPre ? interiorPre : null}
      <Text.Title lineHeight="36px" data-testid={SettingsTitleTestId}>
        {children}
      </Text.Title>
      {interiorAccessory ? interiorAccessory : null}
    </Flex>
  </>
);

const SettingsTitle = (props: SettingsTitleProps) => {
  const { isSettingsModalEnabled } = useSettingsModalContext();

  if (isSettingsModalEnabled) {
    return (
      <StaticNavSettingsTitle {...props} />
    );
  }

  return ( <Panel.Header title={props.children}/>);
};

export default SettingsTitle;

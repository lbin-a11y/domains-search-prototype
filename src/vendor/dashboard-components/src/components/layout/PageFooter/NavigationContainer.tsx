import React from 'react';
import { Flex, Text } from '@sqs/rosetta-primitives';
import useI18n from '../../../i18n';
import { useWidgetInView } from '../../../utils/eventing/hooks/useWidgetInView';
import { EventingWidgetName } from '../../../utils/eventing/constants';

export enum NavigationContainerVariant {
  QUICK_LINKS = 'quick_links',
  HELP_CENTER = 'help_center'
}

type NavigationContainerProps = {
  variant: NavigationContainerVariant,
  children: React.ReactNode
};

const widgetNameMap = {
  [NavigationContainerVariant.QUICK_LINKS]: EventingWidgetName.QUICK_LINKS,
  [NavigationContainerVariant.HELP_CENTER]: EventingWidgetName.HELP_CENTER
};

const NavigationContainer = ({ children, variant }: NavigationContainerProps) => {
  const { t } = useI18n();
  const containerId = React.useId();

  const { ref } = useWidgetInView({
    payload: {
      widgetName: widgetNameMap[variant]
    }
  });

  const title = variant === NavigationContainerVariant.QUICK_LINKS ?
    t('Quick Links', null, { project: 'dashboard-components' }) :
    t('Help Center', null, { project: 'dashboard-components' });

  return (
    <Flex
      ref={ref}
      sx={{
        flex: 1,
        gap: 10,

        ...(variant === NavigationContainerVariant.QUICK_LINKS && {
          maxWidth: 450,

          '@media (max-width: 1400px)': {
            maxWidth: 350,
          }
        }),

        '@media (max-width: 1080px)': {
          gap: 4,
          flexDirection: 'column',
        },

        '@media (max-width: 834px)': {
          maxWidth: 'initial',
          display: 'grid',
          gridTemplateColumns: '1fr 220px'
        },

        '@media (max-width: 720px)': {
          display: 'flex',
        },
      }}
      role="navigation"
      aria-labelledby={containerId}
    >
      <Text.Subtitle m={0} fontSize={5} id={containerId} minWidth="max-content" fontWeight="medium">
        {title}
      </Text.Subtitle>
      <Flex flexDirection="column" gap={4} flex={1}>
        {children}
      </Flex>
    </Flex>
  );
};

export default NavigationContainer;

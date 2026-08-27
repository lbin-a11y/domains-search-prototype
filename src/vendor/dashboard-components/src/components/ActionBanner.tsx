import React from 'react';
import { Card, Image } from '@sqs/rosetta-elements';
import { Button, Flex, FlexProps, Text } from '@sqs/rosetta-primitives';
import useI18n from '../i18n';
import { useWidgetInView } from '../utils/eventing/hooks/useWidgetInView';
import { EventingWidgetName } from '../utils/eventing/constants';
import { useUnsafeAnalyticEvents } from '../utils/eventing/provider';
import { AnalyticsEventIdentifier } from '../types';
import { withValidEventIdentifier } from '../utils/eventing/helpers';
import { useIsMobile } from '../hooks/usePlatform';

export type ActionBannerProps = FlexProps & {
  img: {
    alt: string;
    src: string;
  }
  banner: {
    label: string;
    title: string;
  };
  action: {
    label: string;
    onClick: () => void;
  } & AnalyticsEventIdentifier;
  secondaryAction?: {
    label: string;
    onClick: () => void;
  } & AnalyticsEventIdentifier;
};

const ActionBanner = ({ banner, action, secondaryAction, img, ...props }: ActionBannerProps) => {
  const { t } = useI18n();
  const { ref } = useWidgetInView({
    payload: {
      widgetName: EventingWidgetName.ACTION_BANNER,
    }
  });
  const { events } = useUnsafeAnalyticEvents();
  const isMobile = useIsMobile();

  return (
    <Flex
      border={1}
      borderColor="gray.800"
      borderRadius={6}
      overflow="hidden"
      justifyContent="space-between"
      minHeight={225}
      ref={ref}
      {...props}
    >
      <Card maxWidth="100%" sx={{ flexBasis: 'sizes.750', flexShrink: 0.15, border: 0 }}>
        <Card.Body
          height="100%"
          sx={{
            p: 4
          }}
        >
          <Flex
            aria-label={t('Dismissal Banner', null, { project: 'dashboard-components' })}
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
          >
            <Flex flexDirection="column">
              <Text.Label fontWeight="medium">
                {banner.label}
              </Text.Label>
              <Text.Subtitle my={2} fontWeight="medium" sx={{ fontSize: '20px', lineHeight: '28px' }}>
                {banner.title}
              </Text.Subtitle>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
              <Button.Secondary
                onClick={() => {
                  action.onClick();
                  withValidEventIdentifier(action.eventIdentifier, (validEventId) => {
                    events?.userClicksBannerCTA({ optionName: validEventId });
                  });
                }}
                fontSize={{ _: 2, 'mobile-*': 3 }}
                fontWeight="medium"
                size="small"
              >
                {action.label}
              </Button.Secondary>
              {secondaryAction && (
                <Button.Tertiary
                  onClick={() => {
                    secondaryAction.onClick();
                    withValidEventIdentifier(secondaryAction.eventIdentifier, (validEventId) => {
                      events?.userClicksBannerCTA({ optionName: validEventId });
                    });
                  }}
                  fontSize={{ _: 2, 'mobile-*': 3 }}
                  fontWeight="light"
                  size="small"
                >
                  {secondaryAction.label}
                </Button.Tertiary>
              )}
            </Flex>
          </Flex>
        </Card.Body>
      </Card>
      {!isMobile && (
        <Flex sx={{ flexBasis: '40%', flexShrink: 1, flexGrow: 1, position: 'relative' }}>
          <Image
            key={img.alt}
            alt={img.alt}
            src={img.src}
            fetchpriority='high'
            loading='eager'
            sx={{
              position: 'absolute',
              objectFit: 'cover',
              height: '100%',
              width: '100%'
            }}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default ActionBanner;

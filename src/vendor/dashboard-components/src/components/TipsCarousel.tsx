import React, { forwardRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@sqs/rosetta-glyphs';
import { ChevronLargeLeft, ChevronLargeRight } from '@sqs/rosetta-icons';
import { Box, Button, Flex, FlexProps, Text, Touchable } from '@sqs/rosetta-primitives';
import { useMergeRefs } from '@sqs/rosetta-utilities';
import useI18n from '../i18n';
import { Card, Image } from '@sqs/rosetta-elements';
import usePlatform from '../hooks/usePlatform';
import { MobileBreakpoint, WidgetBorderRadius } from './layout';
import { useUnsafeAnalyticEvents } from '../utils/eventing/provider';
import { useWidgetInView } from '../utils/eventing/hooks/useWidgetInView';
import { EventingWidgetName } from '../utils/eventing/constants';
import { AnalyticsEventIdentifier } from '../types';
import { withValidEventIdentifier } from '../utils/eventing/helpers';

export type TipContentNoImage = {
  label?: string;
  title: string;
  content?: string;
  action?: {
    label: string;
    icon: JSX.Element;
    onClick: () => void;
  };
  eventTipName?: string;
} & AnalyticsEventIdentifier;

export type TipContentWithImage = TipContentNoImage & {
  img: {
    src: string;
    alt: string;
  };
  customImage?: React.ReactNode;
};

export type NavigateOptions = {
  activeTipIndex: number,
  nextTipIndex: number
};

export type TipsCarouselProps = FlexProps & {
  tips: TipContentNoImage[] | TipContentWithImage[];
  onNavigateForward?: (navigateOptions: NavigateOptions) => void;
  onNavigateBackward?: (navigateOptions: NavigateOptions) => void;
  eventingWidgetName?: EventingWidgetName.TIP | EventingWidgetName.FEATURE_PROMO;
};

function getTipImage(tip: TipContentNoImage | TipContentWithImage) {
  if ('img' in tip) {
    return tip.img;
  }
  return undefined;
}

function getTipCustomImage(tip: TipContentNoImage | TipContentWithImage): React.ReactNode | undefined {
  if ('customImage' in tip) {
    return (tip as TipContentWithImage).customImage;
  }
  return undefined;
}

function hasAnyImage(tip: TipContentNoImage | TipContentWithImage): boolean {
  return !!getTipImage(tip) || !!getTipCustomImage(tip);
}


const TipsCarousel = forwardRef<HTMLElement, TipsCarouselProps>((props, ref) => {
  const { tips, onNavigateForward, onNavigateBackward, eventingWidgetName = EventingWidgetName.TIP } = props;

  const { events } = useUnsafeAnalyticEvents();
  const platform = usePlatform();
  const { t } = useI18n();
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const { ref: internalRef } = useWidgetInView({
    payload: {
      widgetName: eventingWidgetName
    },
    onView: () => {
      withValidEventIdentifier(tips[activeTipIndex].eventIdentifier, (validEventId) => {
        events?.userViewsTip({ tipName: validEventId, widgetName: eventingWidgetName });
      });
    }
  });
  const refs = useMergeRefs(internalRef, ref);

  const activeTip = tips[activeTipIndex];
  const activeTipHasImage = hasAnyImage(activeTip);

  const isStandaloneTitle = activeTip.content ? false : true;

  const defaultTipLabel = t('Tip', null, {
    project: 'dashboard-components',
    notes:
      'Heading for a Tip component that shows a useful piece of advice to the user on their dashboard',
  });

  const ChevronLeftIcon = platform === 'mobile' ? ChevronLeft : ChevronLargeLeft;
  const ChevronRightIcon = platform === 'mobile' ? ChevronRight : ChevronLargeRight;

  const handleClickRight = () => {
    const nextTipIndex = activeTipIndex === tips.length - 1 ? 0 : activeTipIndex + 1;
    setActiveTipIndex(nextTipIndex);
    onNavigateForward?.({ activeTipIndex, nextTipIndex });
    withValidEventIdentifier(activeTip.eventIdentifier, (validEventId) => {
      events?.userNavigatesForwardTips({ tipName: validEventId, widgetName: eventingWidgetName });
    });
    withValidEventIdentifier(tips[nextTipIndex].eventIdentifier, (validEventId) => {
      events?.userViewsTip({ tipName: validEventId, widgetName: eventingWidgetName });
    });
  };
  const handleClickLeft = () => {
    const nextTipIndex = activeTipIndex === 0 ? tips.length - 1 : activeTipIndex - 1;
    setActiveTipIndex(nextTipIndex);
    onNavigateBackward?.({ activeTipIndex, nextTipIndex });
    withValidEventIdentifier(activeTip.eventIdentifier, (validEventId) => {
      events?.userNavigatesBackwardTips({ tipName: validEventId, widgetName: eventingWidgetName });
    });
    withValidEventIdentifier(tips[nextTipIndex].eventIdentifier, (validEventId) => {
      events?.userViewsTip({ tipName: validEventId, widgetName: eventingWidgetName });
    });
  };

  return (
    <Flex
      ref={refs}
      border={1}
      borderColor="gray.800"
      borderRadius={WidgetBorderRadius}
      overflow="hidden"
      minHeight={225}
      {...props}
    >
      <Card
        maxWidth="100%"
        sx={{
          border: 0,
          flex: '1 1 400px',

          [`@media (max-width: ${MobileBreakpoint}px)`]: {
            flexBasis: '100%'
          }
        }}
      >
        <Card.Body
          height="100%"
          sx={{
            px: 4,
            py: 3
          }}
        >
          <Flex
            aria-label={t('promo carousel', null, { project: 'dashboard-components' })}
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
            gap={3}
          >
            <Flex flexDirection="column">
              <Text.Label fontWeight="medium">
                {activeTip?.label ? activeTip.label : defaultTipLabel}
              </Text.Label>
              <Text.Subtitle
                mt={2}
                mb={0}
                fontWeight="medium"
                sx={{
                  ...(isStandaloneTitle && {
                    fontSize: 18,
                    lineHeight: '24px',
                  })
                }}
              >
                {activeTip.title}
              </Text.Subtitle>
              {activeTip.content && (
                <Text.Body my={0} mt={2} color="gray.300">
                  {activeTip.content}
                </Text.Body>
              )}
            </Flex>
            <Flex
              alignItems="center"
              minHeight="sizes.200"
              gap={1}
              justifyContent={activeTip.action ? 'space-between' : 'flex-end'}
              flexWrap="wrap"
            >
              {activeTip.action && (
                <Flex alignItems="center" gap={2}>
                  <Box>
                    <Button.Base
                      onClick={() => {
                        activeTip.action?.onClick();
                        withValidEventIdentifier(activeTip.eventIdentifier, (validEventId) => {
                          events?.userClicksTip({ tipName: validEventId, widgetName: eventingWidgetName });
                        });
                      }}
                      sx={{
                        textDecoration: 'underline',
                        textTransform: 'none',
                        fontSize: { _: 2, 'mobile-*': 3 },
                        fontWeight: 400,
                        color: 'gray.300',
                        letterSpacing: 0,
                        gap: 2,
                        '& svg': {
                          color: 'inherit',
                        },
                        '&:hover': {
                          color: 'gray.100',
                          textDecoration: 'none',
                        },
                        '&:focus-visible': {
                          color: 'gray.100',
                          textDecoration: 'none',
                          '& svg': {
                            color: 'gray.100'
                          }
                        }
                      }}
                    >
                      <Flex as="span" alignItems="center" justifyContent="center" aria-hidden="true">
                        {activeTip.action.icon}
                      </Flex>
                      {activeTip.action.label}
                    </Button.Base>
                  </Box>
                </Flex>
              )}
              {tips.length > 1 && (
                <Flex gap={2}>
                  <Touchable.Element.Icon
                    aria-label={t('Cycle left through tips', null, {
                      project: 'dashboard-components'
                    })}
                    onClick={handleClickLeft}
                  >
                    <ChevronLeftIcon
                      aria-label={t('Left arrow icon', null, { project: 'dashboard-components' })}
                      role="img"
                    />
                  </Touchable.Element.Icon>
                  <Touchable.Element.Icon
                    aria-label={t('Cycle right through tips', null, {
                      project: 'dashboard-components'
                    })}
                    onClick={handleClickRight}
                  >
                    <ChevronRightIcon
                      aria-label={t('Right arrow icon', null, { project: 'dashboard-components' })}
                      role="img"
                    />
                  </Touchable.Element.Icon>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Card.Body>
      </Card>
      {activeTipHasImage && (
        <Flex
          sx={{
            flex: '1 1.5 300px',
            position: 'relative',
            maxWidth: 300,
            overflow: 'hidden',
            [`@media (max-width: ${MobileBreakpoint}px)`]: {
              display: 'none'
            }
          }}
        >
          {tips.map((tip, tipIndex) => {
            const customImage = getTipCustomImage(tip);
            const imgTip = getTipImage(tip);
            const isActiveTip = activeTipIndex === tipIndex;

            if (customImage) {
              return (
                <Box
                  key={tip.title}
                  sx={{
                    opacity: isActiveTip ? 1 : 0,
                    position: 'absolute',
                    transition: 'opacity 0.5s',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  {customImage}
                </Box>
              );
            }

            if (imgTip) {
              return (
                <Image
                  key={tip.title}
                  alt={imgTip.alt}
                  src={imgTip.src}
                  fetchpriority='high'
                  loading='eager'
                  sx={{
                    opacity: isActiveTip ? 1 : 0,
                    position: 'absolute',
                    transition: 'opacity 0.5s',
                    objectFit: 'cover',
                    objectPosition: 'right',
                    height: '100%',
                    width: '100%'
                  }}
                />
              );
            }
          })}
        </Flex>
      )}
    </Flex>
  );
});

export default TipsCarousel;

import React, { ComponentProps, useEffect } from 'react';
import { Card, Image } from '@sqs/rosetta-elements';
import { Button, Flex, FlexProps, Text } from '@sqs/rosetta-primitives';
import useI18n from '../i18n';
import { useWidgetInView } from '../utils/eventing/hooks/useWidgetInView';
import { EventingWidgetName } from '../utils/eventing/constants';
import { useUnsafeAnalyticEvents } from '../utils/eventing/provider';
import { AnalyticsEventIdentifier } from '../types';
import { withValidEventIdentifier } from '../utils/eventing/helpers';
import { useIsMobile } from '../hooks/usePlatform';
import { useTheme } from '@sqs/rosetta-styled';
import { getBreakpoint } from '@sqs/rosetta-utilities';

/**
 * MarketingBanner
 *
 * A flexible, reusable banner component for marketing and promotional messaging.
 * Very similar to ActionBanner with some improvements:
 *
 * Features:
 * - Displays a label, title, and optional body text.
 * - Supports a primary action button and an optional secondary action button.
 * - Can display an overlay image and a customizable backdrop.
 * - Responsive: hides overlay image on mobile and at small breakpoints.
 * - Integrates with analytics and eventing for impression and click tracking.
 * - Accepts additional FlexProps for layout customization.
 * - Buttons are 100% width on mobile.
 */

export type MarketingBannerProps = FlexProps & {
  banner: {
    label: string;
    title: string;
    body?: string;
  };
  action: {
    label: string;
    onClick: () => void;
  } & AnalyticsEventIdentifier;
  secondaryAction?: {
    label: string;
    onClick: () => void;
  } & AnalyticsEventIdentifier;
  overlayImage?: {
    alt: string;
    src: string;
    styles?: ComponentProps<typeof Image>['sx'];
  }
  imageContainerStyles?: ComponentProps<typeof Flex>['sx']
};

const MarketingBanner = ({ banner, action, secondaryAction, overlayImage, imageContainerStyles, ...props }: MarketingBannerProps) => {
  const { t } = useI18n();
  const { ref } = useWidgetInView({
    payload: {
      widgetName: EventingWidgetName.MARKETING_BANNER,
    }
  });
  const { breakpoints } = useTheme();
  const [widthRuleForBreakpoint, setWidthRuleForBreakpoint] = React.useState<boolean>();
  const { events } = useUnsafeAnalyticEvents();
  const isMobile = useIsMobile();

  useEffect(() => {
    function computeWidthRuleForBreakpoint() {
      const newValue = getBreakpoint(breakpoints);
      setWidthRuleForBreakpoint(newValue.name === 'desktop-100');
    }
    computeWidthRuleForBreakpoint();
    window.addEventListener('resize', computeWidthRuleForBreakpoint);

    return () => {
      window.removeEventListener('resize', computeWidthRuleForBreakpoint);
    };
  }, [breakpoints]);


  const shouldDisplayImage = !isMobile && widthRuleForBreakpoint;

  return (
    <Flex
      border={1}
      borderColor="gray.800"
      borderRadius={6}
      overflow="hidden"
      justifyContent="space-between"
      minHeight={225}
      {...props}
      ref={ref}
    >
      <Card maxWidth="100%" sx={{ flexBasis: shouldDisplayImage ? 'sizes.800' : '100%', flexShrink: 0.15, border: 0 }}>
        <Card.Body
          height="100%"
          sx={{
            py: 4,
            px: 6,
          }}
        >
          <Flex
            aria-label={t('Dismissal Banner', null, { project: 'dashboard-components' })}
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
            gap={6}
          >
            <Flex flexDirection="column" gap={2}>
              <Text.Label as="div" fontWeight="medium">
                {banner.label}
              </Text.Label>
              <Text.Subtitle as="div" fontWeight="medium" fontSize="16px" lineHeight="28px">
                {banner.title}
              </Text.Subtitle>
              {banner.body && (
                <Text.Body as="div" color="gray.300" fontSize="14px" lineHeight="22px" fontWeight="light">
                  {banner.body}
                </Text.Body>
              )}
            </Flex>
            <Flex alignItems="center" justifyContent="space-between" gap={2} flexWrap={'wrap'}>
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
                width={isMobile ? '100%' : 'auto'}
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
                  fontWeight="medium"
                  color="gray.300"
                  size="small"
                  width={isMobile ? '100%' : 'auto'}
                >
                  {secondaryAction.label}
                </Button.Tertiary>
              )}
            </Flex>
          </Flex>
        </Card.Body>
      </Card>
      {shouldDisplayImage && (
        <Flex sx={{ flexGrow: 1, position: 'relative', backgroundSize: 'cover', ...imageContainerStyles }}>
          {overlayImage && (
            <Image
              key={overlayImage.alt}
              alt={overlayImage.alt}
              src={overlayImage.src}
              fetchpriority='high'
              loading='eager'
              sx={{
                position: 'absolute',
                ...overlayImage.styles,
              }}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default MarketingBanner;

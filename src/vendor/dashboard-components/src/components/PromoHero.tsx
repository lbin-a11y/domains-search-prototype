import { Chip } from '@sqs/rosetta-elements';
import { Flex, FlexProps, Text, TextProps } from '@sqs/rosetta-primitives';
import { useMergeRefs } from '@sqs/rosetta-utilities';
import React, { forwardRef } from 'react';
import { WidgetBorderRadius } from './layout';
import { useWidgetInView } from '../utils/eventing/hooks/useWidgetInView';
import { EventingWidgetName } from '../utils/eventing/constants';

const backgroundImageNoOverlay = (src: string): string => {
  return `url("${src}")`;
};

const backgroundImageWithOverlay = (src: string): string => {
  /**
   * The 2 linear-gradients create an overlay to make text more readable
   */
  return `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.45) 100%
    ),
    linear-gradient(
      180deg,
      rgba(14, 14, 14, 0.22) 0%,
      rgba(14, 14, 14, 0.22) 100%
    ),
    url("${src}")
  `;
};

export type PromoHeroProps = {
  children: React.ReactNode;
  imgSrc: string;
  breakpointImages?: Record<number, string>;
  isOverlayDisabled?: boolean;
} & FlexProps;

const PromoHero = forwardRef<HTMLElement, PromoHeroProps>(({
  children,
  imgSrc,
  breakpointImages,
  isOverlayDisabled,
  ...props
}, ref) => {
  const { ref: internalRef } = useWidgetInView({ payload: { widgetName: EventingWidgetName.PROMO_HERO } });
  const refs = useMergeRefs(internalRef, ref);
  const backgroundImage = isOverlayDisabled ? backgroundImageNoOverlay : backgroundImageWithOverlay;

  const backgroundImageSx: Record<string, string | object> = { backgroundImage: backgroundImage(imgSrc) };

  if (breakpointImages) {
    Object.entries(breakpointImages).forEach(([breakpointValue, breakpointSrc]) => {
      backgroundImageSx[`@media (max-width: ${breakpointValue}px)`] = {
        backgroundImage: backgroundImage(breakpointSrc),
      };
    });
  }
  return (
    <Flex
      ref={refs}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      borderRadius={WidgetBorderRadius}
      gap={8}
      minHeight={280}
      justifyContent="space-between"
      flexDirection="column"
      sx={{ ...backgroundImageSx }}
      {...props}
    >
      {children}
    </Flex>
  );
});

const PromoHeroTitle = ({ children, ...props }: TextProps) => (
  <Text.DisplayTitle maxWidth="30ch" color="fg.onStrong" as="h3" p={4} {...props}>
    {children}
  </Text.DisplayTitle>
);

const PromoHeroFooter = ({ children, sx, ...props }: FlexProps) => (
  <Flex
    p={4}
    sx={{
      /**
       * The <T> component which is passed in as `children` wraps its content in a span tag, which we target here.
       */
      '& > span': {
        alignItems: 'center',
        color: 'fg.onStrong',
        display: 'flex',
        fontWeight: 'medium',
        fontSize: 3,
        flexWrap: 'wrap',
        gap: 2,
      },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Flex>
);

type ChipsProps = {
  data: string[];
} & FlexProps;

const PromoHeroChips = ({ data, ...props }: ChipsProps) => (
  <Flex gap={1} flexWrap="wrap" {...props}>
    {data.map((recommendation) => (
      <Chip
        color="fg.onStrong"
        key={recommendation}
        label={recommendation}
        sx={{
          backdropFilter: 'blur(30px)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
      />
    ))}
  </Flex>
);

export default Object.assign(PromoHero, {
  Title: PromoHeroTitle,
  Footer: PromoHeroFooter,
  Chips: PromoHeroChips,
});

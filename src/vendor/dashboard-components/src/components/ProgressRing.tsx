import React from 'react';
import useTween from 'react-use/lib/useTween';
import { Flex, Text } from '@sqs/rosetta-primitives';
import { useFormatters } from '@sqs/i18n-react';
import { useTheme } from '@sqs/rosetta-styled';

const ProgressRingAnimationMs = 1000;
const ProgressRingDelayMs = 500;

export const ProgressRingTesting = {
  ProgressRingAnimationDuration: ProgressRingAnimationMs + ProgressRingDelayMs
};

type RingProps = {
  radius: number;
  progress: number;
  strokeWidth: number;
  strokeColor: string;
};

const Ring: React.FC<RingProps> = ({ radius, strokeWidth, strokeColor, progress }) => {
  const actualRadius = radius - (strokeWidth * 2);
  const circumference = actualRadius * 2 * Math.PI;
  const progressOffset = circumference - progress / 100 * circumference;
  const progressProps = {
    strokeDasharray: circumference + ' ' + circumference,
    style: {
      strokeDashoffset: progressOffset,
    }
  };

  return (
    <circle
      cx={radius}
      cy={radius}
      r={radius - (strokeWidth * 2)}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fill='transparent'
      {...progressProps}
    />
  );
};

export type ProgressRingProps = {
  progress: number;
  radius?: number;
  strokeWidth?: number;
};

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  radius = 24,
  strokeWidth = 2,
}) => {
  const { formatQuantity } = useFormatters();
  const { colors } = useTheme();

  const t = useTween('linear', ProgressRingAnimationMs, ProgressRingDelayMs);

  const tweenedProgress = t * progress;

  return (
    <Flex position="relative" height={radius * 2} width={radius * 2}>
      <svg style={{ transform: 'rotate(-90deg)' }} height="100%" width="100%">
        <Ring // Renders base ring
          radius={radius}
          strokeWidth={strokeWidth}
          strokeColor={colors.gray[800]}
          progress={100}
        />
        <Ring // Renders progress ring that is overlaid over base ring
          radius={radius}
          strokeWidth={strokeWidth}
          strokeColor={colors.gray[300]}
          progress={tweenedProgress}
        />
      </svg>
      <Flex position="absolute" width="100%" height="100%" justifyContent="center" alignItems="center">
        <Text.Subtitle fontSize={2}>
          {formatQuantity({
            value: Math.floor(t * progress),
            unit: 'percent'
          }, {
            length: 'narrow',
            maximumFractionDigits: 0
          })}
        </Text.Subtitle>
      </Flex>
    </Flex>
  );
};

export default ProgressRing;

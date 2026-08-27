import { CardProps as RosettaCardProps } from '@sqs/rosetta-elements';
import { AnalyticsEventIdentifier } from '../../types';
import type { ReactElement } from 'react';

export type CardProps = {
  title: string;
  subtitle?: string;
  src?: string;
  alt?: string;
  children?: ReactElement;
  onClick?: () => void;
} & AnalyticsEventIdentifier & RosettaCardProps & {
  [x: string]: unknown
};

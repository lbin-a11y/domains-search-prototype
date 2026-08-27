import React from 'react';
import { Box } from '@sqs/rosetta-primitives';
import type { BoxProps } from '@sqs/rosetta-primitives';

type FooterProps = Omit<BoxProps, 'children'> & {
  children?: React.ReactNode;
};

const Footer = ({ children, ...boxProps }: FooterProps) => (
  children ? (
    <Box px={6} {...boxProps}>
      {children}
    </Box>
  ) : null
);

export default Footer;

import React, { PropsWithChildren } from 'react';
import { Box, BoxProps } from '@sqs/rosetta-primitives';
import { Grid } from '@sqs/rosetta-elements';
import { GridBreakpoints, GridGutter, MaxWidth, OuterMargin } from './constants';

type Props = Partial<BoxProps>;

const Section: React.FC<PropsWithChildren<Props>> = ({ children, ...rest }) => (
  <Box
    width="100%"
    backgroundColor="base"
    {...rest}
  >
    <Grid.Container
      breakpoints={GridBreakpoints}
      gridConstraint={12}
      gutter={GridGutter}
      margin={OuterMargin}
      maxWidth={MaxWidth}
    >
      {children}
    </Grid.Container>
  </Box>
);

export default Section;

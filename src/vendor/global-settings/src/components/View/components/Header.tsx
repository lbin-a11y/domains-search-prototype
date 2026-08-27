import React from 'react';

import { Grid, Stack } from '@sqs/rosetta-elements';
import { Box } from '@sqs/rosetta-primitives';

import HeaderTitleArea from './HeaderTitleArea';
import { HeaderActionAreaExit } from './HeaderActionArea/HeaderActionArea';
import isMobile from '../../../utils/isMobile';
import { DESKTOP_HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from '../constants';

const Header: React.FunctionComponent<React.PropsWithChildren<unknown>> = () => {

  const bottomBorderColor = isMobile() ? 'transparent' : 'gray.800';
  const headerHeight = isMobile() ? MOBILE_HEADER_HEIGHT : DESKTOP_HEADER_HEIGHT;

  return (
    <Box
      height={headerHeight}
      borderBottom={1}
      borderColor={bottomBorderColor}
    >
      <Grid.Container
        alignItems="center"
        gridConstraint={12}
        height={`calc(${headerHeight} - 1px)`}
        {...( isMobile() ? { margin: 3 } : { })}
      >
        <Grid.Item>
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <HeaderTitleArea />
            <HeaderActionAreaExit />
          </Stack>
        </Grid.Item>
      </Grid.Container>
    </Box>
  );
};

export default Header;

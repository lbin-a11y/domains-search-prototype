import React from 'react';

import { Box } from '@sqs/rosetta-primitives';

import useSettingsModalContext from './useSettingsModalContext';
import { MAX_SETTINGS_CONTENT_WIDTH, standaloneSettingsStyles } from '../constants';
import isMobile from '../utils/isMobile';

const ScrollableBoundingBox = React.forwardRef(({ children, ...props }: any, ref) => {
  const { isHideUIForPrint, htmlAttributes } = useSettingsModalContext();

  const printSx = isHideUIForPrint ? {
    '@media print': standaloneSettingsStyles,
  } : {};

  return (
    <Box
      {...htmlAttributes}
      ref={ref}
      height="100%"
      sx={{
        ...(!isMobile() && {
          overflowY: 'auto',
          overflowX: 'hidden',
        }),
        scrollbarGutter: 'stable both-edges',
        ...printSx,
      }}
      {...props}
    >
      <Box margin="auto" maxWidth={MAX_SETTINGS_CONTENT_WIDTH}>
        {children}
      </Box>
    </Box>
  );
});

export default ScrollableBoundingBox;

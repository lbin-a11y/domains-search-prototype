import { Flex } from '@sqs/rosetta-primitives';
import React, { PropsWithChildren } from 'react';
import { OuterMargin, OuterMarginMobile } from './constants';
import { ThemeContext, useTheme } from '@sqs/rosetta-styled';

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  return (
    <ThemeContext.Provider theme={theme}>
      <Flex
        flexDirection="column"
        position="relative"
        minHeight="100%"
        sx={{
          mx: -OuterMargin,

          '@media (max-width: 432px)': {
            mx: -OuterMarginMobile,
          },
        }}
      >
        {children}
      </Flex>
    </ThemeContext.Provider>
  );
};

export default Wrapper;

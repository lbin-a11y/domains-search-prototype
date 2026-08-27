import React, { useContext } from 'react';
import { Box } from '@sqs/rosetta-primitives';
import { useTheme } from '@sqs/rosetta-styled';
import { GLOBAL_NAVIGATION_TYPE } from '../constants/navigation';
import { useNavigationType } from '../utils/useNavigationType';
import { NAVIGATION_WIDTH } from '../constants/style';
import { Context } from '../context/Provider';

type ContainerProps = {
  children?: React.ReactNode;
  sx?: Record<string, unknown>
  hasBorder?: boolean;
};

const styles = {
  [GLOBAL_NAVIGATION_TYPE.EDITING]: {
    width: NAVIGATION_WIDTH[GLOBAL_NAVIGATION_TYPE.EDITING],
    left: 0,
    transform: 'translate3d(0, 0, 0)'
  },
  [GLOBAL_NAVIGATION_TYPE.DEFAULT]: {
    width: NAVIGATION_WIDTH[GLOBAL_NAVIGATION_TYPE.DEFAULT],
    left: 0,
    transform: 'translate3d(0, 0, 0)'
  },
  [GLOBAL_NAVIGATION_TYPE.TUCKED]: {
    width: NAVIGATION_WIDTH[GLOBAL_NAVIGATION_TYPE.DEFAULT],
    left: 0,
    transform: 'translate3d(-100%, 0, 0)'
  },
  [GLOBAL_NAVIGATION_TYPE.DRAWER]: {
    width: NAVIGATION_WIDTH[GLOBAL_NAVIGATION_TYPE.DRAWER],
    left: 0,
    transform: 'translate3d(0, 100%, 0)'
  }
};

const Container = ({
  children,
  sx,
  hasBorder = false,
  ...rest
}: ContainerProps) => {
  const navigationType = useNavigationType();
  const { isDrawerOpen, setIsDrawerOpen } = useContext(Context);
  const { time, easing } = useTheme();

  if (navigationType === null) {
    return null;
  }

  const isDrawer = navigationType === GLOBAL_NAVIGATION_TYPE.DRAWER;
  const containerStyles = styles[navigationType];
  const mobileContainerStyles = isDrawer && isDrawerOpen ?
    { transform: 'translate3d(0, 0, 0)' } : {};
  const borderStyles = isDrawer ? {} : {
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: hasBorder ? 'gray.800' : 'transparent',
  };

  return (
    <>
      {isDrawer ? (
        <Box
          position="fixed"
          width="100vw"
          height="100vh"
          top={0}
          left={0}
          zIndex={999}
          backgroundColor="gray.100"
          opacity={isDrawerOpen ? 0.3 : 0}
          onClick={() => setIsDrawerOpen(false)}
          transitionDuration={time['500']}
          transitionProperty="opacity"
          css={{
            pointerEvents: isDrawerOpen ? 'all' : 'none'
          }}
        />
      ) : null}
      <Box
        position={isDrawer ? 'fixed' : 'absolute'}
        height="100%"
        zIndex={isDrawer ? 999 : 9}
        sx={{
          transition: `all ${time['500']} ${easing.product.default}`,
          ...containerStyles,
          ...mobileContainerStyles,
          ...borderStyles,
          ...sx
        }}
        {...rest}
      >
        {children}
      </Box>
    </>
  );
};

export default Container;

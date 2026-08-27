import React, { useRef, useState } from 'react';
// @ts-expect-error Add a declaration file for react-scrolllock
import { TouchScrollable } from 'react-scrolllock';

import { Box, Flex } from '@sqs/rosetta-primitives';
import { Breakpoint } from '@sqs/rosetta-utilities';
//@ts-expect-error
import { CSSTransitionGroup } from '@sqs/transitions';
import type { RouterLocation } from '@sqs/universal-router';

import {
  DESKTOP_NAVIGATION_WIDTH,
  MOBILE_HEADER_HEIGHT,
} from '../constants';
import mobileTransitions, { easing } from '../utils/mobileTransitions';
import desktopTransitions from '../utils/desktopTransitions';
import { SettingsNavigationExit } from '../../SettingsNavigation';
import { standaloneSettingsStyles } from '../../../constants';
import Header from './Header';

type TransitionDirection = keyof (typeof desktopTransitions.transitions);

export interface LayoutProps {
  navigation: React.ComponentType<React.PropsWithChildren<unknown>>;
  location: RouterLocation;
  mountPoint: string;
  children: React.ReactNode;
}

/**
 * The mobile layout is reflective of the NavDialog structure/UX within Rosetta.
 * Whereby EITHER the sidebar is displayed, OR the primary content area, based
 * upon user interaction and state that determines whether the user has selected
 * a primary content area to be presented.
 */
const MobileLayout = ({
  children,
  location,
  mountPoint,
  navigation: Navigation,
}: LayoutProps) => {
  const transitions = useMobileTransitions(location);
  const isAtRoot = location.pathname === mountPoint;

  return (
    <Box
      sx={{
        transition: `background-color .4s ${easing}`,
      }}
    >
      <Header />
      <CSSTransitionGroup
        data-test="full-width-panel-mobile-transition"
        key="full-width-mobile-transition-group"
        style={{
          overflow: 'hidden',
          height: `calc(${window.innerHeight}px - ${MOBILE_HEADER_HEIGHT})`,
        }}
        transitions={transitions}
        wrapChildWithTag={false}
      >
        <TouchScrollable>
          <Box
            style={{
              height: 'inherit',
              overflowY: 'auto',
            }}
          >
            {isAtRoot ? (
              <Box px={3}>
                <Navigation />
              </Box>
            ) : (
              children
            )}
          </Box>
        </TouchScrollable>
      </CSSTransitionGroup>
    </Box>
  );
};

function useMobileTransitions(nextLocation: RouterLocation) {
  const [state, setState] = useState<{
    location: RouterLocation,
    isEntering: boolean,
  }>({
    location: nextLocation,
    isEntering: false,
  });

  if (nextLocation.key !== state.location.key) {
    setState({
      location: nextLocation,
      isEntering: nextLocation.pathname.startsWith(state.location.pathname),
    });
  }

  return state.isEntering ?
    mobileTransitions.transitions.toLeft :
    mobileTransitions.transitions.toRight;
}

/**
 * The desktop layout is a 'classical' sidebar/panel rendered alongside a
 * primary content area, as described in:
 * https://design-platform.squarespace.net/docs/develop/guides/layout
 */
const DesktopMainArea = ({
  children,
  location,
  navigation: Navigation,
  mountPoint,
}: LayoutProps) => {
  const navContainer = useRef<HTMLElement>(null);
  const transitions = useDesktopTransitions(location, mountPoint);

  // note: "standalone" is temporary and may be removed post DF-11, DF-12
  const [isStandalonePage] = useState(location.query?.standalone === 'true');
  const standaloneSx = isStandalonePage ? standaloneSettingsStyles : {};

  return (
    <Flex height="100%" overflowY="hidden">
      <Box
        className="full-width-desktop-navigation"
        sx={{
          flexDirection: 'column',
          flexBasis: DESKTOP_NAVIGATION_WIDTH,
          flexGrow: 0,
          flexShrink: 0,
          maxWidth: DESKTOP_NAVIGATION_WIDTH,
          borderRight: 1,
          borderRightColor: 'gray.800',
          overflowY: 'auto',
          '@media(prefers-reduced-motion: no-preference)': {
            scrollBehavior: 'smooth',
          },
        }}
      >
        <SettingsNavigationExit
          fallback={(
            <Box
              ref={navContainer}
              sx={{
                px: 5,
                pt: 2,
                pb: 6,
                flex: 1,
              }}
            >
              <Navigation />
            </Box>
          )}
        />
      </Box>
      <Box
        bg="white"
        data-testid="full-width-desktop-content"
        sx={{
          flexGrow: 1,
          height: '100%',
          minWidth: 0,
          ...standaloneSx,
        }}
      >
        <CSSTransitionGroup
          data-test="full-width-panel-desktop-transition"
          key="full-width-desktop-transition-group"
          transitions={transitions}
          wrapChildWithTag={false}
          style={{
            height: '100%',
          }}
        >
          <Box
            key={location.key}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden',
            }}
          >
            {children}
          </Box>
        </CSSTransitionGroup>
      </Box>
    </Flex>
  );
};

function useDesktopTransitions(nextLocation: RouterLocation, mountPoint: string) {
  const [state, setState] = useState<{
    location: RouterLocation,
    direction: TransitionDirection | null,
  }>({
    location: nextLocation,
    direction: null,
  });

  if (nextLocation.key !== state.location.key) {
    let nextDirection: TransitionDirection | null;

    if (!nextLocation.pathname.startsWith(mountPoint)) {
      // If we're exiting the modal, don't animate.
      nextDirection = null;
    } else if (state.location.pathname === mountPoint) {
      // If we're redirecting from the modal mount point, don't animate.
      // This prevents an animation upon opening and redirecting to the first link.
      nextDirection = null;
    } else if (nextLocation.pathname.startsWith(state.location.pathname)) {
      nextDirection = 'left';
    } else if (state.location.pathname.startsWith(nextLocation.pathname)) {
      nextDirection = 'right';
    } else {
      nextDirection = 'still';
    }

    setState({
      location: nextLocation,
      direction: nextDirection,
    });
  }

  return state.direction ?
    desktopTransitions.transitions[state.direction] :
    {};
}

const DesktopLayout: React.FunctionComponent<React.PropsWithChildren<LayoutProps>> =
  props => (
    <Flex flexDirection="column" height="100%">
      <Header />
      <DesktopMainArea {...props} />
    </Flex>
  );

const Wrapper: React.FunctionComponent<React.PropsWithChildren<LayoutProps>> =
  ({ children, ...props }) => (
    <Box height="100%">
      <Breakpoint.Renderer
        {...props}
        render={{
          default: DesktopLayout,
          'mobile-0': MobileLayout,
          'mobile-100': MobileLayout,
        }}
      >
        {children}
      </Breakpoint.Renderer>
    </Box>
  );

export default Wrapper;

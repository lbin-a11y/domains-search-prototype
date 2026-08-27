import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '@sqs/rosetta-primitives';
import { rosetta } from '@sqs/rosetta-themes';
import { SECONDARY_NAV_ITEM_CLASSNAME } from './SecondaryNavItem';

const EXPAND_DURATION_MS = 300;
const STAGGER_TOTAL_DURATION_MS = 300;
const MAX_STAGGER_DURATION_MS = 60;
const SECONDARY_NAV_ITEM_SELECTOR = `.${SECONDARY_NAV_ITEM_CLASSNAME}`;
const VISIBLE_CLASSNAME = 'visible';

const { space, time } = rosetta.default;
/**
 * Transitions for the individual nav items. We handle them
 * here with a fixed number of transitional elements, due
 * to not being able to use the individual items index,
 * as an item may or may not be rendered - and lead us
 * to having a larger offset given a missing item.
 */
const BASE_STYLES = {
  transform: 'translate3d(0,0,0)',
  [SECONDARY_NAV_ITEM_SELECTOR]: {
    transform: `translate3d(-${space[2]},0,0)`,
    opacity: 0.5,
    transition: `all ${time[300]} ease-in-out`
  },
  [`&.${VISIBLE_CLASSNAME} ${SECONDARY_NAV_ITEM_SELECTOR}`]: {
    transform: 'translate3d(0,0,0)',
    opacity: 1
  },
};

const getTransitionStyles = (childCount: number) => {
  const staggerOffsetPerChild = Math.min(MAX_STAGGER_DURATION_MS, STAGGER_TOTAL_DURATION_MS / childCount);
  return [...Array(childCount)].reduce((collector, _, index) => {
    collector[`&.${VISIBLE_CLASSNAME} ${SECONDARY_NAV_ITEM_SELECTOR}:nth-of-type(${index + 1})`] = {
      transitionDelay: `${staggerOffsetPerChild * index}ms`
    };
    return collector;
  }, {});
};

const SecondaryNavigationAnimation = ({ isOpen, children }: {
  isOpen: boolean,
  children: React.ReactNode,
}) => {
  // Make a copy of the current L2 navigation but only update it when this
  // L1 item is open. This ensures that the L2 items don't change while
  // animating away.
  const [savedChildren, setSavedChildren] = useState<React.ReactNode>(null);
  useEffect(() => {
    if (isOpen) {
      setSavedChildren(children);
    }
  }, [isOpen, children]);

  const [scrollHeight, setScrollHeight] = React.useState('0px');
  const [childCount, setChildCount] = React.useState(0);

  const transitionStyles = useMemo(() =>
    childCount ? getTransitionStyles(childCount) : {}, [childCount]
  );

  return (
    <Box
      sx={{
        height: 0,
        overflow: 'hidden',
        transition: `height ${EXPAND_DURATION_MS}ms ease-in-out`,
      }}
      style={{ height: isOpen ? scrollHeight : 0 }}
      // Hide L2 items from tests
      aria-hidden={isOpen ? undefined : 'true'}
      // aria-hidden elements are not focusable
      inert={isOpen ? undefined : ''}
      onTransitionEnd={(event: TransitionEvent) => {
        // Once we finish animating out, clear the L2 items away so they can't be found by keyboard navigation
        if (event.target === event.currentTarget && !isOpen) {
          setSavedChildren(null);
        }
      }}
    >
      <Box
        ref={(node) => {
          if (node) {
            setChildCount(Array.from(
              node.querySelectorAll(SECONDARY_NAV_ITEM_SELECTOR)
            ).length);
            setScrollHeight(`${node.scrollHeight}px`);
          }
        }}
        className={childCount ? VISIBLE_CLASSNAME : undefined}
        css={{
          ...BASE_STYLES,
          ...(transitionStyles || {})
        }}
      >
        {savedChildren}
      </Box>
    </Box>
  );
};

export default SecondaryNavigationAnimation;

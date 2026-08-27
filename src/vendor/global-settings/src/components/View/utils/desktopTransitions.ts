// @ts-expect-error: no types
import { utils } from '@sqs/transitions';
import { rosetta } from '@sqs/rosetta-themes';

const { loadStyles } = utils;
const { easing } = rosetta.default;

/**
 * For the slide animation, both the entering and exiting panel use the same easing curve, to
 * ensure that they move in sync.
 *
 * For the fade, we want the exiting panel to fade OUT faster than the entering panel
 * fades IN, to avoid the visual effect of two panels superimposed.
 *
 * We therefore - somewhat counter-intuitively - apply `easing.product.entrance` (a steeper
 * curve) to the exiting panel, and `easing.product.exit` (a gentler curve) to the entering panel.
 */
const stylesheet = loadStyles('CSSTG-FadeWithSlide', {
  '.enter': {
    transition: `transform .4s ${easing.product.default}, opacity .4s ${easing.product.exit}`,
  },

  '.leave': {
    transition: `transform .4s ${easing.product.default}, opacity .4s ${easing.product.entrance}`,
    // Prevent accidental clicks on the exiting element
    pointerEvents: 'none',
  },
});

const SLIDE_X = 30;

const getTransitions = (dirX: number) => {
  return {
    appear: {
      className: stylesheet.enter,
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },

    enter: {
      className: stylesheet.enter,
      from: {
        transform: `translateX(${SLIDE_X * (-dirX)}px)`,
        opacity: 0,
      },
      to: {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },

    leave: {
      className: stylesheet.leave,
      from: {
        transform: 'translateX(0)',
        opacity: 1,
      },
      to: {
        transform: `translateX(${SLIDE_X * dirX}px)`,
        opacity: 0,
      },
    },
  };

};

export default {
  transitions: {
    left: getTransitions(-1),
    right: getTransitions(1),
    still: getTransitions(0),
  },
};

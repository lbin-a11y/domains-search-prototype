import classNames from 'classnames';

//@ts-expect-error
import { utils } from '@sqs/transitions';
// @ts-expect-error
import baseDamask from '@sqs/styles/variables/baseDamask';

export const easing = baseDamask['global-transition-easing'];

const { loadStyles, convertTranslateToMatrix } = utils;

const stylesheet = loadStyles('CSSTG-SlideVariableWidth', {
  '.group': {
    overflow: 'hidden',
    transition: `width .4s ${easing}`,
  },

  '.slide': {
    overflow: 'hidden',
    transition:
      `transform .4s ${easing}, min-height .4s ${easing}, max-height .4s ${easing}, opacity .4s ${easing}`,
    display: 'inline-block',
  },

  '.leave': {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  '.right': {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});


/**
 * Slide presets work only if there will be just ONE child inside the group at a time.
 */
// eslint-disable-next-line
const getTransitions = (dirX: number, dirY: number) => {

  return {
    appear: {
      className: stylesheet.slide,
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },

    enter: {
      className: stylesheet.slide,
      from: {
        transform: (node: HTMLElement) => {
          const siblingNode = node.nextSibling || node.previousSibling;
          const relevantWidthNode = (dirX > 0 ? node : siblingNode) as HTMLElement;
          return convertTranslateToMatrix(
            -dirX * (relevantWidthNode.scrollWidth),
            0
          );
        },
        opacity: 0,
      },
      to: {
        // eslint-disable-next-line
        transform: (node: HTMLElement) => {
          return convertTranslateToMatrix(0, 0);
        },
        opacity: 1,
      },
    },

    leave: {
      className: classNames(stylesheet.slide, stylesheet.leave),
      from: {
        // eslint-disable-next-line
        transform: (node: HTMLElement) => {
          return convertTranslateToMatrix(0, 0);
        },
        opacity: 1,
      },
      to: {
        transform: (node: HTMLElement) => {
          const siblingNode = node.nextSibling || node.previousSibling;
          const relevantWidthNode = (dirX > 0 ? siblingNode : node) as HTMLElement;
          return convertTranslateToMatrix(
            dirX * (relevantWidthNode.scrollWidth),
            0
          );
        },
        opacity: 0,
      },
    },
  };

};

export default {
  className: stylesheet.group,
  rightClassName: stylesheet.right,
  transitions: {
    toLeft: getTransitions(-1, 0),
    toRight: getTransitions(1, 0),
    toTop: getTransitions(0, -1),
    toBottom: getTransitions(0, 1),
  },
};

import { PrimaryItemConfigType } from '../types/NavigationTypes';

/**
 * This utils takes the original nav items array and the reordered nav items array
 * and returns the moved nav item. It assumes only one nav item is moved at one time.
 * If no nav item is moved (currently impossible as the function won't be called), it
 * returns undefined.
 */

export const getReorderedNavItem = (
  original: PrimaryItemConfigType[],
  reordered: PrimaryItemConfigType[]
) => {
  let i = 0;
  while (
    (original[i]?.visibilityKey === reordered[i]?.visibilityKey ||
      original[i]?.visibilityKey === reordered[i + 1]?.visibilityKey) &&
    i < original.length
  ) {
    i++;
  }
  if (original[i]) {
    const movedItemVisiblityKey = original[i].visibilityKey;
    return {
      visibilityKey: movedItemVisiblityKey,
      startIndex: i,
      endIndex: reordered.findIndex(
        ({ visibilityKey }) => visibilityKey === movedItemVisiblityKey
      ),
    };
  }
};

import type { RouterApi } from '@sqs/universal-router';
import { match } from 'node-match-path';

import type {
  Accordion,
  ExternalLink,
  InternalLink,
  PrimaryGroupListType,
  PrimaryItemConfigType,
  SecondaryItemConfigType,
} from '../types/NavigationTypes';

import { NAV_ITEM_TYPE } from '../constants/navigation';

import { getPathParts, normalizePathname } from './urlUtils';

export const isInternalLink = (item: PrimaryItemConfigType): item is InternalLink =>
  item.type === undefined || item.type === NAV_ITEM_TYPE.INTERNAL;

export const isAccordion = (item: PrimaryItemConfigType | SecondaryItemConfigType): item is Accordion =>
  'type' in item && item.type === NAV_ITEM_TYPE.ACCORDION;

export const isExternalLink = (item: PrimaryItemConfigType | SecondaryItemConfigType): item is ExternalLink =>
  'type' in item && item.type === NAV_ITEM_TYPE.EXTERNAL;

export const getKey = (item: PrimaryItemConfigType | SecondaryItemConfigType): string => {
  if (isAccordion(item)) {
    return item.key;
  }
  if (isExternalLink(item)) {
    return item.href;
  }
  return item.to;
};

/**
 * Given a navigation item config and router returns whether the nav
 * item should be displayed to the user.
 */
export const shouldRenderItem = (item: PrimaryItemConfigType | SecondaryItemConfigType, router: RouterApi): boolean => {
  if ('shouldShow' in item && item.shouldShow === false) {
    return false;
  }

  if ('href' in item) {
    return true;
  }

  if ('to' in item) {
    return router.isValidPath(item.to);
  }

  return true;
};

const isMoreSpecificMatch = (current: string | null | undefined, proposed: string) => {
  return !current || proposed.length > current.length;
};

/**
 * Given a navigation config and the current pathname, return which primary nav item, if any,
 * should be 'expanded', i.e. its secondary nav items made visible.
 *
 * An item is 'expanded' if it's an internal link to a path that's either equal to the current path or a parent of it.
 * If multiple links qualify, the most 'specific' link (i.e. longest path) wins.
 */
export const getExpandedItemFromPath = (
  navGroups: PrimaryGroupListType,
  pathname: string,
): InternalLink | null => {
  const normalizedPathname = normalizePathname(pathname);

  let activeLink: InternalLink | null = null;

  navGroups.forEach(({ items }) => {
    items.forEach(item => {
      if (isInternalLink(item)) {
        [item.to, ...(item.childMountPoints || [])].forEach((path) => {
          if (normalizedPathname.startsWith(path) && isMoreSpecificMatch(activeLink?.to, path)) {
            activeLink = item;
          }
        });
      }
    });
  });

  return activeLink;
};

/**
 * Given a set of secondary nav items and the current pathname, return which
 * secondary nav item paths, if any, should be 'selected', i.e. underlined. An
 * item is 'selected' if it's a path that's either equal to the current path or
 * a parent of it. If multiple links qualify, the most 'specific' link (i.e.
 * longest path) wins.
 *
 * @param {SecondaryItemConfigType[]} secondaryItems - a set of secondary nav items configuration
 * @param {String} pathname - the current pathname of the application
 */
export const getSelectedPath = (
  secondaryItems: SecondaryItemConfigType[],
  pathname: string,
): string | null => {
  let selectedPath: string | null = null;

  secondaryItems.forEach(item => {
    if (pathname.startsWith(item.to) && isMoreSpecificMatch(selectedPath, item.to)) {
      selectedPath = item.to;
    }
  });

  return selectedPath;
};

/**
 * Given the current application pathname and the pathname of a nav item,
 * returns whether it should be displayed in an 'selected' state. For a primary
 * navigation item, this is only the case when there is an exact match.
 *
 * @param {String} linkPath - the pathname configured on the link to navigate to
 * @param currentPath - the current pathname of the application
 */
export const isPrimaryItemSelected = (linkPath: string, currentPath: string, selectedPathMatch?: string | string[]) => {
  const currentPathname = getPathParts(currentPath).pathname;
  const selectedPathMatches = selectedPathMatch ?
    (Array.isArray(selectedPathMatch) ? selectedPathMatch : [selectedPathMatch]) :
    [];
  const doesPathMatch = selectedPathMatches.some(pattern => match(pattern, currentPathname).matches);
  return doesPathMatch || getPathParts(linkPath).pathname === currentPathname;
};

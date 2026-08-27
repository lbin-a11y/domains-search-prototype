import { getLastPathnameSegment } from './urlUtils';

export const getTestId = (pathname: string, title?: string) => {
  const id = getLastPathnameSegment(pathname) || title?.replace(/ /g, '-').toLowerCase() || 'unknown';
  return `menuItem-${id}`;
};
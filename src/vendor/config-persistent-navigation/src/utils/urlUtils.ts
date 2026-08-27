const LAST_PATH_PART = /\/([^/]+)\/?$/;


/**
 * Removes any trailing slashes so string splitting is consistent.
 *
 * @param {String} pathname The path
 * @return {String} A better version of the pathname
 */
const stripTrailingSlash = (pathname: string) => {
  return pathname.replace(/\/$/, '') || '/';
};

/**
 * Given a pathname, normalizes it and returns the parts
 *
 * @param {String} pathname The path
 * @return {Object} Normalized pathname, hash and search
 */
export const getPathParts = (_pathname: string, baseUrl = 'https://www.placeholder.com'): {
  pathname: string;
  hash: string;
  search: string;
} => {
  const { hash, search, pathname } = new URL(_pathname, baseUrl);
  return {
    pathname: stripTrailingSlash(pathname),
    hash,
    search
  };
};

/**
 * Normalizes pathnames accounting for trailing slashes.
 *
 * @param {String} pathname The path
 * @return {String} A better version of the pathname
 */
export const normalizePathname = (_pathname: string) => {
  const { pathname, hash, search } = getPathParts(_pathname);
  return `${pathname}${search}${hash}`;
};

/**
 * Given a pathname, returns the last segment or empty string
 *
 * @param {String} pathname
 * @return {String}
 */
export const getLastPathnameSegment = (_pathname: string) => {
  const { pathname } = getPathParts(_pathname);
  const pathPart = LAST_PATH_PART.exec(pathname ?? '');
  return pathPart ? pathPart[1] : '';
};
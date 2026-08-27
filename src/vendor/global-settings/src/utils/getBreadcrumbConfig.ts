import { type MouseEventHandler } from 'react';

import { Route, RouterApi } from '@sqs/universal-router';
import { BreadcrumbsProps, BreadcrumbsCrumb } from '@sqs/rosetta-compositions';

import sentry from './globalSentry';

/**
 * Removes all trailing slashes from a string.
 * If a string consists of only slashes, the first slash is preserved and the
 * rest are stripped.
 *
 * Duplicated from site-server/src/main/webapp/universal/src/shared/utils/UrlUtils.js
 *
 * @param {string} [str=''] a/bc////
 * @return {string} a/bc
 */
const stripTrailingSlashes = (str = '') => str.replace(
  new RegExp(
    '^(\/?)' + // optional leading slash
    '(.*[^\/])?' + // everything else
    '(\/+)?$' // trailing slashes
  ),
  '$1$2' // removed trailing slashes
);

export type getBreadcrumbFromRouteType = (router: RouterApi, route: Route, locationPath: string) => {
  children: string | null | undefined;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  href?: string;
} | null;
export const getBreadcrumbFromRoute: getBreadcrumbFromRouteType = (router, route, locationPath) => {
  return {
    children: route.label || '',
    onClick: e => {
      e.preventDefault();
      router.push(locationPath);
    },
    // router navigation automatically prepends the basename /config
    // but we need to add it explicitly to construct a correct anchor tag
    href: `/config${locationPath}`,
  };
};
const getCrumbRoutes = (baseRoute: Route, router: RouterApi) => {
  const routeHierarchy = router.getRouteHierarchy();
  const basePosition = routeHierarchy.findIndex((route: Route) =>
    stripTrailingSlashes(route.path) === stripTrailingSlashes(baseRoute.path));
  return routeHierarchy.slice(basePosition);
};

const handleError = (error: Error) => {
  sentry.withSquarespaceScope(() => {
    sentry.captureException(error);
  });
  return {
    currentPage: {
      children: null,
    },
    crumbs: [],
  };
};

const getBreadcrumbConfig = function (router: RouterApi, overrides: {
  breadcrumbRootPath?: string,
  getBreadcrumbFromRoute?: getBreadcrumbFromRouteType
}): BreadcrumbsProps {
  let allCrumbRoutes: { route: Route, path: string }[];
  let allBreadcrumbs: BreadcrumbsCrumb[];
  let resolvedBaseCrumbRoute: Route;
  const breadcrumbBasePath = overrides?.breadcrumbRootPath || '/';
  try {
    resolvedBaseCrumbRoute = router.match(breadcrumbBasePath);
    if (resolvedBaseCrumbRoute.path !== breadcrumbBasePath) {
      // do not return here, as this error is recoverable, it just means the passed path matches no route.
      sentry.withSquarespaceScope(() => {
        sentry.captureException(
          new Error(`Could not find base crumb route (${breadcrumbBasePath}), falling back to common ancestor`)
        );
      });
    }
  } catch (err) {
    return handleError(new Error(`Could not find base crumb route: ${breadcrumbBasePath}`, {
      cause: err,
    }));
  }
  try {
    allCrumbRoutes = getCrumbRoutes(resolvedBaseCrumbRoute, router);
  } catch (err) {
    return handleError(new Error(`Could not getCrumbRoutes for base crumb route: ${resolvedBaseCrumbRoute.path}`, {
      cause: err,
    }));
  }

  try {
    allBreadcrumbs = allCrumbRoutes.flatMap(({ route, path }: { route: Route, path: string }) => {
      const foundCrumb =
          overrides?.getBreadcrumbFromRoute ?
            overrides?.getBreadcrumbFromRoute(router, route, path) :
            getBreadcrumbFromRoute(router, route, path);
      if (foundCrumb) {
        return [ foundCrumb ];
      }
      return [];
    });
  } catch (err) {
    return handleError(new Error(`Could not generate breadcrumbs for base route: ${resolvedBaseCrumbRoute.path}`, {
      cause: err,
    }));
  }
  try {
    // remove the last route from the array
    const currentRoute = allBreadcrumbs.pop();
    return {
      currentPage: {
        // current page only needs children
        children: currentRoute?.children,
      },
      crumbs: allBreadcrumbs,
    };
  } catch (e) {
    return handleError(new Error(`Could not generate response for base route: ${resolvedBaseCrumbRoute.path}`, {
      cause: e,
    }));
  }
};
export default getBreadcrumbConfig;

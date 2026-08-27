import { background, RouterApi } from '@sqs/universal-router';

/**
 * There are 2 cases in which getBackgroundLocation(Router) becomes out of sync with window.location:
 * 1. The Settings Overlay (or any other overlay) is open. In this case, we expect the window.location to differ,
 *    but the backgroundLocation is still valid, because it is simply behind the overlay
 * 2. A Sub Application's router (like Rolodex's ReactRouter instance) has been used to navigate. Universal Router is
 *    unaware of these navigation events. However, we still need the primary navigation to reflect the current active
 *    location in the UI. So, in this case, return the _window.location.pathname_
 * @param router
 * @param windowLocation
 */
export default (router: RouterApi, windowLocation: Location) => {
  const { pathname: backgroundPathname } = background.getBackgroundLocation(router);
  const { basename, pathname: currentPathname } = router.getCurrentLocation();

  // The router paths are all subpaths of a basename. Remove the basename from window's pathname to allow comparisons
  const windowPathname = windowLocation.pathname.startsWith(basename) ?
    windowLocation.pathname.replace(basename, '') :
    windowLocation.pathname;

  // If we have a match for either, always return the backgroundPathname.
  // This is because the primaryNavigation is _always_ meant to reflect the Background state, not an overlay
  if ([backgroundPathname, currentPathname].includes(windowPathname)) {
    return backgroundPathname;
  }
  // The application has routed to a path that the router doesn't know about.
  // This is likely because a Sub Application's router has performed a push/replace (i.e. Rolodex uses ReactRouter)
  // The Navigation needs to reflect the _actual_ location, not the Router's knowledge
  return windowPathname;
};

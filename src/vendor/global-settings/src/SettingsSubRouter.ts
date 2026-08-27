import React, { createElement, ComponentType } from 'react';

import { StaticRoutesSubRouter, Route } from '@sqs/universal-router';

import View from './components/View';
import { globalSettingsAppKey } from './constants';

interface SettingsSubRouterOptions {
  filterRoutes: (routes: Route[]) => Route[];
  routes: Route[];
  StaticNavigation: ComponentType<React.PropsWithChildren<unknown>>;
}

/**
 * Subrouter for Global Settings with Static Navigation
 */
export class SettingsSubRouter extends StaticRoutesSubRouter {
  constructor({ filterRoutes, routes, StaticNavigation }: SettingsSubRouterOptions) {
    const SettingsRootWithInjectedNavigation = () =>
      createElement(View, {
        appKey: globalSettingsAppKey,
        navigation: StaticNavigation,
      });

    super(routes, SettingsRootWithInjectedNavigation, globalSettingsAppKey, { filterRoutes });
  }
}

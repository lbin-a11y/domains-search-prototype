import { BreadcrumbsProps } from '@sqs/rosetta-compositions';
import Router, { withRouter } from '@sqs/universal-router';

import getBreadcrumbConfig, { type getBreadcrumbFromRouteType } from '../utils/getBreadcrumbConfig';

// Constrain the children for this Provider to exactly what it expects
type ChildrenType = (props: BreadcrumbsProps) => JSX.Element;

interface SettingsBreadcrumbsProviderType {
  router: Router,
  children: ChildrenType,
  getBreadcrumbFromRoute?: getBreadcrumbFromRouteType
}

const SettingsBreadcrumbsProvider = ({ children, router, getBreadcrumbFromRoute }: SettingsBreadcrumbsProviderType) => {
  const overrides = {
    breadcrumbRootPath: '/settings/',
  };
  if (getBreadcrumbFromRoute) {
    Object.assign(overrides, {
      getBreadcrumbFromRoute,
    });
  }
  const { currentPage, crumbs } = getBreadcrumbConfig(router, overrides);
  return children({ currentPage, crumbs });

};

export default withRouter(SettingsBreadcrumbsProvider);

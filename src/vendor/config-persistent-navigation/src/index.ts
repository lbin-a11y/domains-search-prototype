import Navigation from './components/Navigation';
import Container from './components/Container';

export { default as HoverTooltip } from './components/HoverTooltip';
export { default as EditMenuIconWrapper } from './components/EditMenuIconWrapper';
export { default as FeatureGatedEditMenuIconWrapper } from './components/FeatureGatedEditMenuIconWrapper';
export { default as SecondaryNavigation } from './components/SecondaryNavigation';
export { default as PersistentNavigationProvider } from './context/Provider';
export { GLOBAL_NAVIGATION_TYPE, NAV_ITEM_TYPE } from './constants/navigation';
export { useNavigationType } from './utils/useNavigationType';
export { useNavigationWidth } from './utils/useNavigationWidth';
export { isAppVisible } from './utils/isAppVisible';
export { isAppFocused } from './utils/isAppFocused';

export type {
  PrimaryGroupListType,
  PrimaryItemListType,
  PrimaryItemConfigType,
  CustomTitleProps,
} from './types/NavigationTypes';
export {
  CustomNavState,
  LastUserAction,
  type CustomNavItem,
  type CustomNavPropsLoading,
  type CustomNavPropsReady,
  type CustomNavPropsEditing,
  type CustomNavProps,
} from './customNavigation/types';
export * as customNavPreferencesBackend from './customNavigation/customNavPreferencesBackend';
export { CustomNavProvider, useCustomNavContext } from './context/CustomNavigationProvider';
export { EDIT_MENU_PATHNAME, EDIT_MENU_HOME_PATHNAME } from './customNavigation/constants';

export {
  trackUserViewsDetailsCard,
  trackUserViewsDetailsPage,
  trackUserViewsFeature,
  trackUserViewsAppStore,
  trackUserClosesDetailsPage,
  trackUserTogglesNavigationItem,
  trackUserHoversOverNavItem,
  trackUserNavigatesBackwardInFeature,
  trackUserNavigatesForwardInFeatures,
  trackUserRepositionsNavItem,
  EntryPoint
} from './utils/events';

export default Object.assign(Navigation, {
  Container
});

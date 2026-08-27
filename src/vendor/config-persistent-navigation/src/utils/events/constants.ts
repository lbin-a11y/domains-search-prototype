export enum EventName {
  USER_CLICKS_EDIT_NAV_CTA = 'UserClicksEditNavCTA',
  USER_VIEWS_APP_STORE = 'UserViewsAppStore',
  USER_EXITS_APP_STORE = 'UserExitsAppStore',
  USER_TOGGLES_NAVIGATION_ITEM = 'UserTogglesNavigationItem',
  USER_VIEWS_DETAILS_CARD = 'UserViewsDetailsCard',
  USER_CLICKS_DETAILS_CARD = 'UserClicksDetailsCard',
  USER_VIEWS_DETAILS_PAGE = 'UserViewsDetailsPage',
  USER_CLOSES_DETAILS_PAGE = 'UserClosesDetailsPage',
  USER_NAVIGATES_FORWARD_IN_FEATURES = 'UserNavigatesForwardInFeatures',
  USER_NAVIGATES_BACKWARD_IN_FEATURES = 'UserNavigatesBackwardInFeatures',
  USER_VIEWS_FEATURE = 'UserViewsFeature',
  USER_HOVERS_OVER_NAV_ITEM = 'UserHoversOverNavItem',
  USER_REPOSITIONS_NAV_ITEM = 'UserRepositionsNavItem',
  USER_CLICKS_NAVIGATION_ITEM = 'UserClicksNavigationItem',
  // Feature gate events
  USER_VIEWS_FEATURE_GATE_MODAL = 'UserViewsFeatureGateModal',
  USER_CLICKS_FEATURE_GATE_LABEL = 'UserClicksFeatureGateLabel',
  USER_CLICKS_FEATURE_GATE_MODAL_CTA = 'UserClicksFeatureGateModalCTA',
}

export enum UserAction {
  CLICK = 'click',
  VIEW = 'view',
  CLOSE = 'close',
  SELECT = 'select',
  REORDER = 'reorder'
}

export enum ObjectType {
  BUTTON = 'button',
  PAGE = 'page',
  CARD = 'card',
  MODAL = 'modal',
  SECTION = 'section',
  LINK = 'link'
}

export enum Actor {
  USER = 'user'
}

export enum EntryPoint {
  NAVIGATION = 'navigation',
  DETAILS_PAGE = 'details_page'
}

export enum NavigationLevel {
  L1 = 'L1',
  L2 = 'L2'
}

export enum EventName {
  USER_CLICKS_CONTEXTUAL_SETTINGS_LINK = 'UserClicksContextualSettingsLink',
  USER_CLICKS_LAUNCHPAD_SETTINGS_CARD = 'UserClicksLaunchpadSettingsCard',
  USER_CLICKS_DASHBOARD_SETTINGS_ICON = 'UserClicksDashboardSettingsIcon',
  USER_VIEWS_SETTINGS_LANDING = 'UserViewsSettingsLanding',
}

export enum UserAction {
  VIEW = 'view',
  CLOSE = 'close',
  CLICK = 'click',
  SCROLL = 'scroll',
}

export enum ObjectType {
  MENU = 'menu',
  BUTTON = 'button',
  LINK = 'link',
  MODAL = 'modal',
}

export enum ObjectIdentifier {
  COMMERCE_SETTINGS = 'commerce-settings',
  MARKETING_SETTINGS = 'marketing-settings',
  WEBSITE_SETTINGS = 'website-settings',
  // Launchpad card buttons for Settings V3
  GO_TO_SETTINGS = 'go-to-settings',
  DISMISS = 'dismiss',
  // Landing pages for Settings V3
  WEBSITE_LANDING = 'website',
  DOMAINS_AND_EMAIL_LANDING = 'domains-and-email',
  SELLING_LANDING = 'selling',
  MARKETING_LANDING = 'marketing',
  THIRD_PARTY_TOOLS_LANDING = 'third-party-tools',
  PERMISSIONS_AND_OWNERSHIP_LANDING = 'permissions-and-ownership',
  BILLING_LANDING = 'billing',
  DEVELOPER_TOOLS_LANDING = 'developer-tools',
  SHORTCUTS_LANDING = 'shortcuts',
  SQUARESPACE_LABS_LANDING = 'squarespace-labs',
  GENERAL_LANDING = 'general',
  BRAND_IDENTITY_LANDING = 'brand-identity',
  NOTIFICATIONS_LANDING = 'notifications',
}

export enum Actor {
  USER = 'user',
}

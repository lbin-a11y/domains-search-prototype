
// Event schema: https://docs.google.com/spreadsheets/d/1-Pd5NGWVc3SJrHws9JsVVJA8oY7w55u2WAH8qHMrZM0/edit?usp=sharing

export enum Actor {
  USER = 'user'
}

export enum Action {
  VIEW = 'view',
  CLICK = 'click',
  SELECT = 'select',
}

export enum ObjectType {
  PAGE = 'page',
  MENU = 'menu',
  MENU_ITEM = 'menuitem',
  MODAL = 'modal',
  BUTTON = 'button',
  LINK = 'link',
  CARD = 'card',
  SECTION = 'section',
  TOOLTIP = 'tooltip',
}

export enum EventingDashboardState {
  MERCHANDISING = 'merchandising',
  SETUP = 'setup',
  MATURE = 'mature'
}

export enum EventingPlanStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  TRIAL = 'trial',
  NOT_SPECIFIED = 'not_specified',
}

/**
 * If your dashboard uses a generic widget that isn't listed here, please add it to the enum
 */
export enum EventingWidgetName {
  KEY_FIGURES = 'key_figures', // aka Analytics
  CHECKLIST = 'checklist', // aka Guidance
  QUICK_LINKS = 'quick_links',
  HELP_CENTER = 'help_center',
  PLAN = 'plan', // aka Subscription
  TIP = 'tip',
  CREATE_CARDS = 'create_cards',
  PROMO_HERO = 'promo_hero',
  FEATURE_PROMO = 'feature_promo',
  ACTION_BANNER = 'action_banner',
  MARKETING_BANNER = 'marketing_banner',
}

export const DashboardEntryPoint = 'dashboard';

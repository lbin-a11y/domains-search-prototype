import { NavItemKey } from '@sqs/config-ui-preferences-ts-client';
import { NAV_ITEM_TYPE } from '../constants/navigation';
import type { ComponentType, MouseEvent } from 'react';

export type CustomTitleProps = {
  isSelected: boolean;
  isVisible?: boolean;
  isEditing?: boolean;
  isEditable?: boolean;
};

export type BaseLinkProps = {
  title?: string;
  childMountPoints?: string[];
  disabled?: boolean;
  disabledTooltipText?: string;
  // Only customizable apps (can be hidden or reordered via custom navigation)
  // should have a visibility key.
  // NavItemKey is defined by the backend:
  // https://github.com/sqsp/config-ui-preferences-service/blob/master/server/src/main/java/com/squarespace/config_ui_preferences_service/custom_nav/api/dto/NavItemKey.java
  visibilityKey?: NavItemKey;
  // Customizable apps are by default reorderable, unless nonReorderable is explicitly set to true
  isNotReorderable?: boolean;
  ariaAttributes?: Record<string, string>;
  dataAttributes?: Record<string, string>;
  metaData?: Record<string, string>;
};

export type InternalLink = BaseLinkProps & {
  // for internal links only, 'type' is optional
  type?: NAV_ITEM_TYPE.INTERNAL;
  to: string;
  selectedPathMatch?: string | string[];
  hasLandingPage?: boolean;
  customTitle?: ComponentType<CustomTitleProps>;
};

export type ExternalLink = BaseLinkProps & {
  type: NAV_ITEM_TYPE.EXTERNAL;
  href: string;
  target?: string;
  customTitle?: ComponentType<CustomTitleProps>;
};

export type Accordion = BaseLinkProps & {
  type: NAV_ITEM_TYPE.ACCORDION;
  key: string;
  childComponent?: ComponentType<object>;
};

export type PrimaryItemConfigType = InternalLink | ExternalLink | Accordion;

export type PrimaryItemListType = {
  key: string;
  items: PrimaryItemConfigType[],
};

export type PrimaryGroupListType = PrimaryItemListType[];

export type SecondaryItemConfigType = {
  className?: string;
  onClick?: (event: MouseEvent) => void;
  title: string;
  to: string;
  shouldShow?: boolean;
  isSelected?: boolean;
  ariaAttributes?: Record<string, string>;
  disabled?: boolean;
  disabledTooltipText?: string;
  parentVisibilityKey?: NavItemKey;
  metaData?: Record<string, string>;
};

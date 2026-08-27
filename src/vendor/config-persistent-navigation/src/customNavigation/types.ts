import { NavItemKey } from '@sqs/config-ui-preferences-ts-client';

export type Backend = {
  loadNavigation(): Promise<Array<CustomNavBackendItem>>;
  saveNavigation(items: Array<CustomNavBackendItem>): Promise<void>;
};

export enum LastUserAction {
  NONE,
  STARTED_EDITING,
  STOPPED_EDITING,
  TOGGLED,
}

export enum CustomNavState {
  LOADING,
  READY,
  EDITING,
}

export type CustomNavPropsLoading = {
  state: CustomNavState.LOADING;
};

export type CustomNavItem = {
  key: NavItemKey;
  isVisible?: boolean;
  isFocused?: boolean;
  isNotReorderable?: boolean;
};

export type CustomNavBackendItem = {
  key: NavItemKey;
  isVisible: boolean;
};

export type CustomNavPropsReady = {
  state: CustomNavState.READY;
  items: Array<CustomNavItem>;
  startEditing: () => void;
  getReorderableItemPositionIndex: (key: NavItemKey) => number;
  getReorderableItemTotal: () => number;
  getCustomNavItemVisible: (key: NavItemKey) => boolean;
  getLastUserAction: () => LastUserAction;
  setUserStartEditing: () => void;
  setUserStopEditing: () => void;
  unsetUserAction: () => void;
};

export type CustomNavPropsEditing = {
  state: CustomNavState.EDITING;
  items: Array<CustomNavItem>;
  stopEditing: () => void;
  enableItem: (visibilityKey: NavItemKey) => void;
  disableItem: (visibilityKey: NavItemKey) => void;
  focusItem: (visibilityKey: NavItemKey) => void;
  unfocusItem: (visibilityKey: NavItemKey) => void;
  reorderItems: (reorderedItems: Array<CustomNavItem>) => void;
  setDragStart: () => void;
  setDragEnd: () => void;
  getReorderableItemPositionIndex: (key: NavItemKey) => number;
  getReorderableItemTotal: () => number;
  getCustomNavItemVisible: (key: NavItemKey) => boolean;
  getIsDetailPageOpen: () => boolean;
  setIsDetailPageOpen: (isOpen: boolean) => void;
  getLastUserAction: () => LastUserAction;
  setUserStartEditing: () => void;
  setUserStopEditing: () => void;
  setUserToggleItem: (item: NavItemKey) => void;
  unsetUserAction: () => void;
  getLastToggledItem: () => NavItemKey | null;
};


export type CustomNavProps =
  | CustomNavPropsLoading
  | CustomNavPropsReady
  | CustomNavPropsEditing;

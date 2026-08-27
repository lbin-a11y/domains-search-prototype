import { useEffect, useState } from 'react';

import { NavItemKey } from '@sqs/config-ui-preferences-ts-client';

import { getDefaultNavigationPreferences } from './getDefaultNavigationPreferences';
import { withTimeout } from './withTimeout';
import { CustomNavState, LastUserAction } from './types';

import type { Backend, CustomNavProps, CustomNavItem } from './types';

const LOAD_TIMEOUT_MS = 1000;

export function useCustomNavigation(
  backend: Backend,
  isEnabled: boolean,
  isEligibleForDonationsDashboard: boolean,
  isMeetingsEnabled: boolean,
): CustomNavProps | undefined {
  const [state, setState] = useState(CustomNavState.LOADING);
  const [isDetailPageOpen, setIsDetailPageOpen] = useState(false);
  const [lastUserAction, setLastUserAction] = useState(LastUserAction.NONE);
  const [lastToggledItem, setLastToggleditem] = useState<NavItemKey | null>(null);
  const [items, setItems] = useState<Array<CustomNavItem>>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    withTimeout(LOAD_TIMEOUT_MS, backend.loadNavigation)
      .then(res => {
        setState(CustomNavState.READY);
        const defaultItems = getDefaultNavigationPreferences(
          isEligibleForDonationsDashboard,
          isMeetingsEnabled,
        );
        const missingItems = defaultItems.filter(defaultItem => !res.some(resItem => resItem.key === defaultItem.key));
        setItems([...res, ...missingItems]);
      })
      .catch(err => {
        if (__DEV__) {
          console.error(err);
        }
        // If the GET request fails, we still want to show the Custom Nav icon and the default state of the navigation
        setState(CustomNavState.READY);
        setItems(getDefaultNavigationPreferences(
          isEligibleForDonationsDashboard,
          isMeetingsEnabled,
        ));
      });
  }, [
    backend,
    isEnabled,
    isEligibleForDonationsDashboard,
    isMeetingsEnabled,
  ]);

  if (!isEnabled) {
    return;
  }

  const startEditing = () => setState(CustomNavState.EDITING);

  const stopEditing = () => {
    setState(CustomNavState.READY);

    backend.saveNavigation(
      // Only `key` and `isVisible` are expected on the backend.
      // If isVisible is undefined or null we know a preference hasn't been set
      // and by default, all items are initially visible.
      items.map(({ key, isVisible }) => ({ key, isVisible: isVisible ?? true }))
    )
      .catch(err => {
        if (__DEV__) {
          console.error(err);
        }
      });
  };

  const getLastUserAction = () => lastUserAction;
  const setUserStartEditing = () => { setLastUserAction(LastUserAction.STARTED_EDITING); };
  const setUserStopEditing = () => { setLastUserAction(LastUserAction.STOPPED_EDITING); };
  const setUserToggleItem = (visibilityKey: NavItemKey) => {
    setLastUserAction(LastUserAction.TOGGLED);
    setLastToggleditem(visibilityKey);
  };
  const unsetUserAction = () => { setLastUserAction(LastUserAction.NONE); };

  const getLastToggledItem = () => lastToggledItem;

  const enableItem = (key: NavItemKey) =>
    setItems(oldMap => {
      if (oldMap.find(item => item.key === key)) {
        return oldMap.map(item => item.key === key ? { ...item, isVisible: true } : item);
      }
      return [...oldMap, { key, isVisible: true }];
    });

  const disableItem = (key: NavItemKey) =>
    setItems(oldMap => {
      if (oldMap.find(item => item.key === key)) {
        return oldMap.map(item => item.key === key ? { ...item, isVisible: false } : item);
      }
      return [...oldMap, { key, isVisible: false }];
    });

  const focusItem = (key: NavItemKey) =>{
    if (!isDragging) {
      setItems(oldMap => {
        if (oldMap.find(item => item.key === key)) {
          return oldMap.map(item => item.key === key ? { ...item, isFocused: true } : item);
        }
        return [...oldMap, { key, isFocused: true }];
      });
    }
  };

  const unfocusItem = (key: NavItemKey) =>{
    if (!isDragging) {
      setItems(oldMap => {
        if (oldMap.find(item => item.key === key)) {
          return oldMap.map(item => item.key === key ? { ...item, isFocused: false } : item);
        }
        return [...oldMap, { key, isFocused: false }];
      });
    }
  };

  const setDragStart = () => setIsDragging(true);

  const setDragEnd = () => setIsDragging(false);

  const reorderItems = (reorderedItems: Array<CustomNavItem>) => {
    setItems(reorderedItems.map(item => {
      // If isVisible is undefined or null we know a preference hasn't been set
      // and by default, all items are initially visible
      const isVisible = items.find(({ key }) => key === item.key)?.isVisible ?? true;
      return {
        ...item,
        isVisible
      };
    }));
  };

  const getReorderableItemPositionIndex = (visibilityKey: NavItemKey) =>
    items
      .filter(({ isNotReorderable }) => !isNotReorderable)
      .findIndex(({ key }) => key === visibilityKey);

  const getReorderableItemTotal = () => items.filter(({ isNotReorderable }) => !isNotReorderable).length;

  const getCustomNavItemVisible = (visibilityKey: NavItemKey) =>
    items.find(({ key }) => key === visibilityKey)?.isVisible ?? true;

  const getIsDetailPageOpen = () => isDetailPageOpen;

  switch (state) {
  case CustomNavState.LOADING:
    return {
      state,
    };
  case CustomNavState.READY:
    return {
      state,
      items,
      startEditing,
      getReorderableItemPositionIndex,
      getReorderableItemTotal,
      getCustomNavItemVisible,
      getLastUserAction,
      setUserStartEditing,
      setUserStopEditing,
      unsetUserAction,
    };
  case CustomNavState.EDITING:
    return {
      state,
      items,
      stopEditing,
      enableItem,
      disableItem,
      focusItem,
      unfocusItem,
      reorderItems,
      setDragStart,
      setDragEnd,
      getReorderableItemPositionIndex,
      getReorderableItemTotal,
      getCustomNavItemVisible,
      getIsDetailPageOpen,
      setIsDetailPageOpen,
      getLastUserAction,
      setUserStartEditing,
      setUserStopEditing,
      unsetUserAction,
      setUserToggleItem,
      getLastToggledItem
    };
  }
}

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import SecondaryNavItem from './SecondaryNavItem';
import type { SecondaryItemConfigType } from '../types/NavigationTypes';
import useL2NavItemListener from '../utils/useL2NavItemListener';
import { getSelectedPath } from '../utils/navItemUtils';
import { NavItemKey } from '@sqs/config-ui-preferences-ts-client';
import { useDebouncedCallback } from 'use-debounce';

const SecondaryNavItems = React.memo(({
  items,
  currentPath,
  parentVisibilityKey,
  metaData,
}: {
  items: SecondaryItemConfigType[],
  currentPath: string,
  parentVisibilityKey?: NavItemKey,
  metaData?: Record<string, string>
}) => {
  const selectedPath = getSelectedPath(items, currentPath);
  return (
    <>
      {
        items.map(item => (
          <SecondaryNavItem
            {...item}
            key={item.to}
            isSelected={item.isSelected ?? (item.to === selectedPath)}
            parentVisibilityKey={parentVisibilityKey}
            metaData={metaData}
          />
        ))
      }
    </>
  );
});

export function useSecondaryNavigation(
  currentPath: string,
  parentVisibilityKey?: NavItemKey,
  metaData?: Record<string, string>
): React.ReactNode {
  const [configuredNavItems, setConfiguredNavItems] = useState<React.ReactNode | SecondaryItemConfigType[] | null>(null);
  const { listen } = useL2NavItemListener();
  const prevPath = useRef(currentPath);
  const { callback: debouncedSetNavItems } = useDebouncedCallback(setConfiguredNavItems, 10);
  useEffect(() => {
    if (currentPath !== prevPath.current) {
      prevPath.current = currentPath;
      debouncedSetNavItems(null);
    }
    return listen((val) => {
      debouncedSetNavItems(val);
    });
  }, [ listen, currentPath, debouncedSetNavItems ]);

  if (React.isValidElement(configuredNavItems)) {
    return configuredNavItems;
  } else if (configuredNavItems) {
    const navItems = configuredNavItems as SecondaryItemConfigType[];
    return (
      <SecondaryNavItems
        items={navItems}
        currentPath={currentPath}
        parentVisibilityKey={parentVisibilityKey}
        metaData={metaData}
      />
    );
  }
  return null;
}

type SecondaryNavigationProps = {
  children?: ReactNode;
  items?: SecondaryItemConfigType[];
};

const SecondaryNavigation = (props: SecondaryNavigationProps) => {
  const { updateChildren } = useL2NavItemListener();

  updateChildren(props.children || props.items || null);
  return null;
};

export default SecondaryNavigation;


import React from 'react';
import { WithRouterComponentProps, withRouter } from '@sqs/universal-router';
import { Box, Text } from '@sqs/rosetta-primitives';
import { shouldRenderItem } from '../utils/navItemUtils';
import type { SecondaryItemConfigType } from '../types/NavigationTypes';
import NavItemTouchable from './NavItemTouchable';
import { DisabledNavItem } from './DisabledNavItem';
import { useCustomNavContext } from '../context/CustomNavigationProvider';
import { CustomNavState } from '../customNavigation/types';
import { trackUserClicksNavigationItem } from '../utils/events/EventTracker';
import { NavigationLevel } from '../utils/events/constants';

export const SECONDARY_NAV_ITEM_CLASSNAME = 'secondary-nav-item';

export type SecondaryNavItemProps = SecondaryItemConfigType & WithRouterComponentProps;

const SecondaryNavItem = withRouter(
  (props: SecondaryNavItemProps) => {
    const { router, location, disabled, disabledTooltipText, isSelected, parentVisibilityKey, metaData, ...allConfig } = props;
    const shouldRenderDisabled = disabled;
    const customNavContext = useCustomNavContext();

    const {
      onClick,
      ...item
    } = allConfig;

    if (shouldRenderDisabled) {
      return (
        <DisabledNavItem
          disabledTooltipText={disabledTooltipText}
          isSecondary
        >
          {item.title}
        </DisabledNavItem>
      );
    }

    let additionalEventFields = {};
    if (metaData?.l1EventId) {
      additionalEventFields = {
        l1_parent: metaData.l1EventId,
      };
    }

    if (customNavContext?.state === CustomNavState.READY && parentVisibilityKey) {
      const parentIndex = customNavContext.getReorderableItemPositionIndex(parentVisibilityKey);
      const total = customNavContext.getReorderableItemTotal();
      additionalEventFields = {
        item_position_index: parentIndex,
        item_position_total: total,
        ...additionalEventFields,
      };
    }

    return (
      shouldRenderItem(item, router) ?
        (
          <Box p={1} pl={3} className={SECONDARY_NAV_ITEM_CLASSNAME}>
            <NavItemTouchable
              className={item.className}
              isSelected={!!isSelected}
              onClick={(e: React.MouseEvent) => {
                trackUserClicksNavigationItem({
                  object_identifier: item.title,
                  navigation_level: NavigationLevel.L2,
                  ...additionalEventFields,
                });
                onClick?.(e);
              }}
              item={item}
            >
              <Text.Body
                color={isSelected ? 'fg.default' : 'fg.muted'}
                m={0}
                fontWeight="medium"
                sx={{
                  '&:hover': {
                    color: 'gray.200'
                  }
                }}
              >
                {item.title}
              </Text.Body>
            </NavItemTouchable>
          </Box>
        ) : null
    );
  });

export default SecondaryNavItem;

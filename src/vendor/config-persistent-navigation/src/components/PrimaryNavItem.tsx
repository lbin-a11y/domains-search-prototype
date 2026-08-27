import React, { ReactNode } from 'react';

import { Box, Text } from '@sqs/rosetta-primitives';
import type Router from '@sqs/universal-router';

import { isExternalLink, isInternalLink } from '../utils/navItemUtils';
import type { PrimaryItemConfigType } from '../types/NavigationTypes';

import NavItemTouchable from './NavItemTouchable';
import { CustomNavItemProps, getVisibility } from './PrimaryNavItemWrapper';
import { DisabledNavItem } from './DisabledNavItem';

type PrimaryNavItemProps = {
  item: PrimaryItemConfigType;
  children: ReactNode;
  isExpanded: boolean;
  isSelected: boolean;
  onClick?: (e: React.MouseEvent) => void;
  router: Router;
  customNavItem?: CustomNavItemProps;
};


const PrimaryNavItem = ({
  item,
  children,
  isExpanded,
  isSelected,
  onClick,
  router,
  customNavItem,
// eslint-disable-next-line complexity
}: PrimaryNavItemProps) => {
  let customTitle;
  if ((isInternalLink(item) || isExternalLink(item)) && item.customTitle) {
    const CustomTitle = item.customTitle;
    customTitle = (
      <CustomTitle
        isSelected={isExpanded && isSelected}
        isVisible={customNavItem?.isVisible}
        isEditing={customNavItem?.isEditing}
        isEditable={customNavItem?.isEditable}
      />
    );
  }

  const shouldRenderDisabled = !!(item.disabled || ('to' in item && router.isDisabledPath(item.to)));
  if (shouldRenderDisabled) {
    return (
      <DisabledNavItem
        dataAttributes={item.dataAttributes}
        disabledTooltipText={item.disabledTooltipText}
      >
        {children}
      </DisabledNavItem>
    );
  }

  const { isVisible, color, sx } = getVisibility(customNavItem, isExpanded, isSelected);

  const title = (
    <Text.Subtitle
      color={color}
      m={0}
      sx={sx}
    >
      {children}
    </Text.Subtitle>
  );

  const isEditingAndEditable = customNavItem && customNavItem.isEditing && customNavItem.isEditable;
  const isTouchable = (!customNavItem?.isEditing && isVisible) || isEditingAndEditable;

  return (
    <Box overflow="hidden">
      <Box p={0}>
        <Box position="relative" overflow="hidden">
          <Box p={1}>
            {isTouchable ? (
              <NavItemTouchable
                item={item}
                isSelected={isSelected}
                onClick={onClick}
                hasInteraction={!isEditingAndEditable}
                sx={isEditingAndEditable ? {
                  '> span': { display: 'block', whiteSpace: 'nowrap' },
                  '&:focus-visible::after': { width: 'calc(100% - 18px)' }
                } : {}}
              >
                {customTitle ? customTitle : title}
              </NavItemTouchable>
            ) : (
              customTitle ? customTitle : title
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PrimaryNavItem;

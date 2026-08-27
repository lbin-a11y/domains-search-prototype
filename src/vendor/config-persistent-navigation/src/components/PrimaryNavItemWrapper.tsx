
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { Toggle } from '@sqs/rosetta-elements';
import { Box, Flex, Touchable } from '@sqs/rosetta-primitives';
import type Router from '@sqs/universal-router';

import { t } from '../i18n/helpers';
import { PrimaryItemConfigType } from '../types/NavigationTypes';
import { getKey, isAccordion, shouldRenderItem } from '../utils/navItemUtils';

import PrimaryNavItem from './PrimaryNavItem';
import SecondaryNavigationAnimation from './SecondaryNavigationAnimation';
import { useNavigation } from '@sqs/universal-router';
import { DragHandle } from './SortableList/SortableItem';
import { trackUserHoversOverNavItem, trackUserTogglesNavigationItem } from '../utils/events';
import { EntryPoint, NavigationLevel } from '../utils/events/constants';
import { NavItemKey } from '@sqs/config-ui-preferences-ts-client';
import { trackUserClicksNavigationItem } from '../utils/events/EventTracker';
import { useCustomNavContext } from '../context/CustomNavigationProvider';
import { CustomNavProps, CustomNavState, LastUserAction } from '../customNavigation/types';
import { EDIT_MENU_PATHNAME } from '../customNavigation/constants';
import stylesheet from './PrimaryNavItemWrapper.less';

type EditorProps = {
  isVisible: boolean;
  isEditing: boolean;
  enable: () => void;
  disable: () => void;
  visibilityKey: NavItemKey;
  customNavContext: CustomNavProps | undefined;
};

type CustomNavItemEditableProps = {
  isVisible: boolean;
  isEditing: boolean;
  isEditable: true;
  isFocused: boolean;
  enable: () => void;
  disable: () => void;
  focus: () => void;
  unfocus: () => void;
  visibilityKey: NavItemKey;
};

type CustomNavItemNotEditableProps = {
  isVisible: boolean;
  isEditing: boolean;
  isEditable: false;
};

export type CustomNavItemProps =
  | CustomNavItemEditableProps
  | CustomNavItemNotEditableProps;

type PrimaryNavItemWrapperProps = {
  customNavItem: CustomNavItemProps | undefined;
  isExpanded: boolean;
  isSelected: boolean;
  item: PrimaryItemConfigType;
  gutterLeft?: number;
  onClick?: (e: React.MouseEvent) => void;
  router: Router;
  secondaryNav: ReactNode;
};

export function getVisibility(
  customNavItem: CustomNavItemProps | undefined,
  isExpanded: boolean,
  isSelected: boolean
): { isVisible: boolean; color: string; sx: object } {
  if (customNavItem?.isEditing) {
    return {
      isVisible: true,
      color: customNavItem.isEditable && customNavItem.isVisible ? 'fg.muted' : 'gray.500',
      sx: {
        cursor: customNavItem.isEditable ? 'pointer' : 'default',
        transition: 'ease-out 300ms'
      },
    };
  }

  return {
    isVisible: isExpanded || !customNavItem || customNavItem.isVisible,
    color: isSelected ? 'fg.default' : 'fg.muted',
    sx: { '&:hover': { color: 'gray.200' } },
  };
}

const getToggleClass = (lastUserAction: LastUserAction | undefined) => {
  switch (lastUserAction) {
  case LastUserAction.NONE: {
    return stylesheet.customNavNotTriggered;
  }
  case LastUserAction.STARTED_EDITING: {
    return stylesheet.toggleVisible;
  }
  case LastUserAction.STOPPED_EDITING: {
    return stylesheet.toggleNotVisible;
  }
  default: {
    return stylesheet.customNavNotTriggered;
  }
  }
};

const Editor = ({
  isVisible,
  isEditing,
  enable,
  disable,
  visibilityKey,
  customNavContext,
}: EditorProps) => {
  const lastUserAction = customNavContext?.state !== CustomNavState.LOADING ? customNavContext?.getLastUserAction() : undefined;
  const [toggleClass, setToggleClass] = useState<string>(getToggleClass(lastUserAction));

  useEffect(() => {
    setToggleClass(getToggleClass(lastUserAction));
  }, [lastUserAction]);

  return (
    <Flex
      aria-hidden={isEditing ? undefined : 'true'}
      // aria-hidden elements are not focusable
      inert={isEditing ? undefined : ''}
      onClick={(e: MouseEvent) => e.stopPropagation()}
      data-testid={`${visibilityKey}-toggleWrapper`}
      className={`${stylesheet.toggleWrapper} ${isEditing ? stylesheet.editing : stylesheet.notEditing}`}
      sx={{
        pointerEvents: customNavContext?.state === CustomNavState.EDITING ? 'auto' : 'none'
      }}
    >
      <Toggle
        data-testid={`${visibilityKey}-toggle`}
        aria-label={t('Toggle visibility', null, {
          project: 'config-persistent-navigation',
        })}
        className={toggleClass}
        checked={isVisible}
        onAnimationEnd={() => {
          if (customNavContext?.state !== CustomNavState.LOADING) {
            customNavContext?.unsetUserAction();
          }
        }}
        onChange={(checked: boolean) => {
          trackUserTogglesNavigationItem({
            object_identifier: visibilityKey,
            is_visible: checked,
            entrypoint: EntryPoint.NAVIGATION
          });
          if (checked) {
            enable();
          } else {
            disable();
          }
          if (customNavContext?.state === CustomNavState.EDITING) {
            customNavContext?.setUserToggleItem(visibilityKey);
          }
        }}
        tabIndex={isEditing ? 0 : -1}
      />
    </Flex>
  );
};


const PrimaryNavItemWrapper = ({
  customNavItem,
  isExpanded,
  isSelected,
  item,
  gutterLeft,
  onClick,
  router,
  secondaryNav,
// eslint-disable-next-line complexity
}: PrimaryNavItemWrapperProps) => {
  const isEditingAndEditable =
    customNavItem?.isEditing && customNavItem?.isEditable;
  const { isVisible } = getVisibility(customNavItem, isExpanded, isSelected);
  const { replace } = useNavigation();
  const ref = useRef<HTMLElement>();
  const customNavContext = useCustomNavContext();

  if (!shouldRenderItem(item, router)) {
    return null;
  }

  const getEditor = () => {
    if (isVisible && customNavItem?.isEditable) {
      return (
        <Editor
          isVisible={customNavItem.isVisible}
          isEditing={customNavItem.isEditing}
          enable={customNavItem.enable}
          disable={customNavItem.disable}
          visibilityKey={customNavItem.visibilityKey}
          customNavContext={customNavContext}
        />
      );
    }
  };

  const buildOnClick = () => {
    if (customNavItem?.isEditing) {
      if (customNavItem.isEditable) {
        return (e: React.MouseEvent<Element, MouseEvent>) => {
          e.preventDefault();
          customNavItem?.unfocus();
          replace(`${EDIT_MENU_PATHNAME}/${item.visibilityKey}`);
          ref.current?.blur();
        };
      }

      return (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();
      };
    }

    return (e: React.MouseEvent) => {
      const { visibilityKey } = item;
      let additionalEventFields = {};

      if (visibilityKey && customNavContext?.state === CustomNavState.READY) {
        additionalEventFields = {
          item_position_index: customNavContext.getReorderableItemPositionIndex(visibilityKey),
          item_position_total: customNavContext.getReorderableItemTotal(),
        };
      }
      onClick?.(e);
      trackUserClicksNavigationItem({
        object_identifier: item.title ?? visibilityKey ?? getKey(item), // L1 item _should_ have a title but its optional
        navigation_level: NavigationLevel.L1,
        ...additionalEventFields,
      });
    };
  };

  // Hide the secondary nav when editing custom nav
  const isSecondaryNavVisible = isExpanded && !customNavItem?.isEditing;

  const ChildComponent = isAccordion(item) && item.childComponent;

  const content = (
    <Box
      py={0}
      pl={isEditingAndEditable ? 0 : (gutterLeft ?? 5)}
      pr={5}
      ml={gutterLeft !== undefined ? -1 : undefined}
      sx={{ position: 'relative', width: '100%' }}
      data-id={getKey(item)}
    >
      <Box>
        <Box
          aria-hidden={isVisible ? undefined : 'true'}
          // aria-hidden elements are not focusable
          inert={isVisible ? undefined : ''}
          sx={{
            // https://keithjgrant.com/posts/2023/04/transitioning-to-height-auto/
            display: 'grid',
            gridTemplateRows: isVisible ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.2s',
          }}
        >
          <PrimaryNavItem
            item={item}
            isExpanded={isExpanded}
            isSelected={isSelected}
            onClick={buildOnClick()}
            router={router}
            customNavItem={customNavItem}
          >
            {item.title}
          </PrimaryNavItem>

          <SecondaryNavigationAnimation isOpen={isSecondaryNavVisible}>
            {isExpanded && <Box>{secondaryNav}</Box>}
          </SecondaryNavigationAnimation>

          {isExpanded && ChildComponent && <ChildComponent />}
        </Box>
      </Box>

      {getEditor()}
    </Box>
  );

  return (
    <div data-testid="primary-nav-item-wrapper">
      {isEditingAndEditable ? (
        <Touchable
          className={customNavItem?.isFocused ? 'focused' : ''}
          as="span"
          sx={{
            display: 'block',
            width: '100%',
            'span': {
              display: 'flex',
              justifyContent: 'start',
              width: '100%',
              transition: 'ease-out 300ms',
              '&:hover': { backgroundColor: 'gray.900' },
            },
            '&.focused span': { backgroundColor: 'gray.900' },
          }}
          onClick={buildOnClick()}
          onMouseEnter={() => {
            customNavItem.focus();
            const { visibilityKey } = customNavItem;
            if (customNavContext?.state === CustomNavState.EDITING && visibilityKey) {
              trackUserHoversOverNavItem({
                is_visible: isVisible,
                item_position_index: customNavContext.getReorderableItemPositionIndex(visibilityKey),
                item_position_total: customNavContext.getReorderableItemTotal(),
                object_identifier: visibilityKey
              });
            }
          }}
          onMouseLeave={() => customNavItem.unfocus()}
          data-cy={!item.isNotReorderable ? 'customnav-item-touchable' : null}
        >
          {customNavItem?.isFocused && !item.isNotReorderable ? (
            <DragHandle
              aria-label={t('Reorder item', null, {
                project: 'config-persistent-navigation',
              })}
            />
          ) : (
            <Box pl={5} />
          )}
          {content}
        </Touchable>
      ) : (
        content
      )}
    </div>
  );
};

export default PrimaryNavItemWrapper;


import React, { useCallback } from 'react';
import classnames from 'classnames';

import { NavItemKey } from '@sqs/config-ui-preferences-ts-client';
import { CrossLarge, LogoSquarespace } from '@sqs/rosetta-icons';
import { Box, Flex, Text, Touchable } from '@sqs/rosetta-primitives';
import type Router from '@sqs/universal-router';
import { background, Link } from '@sqs/universal-router';
import { getIsExpiredSite } from '@sqs/universal-utils';
import { T, t } from '../i18n/helpers';
import { getKey, getExpandedItemFromPath, isAccordion, isInternalLink, isPrimaryItemSelected } from '../utils/navItemUtils';
import {
  CustomNavItem,
  CustomNavProps,
  CustomNavPropsEditing,
  CustomNavPropsReady,
  CustomNavState,
} from '../customNavigation/types';
import { Accordion, PrimaryGroupListType, PrimaryItemConfigType } from '../types/NavigationTypes';

import PrimaryNavItemWrapper, { CustomNavItemProps } from './PrimaryNavItemWrapper';
import Footer from './Footer';
import Header from './Header';
import { useSecondaryNavigation } from './SecondaryNavigation';
import styles from './Navigation.less';
import { useCustomNavContext } from '../context/CustomNavigationProvider';
import getValidatedBackgroundPathname from '../utils/getValidatedBackgroundPathname';
import { isAppVisible } from '../utils/isAppVisible';
import { isAppFocused } from '../utils/isAppFocused';

import { SortableList } from './SortableList/SortableList';
import { trackUserExitsAppStore, trackUserRepositionsNavItem } from '../utils/events/EventTracker';
import { getReorderedNavItem } from '../utils/getReorderedNavItem';

const ROOT_PATH = '/';

export type NavigationProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  navGroups: PrimaryGroupListType;
  customNav?: CustomNavProps;
  router: Router;
  chat?: React.ReactNode;
  search?: React.ReactNode;
  notificationsPopover?: React.ReactNode;
  [key: string]: unknown;
  openUniversalCheckout?: () => void;
  isInMigrationPreview: boolean;
  /**
   * A temporary prop to pass the retiring font warning message component.
   * This will be removed once font migration is complete.
   */
  retiringFontWarning?: React.ReactNode;
  bugLogoLink?: string;
  bugLogoLabel?: string;
  /**
   * When true, hides the default header (logo + icons). The editing-mode header
   * ("Customize Sidebar" + close button) is always shown regardless of this flag.
   * Use when the host shell provides its own header (e.g. GlobalTopBar).
   */
  hideHeader?: boolean;
  /** Content rendered at the top of the nav, between the header and navGroups. Hidden in editing mode. */
  topContent?: React.ReactNode;
  /** Left padding (Rosetta space token) applied to nav items and the footer. Defaults to 5 for items, 6 for footer. */
  gutterLeft?: number;
};

const hasCustomNavItems = (props: CustomNavProps): props is (CustomNavPropsReady | CustomNavPropsEditing) => 'items' in props;

function buildCustomNavItemProps(
  customNav: CustomNavProps | undefined,
  visibilityKey: NavItemKey | undefined,
): CustomNavItemProps | undefined {
  if (!customNav) {
    return undefined;
  }

  const isEditing = customNav.state === CustomNavState.EDITING;
  if (visibilityKey && hasCustomNavItems(customNav)) {
    return {
      visibilityKey,
      isVisible: isAppVisible(customNav, visibilityKey) ?? true,
      isEditable: true,
      isEditing,
      isFocused: isAppFocused(customNav, visibilityKey),
      enable: () => isEditing && customNav.enableItem(visibilityKey),
      disable: () => isEditing && customNav.disableItem(visibilityKey),
      focus: () => isEditing && customNav.focusItem(visibilityKey),
      unfocus: () => isEditing && customNav.unfocusItem(visibilityKey)
    };
  }

  return {
    isVisible: true,
    isEditable: false,
    isEditing,
  };
}


const Navigation = ({
  footer = null,
  navGroups,
  router,
  chat = null,
  search = null,
  notificationsPopover = null,
  openUniversalCheckout,
  isInMigrationPreview,
  retiringFontWarning,
  bugLogoLabel,
  bugLogoLink,
  hideHeader = false,
  topContent,
  gutterLeft,
  ...rest
// eslint-disable-next-line complexity
}: NavigationProps) => {
  const { pathname } = background.getBackgroundLocation(router);
  const validatedBackgroundPath = getValidatedBackgroundPathname(router, window.location);

  const [expandedAccordion, setExpandedAccordion] = React.useState<Accordion | null>(null);
  const expandedItemFromPath = getExpandedItemFromPath(navGroups, pathname);
  const expandedItem = expandedAccordion || expandedItemFromPath;

  const secondaryNav = useSecondaryNavigation(pathname, expandedItem?.visibilityKey, expandedItem?.metaData);
  const isExpiredSite = getIsExpiredSite();
  const customNav = useCustomNavContext();

  const [shouldNotAutoSelect, setShouldNotAutoSelect] =
    React.useState(expandedItem?.title === 'Website' && isExpiredSite);

  const onClickAccordion = useCallback(
    (event: React.MouseEvent, accordion: Accordion) => {
      event.preventDefault();
      setExpandedAccordion(previous =>
        (previous && previous === accordion) ?
          null :
          accordion);
    },
    []
  );

  if (customNav?.state === CustomNavState.LOADING) {
    return null;
  }

  const isAtRoot = pathname === ROOT_PATH;

  const navItemWrapperRenderer = (item: PrimaryItemConfigType) => {
    let isSelected = false;
    let isExpanded = false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let handleOnClick = (event: React.MouseEvent<Element, MouseEvent>) => {
      setShouldNotAutoSelect(false);
      setExpandedAccordion(null);
    };

    if (isInternalLink(item)) {
      const hasLandingPage = typeof item.hasLandingPage === 'boolean' ? item.hasLandingPage : true;
      isSelected = hasLandingPage &&
        isPrimaryItemSelected(item.to, validatedBackgroundPath, item.selectedPathMatch) &&
        !shouldNotAutoSelect;

      isExpanded = !expandedAccordion && item.to === expandedItemFromPath?.to;
    }

    if (isAccordion(item)) {
      if (!item.disabled) {
        handleOnClick = (event: React.MouseEvent<Element, MouseEvent>) => onClickAccordion(event, item);
      }

      isExpanded = item.key === expandedAccordion?.key;
    }

    return (
      <PrimaryNavItemWrapper
        key={getKey(item)}
        customNavItem={buildCustomNavItemProps(customNav, item.visibilityKey)}
        isExpanded={isExpanded}
        isSelected={isSelected}
        item={item}
        gutterLeft={gutterLeft}
        onClick={event => handleOnClick(event)}
        router={router}
        secondaryNav={secondaryNav}
      />
    );
  };

  return (
    <Flex
      as="nav"
      aria-label={t('Website pages and features', null, {
        project: 'config-persistent-navigation',
        notes: 'Label for the main left navigation in Config which includes links to the customer\'s website pages and Squarespace features'
      })}
      backgroundColor={{ 'mobile-*': 'white' }}
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      overflowX="hidden"
      overflowY="auto"
      py={6}
      {...rest}
    >
      <Flex flexDirection="column" flexGrow={1}>
        {(!hideHeader || customNav?.state === CustomNavState.EDITING) && (
          <Header>
            {customNav?.state === CustomNavState.EDITING ? (
              <>
                <Text.Subtitle my={0} flexGrow={1}>
                  <T
                    project="config-persistent-navigation"
                    notes="The label to allow users to customize their navigation menu"
                  >
                    Customize Sidebar
                  </T>
                </Text.Subtitle>
                <Touchable.Element.Icon
                  onClick={() => {
                    trackUserExitsAppStore();
                    router.push('/');
                    customNav.setUserStopEditing();
                  }}
                  aria-label={t('Stop editing', null, {
                    project: 'config-persistent-navigation',
                  })}
                  data-testid="stop-editing-button"
                >
                  <CrossLarge />
                </Touchable.Element.Icon>
              </>
            ) : (
              <>
                <Link to={bugLogoLink ?? '/'}>
                  <LogoSquarespace
                    aria-label={bugLogoLabel ?? t('Home', null, { project: 'config-persistent-navigation' })}
                    color="fg.default"
                    className={classnames({ [styles.logo_bounce]: isAtRoot })}
                  />
                </Link>
                <Flex>
                  {search}
                  {notificationsPopover}
                  {chat}
                </Flex>
              </>
            )}
          </Header>
        )}
        {customNav?.state !== CustomNavState.EDITING && topContent}
        {(customNav?.state !== CustomNavState.EDITING) &&
          retiringFontWarning ? retiringFontWarning : null
        }
        <Flex
          flexDirection="column"
          flexGrow={1}
          gap={4}
          height="100%"
          width="100%"
        >
          {navGroups.map(({ key, items }) => {
            if (
              customNav?.state === CustomNavState.READY ||
              customNav?.state === CustomNavState.EDITING
            ) {
              const reorderableItems = items.filter(
                ({ visibilityKey, isNotReorderable }) => visibilityKey && !isNotReorderable
              );
              const nonReorderableItems = items.filter(
                ({ visibilityKey, isNotReorderable }) => !visibilityKey || isNotReorderable
              );
              // Match nav items with customNav items order
              // if nav item does not exist in customNav, it is shown on bottom
              const orderedItems = reorderableItems.sort((a, b) => {
                const indexA = customNav.items.findIndex(orderItem => orderItem.key === a.visibilityKey);
                const indexB = customNav.items.findIndex(orderItem => orderItem.key === b.visibilityKey);
                if (indexA === -1) {return 1;}
                if (indexB === -1) {return -1;}
                return indexA - indexB;
              });
              return (
                <Box
                  key={key}
                  data-cy="sortable-navigation"
                >
                  {nonReorderableItems.map((item) =>
                    navItemWrapperRenderer(item)
                  )}
                  {orderedItems?.length > 0 && (
                    <SortableList
                      items={orderedItems}
                      onChange={(reorderedItems) => {
                        if (customNav?.state === CustomNavState.EDITING) {
                          const payload: CustomNavItem[] = [];
                          payload.push(...reorderedItems.map(
                            // See comment above about visibilityKey
                            ({ visibilityKey, isNotReorderable }) => ({
                              key: visibilityKey!,
                              isNotReorderable
                            })
                          ));
                          customNav.reorderItems(payload);
                          // Get the moved item's start and end index for tracking
                          const reorderedItem = getReorderedNavItem(reorderableItems, reorderedItems);
                          if (reorderedItem) {
                            const { visibilityKey, startIndex, endIndex } = reorderedItem;
                            trackUserRepositionsNavItem({
                              object_identifier: visibilityKey as NavItemKey,
                              is_visible: customNav.getCustomNavItemVisible(visibilityKey as NavItemKey),
                              item_position_index_prev: startIndex,
                              item_position_index: endIndex,
                              item_position_total: customNav.getReorderableItemTotal()
                            });
                          }
                        }
                      }}
                      renderItem={(item) => navItemWrapperRenderer(item)}
                      onDragStart={() => {
                        if (customNav?.state === CustomNavState.EDITING) {
                          customNav.setDragStart();
                        }
                      }}
                      onDragEnd={() => {
                        if (customNav?.state === CustomNavState.EDITING) {
                          customNav.setDragEnd();
                        }
                      }}
                    />
                  )}
                </Box>
              );
            }
            return (
              <Box key={key}>
                {items.map((item) => navItemWrapperRenderer(item))}
              </Box>
            );
          })}
        </Flex>
        {customNav?.state !== CustomNavState.EDITING && <Footer {...(gutterLeft !== undefined ? { pl: gutterLeft } : {})}>{footer}</Footer>}
      </Flex>
    </Flex>
  );
};

export default Navigation;

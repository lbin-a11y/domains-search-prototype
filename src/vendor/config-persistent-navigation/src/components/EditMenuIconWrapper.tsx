import React, { useRef, useState } from 'react';

import { Tooltip } from '@sqs/rosetta-elements';
import { AppStore } from '@sqs/rosetta-icons';
import { Text, Touchable } from '@sqs/rosetta-primitives';
import { useTheme } from '@sqs/rosetta-styled';
import { getBreakpoint } from '@sqs/rosetta-utilities';
import { useNavigation } from '@sqs/universal-router';
import { getIsUserAdmin } from '@sqs/universal-utils';

import { useCustomNavContext } from '../context/CustomNavigationProvider';
import { EDIT_MENU_HOME_PATHNAME } from '../customNavigation/constants';
import { CustomNavState } from '../customNavigation/types';
import { T, t } from '../i18n/helpers';
import { trackUserClicksEditNavMenu } from '../utils/events/EventTracker';

import HoverTooltip from './HoverTooltip';

const EditMenuIconWrapper = ({ disabled }: { disabled: boolean }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { breakpoints } = useTheme();
  const anchor = useRef<HTMLElement>(null);
  const customNavContext = useCustomNavContext();
  const { push } = useNavigation();

  const isMobile = getBreakpoint(breakpoints).platform === 'mobile';
  const isUserAdmin = getIsUserAdmin();

  const shouldShowAppStore = customNavContext?.state === CustomNavState.READY && !isMobile && isUserAdmin;
  if (!shouldShowAppStore) {
    return null;
  }

  return (
    <>
      <Touchable.Element.Icon
        ref={anchor}
        onClick={() => {
          trackUserClicksEditNavMenu();
          push(EDIT_MENU_HOME_PATHNAME);
          customNavContext.setUserStartEditing();
          anchor.current?.blur();
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onFocus={() => setIsHovering(true)}
        onBlur={() => setIsHovering(false)}
        aria-label={t('Customize Sidebar', null, {
          project: 'config-persistent-navigation',
          notes: 'The label to allow users to customize their navigation menu'
        })}
        data-testid="edit-menu-button"
        aria-disabled={disabled}
        sx={{ mt: 0 }}
      >
        <AppStore
          color={disabled ? 'fg.disabled' : 'fg.muted'}
          sx={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        />
      </Touchable.Element.Icon>
      <HoverTooltip
        anchor={anchor.current}
        isOpen={!disabled && isHovering}
        position='top'
      >
        <Text.Caption color="fg.default">
          <T
            project="config-persistent-navigation"
            notes="The label to allow users to customize their navigation menu"
          >
            Customize Sidebar
          </T>
        </Text.Caption>
      </HoverTooltip>
      <Tooltip
        isOpen={disabled && isHovering}
        anchor={anchor.current}
        position="bottom"
        delay={{ enter: 120, exit: 0 }}
      >
        <T project="config-persistent-navigation">
          Publish update to access
        </T>
      </Tooltip>
    </>
  );
};

export default EditMenuIconWrapper;

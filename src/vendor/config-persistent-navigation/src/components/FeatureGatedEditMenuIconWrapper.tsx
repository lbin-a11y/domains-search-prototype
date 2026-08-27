import React, { useRef, useState } from 'react';

import { PopOver } from '@sqs/rosetta-elements';
import { AppStore, CrossSmall } from '@sqs/rosetta-icons';
import { Box, Flex, Text, Touchable } from '@sqs/rosetta-primitives';
import { useTheme } from '@sqs/rosetta-styled';
import { getBreakpoint } from '@sqs/rosetta-utilities';
import { getIsUserAdmin } from '@sqs/universal-utils';

import { T, t } from '../i18n/helpers';
import { useCustomNavContext } from '../context/CustomNavigationProvider';
import { CustomNavState } from '../customNavigation/types';
import {
  ObjectIdentifier,
  trackUserClicksFeatureGateLabel,
  trackUserClicksFeatureGateModalCTA,
  trackUserViewsFeatureGateModal
} from '../utils/events/FeatureGateEventTracker';

import HoverTooltip from './HoverTooltip';

const FeatureGatedEditMenuIconWrapper = ({ openUniversalCheckout }: { openUniversalCheckout?: () => void }) => {
  const [isHoveringOverIcon, setIsHoveringOverIcon] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const { breakpoints } = useTheme();
  const anchor = useRef<HTMLElement>(null);
  const customNavContext = useCustomNavContext();

  const isMobile = getBreakpoint(breakpoints).platform === 'mobile';
  const isUserAdmin = getIsUserAdmin();

  const shouldShowAppStore = customNavContext?.state === CustomNavState.READY && !isMobile && isUserAdmin;
  if (!shouldShowAppStore) {
    return null;
  }

  return (
    <>
      <PopOver
        isOpen={isPopoverOpen}
        anchor={anchor.current}
        hideArrow
        closeOnClickOutside
        closeOnEsc
        anchorPoint={{ x: 'right', y: 'top' }}
        onRequestOpen={() =>
          trackUserViewsFeatureGateModal({ objectIdentifier: ObjectIdentifier.FEATURE_GATE_EDIT_MENU_BUTTON })
        }
        onRequestClose={() => setIsPopoverOpen(false)}
        position='top-left'
        offset={{ x: -28, y: 5 }}
      >
        <Box
          p={3}
          background="gray.100"
        >
          <Flex justifyContent="space-between">
            <Text.Body fontWeight="semibold" color="white" mt={0} mb={1}>
              <T project="config-persistent-navigation">
                Your website has expired
              </T>
            </Text.Body>
            <CrossSmall
              color="white"
              sx={{ cursor: 'pointer' }}
              onClick={() => setIsPopoverOpen(false)}
            />
          </Flex>
          <Text.Body color="white" my={0}>
            <T
              upgradeLink={(
                <Box
                  as="a"
                  href="#"
                  onClick={(e: MouseEvent) => {
                    e.preventDefault();
                    openUniversalCheckout?.();
                    setIsPopoverOpen(false);
                    trackUserClicksFeatureGateModalCTA({
                      objectIdentifier: ObjectIdentifier.FEATURE_GATE_SUBSCRIBE,
                      objectDisplayName: 'subscribe to a website plan'
                    });
                  }}
                >
                  <T
                    project="config-persistent-navigation"
                    notes={
                      "Full string: 'To customize your sidebar, subscribe to a website plan.' This part is a link to Universal Checkout."
                    }
                  >
                    subscribe to a website plan
                  </T>
                </Box>
              )}
              project="config-persistent-navigation"
            >
              {'To customize your sidebar, {upgradeLink}.'}
            </T>
          </Text.Body>
        </Box>
      </PopOver>
      <Touchable.Element.Icon
        ref={anchor}
        onClick={() => {
          setIsHoveringOverIcon(false);
          setIsPopoverOpen(true);
          trackUserClicksFeatureGateLabel({ objectIdentifier: ObjectIdentifier.FEATURE_GATE_EDIT_MENU_BUTTON });
        }}
        onMouseEnter={() => setIsHoveringOverIcon(true)}
        onMouseLeave={() => setIsHoveringOverIcon(false)}
        onFocus={() => setIsHoveringOverIcon(true)}
        onBlur={() => setIsHoveringOverIcon(false)}
        aria-label={t('Customize Sidebar', null, {
          project: 'config-persistent-navigation',
          notes: 'The label to allow users to customize their navigation menu'
        })}
        data-testid="edit-menu-button"
        sx={{ mt: 0 }}
      >
        <AppStore color="fg.muted" />
      </Touchable.Element.Icon>
      <HoverTooltip
        anchor={anchor.current}
        isOpen={isHoveringOverIcon}
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
    </>
  );
};

export default FeatureGatedEditMenuIconWrapper;

import React from 'react';

import { ActionList } from '@sqs/rosetta-compositions';
import { Button, Flex, Touchable } from '@sqs/rosetta-primitives';
import { ChevronLargeDown, Settings } from '@sqs/rosetta-icons';
import { isNewClarksonChatUX } from '@sqs/clarkson-chat/experiments';
import { useUnsafeAnalyticEvents } from '../../../utils/eventing/provider';
import { AnalyticsEventIdentifier } from '../../../types';
import { withValidEventIdentifier } from '../../../utils/eventing/helpers';
import useI18n from '../../../i18n';

export type SettingsItem = {
  label: string;
  onClick: () => void;
} & AnalyticsEventIdentifier;

type SettingsMenuProps = {
  items: SettingsItem[];
  onOpenSettingsMenu?: () => void;
};

export default ({ items, onOpenSettingsMenu }: SettingsMenuProps) => {
  const { events } = useUnsafeAnalyticEvents();
  const { T, t } = useI18n();
  const isNewClarksonChatUXEnabled = isNewClarksonChatUX();

  const lastItemIndex = items.length - 1;

  return (
    <ActionList.PopOver
      anchorPoint={{ x: 'right', y: 'bottom' }}
      position="bottom-left"
      offset={{ x: 0, y: 6 }}
      renderTrigger={({ toggleActionListOpen, isOpen }) => {
        const handleClick = () => {
          toggleActionListOpen();
          if (!isOpen) {
            onOpenSettingsMenu?.();
          }
        };

        // TODO(COM-49396): Replace with new rosetta button when available.
        if (isNewClarksonChatUXEnabled) {
          return (
            <Button.Secondary
              data-testid="DashboardPageHeader-settingsButton"
              onClick={handleClick}
            >
              <T project="dashboard-components">Settings</T>
              <ChevronLargeDown sx={{ ml: 1 }} />
            </Button.Secondary>
          );
        }

        return (
          <Touchable.Element.Icon
            sx={{
              display: 'block',
            }}
            aria-label={t('Settings Icon', null, { project: 'dashboard-components', })}
            data-testid="DashboardPageHeader-settingsButton"
            onClick={handleClick}
          >
            <Settings />
          </Touchable.Element.Icon>
        );
      }}
    >
      {({ onRequestClose }) => (
        <Flex as="ul" bg="bg.base" flexDirection="column" py={1}>
          {items.map(({ onClick, label, ...item }, index) => (
            <ActionList.Item
              onClick={() => {
                onClick?.();
                onRequestClose();
                withValidEventIdentifier(item.eventIdentifier, (validEventId) => {
                  events?.userSelectsSettingsOption({ optionName: validEventId });
                });
              }}
              textStyle="body"
              fontWeight={index === lastItemIndex ? 'medium' : 'book'}
              key={label}
            >
              {label}
            </ActionList.Item>
          ))}
        </Flex>
      )}
    </ActionList.PopOver>
  );
};

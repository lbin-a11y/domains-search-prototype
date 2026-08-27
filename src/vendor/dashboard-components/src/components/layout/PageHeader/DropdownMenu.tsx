import React from 'react';
import { ActionList } from '@sqs/rosetta-compositions';
import { Button, Flex } from '@sqs/rosetta-primitives';
import { ChevronLargeDown } from '@sqs/rosetta-icons';
import ActionItemWithHover from './ActionItemWithHover';
import { CardProps } from '../../SellingCard/types';
import { useUnsafeAnalyticEvents } from '../../../utils/eventing/provider';
import { AnalyticsEventIdentifier } from '../../../types';
import { withValidEventIdentifier } from '../../../utils/eventing/helpers';

export type DropdownItem = {
  label: string;
  onClick: () => void;
  cardProps?: CardProps;
} & AnalyticsEventIdentifier;

type DropdownMenuProps = {
  label: string;
  items: DropdownItem[];
  onOpenDropdownMenu?: () => void;
};

export default ({ label, items, onOpenDropdownMenu }: DropdownMenuProps) => {
  const { events } = useUnsafeAnalyticEvents();

  return (
    <ActionList.PopOver
      anchorPoint={{ x: 'right', y: 'bottom' }}
      offset={{ x: 0, y: 6 }}
      position="bottom-left"
      renderTrigger={({ toggleActionListOpen, isOpen }) => (
        <Button.Primary
          data-testid="create-digital-product-dropdown-button"
          onClick={() => {
            toggleActionListOpen();
            if (!isOpen) {
              onOpenDropdownMenu?.();
            }
          }}
        >
          {label}
          <ChevronLargeDown sx={{ ml: 1 }} color='fg.onStrong' />
        </Button.Primary>
      )}
    >
      {({ onRequestClose }) => (
        <Flex as="ul" bg="bg.base" flexDirection="column" py={1}>
          {items.map(({ cardProps, label: itemLabel, onClick, ...item }) => (
            <ActionItemWithHover
              onRequestClose={onRequestClose}
              onClick={() => {
                onClick?.();
                withValidEventIdentifier(item.eventIdentifier, (validEventId) => {
                  events?.userSelectsCreateOption({ optionName: validEventId });
                });
              }}
              label={itemLabel}
              key={itemLabel}
              cardProps={cardProps}
            />
          ))}
        </Flex>
      )}
    </ActionList.PopOver>
  );
};

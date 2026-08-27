import React, { useCallback, useState } from 'react';
import ReactFocusLock from 'react-focus-lock';

import { PopOver, Stack, Toggle } from '@sqs/rosetta-elements';
import { CrossLarge } from '@sqs/rosetta-icons';
import { Box, Button, Flex, Text, Touchable } from '@sqs/rosetta-primitives';

import useI18n from '../i18n';
import { useDashboardFrameworkContext } from './DashboardProvider';
import { isWidgetVisible } from './isWidgetVisible';

import type { WidgetVisibilityProps } from '../types';

type OnPopoverOpenProps = {
  visibleWidgets: Array<string>;
};

type OnWidgetToggleProps = {
  key: string;
  index: number;
  isChecked: boolean;
  totalNumOfWidgets: number;
  availableWidgets: Array<string>;
};

type CustomizationPopoverProps = {
  handleSaveWidgetPreferences?: (widgetPreferences: WidgetVisibilityProps[]) => void;
  title?: string;
  onPopoverOpen?: ({ visibleWidgets }: OnPopoverOpenProps) => void;
  onPopoverClose?: () => void;
  onWidgetToggle?: ({ key, index, isChecked, totalNumOfWidgets, availableWidgets }: OnWidgetToggleProps) => void;
  popoverStyles?: Record<string, any>;
};

export const CustomizationPopover = ({
  title,
  handleSaveWidgetPreferences,
  onPopoverOpen,
  onPopoverClose,
  onWidgetToggle,
  popoverStyles,
}: CustomizationPopoverProps) => {
  const { T } = useI18n();
  const [customizeButtonNode, setCustomizeButtonNode] = useState<HTMLElement>();
  const {
    enableWidget,
    disableWidget,
    widgetComponents: items,
    widgetVisibilityStates,
    isCustomizationPopoverOpen,
    setIsCustomizationPopoverOpen
  } = useDashboardFrameworkContext();

  const toggleVisibility = useCallback((key: string, isChecked: boolean, index: number) => {
    const eventData = { key, index, isChecked, totalNumOfWidgets: items.length, availableWidgets: items.map(item => item.key) };
    if (isChecked) {
      enableWidget(key);
    } else {
      disableWidget(key);
    }
    onWidgetToggle?.(eventData);
  }, [enableWidget, disableWidget, items, onWidgetToggle]);

  const onRequestClose = useCallback((e: MouseEvent | TouchEvent | KeyboardEvent) => {
    // Need to cast event target to HTMLElement because of absence of type guarantees:
    // https://stackoverflow.com/a/61164277
    if (customizeButtonNode && !customizeButtonNode.contains(e.target as HTMLElement)) {
      setIsCustomizationPopoverOpen(false);
      handleSaveWidgetPreferences?.(widgetVisibilityStates);
      onPopoverClose?.();
    }
  }, [customizeButtonNode, handleSaveWidgetPreferences, setIsCustomizationPopoverOpen, widgetVisibilityStates, onPopoverClose]);

  return (
    <>
      <PopOver
        hideArrow
        closeOnEsc
        closeOnClickOutside
        isOpen={isCustomizationPopoverOpen}
        onRequestClose={onRequestClose}
        anchor={customizeButtonNode}
        anchorPoint={{ x: 'right', y: 'bottom' }}
        position="bottom-left"
        offset={{ x: 0, y: 8 }}
        {...popoverStyles}
      >
        <ReactFocusLock disabled={!isCustomizationPopoverOpen} returnFocus>
          <Box width="359px" px={4} py={6} backgroundColor="white" data-testid="customization-popover-content">
            <Flex justifyContent="space-between">
              <Text.SectionTitle m={0} pb={6}>
                {title ? title : <T project="dashboard-framework">Customize</T>}
              </Text.SectionTitle>
              <Touchable.Element.Icon data-testid="customization-popover-dismiss" onClick={onRequestClose}>
                <CrossLarge />
              </Touchable.Element.Icon>
            </Flex>
            <Stack gap={2}>
              {items.map(({ key, title: widgetTitle, description: widgetDescription }, index) => {
                return (
                  <Flex
                    key={key}
                    border={1}
                    borderRadius={1}
                    borderColor="gray.800"
                    justifyContent="space-between"
                    alignItems="center"
                    py={3}
                    px={4}
                    data-testid={`${key}-toggle-wrapper`}
                  >
                    <Stack gap={1}>
                      <Text.Body m={0} fontWeight="medium">{widgetTitle}</Text.Body>
                      <Text.Caption>{widgetDescription}</Text.Caption>
                    </Stack>
                    <Toggle
                      data-testid={`${key}-toggle`}
                      checked={isWidgetVisible(widgetVisibilityStates, key)}
                      onChange={(checked: boolean) => toggleVisibility(key, checked, index)}
                    />
                  </Flex>
                );
              })}
            </Stack>
          </Box>
        </ReactFocusLock>
      </PopOver>
      <Button
        ref={setCustomizeButtonNode}
        variant="secondary"
        size="medium"
        onClick={() => {
          if (isCustomizationPopoverOpen) {
            handleSaveWidgetPreferences?.(widgetVisibilityStates);
            onPopoverClose?.();
          } else {
            onPopoverOpen?.({ visibleWidgets: widgetVisibilityStates.filter((widget) => widget.isVisible ).map((widget) => widget.key ) });
          }
          setIsCustomizationPopoverOpen(!isCustomizationPopoverOpen);
        }}
        data-testid="customize-button"
      >
        {title ? title : <T project="dashboard-framework">Customize</T>}
      </Button>
    </>
  );
};

import React, { PropsWithChildren } from 'react';
import { WidgetKey } from '@sqs/config-ui-preferences-ts-client';
import { Box } from '@sqs/rosetta-primitives';

type WidgetWrapperProps = PropsWithChildren<{
  isFocusedPrePublishGuideEnabled?: boolean;
  marginBottom?: number | string;
  widgetKey?: string;
}>;

const DEFAULT_WIDGET_MARGIN_BOTTOM = 10;

export const WidgetWrapper = ({
  children,
  isFocusedPrePublishGuideEnabled = false,
  marginBottom = DEFAULT_WIDGET_MARGIN_BOTTOM,
  widgetKey,
}: WidgetWrapperProps) => {
  const shouldUseFocusedPrePublishMargin =
    isFocusedPrePublishGuideEnabled &&
    widgetKey === WidgetKey.GET_STARTED;

  return (
    <Box
      mb={shouldUseFocusedPrePublishMargin ? marginBottom : DEFAULT_WIDGET_MARGIN_BOTTOM}
    >
      {children}
    </Box>
  );
};

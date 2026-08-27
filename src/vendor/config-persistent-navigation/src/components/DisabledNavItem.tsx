import { Tooltip } from '@sqs/rosetta-elements';
import { Box, Text } from '@sqs/rosetta-primitives';
import { HoverTrigger } from '@sqs/universal-ui';
import React, { ReactNode, useRef } from 'react';

interface Props {
  dataAttributes?: Record<string, string>;
  disabledTooltipText: string | undefined;
  children?: ReactNode;
  isSecondary?: boolean;
}

export const DisabledNavItem = ({
  dataAttributes,
  disabledTooltipText,
  isSecondary,
  children,
}: Props) => {
  const tooltipAnchorRef = useRef<HTMLAnchorElement>(null);

  const contents = (
    <Box position="relative" width="100%" p={1} pl={isSecondary ? 3 : 1}>
      {/* https://www.scottohara.me/blog/2021/05/28/disabled-links.html */}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        role="link"
        aria-disabled
        data-test={dataAttributes?.test}
        ref={tooltipAnchorRef}
      >
        {isSecondary ? (
          <Text.Body
            fontWeight="medium"
            color="fg.disabled"
            m={0}
            sx={{ cursor: 'not-allowed' }}
          >
            {children}
          </Text.Body>
        ) : (
          <Text.Subtitle
            color="fg.disabled"
            m={0}
            sx={{ cursor: 'not-allowed' }}
          >
            {children}
          </Text.Subtitle>
        )}
      </a>
    </Box>
  );

  if (disabledTooltipText) {
    return (
      <HoverTrigger
        component={(isHovered) => (
          <Tooltip
            isOpen={isHovered}
            anchor={tooltipAnchorRef.current}
            position="bottom"
            delay={{ enter: 120, exit: 0 }}
          >
            {disabledTooltipText}
          </Tooltip>
        )}
      >
        {contents}
      </HoverTrigger>
    );
  }

  return contents;
};

import React from 'react';

import { Tooltip } from '@sqs/rosetta-elements';

type ToolTipProps = {
  anchor: HTMLElement | null;
  isOpen: boolean;
  position?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-end';
  delay?: number | { enter: number; exit: number; };
};

const HoverTooltip = ({
  anchor,
  isOpen,
  position = 'top',
  delay = { enter: 300, exit: 0 },
  children
}: React.PropsWithChildren<ToolTipProps>) => (
  <Tooltip
    isOpen={isOpen}
    anchor={anchor}
    position={position}
    delay={delay}
    boxShadow={400}
    css={{
      backgroundColor: 'white',
      p: 2,
    }}
  >
    {children}
  </Tooltip>
);

export default HoverTooltip;

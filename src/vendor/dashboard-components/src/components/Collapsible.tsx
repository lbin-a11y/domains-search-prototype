import React, { useEffect, useState } from 'react';
import { Box } from '@sqs/rosetta-primitives';

type CollapsibleProps = {
  isCollapsed: boolean;
  transitionTimeMs?: number;
  children: React.ReactNode
};

const Collapsible = ({ isCollapsed, transitionTimeMs = 300, children }: CollapsibleProps) => {
  const [shouldRender, setShouldRender] = useState(!isCollapsed);
  useEffect(() => {
    if (isCollapsed) {
      setTimeout(() => {
        setShouldRender(false);
      }, transitionTimeMs);
    }
  }, [isCollapsed, transitionTimeMs]);

  return (
    shouldRender ? (
      <Box
        sx={{
          // https://keithjgrant.com/posts/2023/04/transitioning-to-height-auto/
          display: 'grid',
          opacity: isCollapsed ? 0 : 1,
          gridTemplateRows: isCollapsed ? '0fr' : '1fr',
          transition: [
            `grid-template-rows ${transitionTimeMs}ms ease`,
            `margin ${transitionTimeMs}ms ease`,
            `opacity ${transitionTimeMs / 3}ms ease-in-out`
          ].join(',')
        }}
      >
        <Box sx={{ overflow: 'hidden' }}>
          {children}
        </Box>
      </Box>
    ) : null
  );
};

export default Collapsible;

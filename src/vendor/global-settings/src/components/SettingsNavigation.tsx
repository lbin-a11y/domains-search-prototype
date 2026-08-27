import React from 'react';

// @ts-expect-error: no types
import Tunnel, { Exit } from '@sqs/tunnel';

const TUNNEL_KEY = '@sqs/global-settings/SettingsNavigation';

export const SettingsNavigation = ({ children }: { children: React.ReactNode }) => (
  <Tunnel tunnelKey={TUNNEL_KEY}>
    {children}
  </Tunnel>
);

export const SettingsNavigationExit = ({ fallback }: { fallback: React.ReactNode }) => (
  <Exit
    tunnelKey={TUNNEL_KEY}
    render={({ children }: any) => children ?? fallback}
  />
);

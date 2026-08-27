import type { SecondaryItemConfigType } from '../types/NavigationTypes';
import React, { useCallback, useEffect } from 'react';

type Callback = (children: React.ReactNode | SecondaryItemConfigType[]) => void;

type WindowWithListenerSet = Window & {
  l2Listeners?: Set<Callback>
};

/**
 * This hook is designed to provide a "global" instance of a Set containing callbacks to run when
 * `updateChildren` is called. The problem it solves is that there are multiple instances of React that might be
 * hosting code paths calling `updateChildren`. (Specifically: Microfrontends). In order to bridge the instances of
 * React, we need some common Global. The `window` object is both global, and available to all instances that might be
 * contributing L2s (or rendering them)
 */
export default (win: WindowWithListenerSet = window) => {
  useEffect(() => {
    // Set l2Listeners Set on window such that all instances of SecondaryNavigation can send
    if (!Object.hasOwn(win, 'l2Listeners')) {
      Object.defineProperty(win, 'l2Listeners', {
        value: new Set<Callback>(),
        writable: false,
        enumerable: false,
        configurable: false,
      });
    }
  }, [win]);

  const updateChildren = useCallback((value: React.ReactNode | SecondaryItemConfigType[]) => setTimeout(
    () => (win.l2Listeners!).forEach(fn => fn(value)),
    0
  ), [ win.l2Listeners ]);

  const listen = useCallback((callback: Callback) => {
    win.l2Listeners!.add(callback);
    return () => { win.l2Listeners!.delete(callback); };
  }, [ win.l2Listeners ]);

  return {
    listen,
    updateChildren
  };
};

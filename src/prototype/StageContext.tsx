import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { LifecycleStage } from '@sqs/config-ui-preferences-ts-client';

/**
 * Stage of the user's journey the prototype is currently showing.
 *
 * These map onto the real `LifecycleStage` values that drive the Home dashboard
 * widget registry in config-frontend, so the dashboard reacts exactly as it
 * would in production.
 */
export type JourneyStage = 'onboarding' | 'running';

export const STAGE_TO_LIFECYCLE_STAGE: Record<JourneyStage, LifecycleStage> = {
  onboarding: LifecycleStage.PRE_PUBLISH,
  running: LifecycleStage.POST_FIRST_SALE,
};

export const STAGE_LABELS: Record<JourneyStage, string> = {
  onboarding: 'Onboarding',
  running: 'Running their business',
};

export const STAGE_DESCRIPTIONS: Record<JourneyStage, string> = {
  onboarding: 'Setting the salon up. Home shows the setup guide.',
  running: 'Salon is operating. Home shows business modules.',
};

export const STAGES: JourneyStage[] = ['onboarding', 'running'];

const STORAGE_KEY = 'prototype.stage';

function isStage(value: unknown): value is JourneyStage {
  return value === 'onboarding' || value === 'running';
}

function readInitialStage(): JourneyStage {
  const fromUrl = new URLSearchParams(window.location.search).get('stage');
  if (isStage(fromUrl)) {
    return fromUrl;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isStage(stored)) {
    return stored;
  }
  return 'onboarding';
}

type StageContextValue = {
  stage: JourneyStage;
  lifecycleStage: LifecycleStage;
  setStage: (stage: JourneyStage) => void;
};

const StageContext = createContext<StageContextValue>({
  stage: 'onboarding',
  lifecycleStage: LifecycleStage.PRE_PUBLISH,
  setStage: () => {
    /* noop */
  },
});

export const StageProvider = ({ children }: PropsWithChildren) => {
  const [stage, setStageState] = useState<JourneyStage>(readInitialStage);

  const setStage = useCallback((next: JourneyStage) => {
    setStageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    const url = new URL(window.location.href);
    url.searchParams.set('stage', next);
    window.history.replaceState(null, '', url);
  }, []);

  const value = useMemo(
    () => ({ stage, lifecycleStage: STAGE_TO_LIFECYCLE_STAGE[stage], setStage }),
    [stage, setStage],
  );

  return <StageContext.Provider value={value}>{children}</StageContext.Provider>;
};

export const useStage = () => useContext(StageContext);

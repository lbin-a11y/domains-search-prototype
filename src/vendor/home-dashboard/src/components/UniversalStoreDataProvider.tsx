import React, { createContext, useContext, useMemo, type PropsWithChildren } from 'react';
import type { SEOOptimizationProvider } from '@sqs/business-ai-tools/seo-optimization/provider';
import type { Domain, RegisteringDomain } from '@sqs/websites-constants';

export enum UniversalStoreDataStatus {
  PENDING = 'pending',
  READY = 'ready',
  ERROR = 'error',
}

type SEOOptimizationStoreDerivedData = Pick<Parameters<typeof SEOOptimizationProvider>[0],
  'homepageSEODescription' |
  'homepageSEOTitleFormat' |
  'nonHomepageSEOTitleFormat' |
  'saveImageAltText' |
  'savePageMetadata'
>;

/**
 * The specific store-derived data that home dashboard widgets expect
 */
export type StoreDerivedData = {
  identifier: string;
  isSitePasswordProtected: boolean;
  isSitePublished: boolean;
  primaryDomain: string | null;
  siteTitle: string;
  domainsById: { [id: string]: Domain };
  registrations: Array<RegisteringDomain>;
  toggleFullScreenPreviewMode: () => void;
} & SEOOptimizationStoreDerivedData;

type UniversalStoreDataPending = {
  data: null;
  status: UniversalStoreDataStatus.PENDING;
  error: null;
};

type UniversalStoreDataReady = {
  data: StoreDerivedData;
  status: UniversalStoreDataStatus.READY;
  error: null;
};

type UniversalStoreDataError = {
  data: null;
  status: UniversalStoreDataStatus.ERROR;
  error: Error;
};

/**
 * The universal store data made available to home dashboard widgets via hook
 */
export type UniversalStoreData =
  | UniversalStoreDataError
  | UniversalStoreDataPending
  | UniversalStoreDataReady
  ;

/**
 * Context for passing universal store data to home dashboard widgets
 */
const UniversalStoreDataContext = createContext<UniversalStoreData>({
  data: null,
  error: null,
  status: UniversalStoreDataStatus.PENDING,
});

/**
 * Hook for accessing universal store data in home dashboard widgets
 */
export const useUniversalStoreData = () => {
  const context = useContext(UniversalStoreDataContext);
  return context;
};

/**
 * Provider wrapper for universal store data
 */
export const UniversalStoreDataProvider = ({ children: unmemoizedChildren, value }: PropsWithChildren<{
  value: UniversalStoreData;
}>) => {
  const children = useMemo(() => unmemoizedChildren, [unmemoizedChildren]);
  return (
    <UniversalStoreDataContext.Provider value={value}>
      {children}
    </UniversalStoreDataContext.Provider>
  );
};

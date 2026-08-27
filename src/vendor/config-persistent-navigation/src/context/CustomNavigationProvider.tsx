import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useCustomNavigation } from '../customNavigation';
import { Backend, CustomNavProps, CustomNavState } from '../customNavigation/types';
import { getIsUserAdmin } from '@sqs/universal-utils';
import { useNavigationType } from '../utils/useNavigationType';
import { GLOBAL_NAVIGATION_TYPE } from '../constants/navigation';

interface CustomNavProviderProps {
  backend: Backend,
  children: ReactNode;
  isEligibleForDonationsDashboard: boolean;
  isEnabled: boolean;
  isMeetingsEnabled: boolean;
}

const CustomNavContext = createContext<CustomNavProps | undefined>(undefined);

export const CustomNavProvider = ({
  backend,
  children,
  isEligibleForDonationsDashboard,
  isEnabled,
  isMeetingsEnabled,
}: CustomNavProviderProps) => {
  const customNav = useCustomNavigation(
    backend,
    isEnabled,
    isEligibleForDonationsDashboard,
    isMeetingsEnabled,
  );
  const navigationType = useNavigationType();
  const isUserAdmin = getIsUserAdmin();

  useEffect(() => {
    if (customNav?.state === CustomNavState.READY && navigationType === GLOBAL_NAVIGATION_TYPE.EDITING && isUserAdmin) {
      customNav?.startEditing();
    }
    if (customNav?.state === CustomNavState.EDITING && navigationType !== GLOBAL_NAVIGATION_TYPE.EDITING) {
      customNav?.stopEditing();
    }
  }, [customNav, navigationType, isUserAdmin]);

  return (
    <CustomNavContext.Provider value={customNav}>
      {children}
    </CustomNavContext.Provider>
  );
};

export const useCustomNavContext = (): CustomNavProps | undefined => {
  const context = useContext(CustomNavContext);
  return context;
};

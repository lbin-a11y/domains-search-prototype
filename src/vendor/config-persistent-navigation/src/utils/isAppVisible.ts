import { NavItemKey } from '@sqs/config-ui-preferences-ts-client';
import { CustomNavProps, CustomNavState } from '../customNavigation/types';

export const isAppVisible = (
  customNav: CustomNavProps | undefined,
  visibilityKey: NavItemKey
) => {
  if (customNav?.state !== CustomNavState.LOADING) {
    return customNav?.items.find(({ key }) => key === visibilityKey)?.isVisible !== false;
  }
};

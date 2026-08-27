import { NavItemKey } from '@sqs/config-ui-preferences-ts-client';
import { CustomNavProps, CustomNavState } from '../customNavigation/types';

export const isAppFocused = (
  customNav: CustomNavProps | undefined,
  visibilityKey: NavItemKey
) => {
  return customNav?.state === CustomNavState.EDITING && customNav?.items.find(({ key }) => key === visibilityKey)?.isFocused === true;
};

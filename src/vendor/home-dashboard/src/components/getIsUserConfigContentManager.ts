import { getAccountContext } from '@sqs/config-context/account';
import AccessPermissions from '@sqs/enums/AccessPermissions';

export const getIsUserConfigContentManager = () => {
  return getAccountContext()?.accessPermissions?.includes(AccessPermissions.CONFIG_CONTENT_MANAGER);
};

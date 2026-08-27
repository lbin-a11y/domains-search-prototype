import { getAccountContext } from '@sqs/config-context/account';

const getAuthenticatedAccount = (): Record<string, any> | undefined => {
  return getAccountContext()?.authenticatedAccount;
};

export const getFirstName = (): string | undefined => {
  return getAuthenticatedAccount()?.firstName;
};

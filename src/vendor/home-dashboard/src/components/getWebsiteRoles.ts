import { getAccountContext } from '@sqs/config-context/account';
import WebsiteRole from '@sqs/enums/WebsiteRole';

export function getWebsiteRoles() {
  const websiteRoles = getAccountContext()?.websiteRoles || {};
  const rolesArray = Object.keys(websiteRoles).map(
    (role) => parseInt(role, 10) as WebsiteRole
  );
  return rolesArray;
}

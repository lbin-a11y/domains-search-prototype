import network from '@sqs/network';

import { CustomNavBackendItem } from './types';

const RESOURCE_URL = '/api/v1/config-ui-preferences-service/custom-nav/preferences';

export async function loadNavigation(): Promise<Array<CustomNavBackendItem>> {
  const response = await network.get(RESOURCE_URL);
  return response.data.items;
}

export function saveNavigation(items: Array<CustomNavBackendItem>): Promise<void> {
  return network.put(RESOURCE_URL, {
    items,
  });
}

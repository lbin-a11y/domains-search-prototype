import { WidgetKey } from '@sqs/config-ui-preferences-ts-client';

// using `any` as a placeholder for now until widget specific preferences are fully defined
export type WidgetPreferences = Partial<Record<string, Record<WidgetKey, any>>>;


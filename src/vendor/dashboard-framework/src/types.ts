import React from 'react';

import Team from '@sqs/enums/Team';

export type DashboardFrameworkProps = {
  dashboardKey: string;
  enableWidget: (key: string) => void;
  disableWidget: (key: string) => void;
  isCustomizationPopoverOpen: boolean;
  setIsCustomizationPopoverOpen: (isOpen : boolean) => void;
  widgetComponents: WidgetComponentProps[];
  widgetVisibilityStates: WidgetVisibilityProps[];
  isDashboardLoading: boolean;
  onAllWidgetsRendered: () => void;
};

export enum WidgetVisibility {
  ON = 'on',
  OFF = 'off',
  UNSET = 'unset',
}

export type WidgetDefinition = {
  key: string;
  getTitle: () => string;
  getDescription: () => string;
  getLoadingHeight: () => string;
  ComponentImport: (props?: React.ComponentProps<any>) => Promise<{ default: React.ComponentType<any> }>;
  owner: Team;
  getIsVisibleByDefault: () => boolean | Promise<boolean>;
  getIsAvailable: () => boolean | Promise<boolean>;
};

export type WidgetComponentProps = {
  key: string;
  title: string;
  description: string;
  ComponentImport: (props?: React.ComponentProps<any>) => Promise<{ default: React.ComponentType<any> }>;
  component?: React.ComponentType<any>;
  widgetOwner: Team;
  isLoaded: boolean;
  loadingHeight: string;
};

export type WidgetVisibilityProps = {
  key: string;
  isVisible: boolean;
  visibilityPreference: WidgetVisibility;
};

export type DashboardPreference = {
  key: string;
  visibility: WidgetVisibility;
};

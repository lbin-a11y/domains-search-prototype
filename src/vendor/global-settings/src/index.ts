import SettingsPrimaryContent, { SettingsContentTestId } from './components/SettingsPrimaryContent';
import SettingsSaveCancel from './components/SettingsSaveCancel';
import SettingsWrapper from './components/SettingsWrapper';
import { SettingsNavigation } from './components/SettingsNavigation';
import { SettingsLink } from './components/SettingsLink';
import { SettingsSubRouter } from './SettingsSubRouter';
import SettingsTitle, { SettingsTitleTestId } from './components/SettingsTitle';
import SettingsDescription from './components/SettingsDescription';
import {
  HeaderActionAreaExit,
} from './components/View/components/HeaderActionArea/HeaderActionArea';
import SettingsSubtitle from './components/SettingsSubtitle';
import SettingsLanding from './components/SettingsLanding';
import SettingsBreadcrumbsProvider from './components/SettingsBreadcrumbsProvider';
import getBreadcrumbConfig, {
  getBreadcrumbFromRoute,
  type getBreadcrumbFromRouteType,
} from './utils/getBreadcrumbConfig';
import { ObjectIdentifier } from './utils/events/constants';
import UnsavedChangesAlert from './components/View/components/HeaderActionArea/HeaderActionAreaWithoutSave';

export * from './constants';
export * from './utils/events/EventTracker';

export {
  HeaderActionAreaExit,
  ObjectIdentifier,
  SettingsLink,
  SettingsSubRouter,
  SettingsContentTestId,
  SettingsPrimaryContent,
  SettingsSaveCancel,
  SettingsWrapper,
  SettingsNavigation,
  SettingsTitle,
  SettingsTitleTestId,
  SettingsDescription,
  SettingsSubtitle,
  SettingsLanding,
  SettingsBreadcrumbsProvider,
  UnsavedChangesAlert,
  getBreadcrumbConfig,
  getBreadcrumbFromRoute,
  type getBreadcrumbFromRouteType,
};

import { rosetta } from '@sqs/rosetta-themes';

const { space, colors } = rosetta.default;

export const globalSettingsAppKey = 'global-settings';
// root path of "settings" with the settings subrouter
export const globalSettingsRootPath = '/';

export const MAX_SETTINGS_CONTENT_WIDTH = '1332px';

// configure the columns for the grid
export const SettingsContentWidth = {
  DEFAULT: [12, 10, 8, 6, 6, 6],
  LARGE: [12, 12, 12, 12, 10, 10],
};

type Keys = keyof typeof SettingsContentWidth;
export type SettingsContentWidthValues = (typeof SettingsContentWidth)[Keys];

//TODO: XPS-1103 - fix the width calculations
export const ResponsiveSettingsContentWidth = {
  DEFAULT: `min(60vw, ${SettingsContentWidth.DEFAULT})`,
  LARGE: `min(60vw, ${SettingsContentWidth.LARGE})`,
};

export const standaloneSettingsStyles = {
  position: 'fixed',
  // The Settings Modal is 33px (space[6]) below the top.
  // So we have to account for that here.
  top: `-${space[6]}`,
  background: colors.white,
  left: '0',
  width: '100vw',
  height: '100vh',
};

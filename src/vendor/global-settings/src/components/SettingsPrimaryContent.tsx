import React from 'react';

import { Grid } from '@sqs/rosetta-elements';

import { SettingsContentWidth, SettingsContentWidthValues } from '../constants';
import isMobile from '../utils/isMobile';
import ScrollableBoundingBox from './ScrollableBoundingBox';

export const SettingsPrimaryContentTestId = 'settings-primary-content';
export const SettingsContentTestId = 'settings-content';


const SettingsPrimaryContent: React.FC<React.PropsWithChildren<{
  isSaving: boolean,
  isOnlyShowContentForPrint?: boolean,
  contentWidth?: SettingsContentWidthValues,
  dataTest?: string,
}>> = ({ children, contentWidth = SettingsContentWidth.DEFAULT, isSaving, dataTest, ...rest }) => (
  <Grid.Container
    as={ScrollableBoundingBox}
    data-testid={dataTest ?? SettingsPrimaryContentTestId}
    {...rest}
    className="sub-panel-grid-container"
    gutter={0}
    margin={0}
    px={isMobile() ? 3 : 6}
    opacity={isSaving ? 0.2 : 1}
    gridConstraint={contentWidth}
  >
    <Grid.Item
      columns={12}
      data-testid={SettingsContentTestId}
      pt={isMobile() ? 0 : 8}
      mb={6}
      height="fit-content"
    >
      {children}
    </Grid.Item>
  </Grid.Container>
);

export default SettingsPrimaryContent;

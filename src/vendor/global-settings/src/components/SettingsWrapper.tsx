import React, { ReactNode } from 'react';

import { Panel } from '@sqs/universal-panel-components';
import { type WithRouterComponentProps, withRouter } from '@sqs/universal-router';

import SettingsPrimaryContent from './SettingsPrimaryContent';
import { SettingsContentWidthValues } from '../constants';
import { SettingsModalContextConsumer, SettingsModalContextProvider } from './useSettingsModalContext';

export type SettingsWrapperProps = {
  contentWidth?: SettingsContentWidthValues;
  isSaving?: boolean;
  isInSidebar?: boolean;
  // When true, hides all of the Settings Modal chrome from the
  // "print" media query, allowing user to just print the content
  isHideUIForPrint?: boolean;
  htmlAttributes?: object;
  children: ReactNode | undefined;
  dataTest?: string;
};

const StaticNavBase: React.FC<React.PropsWithChildren<SettingsWrapperProps & WithRouterComponentProps>> = ({
  contentWidth,
  isSaving,
  children,
  router,
  ...rest
}) => {
  return (
    <SettingsPrimaryContent
      isSaving={isSaving ?? false}
      contentWidth={contentWidth}
      {...rest}
    >
      {children}
    </SettingsPrimaryContent>
  );
};

const StaticNavBaseWithRouter = withRouter(StaticNavBase);

const LegacyNavBase: React.FC<React.PropsWithChildren<SettingsWrapperProps>> = (
  {
    isSaving,
    children,
    ...rest
  }) => {
  // if there's a testid passed, but no test, try converting it to data-test.
  // The old Panel components expected test instead of testid.
  // This can be removed when we remove all of the <Panel stuff from SettingsWrapper
  //@ts-expect-error
  if (rest['data-testid'] && !rest['data-test']) {
    //@ts-expect-error
    rest['data-test'] = rest['data-testid'];
  }
  return (
    <Panel isSaving={isSaving} {...rest}>
      {children}
    </Panel>
  );
};

const SettingsWrapper = ({ isInSidebar, isHideUIForPrint, htmlAttributes, ...navbaseProps }: SettingsWrapperProps) => {
  return (
    <SettingsModalContextProvider isInSidebar={isInSidebar} isHideUIForPrint={isHideUIForPrint} htmlAttributes={htmlAttributes}>
      <SettingsModalContextConsumer>
        {
          ({ isSettingsModalEnabled }) => {
            return isSettingsModalEnabled ?
              (<StaticNavBaseWithRouter {...navbaseProps} />) :
              (<LegacyNavBase {...navbaseProps}/>);
          }
        }
      </SettingsModalContextConsumer>
    </SettingsModalContextProvider>
  );
};

export default SettingsWrapper;

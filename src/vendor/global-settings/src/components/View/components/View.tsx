import React from 'react';
import {
  MemoryRouter,
  Switch,
  Route,
//@ts-expect-error
} from 'react-router-dom';

import type { StaticRoutesSubRouter, SubRouterConfig, WithRouterComponentProps } from '@sqs/universal-router';
import { withRouter } from '@sqs/universal-router';

import Wrapper, { LayoutProps } from './Wrapper';

export interface ViewProps extends WithRouterComponentProps {
  appKey: string,
  navigation: LayoutProps['navigation'],
}

const View: React.FunctionComponent<React.PropsWithChildren<ViewProps>> = ({
  appKey,
  router,
  location,
  navigation,
}) => {
  const subRouterContext = router.getSubRouterContextByName(appKey) as SubRouterConfig;
  const subRouter = subRouterContext.subRouter as StaticRoutesSubRouter;
  const subLocation = subRouter.getCurrentLocation();

  return (
    <Wrapper
      navigation={navigation}
      location={location}
      mountPoint={subRouterContext.mountPoint}
    >
      <MemoryRouter>
        <Switch
          location={subLocation}
        >
          {subRouter.validRoutes.map(({ path, component: SubPanelComponent }) => {
            if (!SubPanelComponent && __DEV__) {
              console.error(`Missing global settings route component for path: [${path}]`);
              return null;
            }
            return (
              <Route
                exact
                key={path}
                path={path}
              >
                <SubPanelComponent/>
              </Route>
            );
          })}
        </Switch>
      </MemoryRouter>
    </Wrapper>
  );
};

export default withRouter(View);

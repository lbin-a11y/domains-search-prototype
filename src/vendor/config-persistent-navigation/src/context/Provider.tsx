import React from 'react';
import { Breakpoint } from '@sqs/rosetta-utilities';
import Router, {
  background,
  withRouter,
  type Route,
  type WithRouterComponentProps,
} from '@sqs/universal-router';
import { GLOBAL_NAVIGATION_TYPE } from '../constants/navigation';
import { NAVIGATION_WIDTH } from '../constants/style';

type PersistentNavigationProviderOwnProps = {
  children: React.ReactNode;
  navigationType?: GLOBAL_NAVIGATION_TYPE;
};

type PersistentNavigationProviderProps = PersistentNavigationProviderOwnProps &
  WithRouterComponentProps;

type RouteWithOptionalNavigationType = Route & {
  navigationType?: GLOBAL_NAVIGATION_TYPE;
};

export type ContextType = {
  isDrawerOpen: boolean;
  onRouteChange: (location: any, route: RouteWithOptionalNavigationType | null) => void;
  navigationType: GLOBAL_NAVIGATION_TYPE | null;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
  width: string;
};

export const Context = React.createContext<ContextType>({
  isDrawerOpen: false,
  onRouteChange: () => {
    // Silence
  },
  navigationType: null,
  setIsDrawerOpen: () => {
    // Silence
  },
  width: NAVIGATION_WIDTH[GLOBAL_NAVIGATION_TYPE.DEFAULT],
});

const getBackgroundRoute = (
  router: Router | null
): RouteWithOptionalNavigationType | null =>
  router && background.isOverlayOpen(router) ?
    background.getBackgroundRoute(router) :
    null;

class PersistentNavigationProviderBase extends React.Component<PersistentNavigationProviderProps> {
  static contextType = Breakpoint.Context;

  private unlistenFromRouter: (() => void) | undefined;

  // `declare context` is the idiomatic TS pattern here, but Babel requires `allowDeclareFields`
  // to support it. This getter is the equivalent workaround.
  private get typedContext() {
    return this.context as React.ContextType<typeof Breakpoint.Context>;
  }

  state = {
    isDrawerOpen: false,
    navigationType: null,
  };

  componentDidMount() {
    this.attachRouterListener();
  }

  componentDidUpdate(prevProps: Readonly<PersistentNavigationProviderProps>) {
    if (prevProps.router !== this.props.router) {
      this.attachRouterListener();
    }
  }

  componentWillUnmount() {
    this.detachRouterListener();
  }

  private detachRouterListener() {
    if (this.unlistenFromRouter) {
      this.unlistenFromRouter();
      this.unlistenFromRouter = undefined;
    }
  }

  private attachRouterListener() {
    this.detachRouterListener();
    const { router } = this.props;
    if (!router) {
      return;
    }
    this.unlistenFromRouter = router.onChange((location, route) => {
      this.onRouteChange(location, route);
    });
  }

  onRouteChange: ContextType['onRouteChange'] = (_, route) => {
    const { router } = this.props;
    const isMobile = this.typedContext.platform === 'mobile';
    const backgroundRoute = getBackgroundRoute(router);
    const navigationType =
      route?.navigationType ||
      backgroundRoute?.navigationType ||
      GLOBAL_NAVIGATION_TYPE.DEFAULT;

    this.setState({
      isDrawerOpen: false,
      navigationType: isMobile ? GLOBAL_NAVIGATION_TYPE.DRAWER : navigationType,
    });
  };

  setIsDrawerOpen = (isDrawerOpen: boolean, callback?: () => void) => {
    this.setState({ isDrawerOpen }, callback);
  };

  getWidth = (navigationType: GLOBAL_NAVIGATION_TYPE | null) => {
    switch (navigationType) {
    case null:
    case GLOBAL_NAVIGATION_TYPE.DRAWER:
      return '0px';
    default:
      return NAVIGATION_WIDTH[navigationType];
    }
  };

  render() {
    const { isDrawerOpen, navigationType } = this.state;
    const width = this.getWidth(navigationType);

    return (
      <Context.Provider
        value={{
          isDrawerOpen,
          onRouteChange: this.onRouteChange,
          navigationType: navigationType,
          setIsDrawerOpen: this.setIsDrawerOpen,
          width,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Object.assign(
  withRouter(PersistentNavigationProviderBase),
  { Context }
);

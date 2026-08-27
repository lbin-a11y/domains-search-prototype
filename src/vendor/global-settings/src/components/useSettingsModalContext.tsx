import React, { createContext, useContext } from 'react';

type ContextType = {
  isSettingsModalEnabled: boolean;
  isHideUIForPrint: boolean;
  htmlAttributes: Record<string, any>;
};

const SettingsModalContext = createContext<ContextType>({
  isSettingsModalEnabled: true,
  isHideUIForPrint: false,
  htmlAttributes: {},
});

type ProviderType = {
  isInSidebar: boolean | undefined;
  isHideUIForPrint?: boolean;
  htmlAttributes?: Record<string, any>;
};

export const SettingsModalContextProvider: React.FC<React.PropsWithChildren<ProviderType>> =
  ({ children, isInSidebar, isHideUIForPrint, htmlAttributes = {} } ) => {
    const isDisabled = isInSidebar ?? false;
    return (
      <SettingsModalContext.Provider
        value={{
          isSettingsModalEnabled: !isDisabled,
          isHideUIForPrint: !!isHideUIForPrint,
          htmlAttributes,
        }}
      >
        {children}
      </SettingsModalContext.Provider>
    );
  };

export const SettingsModalContextConsumer = SettingsModalContext.Consumer;
export default () => {
  const { isSettingsModalEnabled, isHideUIForPrint, htmlAttributes } = useContext(SettingsModalContext);
  // don't _require_ context, fall back to default
  return {
    isSettingsModalEnabled: isSettingsModalEnabled ?? true,
    isHideUIForPrint,
    htmlAttributes,
  };
};

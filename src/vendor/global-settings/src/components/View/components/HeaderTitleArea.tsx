import React from 'react';

import { BackButton, Stack } from '@sqs/rosetta-elements';
import { Text } from '@sqs/rosetta-primitives';
import { Breakpoint } from '@sqs/rosetta-utilities';
import { useNavigation, withRouter, WithRouterComponentProps } from '@sqs/universal-router';

import { T } from '../../../i18n/helpers';
import { globalSettingsAppKey, globalSettingsRootPath } from '../../../constants';

const HeaderTitleAreaDesktop = () => (
  <Stack
    direction="row"
    justifyContent="left"
    space={1}
  >
    {/* The line height determines the vertical size, which,
        to keep aligned with the icon next to it, must match (36px) */}
    <Text.Title as="span" display="flex" fontSize={4} lineHeight="36px">
      <T project="global-settings">Settings</T>
    </Text.Title>
  </Stack>
);
const HeaderTitleAreaMobile = withRouter(({ router }: WithRouterComponentProps) => {
  const globalSettingsSubRouter = router.getSubRouterByName(globalSettingsAppKey);
  const isAtGlobalSettingsRoot = globalSettingsSubRouter?.getCurrentLocation()?.pathname === globalSettingsRootPath;
  const { goUp } = useNavigation();

  if (isAtGlobalSettingsRoot) {
    return (
      <Stack
        direction="row"
        justifyContent="left"
        space={1}
      >
        {/* The line height determines the vertical size, which,
        to keep aligned with the icon next to it, must match (36px) */}
        <Text.Title display="flex" fontSize={5} lineHeight="36px">
          <T project="global-settings">Settings</T>
        </Text.Title>
      </Stack>
    );
  }
  return (
    <BackButton
      label={router.getCurrentLocation().backButtonLabel}
      onClick={goUp}
      //BackButton comes with 11px padding, which needs to be trimmed
      // down to match the overall box size of 36px (so as to not break
      // vertical alignment)
      pt="7px"
      pb="7px"
    />
  );
});

const HeaderTitleArea: React.FunctionComponent<React.PropsWithChildren<unknown>> = () => (
  <Breakpoint.Renderer
    render={{
      default: HeaderTitleAreaDesktop,
      'mobile-0': HeaderTitleAreaMobile,
      'mobile-100': HeaderTitleAreaMobile,
    }}
  />
);

export default HeaderTitleArea;

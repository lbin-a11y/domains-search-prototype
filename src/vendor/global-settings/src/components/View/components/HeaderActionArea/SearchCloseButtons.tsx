import React from 'react';

import { Stack } from '@sqs/rosetta-elements';
import { Touchable } from '@sqs/rosetta-primitives';
import { Search, CrossLarge } from '@sqs/rosetta-icons';
import { withRouter, WithRouterComponentProps, background } from '@sqs/universal-router';
import { usePathfinderContext, trackOpenSearch } from '@sqs/config-appshell';

import HeaderIconContainer from '../HeaderIconContainer';
import isMobile from '../../../../utils/isMobile';
import { t } from '../../../../i18n/helpers';

/**
 * This is the view of the search & close buttons. It is meant only for internal usage
 */
export default withRouter(({ router }: WithRouterComponentProps) => {
  const onRequestClose = () => router.push(background.getBackgroundLocation(router));
  const { setPathfinderOpen } = usePathfinderContext();

  return (
    <Stack
      direction="row"
      justifyContent="right"
      space={4}
    >
      <HeaderIconContainer>
        {!isMobile() && (
          <Touchable.Element.Icon
            onClick={() => {
              setPathfinderOpen?.(true);
              trackOpenSearch('settings-modal');
            }}
            data-testid="settings-header-search-button"
            aria-label={t('Search', null, { project: 'global-settings' })}
          >
            <Search />
          </Touchable.Element.Icon>
        )}
      </HeaderIconContainer>
      <HeaderIconContainer>
        <Touchable.Element.Icon
          onClick={onRequestClose}
          data-testid="settings-header-close-button"
          aria-label={t('Close', null, { project: 'global-settings' })}
        >
          <CrossLarge />
        </Touchable.Element.Icon>
      </HeaderIconContainer>
    </Stack>
  );
});

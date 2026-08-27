import React from 'react';

// @ts-expect-error Not typed
import Tunnel from '@sqs/tunnel';
import { RouterApi, RouterLocation, withRouter } from '@sqs/universal-router';
import { StatefulReviewingChangesModal, useEnsureClean } from '@sqs/universal-panel-components';

import SearchCloseButtons from './SearchCloseButtons';
import { HEADER_ACTION_AREA_EXIT_KEY } from './HeaderActionArea';

const HeaderActionAreaWithoutSave = ({
  router,
  location,
  editing,
  onCancel,
}: {
  router: RouterApi;
  location: RouterLocation;
  editing: boolean;
  onCancel: () => void;
}) => {

  const ensureCleanState = useEnsureClean({
    router,
    location,
    isDirty: editing,
    onDiscardClick: onCancel,
  });
  const { isReviewingChanges, handleCancel, handleDiscard } = ensureCleanState;

  return (
    <Tunnel tunnelKey={HEADER_ACTION_AREA_EXIT_KEY}>
      <StatefulReviewingChangesModal
        isReviewingChanges={isReviewingChanges}
        handleCancel={handleCancel}
        handleDiscard={handleDiscard}
      />
      <SearchCloseButtons/>
    </Tunnel>
  );

};

export default withRouter(HeaderActionAreaWithoutSave);

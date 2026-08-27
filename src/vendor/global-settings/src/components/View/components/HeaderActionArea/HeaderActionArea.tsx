import React, { PropsWithChildren } from 'react';

//@ts-expect-error
import Tunnel, { Exit } from '@sqs/tunnel';
import { StatefulReviewingChangesModal, useEnsureClean } from '@sqs/universal-panel-components';
import { WithRouterComponentProps, withRouter } from '@sqs/universal-router';
import { Flex } from '@sqs/rosetta-primitives';

import SearchCloseButtons from './SearchCloseButtons';
import SaveCancelButtons, { SaveCancelButtonsProps } from './SaveCancelButtons';

export const HEADER_ACTION_AREA_EXIT_KEY = 'settings-save-cancel';

export type HeaderActionAreaProps = PropsWithChildren<{
  isDirty: boolean;
  isInvalid?: boolean;
}> & SaveCancelButtonsProps;

type HeaderActionAreaButtonsProps = Omit<HeaderActionAreaProps, 'children'>;

const HeaderActionAreaButtons: React.FC<HeaderActionAreaButtonsProps> = ({
  isDirty,
  isInvalid,
  onSave,
  onCancel,
  isSaving = false,
}) => {
  if (!isDirty) {
    return <SearchCloseButtons />;
  }
  return (
    <SaveCancelButtons
      onSave={onSave}
      onCancel={onCancel}
      isSaving={isSaving}
      isInvalid={isInvalid}
    />
  );
};

/**
 * This component is responsible for rendering either the search/close buttons
 * or the save/cancel, depending on the isDirty prop. It is not meant to be
 * used directly by consumers (who instead use the SettingsSaveCancel
 * component, which uses this under the hood)
 */
const HeaderActionArea = ({
  children,
  ...headerActionAreaButtonProps
}: HeaderActionAreaProps) => (
  <Flex alignItems="center">
    {children}
    <HeaderActionAreaButtons {...headerActionAreaButtonProps} />
  </Flex>
);

/**
 * This component renders the Search/Close buttons if the Exit has no children.
 * This handles the case where Settings Features do not have a save/cancel
 * (and so therefore don't attempt to render anything through the tunnel)
 */
const HeaderActionAreaExitRenderer = (props: any) => {
  if (!props?.children) {
    return <SearchCloseButtons />;
  }
  return props.children;
};

/**
 * This exit component renders whatever was sent through the tunnel
 * (generally should consist of the HeaderActionArea component above)
 */
export const HeaderActionAreaExit = () => (
  <Exit
    tunnelKey={HEADER_ACTION_AREA_EXIT_KEY}
    render={HeaderActionAreaExitRenderer}
  />
);

export default withRouter(({ router, location, ...props }: HeaderActionAreaProps & WithRouterComponentProps) => {
  const ensureCleanState = useEnsureClean({
    router,
    location,
    isDirty: props.isDirty,
    onDiscardClick: props.onCancel,
  });

  return (
    <Tunnel tunnelKey={HEADER_ACTION_AREA_EXIT_KEY}>
      <StatefulReviewingChangesModal
        isReviewingChanges={ensureCleanState.isReviewingChanges}
        handleCancel={ensureCleanState.handleCancel}
        handleDiscard={ensureCleanState.handleDiscard}
      />
      <HeaderActionArea {...props} />
    </Tunnel>
  );
});

import React from 'react';

import { Stack } from '@sqs/rosetta-elements';
import { Button } from '@sqs/rosetta-primitives';

import { T } from '../../../../i18n/helpers';

export type SaveCancelButtonsProps = {
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
  isInvalid?: boolean;
};

/**
 * This is the view of the save & cancel buttons. It is meant only for internal usage
 */
export default ({
  onSave,
  onCancel,
  isSaving,
  isInvalid = false,
}: SaveCancelButtonsProps) => (
  <Stack
    direction="row"
    data-testid="settings-save-cancel-container"
    justifyContent="flex-end"
    space={4}
  >
    <Button.Tertiary
      onClick={onCancel}
      disabled={isSaving}
      data-testid="settings-cancel"
    >
      <T project="global-settings">Cancel</T>
    </Button.Tertiary>
    <Button.Primary
      onClick={onSave}
      disabled={isSaving || isInvalid}
      data-testid="settings-save"
    >
      <T project="global-settings">Save</T>
    </Button.Primary>
  </Stack>
);

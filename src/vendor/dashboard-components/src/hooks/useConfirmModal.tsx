import React from 'react';
import { createConfirmModal } from '@sqs/universal-utils';
import { Modal } from '@sqs/rosetta-elements';
import { AlertDialog } from '@sqs/rosetta-compositions';
import useI18n from '../i18n';

type Props = {
  onCancel?: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

function ConfirmModal({
  onCancel,
  onConfirm,
  title,
  message,
  confirmLabel,
  cancelLabel,
}: Props) {
  const { t } = useI18n();
  const defaultCancelLabel = t('Cancel', null, { project: 'dashboard-components' });
  const defaultConfirmLabel = t('Confirm', null, { project: 'dashboard-components' });

  const confirmButton = (
    <AlertDialog.Button key="confirm" onClick={onConfirm}>
      {confirmLabel || defaultConfirmLabel}
    </AlertDialog.Button>
  );

  const cancelButton = onCancel && (
    <AlertDialog.Button key="close" onClick={onCancel}>
      {cancelLabel || defaultCancelLabel}
    </AlertDialog.Button>
  );

  return (
    <Modal onRequestClose={onCancel || onConfirm} lockFocus={false}>
      <Modal.Overlay />
      <Modal.Position position="center">
        <AlertDialog
          title={title}
          message={message}
          buttons={cancelButton ? [cancelButton, confirmButton] : [confirmButton] }
        />
      </Modal.Position>
    </Modal>
  );
}

export const {
  ConfirmModalProvider,
  useConfirmModal,
  // We Omit 'onConfirm' & 'onCancel' since they get injected in the provider
} = createConfirmModal<Omit<Props, 'onConfirm' | 'onCancel'>>(
  ConfirmModal,
  ({ children }) => (
    <Modal.Transition>{children}</Modal.Transition>
  )
);


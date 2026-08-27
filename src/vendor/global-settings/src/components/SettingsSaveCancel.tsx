import React from 'react';

import { MenuHeader } from '@sqs/universal-panel-components';

import HeaderActionArea, {
  HeaderActionAreaProps,
} from './View/components/HeaderActionArea/HeaderActionArea';
import useSettingsModalContext from './useSettingsModalContext';

type MenuHeaderProps = React.ComponentPropsWithoutRef<typeof MenuHeader>;

export type SettingsSaveCancelProps =
  HeaderActionAreaProps &
  Pick<MenuHeaderProps, 'onBackClick'>;

const SettingsSaveCancel = ({ onBackClick, ...props }: SettingsSaveCancelProps) => {
  const { isSettingsModalEnabled } = useSettingsModalContext();
  if (!isSettingsModalEnabled) {
    const menuHeaderProps = {
      ...props,
      onSaveClick: props.onSave,
      onDiscardClick: props.onCancel,
    };
    return (<MenuHeader onBackClick={onBackClick} {...menuHeaderProps} />);
  }

  return (<HeaderActionArea {...props} />);
};

export default SettingsSaveCancel;

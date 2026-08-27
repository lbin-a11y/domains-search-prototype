import React from 'react';
import IconButton from './IconButton';
import TextButton from './TextButton';

export type CustomizeWidgetButtonProps = {
  sidebarTitle: string;
  sidebarBodyContent?: React.ReactNode;
  sidebarFooterContent?: React.ReactNode;
  onSidebarOpen?: () => void;
  onSidebarClose?: () => void;
};

const CustomizeWidgetButton = {
  Icon: IconButton,
  Text: TextButton,
};

export { CustomizeWidgetButton };

import React, { PropsWithChildren } from 'react';
import { Adjust } from '@sqs/rosetta-icons';
import { Touchable, TouchableProps } from '@sqs/rosetta-primitives';
import useI18n from '../../i18n';
import { CustomizationSidebar } from '../CustomizationSidebar';
import useCustomizationSidebar from './useCustomizationSidebar';
import { CustomizeWidgetButtonProps } from '.';

export type IconButtonProps = CustomizeWidgetButtonProps & TouchableProps;

const IconButton = ({
  children,
  sidebarBodyContent,
  sidebarFooterContent,
  sidebarTitle,
  onSidebarOpen,
  onSidebarClose,
  ...touchableProps
}: PropsWithChildren<IconButtonProps>) => {
  const { t } = useI18n();
  const {
    isCustomizationSidebarOpen,
    handleSidebarOpen,
    handleSidebarClose,
  } = useCustomizationSidebar({
    onSidebarOpen,
    onSidebarClose,
  });

  return (
    <>
      <Touchable.Element.Icon
        aria-label={t('Open widget customization sidebar panel', {}, { project: 'dashboard-framework' })}
        onClick={handleSidebarOpen}
        size="sizes.250"
        {...touchableProps}
      >
        {children ?? <Adjust />}
      </Touchable.Element.Icon>
      <CustomizationSidebar
        isOpen={isCustomizationSidebarOpen}
        onRequestClose={handleSidebarClose}
        title={sidebarTitle}
        footerContent={sidebarFooterContent}
      >
        {sidebarBodyContent}
      </CustomizationSidebar>
    </>
  );
};

export default IconButton;

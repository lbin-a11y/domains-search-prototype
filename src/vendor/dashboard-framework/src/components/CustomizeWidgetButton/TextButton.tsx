import React, { PropsWithChildren } from 'react';
import { Button, ButtonProps } from '@sqs/rosetta-primitives';
import useI18n from '../../i18n';
import { CustomizeWidgetButtonProps } from '.';
import { CustomizationSidebar } from '../CustomizationSidebar';
import useCustomizationSidebar from './useCustomizationSidebar';

export type TextButtonProps = CustomizeWidgetButtonProps & ButtonProps;

const TextButton = ({
  children,
  sidebarBodyContent,
  sidebarFooterContent,
  sidebarTitle,
  onSidebarOpen,
  onSidebarClose,
  ...buttonProps
}: PropsWithChildren<TextButtonProps>) => {
  const { T, t } = useI18n();
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
      <Button
        aria-label={t('Open widget customization sidebar panel', {}, { project: 'dashboard-framework' })}
        size="medium"
        variant="tertiary"
        onClick={handleSidebarOpen}
        {...buttonProps}
      >
        {children ?? (
          <T project="dashboard-framework">
            Customize
          </T>
        )}
      </Button>
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

export default TextButton;

import React from 'react';
import { Drawer } from '@sqs/rosetta-compositions';

type CustomizationSidebarProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  footerContent?: React.ReactNode;
  children?: React.ReactNode;
};

export const CustomizationSidebar = ({ isOpen, onRequestClose, title, footerContent, children }: CustomizationSidebarProps) => {
  return (
    <Drawer.Transition>
      {isOpen && (
        <Drawer.Modal onRequestClose={onRequestClose} data-testid="customization-sidebar">
          <Drawer.SideSheet>
            <Drawer.Header.WithoutBar.Large>
              <Drawer.Header.TitleRow>
                <Drawer.Header.Title.Large>{title}</Drawer.Header.Title.Large>
                <Drawer.CloseButton onClick={onRequestClose} />
              </Drawer.Header.TitleRow>
            </Drawer.Header.WithoutBar.Large>
            <Drawer.Body
              flexDirection="column"
              justifyContent="start"
              px="6"
              py="5"
            >
              {children}
            </Drawer.Body>

            {footerContent && (
              <Drawer.Footer
                flexDirection={{
                  _: 'row',
                  'mobile-*': 'column'
                }}
                justifyContent="end"
              >
                {footerContent}
              </Drawer.Footer>
            )}
          </Drawer.SideSheet>
        </Drawer.Modal>
      )}
    </Drawer.Transition>
  );
};

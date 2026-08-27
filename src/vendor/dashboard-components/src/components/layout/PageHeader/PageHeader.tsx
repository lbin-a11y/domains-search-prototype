import React from 'react';
import { Grid } from '@sqs/rosetta-elements';
import { PageHeader } from '@sqs/rosetta-compositions';
import { isNewClarksonChatUX } from '@sqs/clarkson-chat/experiments';
import SettingsMenu, { SettingsItem } from './SettingsMenu';
import DropdownMenu, { DropdownItem } from './DropdownMenu';
import DashboardSection from '../Section';
import { Columns } from '../constants';
import { useUnsafeAnalyticEvents } from '../../../utils/eventing/provider';
import { useIsMobileOrTablet } from '../../../hooks/usePlatform';
import { Button, Flex } from '@sqs/rosetta-primitives';
import useI18n from '../../../i18n';
import { ChevronLargeLeft } from '@sqs/rosetta-icons';
import useNavigation from '../../../hooks/useNavigation';
import { CmsRoutes } from '../../../constants';

export type PageHeaderProps = {
  title: string;
  subtitle?: string;
  settingsItems: SettingsItem[];
  dropdownLabel: string;
  dropdownItems: DropdownItem[];
  titleAccessory?: React.ReactNode;
  onOpenDropdownMenu?: () => void;
  onOpenSettingsMenu?: () => void;
};

// PageHeader component for L1-2 Dashboards
export default ({
  title,
  subtitle,
  settingsItems,
  dropdownLabel,
  dropdownItems,
  titleAccessory,
  onOpenSettingsMenu,
  onOpenDropdownMenu
}: PageHeaderProps) => {
  const { push } = useNavigation();
  const { events } = useUnsafeAnalyticEvents();
  const isMobileOrTablet = useIsMobileOrTablet();
  const { t, T } = useI18n();
  const isNewClarksonChatUXEnabled = isNewClarksonChatUX();

  const handleOpenSettingsMenu = () => {
    events?.userClicksSettingsIcon();
    onOpenSettingsMenu?.();
  };

  const handleOpenDropdownMenu = () => {
    events?.userClicksCreateMenu();
    onOpenDropdownMenu?.();
  };

  return (
    <DashboardSection>
      <Grid.Item columns={Columns.FULL}>
        <PageHeader
          pb={isNewClarksonChatUXEnabled ? 4 : 6}
          pt={isMobileOrTablet ? 2 : 6}
          px={0}
          m={0}
        >
          <PageHeader.Body
            width="100%"
            mx="auto"
            flexDirection={isMobileOrTablet ? 'column-reverse' : 'row'}
          >
            <PageHeader.Title
              title={title}
              subtitle={subtitle}
              titleAccessory={titleAccessory}
            />
            <PageHeader.Actions alignItems="center" justifyContent="flex-end" gap={3}>
              {isMobileOrTablet && (
                <Button.Base
                  mr="auto"
                  onClick={() => push(CmsRoutes.HOME)}
                  aria-label={t('Back', null, { project: 'dashboard-components' })}
                >
                  <ChevronLargeLeft />
                  <T project="dashboard-components">
                    Back
                  </T>
                </Button.Base>
              )}
              <Flex gap={3} alignItems="center">
                <SettingsMenu
                  items={settingsItems}
                  onOpenSettingsMenu={handleOpenSettingsMenu}
                />
                {dropdownItems?.length > 0 && (
                  <DropdownMenu
                    label={dropdownLabel}
                    items={dropdownItems}
                    onOpenDropdownMenu={handleOpenDropdownMenu}
                  />
                )}
              </Flex>
            </PageHeader.Actions>
          </PageHeader.Body>
        </PageHeader>
      </Grid.Item>
    </DashboardSection>
  );
};

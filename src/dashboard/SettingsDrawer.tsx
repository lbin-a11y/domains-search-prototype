import { useState } from 'react';
import { Drawer, NavMenu } from '@sqs/rosetta-compositions';
import { Toggle } from '@sqs/rosetta-elements';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Button } from '@sqs/rosetta-react/button/next';
import { Text } from '@sqs/rosetta-react/text/next';

import { website } from '../mocks/data';

type SettingsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SECTIONS = [
  { id: 'Site information', description: 'Title, description, and language' },
  { id: 'Scheduling', description: 'Hours, buffers, and deposits' },
  { id: 'Domains', description: 'Connected domains and DNS' },
  { id: 'Billing', description: 'Plan and payment method' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

const SettingRow = ({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children?: React.ReactNode;
}) => (
  <Flex
    justifyContent="space-between"
    alignItems="center"
    gap={4}
    py={4}
    sx={{ borderBottom: '1px solid', borderColor: 'border.default' }}
  >
    <Box flex="1 1 auto">
      <Text.Body m={0}>{label}</Text.Body>
      {description && (
        <Text.Body.Small color="fg.muted" m={0} mt={1}>
          {description}
        </Text.Body.Small>
      )}
    </Box>
    {children}
  </Flex>
);

const GeneralPanel = () => (
  <>
    <SettingRow label="Site title" description={website.title} />
    <SettingRow label="Site description" description="Modern color and cutting studio" />
    <SettingRow label="Language and region" description="English (United States)" />
    <SettingRow label="Time zone" description="Eastern Time — New York" />
  </>
);

const SchedulingPanel = () => {
  const [requireDeposit, setRequireDeposit] = useState(true);
  const [allowSameDay, setAllowSameDay] = useState(false);

  return (
    <>
      <SettingRow label="Booking hours" description="Tuesday – Saturday, 9:00 AM – 6:00 PM" />
      <SettingRow label="Buffer between appointments" description="15 minutes" />
      <SettingRow label="Require a deposit" description="Charge 20% at booking">
        <Toggle
          checked={requireDeposit}
          onChange={(checked: boolean) => setRequireDeposit(checked)}
          aria-label="Require a deposit"
        />
      </SettingRow>
      <SettingRow label="Allow same-day booking" description="Clients can book for today">
        <Toggle
          checked={allowSameDay}
          onChange={(checked: boolean) => setAllowSameDay(checked)}
          aria-label="Allow same-day booking"
        />
      </SettingRow>
    </>
  );
};

const DomainsPanel = () => (
  <>
    <SettingRow label="Primary domain" description={website.primaryDomain} />
    <SettingRow label="Built-in domain" description={`${website.identifier}.squarespace.com`} />
    <SettingRow label="SSL" description="Secure — certificate active" />
  </>
);

const BillingPanel = () => (
  <>
    <SettingRow label="Plan" description={`${website.plan} — renews annually`} />
    <SettingRow label="Payment method" description="Visa ending 4242" />
    <SettingRow label="Billing email" description="maya@ivyandash.com" />
  </>
);

const PANELS: Record<SectionId, () => JSX.Element> = {
  'Site information': GeneralPanel,
  Scheduling: SchedulingPanel,
  Domains: DomainsPanel,
  Billing: BillingPanel,
};

/**
 * Website settings, built on the Rosetta `Drawer` navigation variant.
 *
 * config-frontend's `@sqs/global-settings` is the same shape — a left nav
 * listing settings sections against a content pane, with save and cancel in the
 * footer — but it composes the deprecated Modal/NavDialog inside a universal
 * panel host and routes each section through `SettingsSubRouter`. `Drawer` is
 * the component that pattern migrates to, so this uses it directly.
 */
export const SettingsDrawer = ({ isOpen, onClose }: SettingsDrawerProps) => {
  const [activeSection, setActiveSection] = useState<SectionId>('Site information');
  const [showNav, setShowNav] = useState(false);

  const Panel = PANELS[activeSection];
  const description = SECTIONS.find((section) => section.id === activeSection)?.description;

  return (
    <Drawer.Transition>
      {isOpen && (
        <Drawer.Modal onRequestClose={onClose}>
          <Drawer.Overlay />
          <Drawer.Sheet>
            <Drawer.Header>
              <Drawer.Header.TitleRow>
                <Drawer.Header.Title>Settings</Drawer.Header.Title>
                <Drawer.CloseButton onClick={onClose} />
              </Drawer.Header.TitleRow>
              <Drawer.ShowNavigationButton
                onClick={() => setShowNav((show) => !show)}
                show={showNav}
              >
                {activeSection}
              </Drawer.ShowNavigationButton>
            </Drawer.Header>

            <Drawer.Body
              flexDirection={{ _: 'row', 'mobile-*': 'column' }}
              overflowY="hidden"
            >
              <Drawer.NavigationContainer show={showNav}>
                <NavMenu
                  onChange={(section: SectionId) => {
                    setActiveSection(section);
                    setShowNav(false);
                  }}
                  value={activeSection}
                >
                  <NavMenu.NavGroup>
                    {SECTIONS.map((section) => (
                      <NavMenu.NavItem key={section.id} value={section.id}>
                        <NavMenu.NavText variant="subtitle">{section.id}</NavMenu.NavText>
                      </NavMenu.NavItem>
                    ))}
                  </NavMenu.NavGroup>
                </NavMenu>
              </Drawer.NavigationContainer>

              <Box flexGrow={1} overflowY="auto" px={7} py={5}>
                <Text.Heading.Large as="h2" m={0}>
                  {activeSection}
                </Text.Heading.Large>
                {description && (
                  <Text.Body color="fg.muted" m={0} mt={1} mb={4}>
                    {description}
                  </Text.Body>
                )}
                <Panel />
              </Box>
            </Drawer.Body>

            <Drawer.Footer>
              <Flex gap={2} justifyContent="flex-end" width="100%">
                <Button.Alt onClick={onClose}>Cancel</Button.Alt>
                <Button.Strong onClick={onClose}>Save</Button.Strong>
              </Flex>
            </Drawer.Footer>
          </Drawer.Sheet>
        </Drawer.Modal>
      )}
    </Drawer.Transition>
  );
};

export default SettingsDrawer;

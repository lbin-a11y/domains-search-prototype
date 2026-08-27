import { useState, type ReactNode } from 'react';
import { Chip, Toggle } from '@sqs/rosetta-elements';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Button } from '@sqs/rosetta-react/button/next';
import { Text } from '@sqs/rosetta-react/text/next';

import { AccountHeader } from '../components/AccountHeader';
import { DomainNav } from '../components/DomainNav';
import { MOBILE } from '../components/breakpoints';
import { MobileMenuButton } from '../components/MobileMenuButton';
import { domain, website } from '../../mocks/data';

/**
 * Domain overview.
 *
 * Built to the Domains pattern library frame (node 87:964): header region with
 * the site thumbnail and status, a row of key figure cards carrying the
 * registration toggles, registration information with contact tabs, the
 * Blueprint AI cross-sell, and the destructive actions row beneath.
 */

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const BORDER = '1px solid';

const HelpGlyph = () => (
  <Box aria-hidden sx={{ display: 'inline-flex', color: 'fg.muted' }}>
    <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9 8.6a2 2 0 1 1 2.6 1.9c-.4.2-.6.5-.6.9v.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="11" cy="15" r="0.9" fill="currentColor" />
    </svg>
  </Box>
);

/**
 * One of the registration key figures. The figure sits above a footer holding
 * the toggle that controls it and an optional text link.
 */
const KeyFigureCard = ({
  title,
  figure,
  toggleLabel,
  isOn,
  onToggle,
  link,
  isFirst,
}: {
  title: string;
  figure: ReactNode;
  toggleLabel: string;
  isOn: boolean;
  onToggle: (checked: boolean) => void;
  link?: string;
  isFirst?: boolean;
}) => (
  <Flex
    flexDirection="column"
    justifyContent="flex-end"
    px={7}
    py={2}
    sx={{
      flex: '1 1 0',
      minWidth: 0,
      borderLeft: isFirst ? undefined : BORDER,
      borderColor: 'border.default',
      [MOBILE]: {
        borderLeft: 'none',
        borderBottom: BORDER,
        borderColor: 'border.default',
        px: 0,
      },
    }}
  >
    <Flex alignItems="center" gap={1} py={2}>
      <Text.Eyebrow as="span" color="fg.muted" m={0}>
        {title}
      </Text.Eyebrow>
      <HelpGlyph />
    </Flex>
    <Box pt={2}>
      <Text.Bold as="span" m={0} sx={{ fontSize: '16px', lineHeight: '22px' }}>
        {figure}
      </Text.Bold>
    </Box>
    <Flex alignItems="center" justifyContent="space-between" sx={{ minHeight: 38 }}>
      <Flex alignItems="center" gap={1}>
        <Toggle
          checked={isOn}
          onChange={(checked: boolean) => onToggle(checked)}
          aria-label={toggleLabel}
        />
        <Text.Body.Small color="fg.muted" m={0}>
          {toggleLabel}
        </Text.Body.Small>
      </Flex>
      {link && (
        <Text.Body.Small
          color="fg.muted"
          m={0}
          sx={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          {link}
        </Text.Body.Small>
      )}
    </Flex>
  </Flex>
);

const CONTACT_TABS = ['Admin', 'Billing', 'Owner', 'Tech'];

const REGISTRANT = [
  'Maya Okonkwo',
  '1240 Bedford Avenue',
  'Brooklyn, NY 11216',
  '718-555-0142',
  'maya@ivyandash.com',
];

export const DomainHome = () => {
  const [autoRenew, setAutoRenew] = useState(domain.autoRenew);
  const [privacy, setPrivacy] = useState(domain.privacyEnabled);
  const [isLocked, setIsLocked] = useState(true);
  const [activeTab, setActiveTab] = useState('Admin');

  return (
    <Box backgroundColor="base" minHeight="100vh">
      <AccountHeader />
      <Flex alignItems="flex-start">
        <Box sx={{ display: 'contents', [MOBILE]: { display: 'none' } }}>
          <DomainNav domainName={domain.name} activeLink="Overview" />
        </Box>

        <Box
          flex="1 1 auto"
          minWidth={0}
          p={7}
          sx={{ [MOBILE]: { px: 3, py: 3 } }}
        >
          <MobileMenuButton />
          <Flex flexDirection="column" gap={7} sx={{ [MOBILE]: { gap: 4 } }}>
            {/* Header region: thumbnail, domain, status, provider */}
            <Flex
              alignItems="center"
              gap={7}
              p={7}
              sx={{
                border: BORDER,
                borderColor: 'border.default',
                [MOBILE]: {
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  gap: 2,
                  border: 'none',
                  p: 0,
                },
              }}
            >
              <Box
                sx={{
                  width: 191,
                  height: 110,
                  flex: '0 0 auto',
                  backgroundColor: website.thumbnailColor,
                  borderRadius: 1,
                  [MOBILE]: { width: '100%', aspectRatio: '190.9 / 110', height: 'auto' },
                }}
              />
              <Flex flexDirection="column" flex="1 1 auto" minWidth={0}>
                <Flex alignItems="center" gap={2} py={1}>
                  <Text.Heading.Large as="h1" m={0}>
                    {domain.name}
                  </Text.Heading.Large>
                  <Chip status="success" label="Active" />
                </Flex>
                <Text.Bold as="span" color="fg.muted" m={0}>
                  Provider: Squarespace
                </Text.Bold>
              </Flex>
            </Flex>

            {/* Registration key figures */}
            <Flex
              alignItems="stretch"
              sx={{ [MOBILE]: { flexDirection: 'column' } }}
            >
              <KeyFigureCard
                isFirst
                title="Expires on"
                figure={
                  <>
                    {dateFormatter.format(new Date(domain.expiresAt))}
                    <Text.Body as="span" color="fg.muted" m={0} sx={{ fontSize: '16px' }}>
                      {' for '}
                    </Text.Body>
                    USD 24
                  </>
                }
                toggleLabel="Auto-renew"
                isOn={autoRenew}
                onToggle={setAutoRenew}
                link="Add years"
              />
              <KeyFigureCard
                title="WHOIS privacy"
                figure={privacy ? 'On' : 'Off'}
                toggleLabel="Private registration"
                isOn={privacy}
                onToggle={setPrivacy}
                link="WHOIS info"
              />
              <KeyFigureCard
                title="Domain lock"
                figure={isLocked ? 'On' : 'Off'}
                toggleLabel="Lock"
                isOn={isLocked}
                onToggle={setIsLocked}
              />
            </Flex>

            {/* Registration information + cross-sell */}
            <Flex
              gap={7}
              alignItems="stretch"
              flexWrap="wrap"
              sx={{ [MOBILE]: { gap: 4 } }}
            >
              <Flex
                flexDirection="column"
                p={7}
                sx={{
                  flex: '1 1 420px',
                  minWidth: 0,
                  border: BORDER,
                  borderColor: 'border.default',
                }}
              >
                <Flex alignItems="flex-start" gap={1} mb={1}>
                  <Text.Bold
                    as="h2"
                    m={0}
                    flex="1 1 auto"
                    sx={{ fontSize: '16px', [MOBILE]: { fontSize: '18px', lineHeight: '24px' } }}
                  >
                    Registration Information
                  </Text.Bold>
                  <Button.Subtle size="small">Edit</Button.Subtle>
                </Flex>

                <Flex
                  alignItems="center"
                  gap={5}
                  sx={{
                    height: 56,
                    borderBottom: BORDER,
                    borderColor: 'border.default',
                  }}
                >
                  {CONTACT_TABS.map((tab) => {
                    const isActive = tab === activeTab;
                    return (
                      <Flex
                        key={tab}
                        alignItems="center"
                        onClick={() => setActiveTab(tab)}
                        sx={{
                          height: '100%',
                          cursor: 'pointer',
                          borderBottom: isActive ? '2px solid' : '2px solid transparent',
                          borderColor: isActive ? 'fg.default' : 'transparent',
                        }}
                      >
                        <Text.Bold
                          as="span"
                          m={0}
                          color={isActive ? 'fg.default' : 'fg.muted'}
                        >
                          {tab}
                        </Text.Bold>
                      </Flex>
                    );
                  })}
                </Flex>

                <Box py={4}>
                  {REGISTRANT.map((line) => (
                    <Text.Body key={line} color="fg.muted" m={0}>
                      {line}
                    </Text.Body>
                  ))}
                </Box>
              </Flex>

              <Flex
                sx={{
                  flex: '0 1 540px',
                  minWidth: 320,
                  minHeight: 293,
                  backgroundColor: '#f2f1ec',
                  borderRadius: 2,
                  overflow: 'hidden',
                  [MOBILE]: {
                    flexDirection: 'column-reverse',
                    minWidth: 0,
                    flex: '1 1 auto',
                    minHeight: 0,
                  },
                }}
              >
                <Flex
                  flexDirection="column"
                  justifyContent="space-between"
                  p={5}
                  sx={{ width: 265, flex: '0 0 265px', [MOBILE]: { width: '100%', flex: '1 1 auto' } }}
                >
                  <Text.Body m={0} sx={{ fontSize: '18px', lineHeight: '27px' }}>
                    Bring your custom{' '}
                    <Box as="span" sx={{ textDecoration: 'underline', color: 'fg.muted' }}>
                      hair salon
                    </Box>{' '}
                    website to life using power of Blueprint AI.
                  </Text.Body>
                  <Box mt={4}>
                    <Button.Alt sx={{ [MOBILE]: { width: '100%' } }}>Create website</Button.Alt>
                  </Box>
                </Flex>
                <Box
                  aria-hidden
                  sx={{
                    flex: '1 1 auto',
                    minWidth: 0,
                    backgroundColor: '#2F4F45',
                    backgroundImage:
                      'linear-gradient(160deg, rgba(255,255,255,0.16) 0%, rgba(0,0,0,0.3) 100%)',
                    [MOBILE]: { flex: '0 0 275px', height: 275 },
                  }}
                />
              </Flex>
            </Flex>

            {/* Domain-level actions */}
            <Flex
              alignItems="center"
              gap={5}
              flexWrap="wrap"
              sx={{
                [MOBILE]: { flexDirection: 'column', alignItems: 'flex-start', gap: 0 },
              }}
            >
              <Button.Subtle size="small">Request transfer code</Button.Subtle>
              <Button.Subtle
                size="small"
                sx={{ color: 'fg.danger', [MOBILE]: { display: 'none' } }}
              >
                Cancel domain
              </Button.Subtle>
              <Button.Subtle size="small">Move domain</Button.Subtle>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default DomainHome;

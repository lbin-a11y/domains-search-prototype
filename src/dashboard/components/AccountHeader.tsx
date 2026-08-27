import { Link, useLocation } from 'react-router-dom';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Text } from '@sqs/rosetta-react/text/next';

import { accountContext } from '../../mocks/context';
import { MOBILE } from './breakpoints';

/**
 * Account-level top bar: Squarespace mark, the Dashboard / Domains tabs, and
 * the account links.
 *
 * Matches the Header component shared by the Domains pattern library frames
 * (node 43:67) — 76px tall, a 1px bottom hairline, and a 2px underline marking
 * the selected tab.
 */

const TABS = [
  { label: 'Dashboard', to: '/' },
  { label: 'Domains', to: '/domains' },
];

const HEADER_HEIGHT = 76;

const SquarespaceMark = () => (
  <Box as="span" sx={{ display: 'inline-flex', width: 22, height: 17 }} aria-label="Squarespace">
    <svg viewBox="0 0 34 26" width="22" height="17" fill="none" aria-hidden>
      <path
        d="M4.1 15.2a5.3 5.3 0 0 1 0-7.5l7.6-7.6a1.3 1.3 0 0 1 1.9 1.9L6 9.6a2.7 2.7 0 0 0 0 3.8 1.3 1.3 0 0 1-1.9 1.8Zm5.6 0a1.3 1.3 0 0 0 1.9 0l7.6-7.6a2.7 2.7 0 0 1 3.7 0 1.3 1.3 0 0 0 1.9-1.9 5.3 5.3 0 0 0-7.5 0l-7.6 7.6a1.3 1.3 0 0 0 0 1.9Zm19.9-6.9a1.3 1.3 0 0 0-1.9 1.9 2.7 2.7 0 0 1 0 3.8l-7.7 7.6a1.3 1.3 0 0 0 1.9 1.9l7.7-7.6a5.3 5.3 0 0 0 0-7.6Zm-5.7 5.7a1.3 1.3 0 0 0-1.8 0l-7.7 7.6a2.7 2.7 0 0 1-3.7 0 1.3 1.3 0 0 0-1.9 1.9 5.3 5.3 0 0 0 7.5 0l7.6-7.6a1.3 1.3 0 0 0 0-1.9Z"
        fill="currentColor"
      />
    </svg>
  </Box>
);

export const ACCOUNT_HEADER_HEIGHT = HEADER_HEIGHT;

export const AccountHeader = () => {
  const { pathname } = useLocation();

  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      px={5}
      backgroundColor="base"
      sx={{
        height: HEADER_HEIGHT,
        boxShadow: 'inset 0px -1px 0px 0px #ebebeb',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        [MOBILE]: {
          height: 'auto',
          flexDirection: 'column-reverse',
          alignItems: 'stretch',
          px: 3,
          pt: 3,
        },
      }}
    >
      <Flex
        alignItems="center"
        gap={2}
        flex="1 1 auto"
        minWidth={0}
        sx={{ [MOBILE]: { flex: '0 0 auto' } }}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          sx={{ size: 33, [MOBILE]: { display: 'none' } }}
        >
          <SquarespaceMark />
        </Flex>
        <Flex
          as="nav"
          alignItems="center"
          gap={5}
          sx={{ height: HEADER_HEIGHT, [MOBILE]: { height: 44 } }}
        >
          {TABS.map((tab) => {
            const isSelected =
              tab.to === '/' ? pathname === '/' : pathname.startsWith(tab.to);
            return (
              <Flex
                key={tab.to}
                alignItems="center"
                sx={{
                  height: '100%',
                  boxShadow: isSelected ? 'inset 0px -2px 0px 0px #313131' : undefined,
                }}
              >
                <Link to={tab.to} style={{ textDecoration: 'none' }}>
                  <Text.Bold
                    as="span"
                    color={isSelected ? 'fg.default' : 'fg.muted'}
                    m={0}
                  >
                    {tab.label}
                  </Text.Bold>
                </Link>
              </Flex>
            );
          })}
        </Flex>
      </Flex>

      <Flex
        alignItems="center"
        gap={5}
        justifyContent="flex-end"
        sx={{ [MOBILE]: { justifyContent: 'space-between', gap: 1 } }}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          sx={{ size: 22, display: 'none', [MOBILE]: { display: 'flex' } }}
        >
          <SquarespaceMark />
        </Flex>
        <Text.Bold
          as="span"
          color="fg.default"
          m={0}
          sx={{ [MOBILE]: { display: 'none' } }}
        >
          Help
        </Text.Bold>
        <Text.Bold
          as="span"
          color="fg.default"
          m={0}
          sx={{ [MOBILE]: { display: 'none' } }}
        >
          Account Settings
        </Text.Bold>
        {/* The account switcher only appears in the mobile frames; the desktop
            domains header carries Help and Account Settings instead. */}
        <Flex
          alignItems="center"
          gap={1}
          sx={{ ml: 'auto', display: 'none', [MOBILE]: { display: 'flex' } }}
        >
          <Text.Bold as="span" m={0}>
            Personal
          </Text.Bold>
          <Box aria-hidden sx={{ display: 'inline-flex', color: 'fg.default' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M7 9.5 11 13l4-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          sx={{
            size: 38,
            borderRadius: '50%',
            backgroundColor: '#2F4F45',
            flex: '0 0 auto',
          }}
          aria-label={accountContext.authenticatedAccount.firstName}
        >
          <Text.Bold as="span" color="fg.onStrong" m={0}>
            {accountContext.authenticatedAccount.firstName.charAt(0)}
          </Text.Bold>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccountHeader;

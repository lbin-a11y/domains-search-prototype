import type { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, Website } from '@sqs/rosetta-icons';

import { MaxWidth } from '@sqs/dashboard-components';
import { Box, Flex, Touchable } from '@sqs/rosetta-primitives';
import { Text } from '@sqs/rosetta-react/text/next';

type NavItem = {
  label: string;
  to: string;
  icon: typeof Home;
};

type DashboardShellProps = PropsWithChildren<{
  /** Title shown above the nav — the site or domain being managed. */
  contextTitle: string;
  contextSubtitle?: string;
  navItems: NavItem[];
  /** Rendered in the nav footer, e.g. the settings entry point. */
  footer?: React.ReactNode;
  backTo?: { label: string; to: string };
}>;

const NAV_WIDTH = 260;

/**
 * Stand-in for `@sqs/config-appshell` + `@sqs/config-persistent-navigation`.
 *
 * The upstream nav is driven by the V6 route registry, the custom-nav
 * preferences service and the microfrontend host, none of which exist here, so
 * this reproduces its layout — fixed left rail, context header, secondary
 * items, settings in the footer — over react-router.
 */
export const DashboardShell = ({
  children,
  contextTitle,
  contextSubtitle,
  navItems,
  footer,
  backTo,
}: DashboardShellProps) => {
  const { pathname } = useLocation();

  return (
    <Flex minHeight="100vh" backgroundColor="bg.subtle">
      <Box
        as="nav"
        width={NAV_WIDTH}
        flex={`0 0 ${NAV_WIDTH}px`}
        backgroundColor="base"
        sx={{
          borderRight: '1px solid',
          borderColor: 'border.default',
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box p={5}>
          {backTo && (
            <Link to={backTo.to} style={{ textDecoration: 'none' }}>
              <Text.Body.Small color="fg.muted" m={0} mb={3}>
                {`← ${backTo.label}`}
              </Text.Body.Small>
            </Link>
          )}
          <Text.Heading.Small m={0} as="span">{contextTitle}</Text.Heading.Small>
          {contextSubtitle && (
            <Text.Body.Small color="fg.muted" m={0} mt={1}>
              {contextSubtitle}
            </Text.Body.Small>
          )}
        </Box>

        <Box as="ul" px={3} sx={{ listStyle: 'none', m: 0, flex: 1 }}>
          {navItems.map(({ label, to, icon: Icon }) => {
            const isActive = pathname === to;
            return (
              <Box as="li" key={to} mb={1}>
                <Link to={to} style={{ textDecoration: 'none' }}>
                  <Flex
                    alignItems="center"
                    gap={3}
                    px={3}
                    py={2}
                    sx={{
                      borderRadius: 4,
                      backgroundColor: isActive ? 'bg.subtle' : 'transparent',
                    }}
                  >
                    <Icon size={16} />
                    <Text.Body
                      m={0}
                      color="fg.default"
                      fontWeight={isActive ? 'medium' : 'regular'}
                    >
                      {label}
                    </Text.Body>
                  </Flex>
                </Link>
              </Box>
            );
          })}
        </Box>

        {footer && (
          <Box p={3} sx={{ borderTop: '1px solid', borderColor: 'border.default' }}>
            {footer}
          </Box>
        )}
      </Box>

      <Box flex="1" minWidth={0}>
        <Box maxWidth={MaxWidth} mx="auto" px={8} pb={10}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

/** Nav footer entry that opens the settings drawer. */
export const SettingsNavButton = ({ onClick }: { onClick: () => void }) => (
  <Touchable onClick={onClick} sx={{ width: '100%', textAlign: 'left' }}>
    <Flex alignItems="center" gap={3} px={3} py={2}>
      <Settings size={16} />
      <Text.Body m={0}>Settings</Text.Body>
    </Flex>
  </Touchable>
);

export { Home, Website };

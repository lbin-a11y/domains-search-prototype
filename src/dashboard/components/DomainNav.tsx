import { Link } from 'react-router-dom';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Text } from '@sqs/rosetta-react/text/next';

/**
 * Left rail for the domain detail pages.
 *
 * Matches the Primary Navigation component in the Domains pattern library
 * (node 44:3528): a back button to the list, a domain switcher, the primary
 * links with a 2px underline on the active item, then the secondary links and
 * the LLC entry point pinned to the bottom.
 */

const NAV_WIDTH = 255;

const PRIMARY_LINKS = ['Overview', 'DNS', 'Website', 'Pay Links', 'Email'];
const SECONDARY_LINKS = ['Activity', 'Permissions'];

const BackGlyph = () => (
  <Box aria-hidden sx={{ display: 'inline-flex', color: 'fg.default' }}>
    <svg width="11" height="22" viewBox="0 0 11 22" fill="none">
      <path d="M8 6.5 4 11l4 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  </Box>
);

const DropdownGlyph = () => (
  <Box aria-hidden sx={{ display: 'inline-flex', color: 'fg.default' }}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M7 9.5 11 13l4-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  </Box>
);

const NavLink = ({ label, isActive }: { label: string; isActive?: boolean }) => (
  <Flex px={1} py="7px" alignItems="flex-start">
    <Box sx={{ position: 'relative' }}>
      <Text.Bold
        as="span"
        m={0}
        color={isActive ? 'fg.default' : 'fg.muted'}
        sx={{ fontSize: '16px', lineHeight: '22px' }}
      >
        {label}
      </Text.Bold>
      {isActive && (
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '20px',
            height: '2px',
            backgroundColor: 'fg.default',
          }}
        />
      )}
    </Box>
  </Flex>
);

export const DomainNav = ({
  domainName,
  activeLink = 'Overview',
}: {
  domainName: string;
  activeLink?: string;
}) => (
  <Flex
    as="nav"
    flexDirection="column"
    justifyContent="space-between"
    p={7}
    backgroundColor="base"
    sx={{
      width: NAV_WIDTH,
      flex: `0 0 ${NAV_WIDTH}px`,
      borderRight: '1px solid',
      borderColor: 'border.default',
      position: 'sticky',
      top: 76,
      height: 'calc(100vh - 76px)',
      overflowY: 'auto',
    }}
  >
    <Flex flexDirection="column" gap={4}>
      <Link to="/domains" style={{ textDecoration: 'none' }}>
        <Flex alignItems="center" gap={1} px={1} sx={{ minHeight: 36 }}>
          <BackGlyph />
          <Text.Eyebrow as="span" m={0}>
            Domains list
          </Text.Eyebrow>
        </Flex>
      </Link>

      <Flex
        alignItems="center"
        gap={1}
        pl={3}
        pr={2}
        sx={{
          height: 44,
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 1,
        }}
      >
        <Text.Body m={0} flex="1 1 auto" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {domainName}
        </Text.Body>
        <DropdownGlyph />
      </Flex>

      <Flex flexDirection="column">
        {PRIMARY_LINKS.map((label) => (
          <NavLink key={label} label={label} isActive={label === activeLink} />
        ))}
      </Flex>
    </Flex>

    <Flex flexDirection="column" gap={7}>
      <Flex flexDirection="column">
        {SECONDARY_LINKS.map((label) => (
          <NavLink key={label} label={label} />
        ))}
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        gap={2}
        px={3}
        sx={{
          minHeight: 44,
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 1,
        }}
      >
        <Text.Bold as="span" m={0}>
          Form an LLC
        </Text.Bold>
        <Flex
          alignItems="center"
          justifyContent="center"
          px={1}
          sx={{
            height: 16,
            border: '1px solid',
            borderColor: 'fg.accent',
            borderRadius: '3px',
          }}
        >
          <Text.Eyebrow as="span" color="fg.accent" m={0} sx={{ letterSpacing: 0 }}>
            New
          </Text.Eyebrow>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
);

export default DomainNav;

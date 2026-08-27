import { Flex, Box } from '@sqs/rosetta-primitives';
import { Text } from '@sqs/rosetta-react/text/next';

import { MOBILE } from './breakpoints';

const MenuGlyph = () => (
  <Box aria-hidden sx={{ display: 'inline-flex', color: 'fg.default' }}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  </Box>
);

/**
 * The MENU affordance the mobile frames use in place of page-level navigation —
 * on the domain detail pages it stands in for the whole left rail. Hidden above
 * the mobile breakpoint.
 */
export const MobileMenuButton = () => (
  <Flex
    alignItems="center"
    gap={1}
    sx={{
      display: 'none',
      minHeight: 44,
      cursor: 'pointer',
      [MOBILE]: { display: 'flex' },
    }}
  >
    <MenuGlyph />
    <Text.Eyebrow as="span" m={0}>
      Menu
    </Text.Eyebrow>
  </Flex>
);

export default MobileMenuButton;

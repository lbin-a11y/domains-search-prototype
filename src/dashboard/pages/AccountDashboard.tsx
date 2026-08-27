import { useNavigate } from 'react-router-dom';
import { Chip } from '@sqs/rosetta-elements';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Button } from '@sqs/rosetta-react/button/next';
import { Text } from '@sqs/rosetta-react/text/next';

import { AccountHeader } from '../components/AccountHeader';
import { MOBILE } from '../components/breakpoints';
import { MobileMenuButton } from '../components/MobileMenuButton';
import {
  type Column,
  ListCell,
  ListControl,
  ListControls,
  ListHeaderRow,
  ListPage,
  ListPagination,
  ListRow,
  ListToolbar,
} from '../components/ListChrome';
import { website } from '../../mocks/data';

/**
 * The account dashboard — the list of everything on the account.
 *
 * Follows the ZenBusiness dashboard frame (node 9855:13443) for the page
 * structure, with the project row content taken from node 9855:12890: name,
 * domain, plan chip, and a row of product CTAs.
 */

const COLUMNS: Column[] = [
  { label: '', width: 132, hideOnMobile: true },
  { label: 'Project', flex: '1 1 auto', minWidth: 240 },
  { label: 'Domain', width: 280, hideOnMobile: true },
  { label: 'Role', width: 80, hideOnMobile: true },
  { label: '', width: 60, align: 'right', hideOnMobile: true },
];

/** Product areas reachable from a project row. */
const PROJECT_CTAS = [
  'Website',
  'Selling',
  'Domains',
  'Email Campaigns',
  'Acuity Scheduling',
  'LLC Formation',
];

const RoleGlyph = () => (
  <Box aria-label="Owner" sx={{ display: 'inline-flex', color: 'fg.default' }}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="7.5" r="3.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 18c1.4-3 3.9-4.4 6.5-4.4S16.1 15 17.5 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  </Box>
);

const OverflowGlyph = () => (
  <Box aria-label="More actions" sx={{ display: 'inline-flex', color: 'fg.default' }}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="5" cy="11" r="1.6" fill="currentColor" />
      <circle cx="11" cy="11" r="1.6" fill="currentColor" />
      <circle cx="17" cy="11" r="1.6" fill="currentColor" />
    </svg>
  </Box>
);

export const AccountDashboard = () => {
  const navigate = useNavigate();
  const websitePath = `/websites/${website.identifier}`;

  return (
    <Box backgroundColor="base" minHeight="100vh">
      <AccountHeader />
      <ListPage>
        <MobileMenuButton />
        <ListToolbar
          title="Dashboard"
          actions={
            <Button.Strong sx={{ [MOBILE]: { width: '100%' } }}>Create website</Button.Strong>
          }
        />

        <ListControls>
          <ListControl label="Filter by Tag" />
          <ListControl label="Recently Edited" />
        </ListControls>

        <Flex alignItems="center" justifyContent="space-between" py={2} px={2}>
          <Text.Body.Small color="fg.muted" m={0}>
            1 project
          </Text.Body.Small>
        </Flex>

        <ListHeaderRow columns={COLUMNS} />

        <ListRow>
          <ListCell column={COLUMNS[0]}>
            <Box
              sx={{
                width: 110,
                height: 62,
                backgroundColor: website.thumbnailColor,
                borderRadius: 2,
              }}
            />
          </ListCell>

          <ListCell column={COLUMNS[1]}>
            <Flex flexDirection="column" gap={1} width="100%">
              <Text.Bold
                as="span"
                onClick={() => navigate(websitePath)}
                m={0}
                sx={{ cursor: 'pointer' }}
              >
                {website.title}
              </Text.Bold>
              <Text.Body color="fg.muted" m={0}>
                {website.plan}
              </Text.Body>
              <Text.Body
                color="fg.muted"
                m={0}
                sx={{ display: 'none', [MOBILE]: { display: 'block' } }}
              >
                {website.primaryDomain}
              </Text.Body>
              <Box>
                <Chip status="success" label="Active" />
              </Box>
              <Flex flexWrap="wrap" gap={2} mt={2}>
                {PROJECT_CTAS.map((cta) => (
                  <Button.Alt
                    key={cta}
                    size="small"
                    onClick={() => navigate(websitePath)}
                  >
                    {cta}
                  </Button.Alt>
                ))}
              </Flex>
            </Flex>
          </ListCell>

          <ListCell column={COLUMNS[2]}>
            <Text.Body m={0}>{website.primaryDomain}</Text.Body>
          </ListCell>

          <ListCell column={COLUMNS[3]}>
            <RoleGlyph />
          </ListCell>

          <ListCell column={COLUMNS[4]}>
            <OverflowGlyph />
          </ListCell>
        </ListRow>

        <ListPagination recordLabel="1 of 1 project" />
      </ListPage>
    </Box>
  );
};

export default AccountDashboard;

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
import { domains, website } from '../../mocks/data';

/**
 * The account's domains list.
 *
 * Built to the Domains pattern library frame (node 529:6652): toolbar with
 * transfer/purchase actions, a search and sort control bar, a four column table
 * with a site thumbnail, and the website cross-sell panel beneath it.
 */

const COLUMNS: Column[] = [
  { label: '', width: 132, hideOnMobile: true },
  { label: 'Domain', flex: '1 1 auto', minWidth: 240 },
  { label: 'Status', width: 154, hideHeaderOnMobile: true },
  { label: 'Provider', width: 154, hideHeaderOnMobile: true },
  { label: 'Expiration', width: 170, hideOnMobile: true },
];

const expiryFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const STATUS: Record<string, { label: string; status: 'success' | 'warning' | 'info' }> = {
  active: { label: 'Active', status: 'success' },
  expiring: { label: 'Expiring soon', status: 'warning' },
  pending: { label: 'Pending', status: 'info' },
};

const SortGlyph = () => (
  <Box aria-hidden sx={{ display: 'inline-flex', color: 'fg.default' }}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M6 15V5m0 0L3.5 7.5M6 5l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M11 7h8M11 11h6M11 15h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  </Box>
);

/** Auto-renew marker shown beside the expiry date. */
const RenewGlyph = () => (
  <Box aria-label="Auto-renews" sx={{ display: 'inline-flex', color: 'fg.default' }}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M18 11a7 7 0 0 1-11.9 5M4 11a7 7 0 0 1 11.9-5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M16 3v3.5h-3.5M6 19v-3.5h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  </Box>
);

/** "Suggested for you" website cross-sell beneath the table. */
const WebsiteCrossSell = () => (
  <Flex
    mt={7}
    sx={{
      backgroundColor: '#f2f1ec',
      border: '1px solid',
      borderColor: 'border.default',
      borderRadius: 2,
      overflow: 'hidden',
      minHeight: 220,
      [MOBILE]: { flexDirection: 'column-reverse', minHeight: 0 },
    }}
  >
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      pl={7}
      py={7}
      pr={5}
      sx={{ flex: '1 1 0', minWidth: 263, [MOBILE]: { px: 5, py: 5, minWidth: 0 } }}
    >
      <Box>
        <Text.Eyebrow as="span" color="fg.muted" m={0}>
          Suggested for you
        </Text.Eyebrow>
        <Text.Body m={0} mt={2} sx={{ fontSize: '18px', lineHeight: '27px' }}>
          Create a beautiful, professional website for your domain using the power of
          AI or our designer templates
        </Text.Body>
      </Box>
      <Box mt={5}>
        <Button.Strong sx={{ [MOBILE]: { width: '100%' } }}>Create website</Button.Strong>
      </Box>
    </Flex>
    <Box
      aria-hidden
      sx={{
        flex: '1 1 0',
        minWidth: 0,
        backgroundColor: '#2F4F45',
        backgroundImage:
          'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(0,0,0,0.25) 100%)',
        [MOBILE]: { flex: '0 0 168px', height: 168 },
      }}
    />
  </Flex>
);

export const DomainsList = () => {
  const navigate = useNavigate();

  return (
    <Box backgroundColor="base" minHeight="100vh">
      <AccountHeader />
      <ListPage>
        <MobileMenuButton />
        <ListToolbar
          title="Domains"
          actions={
            <>
              <Button.Alt sx={{ [MOBILE]: { width: '100%' } }}>Transfer domain</Button.Alt>
              <Button.Strong sx={{ [MOBILE]: { width: '100%' } }}>Get a domain</Button.Strong>
            </>
          }
        />

        <ListControls>
          <ListControl icon={<SortGlyph />} label="Domain (A-Z)" />
        </ListControls>

        <ListHeaderRow columns={COLUMNS} />

        {domains.map((record) => {
          const status = STATUS[record.status] ?? STATUS.active;
          return (
            <ListRow key={record.id}>
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
                <Flex flexDirection="column" gap={1}>
                  <Text.Bold
                    as="span"
                    m={0}
                    onClick={() => navigate(`/domains/${record.name}`)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {record.name}
                  </Text.Bold>
                  <Text.Body.Small color="fg.muted" m={0}>
                    {record.connectedSiteId
                      ? `Connected to ${website.title}`
                      : 'Not connected'}
                  </Text.Body.Small>
                </Flex>
              </ListCell>

              {/* On mobile these two sit side by side beneath the domain name,
                  in provider-then-status order as in the frame. */}
              <Flex
                alignItems="center"
                gap={2}
                sx={{
                  display: 'contents',
                  [MOBILE]: { display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-end' },
                }}
              >
                <ListCell column={COLUMNS[2]}>
                  <Chip status={status.status} label={status.label} />
                </ListCell>

                <ListCell column={COLUMNS[3]}>
                  <Text.Body color="fg.muted" m={0}>
                    Squarespace
                  </Text.Body>
                </ListCell>
              </Flex>

              <ListCell column={COLUMNS[4]}>
                <Flex alignItems="center" gap={2}>
                  {record.autoRenew && <RenewGlyph />}
                  <Text.Body m={0}>
                    {expiryFormatter.format(new Date(record.expiresAt))}
                  </Text.Body>
                </Flex>
              </ListCell>
            </ListRow>
          );
        })}

        <ListPagination recordLabel="1-1 of 1 items" />
        <WebsiteCrossSell />
      </ListPage>
    </Box>
  );
};

export default DomainsList;

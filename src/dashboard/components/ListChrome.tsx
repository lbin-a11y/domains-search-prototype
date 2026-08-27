import type { PropsWithChildren, ReactNode } from 'react';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Text } from '@sqs/rosetta-react/text/next';

import { MOBILE } from './breakpoints';

/**
 * The list-page furniture shared by the Dashboard and Domains frames: a page
 * toolbar, the search + controls bar above the table, the uppercase column
 * header row, and the pagination footer.
 *
 * Built from the Domains pattern library tokens — Border/default #E7E7E7 rules,
 * Desktop/Label (9.75px, 500, 0.75 tracking, uppercase, Foreground/muted) column
 * headers, and the 33px page gutter.
 */

const BORDER = '1px solid';

export const PAGE_GUTTER = 33;

export const ListPage = ({ children }: PropsWithChildren) => (
  <Box
    px={`${PAGE_GUTTER}px`}
    pb={10}
    backgroundColor="base"
    minHeight="100%"
    sx={{ [MOBILE]: { px: 3 } }}
  >
    {children}
  </Box>
);

/** Page title with its page-level actions on the right. */
export const ListToolbar = ({ title, actions }: { title: string; actions?: ReactNode }) => (
  <Flex
    alignItems="center"
    justifyContent="space-between"
    py={`${PAGE_GUTTER}px`}
    sx={{
      [MOBILE]: {
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 2,
        py: 4,
      },
    }}
  >
    <Text.Heading.Large as="h1" m={0}>
      {title}
    </Text.Heading.Large>
    {actions && (
      <Flex
        alignItems="center"
        gap={5}
        justifyContent="flex-end"
        sx={{
          // Full-width stacked buttons on mobile. The frames put the primary
          // action first, so the row order is reversed rather than wrapped.
          [MOBILE]: {
            flexDirection: 'column-reverse',
            alignItems: 'stretch',
            gap: 2,
          },
        }}
      >
        {actions}
      </Flex>
    )}
  </Flex>
);

/** Search on the left, sort/view controls on the right, ruled top and bottom. */
export const ListControls = ({
  searchPlaceholder = 'Search',
  children,
}: PropsWithChildren<{ searchPlaceholder?: string }>) => (
  <Flex
    alignItems="center"
    justifyContent="space-between"
    sx={{
      height: 45,
      borderTop: BORDER,
      borderBottom: BORDER,
      borderColor: 'border.default',
    }}
  >
    <Flex alignItems="center" gap={2} px={2} flex="1 1 auto" minWidth={0}>
      <Box aria-hidden sx={{ display: 'inline-flex', color: 'fg.muted' }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="9.5" cy="9.5" r="6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M14 14l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </Box>
      <Text.Body color="fg.muted" m={0}>
        {searchPlaceholder}
      </Text.Body>
    </Flex>
    {children && (
      <Flex alignItems="center" sx={{ height: '100%', [MOBILE]: { display: 'none' } }}>
        <Box
          aria-hidden
          sx={{ width: '1px', height: 22, backgroundColor: 'border.default', mx: 2 }}
        />
        <Flex alignItems="center" gap={4} pr={2}>
          {children}
        </Flex>
      </Flex>
    )}
  </Flex>
);

/** A control in the right-hand side of the controls bar. */
export const ListControl = ({ icon, label }: { icon?: ReactNode; label: string }) => (
  <Flex alignItems="center" gap={1}>
    {icon}
    <Text.Bold as="span" m={0}>
      {label}
    </Text.Bold>
  </Flex>
);

export type Column = {
  /** Rendered uppercase in the header row. Blank for the thumbnail column. */
  label: string;
  width?: number | string;
  flex?: string;
  minWidth?: number;
  align?: 'left' | 'right';
  /** Hidden entirely at mobile widths — header and cell. */
  hideOnMobile?: boolean;
  /**
   * Header hidden at mobile widths while the cell still renders. The mobile
   * frames keep only the first data column labelled and let the remaining
   * values read as part of the row body.
   */
  hideHeaderOnMobile?: boolean;
};

export const ListHeaderRow = ({ columns }: { columns: Column[] }) => (
  <Flex sx={{ borderBottom: BORDER, borderColor: 'border.default' }}>
    {columns.map((column, index) => (
      <Box
        key={`${column.label}-${index}`}
        px={2}
        py="14px"
        sx={{
          width: column.width,
          flex: column.flex,
          minWidth: column.minWidth,
          textAlign: column.align,
          [MOBILE]: column.hideOnMobile || column.hideHeaderOnMobile
            ? { display: 'none' }
            : { width: 'auto', flex: '1 1 auto', minWidth: 0 },
        }}
      >
        <Text.Eyebrow as="span" color="fg.muted" m={0}>
          {column.label}
        </Text.Eyebrow>
      </Box>
    ))}
  </Flex>
);

export const ListRow = ({ children }: PropsWithChildren) => (
  <Flex
    alignItems="center"
    sx={{
      borderBottom: BORDER,
      borderColor: 'border.default',
      minHeight: 89,
      // Mobile rows stack into a two-line block instead of table columns.
      [MOBILE]: {
        flexDirection: 'column',
        alignItems: 'stretch',
        minHeight: 0,
        py: 2,
        gap: 1,
      },
    }}
  >
    {children}
  </Flex>
);

export const ListCell = ({
  column,
  children,
}: PropsWithChildren<{ column: Column }>) => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    px={2}
    py={2}
    sx={{
      width: column.width,
      flex: column.flex,
      minWidth: column.minWidth,
      alignItems: column.align === 'right' ? 'flex-end' : 'flex-start',
      [MOBILE]: column.hideOnMobile
        ? { display: 'none' }
        : { width: 'auto', flex: '0 0 auto', minWidth: 0, px: 0, py: 0 },
    }}
  >
    {children}
  </Flex>
);

/** "20 per page" on the left, record count and page chevrons on the right. */
export const ListPagination = ({
  recordLabel,
  perPage = 20,
}: {
  recordLabel: string;
  perPage?: number;
}) => (
  <Flex
    alignItems="center"
    justifyContent="space-between"
    py={2}
    px={1}
    sx={{ [MOBILE]: { px: 0 } }}
  >
    <Flex alignItems="center" gap={1}>
      <Text.Body.Small color="fg.muted" m={0}>
        {`${perPage} per page`}
      </Text.Body.Small>
      <Box aria-hidden sx={{ display: 'inline-flex', color: 'fg.muted' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6.5 8 10l4-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </Box>
    </Flex>
    <Flex alignItems="center" gap={2}>
      <Box aria-hidden sx={{ display: 'inline-flex', color: 'fg.disabled' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3 5.5 8l4.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </Box>
      <Text.Body.Small color="fg.muted" m={0}>
        {recordLabel}
      </Text.Body.Small>
      <Box aria-hidden sx={{ display: 'inline-flex', color: 'fg.default' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l4.5 5L6 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </Box>
    </Flex>
  </Flex>
);

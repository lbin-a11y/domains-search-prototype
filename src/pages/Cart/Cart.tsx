import { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Box, Flex, Text, Button } from '@sqs/rosetta-primitives'
import {
  LogoSquarespace,
  Global,
  Trash,
  ChevronSmallDown,
  ChevronSmallRight,
} from '@sqs/rosetta-icons'

type DomainBadge = 'exact' | 'premium' | 'promoted'

interface DomainResult {
  id: string
  name: string
  tld: string
  badges: DomainBadge[]
  originalPrice: number
  salePrice: number | null
  available: boolean
}

// ── Breadcrumb ─────────────────────────────────────────────────────────────

function Breadcrumb() {
  const steps = ['Cart', 'Registration', 'Checkout']
  return (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'border.default',
        px: 6,
        py: 0,
        height: 56,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Flex alignItems="center" gap={0} sx={{ flex: 1 }}>
        <LogoSquarespace sx={{ width: 28, height: 28, mr: 6, flexShrink: 0 }} />
        <Flex alignItems="center" gap={1}>
          {steps.map((step, i) => (
            <Flex key={step} alignItems="center" gap={1}>
              {i > 0 && (
                <ChevronSmallRight sx={{ width: 16, height: 16, color: 'fg.muted' }} />
              )}
              <Text.Body
                m={0}
                sx={{
                  fontSize: '11px',
                  fontWeight: i === 0 ? 600 : 400,
                  color: i === 0 ? 'fg.default' : 'fg.muted',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderBottom: i === 0 ? '2px solid' : 'none',
                  borderColor: 'fg.default',
                  pb: i === 0 ? '2px' : 0,
                }}
              >
                {step}
              </Text.Body>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

// ── Domain card ────────────────────────────────────────────────────────────

function DomainCard({
  item,
  onRemove,
}: {
  item: DomainResult
  onRemove: (id: string) => void
}) {
  const price = item.salePrice ?? item.originalPrice
  const discountPct =
    item.salePrice !== null
      ? Math.round((1 - item.salePrice / item.originalPrice) * 100)
      : null

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: '4px',
        overflow: 'hidden',
        display: 'flex',
        width: '100%',
      }}
    >
      {/* Thumbnail */}
      <Box
        sx={{
          width: 117,
          minHeight: 160,
          flexShrink: 0,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #3a2a20 50%, #1a1a1a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(196,196,196,0.12)',
            backdropFilter: 'blur(4px)',
          }}
        />
        <Global sx={{ width: 26, height: 26, color: 'rgba(255,255,255,0.75)', position: 'relative', zIndex: 1 }} />
      </Box>

      {/* Content */}
      <Box sx={{ flex: '1 0 0', minWidth: 0, px: 5, py: 0 }}>
        <Box sx={{ height: 20 }} />

        {/* Name + badge */}
        <Flex alignItems="center" justifyContent="space-between" sx={{ gap: 3 }}>
          <Text.Body m={0} sx={{ fontSize: '15px', fontWeight: 500, color: 'fg.default', whiteSpace: 'nowrap' }}>
            {item.name}
          </Text.Body>
          {discountPct !== null && (
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'var(--colors-accent-fg, #0862d1)',
                borderRadius: '3px',
                px: '7px',
                py: '4px',
                flexShrink: 0,
              }}
            >
              <Text.Body
                m={0}
                sx={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'var(--colors-accent-fg, #0862d1)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {discountPct}% off first year
              </Text.Body>
            </Box>
          )}
        </Flex>

        <Box sx={{ height: 18 }} />

        {/* Term dropdown */}
        <Box sx={{ background: 'var(--colors-canvas-subtle, #f2f2f2)', px: '11px', py: '10px' }}>
          <Flex alignItems="center" justifyContent="space-between">
            <Text.Body m={0} sx={{ fontSize: '14px', color: 'fg.default' }}>
              1 year
            </Text.Body>
            <Flex alignItems="center" gap={2}>
              {item.salePrice !== null && (
                <Text.Body m={0} sx={{ fontSize: '14px', color: 'fg.muted', textDecoration: 'line-through' }}>
                  ${item.originalPrice}
                </Text.Body>
              )}
              <Text.Body m={0} sx={{ fontSize: '14px', fontWeight: 500, color: 'fg.default' }}>
                ${price}
              </Text.Body>
              <ChevronSmallDown sx={{ width: 20, height: 20, color: 'fg.default' }} />
            </Flex>
          </Flex>
        </Box>

        <Box sx={{ height: 14 }} />

        {/* Renewal + trash */}
        <Flex alignItems="flex-start" justifyContent="space-between" sx={{ gap: 3 }}>
          <Text.Body m={0} sx={{ fontSize: '12px', color: 'fg.muted', lineHeight: '16px' }}>
            Renews on{' '}
            <Box as="span" sx={{ fontWeight: 600 }}>
              Mar 18, 2026
            </Box>{' '}
            at ${item.originalPrice}.00 annually + taxes
          </Text.Body>
          <Box
            as="button"
            onClick={() => onRemove(item.id)}
            sx={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              color: 'fg.muted',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              mt: '1px',
              '&:hover': { color: 'fg.default' },
            }}
          >
            <Trash sx={{ width: 15, height: 15 }} />
          </Box>
        </Flex>

        <Box sx={{ height: 22 }} />
      </Box>
    </Box>
  )
}

// ── Order Summary panel ────────────────────────────────────────────────────

function OrderSummary({ items }: { items: DomainResult[] }) {
  const subtotal = items.reduce((sum, r) => sum + r.originalPrice, 0)
  const totalDiscounts = items.reduce(
    (sum, r) => sum + (r.salePrice !== null ? r.originalPrice - r.salePrice : 0),
    0,
  )
  const estimatedTotal = subtotal - totalDiscounts

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: '4px',
        p: 5,
        width: 300,
        flexShrink: 0,
        alignSelf: 'flex-start',
      }}
    >
      <Text.Body m={0} sx={{ fontSize: '18px', fontWeight: 500, color: 'fg.default', mb: 4 }}>
        Order Summary
      </Text.Body>

      {/* Domain section label */}
      <Flex alignItems="center" gap={2} sx={{ mb: 3 }}>
        <Global sx={{ width: 16, height: 16, color: 'fg.muted' }} />
        <Text.Body m={0} sx={{ fontSize: '13px', color: 'fg.muted' }}>
          Domain ({items.length})
        </Text.Body>
      </Flex>

      {/* Per-domain rows */}
      {items.map((item) => {
        const discount = item.salePrice !== null ? item.originalPrice - item.salePrice : 0
        const today = new Date()
        const nextYear = new Date(today)
        nextYear.setFullYear(today.getFullYear() + 1)
        const fmt = (d: Date) =>
          d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

        return (
          <Box key={item.id} sx={{ mb: 3 }}>
            <Flex justifyContent="space-between" sx={{ mb: '3px' }}>
              <Text.Body m={0} sx={{ fontSize: '13px', fontWeight: 500, color: 'fg.default' }}>
                {item.name}
              </Text.Body>
              <Text.Body m={0} sx={{ fontSize: '13px', color: 'fg.default', whiteSpace: 'nowrap' }}>
                1x ${item.originalPrice}.00
              </Text.Body>
            </Flex>
            <Text.Body m={0} sx={{ fontSize: '11px', color: 'fg.muted', mb: discount > 0 ? '2px' : 0 }}>
              {fmt(today)} – {fmt(nextYear)} (1 year)
            </Text.Body>
            {discount > 0 && (
              <>
                <Flex justifyContent="space-between">
                  <Text.Body m={0} sx={{ fontSize: '12px', color: 'fg.muted' }}>
                    First-year discount
                  </Text.Body>
                  <Text.Body
                    m={0}
                    sx={{ fontSize: '12px', color: 'var(--colors-accent-fg, #0862d1)', whiteSpace: 'nowrap' }}
                  >
                    -${discount}.00
                  </Text.Body>
                </Flex>
                <Text.Body m={0} sx={{ fontSize: '11px', color: 'fg.muted' }}>
                  {fmt(today)} – {fmt(nextYear)} (1 year)
                </Text.Body>
              </>
            )}
          </Box>
        )
      })}

      {/* Divider */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'border.default', my: 4 }} />

      {/* Totals */}
      <Flex justifyContent="space-between" sx={{ mb: 2 }}>
        <Text.Body m={0} sx={{ fontSize: '13px', color: 'fg.default' }}>Subtotal</Text.Body>
        <Text.Body m={0} sx={{ fontSize: '13px', color: 'fg.default' }}>${subtotal}.00</Text.Body>
      </Flex>
      {totalDiscounts > 0 && (
        <Flex justifyContent="space-between" sx={{ mb: 2 }}>
          <Text.Body m={0} sx={{ fontSize: '13px', color: 'fg.default' }}>Total Discounts</Text.Body>
          <Text.Body m={0} sx={{ fontSize: '13px', color: 'var(--colors-accent-fg, #0862d1)' }}>
            -${totalDiscounts}.00
          </Text.Body>
        </Flex>
      )}
      <Flex justifyContent="space-between" sx={{ mb: 2 }}>
        <Text.Body m={0} sx={{ fontSize: '13px', color: 'fg.default' }}>Estimated Tax</Text.Body>
        <Text.Body m={0} sx={{ fontSize: '13px', color: 'fg.muted' }}>—</Text.Body>
      </Flex>

      {/* Divider */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'border.default', my: 3 }} />

      <Flex justifyContent="space-between" sx={{ mb: 4 }}>
        <Text.Body m={0} sx={{ fontSize: '14px', fontWeight: 600, color: 'fg.default' }}>
          Estimated Total
        </Text.Body>
        <Text.Body m={0} sx={{ fontSize: '14px', fontWeight: 600, color: 'fg.default' }}>
          ${estimatedTotal}.00
        </Text.Body>
      </Flex>

      {/* Currency */}
      <Flex alignItems="center" gap={1}>
        <Text.Body m={0} sx={{ fontSize: '12px', color: 'fg.muted' }}>
          All prices are in{' '}
          <Box as="span" sx={{ textDecoration: 'underline' }}>$USD</Box>
        </Text.Body>
        <ChevronSmallDown sx={{ width: 16, height: 16, color: 'fg.muted' }} />
      </Flex>
    </Box>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function Cart() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as { items?: DomainResult[] } | null
  const initialItems: DomainResult[] = state?.items ?? []

  const [items, setItems] = useState<DomainResult[]>(initialItems)

  if (initialItems.length === 0) {
    return <Navigate to="/domain-search" replace />
  }

  const removeItem = (id: string) => {
    const next = items.filter((i) => i.id !== id)
    if (next.length === 0) {
      navigate('/domain-search', { replace: true })
    } else {
      setItems(next)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'canvas.default' }}>
      <Breadcrumb />

      {/* Page content */}
      <Box sx={{ maxWidth: 960, mx: 'auto', px: 6, pt: 7, pb: 8 }}>
        <Text.Body m={0} sx={{ fontSize: '28px', fontWeight: 500, lineHeight: '34px', mb: 5 }}>
          Cart Overview
        </Text.Body>

        <Flex alignItems="flex-start" sx={{ gap: 6 }}>
          {/* Left: domain list */}
          <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
            {/* Section header */}
            <Flex alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
              <Text.Body m={0} sx={{ fontSize: '14px', color: 'fg.default' }}>
                Domain ({items.length})
              </Text.Body>
              <Text.Body m={0} sx={{ fontSize: '14px', fontWeight: 500, color: 'fg.default' }}>
                ${items.reduce((s, r) => s + (r.salePrice ?? r.originalPrice), 0)}.00
              </Text.Body>
            </Flex>

            {/* Cards */}
            <Flex flexDirection="column" sx={{ gap: 3, mb: 5 }}>
              {items.map((item) => (
                <DomainCard key={item.id} item={item} onRemove={removeItem} />
              ))}
            </Flex>

            {/* CTA */}
            <Button.Primary
              sx={{
                width: '100%',
                height: 52,
                borderRadius: '2px',
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Continue to checkout
            </Button.Primary>
          </Box>

          {/* Right: order summary */}
          <OrderSummary items={items} />
        </Flex>
      </Box>
    </Box>
  )
}

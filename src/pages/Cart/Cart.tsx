import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Box, Flex, Text, Button } from '@sqs/rosetta-primitives'
import {
  LogoSquarespace,
  Global,
  Trash,
  ChevronSmallDown,
  ChevronSmallRight,
  Checkmark,
} from '@sqs/rosetta-icons'
import { InfoCircleFilled } from '@sqs/rosetta-glyphs'

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

// ── Pricing helpers ────────────────────────────────────────────────────────

const MAX_YEARS = 10
/** Minimum term length (years) required to unlock the first-year discount. */
const DISCOUNT_MIN_YEARS = 3

/** Price for a given term. First year gets the sale price only at DISCOUNT_MIN_YEARS+. */
function termPrice(item: DomainResult, years: number): number {
  const firstYear =
    item.salePrice !== null && years >= DISCOUNT_MIN_YEARS
      ? item.salePrice
      : item.originalPrice
  return firstYear + item.originalPrice * (years - 1)
}

/** Full (non-discounted) price for a given term. */
function termOriginalPrice(item: DomainResult, years: number): number {
  return item.originalPrice * years
}

/** Discount for a given term (0 if no salePrice). */
function termDiscount(item: DomainResult, years: number): number {
  return termOriginalPrice(item, years) - termPrice(item, years)
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
        height: 56,
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
      }}
    >
      <Flex alignItems="center" gap={0}>
        <LogoSquarespace sx={{ width: 28, height: 28, mr: 6, flexShrink: 0 }} />
        <Flex alignItems="center" gap={1} sx={{ '@media (max-width: 767px)': { display: 'none' } }}>
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

// ── Term dropdown ──────────────────────────────────────────────────────────

function TermDropdown({
  item,
  selectedYears,
  onSelect,
  onClose,
}: {
  item: DomainResult
  selectedYears: number
  onSelect: (years: number) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  return (
    <Box
      ref={ref}
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 100,
        background: '#fff',
        boxShadow: '0px 0px 1px rgba(0,0,0,0.08), 0px 4px 16px rgba(0,0,0,0.12)',
        py: '6px',
      }}
    >
      {Array.from({ length: MAX_YEARS }, (_, i) => i + 1).map((years) => {
        const orig = termOriginalPrice(item, years)
        const sale = termPrice(item, years)
        const hasDiscount = sale < orig
        const isSelected = years === selectedYears
        const label = years === 1 ? '1 year' : `${years} years`

        return (
          <Box
            key={years}
            as="button"
            onClick={() => { onSelect(years); onClose() }}
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: '11px',
              py: '11px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              '&:hover': { background: 'var(--colors-canvas-subtle, #f2f2f2)' },
            }}
          >
            {/* Label */}
            <Text.Body m={0} sx={{ fontSize: '14px', color: 'fg.default', flex: '1 0 0' }}>
              {label}
            </Text.Body>

            {/* Prices + checkmark */}
            <Flex alignItems="center" gap={2}>
              {hasDiscount && (
                <Text.Body
                  m={0}
                  sx={{ fontSize: '14px', color: '#878787', textDecoration: 'line-through' }}
                >
                  ${orig}
                </Text.Body>
              )}
              <Text.Body m={0} sx={{ fontSize: '14px', color: 'fg.default' }}>
                ${sale}
              </Text.Body>
              <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isSelected && <Checkmark sx={{ width: 14, height: 14, color: 'fg.default' }} />}
              </Box>
            </Flex>
          </Box>
        )
      })}
    </Box>
  )
}

// ── Domain card ────────────────────────────────────────────────────────────

function DomainCard({
  item,
  selectedYears,
  onTermChange,
  onRemove,
}: {
  item: DomainResult
  selectedYears: number
  onTermChange: (id: string, years: number) => void
  onRemove: (id: string) => void
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const price = termPrice(item, selectedYears)
  const orig = termOriginalPrice(item, selectedYears)
  const hasDiscount = price < orig
  const discountEligible = item.salePrice !== null && selectedYears >= DISCOUNT_MIN_YEARS
  const discountPct = discountEligible
    ? Math.round((1 - item.salePrice! / item.originalPrice) * 100)
    : null
  const showDiscountPrompt = item.salePrice !== null && selectedYears < DISCOUNT_MIN_YEARS
  const termLabel = selectedYears === 1 ? '1 year' : `${selectedYears} years`

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: '4px',
        overflow: 'visible',
        display: 'flex',
        width: '100%',
        background: '#fff',
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
          borderRadius: '3px 0 0 3px',
          overflow: 'hidden',
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
      <Box sx={{ flex: '1 0 0', minWidth: 0, px: 5 }}>
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

        {/* Term dropdown trigger */}
        <Box sx={{ position: 'relative' }}>
          <Box
            as="button"
            onClick={() => setDropdownOpen((o) => !o)}
            sx={{
              width: '100%',
              background: 'var(--colors-canvas-subtle, #f2f2f2)',
              border: 'none',
              cursor: 'pointer',
              px: '11px',
              py: '10px',
              textAlign: 'left',
            }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Text.Body m={0} sx={{ fontSize: '14px', color: 'fg.default' }}>
                {termLabel}
              </Text.Body>
              <Flex alignItems="center" gap={2}>
                {hasDiscount && (
                  <Text.Body m={0} sx={{ fontSize: '14px', color: 'fg.muted', textDecoration: 'line-through' }}>
                    ${orig}
                  </Text.Body>
                )}
                <Text.Body m={0} sx={{ fontSize: '14px', fontWeight: 500, color: 'fg.default' }}>
                  ${price}
                </Text.Body>
                <ChevronSmallDown sx={{ width: 20, height: 20, color: 'fg.default' }} />
              </Flex>
            </Flex>
          </Box>

          {dropdownOpen && (
            <TermDropdown
              item={item}
              selectedYears={selectedYears}
              onSelect={(years) => onTermChange(item.id, years)}
              onClose={() => setDropdownOpen(false)}
            />
          )}
        </Box>

        {showDiscountPrompt ? (
          <Flex alignItems="flex-start" sx={{ gap: '6px', mt: 3, mb: 3 }}>
            <InfoCircleFilled
              sx={{ width: 16, height: 16, color: 'var(--colors-accent-fg, #0862d1)', flexShrink: 0, mt: '1px' }}
            />
            <Text.Body
              m={0}
              sx={{
                fontSize: '12px',
                lineHeight: '16px',
                color: 'var(--colors-accent-fg, #0862d1)',
              }}
            >
              Get a first-year discount when you subscribe for {DISCOUNT_MIN_YEARS} or more years.
            </Text.Body>
          </Flex>
        ) : (
          <Box sx={{ height: 14 }} />
        )}

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

function OrderSummary({
  items,
  terms,
}: {
  items: DomainResult[]
  terms: Record<string, number>
}) {
  const subtotal = items.reduce((sum, r) => sum + termOriginalPrice(r, terms[r.id] ?? 1), 0)
  const totalDiscounts = items.reduce((sum, r) => sum + termDiscount(r, terms[r.id] ?? 1), 0)
  const estimatedTotal = subtotal - totalDiscounts

  const today = new Date()
  const endDate = (years: number) => {
    const d = new Date(today)
    d.setFullYear(d.getFullYear() + years)
    return d
  }
  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <Box
      sx={{
        background: 'var(--colors-canvas-subtle, #f5f5f5)',
        borderRadius: '4px',
        p: 5,
        width: 300,
        flexShrink: 0,
        alignSelf: 'flex-start',
        '@media (max-width: 767px)': {
          background: 'transparent',
          width: '100%',
          p: 0,
          alignSelf: 'stretch',
          borderTop: '1px solid',
          borderColor: 'border.default',
          pt: 5,
        },
      }}
    >
      <Text.Body m={0} sx={{ fontSize: '18px', fontWeight: 500, color: 'fg.default', mb: 4, '@media (max-width: 767px)': { display: 'none' } }}>
        Order Summary
      </Text.Body>

      {/* Domain section label — desktop only */}
      <Flex alignItems="center" gap={2} sx={{ mb: 3, '@media (max-width: 767px)': { display: 'none' } }}>
        <Global sx={{ width: 16, height: 16, color: 'fg.muted' }} />
        <Text.Body m={0} sx={{ fontSize: '13px', color: 'fg.muted' }}>
          Domain ({items.length})
        </Text.Body>
      </Flex>

      {/* Per-domain rows — desktop only */}
      {items.map((item) => {
        const years = terms[item.id] ?? 1
        const discount = termDiscount(item, years)

        return (
          <Box key={item.id} sx={{ mb: 3, '@media (max-width: 767px)': { display: 'none' } }}>
            <Flex justifyContent="space-between" sx={{ mb: '3px' }}>
              <Text.Body m={0} sx={{ fontSize: '13px', fontWeight: 500, color: 'fg.default' }}>
                {item.name}
              </Text.Body>
              <Text.Body m={0} sx={{ fontSize: '13px', color: 'fg.default', whiteSpace: 'nowrap' }}>
                {years}x ${item.originalPrice}.00
              </Text.Body>
            </Flex>
            {discount > 0 && (
              <Flex justifyContent="space-between" sx={{ mb: '3px' }}>
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
            )}
            <Text.Body m={0} sx={{ fontSize: '11px', color: 'fg.muted' }}>
              {fmt(today)} – {fmt(endDate(years))} ({years} {years === 1 ? 'year' : 'years'})
            </Text.Body>
          </Box>
        )
      })}

      {/* Divider — desktop only (mobile uses borderTop on the card itself) */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'border.default', my: 4, '@media (max-width: 767px)': { display: 'none' } }} />

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
  const [terms, setTerms] = useState<Record<string, number>>(
    () => Object.fromEntries(initialItems.map((i) => [i.id, DISCOUNT_MIN_YEARS])),
  )

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

  const handleTermChange = (id: string, years: number) => {
    setTerms((prev) => ({ ...prev, [id]: years }))
  }

  const subtotal = items.reduce((s, r) => s + (r.salePrice ?? r.originalPrice), 0)

  return (
    <Box sx={{ minHeight: '100vh', background: '#fff' }}>
      <Breadcrumb />

      <Box sx={{ maxWidth: 960, mx: 'auto', px: 6, pt: 7, pb: 8, '@media (max-width: 767px)': { px: 4, pt: 5, pb: 6 } }}>
        <Text.Body m={0} sx={{ fontSize: '28px', fontWeight: 500, lineHeight: '34px', mb: 5 }}>
          Cart Overview
        </Text.Body>

        <Flex
          alignItems="flex-start"
          sx={{
            gap: '64px',
            '@media (max-width: 767px)': { flexDirection: 'column', gap: '24px', alignItems: 'stretch' },
          }}
        >
          {/* Left: domain list */}
          <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
            <Flex alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
              <Text.Body m={0} sx={{ fontSize: '14px', color: 'fg.default' }}>
                Domain ({items.length})
              </Text.Body>
              <Text.Body m={0} sx={{ fontSize: '14px', fontWeight: 500, color: 'fg.default' }}>
                ${subtotal}.00
              </Text.Body>
            </Flex>

            <Flex flexDirection="column" sx={{ gap: 3, mb: 5 }}>
              {items.map((item) => (
                <DomainCard
                  key={item.id}
                  item={item}
                  selectedYears={terms[item.id] ?? 1}
                  onTermChange={handleTermChange}
                  onRemove={removeItem}
                />
              ))}
            </Flex>

            {/* Desktop CTA — hidden on mobile */}
            <Button.Primary
              sx={{
                width: '100%',
                height: 52,
                borderRadius: '2px',
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                '@media (max-width: 767px)': { display: 'none' },
              }}
            >
              Continue to checkout
            </Button.Primary>
          </Box>

          {/* Right: order summary */}
          <OrderSummary items={items} terms={terms} />

          {/* Mobile CTA — shown below order summary on mobile only */}
          <Box
            as="button"
            onClick={() => {}}
            sx={{
              display: 'none',
              '@media (max-width: 767px)': {
                display: 'block',
                width: '100%',
                background: '#000',
                color: '#fff',
                border: 'none',
                height: 52,
                cursor: 'pointer',
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 400,
              },
            }}
          >
            Continue to checkout
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

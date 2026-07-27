import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Box, Flex, Text, Button } from '@sqs/rosetta-primitives'
import {
  LogoSquarespace,
  Global,
  Trash,
  ChevronSmallDown,
  ChevronSmallUp,
  ChevronSmallRight,
  Checkmark,
} from '@sqs/rosetta-icons'
import { InfoCircleFilled } from '@sqs/rosetta-glyphs'

// ── Types ──────────────────────────────────────────────────────────────────

type DomainBadge = 'exact' | 'premium' | 'promoted'
type MyrVariant = 'divider' | 'label' | 'subtext'

interface MyrDiscount {
  type: 'flat' | 'incremental'
  minYears: number
  startPercent: number
  step?: number
}

interface DomainResult {
  id: string
  name: string
  tld: string
  badges: DomainBadge[]
  originalPrice: number
  salePrice: number | null
  available: boolean
}

// ── MYR discount data ──────────────────────────────────────────────────────

const TLD_MYR: Record<string, MyrDiscount> = {
  '.com':    { type: 'incremental', minYears: 3, startPercent: 30, step: 10 },
  '.net':    { type: 'flat',        minYears: 2, startPercent: 30 },
  '.org':    { type: 'flat',        minYears: 2, startPercent: 25 },
  '.co':     { type: 'incremental', minYears: 2, startPercent: 20, step: 10 },
  '.io':     { type: 'flat',        minYears: 3, startPercent: 30 },
  '.me':     { type: 'incremental', minYears: 2, startPercent: 15, step: 10 },
  '.live':   { type: 'flat',        minYears: 2, startPercent: 30 },
  '.store':  { type: 'flat',        minYears: 2, startPercent: 40 },
  '.studio': { type: 'incremental', minYears: 3, startPercent: 30, step: 10 },
  '.art':    { type: 'flat',        minYears: 2, startPercent: 20 },
  '.shop':   { type: 'flat',        minYears: 3, startPercent: 30 },
  '.online': { type: 'flat',        minYears: 2, startPercent: 40 },
  '.design': { type: 'incremental', minYears: 2, startPercent: 25, step: 10 },
}

function getDiscount(tld: string): MyrDiscount | null {
  return TLD_MYR[tld] ?? null
}

function getYearDiscount(years: number, discount: MyrDiscount): number | 'FREE' | null {
  if (years < discount.minYears) return null
  if (discount.type === 'flat') return discount.startPercent
  const pct = discount.startPercent + (years - discount.minYears) * (discount.step ?? 10)
  return pct >= 100 ? 'FREE' : pct
}

// ── Pricing helpers ────────────────────────────────────────────────────────

const MAX_YEARS = 10

function firstYearPrice(item: DomainResult, years: number): number {
  const disc = getDiscount(item.tld)
  if (disc) {
    const d = getYearDiscount(years, disc)
    if (d === 'FREE') return 0
    if (d !== null) return Math.round(item.originalPrice * (1 - d / 100))
  }
  return item.salePrice ?? item.originalPrice
}

function termPrice(item: DomainResult, years: number): number {
  return firstYearPrice(item, years) + item.originalPrice * (years - 1)
}

function termOriginalPrice(item: DomainResult, years: number): number {
  return item.originalPrice * years
}

function termDiscount(item: DomainResult, years: number): number {
  return termOriginalPrice(item, years) - termPrice(item, years)
}

// ── Variant helpers ────────────────────────────────────────────────────────

const VARIANT_KEY = 'myr-variant'

function readVariant(): MyrVariant {
  try {
    const v = localStorage.getItem(VARIANT_KEY)
    if (v === 'divider' || v === 'label' || v === 'subtext') return v
  } catch {}
  return 'divider'
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

// ── Term dropdown (desktop) ────────────────────────────────────────────────

function TermDropdown({
  item,
  selectedYears,
  variant,
  onSelect,
  onClose,
}: {
  item: DomainResult
  selectedYears: number
  variant: MyrVariant
  onSelect: (years: number) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const disc = getDiscount(item.tld)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  const years = Array.from({ length: MAX_YEARS }, (_, i) => i + 1)

  function renderRow(y: number, discLabel: React.ReactNode, caption?: React.ReactNode) {
    const isSelected = y === selectedYears
    const termLabel = y === 1 ? '1 year' : `${y} years`

    return (
      <Box
        key={y}
        as="button"
        onClick={() => { onSelect(y); onClose() }}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: caption ? 'flex-start' : 'center',
          gap: '8px',
          px: '11px',
          py: caption ? '9px' : '11px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          '&:hover': { background: 'var(--colors-canvas-subtle, #f2f2f2)' },
        }}
      >
        {/* Year label + optional caption */}
        <Box sx={{ flex: '1 0 0', minWidth: 0 }}>
          <Text.Body m={0} sx={{ fontSize: '14px', color: 'fg.default' }}>
            {termLabel}
          </Text.Body>
          {caption}
        </Box>

        {/* Right: discount label/chip + checkmark */}
        {discLabel}
        <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {isSelected && <Checkmark sx={{ width: 14, height: 14, color: 'fg.default' }} />}
        </Box>
      </Box>
    )
  }

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
      {variant === 'divider' && (() => {
        const noDisc = years.filter((y) => !disc || getYearDiscount(y, disc) === null)
        const withDisc = years.filter((y) => disc && getYearDiscount(y, disc) !== null)
        return (
          <>
            {noDisc.map((y) => renderRow(y, null))}
            {withDisc.length > 0 && (
              <>
                {/* Section divider */}
                <Flex alignItems="center" gap={3} px={3} py={2}>
                  <Box sx={{ flex: 1, height: '1px', background: '#e7e7e7' }} />
                  <Text.Caption
                    m={0}
                    sx={{ fontSize: '9.75px', fontWeight: 500, letterSpacing: '0.75px', textTransform: 'uppercase', color: '#666', whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    Save on your first year
                  </Text.Caption>
                  <Box sx={{ flex: 1, height: '1px', background: '#e7e7e7' }} />
                </Flex>
                {withDisc.map((y) => {
                  const d = disc ? getYearDiscount(y, disc) : null
                  const chip = d !== null ? (
                    <Box sx={{ px: '8px', py: '3px', borderRadius: 20, background: '#dbeafe', flexShrink: 0 }}>
                      <Text.Caption m={0} sx={{ fontSize: '11px', fontWeight: 500, color: '#0862d1', lineHeight: 1 }}>
                        {d === 'FREE' ? 'FREE' : `${d}%`} off
                      </Text.Caption>
                    </Box>
                  ) : null
                  return renderRow(y, chip)
                })}
              </>
            )}
          </>
        )
      })()}

      {variant === 'label' && years.map((y) => {
        const d = disc ? getYearDiscount(y, disc) : null
        const labelText = d === null ? null : d === 'FREE' ? 'FREE FIRST YEAR' : `${d}% OFF FIRST YEAR`
        const label = labelText ? (
          <Text.Caption m={0} sx={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.06em', color: '#0862d1', flexShrink: 0 }}>
            {labelText}
          </Text.Caption>
        ) : null
        return renderRow(y, label)
      })}

      {variant === 'subtext' && years.map((y) => {
        const d = disc ? getYearDiscount(y, disc) : null
        const captionText = d === null ? null : d === 'FREE' ? 'FREE first year' : `${d}% off first year`
        const caption = captionText ? (
          <Text.Caption m={0} sx={{ fontSize: '11px', color: '#0862d1', display: 'block', mt: '2px' }}>
            {captionText}
          </Text.Caption>
        ) : null
        return renderRow(y, null, caption)
      })}
    </Box>
  )
}

// ── Term bottom sheet (mobile) ────────────────────────────────────────────

function TermBottomSheet({
  item,
  selectedYears,
  variant,
  onSelect,
  onClose,
}: {
  item: DomainResult
  selectedYears: number
  variant: MyrVariant
  onSelect: (years: number) => void
  onClose: () => void
}) {
  const [visible, setVisible] = useState(false)
  const disc = getDiscount(item.tld)

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const years = Array.from({ length: MAX_YEARS }, (_, i) => i + 1)

  function sheetRow(y: number) {
    const label = y === 1 ? '1 year' : `${y} years`
    const isSelected = y === selectedYears
    const d = disc ? getYearDiscount(y, disc) : null
    const captionText = variant === 'subtext' && d !== null
      ? (d === 'FREE' ? 'FREE first year' : `${d}% off first year`)
      : null
    const inlineLabel = variant === 'label' && d !== null
      ? (d === 'FREE' ? 'FREE FIRST YEAR' : `${d}% OFF FIRST YEAR`)
      : null
    const chip = variant === 'divider' && d !== null
      ? (d === 'FREE' ? 'FREE' : `${d}%`) + ' off'
      : null

    return (
      <Box
        key={y}
        as="button"
        onClick={() => { onSelect(y); onClose() }}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          px: 4,
          py: '14px',
          background: 'none',
          border: 'none',
          borderBottom: '1px solid #eee',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 3,
        }}
      >
        <Box sx={{ flex: '1 0 0' }}>
          <Flex alignItems="center" gap={2}>
            <Text.Body m={0} sx={{ fontSize: '16px', color: 'fg.default' }}>{label}</Text.Body>
            {chip && (
              <Box sx={{ px: '8px', py: '3px', borderRadius: 20, background: '#dbeafe', flexShrink: 0 }}>
                <Text.Caption m={0} sx={{ fontSize: '11px', fontWeight: 500, color: '#0862d1', lineHeight: 1 }}>{chip}</Text.Caption>
              </Box>
            )}
            {inlineLabel && (
              <Text.Caption m={0} sx={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.06em', color: '#0862d1', flexShrink: 0 }}>
                {inlineLabel}
              </Text.Caption>
            )}
          </Flex>
          {captionText && (
            <Text.Caption m={0} sx={{ fontSize: '12px', color: '#0862d1', display: 'block', mt: '2px' }}>
              {captionText}
            </Text.Caption>
          )}
        </Box>
        <Box sx={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {isSelected && <Checkmark sx={{ width: 16, height: 16, color: 'fg.default' }} />}
        </Box>
      </Box>
    )
  }

  const noDiscYears = years.filter((y) => !disc || getYearDiscount(y, disc) === null)
  const discYears = years.filter((y) => disc && getYearDiscount(y, disc) !== null)

  return (
    <>
      <Box
        onClick={onClose}
        sx={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 400,
          opacity: visible ? 1 : 0, transition: 'opacity 0.25s ease',
        }}
      />
      <Box
        sx={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 401,
          background: '#fff', borderTopLeftRadius: 12, borderTopRightRadius: 12,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          maxHeight: '85vh', overflowY: 'auto',
        }}
      >
        <Flex alignItems="center" justifyContent="space-between" px={4} sx={{ height: 56, borderBottom: '1px solid #eee' }}>
          <Text.Body m={0} sx={{ fontSize: '16px', fontWeight: 600 }}>Select term length</Text.Body>
          <Box as="button" onClick={onClose} sx={{ background: 'none', border: 'none', cursor: 'pointer', p: 0 }}>
            <Text.Body m={0} sx={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Done</Text.Body>
          </Box>
        </Flex>

        {variant === 'divider' ? (
          <>
            {noDiscYears.map(sheetRow)}
            {discYears.length > 0 && (
              <>
                <Flex alignItems="center" gap={3} px={4} py={2} sx={{ borderTop: '1px solid #e7e7e7', borderBottom: '1px solid #e7e7e7' }}>
                  <Box sx={{ flex: 1, height: '1px', background: '#e7e7e7' }} />
                  <Text.Caption m={0} sx={{ fontSize: '9.75px', fontWeight: 500, letterSpacing: '0.75px', textTransform: 'uppercase', color: '#666', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Save on your first year
                  </Text.Caption>
                  <Box sx={{ flex: 1, height: '1px', background: '#e7e7e7' }} />
                </Flex>
                {discYears.map(sheetRow)}
              </>
            )}
          </>
        ) : (
          years.map(sheetRow)
        )}
      </Box>
    </>
  )
}

// ── Domain card ────────────────────────────────────────────────────────────

function DomainCard({
  item,
  selectedYears,
  variant,
  onTermChange,
  onRemove,
}: {
  item: DomainResult
  selectedYears: number
  variant: MyrVariant
  onTermChange: (id: string, years: number) => void
  onRemove: (id: string) => void
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const disc = getDiscount(item.tld)
  const price = termPrice(item, selectedYears)
  const orig = termOriginalPrice(item, selectedYears)
  const hasTermDiscount = price < orig

  const d = disc ? getYearDiscount(selectedYears, disc) : null
  const discountPct = d !== null && d !== 'FREE' ? d : d === 'FREE' ? 100 : null
  const showDiscountBadge = d !== null
  const showDiscountPrompt = disc !== null && d === null
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
          width: 117, minHeight: 160, flexShrink: 0,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #3a2a20 50%, #1a1a1a 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', borderRadius: '3px 0 0 3px', overflow: 'hidden',
          '@media (max-width: 767px)': { display: 'none' },
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, background: 'rgba(196,196,196,0.12)', backdropFilter: 'blur(4px)' }} />
        <Global sx={{ width: 26, height: 26, color: 'rgba(255,255,255,0.75)', position: 'relative', zIndex: 1 }} />
      </Box>

      {/* Content */}
      <Box sx={{ flex: '1 0 0', minWidth: 0, px: 5, '@media (max-width: 767px)': { px: 4 } }}>
        <Box sx={{ height: 20 }} />

        {/* Name + discount badge */}
        <Flex alignItems="center" justifyContent="space-between" sx={{ gap: 3 }}>
          <Text.Body m={0} sx={{ fontSize: '15px', fontWeight: 500, color: 'fg.default', whiteSpace: 'nowrap' }}>
            {item.name}
          </Text.Body>
          {showDiscountBadge && (
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
                {d === 'FREE' ? 'FREE first year' : `${discountPct}% off first year`}
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
                {hasTermDiscount && (
                  <Text.Body m={0} sx={{ fontSize: '14px', color: 'fg.muted', textDecoration: 'line-through' }}>
                    ${orig}
                  </Text.Body>
                )}
                <Text.Body m={0} sx={{ fontSize: '14px', fontWeight: 500, color: 'fg.default' }}>
                  ${price}
                </Text.Body>
                {dropdownOpen
                  ? <ChevronSmallUp sx={{ width: 20, height: 20, color: 'fg.default' }} />
                  : <ChevronSmallDown sx={{ width: 20, height: 20, color: 'fg.default' }} />
                }
              </Flex>
            </Flex>
          </Box>

          {/* Desktop dropdown */}
          <Box sx={{ '@media (max-width: 767px)': { display: 'none' } }}>
            {dropdownOpen && (
              <TermDropdown
                item={item}
                selectedYears={selectedYears}
                variant={variant}
                onSelect={(years) => onTermChange(item.id, years)}
                onClose={() => setDropdownOpen(false)}
              />
            )}
          </Box>

          {/* Mobile bottom sheet */}
          <Box sx={{ '@media (min-width: 768px)': { display: 'none' } }}>
            {dropdownOpen && (
              <TermBottomSheet
                item={item}
                selectedYears={selectedYears}
                variant={variant}
                onSelect={(years) => onTermChange(item.id, years)}
                onClose={() => setDropdownOpen(false)}
              />
            )}
          </Box>
        </Box>

        {showDiscountPrompt ? (
          <Flex alignItems="flex-start" sx={{ gap: '6px', mt: 3, mb: 3 }}>
            <InfoCircleFilled
              sx={{ width: 16, height: 16, color: 'var(--colors-accent-fg, #0862d1)', flexShrink: 0, mt: '1px' }}
            />
            <Text.Body
              m={0}
              sx={{ fontSize: '12px', lineHeight: '16px', color: 'var(--colors-accent-fg, #0862d1)' }}
            >
              Get a first-year discount when you subscribe for {disc!.minYears} or more years.
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
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              color: 'fg.muted', flexShrink: 0, display: 'flex', alignItems: 'center',
              mt: '1px', '&:hover': { color: 'fg.default' },
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

function OrderSummary({ items, terms }: { items: DomainResult[]; terms: Record<string, number> }) {
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
          background: 'transparent', width: '100%', p: 0, alignSelf: 'stretch',
          borderTop: '1px solid', borderColor: 'border.default', pt: 5,
        },
      }}
    >
      <Text.Body m={0} sx={{ fontSize: '18px', fontWeight: 500, color: 'fg.default', mb: 4, '@media (max-width: 767px)': { display: 'none' } }}>
        Order Summary
      </Text.Body>

      <Flex alignItems="center" gap={2} sx={{ mb: 3, '@media (max-width: 767px)': { display: 'none' } }}>
        <Global sx={{ width: 16, height: 16, color: 'fg.muted' }} />
        <Text.Body m={0} sx={{ fontSize: '13px', color: 'fg.muted' }}>
          Domain ({items.length})
        </Text.Body>
      </Flex>

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
                <Text.Body m={0} sx={{ fontSize: '12px', color: 'fg.muted' }}>First-year discount</Text.Body>
                <Text.Body m={0} sx={{ fontSize: '12px', color: 'var(--colors-accent-fg, #0862d1)', whiteSpace: 'nowrap' }}>
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

      <Box sx={{ borderTop: '1px solid', borderColor: 'border.default', my: 4, '@media (max-width: 767px)': { display: 'none' } }} />

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
        <Text.Body m={0} sx={{ fontSize: '14px', fontWeight: 600, color: 'fg.default' }}>Estimated Total</Text.Body>
        <Text.Body m={0} sx={{ fontSize: '14px', fontWeight: 600, color: 'fg.default' }}>${estimatedTotal}.00</Text.Body>
      </Flex>

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
  const initialItems: DomainResult[] = state?.items ?? (() => {
    try { return JSON.parse(localStorage.getItem('domains-cart-items') ?? '[]') } catch { return [] }
  })()

  const [variant] = useState<MyrVariant>(readVariant)
  const [items, setItems] = useState<DomainResult[]>(initialItems)
  const [terms, setTerms] = useState<Record<string, number>>(() => {
    let saved: Record<string, number> = {}
    try { saved = JSON.parse(localStorage.getItem('domains-cart-terms') ?? '{}') } catch {}
    return Object.fromEntries(initialItems.map((i) => [i.id, saved[i.id] ?? (getDiscount(i.tld)?.minYears ?? 1)]))
  })

  if (initialItems.length === 0) {
    return <Navigate to="/domain-search" replace />
  }

  const removeItem = (id: string) => {
    const next = items.filter((i) => i.id !== id)
    localStorage.setItem('domains-cart-items', JSON.stringify(next))
    if (next.length === 0) {
      navigate('/domain-search', { replace: true })
    } else {
      setItems(next)
      setTerms((prev) => {
        const { [id]: _, ...rest } = prev
        localStorage.setItem('domains-cart-terms', JSON.stringify(rest))
        return rest
      })
    }
  }

  const handleTermChange = (id: string, years: number) => {
    setTerms((prev) => {
      const next = { ...prev, [id]: years }
      localStorage.setItem('domains-cart-terms', JSON.stringify(next))
      return next
    })
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
          sx={{ gap: '64px', '@media (max-width: 767px)': { flexDirection: 'column', gap: '24px', alignItems: 'stretch' } }}
        >
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
                  variant={variant}
                  onTermChange={handleTermChange}
                  onRemove={removeItem}
                />
              ))}
            </Flex>

            <Button.Primary
              sx={{
                width: '100%', height: 52, borderRadius: '2px',
                fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase',
                '@media (max-width: 767px)': { display: 'none' },
              }}
            >
              Continue to checkout
            </Button.Primary>
          </Box>

          <OrderSummary items={items} terms={terms} />

          <Box
            as="button"
            onClick={() => {}}
            sx={{
              display: 'none',
              '@media (max-width: 767px)': {
                display: 'block', width: '100%', background: '#000', color: '#fff',
                border: 'none', height: 52, cursor: 'pointer', fontSize: '12px',
                letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 400,
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

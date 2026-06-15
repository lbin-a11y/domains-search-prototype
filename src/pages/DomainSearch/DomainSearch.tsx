import { useState, useEffect, useId, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Box, Flex, Text, Field } from '@sqs/rosetta-primitives'
import { ActivityIndicator, TextInput } from '@sqs/rosetta-elements'
import {
  LogoSquarespace,
  Search,
  ShoppingBag,
  Star,
  Checkmark,
  CrossSmall,
  Trash,
  ChevronSmallUp,
  ChevronSmallDown,
  InfoCircle,
  Flash,
  CheckmarkShield,
  LineChart,
  Tag,
} from '@sqs/rosetta-icons'

// ── Types ────────────────────────────────────────────────────────────────────

type DomainBadge = 'exact' | 'premium' | 'promoted' | 'rtb'

interface DomainResult {
  id: string
  name: string
  tld: string
  badges: DomainBadge[]
  originalPrice: number
  salePrice: number | null
  available: boolean
}

// ── Mock data ────────────────────────────────────────────────────────────────

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

const TLD_CATALOG: Array<{
  tld: string
  base: number
  sale: number | null
  promoted?: boolean
  premium?: boolean
  rtb?: boolean
}> = [
  { tld: '.com',    base: 20, sale: 14 },
  { tld: '.net',    base: 20, sale: 14 },
  { tld: '.org',    base: 20, sale: 9 },
  { tld: '.co',     base: 36, sale: 26 },
  { tld: '.io',     base: 60, sale: 48,  rtb: true },
  { tld: '.me',     base: 26, sale: 18 },
  { tld: '.live',   base: 20, sale: 10, promoted: true },
  { tld: '.store',  base: 20, sale: 12, promoted: true },
  { tld: '.studio', base: 28, sale: 22, rtb: true },
  { tld: '.art',    base: 24, sale: 18 },
  { tld: '.shop',   base: 30, sale: 20 },
  { tld: '.online', base: 20, sale: 8,  promoted: true, rtb: true },
  { tld: '.photos', base: 30, sale: null, premium: true },
  { tld: '.design', base: 34, sale: 28 },
  { tld: '.agency', base: 28, sale: null },
]

const LIFETIME_PHOTOGRAPHY_RESULTS: DomainResult[] = [
  { id: 'lifetime.photography',          name: 'lifetime.photography',          tld: '.photography', badges: ['exact', 'premium'], originalPrice: 600, salePrice: null, available: true },
  { id: 'lifetimephotography.net',        name: 'lifetimephotography.net',        tld: '.net',         badges: [],                   originalPrice: 20,  salePrice: 14,   available: true },
  { id: 'lifetime-photo.com',             name: 'lifetime-photo.com',             tld: '.com',         badges: [],                   originalPrice: 20,  salePrice: 8,    available: true },
  { id: 'lifetimephotographs.com',        name: 'lifetimephotographs.com',        tld: '.com',         badges: [],                   originalPrice: 20,  salePrice: 8,    available: true },
  { id: 'lifetime-images.com',            name: 'lifetime-images.com',            tld: '.com',         badges: [],                   originalPrice: 20,  salePrice: 8,    available: true },
  { id: 'lifetimephotography.live',       name: 'lifetimephotography.live',       tld: '.live',        badges: ['promoted'],          originalPrice: 20,  salePrice: 10,   available: true },
  { id: 'lifetimephotography.studio',     name: 'lifetimephotography.studio',     tld: '.studio',      badges: ['promoted'],          originalPrice: 40,  salePrice: 10,   available: true },
  { id: 'lifetimephotography.company',    name: 'lifetimephotography.company',    tld: '.company',     badges: [],                   originalPrice: 30,  salePrice: 10,   available: true },
  { id: 'lifetimephotographies.com',      name: 'lifetimephotographies.com',      tld: '.com',         badges: [],                   originalPrice: 20,  salePrice: 8,    available: true },
  { id: 'yourlifetimephotography.com',    name: 'yourlifetimephotography.com',    tld: '.com',         badges: [],                   originalPrice: 20,  salePrice: 8,    available: true },
  { id: 'lifetimephotography.services',   name: 'lifetimephotography.services',   tld: '.services',    badges: [],                   originalPrice: 55,  salePrice: null, available: true },
  { id: 'lifetimephotography.work',       name: 'lifetimephotography.work',       tld: '.work',        badges: [],                   originalPrice: 25,  salePrice: null, available: true },
  { id: 'lifetimephotography.pro',        name: 'lifetimephotography.pro',        tld: '.pro',         badges: [],                   originalPrice: 30,  salePrice: 10,   available: true },
  { id: 'lifetimephotography.photography',name: 'lifetimephotography.photography',tld: '.photography', badges: [],                   originalPrice: 20,  salePrice: 10,   available: true },
  { id: 'lifetimephotography.info',       name: 'lifetimephotography.info',       tld: '.info',        badges: [],                   originalPrice: 20,  salePrice: 10,   available: true },
  { id: 'lifetimephotography.design',     name: 'lifetimephotography.design',     tld: '.design',      badges: [],                   originalPrice: 75,  salePrice: null, available: true },
  { id: 'lifetimephotography.life',       name: 'lifetimephotography.life',       tld: '.life',        badges: [],                   originalPrice: 35,  salePrice: null, available: true },
  { id: 'lifetimephotography.tips',       name: 'lifetimephotography.tips',       tld: '.tips',        badges: [],                   originalPrice: 35,  salePrice: null, available: true },
  { id: 'lifetimephotography.support',    name: 'lifetimephotography.support',    tld: '.support',     badges: [],                   originalPrice: 35,  salePrice: null, available: true },
  { id: 'lifetimephotography.agency',     name: 'lifetimephotography.agency',     tld: '.agency',      badges: [],                   originalPrice: 45,  salePrice: null, available: true },
]

function relatedNames(stem: string): string[] {
  const stripped = stem.replace(/[aeiou]/gi, '').slice(0, 4)
  return [
    `${stem}images`,
    `${stem}photos`,
    `${stem}studio`,
    `${stripped}${stem.slice(-3)}`,
    `my${stem}`,
    `get${stem}`,
    `the${stem}`,
  ].filter((s) => s !== stem).slice(0, 5)
}

function generateResults(rawQuery: string): DomainResult[] {
  const normalized = rawQuery.trim().toLowerCase().replace(/\s+/g, '')
  if (normalized === 'lifetimephotography') return LIFETIME_PHOTOGRAPHY_RESULTS

  const stem = rawQuery.trim().toLowerCase().replace(/\s+/g, '').replace(/^\./, '').replace(/\.[a-z]+$/, '')
  const results: DomainResult[] = []

  const exactTld = rawQuery.includes('.') ? '.' + rawQuery.split('.').pop()! : '.photos'
  const exactCatalog = TLD_CATALOG.find((t) => t.tld === exactTld) ?? { tld: exactTld, base: 30, sale: null, premium: true }
  results.push({
    id: `${stem}${exactTld}`,
    name: stem + exactTld,
    tld: exactTld,
    badges: ['exact', ...(exactCatalog.premium ? ['premium' as DomainBadge] : [])],
    originalPrice: exactCatalog.base,
    salePrice: exactCatalog.sale,
    available: true,
  })

  for (const cat of TLD_CATALOG) {
    if (cat.tld === exactTld) continue
    const available = cat.rtb ? true : hashStr(stem + cat.tld) % 4 !== 0
    const badges: DomainBadge[] = []
    if (cat.rtb) badges.push('rtb')
    if (cat.promoted) badges.push('promoted')
    if (cat.premium) badges.push('premium')
    results.push({
      id: `${stem}${cat.tld}`,
      name: stem + cat.tld,
      tld: cat.tld,
      badges,
      originalPrice: cat.base,
      salePrice: cat.sale,
      available,
    })
  }

  for (const altName of relatedNames(stem)) {
    const available = hashStr(altName + '.com') % 3 !== 0
    results.push({
      id: `${altName}.com`,
      name: `${altName}.com`,
      tld: '.com',
      badges: [],
      originalPrice: 20,
      salePrice: 14,
      available,
    })
  }

  return results
}

// ── Badge priority ─────────────────────────────────────────────────────────────

const BADGE_PRIORITY: DomainBadge[] = ['exact', 'rtb', 'promoted', 'premium']

function prioritizeBadges(badges: DomainBadge[]): DomainBadge[] {
  return BADGE_PRIORITY.filter((p) => badges.includes(p)).slice(0, 2)
}

const RTB_LABELS = ['For your industry', 'Memorable', 'High trust', 'Trending', 'Popular TLD']

function getRtbLabel(name: string): string {
  return RTB_LABELS[hashStr(name) % RTB_LABELS.length]
}

// ── RTB Tooltip ───────────────────────────────────────────────────────────────

function RtbTooltip() {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 'calc(100% + 10px)',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#000',
        borderRadius: 4,
        px: '16px',
        py: '11px',
        width: 280,
        zIndex: 400,
        boxShadow: '0 0 1px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.12)',
        pointerEvents: 'none',
        // Arrow pointing down
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '6px',
          borderStyle: 'solid',
          borderColor: '#000 transparent transparent transparent',
        },
      }}
    >
      <Text.Body m={0} mb={2} sx={{ fontSize: '14px', color: '#fff', lineHeight: '22px' }}>
        This domain is recommended because:
      </Text.Body>
      <Flex alignItems="center" gap={2} mb={1}>
        <CheckmarkShield sx={{ width: 16, height: 16, color: '#fff', flexShrink: 0 }} />
        <Text.Body m={0} sx={{ fontSize: '14px', color: '#fff', lineHeight: '22px' }}>
          The TLD is certified.
        </Text.Body>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <LineChart sx={{ width: 16, height: 16, color: '#fff', flexShrink: 0 }} />
        <Text.Body m={0} sx={{ fontSize: '14px', color: '#fff', lineHeight: '22px' }}>
          400+ users have purchased it today.
        </Text.Body>
      </Flex>
    </Box>
  )
}

// ── RTB Badge ─────────────────────────────────────────────────────────────────

function RtbBadge({ label }: { label?: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Box
      sx={{ position: 'relative', flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Flex
        alignItems="center"
        gap={label ? 1 : 0}
        justifyContent="center"
        px={label ? 2 : 0}
        sx={{
          width: label ? 'auto' : 28,
          height: 28,
          borderRadius: label ? 20 : '50%',
          background: '#d8e8fe',
          cursor: 'default',
        }}
      >
        <Flash sx={{ width: 14, height: 14, color: '#0862d1', flexShrink: 0 }} />
        {label && (
          <Text.Caption m={0} sx={{ fontSize: '11px', fontWeight: 600, color: '#0862d1', lineHeight: 1, whiteSpace: 'nowrap' }}>
            {label}
          </Text.Caption>
        )}
      </Flex>
      {hovered && <RtbTooltip />}
    </Box>
  )
}

// ── Tooltip base ─────────────────────────────────────────────────────────────

function BadgeTooltip({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 'calc(100% + 10px)',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#000',
        borderRadius: 4,
        px: '16px',
        py: '11px',
        width: 260,
        zIndex: 400,
        boxShadow: '0 0 1px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.12)',
        pointerEvents: 'none',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '6px',
          borderStyle: 'solid',
          borderColor: '#000 transparent transparent transparent',
        },
      }}
    >
      {children}
    </Box>
  )
}

// ── Promoted Badge ────────────────────────────────────────────────────────────

function PromotedBadge() {
  const [hovered, setHovered] = useState(false)
  return (
    <Box sx={{ position: 'relative', flexShrink: 0 }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Flex alignItems="center" gap={1} px={2} py={1} sx={{ borderRadius: 20, background: '#e8f0fe', cursor: 'default' }}>
        <Tag sx={{ width: 11, height: 11, color: '#0862d1' }} />
        <Text.Caption m={0} sx={{ fontSize: '11px', fontWeight: 600, color: '#0862d1', lineHeight: 1 }}>
          Promoted
        </Text.Caption>
      </Flex>
      {hovered && (
        <BadgeTooltip>
          <Text.Body m={0} sx={{ fontSize: '14px', color: '#fff', lineHeight: '22px' }}>
            This TLD (the domain ending) is available at a promotional price for a limited time.
          </Text.Body>
        </BadgeTooltip>
      )}
    </Box>
  )
}

// ── Premium Badge ─────────────────────────────────────────────────────────────

function PremiumBadge() {
  const [hovered, setHovered] = useState(false)
  return (
    <Box sx={{ position: 'relative', flexShrink: 0 }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Flex alignItems="center" gap={1} px={2} py={1} sx={{ borderRadius: 20, background: '#e8f0fe', cursor: 'default' }}>
        <Star sx={{ width: 11, height: 11, color: '#0862d1' }} />
        <Text.Caption m={0} sx={{ fontSize: '11px', fontWeight: 600, color: '#0862d1', lineHeight: 1 }}>
          Premium
        </Text.Caption>
      </Flex>
      {hovered && (
        <BadgeTooltip>
          <Text.Body m={0} sx={{ fontSize: '14px', color: '#fff', lineHeight: '22px' }}>
            Premium domains are short, memorable, and often include common or highly searched words that may have strong brand value.
          </Text.Body>
        </BadgeTooltip>
      )}
    </Box>
  )
}

// ── Badge ─────────────────────────────────────────────────────────────────────

function Badge({ kind, rtbLabel }: { kind: DomainBadge; rtbLabel?: string }) {
  if (kind === 'rtb') {
    return <RtbBadge label={rtbLabel} />
  }
  if (kind === 'exact') {
    return (
      <Flex alignItems="center" gap={1} px={2} py={1} sx={{ borderRadius: 20, background: '#e6f4ea', flexShrink: 0 }}>
        <Checkmark sx={{ width: 12, height: 12, color: '#1a7a3a' }} />
        <Text.Caption m={0} sx={{ fontSize: '11px', fontWeight: 600, color: '#1a7a3a', lineHeight: 1 }}>
          Exact match
        </Text.Caption>
      </Flex>
    )
  }
  if (kind === 'premium') {
    return <PremiumBadge />
  }
  if (kind === 'promoted') {
    return <PromotedBadge />
  }
  return null
}

// ── Result row ────────────────────────────────────────────────────────────────

function ResultRow({
  result,
  inCart,
  onToggleCart,
  isTop,
  variant,
}: {
  result: DomainResult
  inCart: boolean
  onToggleCart: (result: DomainResult) => void
  isTop: boolean
  variant?: 'chips' | 'chips-label' | 'cards' | 'sections'
}) {
  return (
    <Flex
      alignItems="center"
      gap={3}
      px={4}
      py={3}
      onClick={result.available ? () => onToggleCart(result) : undefined}
      sx={{
        minHeight: 44,
        opacity: result.available ? 1 : 0.4,
        cursor: result.available ? 'pointer' : 'default',
        ...(isTop ? {
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 8,
          mb: 2,
        } : {}),
        ...(result.available ? {
          transition: 'background 0.15s ease, transform 0.15s ease, border-radius 0.15s ease',
          '&:hover': {
            background: 'var(--colors-bg-default)',
            transform: 'translateX(4px)',
            borderRadius: 8,
          },
        } : {}),
      }}
    >
      {/* Domain name + badges */}
      <Flex alignItems="center" gap={2} sx={{ flex: '1 1 0', minWidth: 0, flexWrap: 'wrap' }}>
        <Text.Body
          m={0}
          fontWeight="book"
          sx={{ color: result.available ? 'fg.default' : 'fg.disabled', flexShrink: 0 }}
        >
          {result.name}
        </Text.Body>
        {result.badges.length > 0 && (
          <Flex gap={1} alignItems="center" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            {prioritizeBadges(
              result.available ? result.badges : result.badges.filter((b) => b !== 'rtb')
            ).map((b) => (
              <Badge
                key={b}
                kind={b}
                rtbLabel={variant === 'chips-label' ? getRtbLabel(result.name) : undefined}
              />
            ))}
          </Flex>
        )}
      </Flex>

      {/* Price */}
      <Flex alignItems="center" gap={2} sx={{ flexShrink: 0 }}>
        {result.salePrice !== null ? (
          <>
            <Text.Caption m={0} color="fg.disabled" sx={{ textDecoration: 'line-through', fontSize: '13px' }}>
              ${result.originalPrice}
            </Text.Caption>
            <Text.Body m={0}>${result.salePrice}</Text.Body>
          </>
        ) : (
          <Text.Body m={0}>${result.originalPrice}</Text.Body>
        )}
      </Flex>

      {/* Cart state indicator */}
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: inCart ? 'var(--colors-fg-default)' : 'transparent',
          transition: 'background 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        {inCart
          ? <Checkmark sx={{ width: 16, height: 16, color: '#ffffff' }} />
          : <ShoppingBag sx={{ width: 18, height: 18, color: 'var(--colors-fg-muted)' }} />
        }
      </Box>
    </Flex>
  )
}

// ── Cart button (shared) ──────────────────────────────────────────────────────

function CartButton({ result, inCart, onToggleCart }: { result: DomainResult; inCart: boolean; onToggleCart: (r: DomainResult) => void }) {
  return (
    <Box
      as="button"
      onClick={() => onToggleCart(result)}
      aria-label={inCart ? 'Remove from cart' : 'Add to cart'}
      sx={{
        border: 'none',
        cursor: 'pointer',
        width: 36,
        height: 36,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        background: inCart ? 'var(--colors-fg-default)' : 'transparent',
        transition: 'background 0.2s ease',
        '&:hover': { background: inCart ? '#333' : 'var(--colors-bg-default)' },
      }}
    >
      {inCart
        ? <Checkmark sx={{ width: 16, height: 16, color: '#ffffff' }} />
        : <ShoppingBag sx={{ width: 18, height: 18, color: 'var(--colors-fg-muted)' }} />
      }
    </Box>
  )
}

// ── Price display (shared) ────────────────────────────────────────────────────

function PriceDisplay({ result }: { result: DomainResult }) {
  if (!result.available) return <Text.Body m={0} color="fg.disabled" sx={{ fontSize: '13px' }}>Unavailable</Text.Body>
  if (result.salePrice !== null) return (
    <Flex alignItems="center" gap={2}>
      <Text.Caption m={0} color="fg.disabled" sx={{ textDecoration: 'line-through', fontSize: '13px' }}>${result.originalPrice}</Text.Caption>
      <Text.Body m={0}>${result.salePrice}</Text.Body>
    </Flex>
  )
  return <Text.Body m={0}>${result.originalPrice}</Text.Body>
}

// ── Cards view ────────────────────────────────────────────────────────────────

function CardsView({
  results,
  cart,
  onToggleCart,
}: {
  results: DomainResult[]
  cart: Set<string>
  onToggleCart: (r: DomainResult) => void
}) {
  const exactResult = results.find((r) => r.badges.includes('exact'))
  const firstRtb = results.find((r) => r.badges.includes('rtb') && !r.badges.includes('exact'))
  const featuredIds = new Set([exactResult?.id, firstRtb?.id].filter(Boolean) as string[])
  const cards = [exactResult, firstRtb].filter(Boolean) as DomainResult[]
  const rest = results.filter((r) => !featuredIds.has(r.id))

  return (
    <Box>
      {cards.length > 0 && (
        <Flex gap={3} mb={2} sx={{ flexWrap: 'wrap' }}>
          {cards.map((r) => {
            const inCart = cart.has(r.id)
            const isExact = r.badges.includes('exact')
            const visibleBadges = isExact ? (['exact'] as DomainBadge[]) : prioritizeBadges(r.badges)
            return (
              <Box
                key={r.id}
                sx={{
                  flex: '1 1 0',
                  minWidth: 200,
                  border: isExact ? '2px solid #aedcc2' : '1px solid #e7e7e7',
                  borderRadius: 11,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '11px',
                  ...(isExact ? { boxShadow: '0 0 0.5px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.12)' } : {}),
                }}
              >
                <Flex gap={1} alignItems="center">
                  {visibleBadges.map((b) => (
                    <Badge key={b} kind={b} />
                  ))}
                </Flex>
                <Text.Body m={0} sx={{ fontSize: '16px', lineHeight: '22px' }}>
                  {r.name}
                </Text.Body>
                <Flex alignItems="center" justifyContent="space-between">
                  <PriceDisplay result={r} />
                  <CartButton result={r} inCart={inCart} onToggleCart={onToggleCart} />
                </Flex>
              </Box>
            )
          })}
        </Flex>
      )}
      {rest.map((r, i) => (
        <ResultRow
          key={r.id}
          result={r}
          inCart={cart.has(r.id)}
          onToggleCart={onToggleCart}
          isTop={cards.length === 0 && i === 0}
          variant="cards"
        />
      ))}
    </Box>
  )
}

// ── Sections view ─────────────────────────────────────────────────────────────

function SectionsView({
  results,
  cart,
  onToggleCart,
}: {
  results: DomainResult[]
  cart: Set<string>
  onToggleCart: (r: DomainResult) => void
}) {
  const exactResults = results.filter((r) => r.badges.includes('exact'))
  const recommended = results.filter((r) => r.badges.includes('rtb') && !r.badges.includes('exact'))
  const rest = results.filter((r) => !r.badges.includes('exact') && !r.badges.includes('rtb'))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Claim it today */}
      {exactResults.length > 0 && (
        <Box
          sx={{
            background: '#edf8f2',
            borderRadius: 11,
            p: '22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 0 0.5px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.12)',
          }}
        >
          <Text.Body m={0} sx={{ fontSize: '18px', lineHeight: '1.2', letterSpacing: '-0.018px' }}>
            Claim it today
          </Text.Body>
          {exactResults.map((r) => {
            const inCart = cart.has(r.id)
            const visibleBadges = prioritizeBadges(r.badges)
            return (
              <Box
                key={r.id}
                sx={{
                  background: '#fff',
                  border: '1px solid #aedcc2',
                  borderRadius: 11,
                  pl: 3,
                  pr: '11px',
                  py: 3,
                }}
              >
                <Flex alignItems="center" gap="11px">
                  <Flex flex="1 1 0" alignItems="center" gap={2} sx={{ minWidth: 0, flexWrap: 'wrap' }}>
                    <Text.Body m={0} sx={{ fontSize: '15px', letterSpacing: '-0.015px', flexShrink: 0 }}>
                      {r.name}
                    </Text.Body>
                    <Flex gap={1} alignItems="center" sx={{ flexShrink: 0 }}>
                      {visibleBadges.map((b) => <Badge key={b} kind={b} />)}
                    </Flex>
                  </Flex>
                  <Flex alignItems="center" gap="11px" sx={{ flexShrink: 0 }}>
                    <PriceDisplay result={r} />
                    <CartButton result={r} inCart={inCart} onToggleCart={onToggleCart} />
                  </Flex>
                </Flex>
              </Box>
            )
          })}
        </Box>
      )}

      {/* Recommended */}
      {recommended.length > 0 && (
        <Box>
          <Text.Body m={0} mb={3} sx={{ fontSize: '18px', lineHeight: '1.2', letterSpacing: '-0.018px' }}>
            Recommended
          </Text.Body>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {recommended.map((r) => (
              <ResultRow key={r.id} result={r} inCart={cart.has(r.id)} onToggleCart={onToggleCart} isTop={false} variant="sections" />
            ))}
          </Box>
        </Box>
      )}

      {/* More results */}
      {rest.length > 0 && (
        <Box>
          <Text.Body m={0} mb={3} sx={{ fontSize: '18px', lineHeight: '1.2', letterSpacing: '-0.018px' }}>
            {rest.length}+ more results
          </Text.Body>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {rest.map((r) => (
              <ResultRow key={r.id} result={r} inCart={cart.has(r.id)} onToggleCart={onToggleCart} isTop={false} variant="sections" />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}

// ── Cart sidebar ──────────────────────────────────────────────────────────────

/** Extract the SLD (everything before the last TLD segment) */
function getSld(name: string): string {
  const dot = name.lastIndexOf('.')
  return dot > 0 ? name.slice(0, dot) : name
}

function CartSidebar({
  items,
  results,
  onRemove,
  onAdd,
}: {
  items: DomainResult[]
  results: DomainResult[]
  onRemove: (id: string) => void
  onAdd: (result: DomainResult) => void
}) {
  const navigate = useNavigate()
  const [matchingOpen, setMatchingOpen] = useState<Record<string, boolean>>({})
  const prevItemIdsRef = useRef<Set<string>>(new Set())

  const subtotal = items.reduce((sum, r) => sum + (r.salePrice ?? r.originalPrice), 0)
  const cartIds = new Set(items.map((i) => i.id))

  // Auto-open the matching domains section whenever a new SLD enters the cart
  useEffect(() => {
    const currentIds = new Set(items.map((i) => i.id))
    const newItems = items.filter((i) => !prevItemIdsRef.current.has(i.id))

    if (newItems.length > 0) {
      setMatchingOpen((prev) => {
        const next = { ...prev }
        for (const item of newItems) {
          const sld = getSld(item.name)
          const hasMatching = results.some((r) => getSld(r.name) === sld && r.available && !currentIds.has(r.id))
          if (hasMatching) next[sld] = true
        }
        return next
      })
    }

    prevItemIdsRef.current = currentIds
  }, [items, results])

  // Group cart items by SLD — preserving insertion order of first-seen SLD
  const sldOrder: string[] = []
  const groups: Record<string, DomainResult[]> = {}
  for (const item of items) {
    const sld = getSld(item.name)
    if (!groups[sld]) { groups[sld] = []; sldOrder.push(sld) }
    groups[sld].push(item)
  }

  // For each SLD find other available results not in cart with same stem
  function getMatching(sld: string): DomainResult[] {
    return results.filter((r) => getSld(r.name) === sld && r.available && !cartIds.has(r.id)).slice(0, 4)
  }

  return (
    <Box
      sx={{
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 218px 61px 0 transparent, 0 139px 56px 0 rgba(0,0,0,0.01), 0 78px 47px 0 rgba(0,0,0,0.05), 0 -1px 35px 0 rgba(0,0,0,0.09), 0 4px 19px 0 rgba(0,0,0,0.1)',
        height: 'calc(100vh - 160px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ── */}
      <Box px={6} pt={6} pb={3}>
        <Text.Body m={0} fontWeight="semibold" sx={{ fontSize: '18px', letterSpacing: '-0.01em' }}>
          Cart Overview
        </Text.Body>
        <Text.Caption m={0} color="fg.muted" sx={{ fontSize: '13px', mt: 3 }}>
          Domain ({items.length})
        </Text.Caption>
      </Box>

      {/* ── Scrollable items area ── */}
      <Box sx={{ flex: '1 1 0', overflowY: 'auto', px: 5, pb: 4 }}>
        {sldOrder.map((sld) => {
          const groupItems = groups[sld]
          const matching = getMatching(sld)
          const isOpen = matchingOpen[sld] ?? false

          return (
            <Box
              key={sld}
              mb={3}
              sx={{
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              {/* Items in this SLD group */}
              {groupItems.map((item, idx) => {
                const price = item.salePrice ?? item.originalPrice
                const isLast = idx === groupItems.length - 1
                return (
                  <Flex
                    key={item.id}
                    alignItems="center"
                    gap={3}
                    px={4}
                    sx={{
                      minHeight: 48,
                      borderBottom: (!isLast || matching.length > 0) ? '1px solid' : 'none',
                      borderColor: 'border.default',
                    }}
                  >
                    <Text.Body
                      m={0}
                      fontWeight="semibold"
                      sx={{ flex: '1 1 0', minWidth: 0, fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {item.name}
                    </Text.Body>
                    <Text.Body m={0} sx={{ fontSize: '14px', flexShrink: 0 }}>
                      ${price}
                    </Text.Body>
                    <Box
                      as="button"
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      sx={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        p: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0,
                        color: 'fg.muted',
                        borderRadius: 4,
                        transition: 'color 0.12s',
                        '&:hover': { color: 'fg.default' },
                      }}
                    >
                      <Trash sx={{ width: 14, height: 14 }} />
                    </Box>
                  </Flex>
                )
              })}

              {/* Add matching domains section */}
              {matching.length > 0 && (
                <Box>
                  {/* Toggle row — NO borderTop here; the last cart item's borderBottom is the divider */}
                  <Box
                    as="button"
                    onClick={() => setMatchingOpen((prev) => ({ ...prev, [sld]: !isOpen }))}
                    sx={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      px: '16px',
                      py: '10px',
                      textAlign: 'left',
                    }}
                  >
                    {/* Label + info icon grouped together */}
                    <Flex alignItems="center" gap={1} sx={{ flex: 1 }}>
                      <Text.Caption m={0} color="fg.muted" sx={{ fontSize: '12px', lineHeight: 1 }}>
                        Add matching domains
                      </Text.Caption>
                      <InfoCircle sx={{ width: 12, height: 12, color: 'var(--colors-fg-muted)', flexShrink: 0 }} />
                    </Flex>
                    {isOpen
                      ? <ChevronSmallUp sx={{ width: 14, height: 14, color: 'var(--colors-fg-muted)', flexShrink: 0 }} />
                      : <ChevronSmallDown sx={{ width: 14, height: 14, color: 'var(--colors-fg-muted)', flexShrink: 0 }} />
                    }
                  </Box>

                  {/* Matching items — each in its own rounded gray card with white gutters */}
                  <Box sx={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s cubic-bezier(0.4,0,0.2,1)' }}>
                  <Box sx={{ minHeight: 0, overflow: 'hidden' }}>
                  <Box px="8px" pb="8px" sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {matching.map((m) => {
                        const stem = getSld(m.name)
                        const ext = m.name.slice(stem.length + 1) // "studio" (no dot)
                        const price = m.salePrice ?? m.originalPrice
                        return (
                          <Flex
                            key={m.id}
                            alignItems="center"
                            gap={3}
                            px={3}
                            sx={{
                              minHeight: 44,
                              borderRadius: 6,
                              background: '#f5f5f5',
                            }}
                          >
                            {/* Domain: stem normal + .ext bold */}
                            <Box sx={{ flex: '1 1 0', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              <Text.Body as="span" m={0} sx={{ fontSize: '14px' }}>{stem}.</Text.Body>
                              <Text.Body as="span" m={0} fontWeight="semibold" sx={{ fontSize: '14px' }}>{ext}</Text.Body>
                            </Box>
                            <Text.Body m={0} sx={{ fontSize: '14px', flexShrink: 0 }}>
                              ${price}
                            </Text.Body>
                            <Box
                              as="button"
                              onClick={() => onAdd(m)}
                              sx={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                p: 0,
                                flexShrink: 0,
                                color: 'var(--colors-fg-default)',
                                fontSize: '13px',
                                fontWeight: 700,
                                letterSpacing: '0.04em',
                                transition: 'opacity 0.12s',
                                '&:hover': { opacity: 0.7 },
                              }}
                            >
                              ADD
                            </Box>
                          </Flex>
                        )
                      })}
                    </Box>
                  </Box>
                  </Box>
                </Box>
              )}
            </Box>
          )
        })}
      </Box>

      {/* ── Footer ── */}
      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'border.default',
          flexShrink: 0,
        }}
      >
        <Flex alignItems="center" justifyContent="space-between" px={6} py={4}>
          <Flex alignItems="center" gap={2}>
            <ShoppingBag sx={{ width: 16, height: 16, color: 'var(--colors-fg-muted)' }} />
            <Text.Body m={0} sx={{ fontSize: '14px' }}>
              {items.length} Item{items.length !== 1 ? 's' : ''}
            </Text.Body>
          </Flex>
          <Text.Body m={0} sx={{ fontSize: '15px' }}>
            ${subtotal}
          </Text.Body>
        </Flex>
        <Box px={5} pb={5}>
          <Box
            as="button"
            onClick={() => navigate('/cart', { state: { items } })}
            sx={{
              width: '100%',
              background: 'var(--colors-fg-default)',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              height: 48,
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'opacity 0.15s ease',
              '&:hover': { opacity: 0.82 },
            }}
          >
            Checkout
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

// ── Mobile mini cart ─────────────────────────────────────────────────────────

function MobileMiniCart({
  items,
  results,
  onRemove,
  onAdd,
  onCheckout,
  lastAddedId,
}: {
  items: DomainResult[]
  results: DomainResult[]
  onRemove: (id: string) => void
  onAdd: (result: DomainResult) => void
  onCheckout: () => void
  lastAddedId: string | null
}) {
  const [expanded, setExpanded] = useState(false)
  const [slideIn, setSlideIn] = useState(false)
  const [tldsOpen, setTldsOpen] = useState<Record<string, boolean>>({})
  const subtotal = items.reduce((sum, r) => sum + (r.salePrice ?? r.originalPrice), 0)
  const cartIds = new Set(items.map((i) => i.id))
  const hasItems = items.length > 0

  useEffect(() => {
    if (hasItems) {
      const id = requestAnimationFrame(() => setSlideIn(true))
      return () => cancelAnimationFrame(id)
    } else {
      setSlideIn(false)
      setExpanded(false)
    }
  }, [hasItems])

  function getMatching(sld: string): DomainResult[] {
    return results.filter((r) => getSld(r.name) === sld && r.available && !cartIds.has(r.id)).slice(0, 4)
  }

  const sldOrder: string[] = []
  const groups: Record<string, DomainResult[]> = {}
  for (const item of items) {
    const sld = getSld(item.name)
    if (!groups[sld]) { groups[sld] = []; sldOrder.push(sld) }
    groups[sld].push(item)
  }

  const lastAddedSld = lastAddedId
    ? getSld(items.find((i) => i.id === lastAddedId)?.name ?? '')
    : null

  useEffect(() => {
    if (lastAddedSld) {
      setTldsOpen((prev) => ({ ...prev, [lastAddedSld]: true }))
    }
  }, [lastAddedSld])

  return (
    <>
      {/* Overlay — fades in/out */}
      <Box
        onClick={() => setExpanded(false)}
        sx={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(79,79,79,0.5)',
          zIndex: 299,
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Panel — slides up on first item add */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 300,
          background: '#fff',
          borderTop: '1px solid #ddd',
          borderTopLeftRadius: expanded ? 6 : 0,
          borderTopRightRadius: expanded ? 6 : 0,
          boxShadow: '0px -1px 35px rgba(0,0,0,0.09), 0px 4px 19px rgba(0,0,0,0.1)',
          transform: slideIn ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), border-radius 0.2s ease',
        }}
      >
        {/* Expandable content — grid-template-rows trick for smooth height */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: expanded ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <Box sx={{ minHeight: 0, overflow: 'hidden' }}>
            <Box sx={{ maxHeight: '65vh', overflowY: 'auto' }}>
            {/* Header */}
            <Flex alignItems="center" justifyContent="space-between" px={4} pt={6} pb={3}>
              <Text.Body m={0} sx={{ fontSize: '18px', fontWeight: 500 }}>Cart Overview</Text.Body>
              <Box
                as="button"
                onClick={() => setExpanded(false)}
                sx={{ background: 'none', border: 'none', cursor: 'pointer', p: 0, display: 'flex', alignItems: 'center' }}
              >
                <ChevronSmallDown sx={{ width: 20, height: 20, color: 'fg.default' }} />
              </Box>
            </Flex>

            {/* Domain count */}
            <Text.Caption m={0} sx={{ display: 'block', px: 4, pb: 3, fontSize: '12px', color: '#4f4f4f' }}>
              Domain ({items.length})
            </Text.Caption>

            {/* Domain cards */}
            <Box px={4} pb={4} sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {sldOrder.map((sld) => {
                const groupItems = groups[sld]
                const matching = getMatching(sld)

                return (
                  <Box
                    key={sld}
                    sx={{ border: '1px solid #ddd', borderRadius: 4, background: '#fff', overflow: 'hidden' }}
                  >
                    {/* Domain row */}
                    {groupItems.map((item) => {
                      const price = item.salePrice ?? item.originalPrice
                      return (
                        <Flex
                          key={item.id}
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ px: 4, py: 3 }}
                        >
                          <Text.Body
                            m={0}
                            sx={{ fontSize: '15px', fontWeight: 500, flex: '1 1 0', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                          >
                            {item.name}
                          </Text.Body>
                          <Flex alignItems="center" gap={2} sx={{ flexShrink: 0, ml: 2 }}>
                            <Text.Body m={0} sx={{ fontSize: '14px' }}>${price}</Text.Body>
                            <Box
                              as="button"
                              onClick={() => onRemove(item.id)}
                              aria-label={`Remove ${item.name}`}
                              sx={{ background: 'none', border: 'none', cursor: 'pointer', p: '2px', color: 'fg.muted', display: 'flex', alignItems: 'center' }}
                            >
                              <Trash sx={{ width: 14, height: 14 }} />
                            </Box>
                          </Flex>
                        </Flex>
                      )
                    })}

                    {/* TLD upsells — collapsible per SLD */}
                    {matching.length > 0 && (
                      <Box sx={{ borderTop: '1px solid #ddd' }}>
                        <Box
                          as="button"
                          onClick={() => setTldsOpen((prev) => ({ ...prev, [sld]: !tldsOpen[sld] }))}
                          sx={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', px: 4, py: 3, textAlign: 'left' }}
                        >
                          <Text.Caption m={0} sx={{ fontSize: '12px', color: '#4f4f4f', flex: 1, lineHeight: 1 }}>
                            Add matching domains
                          </Text.Caption>
                          {tldsOpen[sld]
                            ? <ChevronSmallUp sx={{ width: 14, height: 14, color: '#4f4f4f', flexShrink: 0 }} />
                            : <ChevronSmallDown sx={{ width: 14, height: 14, color: '#4f4f4f', flexShrink: 0 }} />
                          }
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateRows: tldsOpen[sld] ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s cubic-bezier(0.4,0,0.2,1)' }}>
                        <Box sx={{ minHeight: 0, overflow: 'hidden' }}>
                        <Box sx={{ px: 4, pb: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {matching.map((m) => {
                            const stem = getSld(m.name)
                            const ext = m.name.slice(stem.length + 1)
                            const price = m.salePrice ?? m.originalPrice
                            return (
                              <Flex
                                key={m.id}
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ px: 3, py: '10px', background: '#f9f9f9', borderRadius: 4 }}
                              >
                                <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
                                  <Text.Body as="span" m={0} sx={{ fontSize: '14px', color: '#4f4f4f' }}>{stem}.</Text.Body>
                                  <Text.Body as="span" m={0} sx={{ fontSize: '14px', fontWeight: 500 }}>{ext}</Text.Body>
                                </Box>
                                <Flex alignItems="baseline" gap={2} sx={{ flexShrink: 0 }}>
                                  <Text.Body m={0} sx={{ fontSize: '14px' }}>${price}</Text.Body>
                                  <Box
                                    as="button"
                                    onClick={() => onAdd(m)}
                                    sx={{ background: 'none', border: 'none', cursor: 'pointer', p: 0, fontSize: '14px', fontWeight: 500, letterSpacing: '0.04em', color: 'fg.default' }}
                                  >
                                    ADD
                                  </Box>
                                </Flex>
                              </Flex>
                            )
                          })}
                        </Box>
                        </Box>
                        </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Box>
        </Box>

        {/* Footer — always visible */}
        <Box sx={{ px: 4, pt: 4, pb: '16px', borderTop: expanded ? '1px solid #ddd' : 'none' }}>
          {expanded ? (
            <Flex alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
              <Text.Body m={0} sx={{ fontSize: '15px' }}>Estimated total</Text.Body>
              <Text.Body m={0} sx={{ fontSize: '15px' }}>${subtotal}</Text.Body>
            </Flex>
          ) : (
            <Flex alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
              <Flex alignItems="center" gap={2}>
                <ShoppingBag sx={{ width: 16, height: 16, color: '#4f4f4f' }} />
                <Text.Body m={0} sx={{ fontSize: '15px', color: '#4f4f4f' }}>
                  {items.length} item{items.length !== 1 ? 's' : ''}
                </Text.Body>
                <Text.Body m={0} sx={{ fontSize: '15px', color: '#ddd' }}>•</Text.Body>
                <Text.Body m={0} sx={{ fontSize: '15px' }}>${subtotal}</Text.Body>
              </Flex>
              <Box
                as="button"
                onClick={() => setExpanded(true)}
                sx={{ background: 'none', border: 'none', cursor: 'pointer', p: 0 }}
              >
                <Text.Body m={0} sx={{ fontSize: '15px', fontWeight: 500 }}>View Details</Text.Body>
              </Box>
            </Flex>
          )}
          <Box
            as="button"
            onClick={onCheckout}
            sx={{
              width: '100%',
              background: '#000',
              color: '#fff',
              border: 'none',
              height: 56,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Checkout
          </Box>
        </Box>
      </Box>
    </>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DomainSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const q = searchParams.get('q') ?? ''

  const [inputValue, setInputValue] = useState(q)
  const [results, setResults] = useState<DomainResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [cart, setCart] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('domains-cart-items')
      if (raw) return new Set((JSON.parse(raw) as DomainResult[]).map((d) => d.id))
    } catch {}
    return new Set()
  })
  const [cartDomains, setCartDomains] = useState<Map<string, DomainResult>>(() => {
    try {
      const raw = localStorage.getItem('domains-cart-items')
      if (raw) return new Map((JSON.parse(raw) as DomainResult[]).map((d) => [d.id, d]))
    } catch {}
    return new Map()
  })
  const [searchFocused, setSearchFocused] = useState(false)
  const [lastAddedId, setLastAddedId] = useState<string | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const labelId = useId()

  useEffect(() => {
    setInputValue(q)
    if (!q) { setResults([]); return }
    setIsLoading(true)
    setResults([])
    const t = window.setTimeout(() => {
      setResults(generateResults(q))
      setIsLoading(false)
    }, 200)
    return () => window.clearTimeout(t)
  }, [q])

  useEffect(() => {
    const trimmed = inputValue.trim()
    if (trimmed) {
      setIsLoading(true)
      setResults([])
    } else {
      setIsLoading(false)
      setResults([])
      setSearchParams({}, { replace: true })
      return
    }
    const t = window.setTimeout(() => {
      setSearchParams({ q: trimmed }, { replace: true })
    }, 300)
    return () => window.clearTimeout(t)
  }, [inputValue]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch() {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    setSearchParams({ q: trimmed })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch()
  }

  function handleClear() {
    setInputValue('')
    setSearchParams({})
    inputRef.current?.focus()
  }

  function toggleCart(result: DomainResult) {
    const { id } = result
    const isAdding = !cart.has(id)
    setCart((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
    setCartDomains((prev) => {
      const next = new Map(prev)
      next.has(id) ? next.delete(id) : next.set(id, result)
      localStorage.setItem('domains-cart-items', JSON.stringify(Array.from(next.values())))
      return next
    })
    if (isAdding) setLastAddedId(id)
  }

  function removeFromCart(id: string) {
    setCart((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    setCartDomains((prev) => {
      const next = new Map(prev)
      next.delete(id)
      localStorage.setItem('domains-cart-items', JSON.stringify(Array.from(next.values())))
      return next
    })
  }

  const [variant, setVariant] = useState<'chips' | 'chips-label' | 'cards' | 'sections'>('chips')

  const cartItems = Array.from(cartDomains.values())
  const cartCount = cart.size
  const hasCart = cartCount > 0

  const VARIANTS: { id: typeof variant; label: string }[] = [
    { id: 'chips', label: 'Chips' },
    { id: 'chips-label', label: 'Chips w/ label' },
    { id: 'cards', label: 'Cards' },
    { id: 'sections', label: 'Sections' },
  ]

  return (
    <Box sx={{ minHeight: '100vh', background: '#fff' }}>

      {/* ── Variant selector ── */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'border.default', background: '#fff', py: '10px' }}>
        <Flex
          alignItems="center"
          justifyContent="center"
          gap={1}
          sx={{ maxWidth: 1440, mx: 'auto', px: '16px' }}
        >
          {VARIANTS.map(({ id, label }) => {
            const isActive = variant === id
            return (
              <Box
                key={id}
                as="button"
                onClick={() => setVariant(id)}
                sx={{
                  background: isActive ? 'var(--colors-fg-default)' : 'transparent',
                  border: '1px solid',
                  borderColor: isActive ? 'fg.default' : 'border.default',
                  borderRadius: 4,
                  px: 3,
                  py: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#fff' : 'fg.muted',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.12s, color 0.12s, border-color 0.12s',
                  '&:hover': {
                    borderColor: 'fg.default',
                    color: isActive ? '#fff' : 'fg.default',
                  },
                }}
              >
                {label}
              </Box>
            )
          })}
        </Flex>
      </Box>

      {/* ── Inline nav — scrolls with the page, not sticky ── */}
      <Box sx={{ background: '#fff' }}>
        <Flex
          as="nav"
          alignItems="center"
          justifyContent="space-between"
          px={6}
          sx={{ height: 66, maxWidth: 1440, mx: 'auto' }}
        >
          <Box
            as="button"
            onClick={() => navigate('/')}
            sx={{ background: 'none', border: 'none', cursor: 'pointer', p: 0, display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <LogoSquarespace color="fg.default" />
            <Flex alignItems="baseline" gap={1} sx={{ '@media (max-width: 767px)': { display: 'none' } }}>
              <Text.Body m={0} sx={{ fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Squarespace</Text.Body>
              <Text.Body m={0} color="fg.muted" sx={{ fontSize: '13px' }}>Domains</Text.Body>
            </Flex>
          </Box>
          <Flex gap={6} alignItems="center" sx={{ '@media (max-width: 767px)': { display: 'none' } }}>
            {['Transfer a domain', 'Build a website'].map((link) => (
              <Text.Body key={link} m={0} color="fg.muted" sx={{ cursor: 'pointer', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, '&:hover': { color: 'fg.default' } }}>{link}</Text.Body>
            ))}
          </Flex>
          <Flex alignItems="center" gap={5}>
            <Text.Body m={0} color="fg.muted" sx={{ cursor: 'pointer', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, '&:hover': { color: 'fg.default' }, '@media (max-width: 767px)': { display: 'none' } }}>Log In</Text.Body>
            <Box as="button" aria-label="Open menu" sx={{ display: 'none', '@media (max-width: 767px)': { display: 'flex' }, flexDirection: 'column', justifyContent: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', p: 1 }}>
              {[0, 1, 2].map((i) => <Box key={i} sx={{ width: 22, height: 2, borderRadius: 1, background: 'var(--colors-fg-default)' }} />)}
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* ── Sticky nav — fixed, slides in once user scrolls past the search bar ── */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: '#fff',
        }}
      >
        <Flex
          as="nav"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: 80, maxWidth: 1440, mx: 'auto', px: '40px', '@media (max-width: 767px)': { px: '16px' } }}
        >
          {/* Logo */}
          <Box
            as="button"
            onClick={() => navigate('/')}
            sx={{ background: 'none', border: 'none', cursor: 'pointer', p: 0, display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}
          >
            <LogoSquarespace color="fg.default" />
            <Flex alignItems="baseline" gap={1} sx={{ '@media (max-width: 767px)': { display: 'none' } }}>
              <Text.Body m={0} sx={{ fontWeight: 500, fontSize: '14px', fontFamily: '"Clarkson", Helvetica, sans-serif', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Squarespace</Text.Body>
              <Text.Body m={0} sx={{ fontSize: '14px', fontFamily: '"Clarkson", Helvetica, sans-serif', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Domains</Text.Body>
            </Flex>
          </Box>

          {/* Center links — desktop only */}
          <Flex gap={8} alignItems="center" sx={{ '@media (max-width: 767px)': { display: 'none' } }}>
            {['Transfer a domain', 'Build a website'].map((link) => (
              <Flex key={link} alignItems="center" gap={1} sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
                <Text.Body m={0} sx={{ fontSize: '14px', fontFamily: '"Clarkson", Helvetica, sans-serif', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.02em', color: '#000' }}>{link}</Text.Body>
                <ChevronSmallDown sx={{ width: 16, height: 16, color: '#000' }} />
              </Flex>
            ))}
          </Flex>

          {/* Right: Log in + CTA */}
          <Flex alignItems="center" gap={8} sx={{ flexShrink: 0 }}>
            {/* Mobile compact search */}
            <Flex
              alignItems="center"
              gap={2}
              sx={{
                display: 'none',
                '@media (max-width: 767px)': { display: 'flex', flex: 1, mx: 0, height: 36, px: 3, borderRadius: 8, background: '#f0f0f0' },
              }}
            >
              <Search color="fg.muted" sx={{ width: 16, height: 16, flexShrink: 0 }} />
              <Box
                as="input"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for a domain"
                sx={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', color: 'fg.default', fontFamily: 'inherit' }}
              />
            </Flex>
            <Text.Body m={0} sx={{ cursor: 'pointer', fontSize: '14px', fontFamily: '"Clarkson", Helvetica, sans-serif', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.02em', color: '#000', '&:hover': { opacity: 0.7 }, '@media (max-width: 767px)': { display: 'none' } }}>Log in</Text.Body>
          </Flex>
        </Flex>
      </Box>

      {/* ── Page content ── */}
      <Box
        sx={{
          maxWidth: hasCart ? 1440 : 900,
          mx: 'auto',
          px: 8,
          pt: 140,
          pb: 24,
          transition: 'max-width 0.35s ease',
          '@media (max-width: 767px)': { px: '16px', pt: '32px', pb: cartItems.length > 0 ? '160px' : '40px' },
        }}
      >
        <Flex sx={{ gap: '100px', '@media (max-width: 767px)': { gap: 0 } }} alignItems="flex-start">

          {/* ── Left: search + results (3/5) ── */}
          <Box sx={{ flex: 3, minWidth: 0 }}>

            {/* Heading — observed by IntersectionObserver to trigger nav transition */}
            <Box ref={heroRef} mb={6} px={4}>
              <Box
                as="div"
                m={0}
                mb={2}
                sx={{
                  fontFamily: '"Clarkson", Helvetica, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  color: '#000',
                  fontSize: '32px',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                Find your domain
              </Box>
              <Text.Body m={0} color="fg.muted">
                Each domain name registration comes with a free suite of tools including WHOIS privacy and SSL certificate.
              </Text.Body>
            </Box>

            {/* Search input */}
            <Flex
              ref={searchBarRef}
              alignItems="center"
              mb={8}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              sx={{
                border: searchFocused ? '1px solid' : 'none',
                borderColor: 'fg.default',
                borderRadius: 8,
                height: 52,
                background: searchFocused ? '#fff' : '#f5f5f5',
                overflow: 'hidden',
                transition: 'background 0.15s ease',
              }}
            >
              <Flex alignItems="center" gap={3} px={4} sx={{ flex: 1, minWidth: 0 }}>
                <Search color="fg.muted" sx={{ flexShrink: 0 }} />
                <Field.Root name="domain-search" sx={{ flex: 1, minWidth: 0 }}>
                  <label id={labelId} style={{ display: 'none' }}>Search for a domain</label>
                  <TextInput
                    ref={inputRef}
                    aria-labelledby={labelId}
                    placeholder="Search for a domain"
                    value={inputValue}
                    onChange={(value: string) => setInputValue(value)}
                    onKeyDown={handleKeyDown}
                    sx={{
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      width: '100%',
                      color: 'fg.default',
                      fontSize: 3,
                      padding: 0,
                    }}
                  />
                </Field.Root>
              </Flex>
              {inputValue && (
                <Box
                  as="button"
                  onClick={handleClear}
                  aria-label="Clear search"
                  sx={{
                    background: '#d9d9d9',
                    border: 'none',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    mr: 3,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'fg.default',
                    transition: 'background 0.12s',
                    '&:hover': { background: '#c8c8c8' },
                  }}
                >
                  <CrossSmall sx={{ width: 14, height: 14 }} />
                </Box>
              )}
            </Flex>

            {/* Loading */}
            {isLoading && (
              <Flex justifyContent="center" alignItems="center" sx={{ minHeight: 300 }}>
                <ActivityIndicator />
              </Flex>
            )}

            {/* Results */}
            {!isLoading && results.length > 0 && (() => {
              const available = results.filter((r) => r.available)
              if (variant === 'cards') {
                return <CardsView results={available} cart={cart} onToggleCart={toggleCart} />
              }
              if (variant === 'sections') {
                return <SectionsView results={available} cart={cart} onToggleCart={toggleCart} />
              }
              return (
                <Box>
                  {available.map((r, i) => (
                    <ResultRow
                      key={r.id}
                      result={r}
                      inCart={cart.has(r.id)}
                      onToggleCart={toggleCart}
                      isTop={i === 0}
                      variant={variant}
                    />
                  ))}
                </Box>
              )
            })()}

            {/* Load more */}
            {!isLoading && results.length > 0 && (
              <Box
                as="button"
                sx={{
                  width: '100%',
                  mt: 4,
                  py: 4,
                  border: '1px solid',
                  borderColor: 'border.default',
                  borderRadius: 0,
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'fg.default',
                  transition: 'background 0.12s',
                  '&:hover': { background: 'var(--colors-bg-default)' },
                }}
              >
                Load more
              </Box>
            )}

            {/* Empty state */}
            {!isLoading && !q && (
              <Flex justifyContent="center" alignItems="center" sx={{ minHeight: 200 }}>
                <Text.Body m={0} color="fg.muted">Enter a domain name to search.</Text.Body>
              </Flex>
            )}
          </Box>

          {/* ── Right: cart sidebar (2/5) — hidden on mobile ── */}
          {hasCart && (
            <Box sx={{ flex: 2, minWidth: 0, alignSelf: 'flex-start', position: 'sticky', top: 80, '@media (max-width: 767px)': { display: 'none' } }}>
              <CartSidebar items={cartItems} results={results} onRemove={removeFromCart} onAdd={toggleCart} />
            </Box>
          )}

        </Flex>
      </Box>

      {/* Mobile mini cart — hidden on desktop, always rendered for slide-up animation */}
      <Box sx={{ display: 'none', '@media (max-width: 767px)': { display: 'block' } }}>
        <MobileMiniCart
            items={cartItems}
            results={results}
            onRemove={removeFromCart}
            onAdd={toggleCart}
            onCheckout={() => navigate('/cart', { state: { items: cartItems } })}
            lastAddedId={lastAddedId}
          />
        </Box>
    </Box>
  )
}

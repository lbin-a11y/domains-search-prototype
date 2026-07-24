import { useState, useRef, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Box, Flex } from '@sqs/rosetta-primitives'
import { LogoSquarespace, Search, ArrowRight, ChevronSmallDown, ChevronSmallUp, Sparkles, Checkmark } from '@sqs/rosetta-icons'

// ── Types ────────────────────────────────────────────────────────────────────

type DomainBadge = 'exact' | 'premium' | 'promoted'

interface DomainResult {
  id: string
  name: string
  tld: string
  badges: DomainBadge[]
  originalPrice: number
  salePrice: number | null
  available: boolean
  premiumFee?: number
  limitedTime?: boolean
}

const CLARKSON = '"Clarkson", Helvetica, sans-serif'
const BLUE = '#0072F0'
const BLUE_BG = '#D8E8FE'

// ── Data ─────────────────────────────────────────────────────────────────────

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

const TLD_CATALOG: Array<{
  tld: string; base: number; sale: number | null; promoted?: boolean; premium?: boolean; premiumFee?: number; limitedTime?: boolean
}> = [
  { tld: '.com', base: 20, sale: 14 },
  { tld: '.net', base: 20, sale: 14 },
  { tld: '.org', base: 20, sale: 9 },
  { tld: '.co', base: 36, sale: 26 },
  { tld: '.io', base: 60, sale: 48 },
  { tld: '.me', base: 26, sale: 18 },
  { tld: '.live', base: 20, sale: 10, promoted: true, limitedTime: true },
  { tld: '.store', base: 20, sale: 12, promoted: true },
  { tld: '.studio', base: 28, sale: 10, promoted: true, limitedTime: true },
  { tld: '.art', base: 24, sale: 18 },
  { tld: '.shop', base: 30, sale: 20 },
  { tld: '.online', base: 20, sale: 8 },
  { tld: '.photos', base: 40, sale: null, premium: true, premiumFee: 1000 },
  { tld: '.design', base: 34, sale: 28 },
  { tld: '.agency', base: 28, sale: null },
]

const STOP_WORDS = new Set(['a','an','the','and','or','of','in','for','to','my','our','i','is','with','at','by','from','as','be','that','on','are','we','it','us','about','but','not','this','have','has','want','need','idea','business','company','brand','shop','store','service','based'])

function extractKeywords(query: string): string[] {
  return query.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w))
}

function isDescription(query: string): boolean {
  return extractKeywords(query).length >= 3
}

function descriptionToStem(query: string): string {
  const words = extractKeywords(query)
  if (words.length === 0) return query.trim().toLowerCase().replace(/\s+/g, '')
  // combine first two meaningful keywords
  return words.length >= 2 ? words[0] + words[1] : words[0]
}

function relatedNames(stem: string, extraKeywords?: string[]): string[] {
  const stripped = stem.replace(/[aeiou]/gi, '').slice(0, 4)
  const base = [
    `${stem}studio`, `${stripped}${stem.slice(-3)}`,
    `my${stem}`, `get${stem}`, `the${stem}`,
  ]
  const fromKeywords = (extraKeywords ?? []).flatMap(k => [`${k}hq`, `${k}co`, `get${k}`])
  return [...new Set([...base, ...fromKeywords])].filter((s) => s !== stem).slice(0, 5)
}

function generateResults(rawQuery: string): DomainResult[] {
  const raw = rawQuery.trim().toLowerCase()
  const desc = isDescription(raw)
  const stem = desc
    ? descriptionToStem(raw)
    : raw.replace(/\s+/g, '').replace(/^\./, '').replace(/\.[a-z]+$/, '')
  const results: DomainResult[] = []

  const exactTld = !desc && rawQuery.includes('.') ? '.' + rawQuery.trim().split('.').pop()! : '.com'
  const exactCatalog = TLD_CATALOG.find((t) => t.tld === exactTld) ?? { tld: exactTld, base: 20, sale: 14 }
  results.push({
    id: `${stem}${exactTld}`, name: stem + exactTld, tld: exactTld,
    badges: ['exact'], originalPrice: exactCatalog.base, salePrice: exactCatalog.sale, available: true,
  })

  for (const cat of TLD_CATALOG) {
    if (cat.tld === exactTld) continue
    const available = hashStr(stem + cat.tld) % 4 !== 0
    const badges: DomainBadge[] = []
    if (cat.promoted) badges.push('promoted')
    if (cat.premium) badges.push('premium')
    results.push({
      id: `${stem}${cat.tld}`, name: stem + cat.tld, tld: cat.tld,
      badges, originalPrice: cat.base, salePrice: cat.sale, available,
      premiumFee: cat.premiumFee, limitedTime: cat.limitedTime,
    })
  }

  const extraKeywords = desc ? extractKeywords(raw).slice(2, 5) : undefined
  for (const altName of relatedNames(stem, extraKeywords)) {
    const available = hashStr(altName + '.com') % 3 !== 0
    results.push({ id: `${altName}.com`, name: `${altName}.com`, tld: '.com', badges: [], originalPrice: 20, salePrice: 14, available })
  }

  return results
}

// ── Tooltip ───────────────────────────────────────────────────────────────────

function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', '&:hover .tt': { opacity: 1 } }}>
      {children}
      <Box className="tt" sx={{
        position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%',
        transform: 'translateX(-50%)', background: '#0e0e0e', color: '#fff',
        fontFamily: CLARKSON, fontSize: '12px', px: '10px', py: '6px',
        borderRadius: 6, whiteSpace: 'nowrap', opacity: 0,
        pointerEvents: 'none', transition: 'opacity 0.15s', zIndex: 20,
      }}>
        {text}
      </Box>
    </Box>
  )
}

// ── Add button (cards) ────────────────────────────────────────────────────────

function AddBtn({ added, onClick }: { added: boolean; onClick: () => void }) {
  return (
    <Box
      as="button" onClick={onClick}
      sx={{
        width: 46, height: 46, borderRadius: 8, border: 'none',
        background: added ? '#444' : '#0e0e0e',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s',
        '&:hover': { background: '#333' },
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        {added
          ? <path d="M2 7H12" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
          : <><path d="M7 2V12" stroke="white" strokeWidth="1.6" strokeLinecap="round" /><path d="M2 7H12" stroke="white" strokeWidth="1.6" strokeLinecap="round" /></>
        }
      </svg>
    </Box>
  )
}

// ── Featured card ─────────────────────────────────────────────────────────────

function FeaturedCard({ domain, isExact, added, onToggle }: {
  domain: DomainResult; isExact: boolean; added: boolean; onToggle: () => void
}) {
  const price = domain.salePrice ?? domain.originalPrice
  const hasDiscount = domain.salePrice !== null && domain.salePrice < domain.originalPrice

  return (
    <Box onClick={onToggle} sx={{
      border: isExact ? '1px solid' : 'none', borderColor: '#a8cff8',
      borderRadius: 12, p: '28px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      minHeight: 190,
      background: isExact ? '#F4F5FD' : '#f8f8f8',
      boxShadow: isExact ? '0px 4px 20px 0px rgba(0,0,0,0.10)' : 'none',
      cursor: 'pointer',
    }}>
      <Box>
        <Flex alignItems="center" gap="5px" mb="10px">
          {isExact ? (
            <>
              <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                <path d="M1 5L4.5 8.5L12 1" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '14px', fontWeight: 300, color: BLUE }}>Exact match</Box>
            </>
          ) : (
            <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '14px', fontWeight: 300, color: '#888' }}>Close match</Box>
          )}
        </Flex>
        <Box as="p" m={0} sx={{
          fontFamily: CLARKSON, fontSize: '22px', fontWeight: 300,
          letterSpacing: '-0.8px', color: '#0e0e0e', lineHeight: 1.2, wordBreak: 'break-all',
        }}>
          {domain.name}
        </Box>
      </Box>
      <Flex alignItems="flex-end" justifyContent="space-between" mt="14px">
        <Box>
          <Flex alignItems="baseline" gap="6px">
            {hasDiscount && (
              <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '22px', fontWeight: 300, color: '#aaa', textDecoration: 'line-through', letterSpacing: '-0.5px' }}>
                ${domain.originalPrice}
              </Box>
            )}
            <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '22px', fontWeight: 300, color: '#0e0e0e', letterSpacing: '-0.5px' }}>
              ${price}
            </Box>
          </Flex>
          <Box as="p" m={0} sx={{ fontFamily: CLARKSON, fontSize: '13px', fontWeight: 300, color: '#888', mt: '3px' }}>
            {domain.premiumFee ? `per year + $${domain.premiumFee.toLocaleString()} one-time fee` : 'per year'}
          </Box>
        </Box>
        <Box onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <AddBtn added={added} onClick={onToggle} />
        </Box>
      </Flex>
    </Box>
  )
}

// ── Result row ────────────────────────────────────────────────────────────────

function ResultRow({ domain, added, onToggle, showLimitedTimeColumn, showRtb }: {
  domain: DomainResult; added: boolean; onToggle: () => void; showLimitedTimeColumn: boolean; showRtb?: boolean
}) {
  const price = domain.salePrice ?? domain.originalPrice
  const hasDiscount = domain.salePrice !== null && domain.salePrice < domain.originalPrice
  const isPromoted = domain.badges.includes('promoted')

  return (
    <Box sx={{ borderRadius: 8, overflow: 'hidden' }}>
    <Flex
      alignItems="center"
      gap="12px"
      onClick={onToggle}
      sx={{
        height: 62, px: '16px', cursor: 'pointer',
        borderRadius: showRtb ? '8px 8px 0 0' : 8,
        '&:hover': { background: '#f5f5f5' },
        transition: 'background 0.1s',
      }}
    >
      {/* Domain name */}
      <Box sx={{ fontFamily: CLARKSON, fontSize: '16px', color: '#0e0e0e', letterSpacing: '-0.015px' }}>
        {domain.name}
      </Box>

      {/* Popular badge — directly right of domain name, then flex spacer */}
      {isPromoted && (
        <Tooltip text="Trending for this category">
          <Flex alignItems="center" gap="5px" sx={{
            background: BLUE_BG, borderRadius: 20, px: '12px', py: '6px', flexShrink: 0,
          }}>
            <Sparkles sx={{ width: 13, height: 13, color: BLUE, flexShrink: 0 }} />
            <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '13px', fontWeight: 400, color: BLUE }}>Popular</Box>
          </Flex>
        </Tooltip>
      )}

      {/* Spacer pushes remaining items right */}
      <Box sx={{ flex: 1 }} />

      {/* Limited time — fixed-width so prices align across rows */}
      {showLimitedTimeColumn && (
        <Box sx={{ width: 92, flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
          {domain.limitedTime && (
            <Tooltip text="Discounted for a limited time">
              <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '13px', color: BLUE, whiteSpace: 'nowrap', cursor: 'default' }}>
                Limited time
              </Box>
            </Tooltip>
          )}
        </Box>
      )}

      {/* Prices */}
      <Flex alignItems="baseline" gap="5px" sx={{ flexShrink: 0, minWidth: 72, justifyContent: 'flex-end' }}>
        {hasDiscount && (
          <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '16px', color: '#bbb', textDecoration: 'line-through' }}>
            ${domain.originalPrice}
          </Box>
        )}
        <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '16px', color: '#0e0e0e', letterSpacing: '-0.015px' }}>
          ${price}
        </Box>
      </Flex>

      {/* Plain + */}
      <Box as="span" onClick={(e: React.MouseEvent) => e.stopPropagation()}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 24, height: 24 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          {added
            ? <path d="M3 8H13" stroke="#0e0e0e" strokeWidth="1.5" strokeLinecap="round" />
            : <><path d="M8 3V13" stroke="#0e0e0e" strokeWidth="1.5" strokeLinecap="round" /><path d="M3 8H13" stroke="#0e0e0e" strokeWidth="1.5" strokeLinecap="round" /></>
          }
        </svg>
      </Box>
    </Flex>
    {/* RTB panel */}
    <Box sx={{
      px: '16px',
      py: showRtb ? '10px' : 0,
      background: 'linear-gradient(8.25deg, rgba(136,188,216,0.3) 0%, rgba(243,255,193,0.3) 95%)',
      borderRadius: '0 0 8px 8px',
      maxHeight: showRtb ? '120px' : '0px',
      overflow: 'hidden',
      opacity: showRtb ? 1 : 0,
      transition: 'max-height 0.28s ease, opacity 0.2s ease, padding 0.28s ease',
      display: 'flex', flexDirection: 'column', gap: '4px',
    }}>
      <Flex alignItems="center" gap="10px">
        <Checkmark sx={{ width: 14, height: 14, color: '#0e0e0e', flexShrink: 0 }} />
        <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '14px', lineHeight: '22px', color: '#0e0e0e' }}>
          Popular choice for businesses in this category
        </Box>
      </Flex>
      <Flex alignItems="center" gap="10px">
        <Checkmark sx={{ width: 14, height: 14, color: '#0e0e0e', flexShrink: 0 }} />
        <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '14px', lineHeight: '22px', color: '#0e0e0e' }}>
          Available at a competitive price
        </Box>
      </Flex>
    </Box>
    </Box>
  )
}

// ── Filter pill ───────────────────────────────────────────────────────────────

function FilterPill({ label, active, onClick, chevron, muted }: {
  label: string; active?: boolean; onClick?: () => void; chevron?: boolean; muted?: boolean
}) {
  return (
    <Flex
      as="button" alignItems="center" gap="3px" onClick={onClick}
      sx={{
        height: 40, px: '16px', py: '10px',
        backdropFilter: 'blur(25px)',
        background: active ? '#0e0e0e' : 'rgba(183,183,183,0.2)',
        border: 'none',
        borderRadius: 30,
        cursor: 'pointer', fontFamily: CLARKSON, fontSize: '14px',
        color: active ? '#fff' : muted ? '#666' : '#0e0e0e',
        letterSpacing: '-0.01px', whiteSpace: 'nowrap', flexShrink: 0,
        transition: 'background 0.15s, color 0.15s',
      }}
    >
      {label}
      {chevron && <ChevronSmallDown sx={{ width: 12, height: 12, color: 'currentColor', ml: '2px' }} />}
    </Flex>
  )
}

// ── Results section ───────────────────────────────────────────────────────────

function ResultsSection({ label, domains, cart, onToggle, showSeeWhy }: {
  label: string; domains: DomainResult[]; cart: Set<string>; onToggle: (id: string) => void; showSeeWhy?: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const hasAnyLimitedTime = domains.some((d) => d.limitedTime)
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" sx={{ height: 62, px: '16px' }}>
        <Box sx={{ fontFamily: CLARKSON, fontSize: '18px', fontWeight: 500, color: '#0e0e0e', letterSpacing: '-0.3px' }}>
          {label}
        </Box>
        {showSeeWhy && (
          <Flex
            as="button" alignItems="center" gap="5px"
            onClick={() => setExpanded((v) => !v)}
            sx={{ background: 'none', border: 'none', cursor: 'pointer', p: 0, fontFamily: CLARKSON, fontSize: '14px', color: '#0e0e0e', letterSpacing: '-0.01em' }}
          >
            <Sparkles sx={{ width: 14, height: 14, color: '#0e0e0e', flexShrink: 0 }} />
            See why
            {expanded
              ? <ChevronSmallUp sx={{ width: 22, height: 22, color: '#0e0e0e' }} />
              : <ChevronSmallDown sx={{ width: 22, height: 22, color: '#0e0e0e' }} />
            }
          </Flex>
        )}
      </Flex>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {domains.map((d) => (
          <ResultRow key={d.id} domain={d} added={cart.has(d.id)} onToggle={() => onToggle(d.id)} showLimitedTimeColumn={hasAnyLimitedTime} showRtb={expanded} />
        ))}
      </Box>
    </Box>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DomainSearch() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const rawQuery = searchParams.get('q') ?? ''

  const [searchQuery, setSearchQuery] = useState(rawQuery)
  const results = useMemo(() => generateResults(rawQuery), [rawQuery])
  const [cart, setCart] = useState<Set<string>>(new Set())
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [searchFocused, setSearchFocused] = useState(false)

  const [guideMe, setGuideMe] = useState(false)
  const [industry, setIndustry] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [selectedVibes, setSelectedVibes] = useState<string[]>([])

  const guideMeSummary = [businessName, industry, selectedVibes.join(', ')].filter(Boolean).join(' · ')

  // Sync input when URL query changes
  useEffect(() => { setSearchQuery(rawQuery) }, [rawQuery])

  // Feed guide me fields directly into search bar, overwriting previous input
  const prevGuideMeSummary = useRef('')
  useEffect(() => {
    if (guideMeSummary && guideMeSummary !== prevGuideMeSummary.current) {
      setSearchQuery(guideMeSummary)
    }
    prevGuideMeSummary.current = guideMeSummary
  }, [guideMeSummary])

  function toggleVibe(v: string) {
    setSelectedVibes((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])
  }

  const exact = results.find((r) => r.badges.includes('exact'))!
  const closeMatch = results.find((r) => !r.badges.includes('exact') && r.available)
  const available = results.filter((r) => r.available && !r.badges.includes('exact'))
  const recommended = available.slice(0, 3)
  const more = available.slice(5)

  function toggleCart(id: string) {
    setCart((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleSearch() {
    const trimmed = searchQuery.trim()
    if (trimmed) navigate(`/domain-search?q=${encodeURIComponent(trimmed)}`)
  }

  const FILTERS = [`Popular for ${industry || 'your industry'}`, 'Short', 'Bundle deals']

  return (
    <Box sx={{ minHeight: '100vh', background: '#fff' }}>
      <style>{`
        @keyframes guideMeExpand {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Nav ── */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 100, background: '#fff', height: 80 }}>
        <Flex
          as="nav" alignItems="center" justifyContent="space-between"
          sx={{ height: '100%', px: '40px', maxWidth: 1440, mx: 'auto' }}
        >
          <Flex alignItems="center" gap="12px" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <LogoSquarespace color="fg.default" />
            <Flex alignItems="baseline" gap="4px">
              <Box as="span" sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.02em', color: '#0e0e0e' }}>
                Squarespace
              </Box>
              <Box as="span" sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.02em', color: '#0e0e0e' }}>
                Domains
              </Box>
            </Flex>
          </Flex>
          <Flex alignItems="center" gap="32px">
            <Box as="span" sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.02em', color: '#0e0e0e', cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
              Build a website
            </Box>
            <Box as="span" sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.02em', color: '#0e0e0e', cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
              Log in
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* ── Content ── */}
      <Box sx={{ maxWidth: 895, mx: 'auto', px: '40px', pb: '120px' }}>

        {/* Header, search, cards, filters — 16px inset to align with row content */}
        <Box sx={{ mx: '16px' }}>

        {/* Header */}
        <Box pt="48px" pb="24px">
          <Box as="p" m={0} mb="8px" sx={{
            fontFamily: CLARKSON,
            fontSize: '28px',
            fontWeight: 300,
            letterSpacing: '-1px',
            color: '#0e0e0e',
            lineHeight: 1.1,
          }}>
            Buy your dream domain
          </Box>
          <Box as="p" m={0} sx={{
            fontFamily: CLARKSON, fontSize: '15px', color: '#666',
            letterSpacing: '-0.01px', lineHeight: 1.5, maxWidth: 480,
          }}>
            Each domain name registration comes with free suite of tools including WHOIS privacy and SSL certificate.
          </Box>
        </Box>

        {/* Search bar — filter: drop-shadow when active, border when idle */}
        <Box sx={{
          position: 'relative', zIndex: 50, mb: '32px',
          filter: (searchFocused || guideMe)
            ? 'drop-shadow(0px 2px 8px rgba(0,0,0,0.10)) drop-shadow(0px 0px 1px rgba(0,0,0,0.04))'
            : 'none',
          transition: 'filter 0.2s ease',
        }}>
          {/* Card */}
          <Box
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            sx={{
              background: '#fff',
              borderRadius: guideMe ? '8px 8px 0 0' : 8,
              border: (searchFocused || guideMe) ? '1px solid transparent' : '1px solid #e2e2e2',
              transition: 'border-color 0.2s ease',
            }}
          >
            {/* Search row */}
            <Flex alignItems="center" sx={{ height: 62, gap: '16px', px: '24px' }}>
              <Search sx={{ width: 22, height: 22, flexShrink: 0, color: '#878787' }} />
              <Box
                as="input" value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') handleSearch() }}
                sx={{
                  flex: 1, border: 'none', background: 'transparent', outline: 'none',
                  fontSize: '15px', color: '#0e0e0e', fontFamily: CLARKSON,
                  letterSpacing: '-0.015px', lineHeight: 1.4,
                }}
              />
              {/* Guide me button */}
              <Box
                as="button"
                onClick={() => setGuideMe((g) => !g)}
                sx={{
                  background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0,
                  color: '#666', fontFamily: CLARKSON, fontSize: '15px',
                  letterSpacing: '-0.015px', lineHeight: 1.4, p: 0,
                  display: 'flex', alignItems: 'center',
                }}
              >
                Guide me
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none" style={{ marginLeft: '2px', transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)', transform: guideMe ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                  <path d="M1 1L5 5L9 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Box>
              <Box
                as="button" onClick={handleSearch} aria-label="Search"
                sx={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', p: 0, ml: '4px' }}
              >
                <ArrowRight sx={{ width: 22, height: 22, color: '#0e0e0e' }} />
              </Box>
            </Flex>
          </Box>

          {/* Guide me panel — absolute overlay, drop-shadow on parent wraps both */}
          <Box sx={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1000,
            background: '#fff', borderRadius: '0 0 8px 8px',
            borderTop: '1px solid #e7e7e7',
            p: '22px', display: 'flex', flexDirection: 'column', gap: '22px',
            opacity: guideMe ? 1 : 0,
            transform: guideMe ? 'translateY(0)' : 'translateY(-8px)',
            pointerEvents: guideMe ? 'auto' : 'none',
            transition: 'opacity 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)',
          }}>
            <Flex gap="16px">
              <Box as="select" value={industry}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setIndustry(e.target.value)}
                sx={{
                  flex: 1, height: 62,
                  background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: 8,
                  px: '16px', py: '12px', fontFamily: CLARKSON, fontSize: '15px',
                  color: industry ? '#0e0e0e' : '#898989',
                  letterSpacing: '-0.015px', lineHeight: 1.4,
                  appearance: 'none', cursor: 'pointer', outline: 'none',
                }}
              >
                <option value="" disabled>Industry</option>
                {['Retail', 'Food & Beverage', 'Health & Wellness', 'Creative Arts', 'Tech', 'Professional Services', 'Education', 'Travel', 'Real Estate', 'Non-profit'].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </Box>
              <Box
                as="input" type="text" value={businessName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusinessName(e.target.value)}
                placeholder="Business name (Optional)"
                sx={{
                  flex: 1, height: 62,
                  background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: 8,
                  px: '16px', py: '12px', fontFamily: CLARKSON, fontSize: '15px',
                  color: businessName ? '#0e0e0e' : '#898989',
                  letterSpacing: '-0.015px', lineHeight: 1.4,
                  outline: 'none', boxSizing: 'border-box',
                  '&::placeholder': { color: '#898989' },
                }}
              />
            </Flex>
            <Box>
              <Box mb="16px">
                <Box as="p" m={0} sx={{ fontFamily: CLARKSON, fontSize: '15px', color: '#0e0e0e', letterSpacing: '-0.015px', lineHeight: 1.4 }}>
                  {"What's the vibe of your business?"}
                </Box>
                <Box as="p" m={0} sx={{ fontFamily: CLARKSON, fontSize: '15px', color: '#666', letterSpacing: '-0.015px', lineHeight: 1.4 }}>
                  Select one or more.
                </Box>
              </Box>
              <Flex flexWrap="wrap" gap="8px">
                {['Professional', 'Friendly', 'Sophisticated', 'Playful', 'Modern', 'Informative'].map((vibe) => (
                  <Box
                    key={vibe} as="button" onClick={() => toggleVibe(vibe)}
                    sx={{
                      backdropFilter: 'blur(25px)',
                      background: selectedVibes.includes(vibe) ? '#0e0e0e' : 'rgba(183,183,183,0.2)',
                      border: '1px solid',
                      borderColor: selectedVibes.includes(vibe) ? '#0e0e0e' : 'transparent',
                      borderRadius: 30, px: '16px', py: '12px',
                      fontFamily: CLARKSON, fontSize: '15px',
                      color: selectedVibes.includes(vibe) ? '#fff' : '#0e0e0e',
                      letterSpacing: '-0.015px', lineHeight: 1.4,
                      cursor: 'pointer', whiteSpace: 'nowrap',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                  >
                    {vibe}
                  </Box>
                ))}
              </Flex>
            </Box>
          </Box>
        </Box>

        {/* Featured cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', mb: '64px' }}>
          <FeaturedCard domain={exact} isExact added={cart.has(exact.id)} onToggle={() => toggleCart(exact.id)} />
          {closeMatch && (
            <FeaturedCard domain={closeMatch} isExact={false} added={cart.has(closeMatch.id)} onToggle={() => toggleCart(closeMatch.id)} />
          )}
        </Box>

        {/* Filter pills — no border */}
        <Flex alignItems="center" justifyContent="space-between" mb="32px">
          <Flex alignItems="center" gap="8px">
            <FilterPill label="TLD type" chevron muted onClick={() => {}} />
            {FILTERS.map((f) => (
              <FilterPill key={f} label={f} active={activeFilter === f} onClick={() => setActiveFilter(activeFilter === f ? null : f)} />
            ))}
          </Flex>
          <FilterPill label="Sort by: Recommended" chevron muted />
        </Flex>

        </Box>{/* end 16px inset */}

        {/* Recommended */}
        <Box mb="64px">
          <ResultsSection
            label="Recommended"
            domains={recommended}
            cart={cart}
            onToggle={toggleCart}
            showSeeWhy
          />
        </Box>

        {/* More results */}
        {more.length > 0 && (
          <ResultsSection label="More results" domains={more} cart={cart} onToggle={toggleCart} />
        )}
      </Box>
    </Box>
  )
}

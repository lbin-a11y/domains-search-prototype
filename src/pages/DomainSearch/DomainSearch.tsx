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

const TRUSTED_TLDS = new Set(['.com', '.net', '.org', '.co', '.me'])
const TRENDING_TLDS = new Set(['.studio', '.live', '.store', '.shop', '.io', '.art', '.design', '.online', '.agency'])

const PERSONALIZED_SUGGESTIONS = [
  'Fun domains for a pottery studio',
  'Short, catchy names for a boutique brand',
]

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
  { tld: '.live', base: 160, sale: 120, promoted: true, limitedTime: true },
  { tld: '.store', base: 140, sale: 110, promoted: true },
  { tld: '.studio', base: 180, sale: 130, promoted: true, limitedTime: true },
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
        pointerEvents: 'none', transition: 'opacity 0.15s', zIndex: 500,
      }}>
        {text}
      </Box>
    </Box>
  )
}

// ── Confetti burst ────────────────────────────────────────────────────────────

function ConfettiBurst() {
  const shapes = [
    { cls: 'confetti-1', w: 6, h: 4, rx: 1 },
    { cls: 'confetti-2', w: 4, h: 4, rx: 2 },
    { cls: 'confetti-3', w: 5, h: 3, rx: 1 },
    { cls: 'confetti-4', w: 3, h: 5, rx: 1 },
    { cls: 'confetti-5', w: 4, h: 4, rx: 2 },
  ]
  return (
    <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 10 }}>
      {shapes.map(({ cls, w, h, rx }, i) => (
        <Box key={i} className={cls} sx={{ position: 'absolute', top: 0, left: 0, width: w, height: h, borderRadius: rx, background: BLUE, opacity: 1 }} />
      ))}
    </Box>
  )
}

// ── Add button (cards) ────────────────────────────────────────────────────────

function AddBtn({ added, onClick }: { added: boolean; onClick: () => void }) {
  const [burst, setBurst] = useState(false)
  function handleClick() {
    if (!added) { setBurst(true); setTimeout(() => setBurst(false), 750) }
    onClick()
  }
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      {burst && <ConfettiBurst />}
      <Box
        as="button" onClick={handleClick}
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
  const [justAdded, setJustAdded] = useState(false)

  function handleToggle() {
    if (!added) {
      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 600)
    }
    onToggle()
  }

  return (
    <Box sx={{ borderRadius: 8, position: 'relative' }}>
    <Flex
      alignItems="center"
      gap="12px"
      onClick={handleToggle}
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
        <Tooltip text="These domains are short, memorable, and in high demand, making your business easier to find and remember.">
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
            <Tooltip text="Get this promotional rate for your first year when registered by Jun 20, 2026.">
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

      {/* Plain + with confetti */}
      <Box as="span" onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleToggle() }}
        sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 24, height: 24 }}
      >
        {justAdded && <ConfettiBurst />}
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
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [searchFocused, setSearchFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [tldFilters, setTldFilters] = useState<Set<'trusted' | 'trending'>>(new Set())
  const [tldDropdownOpen, setTldDropdownOpen] = useState(false)
  const [sortBy, setSortBy] = useState<'recommended' | 'price'>('recommended')
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)
  const [loadingStage, setLoadingStage] = useState(0) // 0=all skeleton, 1=cards ready, 2=all ready
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('domainRecentSearches') || '[]') } catch { return [] }
  })

  const [guideMe, setGuideMe] = useState(false)
  const [industry, setIndustry] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [selectedVibes, setSelectedVibes] = useState<string[]>([])

  const guideMeSummary = [businessName, industry, selectedVibes.join(', ')].filter(Boolean).join(' · ')

  const tldDropdownRef = useRef<HTMLDivElement>(null)
  const sortDropdownRef = useRef<HTMLDivElement>(null)
  const suggestionsBlurTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync input when URL query changes
  useEffect(() => { setSearchQuery(rawQuery) }, [rawQuery])

  // Staggered skeleton loading: cards reveal first (~900ms), results after (~2-2.8s)
  const stage1Timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    setLoadingStage(0)
    if (loadingTimer.current) clearTimeout(loadingTimer.current)
    if (stage1Timer.current) clearTimeout(stage1Timer.current)
    stage1Timer.current = setTimeout(() => setLoadingStage(1), 900)
    loadingTimer.current = setTimeout(() => setLoadingStage(2), 2000 + Math.random() * 800)
    return () => {
      if (loadingTimer.current) clearTimeout(loadingTimer.current)
      if (stage1Timer.current) clearTimeout(stage1Timer.current)
    }
  }, [rawQuery])

  // Feed guide me fields directly into search bar, overwriting previous input
  const prevGuideMeSummary = useRef('')
  useEffect(() => {
    if (guideMeSummary && guideMeSummary !== prevGuideMeSummary.current) {
      setSearchQuery(guideMeSummary)
    }
    prevGuideMeSummary.current = guideMeSummary
  }, [guideMeSummary])

  // Close dropdowns on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (tldDropdownOpen && tldDropdownRef.current && !tldDropdownRef.current.contains(e.target as Node)) {
        setTldDropdownOpen(false)
      }
      if (sortDropdownOpen && sortDropdownRef.current && !sortDropdownRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [tldDropdownOpen, sortDropdownOpen])

  function toggleVibe(v: string) {
    setSelectedVibes((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])
  }

  function toggleTldFilter(id: 'trusted' | 'trending') {
    setTldFilters((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  function searchSuggestion(s: string) {
    const trimmed = s.trim()
    setSearchQuery(trimmed)
    setShowSuggestions(false)
    const updated = [trimmed, ...recentSearches.filter((r) => r !== trimmed)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('domainRecentSearches', JSON.stringify(updated))
    navigate(`/domain-search?q=${encodeURIComponent(trimmed)}`)
  }

  const exact = results.find((r) => r.badges.includes('exact'))!
  const closeMatch = results.find((r) => !r.badges.includes('exact') && r.available)
  const available = results.filter((r) => r.available && !r.badges.includes('exact'))

  const FILTERS = [`Popular for ${industry || 'your industry'}`, 'Short', 'Bundle deals']

  const filteredAvailable = available.filter((d) => {
    if (tldFilters.size > 0) {
      const allowed = new Set<string>()
      if (tldFilters.has('trusted')) TRUSTED_TLDS.forEach((t) => allowed.add(t))
      if (tldFilters.has('trending')) TRENDING_TLDS.forEach((t) => allowed.add(t))
      if (!allowed.has(d.tld)) return false
    }
    if (activeFilters.has(FILTERS[0]) && !d.badges.includes('promoted')) return false
    if (activeFilters.has('Short') && d.name.replace(/\.[^.]+$/, '').length > 8) return false
    if (activeFilters.has('Bundle deals') && d.salePrice === null) return false
    return true
  })

  const sortedAvailable = sortBy === 'price'
    ? [...filteredAvailable].sort((a, b) => (a.salePrice ?? a.originalPrice) - (b.salePrice ?? b.originalPrice))
    : filteredAvailable
  const recommended = sortedAvailable.slice(0, 3)
  const more = sortedAvailable.slice(3)

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
    if (!trimmed) return
    setShowSuggestions(false)
    setGuideMe(false)
    const updated = [trimmed, ...recentSearches.filter((s) => s !== trimmed)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('domainRecentSearches', JSON.stringify(updated))
    navigate(`/domain-search?q=${encodeURIComponent(trimmed)}`)
  }

  function handleSearchFocus() {
    setSearchFocused(true)
    if (suggestionsBlurTimer.current) clearTimeout(suggestionsBlurTimer.current)
    setShowSuggestions(true)
  }

  function handleSearchBlur() {
    setSearchFocused(false)
    suggestionsBlurTimer.current = setTimeout(() => setShowSuggestions(false), 150)
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#fff' }}>
      <style>{`
        @keyframes guideMeExpand {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e6e6e6 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s ease-in-out infinite;
          border-radius: 8px;
        }
        @keyframes confetti-1 { 0% { opacity:1; transform: translate(0,0) rotate(0deg) scale(1); } 100% { opacity:0; transform: translate(-18px,-32px) rotate(-60deg) scale(0.5); } }
        @keyframes confetti-2 { 0% { opacity:1; transform: translate(0,0) rotate(0deg) scale(1); } 100% { opacity:0; transform: translate(4px,-38px) rotate(40deg) scale(0.6); } }
        @keyframes confetti-3 { 0% { opacity:1; transform: translate(0,0) rotate(0deg) scale(1); } 100% { opacity:0; transform: translate(20px,-30px) rotate(80deg) scale(0.4); } }
        @keyframes confetti-4 { 0% { opacity:1; transform: translate(0,0) rotate(0deg) scale(1); } 100% { opacity:0; transform: translate(-10px,-42px) rotate(-30deg) scale(0.7); } }
        @keyframes confetti-5 { 0% { opacity:1; transform: translate(0,0) rotate(0deg) scale(1); } 100% { opacity:0; transform: translate(14px,-44px) rotate(120deg) scale(0.5); } }
        .confetti-1 { animation: confetti-1 0.6s ease-out forwards; }
        .confetti-2 { animation: confetti-2 0.65s ease-out forwards 0.03s; }
        .confetti-3 { animation: confetti-3 0.6s ease-out forwards 0.06s; }
        .confetti-4 { animation: confetti-4 0.7s ease-out forwards 0.01s; }
        .confetti-5 { animation: confetti-5 0.65s ease-out forwards 0.04s; }
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
      <Box sx={{ maxWidth: 895, mx: 'auto', px: '40px', pb: '120px', '@media (max-width: 600px)': { px: '16px' } }}>

        {/* Header, search, cards, filters — 16px inset to align with row content */}
        <Box sx={{ mx: '16px' }}>

        {/* Header */}
        <Box pt="48px" pb="24px">
          <Box as="p" m={0} mb="8px" sx={{
            fontFamily: CLARKSON,
            fontSize: '28px',
            fontWeight: 400,
            letterSpacing: '-1px',
            color: '#0e0e0e',
            lineHeight: 1.1,
          }}>
            Buy your dream domain
          </Box>
          <Box as="p" m={0} sx={{
            fontFamily: CLARKSON, fontSize: '15px', fontWeight: 300, color: '#666',
            letterSpacing: '-0.01px', lineHeight: 1.5, maxWidth: 480,
          }}>
            Each domain name registration comes with free suite of tools including WHOIS privacy and SSL certificate.
          </Box>
        </Box>

        {/* Search bar — filter: drop-shadow when active, border when idle */}
        <Box sx={{
          position: 'relative', zIndex: 50, mb: '32px',
          filter: (searchFocused || guideMe || showSuggestions)
            ? 'drop-shadow(0px 2px 8px rgba(0,0,0,0.10)) drop-shadow(0px 0px 1px rgba(0,0,0,0.04))'
            : 'none',
          transition: 'filter 0.2s ease',
        }}>
          {/* Card */}
          <Box
            sx={{
              background: '#fff',
              borderRadius: (guideMe || showSuggestions) ? '8px 8px 0 0' : 8,
              border: (searchFocused || guideMe || showSuggestions) ? '1px solid transparent' : '1px solid #e2e2e2',
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
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
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
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}
              >
                Guide me
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none" style={{ transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)', transform: guideMe ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
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

          {/* Suggestions dropdown — connected to search bar, matching guide me style */}
          {showSuggestions && !guideMe && (
            <Box sx={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999,
              background: '#fff', borderRadius: '0 0 8px 8px',
              borderTop: '1px solid #e7e7e7',
              overflow: 'hidden', pb: '8px',
            }}>
              {/* Personalized suggestions */}
              <Box sx={{ px: '22px', pt: '16px', pb: '6px' }}>
                <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '11px', fontWeight: 500, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Suggestions
                </Box>
              </Box>
              {PERSONALIZED_SUGGESTIONS.map((s) => (
                <Box
                  key={s} as="button"
                  onMouseDown={() => searchSuggestion(s)}
                  sx={{
                    width: '100%', px: '22px', py: '10px', border: 'none', background: 'none',
                    textAlign: 'left', cursor: 'pointer', fontFamily: CLARKSON, fontSize: '15px',
                    color: '#0e0e0e', display: 'flex', alignItems: 'center', gap: '12px',
                    letterSpacing: '-0.015px', lineHeight: 1.4, boxSizing: 'border-box',
                    '&:hover': { background: 'rgba(0,0,0,0.03)' },
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 1.657.898 3.105 2.23 3.88V11.5h4.54V9.88C11.602 9.105 12.5 7.657 12.5 6c0-2.485-2.015-4.5-4.5-4.5Z" stroke="#aaa" strokeWidth="1.3" strokeLinejoin="round"/>
                    <path d="M5.75 13h4.5M6.5 14.5h3" stroke="#aaa" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  {s}
                </Box>
              ))}
              {recentSearches.length > 0 && (
                <>
                  <Box sx={{ px: '22px', pt: '16px', pb: '6px' }}>
                    <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '11px', fontWeight: 500, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      Recent searches
                    </Box>
                  </Box>
                  {recentSearches.slice(0, 3).map((s) => (
                    <Box
                      key={s} as="button"
                      onMouseDown={() => searchSuggestion(s)}
                      sx={{
                        width: '100%', px: '22px', py: '10px', border: 'none', background: 'none',
                        textAlign: 'left', cursor: 'pointer', fontFamily: CLARKSON, fontSize: '15px',
                        color: '#0e0e0e', display: 'flex', alignItems: 'center', gap: '12px',
                        letterSpacing: '-0.015px', lineHeight: 1.4, boxSizing: 'border-box',
                        '&:hover': { background: 'rgba(0,0,0,0.03)' },
                      }}
                    >
                      {/* Clock with arrow icon */}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                        <circle cx="8" cy="8" r="6.25" stroke="#aaa" strokeWidth="1.3"/>
                        <path d="M8 5v3.5l2 1.5" stroke="#aaa" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.5 12.5l-2 1.5" stroke="#aaa" strokeWidth="1.3" strokeLinecap="round"/>
                        <path d="M1.5 14l1.8-0.2-0.2-1.8" stroke="#aaa" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {s}
                    </Box>
                  ))}
                </>
              )}
            </Box>
          )}

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
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', mb: '64px', '@media (max-width: 600px)': { gridTemplateColumns: '1fr' } }}>
          {loadingStage < 1 ? (
            <>
              <Box className="skeleton" sx={{ height: 190 }} />
              <Box className="skeleton" sx={{ height: 190 }} />
            </>
          ) : (
            <>
              <FeaturedCard domain={exact} isExact added={cart.has(exact.id)} onToggle={() => toggleCart(exact.id)} />
              {closeMatch && (
                <FeaturedCard domain={closeMatch} isExact={false} added={cart.has(closeMatch.id)} onToggle={() => toggleCart(closeMatch.id)} />
              )}
            </>
          )}
        </Box>

        {/* Filter pills */}
        <Flex alignItems="center" justifyContent="space-between" mb="32px">
          <Flex alignItems="center" gap="8px" sx={{ flexWrap: 'nowrap', overflow: 'visible' }}>
            {/* TLD type — multi-select with checkboxes */}
            <div ref={tldDropdownRef} style={{ position: 'relative', flexShrink: 0 }}>
              <FilterPill
                label="TLD type"
                chevron
                active={tldFilters.size > 0}
                onClick={() => setTldDropdownOpen((o) => !o)}
              />
              {tldDropdownOpen && (
                <Box sx={{
                  position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 300,
                  background: '#fff', borderRadius: 8,
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.12)',
                  minWidth: 180, overflow: 'hidden', py: '6px',
                }}>
                  {([
                    { id: 'trusted' as const, label: 'Trusted', desc: '.com, .net, .org' },
                    { id: 'trending' as const, label: 'Trending', desc: '.studio, .io, .art' },
                  ]).map(({ id, label, desc }) => (
                    <Flex
                      key={id} as="button" alignItems="center" gap="12px"
                      onClick={() => toggleTldFilter(id)}
                      sx={{
                        width: '100%', px: '14px', py: '10px', border: 'none', textAlign: 'left',
                        cursor: 'pointer', background: 'transparent',
                        '&:hover': { background: '#f5f5f5' },
                      }}
                    >
                      {/* Checkbox */}
                      <Box sx={{
                        width: 16, height: 16, borderRadius: '3px', flexShrink: 0,
                        border: tldFilters.has(id) ? 'none' : '1.5px solid #ccc',
                        background: tldFilters.has(id) ? BLUE : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {tldFilters.has(id) && (
                          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </Box>
                      <Box>
                        <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '14px', color: '#0e0e0e', display: 'block' }}>{label}</Box>
                        <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '12px', color: '#888', display: 'block' }}>{desc}</Box>
                      </Box>
                    </Flex>
                  ))}
                </Box>
              )}
            </div>
            {FILTERS.map((f) => (
              <FilterPill key={f} label={f} active={activeFilters.has(f)} onClick={() => setActiveFilters((prev) => {
                const next = new Set(prev)
                if (next.has(f)) next.delete(f); else next.add(f)
                return next
              })} />
            ))}
          </Flex>

          {/* Sort by — custom pill with black value text */}
          <div ref={sortDropdownRef} style={{ position: 'relative', flexShrink: 0 }}>
            <Flex
              as="button" alignItems="center" gap="3px"
              onClick={() => setSortDropdownOpen((o) => !o)}
              sx={{
                height: 40, px: '16px', py: '10px',
                backdropFilter: 'blur(25px)',
                background: 'rgba(183,183,183,0.2)',
                border: 'none', borderRadius: 30,
                cursor: 'pointer', fontFamily: CLARKSON, fontSize: '14px',
                letterSpacing: '-0.01px', whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              <Box as="span" sx={{ color: '#666' }}>Sort by: </Box>
              <Box as="span" sx={{ color: '#0e0e0e', fontWeight: 400 }}>
                {sortBy === 'price' ? 'Price' : 'Recommended'}
              </Box>
              <ChevronSmallDown sx={{ width: 12, height: 12, color: '#0e0e0e', ml: '2px' }} />
            </Flex>
            {sortDropdownOpen && (
              <Box sx={{
                position: 'absolute', top: 'calc(100% + 4px)', right: 0, zIndex: 300,
                background: '#fff', borderRadius: 8,
                boxShadow: '0px 4px 20px rgba(0,0,0,0.12)',
                minWidth: 160, overflow: 'hidden', py: '6px',
              }}>
                {([
                  { id: 'recommended' as const, label: 'Recommended', icon: null },
                  { id: 'price' as const, label: 'Price', icon: (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4 }}>
                      <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="#0e0e0e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )},
                ]).map(({ id, label, icon }) => (
                  <Flex
                    key={id} as="button" alignItems="center"
                    onClick={() => { setSortBy(id); setSortDropdownOpen(false) }}
                    sx={{
                      width: '100%', px: '16px', py: '10px', border: 'none', textAlign: 'left',
                      cursor: 'pointer', fontFamily: CLARKSON, fontSize: '14px', color: '#0e0e0e',
                      background: sortBy === id ? '#f0f0f0' : 'transparent',
                      '&:hover': { background: '#f5f5f5' },
                    }}
                  >
                    {label}{icon}
                  </Flex>
                ))}
              </Box>
            )}
          </div>
        </Flex>

        </Box>{/* end 16px inset */}

        {loadingStage < 2 ? (
          /* Skeleton results */
          <Box>
            <Flex alignItems="center" justifyContent="space-between" sx={{ height: 62, px: '16px' }}>
              <Box className="skeleton" sx={{ width: 140, height: 18 }} />
              <Box className="skeleton" sx={{ width: 80, height: 18 }} />
            </Flex>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[0,1,2].map((i) => (
                <Box key={i} className="skeleton" sx={{ height: 62, animationDelay: `${i * 0.1}s` }} />
              ))}
            </Box>
          </Box>
        ) : (
          <>
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
          </>
        )}
      </Box>
    </Box>
  )
}

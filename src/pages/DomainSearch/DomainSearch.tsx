import { useState, useEffect, useId, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Box, Flex, Text, Field } from '@sqs/rosetta-primitives'
import { ActivityIndicator, TextInput, Tabs } from '@sqs/rosetta-elements'
import {
  LogoSquarespace,
  Search,
  ShoppingBag,
  Star,
  Checkmark,
  Diamond,
  CrossSmall,
  Trash,
  ChevronSmallUp,
  ChevronSmallDown,
  InfoCircle,
  Heart,
  HeartFilled,
  Sparkles,
} from '@sqs/rosetta-icons'
import { useAppContext } from '../../context/AppContext'
import type { FavoritedDomain } from '../../context/AppContext'
import AuthModal from './AuthModal'
import FavoritesTab from './FavoritesTab'

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
}> = [
  { tld: '.com',    base: 20, sale: 14 },
  { tld: '.net',    base: 20, sale: 14 },
  { tld: '.org',    base: 20, sale: 9 },
  { tld: '.co',     base: 36, sale: 26 },
  { tld: '.io',     base: 60, sale: 48 },
  { tld: '.me',     base: 26, sale: 18 },
  { tld: '.live',   base: 20, sale: 10, promoted: true },
  { tld: '.store',  base: 20, sale: 12, promoted: true },
  { tld: '.studio', base: 28, sale: 22 },
  { tld: '.art',    base: 24, sale: 18 },
  { tld: '.shop',   base: 30, sale: 20 },
  { tld: '.online', base: 20, sale: 8,  promoted: true },
  { tld: '.photos', base: 30, sale: null, premium: true },
  { tld: '.design', base: 34, sale: 28 },
  { tld: '.agency', base: 28, sale: null },
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
    const available = hashStr(stem + cat.tld) % 4 !== 0
    const badges: DomainBadge[] = []
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

// ── Badge ─────────────────────────────────────────────────────────────────────

function Badge({ kind }: { kind: DomainBadge }) {
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
    return (
      <Flex alignItems="center" gap={1} px={2} py={1} sx={{ borderRadius: 20, background: '#e8f0fe', flexShrink: 0 }}>
        <Star sx={{ width: 11, height: 11, color: '#0862d1' }} />
        <Text.Caption m={0} sx={{ fontSize: '11px', fontWeight: 600, color: '#0862d1', lineHeight: 1 }}>
          Premium
        </Text.Caption>
      </Flex>
    )
  }
  if (kind === 'promoted') {
    return (
      <Flex alignItems="center" gap={1} px={2} py={1} sx={{ borderRadius: 20, background: '#e0f7fa', flexShrink: 0 }}>
        <Diamond sx={{ width: 11, height: 11, color: '#00838f' }} />
        <Text.Caption m={0} sx={{ fontSize: '11px', fontWeight: 600, color: '#00838f', lineHeight: 1 }}>
          Promoted
        </Text.Caption>
      </Flex>
    )
  }
  return null
}

// ── Result row ────────────────────────────────────────────────────────────────

function ResultRow({
  result,
  inCart,
  onToggleCart,
  isTop,
  isFavorited,
  onFavorite,
  onExploreSimilar,
  expandedResults,
  allowExpand = true,
  cartIds,
  favoritedIds,
}: {
  result: DomainResult
  inCart: boolean
  onToggleCart: (id: string) => void
  isTop: boolean
  isFavorited: boolean
  onFavorite: (result: DomainResult) => void
  onExploreSimilar: (result: DomainResult) => void
  expandedResults?: DomainResult[]
  allowExpand?: boolean
  cartIds?: Set<string>
  favoritedIds?: Set<string>
}) {
  const isExpanded = expandedResults !== undefined
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Box>
      <Flex
        alignItems="center"
        gap={3}
        px={4}
        py={3}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
            fontWeight={result.badges.includes('exact') ? 'semibold' : 'book'}
            sx={{ color: result.available ? 'fg.default' : 'fg.disabled', flexShrink: 0 }}
          >
            {result.name}
          </Text.Body>
          {result.badges.length > 0 && (
            <Flex gap={1} alignItems="center">
              {result.badges.map((b) => <Badge key={b} kind={b} />)}
            </Flex>
          )}
        </Flex>

        {/* Generate more + heart — hover only, left of price */}
        {result.available && (
          <Flex
            alignItems="center"
            gap={1}
            sx={{
              flexShrink: 0,
              opacity: isHovered ? 1 : 0,
              pointerEvents: isHovered ? 'auto' : 'none',
              transition: 'opacity 0.15s ease',
            }}
          >
            {allowExpand && (
              <Box sx={{ position: 'relative', '&:hover [role="tooltip"]': { opacity: 1 } }}>
                <Box
                  as="button"
                  onClick={() => onExploreSimilar(result)}
                  aria-label="Generate more like this"
                  sx={{
                    border: 'none',
                    cursor: 'pointer',
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isExpanded ? 'var(--colors-bg-default)' : 'transparent',
                    transition: 'background 0.2s ease',
                    '&:hover': { background: 'var(--colors-bg-default)' },
                  }}
                >
                  <Sparkles sx={{ width: 16, height: 16, color: isExpanded ? 'var(--colors-fg-default)' : 'var(--colors-fg-muted)' }} />
                </Box>
                <Box
                  role="tooltip"
                  sx={{
                    position: 'absolute',
                    bottom: 'calc(100% + 6px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--colors-fg-default)',
                    color: '#fff',
                    fontSize: '11px',
                    px: '8px',
                    py: '4px',
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    opacity: 0,
                    transition: 'opacity 0.15s ease',
                    zIndex: 10,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      border: '4px solid transparent',
                      borderTopColor: 'var(--colors-fg-default)',
                    },
                  }}
                >
                  Generate more like this
                </Box>
              </Box>
            )}

            <Box
              as="button"
              onClick={() => onFavorite(result)}
              aria-label={isFavorited ? 'Remove from saved' : 'Save domain'}
              sx={{
                border: 'none',
                cursor: 'pointer',
                width: 32,
                height: 32,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                transition: 'background 0.2s ease',
                '&:hover': { background: 'var(--colors-bg-default)' },
              }}
            >
              {isFavorited
                ? <HeartFilled sx={{ width: 16, height: 16, color: '#e05252' }} />
                : <Heart sx={{ width: 16, height: 16, color: 'var(--colors-fg-muted)' }} />
              }
            </Box>
          </Flex>
        )}

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

        {/* Cart toggle — rightmost, always visible */}
        {result.available ? (
          <Box
            as="button"
            onClick={() => onToggleCart(result.id)}
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
        ) : (
          <Box sx={{ width: 36, flexShrink: 0 }} />
        )}
      </Flex>

      {/* Generated similar results */}
      {expandedResults !== undefined && (
        <Box
          sx={{
            borderLeft: '2px solid',
            borderColor: 'border.default',
            ml: 6,
            mb: 2,
            borderRadius: '0 0 6px 6px',
          }}
        >
          {expandedResults.length === 0 ? (
            <Box px={4} py={3}>
              <Text.Body m={0} color="fg.muted" sx={{ fontSize: '13px' }}>No results found.</Text.Body>
            </Box>
          ) : (
            expandedResults.map((r) => (
              <ResultRow
                key={r.id}
                result={r}
                inCart={cartIds ? cartIds.has(r.id) : false}
                onToggleCart={onToggleCart}
                isTop={false}
                isFavorited={favoritedIds ? favoritedIds.has(r.id) : false}
                onFavorite={onFavorite}
                onExploreSimilar={() => {}}
                allowExpand={false}
              />
            ))
          )}
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
  onAdd: (id: string) => void
}) {
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
                  {/* Toggle row */}
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

                  {isOpen && (
                    <Box px="8px" pb="8px" sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {matching.map((m) => {
                        const stem = getSld(m.name)
                        const ext = m.name.slice(stem.length + 1)
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
                            <Box sx={{ flex: '1 1 0', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              <Text.Body as="span" m={0} sx={{ fontSize: '14px' }}>{stem}.</Text.Body>
                              <Text.Body as="span" m={0} fontWeight="semibold" sx={{ fontSize: '14px' }}>{ext}</Text.Body>
                            </Box>
                            <Text.Body m={0} sx={{ fontSize: '14px', flexShrink: 0 }}>
                              ${price}
                            </Text.Body>
                            <Box
                              as="button"
                              onClick={() => onAdd(m.id)}
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
                  )}
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

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DomainSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const q = searchParams.get('q') ?? ''

  const { isLoggedIn, login, logout, favorites, addFavorite, removeFavorite } = useAppContext()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [pageTab, setPageTab] = useState<'search' | 'favorites'>('search')
  const [expandedSimilar, setExpandedSimilar] = useState<Record<string, DomainResult[]>>({})
  const pendingFavoriteRef = useRef<FavoritedDomain | null>(null)

  const [inputValue, setInputValue] = useState(q)
  const [results, setResults] = useState<DomainResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [cart, setCart] = useState<Set<string>>(new Set())
  const [searchFocused, setSearchFocused] = useState(false)
  const [heroPassed, setHeroPassed] = useState(false)
  const [searchBarPassed, setSearchBarPassed] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeroPassed(!entry.isIntersecting),
      { threshold: 0 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setSearchBarPassed(!entry.isIntersecting),
      { threshold: 0 }
    )
    if (searchBarRef.current) observer.observe(searchBarRef.current)
    return () => observer.disconnect()
  }, [])
  const labelId = useId()

  useEffect(() => {
    setInputValue(q)
    if (!q) { setResults([]); return }
    setIsLoading(true)
    setResults([])
    const t = window.setTimeout(() => {
      setResults(generateResults(q))
      setIsLoading(false)
    }, 700)
    return () => window.clearTimeout(t)
  }, [q])

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

  function toggleCart(id: string) {
    setCart((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function removeFromCart(id: string) {
    setCart((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function handleFavoriteClick(result: DomainResult) {
    if (!isLoggedIn) {
      pendingFavoriteRef.current = {
        id: result.id,
        name: result.name,
        tld: result.tld,
        originalPrice: result.originalPrice,
        salePrice: result.salePrice,
      }
      setAuthModalOpen(true)
      return
    }
    if (favorites.has(result.id)) {
      removeFavorite(result.id)
    } else {
      addFavorite({
        id: result.id,
        name: result.name,
        tld: result.tld,
        originalPrice: result.originalPrice,
        salePrice: result.salePrice,
      })
    }
  }

  function generateSimilar(result: DomainResult, existingIds: Set<string>): DomainResult[] {
    const sld = getSld(result.name)
    const altSlds = relatedNames(sld)
    const tldPool = TLD_CATALOG.filter((t) => ['.com', '.co', '.io', '.net', '.studio', '.art', '.shop', '.design'].includes(t.tld))
    const candidates: DomainResult[] = []
    for (const altSld of altSlds) {
      for (const cat of tldPool) {
        const id = `${altSld}${cat.tld}`
        if (existingIds.has(id)) continue
        const badges: DomainBadge[] = cat.promoted ? ['promoted'] : cat.premium ? ['premium'] : []
        candidates.push({
          id,
          name: `${altSld}${cat.tld}`,
          tld: cat.tld,
          badges,
          originalPrice: cat.base,
          salePrice: cat.sale,
          available: hashStr(id) % 4 !== 0,
        })
      }
    }
    return candidates.slice(0, 4)
  }

  function handleExploreSimilar(result: DomainResult) {
    if (expandedSimilar[result.id] !== undefined) {
      setExpandedSimilar((prev) => {
        const next = { ...prev }
        delete next[result.id]
        return next
      })
      return
    }
    const existingIds = new Set(results.map((r) => r.id))
    for (const expResults of Object.values(expandedSimilar)) {
      for (const r of expResults) existingIds.add(r.id)
    }
    setExpandedSimilar((prev) => ({ ...prev, [result.id]: generateSimilar(result, existingIds) }))
  }

  const cartItems = results.filter((r) => cart.has(r.id))
  const cartCount = cart.size
  const hasCart = cartCount > 0
  const panelVisible = hasCart

  // suppress unused variable warning for heroPassed
  void heroPassed

  return (
    <Box sx={{ minHeight: '100vh', background: '#fff' }}>

      {/* ── Inline nav ── */}
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
            {isLoggedIn ? (
              <Text.Body
                m={0}
                color="fg.muted"
                onClick={logout}
                sx={{ cursor: 'pointer', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, '&:hover': { color: 'fg.default' }, '@media (max-width: 767px)': { display: 'none' } }}
              >
                Log out
              </Text.Body>
            ) : (
              <Text.Body
                m={0}
                color="fg.muted"
                onClick={() => setAuthModalOpen(true)}
                sx={{ cursor: 'pointer', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, '&:hover': { color: 'fg.default' }, '@media (max-width: 767px)': { display: 'none' } }}
              >
                Log in
              </Text.Body>
            )}
            <Box as="button" aria-label="Open menu" sx={{ display: 'none', '@media (max-width: 767px)': { display: 'flex' }, flexDirection: 'column', justifyContent: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', p: 1 }}>
              {[0, 1, 2].map((i) => <Box key={i} sx={{ width: 22, height: 2, borderRadius: 1, background: 'var(--colors-fg-default)' }} />)}
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* ── Sticky nav ── */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: '#fff',
          boxShadow: '0 1px 12px rgba(0,0,0,0.08)',
          transform: searchBarPassed ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.28s ease',
        }}
      >
        <Flex
          as="nav"
          alignItems="center"
          justifyContent="space-between"
          px={6}
          sx={{ height: 60, maxWidth: 1440, mx: 'auto' }}
        >
          <Box
            as="button"
            onClick={() => navigate('/')}
            sx={{ background: 'none', border: 'none', cursor: 'pointer', p: 0, display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0, '@media (max-width: 767px)': { display: 'none' } }}
          >
            <LogoSquarespace color="fg.default" />
            <Flex alignItems="baseline" gap={1}>
              <Text.Body m={0} sx={{ fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Squarespace</Text.Body>
              <Text.Body m={0} color="fg.muted" sx={{ fontSize: '13px' }}>Domains</Text.Body>
            </Flex>
          </Box>

          {/* Compact search bar — mobile only, shown after page search bar scrolls out */}
          <Flex
            alignItems="center"
            gap={2}
            sx={{
              display: 'none',
              '@media (max-width: 767px)': { display: 'flex', flex: 1, mx: 3, height: 36, px: 3, borderRadius: 8, background: '#f0f0f0' },
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

          {/* Right: log in + cart */}
          <Flex alignItems="center" gap={5} sx={{ flexShrink: 0, '@media (max-width: 767px)': { display: 'none' } }}>
            {isLoggedIn ? (
              <Text.Body m={0} color="fg.muted" onClick={logout} sx={{ cursor: 'pointer', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, '&:hover': { color: 'fg.default' } }}>Log out</Text.Body>
            ) : (
              <Text.Body m={0} color="fg.muted" onClick={() => setAuthModalOpen(true)} sx={{ cursor: 'pointer', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, '&:hover': { color: 'fg.default' } }}>Log in</Text.Body>
            )}
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', opacity: hasCart ? 1 : 0, pointerEvents: hasCart ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
              <Box as="button" sx={{ background: 'none', border: 'none', cursor: 'pointer', p: 1, display: 'flex', alignItems: 'center', color: 'fg.default' }}>
                <ShoppingBag sx={{ width: 20, height: 20 }} />
              </Box>
              <Box sx={{ position: 'absolute', top: '-6px', right: '-6px', width: 16, height: 16, borderRadius: '50%', background: 'var(--colors-fg-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <Text.Caption m={0} sx={{ fontSize: '10px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{cartCount}</Text.Caption>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* ── Page content ── */}
      <Box
        sx={{
          maxWidth: panelVisible ? 1440 : 900,
          mx: 'auto',
          px: 8,
          pt: 80,
          pb: 24,
          transition: 'max-width 0.35s ease',
          '@media (max-width: 767px)': { px: '16px', pt: '32px', pb: '40px' },
        }}
      >
        <Flex sx={{ gap: '100px', '@media (max-width: 767px)': { gap: 0 } }} alignItems="flex-start">

          {/* ── Left: title + tabs + content ── */}
          <Box sx={{ flex: 3, minWidth: 0 }}>

            {/* Heading */}
            <Box ref={heroRef} mb={4} px={4}>
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

            {/* Page-level tabs: Search / Favorites */}
            <Box px={4} mb={6}>
              <Tabs
                value={pageTab}
                onChange={(v: string) => setPageTab(v as 'search' | 'favorites')}
                options={[
                  { label: 'Search', value: 'search' },
                  { label: favorites.size > 0 ? `Favorites (${favorites.size})` : 'Favorites', value: 'favorites' },
                ]}
              />
            </Box>

            {/* Search tab content */}
            {pageTab === 'search' && (
              <>
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
                {!isLoading && results.length > 0 && (
                  <Box>
                    {results.map((r, i) => (
                      <ResultRow
                        key={r.id}
                        result={r}
                        inCart={cart.has(r.id)}
                        onToggleCart={toggleCart}
                        isTop={i === 0}
                        isFavorited={favorites.has(r.id)}
                        onFavorite={handleFavoriteClick}
                        onExploreSimilar={handleExploreSimilar}
                        expandedResults={expandedSimilar[r.id]}
                        cartIds={cart}
                        favoritedIds={new Set(favorites.keys())}
                      />
                    ))}
                  </Box>
                )}

                {/* Empty state */}
                {!isLoading && !q && (
                  <Flex justifyContent="center" alignItems="center" sx={{ minHeight: 200 }}>
                    <Text.Body m={0} color="fg.muted">Enter a domain name to search.</Text.Body>
                  </Flex>
                )}
              </>
            )}

            {/* Favorites tab content */}
            {pageTab === 'favorites' && (
              <FavoritesTab
                favorites={favorites}
                cart={cart}
                onToggleCart={toggleCart}
                onRemoveFavorite={removeFavorite}
              />
            )}
          </Box>

          {/* ── Right: cart sidebar — hidden on mobile ── */}
          {panelVisible && (
            <Box sx={{ flex: 2, minWidth: 0, alignSelf: 'flex-start', position: 'sticky', top: 80, '@media (max-width: 767px)': { display: 'none' } }}>
              <CartSidebar items={cartItems} results={results} onRemove={removeFromCart} onAdd={toggleCart} />
            </Box>
          )}

        </Flex>
      </Box>

      {/* ── Auth modal ── */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          login()
          if (pendingFavoriteRef.current) {
            addFavorite(pendingFavoriteRef.current)
            pendingFavoriteRef.current = null
          }
          setAuthModalOpen(false)
        }}
      />
    </Box>
  )
}

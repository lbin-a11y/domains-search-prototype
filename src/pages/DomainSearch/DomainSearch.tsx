import { useState, useRef, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Box, Flex, Text } from '@sqs/rosetta-primitives'
import { LogoSquarespace, Search, ArrowRight, ChevronSmallDown, ChevronSmallUp, Sparkles, Checkmark, Trash } from '@sqs/rosetta-icons'

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



const TLD_UPSELL_OPTIONS = [
  { ext: '.net', price: 14 }, { ext: '.org', price: 9 }, { ext: '.co', price: 26 },
  { ext: '.io', price: 39 }, { ext: '.info', price: 12 }, { ext: '.ai', price: 65 },
  { ext: '.app', price: 14 }, { ext: '.me', price: 18 }, { ext: '.studio', price: 25 },
  { ext: '.design', price: 29 }, { ext: '.xyz', price: 10 }, { ext: '.shop', price: 26 },
]

function pickTldsForDomain(name: string, exclude: Set<string>, count = 3): { ext: string; price: number }[] {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (Math.imul(31, h) + name.charCodeAt(i)) | 0
  const pool = TLD_UPSELL_OPTIONS.filter((t) => !exclude.has(name + t.ext))
  const result: typeof pool = []
  let seed = Math.abs(h)
  const arr = [...pool]
  for (let i = 0; i < count && arr.length > 0; i++) {
    const idx = seed % arr.length
    result.push(arr.splice(idx, 1)[0])
    seed = (seed * 1664525 + 1013904223) >>> 0
  }
  return result
}

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
  const exactAvailable = Math.abs(hashStr(stem + exactTld)) % 5 !== 1
  results.push({
    id: `${stem}${exactTld}`, name: stem + exactTld, tld: exactTld,
    badges: ['exact'], originalPrice: exactCatalog.base, salePrice: exactCatalog.sale, available: exactAvailable,
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
        fontFamily: CLARKSON, fontSize: '12px', px: '10px', py: '6px', minWidth: '120px', maxWidth: '350px', textAlign: 'center',
        borderRadius: 6, whiteSpace: 'normal', opacity: 0,
        pointerEvents: 'none', transition: 'opacity 0.15s', zIndex: 500,
      }}>
        {text}
      </Box>
    </Box>
  )
}

// ── Instagram-style confetti burst ───────────────────────────────────────────

const IG_PARTICLES = [
  { tx:  0,   ty: -32 }, { tx:  16,  ty: -28 }, { tx:  28,  ty: -16 },
  { tx:  32,  ty:   0 }, { tx:  28,  ty:  16 }, { tx:  16,  ty:  28 },
  { tx:  0,   ty:  32 }, { tx: -16,  ty:  28 }, { tx: -28,  ty:  16 },
  { tx: -32,  ty:   0 }, { tx: -28,  ty: -16 }, { tx: -16,  ty: -28 },
]
const IG_SIZES = [5, 4, 6, 4, 5, 3, 5, 4, 6, 3, 5, 4]

function IgBurst({ color = '#0e0e0e' }: { color?: string }) {
  return (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 999, overflow: 'visible' }}>
      {IG_PARTICLES.map(({ tx, ty }, i) => (
        <Box
          key={i}
          className="ig-particle"
          style={{ '--tx': `${tx}px`, '--ty': `${ty}px`, animationDelay: `${i * 0.012}s` } as React.CSSProperties}
          sx={{
            position: 'absolute', top: 0, left: 0,
            width: IG_SIZES[i], height: IG_SIZES[i],
            borderRadius: '50%',
            background: color,
          }}
        />
      ))}
    </Box>
  )
}

// ── Add button (cards) ────────────────────────────────────────────────────────

function AddBtn({ added, onClick }: { added: boolean; onClick: () => void }) {
  const [burst, setBurst] = useState(false)
  const burstKey = useRef(0)
  const [popping, setPopping] = useState(false)

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (!added) {
      burstKey.current += 1
      setBurst(true)
      setPopping(true)
      setTimeout(() => setBurst(false), 650)
      setTimeout(() => setPopping(false), 450)
    }
    onClick()
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', overflow: 'visible' }}>
      {burst && <IgBurst key={burstKey.current} color="#fff" />}
      <Box
        as="button" onClick={handleClick}
        className={popping ? 'btn-pop' : ''}
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
            ? <path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            : <><path d="M7 2V12" stroke="white" strokeWidth="1.6" strokeLinecap="round" /><path d="M2 7H12" stroke="white" strokeWidth="1.6" strokeLinecap="round" /></>
          }
        </svg>
      </Box>
    </Box>
  )
}

// ── Heart button (favorites) ──────────────────────────────────────────────────

function HeartBtn({ favorited, onClick }: { favorited: boolean; onClick: (e: React.MouseEvent) => void }) {
  const [burst, setBurst] = useState(false)
  const [popping, setPopping] = useState(false)
  const burstKey = useRef(0)

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (!favorited) {
      burstKey.current += 1
      setBurst(true)
      setPopping(true)
      setTimeout(() => setBurst(false), 650)
      setTimeout(() => setPopping(false), 450)
    }
    onClick(e)
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', overflow: 'visible' }}>
      {burst && <IgBurst key={burstKey.current} color="#0e0e0e" />}
      <Box
        as="button"
        onClick={handleClick}
        className={popping ? 'btn-pop' : ''}
        sx={{
          background: 'none', border: 'none', cursor: 'pointer', p: '4px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, color: favorited ? '#0e0e0e' : '#aaa', borderRadius: 4,
          transition: 'color 0.15s',
          '&:hover': { color: '#0e0e0e' },
        }}
      >
        {favorited ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 13.5C8 13.5 1.5 9 1.5 5.25C1.5 3.179 3.179 1.5 5.25 1.5C6.412 1.5 7.447 2.068 8 2.96C8.553 2.068 9.588 1.5 10.75 1.5C12.821 1.5 14.5 3.179 14.5 5.25C14.5 9 8 13.5 8 13.5Z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 13.5C8 13.5 1.5 9 1.5 5.25C1.5 3.179 3.179 1.5 5.25 1.5C6.412 1.5 7.447 2.068 8 2.96C8.553 2.068 9.588 1.5 10.75 1.5C12.821 1.5 14.5 3.179 14.5 5.25C14.5 9 8 13.5 8 13.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
        )}
      </Box>
    </Box>
  )
}

// ── Featured card ─────────────────────────────────────────────────────────────

function LoginModal({ onClose }: { onClose: () => void }) {
  return (
    <Box sx={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <Box onClick={(e: React.MouseEvent) => e.stopPropagation()} sx={{
        background: '#fff', borderRadius: 16, p: '40px', width: 400, maxWidth: '92vw',
        boxShadow: '0 24px 60px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', gap: '24px',
      }}>
        {/* Logo */}
        <Flex alignItems="center" gap="8px">
          <LogoSquarespace color="#0e0e0e" />
        </Flex>

        {/* Heading */}
        <Box>
          <Box sx={{ fontFamily: CLARKSON, fontSize: '22px', fontWeight: 300, color: '#0e0e0e', letterSpacing: '-0.5px', mb: '6px' }}>
            Sign in to get notified
          </Box>
          <Box sx={{ fontFamily: CLARKSON, fontSize: '14px', fontWeight: 300, color: '#666', lineHeight: 1.5 }}>
            Sign in or create an account to get an alert when this domain becomes available.
          </Box>
        </Box>

        <Flex flexDirection="column" gap="12px">
          {/* Google */}
          <Box as="button" sx={{
            width: '100%', height: 46, borderRadius: 8, border: '1px solid #ddd',
            background: '#fff', color: '#0e0e0e',
            fontFamily: CLARKSON, fontSize: '14px', fontWeight: 400, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            '&:hover': { background: '#f5f5f5' },
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Box>

          {/* Divider */}
          <Flex alignItems="center" gap="12px">
            <Box sx={{ flex: 1, height: '1px', background: '#e8e8e8' }} />
            <Box sx={{ fontFamily: CLARKSON, fontSize: '12px', color: '#999', fontWeight: 300 }}>or</Box>
            <Box sx={{ flex: 1, height: '1px', background: '#e8e8e8' }} />
          </Flex>

          {/* Email */}
          <Box as="input" type="email" placeholder="Email address" sx={{
            width: '100%', height: 46, borderRadius: 8, border: '1px solid #ddd',
            px: '14px', fontFamily: CLARKSON, fontSize: '14px', fontWeight: 300, color: '#0e0e0e',
            outline: 'none', boxSizing: 'border-box',
            '&:focus': { border: '1px solid #0e0e0e' },
          }} />

          {/* Password */}
          <Box as="input" type="password" placeholder="Password" sx={{
            width: '100%', height: 46, borderRadius: 8, border: '1px solid #ddd',
            px: '14px', fontFamily: CLARKSON, fontSize: '14px', fontWeight: 300, color: '#0e0e0e',
            outline: 'none', boxSizing: 'border-box',
            '&:focus': { border: '1px solid #0e0e0e' },
          }} />

          {/* Sign in CTA */}
          <Box as="button" sx={{
            width: '100%', height: 46, borderRadius: 8, border: 'none',
            background: '#0e0e0e', color: '#fff',
            fontFamily: CLARKSON, fontSize: '14px', fontWeight: 400, cursor: 'pointer',
            '&:hover': { background: '#333' },
          }}>Sign in</Box>
        </Flex>

        {/* Footer */}
        <Flex justifyContent="center" gap="4px">
          <Box sx={{ fontFamily: CLARKSON, fontSize: '13px', fontWeight: 300, color: '#888' }}>Don't have an account?</Box>
          <Box as="button" sx={{
            fontFamily: CLARKSON, fontSize: '13px', fontWeight: 300, color: '#0e0e0e',
            background: 'none', border: 'none', cursor: 'pointer', p: 0, textDecoration: 'underline',
          }}>Sign up</Box>
        </Flex>
      </Box>
    </Box>
  )
}

function FeaturedCard({ domain, isExact, added, onToggle }: {
  domain: DomainResult; isExact: boolean; added: boolean; onToggle: () => void
}) {
  const price = domain.salePrice ?? domain.originalPrice
  const hasDiscount = domain.salePrice !== null && domain.salePrice < domain.originalPrice
  const isTaken = isExact && !domain.available

  const [bellPopping, setBellPopping] = useState(false)
  const [bellBurst, setBellBurst] = useState(false)
  const bellBurstKey = useRef(0)
  const [showLoginModal, setShowLoginModal] = useState(false)

  function handleBell(e: React.MouseEvent) {
    e.stopPropagation()
    bellBurstKey.current += 1
    setBellBurst(true)
    setBellPopping(true)
    setTimeout(() => setBellBurst(false), 650)
    setTimeout(() => setBellPopping(false), 450)
    setTimeout(() => setShowLoginModal(true), 200)
  }

  if (isTaken) {
    return (
      <>
        {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        <Box sx={{
          position: 'relative',
          border: 'none',
          borderRadius: 12, p: '28px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          minHeight: 190,
          background: '#f8f8f8',
          boxShadow: 'none',
        }}>
          <Box>
            <Flex alignItems="center" gap="5px" mb="10px">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#C97B2A" strokeWidth="1.4" />
                <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="#C97B2A" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '14px', fontWeight: 300, color: '#C97B2A' }}>Unavailable</Box>
            </Flex>
            <Box as="p" m={0} sx={{
              fontFamily: CLARKSON, fontSize: '22px', fontWeight: 300,
              letterSpacing: '-0.8px', color: '#0e0e0e', lineHeight: 1.2, wordBreak: 'break-all',
            }}>
              {domain.name}
            </Box>
          </Box>
          <Flex alignItems="flex-end" justifyContent="space-between" mt="14px">
            <Box as="p" m={0} sx={{ fontFamily: CLARKSON, fontSize: '13px', fontWeight: 300, color: '#888', lineHeight: 1.5, maxWidth: '75%' }}>
              Still interested? Get notified when it becomes available.
            </Box>
            <Box sx={{ position: 'relative', display: 'inline-flex', overflow: 'visible' }}>
              {bellBurst && <IgBurst key={bellBurstKey.current} color="#fff" />}
              <Box
                as="button" onClick={handleBell}
                className={bellPopping ? 'btn-pop' : ''}
                sx={{
                  width: 46, height: 46, borderRadius: 8, border: 'none',
                  background: '#0e0e0e',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', flexShrink: 0,
                  '&:hover': { background: '#333' },
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2C9 2 5 4 5 9V13H13V9C13 4 9 2 9 2Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M7 13C7 14.1 7.9 15 9 15C10.1 15 11 14.1 11 13" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx="9" cy="2.5" r="0.8" fill="white" />
                </svg>
              </Box>
            </Box>
          </Flex>
        </Box>
      </>
    )
  }

  return (
    <Box onClick={onToggle} sx={{
      position: 'relative', overflow: 'hidden',
      border: isExact ? '1px solid' : 'none', borderColor: '#a8cff8',
      borderRadius: 12, p: '28px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      minHeight: 190,
      background: isExact ? '#F4F5FD' : '#f8f8f8',
      boxShadow: isExact ? '0px 4px 20px 0px rgba(0,0,0,0.10)' : 'none',
      cursor: 'pointer',
    }}>
      {isExact && (
        <svg key="sweep" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }} preserveAspectRatio="none" viewBox="0 0 320 190">
          <rect x="2" y="2" width="316" height="186" rx="11" ry="11"
            fill="none" stroke="#5aabf0" strokeWidth="3"
            className="exact-dash-line"
            style={{ strokeDasharray: 1400 }}
          />
        </svg>
      )}
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
            <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '14px', fontWeight: 300, color: BLUE }}>Close match</Box>
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
        <AddBtn added={added} onClick={onToggle} />
      </Flex>
    </Box>
  )
}

// ── Result row ────────────────────────────────────────────────────────────────

function ResultRow({ domain, added, onToggle, showLimitedTimeColumn, showRtb, favorited, onFavorite, allResults, cart, onAdd }: {
  domain: DomainResult; added: boolean; onToggle: () => void; showLimitedTimeColumn: boolean; showRtb?: boolean; favorited?: boolean; onFavorite?: (e: React.MouseEvent) => void; allResults?: DomainResult[]; cart?: Set<string>; onAdd?: (d: DomainResult) => void
}) {
  const price = domain.salePrice ?? domain.originalPrice
  const hasDiscount = domain.salePrice !== null && domain.salePrice < domain.originalPrice
  const isPromoted = domain.badges.includes('promoted')
  const [popping, setPopping] = useState(false)
  const [burst, setBurst] = useState(false)
  const burstKey = useRef(0)
  const [hovered, setHovered] = useState(false)

  function handleToggle() {
    if (!added) {
      burstKey.current += 1
      setPopping(true)
      setBurst(true)
      setTimeout(() => setPopping(false), 450)
      setTimeout(() => setBurst(false), 650)
    }
    onToggle()
  }

  return (
    <Box sx={{ borderRadius: 8, position: 'relative' }}>
    <Flex
      alignItems="center"
      gap="12px"
      onClick={handleToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        height: 62, px: '16px', cursor: 'pointer',
        borderRadius: showRtb ? '8px 8px 0 0' : 8,
        background: hovered ? '#f5f5f5' : 'transparent',
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

      {/* Heart — visible on row hover or when favorited */}
      {onFavorite && (
        <Box sx={{ opacity: (hovered || favorited) ? 1 : 0, transition: 'opacity 0.12s', flexShrink: 0 }}>
          <HeartBtn favorited={!!favorited} onClick={onFavorite} />
        </Box>
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

      {/* + / ✓ with pop + burst */}
      <Box sx={{ position: 'relative', display: 'inline-flex', overflow: 'visible' }}>
        {burst && <IgBurst key={burstKey.current} />}
        <Box
          as="span"
          onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleToggle() }}
          className={popping ? 'btn-pop' : ''}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 24, height: 24, cursor: 'pointer' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            {added
              ? <path d="M3 8.5L6.5 12L13 4" stroke="#0e0e0e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              : <><path d="M8 3V13" stroke="#0e0e0e" strokeWidth="1.5" strokeLinecap="round" /><path d="M3 8H13" stroke="#0e0e0e" strokeWidth="1.5" strokeLinecap="round" /></>
            }
          </svg>
        </Box>
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
    {/* TLD upsell row — shown when domain is in cart */}
    {(() => {
      if (!onAdd || !added) return null
      const sld = getSld(domain.name)
      const cartSet = cart ?? new Set<string>()
      const tlds = pickTldsForDomain(sld, new Set([...cartSet].map((id) => {
        const r = allResults?.find((x) => x.id === id)
        return r ? r.name : id
      })))
      if (tlds.length === 0) return null
      const bundleTotal = tlds.reduce((s, t) => s + t.price, 0)
      const bundleDiscounted = Math.round(bundleTotal * 0.85)
      return (
        <Box sx={{
          display: 'grid',
          gridTemplateRows: added ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <Box sx={{ minHeight: 0, overflow: 'hidden' }}>
            <Box sx={{ px: '16px', pb: '12px', pt: '2px' }}>
              <Box sx={{ fontFamily: CLARKSON, fontSize: '12px', color: '#4f4f4f', mb: '10px' }}>
                Add matching domains to secure your brand
              </Box>
              <Flex gap="8px" sx={{ flexWrap: 'nowrap', overflowX: 'auto', pb: '2px' }}>
                {tlds.map((t) => {
                  const tldId = `${sld}${t.ext}`
                  const inCart = cartSet.has(tldId)
                  const domainObj = allResults?.find((r) => r.name === tldId) ?? {
                    id: tldId, name: tldId, tld: t.ext, badges: [] as DomainBadge[],
                    originalPrice: t.price, salePrice: null, available: true,
                  }
                  return (
                    <Box
                      key={t.ext}
                      onClick={(e: React.MouseEvent) => { e.stopPropagation(); if (!inCart) onAdd(domainObj) }}
                      sx={{
                        background: inCart ? '#e0e0e0' : '#f2f2f2', borderRadius: '24px',
                        px: '12px', py: '8px', display: 'flex', alignItems: 'center', gap: '6px',
                        flexShrink: 0, cursor: inCart ? 'default' : 'pointer',
                        transition: 'background 0.12s',
                        '&:hover': { background: inCart ? '#e0e0e0' : '#eaeaea' },
                      }}
                    >
                      <Box sx={{ fontFamily: CLARKSON, fontSize: '14px', fontWeight: 500, color: '#0e0e0e', letterSpacing: '-0.015px', whiteSpace: 'nowrap' }}>
                        {t.ext}
                      </Box>
                      <Flex alignItems="center" gap="3px">
                        <Box sx={{ fontFamily: CLARKSON, fontSize: '14px', color: '#0e0e0e', letterSpacing: '-0.015px', whiteSpace: 'nowrap' }}>
                          ${t.price}
                        </Box>
                        {!inCart && (
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M5.5 1v9M1 5.5h9" stroke="#0e0e0e" strokeWidth="1.4" strokeLinecap="round"/>
                          </svg>
                        )}
                      </Flex>
                    </Box>
                  )
                })}
                <Box sx={{ width: '1px', background: '#ddd', flexShrink: 0, alignSelf: 'stretch', my: '4px', mx: '8px' }} />
                <Box
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    tlds.forEach((t) => {
                      const tid = `${sld}${t.ext}`
                      if (!cartSet.has(tid)) {
                        const domainObj = allResults?.find((r) => r.name === tid) ?? {
                          id: tid, name: tid, tld: t.ext, badges: [] as DomainBadge[],
                          originalPrice: t.price, salePrice: Math.round(t.price * 0.85), available: true,
                        }
                        onAdd({ ...domainObj, salePrice: Math.round(t.price * 0.85) })
                      }
                    })
                  }}
                  sx={{
                    background: '#f2f2f2', borderRadius: '24px', px: '12px', py: '8px',
                    display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0,
                    cursor: 'pointer', transition: 'background 0.12s',
                    '&:hover': { background: '#eaeaea' },
                  }}
                >
                  <Box sx={{ fontFamily: CLARKSON, fontSize: '14px', fontWeight: 500, color: '#0e0e0e', letterSpacing: '-0.015px', whiteSpace: 'nowrap' }}>
                    Bundle & save
                  </Box>
                  <Flex alignItems="center" gap="4px">
                    <Box sx={{ fontFamily: CLARKSON, fontSize: '14px', color: '#888', textDecoration: 'line-through', letterSpacing: '-0.015px', whiteSpace: 'nowrap' }}>
                      ${bundleTotal}
                    </Box>
                    <Box sx={{ fontFamily: CLARKSON, fontSize: '14px', color: '#0e0e0e', letterSpacing: '-0.015px', whiteSpace: 'nowrap' }}>
                      ${bundleDiscounted}
                    </Box>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M5.5 1v9M1 5.5h9" stroke="#0e0e0e" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      )
    })()}
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

function ResultsSection({ label, domains, cart, onToggle, showSeeWhy, favorites, onFavorite, allResults, onAdd }: {
  label: string; domains: DomainResult[]; cart: Set<string>; onToggle: (id: string) => void; showSeeWhy?: boolean; favorites?: Map<string, DomainResult>; onFavorite?: (d: DomainResult, e: React.MouseEvent) => void; allResults?: DomainResult[]; onAdd?: (d: DomainResult) => void
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
          <ResultRow
            key={d.id} domain={d} added={cart.has(d.id)} onToggle={() => onToggle(d.id)}
            showLimitedTimeColumn={hasAnyLimitedTime} showRtb={expanded}
            favorited={favorites?.has(d.id)}
            onFavorite={onFavorite ? (e) => onFavorite(d, e) : undefined}
            allResults={allResults} cart={cart} onAdd={onAdd}
          />
        ))}
      </Box>
    </Box>
  )
}

// ── Favorites matching accordion ─────────────────────────────────────────────

function FavMatchingAccordion({ domain, allResults, cart, setCart }: {
  domain: DomainResult; allResults: DomainResult[]; cart: Set<string>; setCart: React.Dispatch<React.SetStateAction<Set<string>>>
}) {
  const [open, setOpen] = useState(false)
  const sld = getSld(domain.name)
  const matching = allResults.filter((r) => getSld(r.name) === sld && r.available && !cart.has(r.id) && r.id !== domain.id).slice(0, 3)

  return (
    <Box sx={{ background: '#f5f5f5', borderRadius: open ? '6px 6px 0 0' : 6 }}>
      <Flex
        as="button"
        alignItems="center"
        onClick={() => setOpen((v) => !v)}
        sx={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          px: '14px', py: '10px', borderRadius: open ? '6px 6px 0 0' : 6,
          textAlign: 'left',
        }}
      >
        <Text.Caption m={0} sx={{ fontSize: '13px', color: '#555', flex: 1, lineHeight: 1 }}>
          Add matching domains to secure your brand
        </Text.Caption>
        {open
          ? <ChevronSmallUp sx={{ width: 14, height: 14, color: '#888', flexShrink: 0 }} />
          : <ChevronSmallDown sx={{ width: 14, height: 14, color: '#888', flexShrink: 0 }} />
        }
      </Flex>
      <Box sx={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s cubic-bezier(0.4,0,0.2,1)' }}>
        <Box sx={{ minHeight: 0, overflow: 'hidden' }}>
          <Box sx={{ background: '#f5f5f5', borderRadius: '0 0 6px 6px', px: '14px', pb: '10px' }}>
            {matching.length === 0 ? (
              <Box sx={{ fontFamily: CLARKSON, fontSize: '13px', color: '#aaa', py: '6px' }}>No matching domains available</Box>
            ) : matching.map((m) => {
              const ext = m.name.slice(getSld(m.name).length)
              const price = m.salePrice ?? m.originalPrice
              return (
                <Flex key={m.id} alignItems="center" gap={2} sx={{ py: '5px', cursor: 'pointer', '&:hover': { opacity: 0.7 }, transition: 'opacity 0.1s' }}
                  onClick={() => setCart((prev) => new Set([...prev, m.id]))}
                >
                  <Box sx={{ flex: 1, minWidth: 0, fontFamily: CLARKSON, fontSize: '13px', color: '#0e0e0e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Box as="span" sx={{ color: '#888' }}>{sld}</Box>{ext}
                  </Box>
                  <Box sx={{ fontFamily: CLARKSON, fontSize: '13px', color: '#555', flexShrink: 0 }}>${price}/yr</Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#0e0e0e', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M2 7H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </Box>
                </Flex>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

// ── Mini cart ────────────────────────────────────────────────────────────────


function getSld(name: string): string {
  const dot = name.lastIndexOf('.')
  return dot > 0 ? name.slice(0, dot) : name
}

function MiniCart({ cartItems, onRemove }: {
  cartItems: DomainResult[]
  onRemove: (id: string) => void
}) {
  const navigate = useNavigate()
  const prevItemIdsRef = useRef<Set<string>>(new Set())
  const [removingCartIds, setRemovingCartIds] = useState<Set<string>>(new Set())
  const [newCartIds, setNewCartIds] = useState<Set<string>>(new Set())
  const prevCartIdsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const currentIds = new Set(cartItems.map((i) => i.id))
    const added = cartItems.filter((i) => !prevCartIdsRef.current.has(i.id)).map((i) => i.id)
    if (added.length > 0) {
      setNewCartIds((prev) => new Set([...prev, ...added]))
      setTimeout(() => setNewCartIds((prev) => { const s = new Set(prev); added.forEach((id) => s.delete(id)); return s }), 350)
    }
    prevCartIdsRef.current = currentIds
  }, [cartItems])

  function handleRemoveCart(id: string) {
    if (removingCartIds.has(id)) return
    setRemovingCartIds((prev) => new Set([...prev, id]))
    setTimeout(() => {
      onRemove(id)
      setRemovingCartIds((prev) => { const s = new Set(prev); s.delete(id); return s })
    }, 300)
  }

  const visible = cartItems.length > 0
  const subtotal = cartItems.reduce((sum, r) => sum + (r.salePrice ?? r.originalPrice), 0)


  useEffect(() => {
    prevItemIdsRef.current = new Set(cartItems.map((i) => i.id))
  }, [cartItems])

  const sldOrder: string[] = []
  const groups: Record<string, DomainResult[]> = {}
  for (const item of cartItems) {
    const sld = getSld(item.name)
    if (!groups[sld]) { groups[sld] = []; sldOrder.push(sld) }
    groups[sld].push(item)
  }

  return (
    <Box sx={{
      width: visible ? 420 : 0,
      flexShrink: 0,
      overflow: 'visible',
      transition: 'width 0.32s cubic-bezier(0.4,0,0.2,1)',
      position: 'relative',
    }}>
      <Box sx={{ width: 380, overflow: 'visible' }}>
        <Box sx={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 218px 61px 0 transparent, 0 139px 56px 0 rgba(0,0,0,0.01), 0 78px 47px 0 rgba(0,0,0,0.05), 0 -1px 35px 0 rgba(0,0,0,0.09), 0 4px 19px 0 rgba(0,0,0,0.1)',
          height: 'calc(100vh - 160px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}>
          <Box px={6} pt={6} pb={4}>
            <Box sx={{ fontFamily: CLARKSON, fontSize: '18px', fontWeight: 500, color: '#0e0e0e', letterSpacing: '-0.3px' }}>
              Cart ({cartItems.length})
            </Box>
          </Box>

          <Box sx={{ flex: '1 1 0', overflowY: 'auto', px: 6, pb: 4 }}>
            {sldOrder.map((sld) => {
              const groupItems = groups[sld]
              return (
                <Box
                  key={sld}
                >
                  {groupItems.map((item) => {
                    const price = item.salePrice ?? item.originalPrice
                    const isRemoving = removingCartIds.has(item.id)
                    const isNew = newCartIds.has(item.id)
                    return (
                      <Box
                        key={item.id}
                        className={isNew ? 'cart-item-in' : ''}
                        sx={{
                          maxHeight: isRemoving ? 0 : '64px',
                          opacity: isRemoving ? 0 : 1,
                          overflow: 'hidden',
                          transition: isRemoving ? 'max-height 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease' : 'none',
                        }}
                      >
                        <Flex alignItems="center" gap={3} sx={{ minHeight: 40, mb: 1 }}>
                          <Text.Body
                            m={0}
                            sx={{ flex: '1 1 0', minWidth: 0, fontSize: '15px', fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#0e0e0e' }}
                          >
                            {item.name}
                          </Text.Body>
                          <Text.Body m={0} sx={{ fontSize: '14px', flexShrink: 0, color: '#555' }}>
                            ${price}/yr
                          </Text.Body>
                          <Box
                            as="button"
                            onClick={() => handleRemoveCart(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                            sx={{
                              background: 'none', border: 'none', cursor: 'pointer', p: '4px',
                              display: 'flex', alignItems: 'center', flexShrink: 0, color: '#aaa',
                              borderRadius: 4, transition: 'color 0.12s', '&:hover': { color: '#555' },
                            }}
                          >
                            <Trash sx={{ width: 14, height: 14 }} />
                          </Box>
                        </Flex>
                      </Box>
                    )
                  })}

                </Box>
              )
            })}
          </Box>

          <Box sx={{ borderTop: '1px solid #e8e8e8', flexShrink: 0, px: 5, pt: 4, pb: 5 }}>
            <Flex alignItems="center" justifyContent="space-between" mb={4}>
              <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontSize: '14px', color: '#555' }}>
                First-year total
              </Text.Body>
              <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontSize: '15px', fontWeight: 500, color: '#0e0e0e' }}>
                ${subtotal}
              </Text.Body>
            </Flex>
            <Box
              as="button"
              onClick={() => navigate('/cart', { state: { items: cartItems } })}
              sx={{
                width: '100%', background: '#0e0e0e', color: '#fff',
                border: 'none', borderRadius: 6, height: 52, cursor: 'pointer',
                fontFamily: CLARKSON, fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em',
                textTransform: 'uppercase', transition: 'opacity 0.15s ease',
                '&:hover': { opacity: 0.82 },
              }}
            >
              Checkout
            </Box>
          </Box>
        </Box>
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
  const [favorites, setFavorites] = useState<Map<string, DomainResult>>(new Map())
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [navHeartPop, setNavHeartPop] = useState(false)
  const [navHeartDrop, setNavHeartDrop] = useState(false)
  const navHeartDropKey = useRef(0)
  const favoritesRef = useRef<HTMLDivElement>(null)
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [searchFocused, setSearchFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [tldFilters, setTldFilters] = useState<Set<string>>(new Set())
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

  const [visibleMoreCount, setVisibleMoreCount] = useState(8)
  const tldDropdownRef = useRef<HTMLDivElement>(null)
  const sortDropdownRef = useRef<HTMLDivElement>(null)
  const suggestionsBlurTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Sync input when URL query changes
  useEffect(() => {
    setSearchQuery(rawQuery)
    setVisibleMoreCount(8)
  }, [rawQuery])

  // Infinite scroll sentinel
  useEffect(() => {
    if (loadingStage < 2 || !sentinelRef.current) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setVisibleMoreCount((n) => n + 8)
    }, { threshold: 0.1 })
    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [loadingStage])

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
      if (favoritesOpen && favoritesRef.current && !favoritesRef.current.contains(e.target as Node)) {
        setFavoritesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [tldDropdownOpen, sortDropdownOpen, favoritesOpen])

  function toggleFavorite(domain: DomainResult, e: React.MouseEvent) {
    e.stopPropagation()
    const isAdding = !favorites.has(domain.id)
    setFavorites((prev) => {
      const next = new Map(prev)
      if (next.has(domain.id)) { next.delete(domain.id) } else { next.set(domain.id, domain) }
      return next
    })
    if (isAdding) {
      navHeartDropKey.current += 1
      setNavHeartDrop(true)
      setTimeout(() => setNavHeartDrop(false), 600)
      setTimeout(() => {
        setNavHeartPop(true)
        setTimeout(() => setNavHeartPop(false), 450)
      }, 420)
    }
  }

  function toggleVibe(v: string) {
    setSelectedVibes((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])
  }

  function toggleTldFilter(tld: string) {
    setTldFilters((prev) => {
      const next = new Set(prev)
      if (next.has(tld)) { next.delete(tld) } else { next.add(tld) }
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
    if (tldFilters.size > 0 && !tldFilters.has(d.tld)) return false
    if (activeFilters.has(FILTERS[0]) && !d.badges.includes('promoted')) return false
    if (activeFilters.has('Short') && d.name.replace(/\.[^.]+$/, '').length > 8) return false
    if (activeFilters.has('Bundle deals') && d.salePrice === null) return false
    return true
  })

  function spreadSpecial(arr: DomainResult[]): DomainResult[] {
    if (sortBy === 'price') return arr
    const special = arr.filter(d => d.badges.includes('promoted') || d.limitedTime)
    const regular = arr.filter(d => !d.badges.includes('promoted') && !d.limitedTime)
    const out: DomainResult[] = []
    let si = 0, ri = 0
    while (ri < regular.length || si < special.length) {
      const chunk = regular.slice(ri, ri + 3)
      out.push(...chunk)
      ri += chunk.length
      if (si < special.length) out.push(special[si++])
    }
    return out
  }

  const sortedAvailable = sortBy === 'price'
    ? [...filteredAvailable].sort((a, b) => (a.salePrice ?? a.originalPrice) - (b.salePrice ?? b.originalPrice))
    : spreadSpecial(filteredAvailable)
  const recommended = sortedAvailable.slice(0, 3)
  const more = sortedAvailable.slice(3)

  const [cartDomains, setCartDomains] = useState<Map<string, DomainResult>>(new Map())

  function toggleCart(id: string) {
    const domain = results.find(r => r.id === id)
    setCart((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id); setCartDomains(m => { const n = new Map(m); n.delete(id); return n }) }
      else {
        next.add(id)
        if (domain) setCartDomains(m => new Map(m).set(id, domain))
      }
      return next
    })
  }

  function addToCartDirect(domain: DomainResult) {
    setCart(prev => new Set(prev).add(domain.id))
    setCartDomains(m => new Map(m).set(domain.id, domain))
  }

  function removeFromCart(id: string) {
    setCart(prev => { const n = new Set(prev); n.delete(id); return n })
    setCartDomains(m => { const n = new Map(m); n.delete(id); return n })
  }

  const cartItems = [...cartDomains.values()]

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
        @keyframes btn-pop {
          0%   { transform: scale(1); }
          25%  { transform: scale(1.45); }
          55%  { transform: scale(0.88); }
          75%  { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .btn-pop { animation: btn-pop 0.42s cubic-bezier(0.36,0.07,0.19,0.97) forwards; }
        @keyframes ig-particle {
          0%   { transform: translate(0,0) scale(1); opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0.2); opacity: 0; }
        }
        .ig-particle { animation: ig-particle 0.58s ease-out forwards; }
        @keyframes nav-heart-pop {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.22); }
          65%  { transform: scale(0.94); }
          100% { transform: scale(1); }
        }
        .nav-heart-pop { animation: nav-heart-pop 0.35s cubic-bezier(0.36,0.07,0.19,0.97) forwards; }
        @keyframes badge-pop {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .badge-pop { animation: badge-pop 0.3s cubic-bezier(0.36,0.07,0.19,0.97) forwards; }
        @keyframes drop-into-heart {
          0%   { transform: translateY(-18px) scale(1); opacity: 0; }
          15%  { opacity: 1; }
          70%  { transform: translateY(0px) scale(0.7); opacity: 0.9; }
          100% { transform: translateY(4px) scale(0.3); opacity: 0; }
        }
        .drop-into-heart { animation: drop-into-heart 0.48s cubic-bezier(0.4,0,0.6,1) forwards; }
        @keyframes cart-item-in {
          0%   { max-height: 0; opacity: 0; }
          100% { max-height: 64px; opacity: 1; }
        }
        .cart-item-in { animation: cart-item-in 0.28s cubic-bezier(0.4,0,0.2,1) forwards; }
        @keyframes fav-popover-in {
          0%   { opacity: 0; transform: translateY(-6px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fav-popover-in { animation: fav-popover-in 0.18s cubic-bezier(0.4,0,0.2,1) forwards; }
        @keyframes exact-dash {
          0%   { stroke-dashoffset: 1400; opacity: 1; }
          75%  { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .exact-dash-line { animation: exact-dash 1.4s cubic-bezier(0.4,0,0.2,1) 0s 1 forwards; }
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
            {/* Favorites heart icon */}
            <Box ref={favoritesRef} sx={{ position: 'relative' }}>
              <Box
                as="button"
                onClick={() => setFavoritesOpen((v) => !v)}
                className={navHeartPop ? 'nav-heart-pop' : ''}
                sx={{
                  position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 36, height: 36, borderRadius: 8, color: '#0e0e0e',
                  '&:hover': { opacity: 0.7 }, overflow: 'visible',
                }}
              >
                {navHeartDrop && (
                  <Box
                    key={navHeartDropKey.current}
                    className="drop-into-heart"
                    sx={{ position: 'absolute', top: '-4px', left: '50%', marginLeft: '-5px', width: 10, height: 10, borderRadius: '50%', background: '#0e0e0e', pointerEvents: 'none', zIndex: 10 }}
                  />
                )}
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M8 13.5C8 13.5 1.5 9 1.5 5.25C1.5 3.179 3.179 1.5 5.25 1.5C6.412 1.5 7.447 2.068 8 2.96C8.553 2.068 9.588 1.5 10.75 1.5C12.821 1.5 14.5 3.179 14.5 5.25C14.5 9 8 13.5 8 13.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
                {favorites.size > 0 && (
                  <Box
                    className="badge-pop"
                    key={favorites.size}
                    sx={{
                      position: 'absolute', top: '-5px', right: '-5px',
                      background: '#0e0e0e', color: '#fff', borderRadius: '50%',
                      width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: CLARKSON, fontSize: '10px', fontWeight: 600, lineHeight: 1,
                    }}
                  >
                    {favorites.size}
                  </Box>
                )}
              </Box>

              {/* Favorites popover */}
              {favoritesOpen && (
                <Box
                  className="fav-popover-in"
                  sx={{
                    position: 'absolute', top: 'calc(100% + 12px)', right: 0, zIndex: 200,
                    width: 380, background: '#fff', borderRadius: 12,
                    boxShadow: '0 218px 61px 0 transparent, 0 139px 56px 0 rgba(0,0,0,0.01), 0 78px 47px 0 rgba(0,0,0,0.05), 0 -1px 35px 0 rgba(0,0,0,0.09), 0 4px 19px 0 rgba(0,0,0,0.1)',
                  }}
                >
                  <Box sx={{ px: '20px', pt: '20px', pb: '16px' }}>
                    <Box sx={{ fontFamily: CLARKSON, fontSize: '18px', fontWeight: 500, color: '#0e0e0e', letterSpacing: '-0.3px' }}>
                      Favorites ({favorites.size})
                    </Box>
                  </Box>
                  {favorites.size === 0 ? (
                    <Box sx={{ px: '20px', pb: '20px', fontFamily: CLARKSON, fontSize: '14px', color: '#aaa' }}>
                      No saved domains yet
                    </Box>
                  ) : (
                    <Box sx={{ maxHeight: 400, overflowY: 'auto', px: '20px', pb: '16px' }}>
                      {Array.from(favorites.values()).map((d) => {
                        const price = d.salePrice ?? d.originalPrice
                        const inCart = cart.has(d.id)
                        return (
                          <Box key={d.id} sx={{ mb: '12px' }}>
                            <Flex alignItems="center" gap="10px" sx={{ mb: '8px' }}>
                              <Box sx={{ flex: 1, minWidth: 0, fontFamily: CLARKSON, fontSize: '15px', fontWeight: 500, color: '#0e0e0e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {d.name}
                              </Box>
                              <Box sx={{ fontFamily: CLARKSON, fontSize: '14px', color: '#888', flexShrink: 0 }}>
                                ${price}/yr
                              </Box>
                              <Box
                                as="button"
                                onClick={() => { if (!inCart) setCart((prev) => new Set([...prev, d.id])) }}
                                sx={{
                                  background: 'none', border: 'none', cursor: inCart ? 'default' : 'pointer',
                                  p: '2px', display: 'flex', alignItems: 'center', flexShrink: 0,
                                  color: inCart ? '#bbb' : '#0e0e0e',
                                  transition: 'opacity 0.12s', '&:hover': { opacity: inCart ? 1 : 0.6 },
                                }}
                              >
                                {inCart ? (
                                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                ) : (
                                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                                    <path d="M7 2V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                    <path d="M2 7H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                  </svg>
                                )}
                              </Box>
                            </Flex>
                            {/* Matching accordion */}
                            <FavMatchingAccordion domain={d} allResults={results} cart={cart} setCart={setCart} />
                          </Box>
                        )
                      })}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* ── Content + Cart ── */}
      <Flex sx={{ justifyContent: 'center', alignItems: 'flex-start', gap: '56px', px: '40px', pr: '60px', '@media (max-width: 600px)': { px: '16px', pr: '16px' } }}>
      <Box sx={{ flex: '0 1 810px', minWidth: 0, pb: '120px' }}>

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
              overflow: 'hidden', py: '8px',
            }}>
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
                  <Box sx={{ height: '1px', background: '#f0f0f0', mx: '22px', my: '8px' }} />
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
                      {/* History icon */}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M2.5 8A5.5 5.5 0 1 0 8 2.5" stroke="#aaa" strokeWidth="1.3" strokeLinecap="round"/>
                        <path d="M2.5 4.5V8H6" stroke="#aaa" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 5.5V8.5l2 1.2" stroke="#aaa" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
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
              {closeMatch && !exact.available ? (
                <>
                  <FeaturedCard domain={closeMatch} isExact={false} added={cart.has(closeMatch.id)} onToggle={() => toggleCart(closeMatch.id)} />
                  <FeaturedCard domain={exact} isExact added={cart.has(exact.id)} onToggle={() => toggleCart(exact.id)} />
                </>
              ) : (
                <>
                  <FeaturedCard domain={exact} isExact added={cart.has(exact.id)} onToggle={() => toggleCart(exact.id)} />
                  {closeMatch && (
                    <FeaturedCard domain={closeMatch} isExact={false} added={cart.has(closeMatch.id)} onToggle={() => toggleCart(closeMatch.id)} />
                  )}
                </>
              )}
            </>
          )}
        </Box>

        {/* Filter pills */}
        <Flex alignItems="center" justifyContent="space-between" mb="32px" sx={{ flexWrap: 'wrap', gap: '8px' }}>
          <Flex alignItems="center" gap="8px" sx={{ flexWrap: 'wrap' }}>
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
                  minWidth: 160, overflow: 'hidden', py: '6px',
                }}>
                  {['.com', '.net', '.org', '.co', '.io', '.me', '.studio', '.art', '.design', '.shop', '.online', '.agency'].map((tld) => (
                    <Flex
                      key={tld} as="button" alignItems="center" gap="12px"
                      onClick={() => toggleTldFilter(tld)}
                      sx={{
                        width: '100%', px: '14px', py: '9px', border: 'none', textAlign: 'left',
                        cursor: 'pointer', background: 'transparent',
                        '&:hover': { background: '#f5f5f5' },
                      }}
                    >
                      <Box sx={{
                        width: 16, height: 16, borderRadius: '3px', flexShrink: 0,
                        border: tldFilters.has(tld) ? 'none' : '1.5px solid #ccc',
                        background: tldFilters.has(tld) ? BLUE : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {tldFilters.has(tld) && (
                          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </Box>
                      <Box as="span" sx={{ fontFamily: CLARKSON, fontSize: '14px', color: '#0e0e0e' }}>{tld}</Box>
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
                favorites={favorites}
                onFavorite={toggleFavorite}
                allResults={results}
                onAdd={addToCartDirect}
              />
            </Box>

            {/* More results with infinite scroll */}
            {more.length > 0 && (
              <>
                <ResultsSection label="More results" domains={more.slice(0, visibleMoreCount)} cart={cart} onToggle={toggleCart} favorites={favorites} onFavorite={toggleFavorite} allResults={results} onAdd={addToCartDirect} />
                {visibleMoreCount < more.length && (
                  <Box>
                    <div ref={sentinelRef} style={{ height: 1 }} />
                    <Flex justifyContent="center" sx={{ py: '32px' }}>
                      <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        {[0,1,2].map(i => (
                          <Box key={i} className="skeleton" sx={{ width: 6, height: 6, borderRadius: '50%', animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </Box>
                    </Flex>
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </Box>{/* end main content */}
      {/* Cart column */}
      <Box sx={{ pt: '24px', flexShrink: 0, pr: '20px', position: 'sticky', top: '88px', alignSelf: 'flex-start' }}>
        <MiniCart cartItems={cartItems} onRemove={removeFromCart} />
      </Box>
      </Flex>{/* end content+cart row */}
    </Box>
  )
}

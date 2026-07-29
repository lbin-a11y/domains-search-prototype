import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Flex, Text } from '@sqs/rosetta-primitives'
import { LogoSquarespace, Search, ArrowRight } from '@sqs/rosetta-icons'
import { Accordion } from '@sqs/rosetta-compositions'

const SEARCH_HINTS = [
  'Hypha Florals',
  'lioagency.com',
  'Unique domains for a wellness center in Austin',
  'Brooklyn Coffee Co.',
  'modernarchstudio.design',
  'A photography portfolio for a travel photographer',
]

// Figma asset URLs — valid for ~7 days from 2026-07-24
const IMG_BLOBS = 'https://www.figma.com/api/mcp/asset/14128ebd-bda4-4e1a-a56d-64cd92954e36'
const IMG_SS_LEFT = 'https://www.figma.com/api/mcp/asset/881c869e-d268-41c5-a9ba-1f2902cf13e2'
const IMG_SS_CENTER = 'https://www.figma.com/api/mcp/asset/33b48426-03ea-4fc2-b184-9b114bdf7050'
const IMG_SS_RIGHT = 'https://www.figma.com/api/mcp/asset/69ee33f3-aea1-4085-ba03-9911825c4c8a'

const CLARKSON = '"Clarkson", Helvetica, sans-serif'
const CLARKSON_SERIF = '"Clarkson Serif TT", "Clarkson Serif", Georgia, serif'

const TLD_PILLS = ['.com', '.net', '.org', '.io', '.co', '.xyz', '.me', '.music', '.tech', '.site', '.shop', '.store']

const PRICING_FEATURES = [
  { name: 'WHOIS privacy', sqs: true, others: false },
  { name: 'SSL certificate', sqs: true, others: false },
  { name: 'Premium DNS', sqs: true, others: false },
  { name: 'Email forwarding', sqs: true, others: false },
  { name: 'Spam-free parking pages', sqs: true, others: false },
  { name: 'Two-factor authentication', sqs: true, others: true },
  { name: 'Domain / URL forwarding', sqs: true, others: true },
  { name: '24/7 customer support', sqs: true, others: true },
]

const FAQ_ITEMS = [
  { label: 'What is a domain name?', body: 'A domain name is the address of your website that people type in the browser URL bar to visit your website. In other words, if your website were a house, then your domain name is its address.' },
  { label: 'What is a domain name registration?', body: 'Domain name registration is the process of reserving a name on the internet for a certain period, usually one year. Registering a domain prevents others from using it while you own it.' },
  { label: 'How do I choose a domain name?', body: 'Choose a domain name that reflects your brand or business, is easy to spell and remember, and uses a popular extension like .com when possible. Avoid hyphens and numbers.' },
  { label: 'How do I set my email for my domain?', body: 'Once you register a domain with Squarespace, you can add Google Workspace email directly from your domain settings panel to get professional email addresses at your domain.' },
  { label: 'How many email addresses can I have?', body: 'The number of email addresses depends on your Google Workspace plan. Each plan supports a different number of users, starting with a single user on the Basic plan.' },
  { label: 'Can Squarespace host my domain?', body: 'Yes. Squarespace can host your domain and your website. Domains registered with Squarespace automatically connect to Squarespace websites, simplifying your setup.' },
  { label: 'Do Squarespace domains offer DNS?', body: 'Yes. Every Squarespace domain includes full DNS management. You can add A records, CNAMEs, MX records, and more from your domain settings.' },
  { label: 'How do I choose a domain registrar?', body: 'Look for a registrar that offers transparent renewal pricing, privacy protection, SSL certificates, and easy DNS management. Squarespace bundles all of these with every domain.' },
  { label: "What happens if I don't renew?", body: "If you don't renew your domain before it expires, it will enter a grace period, then become available for anyone to register. You'll lose access to your website and email at that address." },
  { label: 'Can I buy a domain without a website?', body: "Absolutely. You can register a domain with Squarespace and leave it parked until you're ready to build. Your domain is yours for as long as you renew it." },
  { label: 'Does Squarespace offer free domains?', body: 'Squarespace includes a free custom domain for the first year with any annual website plan. After that, the domain renews at the standard rate.' },
]

function CheckIcon({ muted = false }: { muted?: boolean }) {
  return (
    <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M1 6.5L5.8 11.5L15 1" stroke={muted ? '#878787' : '#0e0e0e'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M1 1L11 11M11 1L1 11" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Domains() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<'buy' | 'transfer'>('buy')
  const [searchFocused, setSearchFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [guideMe, setGuideMe] = useState(false)
  const [selectedVibes, setSelectedVibes] = useState<string[]>([])
  const [industry, setIndustry] = useState('')
  const [businessName, setBusinessName] = useState('')

  const guideMeSummary = [businessName, industry, selectedVibes.join(', ')].filter(Boolean).join(' · ')

  useEffect(() => {
    if (query || tab === 'transfer') return
    const timer = setInterval(() => {
      setHintIndex(i => (i + 1) % SEARCH_HINTS.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [query, tab])

  function toggleVibe(v: string) {
    setSelectedVibes(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])
  }

  const suggestionsBlurTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleSearch() {
    const trimmed = query.trim()
    if (!trimmed) return
    setShowSuggestions(false)
    const stored = (() => { try { return JSON.parse(localStorage.getItem('domainRecentSearches') || '[]') } catch { return [] } })()
    const updated = [trimmed, ...stored.filter((s: string) => s !== trimmed)].slice(0, 5)
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

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <Box sx={{ background: '#fff', overflowX: 'hidden', minHeight: '100vh' }}>

      {/* ── Nav ─────────────────────────────────────────────────────────────── */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 100, background: '#fff', height: 80 }}>
        <Flex
          as="nav"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: '100%', px: '40px', maxWidth: 1440, mx: 'auto', '@media (max-width: 767px)': { px: '16px' } }}
        >
          <Flex alignItems="center" gap="12px">
            <LogoSquarespace color="fg.default" />
            <Flex alignItems="baseline" gap="4px">
              <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.02em', color: '#0e0e0e' }}>
                Squarespace
              </Text.Body>
              <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.02em', color: '#0e0e0e' }}>
                Domains
              </Text.Body>
            </Flex>
          </Flex>
          <Flex alignItems="center" gap="32px">
            <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', color: '#0e0e0e', cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
              Build a website
            </Text.Body>
            <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', color: '#0e0e0e', cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
              Log in
            </Text.Body>
          </Flex>
        </Flex>
      </Box>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <Box sx={{ position: 'relative', height: 820, background: '#fff', overflow: 'hidden' }}>

        {/* Blobs background */}
        <Box sx={{ position: 'absolute', left: 'calc(50% - 542px)', top: 308, width: 1152, height: 820, pointerEvents: 'none', zIndex: 0 }}>
          <img src={IMG_BLOBS} style={{ width: '100%', height: '100%', display: 'block', filter: 'brightness(1.05) saturate(1.05)' }} alt="" />
        </Box>

        {/* Left screenshot */}
        <Box sx={{ position: 'absolute', left: 'calc(50% - 1148px)', top: 528, width: 600, height: 376, borderRadius: 11, overflow: 'hidden', opacity: 0.5, zIndex: 1 }}>
          <img src={IMG_SS_LEFT} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt="" />
        </Box>

        {/* Center screenshot */}
        <Box sx={{ position: 'absolute', left: 'calc(50% - 521px)', top: 463, width: 1042, height: 649, borderRadius: 11, overflow: 'hidden', zIndex: 1 }}>
          <img src={IMG_SS_CENTER} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt="" />
        </Box>

        {/* Right screenshot */}
        <Box sx={{ position: 'absolute', left: 'calc(50% + 548px)', top: 528, width: 600, height: 374, borderRadius: 11, overflow: 'hidden', opacity: 0.5, zIndex: 1 }}>
          <img src={IMG_SS_RIGHT} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt="" />
        </Box>

        {/* Hero content */}
        <Flex
          flexDirection="column"
          alignItems="center"
          sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 70, width: 'min(777px, calc(100vw - 32px))', zIndex: 2, gap: '33px' }}
        >
          {/* Buy / Transfer toggle */}
          <Box sx={{
            position: 'relative',
            backdropFilter: 'blur(25px)',
            background: 'rgba(183,183,183,0.2)',
            border: '1px solid #e7e7e7',
            borderRadius: 30,
            padding: '4px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}>
            {/* Sliding pill — pure CSS, no JS measurement */}
            <Box sx={{
              position: 'absolute',
              top: '4px',
              bottom: '4px',
              left: tab === 'buy' ? '4px' : 'calc(50%)',
              width: 'calc(50% - 4px)',
              borderRadius: 30,
              background: '#0e0e0e',
              transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)',
              zIndex: 0,
              pointerEvents: 'none',
            }} />
            {(['buy', 'transfer'] as const).map((t) => (
              <Box
                key={t}
                as="button"
                onClick={() => setTab(t)}
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  background: 'transparent',
                  color: tab === t ? '#fff' : '#0e0e0e',
                  border: 'none',
                  borderRadius: 30,
                  px: '16px',
                  py: '8px',
                  cursor: 'pointer',
                  fontFamily: CLARKSON,
                  fontWeight: 400,
                  fontSize: '15px',
                  letterSpacing: '-0.015px',
                  lineHeight: 1.4,
                  transition: 'color 0.2s',
                  textAlign: 'center',
                }}
              >
                {t === 'buy' ? 'Buy' : 'Transfer'}
              </Box>
            ))}
          </Box>

          {/* Headline */}
          <Box
            key={`headline-${tab}`}
            as="p"
            m={0}
            sx={{
              fontFamily: CLARKSON,
              fontWeight: 300,
              fontSize: '80px',
              lineHeight: 0.93,
              letterSpacing: '-4px',
              color: '#0e0e0e',
              textAlign: 'center',
              width: '100%',
              animation: 'heroTextIn 0.3s cubic-bezier(0.4,0,0.2,1) forwards',
            }}
          >
            {tab === 'buy' ? 'Buy your dream domain' : <>Transfer your<br />domain</>}
          </Box>

          {/* Subtitle */}
          <Box
            key={`subtitle-${tab}`}
            as="p"
            m={0}
            sx={{
              fontFamily: CLARKSON,
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: 1.4,
              letterSpacing: '-0.015px',
              color: '#0e0e0e',
              textAlign: 'center',
              textShadow: '0px 1.802px 99.11px #432619',
              width: 544,
              animation: 'heroTextIn 0.35s cubic-bezier(0.4,0,0.2,1) 0.05s both',
            }}
          >
            {tab === 'buy'
              ? 'Each domain name registration comes with free suite of tools including WHOIS privacy and SSL certificate.'
              : 'Bring your domain to Squarespace where pricing is transparent, and premium privacy and security features come standard.'
            }
          </Box>

          {/* Search field */}
          <style>{`
            @keyframes hintSlideIn {
              from { transform: translateY(-8px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes heroTextIn {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes guideMeExpand {
              from { opacity: 0; transform: translateY(-6px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          {/* Search + Guide me card — single container, one shadow */}
          <Box sx={{ position: 'relative', width: 'min(660px, calc(100vw - 40px))', flexShrink: 0 }}>
          <Box
            sx={{
              width: '100%',
              borderRadius: (showSuggestions && !guideMe) ? '8px 8px 0 0' : 8,
              background: '#fff',
              boxShadow: searchFocused
                ? '0px 0px 2px 0px rgba(0,0,0,0.14), 0px 12px 40px 0px rgba(0,0,0,0.18)'
                : '0px 0px 1px 0px rgba(0,0,0,0.04), 0px 2px 8px 0px rgba(0,0,0,0.06)',
              transition: 'box-shadow 0.2s ease, border-radius 0.1s ease',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {/* Search row */}
            <Flex
              alignItems="center"
              sx={{ height: 62, gap: '16px', px: '24px' }}
            >
              <Search sx={{ width: 22, height: 22, flexShrink: 0, color: '#878787' }} />
              <Box sx={{ position: 'relative', flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                {!query && (
                  tab === 'transfer' ? (
                    <Box as="span" sx={{
                      position: 'absolute', left: 0, right: 0,
                      fontFamily: CLARKSON, fontSize: '15px', letterSpacing: '-0.015px',
                      color: '#878787', pointerEvents: 'none',
                    }}>
                      Enter your domain to get started
                    </Box>
                  ) : guideMeSummary ? (
                    <Box as="span" sx={{
                      position: 'absolute', left: 0, right: 0,
                      fontFamily: CLARKSON, fontSize: '15px', letterSpacing: '-0.015px',
                      color: '#0e0e0e', pointerEvents: 'none',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {guideMeSummary}
                    </Box>
                  ) : (
                    <Box
                      key={hintIndex}
                      as="span"
                      sx={{
                        position: 'absolute', left: 0, right: 0,
                        fontFamily: CLARKSON, fontSize: '15px', letterSpacing: '-0.015px',
                        color: '#878787', pointerEvents: 'none',
                        animation: 'hintSlideIn 0.35s cubic-bezier(0.4,0,0.2,1) forwards',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}
                    >
                      {SEARCH_HINTS[hintIndex]}
                    </Box>
                  )
                )}
                <Box
                  as="input"
                  value={query}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder=""
                  sx={{
                    width: '100%', border: 'none', background: 'transparent', outline: 'none',
                    fontSize: '15px', color: '#0e0e0e', fontFamily: CLARKSON,
                    letterSpacing: '-0.015px', lineHeight: 1.4, position: 'relative', zIndex: 1,
                  }}
                />
              </Box>
              {/* Guide me button */}
              <Flex
                as="button"
                alignItems="center"
                onClick={() => setGuideMe(g => !g)}
                sx={{
                  background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0,
                  color: '#666', fontFamily: CLARKSON, fontSize: '12px', letterSpacing: '-0.015px',
                  lineHeight: 1.4, p: 0, gap: '2px',
                }}
              >
                Guide me
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none" style={{ transition: 'transform 0.2s', transform: guideMe ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                  <path d="M1 1L5 5L9 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Flex>
              <Box
                as="button"
                onClick={handleSearch}
                aria-label="Search"
                sx={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', p: 0, ml: '4px' }}
              >
                <ArrowRight sx={{ width: 22, height: 22, color: '#0e0e0e' }} />
              </Box>
            </Flex>

            {/* Guide me expanded panel */}
            {guideMe && (
              <Box sx={{
                borderTop: '1px solid #e7e7e7',
                p: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '22px',
                animation: 'guideMeExpand 0.25s cubic-bezier(0.4,0,0.2,1) forwards',
              }}>
                {/* Dropdowns row */}
                <Flex gap="16px">
                  {/* Industry select */}
                  <Box as="select"
                    value={industry}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setIndustry(e.target.value)}
                    sx={{
                      flex: 1, height: 62,
                      background: 'rgba(0,0,0,0.05)',
                      border: 'none', borderRadius: 8,
                      px: '16px', py: '12px',
                      fontFamily: CLARKSON, fontSize: '15px',
                      color: industry ? '#0e0e0e' : '#898989',
                      letterSpacing: '-0.015px', lineHeight: 1.4,
                      appearance: 'none', cursor: 'pointer', outline: 'none',
                    }}
                  >
                    <option value="" disabled>Industry</option>
                    {['Retail', 'Food & Beverage', 'Health & Wellness', 'Creative Arts', 'Tech', 'Professional Services', 'Education', 'Travel', 'Real Estate', 'Non-profit'].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </Box>
                  {/* Business name text input */}
                  <Box
                    as="input"
                    type="text"
                    value={businessName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusinessName(e.target.value)}
                    placeholder="Business name (Optional)"
                    sx={{
                      flex: 1, height: 62,
                      background: 'rgba(0,0,0,0.05)',
                      border: 'none', borderRadius: 8,
                      px: '16px', py: '12px',
                      fontFamily: CLARKSON, fontSize: '15px',
                      color: businessName ? '#0e0e0e' : '#898989',
                      letterSpacing: '-0.015px', lineHeight: 1.4,
                      outline: 'none', boxSizing: 'border-box',
                      '&::placeholder': { color: '#898989' },
                    }}
                  />
                </Flex>

                {/* Vibe section */}
                <Box>
                  <Box mb="16px">
                    <Box as="p" m={0} sx={{ fontFamily: CLARKSON, fontSize: '15px', color: '#0e0e0e', letterSpacing: '-0.015px', lineHeight: 1.4 }}>
                      What's the vibe of your business?
                    </Box>
                    <Box as="p" m={0} sx={{ fontFamily: CLARKSON, fontSize: '15px', color: '#666', letterSpacing: '-0.015px', lineHeight: 1.4 }}>
                      Select one or more.
                    </Box>
                  </Box>
                  <Flex flexWrap="wrap" gap="8px">
                    {['Professional', 'Friendly', 'Sophisticated', 'Playful', 'Modern', 'Informative'].map(vibe => (
                      <Box
                        key={vibe}
                        as="button"
                        onClick={() => toggleVibe(vibe)}
                        sx={{
                          backdropFilter: 'blur(25px)',
                          background: selectedVibes.includes(vibe) ? '#0e0e0e' : 'rgba(183,183,183,0.2)',
                          border: '1px solid',
                          borderColor: selectedVibes.includes(vibe) ? '#0e0e0e' : '#fff',
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
            )}
          </Box>

          {/* Suggestions dropdown */}
          {showSuggestions && !guideMe && (
            <Box sx={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999,
              background: '#fff', borderRadius: '0 0 8px 8px',
              borderTop: '1px solid #e7e7e7',
              overflow: 'hidden', py: '8px',
            }}>
              {(['Fun domains for a pottery studio', 'Short, catchy names for a boutique brand'] as const).map((s) => (
                <Box
                  key={s} as="button"
                  onMouseDown={() => { setQuery(s); setShowSuggestions(false); navigate('/domain-search?q=' + encodeURIComponent(s)) }}
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
              {(() => {
                const recents: string[] = (() => { try { return JSON.parse(localStorage.getItem('domainRecentSearches') || '[]') } catch { return [] } })()
                return recents.length > 0 ? (
                  <>
                    <Box sx={{ height: '1px', background: '#f0f0f0', mx: '22px', my: '8px' }} />
                    {recents.slice(0, 3).map((s: string) => (
                      <Box
                        key={s} as="button"
                        onMouseDown={() => { setQuery(s); setShowSuggestions(false); navigate(`/domain-search?q=${encodeURIComponent(s)}`) }}
                        sx={{
                          width: '100%', px: '22px', py: '10px', border: 'none', background: 'none',
                          textAlign: 'left', cursor: 'pointer', fontFamily: CLARKSON, fontSize: '15px',
                          color: '#0e0e0e', display: 'flex', alignItems: 'center', gap: '12px',
                          letterSpacing: '-0.015px', lineHeight: 1.4, boxSizing: 'border-box',
                          '&:hover': { background: 'rgba(0,0,0,0.03)' },
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                          <path d="M2.5 8A5.5 5.5 0 1 0 8 2.5" stroke="#aaa" strokeWidth="1.3" strokeLinecap="round"/>
                          <path d="M2.5 4.5V8H6" stroke="#aaa" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 5.5V8.5l2 1.2" stroke="#aaa" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {s}
                      </Box>
                    ))}
                  </>
                ) : null
              })()}
            </Box>
          )}
          </Box>{/* end position:relative wrapper */}
        </Flex>
      </Box>

      {/* ── Pricing ──────────────────────────────────────────────────────────── */}
      <Box sx={{ background: '#f9f9f9', py: '120px', px: '40px', '@media (max-width: 767px)': { px: '16px' } }}>
        <Flex gap="156px" alignItems="flex-start" sx={{ maxWidth: 1360, mx: 'auto' }}>

          {/* Left: heading + copy */}
          <Box sx={{ flex: '0 0 427px' }}>
            <Box as="p" m={0} sx={{
              fontFamily: CLARKSON_SERIF,
              fontWeight: 300,
              fontSize: '40px',
              lineHeight: 1,
              letterSpacing: '-1.6px',
              color: '#000',
              mb: '24px',
            }}>
              Inclusive, transparent pricing
            </Box>
            <Box as="p" m={0} sx={{
              fontFamily: CLARKSON,
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: 1.4,
              letterSpacing: '-0.016px',
              color: '#000',
            }}>
              The price you see is the price you pay. Your domain comes with everything included — every feature, every tool, even taxes and fees are accounted for, so there are no surprises at check-out.
            </Box>
          </Box>

          {/* Right: feature comparison table */}
          <Box sx={{ flex: '0 0 777px' }}>
            {/* Header row */}
            <Flex alignItems="center" sx={{ pt: '16px', pb: '16px' }}>
              <Box sx={{ flex: 1 }}>
                <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', color: '#878787' }}>Features</Text.Body>
              </Box>
              <Box sx={{ width: 170, display: 'flex', justifyContent: 'center' }}>
                <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', color: '#000' }}>Squarespace</Text.Body>
              </Box>
              <Box sx={{ width: 110, display: 'flex', justifyContent: 'center' }}>
                <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', color: '#878787' }}>Others</Text.Body>
              </Box>
            </Flex>

            {/* Feature rows */}
            {PRICING_FEATURES.map((f) => (
              <Box key={f.name}>
                <Box sx={{ height: 1, background: '#ddd' }} />
                <Flex alignItems="center" sx={{ py: '11px' }}>
                  <Box sx={{ flex: 1 }}>
                    <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '16px', letterSpacing: '-0.016px', color: '#000' }}>{f.name}</Text.Body>
                  </Box>
                  <Box sx={{ width: 170, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {f.sqs && <CheckIcon />}
                  </Box>
                  <Box sx={{ width: 110, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {f.others ? <CheckIcon muted /> : <XIcon />}
                  </Box>
                </Flex>
              </Box>
            ))}

            {/* Total value row */}
            <Box sx={{ height: 1, background: '#ddd' }} />
            <Flex alignItems="center" sx={{ py: '11px' }}>
              <Box sx={{ flex: 1 }}>
                <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '16px', letterSpacing: '-0.016px', color: '#000' }}>Total value</Text.Body>
              </Box>
              <Box sx={{ width: 170, display: 'flex', justifyContent: 'center' }}>
                <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontWeight: 400, fontSize: '16px', letterSpacing: '-0.016px', color: '#000' }}>Included</Text.Body>
              </Box>
              <Box sx={{ width: 110, display: 'flex', justifyContent: 'center' }}>
                <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontWeight: 400, fontSize: '16px', letterSpacing: '-0.016px', color: '#000' }}>$11 – $130</Text.Body>
              </Box>
            </Flex>
          </Box>

        </Flex>
      </Box>

      {/* ── TLD Pills ────────────────────────────────────────────────────────── */}
      <Box sx={{ background: '#0e0e0e' }}>

        {/* Heading + subtext */}
        <Flex flexDirection="column" alignItems="center" gap="40px" sx={{ px: '40px', pt: '80px', pb: '80px' }}>
          <Box as="p" m={0} sx={{
            fontFamily: CLARKSON_SERIF,
            fontWeight: 300,
            fontSize: '40px',
            lineHeight: 1,
            letterSpacing: '-1.6px',
            color: '#fff',
            textAlign: 'center',
            width: 660,
          }}>
            Register a domain name from over 400+ extensions
          </Box>
          <Box as="p" m={0} sx={{
            fontFamily: CLARKSON,
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: 1.4,
            letterSpacing: '-0.015px',
            color: '#fff',
            textAlign: 'center',
            width: 660,
          }}>
            Squarespace offers a wide-range of top-level domains, allowing you to customize your online presence to fit your brand or business.
          </Box>
        </Flex>

        {/* Pills */}
        <Flex sx={{ flexWrap: 'wrap', gap: '24px', justifyContent: 'center', px: '40px', pb: '80px', maxWidth: 1360, mx: 'auto' }}>
          {TLD_PILLS.map((tld) => (
            <Box
              key={tld}
              as="button"
              onClick={() => navigate(`/domain-search?q=${tld}`)}
              sx={{
                backdropFilter: 'blur(25px)',
                background: 'rgba(26,26,26,0.7)',
                borderRadius: 100,
                border: 'none',
                px: '24px',
                height: 62,
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0px 4px 30px 0px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transition: 'background 0.15s',
                '&:hover': { background: 'rgba(40,40,40,0.9)' },
              }}
            >
              <Text.Body m={0} sx={{
                fontFamily: CLARKSON,
                fontWeight: 500,
                fontSize: '24px',
                lineHeight: 1.2,
                letterSpacing: '-0.24px',
                color: '#ddd',
                whiteSpace: 'nowrap',
              }}>
                {tld}
              </Text.Body>
            </Box>
          ))}
        </Flex>

        {/* Explore CTA */}
        <Flex justifyContent="center" sx={{ pb: '120px' }}>
          <Box
            as="button"
            sx={{
              border: '1.5px solid rgba(255,255,255,0.2)',
              background: 'transparent',
              height: 62,
              px: '28px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'border-color 0.15s',
              '&:hover': { borderColor: 'rgba(255,255,255,0.5)' },
            }}
          >
            <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '14px', lineHeight: 1, color: '#fff', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Explore all options
            </Text.Body>
            <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontWeight: 500, fontSize: '14px', lineHeight: 1, color: '#fff' }}>
              →
            </Text.Body>
          </Box>
        </Flex>
      </Box>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <Box sx={{ px: '40px', py: '120px' }}>
        <Flex gap="40px" alignItems="flex-start" sx={{ maxWidth: 1360, mx: 'auto' }}>
          <Box sx={{ flex: '0 0 660px' }}>
            <Box as="p" m={0} sx={{
              fontFamily: CLARKSON_SERIF,
              fontWeight: 300,
              fontSize: '40px',
              lineHeight: 1,
              letterSpacing: '-1.6px',
              color: '#000',
            }}>
              Frequently asked questions
            </Box>
          </Box>
          <Box sx={{ flex: '0 0 660px' }}>
            <Accordion>
              {FAQ_ITEMS.map((item, i) => (
                <Accordion.Item key={i}>
                  <Accordion.Header label={item.label} />
                  <Accordion.Body>
                    <Text.Body m={0} color="fg.muted" py={2}>{item.body}</Text.Body>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Box>
        </Flex>
      </Box>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <Box sx={{ borderTop: '1px solid #ddd', px: '40px', py: '40px' }}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap="12px">
            <LogoSquarespace color="fg.default" />
            <Text.Body m={0} sx={{ fontFamily: CLARKSON, fontSize: '14px', color: '#878787' }}>
              © 2026 Squarespace, Inc.
            </Text.Body>
          </Flex>
          <Flex gap="24px">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((link) => (
              <Text.Body key={link} m={0} sx={{ fontFamily: CLARKSON, fontSize: '14px', color: '#878787', cursor: 'pointer', '&:hover': { color: '#0e0e0e' } }}>
                {link}
              </Text.Body>
            ))}
          </Flex>
        </Flex>
      </Box>

    </Box>
  )
}

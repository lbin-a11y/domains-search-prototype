import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Flex, Text } from '@sqs/rosetta-primitives'
import { LogoSquarespace, Search, ArrowRight } from '@sqs/rosetta-icons'
import { Accordion } from '@sqs/rosetta-compositions'

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

  function handleSearch() {
    const trimmed = query.trim().toLowerCase().replace(/\s+/g, '').replace(/^\./, '')
    if (trimmed) navigate(`/domain-search?q=${encodeURIComponent(trimmed)}`)
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
          sx={{ height: '100%', px: '40px', maxWidth: 1440, mx: 'auto' }}
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
        <Box sx={{ position: 'absolute', left: 178, top: 308, width: 1152, height: 820, pointerEvents: 'none', zIndex: 0 }}>
          <img src={IMG_BLOBS} style={{ width: '100%', height: '100%', display: 'block' }} alt="" />
        </Box>

        {/* Left screenshot */}
        <Box sx={{ position: 'absolute', left: -427, top: 528, width: 600, height: 376, borderRadius: 11, overflow: 'hidden', opacity: 0.5, zIndex: 1 }}>
          <img src={IMG_SS_LEFT} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt="" />
        </Box>

        {/* Center screenshot */}
        <Box sx={{ position: 'absolute', left: 200, top: 463, width: 1042, height: 649, borderRadius: 11, overflow: 'hidden', zIndex: 1 }}>
          <img src={IMG_SS_CENTER} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt="" />
        </Box>

        {/* Right screenshot */}
        <Box sx={{ position: 'absolute', left: 1269, top: 528, width: 600, height: 374, borderRadius: 11, overflow: 'hidden', opacity: 0.5, zIndex: 1 }}>
          <img src={IMG_SS_RIGHT} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt="" />
        </Box>

        {/* Hero content */}
        <Flex
          flexDirection="column"
          alignItems="center"
          sx={{ position: 'absolute', left: 331, top: 70, width: 777, zIndex: 2, gap: '33px' }}
        >
          {/* Buy / Transfer toggle */}
          <Box sx={{
            backdropFilter: 'blur(25px)',
            background: 'rgba(183,183,183,0.2)',
            border: '1px solid #e7e7e7',
            borderRadius: 30,
            padding: '8px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}>
            {(['buy', 'transfer'] as const).map((t) => (
              <Box
                key={t}
                as="button"
                onClick={() => setTab(t)}
                sx={{
                  background: tab === t ? '#0e0e0e' : 'transparent',
                  color: tab === t ? '#fff' : '#0e0e0e',
                  border: 'none',
                  borderRadius: 30,
                  px: '16px',
                  py: '8px',
                  cursor: 'pointer',
                  fontFamily: CLARKSON,
                  fontWeight: tab === t ? 600 : 400,
                  fontSize: '15px',
                  letterSpacing: '-0.015px',
                  lineHeight: 1.4,
                  transition: 'background 0.15s, color 0.15s',
                  textTransform: 'capitalize',
                }}
              >
                {t}
              </Box>
            ))}
          </Box>

          {/* Headline */}
          <Box as="p" m={0} sx={{
            fontFamily: CLARKSON,
            fontWeight: 300,
            fontSize: '80px',
            lineHeight: 0.93,
            letterSpacing: '-4px',
            color: '#0e0e0e',
            textAlign: 'center',
            width: '100%',
          }}>
            Buy your dream domain
          </Box>

          {/* Subtitle */}
          <Box as="p" m={0} sx={{
            fontFamily: CLARKSON,
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: 1.4,
            letterSpacing: '-0.015px',
            color: '#0e0e0e',
            textAlign: 'center',
            textShadow: '0px 1.802px 99.11px #432619',
            width: 544,
          }}>
            Each domain name registration comes with free suite of tools including WHOIS privacy and SSL certificate.
          </Box>

          {/* Search field */}
          <Flex
            alignItems="center"
            sx={{
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.08), 0px 8px 32px 0px rgba(0,0,0,0.12)',
              height: 62,
              width: 660,
              gap: '16px',
              px: '24px',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <Search sx={{ width: 22, height: 22, flexShrink: 0, color: '#878787' }} />
            <Box
              as="input"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Hypha Florals"
              sx={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '15px',
                color: '#0e0e0e',
                fontFamily: CLARKSON,
                letterSpacing: '-0.015px',
                lineHeight: 1.4,
                '&::placeholder': { color: '#878787' },
              }}
            />
            <Box
              as="button"
              onClick={handleSearch}
              aria-label="Search"
              sx={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', p: 0 }}
            >
              <ArrowRight sx={{ width: 22, height: 22, color: '#0e0e0e' }} />
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* ── Pricing ──────────────────────────────────────────────────────────── */}
      <Box sx={{ background: '#f9f9f9', py: '120px', px: '40px' }}>
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

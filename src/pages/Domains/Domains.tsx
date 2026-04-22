import { useState, useRef, useId, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Flex, Text, Button, Field } from '@sqs/rosetta-primitives'
import { Card, Divider, Stack, TextInput } from '@sqs/rosetta-elements'
import { Accordion } from '@sqs/rosetta-compositions'
import {
  LogoSquarespace,
  Search,
  Lock,
  CheckmarkShield,
  CheckmarkCircle,
  Global,
  Website,
  Mail,
  ArrowRight,
  ShoppingBag,
} from '@sqs/rosetta-icons'

const PRICING_ROWS = [
  { tld: '.com', squarespace: '$12/yr', renewal: '$20/yr' },
  { tld: '.net', squarespace: '$18/yr', renewal: '$24/yr' },
  { tld: '.org', squarespace: '$18/yr', renewal: '$24/yr' },
  { tld: '.info', squarespace: '$18/yr', renewal: '$28/yr' },
  { tld: '.co', squarespace: '$26/yr', renewal: '$36/yr' },
  { tld: '.biz', squarespace: '$16/yr', renewal: '$24/yr' },
  { tld: '.io', squarespace: '$48/yr', renewal: '$60/yr' },
  { tld: '.me', squarespace: '$18/yr', renewal: '$26/yr' },
]

const WHY_FEATURES = [
  {
    icon: Lock,
    title: 'Privacy',
    description:
      'WHOIS privacy is included free with every domain. Your personal contact information stays private and off public registries.',
  },
  {
    icon: CheckmarkShield,
    title: 'Security',
    description:
      'SSL certificates are included with every Squarespace domain. Protect your visitors and boost your search ranking.',
  },
  {
    icon: Global,
    title: 'Domain Name Sync',
    description:
      'Domains registered with Squarespace connect automatically to your website. No manual DNS configuration required.',
  },
  {
    icon: Website,
    title: 'Domain Status',
    description:
      'Monitor your domain health from one dashboard. Renewals, expiration dates, and transfer locks all in one place.',
  },
]

const SECURITY_COLUMNS = [
  {
    title: 'Built-in security, backed by the best',
    body: 'Every Squarespace domain includes free WHOIS privacy, SSL certificates, and two-factor authentication — standard security features that many registrars charge extra for.',
  },
  {
    title: 'Stay secure, wherever you need it',
    body: 'Domain lock prevents unauthorized transfers. Squarespace monitors your domain 24/7 and alerts you to any suspicious activity so you can act fast.',
  },
  {
    title: 'Find the right domain. Protected.',
    body: 'SSL/TLS encryption is automatically provisioned for every domain. Your site gets HTTPS out of the box, building trust with visitors from day one.',
  },
]

const DARK_FEATURES = [
  {
    icon: ArrowRight,
    title: 'Transfer an existing domain',
    description:
      'Move a domain you already own to Squarespace and manage everything in one place.',
  },
  {
    icon: Mail,
    title: 'Private email from Google Workspace',
    description:
      'Add professional email addresses that match your domain, powered by Google Workspace.',
  },
  {
    icon: Website,
    title: 'Start building your website',
    description:
      "Go from domain to live website in minutes with Squarespace's award-winning templates.",
  },
]

const EXTENSIONS = [
  '.com', '.net', '.org', '.info', '.co', '.io', '.biz', '.me',
  '.store', '.shop', '.online', '.site', '.tech', '.design', '.blog', '.app',
  '.dev', '.studio', '.agency', '.media', '.photography', '.art', '.music', '.film',
]

const HOW_TO_STEPS = [
  'Enter your desired domain name into our domain name search to see if a domain is available.',
  'Check the availability of domain names across a wide range of TLDs including .com, country codes, and unique extensions.',
  'Transfer your domain registration from Squarespace to you so you can keep it everywhere.',
  'Check out and pay.',
]

const FAQ_ITEMS = [
  {
    label: 'What is a domain name?',
    body: 'A domain name is the address of your website that people type in the browser URL bar to visit your website. In other words, if your website were a house, then your domain name is its address.',
  },
  {
    label: 'What is a domain name registration?',
    body: 'Domain name registration is the process of reserving a name on the internet for a certain period, usually one year. Registering a domain prevents others from using it while you own it.',
  },
  {
    label: 'How do I choose a domain name?',
    body: 'Choose a domain name that reflects your brand or business, is easy to spell and remember, and uses a popular extension like .com when possible. Avoid hyphens and numbers.',
  },
  {
    label: 'How do I set my email for my domain?',
    body: 'Once you register a domain with Squarespace, you can add Google Workspace email directly from your domain settings panel to get professional email addresses at your domain.',
  },
  {
    label: 'How many email addresses can I have on Squarespace?',
    body: 'The number of email addresses depends on your Google Workspace plan. Each plan supports a different number of users, starting with a single user on the Basic plan.',
  },
  {
    label: 'Can Squarespace host my domain?',
    body: 'Yes. Squarespace can host your domain and your website. Domains registered with Squarespace automatically connect to Squarespace websites, simplifying your setup.',
  },
  {
    label: 'Do Squarespace domains offer DNS?',
    body: 'Yes. Every Squarespace domain includes full DNS management. You can add A records, CNAMEs, MX records, and more from your domain settings.',
  },
  {
    label: 'How do I choose a domain registrar?',
    body: 'Look for a registrar that offers transparent renewal pricing, privacy protection, SSL certificates, and easy DNS management. Squarespace bundles all of these with every domain.',
  },
  {
    label: 'I have a domain, but I don\'t know what happens if I don\'t renew it.',
    body: 'If you don\'t renew your domain before it expires, it will enter a grace period, then become available for anyone to register. You\'ll lose access to your website and email at that address.',
  },
  {
    label: 'Can I buy a domain, but don\'t need a website right now?',
    body: 'Absolutely. You can register a domain with Squarespace and leave it parked until you\'re ready to build. Your domain is yours for as long as you renew it.',
  },
  {
    label: 'Does Squarespace offer "free" domains?',
    body: 'Squarespace includes a free custom domain for the first year with any annual website plan. After that, the domain renews at the standard rate.',
  },
  {
    label: 'Can I buy a domain, but don\'t know what to do with it?',
    body: 'Yes. You can purchase a domain and decide what to do with it later — connect it to a website, use it for email, or simply hold it. Squarespace makes it easy to manage from your account.',
  },
]


function HeroSearch({ onFocusChange }: { onFocusChange?: (focused: boolean) => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const labelId = useId()

  const trimmed = query.trim().toLowerCase().replace(/\s+/g, '').replace(/^\./, '')

  function handleSearch() {
    if (trimmed) navigate(`/domain-search?q=${encodeURIComponent(trimmed)}`)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch()
  }

  function handleFocus() {
    setIsFocused(true)
    onFocusChange?.(true)
  }

  function handleBlur() {
    setIsFocused(false)
    onFocusChange?.(false)
  }

  return (
    <div onFocusCapture={handleFocus} onBlurCapture={handleBlur}>
      {/* Search bar */}
      <Flex
        alignItems="center"
        bg="bg.base"
        sx={{
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: isFocused
            ? '0 0 0 2.5px #0862d1, 0 2px 24px rgba(0,0,0,0.32)'
            : '0 2px 24px rgba(0,0,0,0.32)',
          height: 60,
          transition: 'box-shadow 0.15s ease',
        }}
      >
        <Flex alignItems="center" px={4} gap={3} sx={{ flex: 1, minWidth: 0 }}>
          <Search color="fg.muted" sx={{ flexShrink: 0 }} />
          <Field.Root name="hero-domain-search" sx={{ flex: 1, minWidth: 0 }}>
            <label id={labelId} style={{ display: 'none' }}>Search for a domain</label>
            <TextInput
              ref={inputRef}
              aria-labelledby={labelId}
              placeholder="Start your search here"
              value={query}
              onChange={(value: string) => setQuery(value)}
              onKeyDown={handleKeyDown}
              sx={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                width: '100%',
                color: 'fg.default',
                fontSize: { _: 3, 'mobile-*': 4 },
                padding: 0,
                lineHeight: 'inherit',
              }}
            />
          </Field.Root>
        </Flex>
        {/* Arrow button */}
        <Box
          as="button"
          onClick={handleSearch}
          sx={{
            height: '100%',
            width: 60,
            background: 'none',
            border: 'none',
            borderLeft: '1px solid',
            borderColor: 'border.default',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'fg.muted',
            transition: 'color 0.15s, background 0.15s',
            '&:hover': { background: 'bg.default', color: 'fg.default' },
          }}
        >
          <ArrowRight />
        </Box>
      </Flex>

    </div>
  )
}

function InlineSearch() {
  const [query, setQuery] = useState('')
  const labelId = useId()

  return (
    <Flex gap={2} alignItems="center" sx={{ flexWrap: 'wrap' }}>
      <Flex
        alignItems="center"
        gap={2}
        px={3}
        bg="bg.base"
        sx={{
          flex: '1 1 300px',
          minWidth: 0,
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 6,
          height: 44,
        }}
      >
        <Search color="fg.muted" sx={{ flexShrink: 0 }} />
        <Field.Root name="inline-domain-search" sx={{ flex: 1, minWidth: 0 }}>
          <label id={labelId} style={{ display: 'none' }}>Search for a domain</label>
          <TextInput
            aria-labelledby={labelId}
            placeholder="Search for your perfect domain"
            value={query}
            onChange={(value: string) => setQuery(value)}
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
      <Button.Primary size="medium">Search</Button.Primary>
    </Flex>
  )
}

export default function Domains() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [heroPassed, setHeroPassed] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 0) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeroPassed(!entry.isIntersecting),
      { threshold: 0 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  // Nav appearance: matches hero at top (no visible fill) → black while scrolling in hero → white after hero
  const navBg = heroPassed ? '#fff' : (scrolled ? '#000' : '#1a2d3f')
  const navShadow = (scrolled || heroPassed) ? '0 1px 16px rgba(0,0,0,0.12)' : 'none'
  const onDark = !heroPassed
  const navLogoColor = onDark ? 'fg.onStrong' : 'fg.default'
  const navLinkColor = onDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'
  const navLinkHoverColor = onDark ? '#fff' : '#000'

  return (
    <Box bg="bg.base" minHeight="100vh">
      {/* Nav */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: navBg,
          boxShadow: navShadow,
          transition: 'background 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        <Flex
          as="nav"
          alignItems="center"
          justifyContent="space-between"
          px={6}
          sx={{ height: 60, maxWidth: 1440, mx: 'auto' }}
        >
          {/* Logo */}
          <Flex alignItems="center" gap={2}>
            <LogoSquarespace color={navLogoColor} sx={{ transition: 'color 0.25s ease' }} />
            {/* Hide text label on mobile */}
            <Flex alignItems="baseline" gap={1} sx={{ '@media (max-width: 767px)': { display: 'none' } }}>
              <Text.Body
                m={0}
                sx={{ color: onDark ? '#fff' : '#000', fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.25s ease' }}
              >
                Squarespace
              </Text.Body>
              <Text.Body
                m={0}
                sx={{ color: onDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)', fontSize: '13px', letterSpacing: '0.02em', transition: 'color 0.25s ease' }}
              >
                Domains
              </Text.Body>
            </Flex>
          </Flex>

          {/* Center links — hidden on mobile */}
          <Flex gap={6} alignItems="center" sx={{ '@media (max-width: 767px)': { display: 'none' } }}>
            {['Transfer a domain', 'Build a website'].map((link) => (
              <Text.Body
                key={link}
                m={0}
                sx={{
                  color: navLinkColor,
                  cursor: 'pointer',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  transition: 'color 0.25s ease',
                  '&:hover': { color: navLinkHoverColor },
                }}
              >
                {link}
              </Text.Body>
            ))}
          </Flex>

          {/* Right actions */}
          <Flex gap={4} alignItems="center">
            {/* Log In — hidden on mobile */}
            <Text.Body
              m={0}
              sx={{
                color: navLinkColor,
                cursor: 'pointer',
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'color 0.25s ease',
                '&:hover': { color: navLinkHoverColor },
                '@media (max-width: 767px)': { display: 'none' },
              }}
            >
              Log In
            </Text.Body>
            {/* Hamburger — visible on mobile only */}
            <Box
              as="button"
              aria-label="Open menu"
              sx={{
                display: 'none',
                '@media (max-width: 767px)': { display: 'flex' },
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '5px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                p: 1,
              }}
            >
              {[0, 1, 2].map((i) => (
                <Box key={i} sx={{ width: 22, height: 2, borderRadius: 1, background: onDark ? '#fff' : '#000', transition: 'background 0.25s ease' }} />
              ))}
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* Hero — observed to trigger nav transition when scrolled past */}
      <Box
        ref={heroRef}
        sx={{
          background: '#1a2d3f',
          minHeight: 'calc(100vh - 60px)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
          '@media (max-width: 767px)': {
            flexDirection: 'column',
            alignItems: 'stretch',
            minHeight: 'unset',
          },
        }}
      >
        <Flex
          sx={{
            width: '100%',
            maxWidth: 1440,
            mx: 'auto',
            px: 6,
            py: 10,
            alignItems: 'center',
            gap: 8,
            '@media (max-width: 767px)': { paddingLeft: '16px', paddingRight: '16px', paddingTop: '96px', pb: 8 },
          }}
        >
          {/* Left column — full width on mobile, 48% on desktop */}
          <Flex flexDirection="column" gap={5} sx={{ flex: '0 0 auto', width: 'min(560px, 48%)', minWidth: 320, '@media (max-width: 767px)': { width: '100%', minWidth: 'unset', gap: '16px' } }}>
            {/* Headline — ClarksonSerif */}
            <Box
              as="div"
              m={0}
              sx={{
                fontFamily: '"ClarksonSerif", Georgia, serif',
                fontWeight: 300,
                fontSize: 'clamp(42px, 5vw, 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#fff',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              Buy your dream domain
            </Box>

            {/* Subtitle */}
            <Text.Body
              m={0}
              sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.55, maxWidth: 400 }}
            >
              Every dream needs a domain. Start building yours with Squarespace.
            </Text.Body>

            {/* Search bar */}
            <HeroSearch onFocusChange={setIsSearchFocused} />

            {/* AI inspiration link */}
            <Text.Body m={0} sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>
              Need inspiration?{' '}
              <Box
                as="span"
                sx={{
                  color: 'rgba(255,255,255,0.75)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                  cursor: 'pointer',
                  '&:hover': { color: '#fff' },
                }}
              >
                Generate a domain using AI
              </Box>
            </Text.Body>
          </Flex>

        </Flex>

        {/* Background image — blurs when search is focused */}
        <Box
          as="img"
          src="/phone-hero.png"
          alt="Squarespace website displayed on a mobile phone"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            display: 'block',
            width: '42%',
            maxWidth: 520,
            height: 'auto',
            maskImage: [
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 20%, black 45%)',
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, black 10%)',
            ].join(', '),
            WebkitMaskImage: [
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 20%, black 45%)',
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, black 10%)',
            ].join(', '),
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
            filter: isSearchFocused ? 'blur(8px)' : 'blur(0px)',
            transform: isSearchFocused ? 'scale(1.04)' : 'scale(1)',
            transition: 'filter 0.4s ease, transform 0.4s ease',
            '@media (max-width: 767px)': {
              position: 'relative',
              width: '100%',
              maxWidth: 'none',
              right: 'auto',
              bottom: 'auto',
              display: 'block',
            },
          }}
        />
      </Box>

      {/* Pricing */}
      <Box px={6} py={10} maxWidth={1440} mx="auto">
        <Flex gap={10} alignItems="flex-start" sx={{ flexWrap: 'wrap' }}>
          <Box sx={{ flex: '0 0 320px', minWidth: 0 }}>
            <Stack space={3}>
              <Text.SectionTitle m={0}>Inclusive, transparent pricing</Text.SectionTitle>
              <Text.Body m={0} color="fg.muted">
                The price you see is the price you pay. No surprise fees, no hidden charges — just straightforward domain pricing from day one.
              </Text.Body>
            </Stack>
          </Box>
          <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
            <Flex borderBottom="1px solid" borderColor="border.default" pb={2} mb={2}>
              <Text.Body m={0} sx={{ flex: 1 }} color="fg.muted" />
              <Text.Body m={0} sx={{ width: 140 }} fontWeight="semibold">SQUARESPACE</Text.Body>
              <Text.Body m={0} sx={{ width: 120 }} fontWeight="semibold">RENEWAL</Text.Body>
            </Flex>
            {PRICING_ROWS.map((row, i) => (
              <Flex
                key={row.tld}
                py={2}
                borderBottom="1px solid"
                borderColor="border.default"
                sx={{ backgroundColor: i % 2 === 0 ? 'bg.inset' : undefined }}
                px={2}
              >
                <Text.Body m={0} sx={{ flex: 1 }} fontWeight="semibold">{row.tld}</Text.Body>
                <Text.Body m={0} sx={{ width: 140 }}>{row.squarespace}</Text.Body>
                <Text.Body m={0} sx={{ width: 120 }} color="fg.muted">{row.renewal}</Text.Body>
              </Flex>
            ))}
          </Box>
        </Flex>
      </Box>

      <Divider />

      {/* Why Squarespace */}
      <Box px={6} py={10} maxWidth={1440} mx="auto">
        <Flex flexDirection="column" gap={6}>
          <Flex gap={8} alignItems="flex-start" sx={{ flexWrap: 'wrap' }}>
            <Box sx={{ flex: '0 0 280px' }}>
              <Text.SectionTitle m={0}>Why choose Squarespace?</Text.SectionTitle>
            </Box>
            <Text.Body m={0} color="fg.muted" sx={{ flex: '1 1 400px', maxWidth: 560 }}>
              We offer more than just a domain name. When you register with Squarespace, you get privacy protection, SSL security, and seamless integration with your website — all included.
            </Text.Body>
          </Flex>
          <Flex gap={4} sx={{ flexWrap: 'wrap' }}>
            {WHY_FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <Card key={f.title} px={5} py={5} sx={{ flex: '1 1 240px', maxWidth: 360 }}>
                  <Stack space={3}>
                    <Box
                      width={44}
                      height={44}
                      bg="bg.default"
                      sx={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                    >
                      <Icon />
                    </Box>
                    <Text.Subtitle m={0} fontWeight="semibold">{f.title}</Text.Subtitle>
                    <Text.Body m={0} color="fg.muted">{f.description}</Text.Body>
                  </Stack>
                </Card>
              )
            })}
          </Flex>
        </Flex>
      </Box>

      <Divider />

      {/* Security without compromise */}
      <Box px={6} py={10} maxWidth={1440} mx="auto">
        <Flex flexDirection="column" gap={6}>
          <Text.SectionTitle m={0}>Security without compromise</Text.SectionTitle>
          <Flex gap={6} sx={{ flexWrap: 'wrap' }}>
            {SECURITY_COLUMNS.map((col) => (
              <Flex key={col.title} flexDirection="column" gap={3} sx={{ flex: '1 1 240px', minWidth: 0 }}>
                <Text.Subtitle m={0} fontWeight="semibold">{col.title}</Text.Subtitle>
                <Text.Body m={0} color="fg.muted">{col.body}</Text.Body>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Box>

      {/* Dark CTA */}
      <Box bg="bg.strong" px={6} py={10}>
        <Box maxWidth={1440} mx="auto">
          <Flex flexDirection="column" gap={8}>
            <Flex gap={8} alignItems="flex-start" sx={{ flexWrap: 'wrap' }}>
              <Text.SectionTitle m={0} color="fg.onStrong" sx={{ flex: '0 0 280px' }}>
                Buy a domain and bring your idea to life.
              </Text.SectionTitle>
              <Text.Body m={0} color="gray.600" sx={{ flex: '1 1 400px', maxWidth: 560 }}>
                Registering a domain name is just the beginning. Squarespace gives you the tools to build a website, set up email, and grow your online presence — all from one platform.
              </Text.Body>
            </Flex>
            <Flex gap={4} sx={{ flexWrap: 'wrap' }}>
              {DARK_FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <Box
                    key={f.title}
                    px={5}
                    py={5}
                    bg="bg.base"
                    sx={{ flex: '1 1 220px', maxWidth: 360, borderRadius: 8, opacity: 0.95 }}
                  >
                    <Stack space={3}>
                      <Box
                        width={44}
                        height={44}
                        bg="bg.default"
                        sx={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                      >
                        <Icon />
                      </Box>
                      <Text.Subtitle m={0} fontWeight="semibold">{f.title}</Text.Subtitle>
                      <Text.Body m={0} color="fg.muted">{f.description}</Text.Body>
                    </Stack>
                  </Box>
                )
              })}
            </Flex>
          </Flex>
        </Box>
      </Box>

      {/* Extensions */}
      <Box px={6} py={10} maxWidth={1440} mx="auto">
        <Flex flexDirection="column" gap={6}>
          <Text.SectionTitle m={0}>
            Register a domain name from over {EXTENSIONS.length}+ extensions
          </Text.SectionTitle>
          <Flex gap={2} sx={{ flexWrap: 'wrap' }}>
            {EXTENSIONS.map((ext) => (
              <Box
                key={ext}
                px={3}
                py={2}
                bg="bg.default"
                sx={{ borderRadius: 6, cursor: 'pointer' }}
              >
                <Text.Body m={0} fontWeight="semibold">{ext}</Text.Body>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Box>

      <Divider />

      {/* Google Domains */}
      <Box px={6} py={10} bg="bg.inset">
        <Box maxWidth={1440} mx="auto">
          <Flex gap={10} alignItems="flex-start" sx={{ flexWrap: 'wrap' }}>
            <Box sx={{ flex: '0 0 320px', minWidth: 0 }}>
              <Stack space={4}>
                <Text.SectionTitle m={0}>For those coming from Google Domains</Text.SectionTitle>
                <Text.Body m={0} color="fg.muted">
                  If you previously managed domains through Google Domains, Squarespace makes it easy to continue. Your domains transferred seamlessly and your settings are preserved.
                </Text.Body>
                <Stack space={2}>
                  {[
                    'Search ahead, buying experience',
                    'Trusted and reliable registration',
                    'Quick and easy domain migration',
                  ].map((item) => (
                    <Flex key={item} gap={2} alignItems="center">
                      <CheckmarkCircle color="fg.success" sx={{ flexShrink: 0 }} />
                      <Text.Body m={0}>{item}</Text.Body>
                    </Flex>
                  ))}
                </Stack>
                <Box>
                  <Button.Primary size="medium">Migrate now</Button.Primary>
                </Box>
              </Stack>
            </Box>
            <Card px={5} py={5} sx={{ flex: '1 1 360px', minWidth: 0 }}>
              <Stack space={3}>
                <Text.Subtitle m={0} fontWeight="semibold">Find your domain</Text.Subtitle>
                <InlineSearch />
                <Divider />
                <Stack space={2}>
                  {['yourname.com', 'yourname.net', 'yourname.co'].map((domain) => (
                    <Flex key={domain} alignItems="center" justifyContent="space-between">
                      <Text.Body m={0}>{domain}</Text.Body>
                      <Flex gap={2} alignItems="center">
                        <Text.Caption m={0} color="fg.success">Available</Text.Caption>
                        <Button.Secondary size="small">Add</Button.Secondary>
                      </Flex>
                    </Flex>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </Flex>
        </Box>
      </Box>

      {/* How to search */}
      <Box px={6} py={10} maxWidth={1440} mx="auto">
        <Flex gap={10} alignItems="flex-start" sx={{ flexWrap: 'wrap' }}>
          <Text.SectionTitle m={0} sx={{ flex: '0 0 280px' }}>
            How to search for and buy available domain names
          </Text.SectionTitle>
          <Box sx={{ flex: '1 1 360px', minWidth: 0 }}>
            <Stack space={4}>
              {HOW_TO_STEPS.map((step, i) => (
                <Flex key={i} gap={4} alignItems="flex-start">
                  <Box
                    width={28}
                    height={28}
                    bg="bg.strong"
                    sx={{
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Text.Caption m={0} color="fg.onStrong" fontWeight="semibold">
                      {i + 1}
                    </Text.Caption>
                  </Box>
                  <Text.Body m={0} color="fg.muted" sx={{ paddingTop: '4px' }}>
                    {step}
                  </Text.Body>
                </Flex>
              ))}
            </Stack>
          </Box>
        </Flex>
      </Box>

      <Divider />

      {/* FAQ */}
      <Box px={6} py={10} maxWidth={1440} mx="auto">
        <Flex gap={10} alignItems="flex-start" sx={{ flexWrap: 'wrap' }}>
          <Text.SectionTitle m={0} sx={{ flex: '0 0 280px' }}>
            Frequently asked questions
          </Text.SectionTitle>
          <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
            <Accordion>
              {FAQ_ITEMS.map((item, i) => (
                <Accordion.Item key={i}>
                  <Accordion.Header label={item.label} />
                  <Accordion.Body>
                    <Text.Body m={0} color="fg.muted" py={2}>
                      {item.body}
                    </Text.Body>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Box>
        </Flex>
      </Box>

      {/* Footer CTA */}
      <Box bg="bg.strong" px={6} py={10}>
        <Box maxWidth={1440} mx="auto">
          <Flex flexDirection="column" gap={5} alignItems="center" sx={{ textAlign: 'center' }}>
            <Text.SectionTitle m={0} color="fg.onStrong">
              Find the perfect domain for your website
            </Text.SectionTitle>
            <Box sx={{ width: '100%', maxWidth: 600 }}>
              <InlineSearch />
            </Box>
            <Text.Caption m={0} color="gray.600">
              By purchasing a domain you are agreeing to our{' '}
              <Text.Caption as="span" color="gray.500" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                Terms of Service
              </Text.Caption>
            </Text.Caption>
          </Flex>
        </Box>
      </Box>

      {/* Footer */}
      <Box px={6} py={6} borderTop="1px solid" borderColor="border.default">
        <Box maxWidth={1440} mx="auto">
          <Flex justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'wrap' }} gap={4}>
            <Flex alignItems="center" gap={2}>
              <LogoSquarespace />
              <Text.Caption m={0} color="fg.muted">© 2025 Squarespace, Inc.</Text.Caption>
            </Flex>
            <Flex gap={4} sx={{ flexWrap: 'wrap' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Accessibility'].map((link) => (
                <Text.Caption key={link} m={0} color="fg.muted" sx={{ cursor: 'pointer' }}>
                  {link}
                </Text.Caption>
              ))}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

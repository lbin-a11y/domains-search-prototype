import { useState, useEffect, useRef, useId } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Flex, Text, Button, Field } from '@sqs/rosetta-primitives'
import { Card, Stack, TextInput } from '@sqs/rosetta-elements'
import { Dialog } from '@sqs/rosetta-compositions'
import {
  LogoSquarespace,
  Search,
  CheckmarkCircle,
  ArrowRight,
  CrossSmall,
  ChevronSmallDown,
  ChevronSmallUp,
  Checkmark,
  ShoppingBag,
} from '@sqs/rosetta-icons'

// ── Mock data ────────────────────────────────────────────────────────────────

const MOCK_USER = {
  name: "Maya's Ceramics Studio",
  url: 'mayasceramicsstudio.squarespace.com',
  plan: 'Business plan',
  initials: 'MC',
}

const OWNED_DOMAINS = [
  { id: '1', name: 'mayasceramicsstudio.com', renewsAt: 'Jan 12, 2026', price: 18 },
  { id: '2', name: 'myceramics.net', renewsAt: 'Mar 5, 2026', price: 15 },
]

const SETTINGS_NAV = ['Website', 'Domains & Email', 'Selling', 'Permissions & Ownership', 'Billing']

const CHECKOUT_STEPS = ['Review', 'Payment', 'Connect', 'Confirm'] as const
type CheckoutStep = typeof CHECKOUT_STEPS[number]

// ── Nav icon SVGs ─────────────────────────────────────────────────────────────

function IconPages() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="12" height="14" rx="1.5" />
      <line x1="6" y1="6" x2="12" y2="6" />
      <line x1="6" y1="9" x2="12" y2="9" />
      <line x1="6" y1="12" x2="10" y2="12" />
    </svg>
  )
}
function IconDesign() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="6.5" />
      <circle cx="9" cy="9" r="2.5" />
    </svg>
  )
}
function IconCommerce() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 4h1.5l2 7h7l1.5-5h-10" />
      <circle cx="7" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconMarketing() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4.5" width="14" height="9" rx="1.5" />
      <polyline points="2,5 9,10.5 16,5" />
    </svg>
  )
}
function IconAnalytics() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="15" x2="16" y2="15" />
      <rect x="3" y="9" width="3" height="6" rx="0.5" />
      <rect x="7.5" y="6" width="3" height="9" rx="0.5" />
      <rect x="12" y="3" width="3" height="12" rx="0.5" />
    </svg>
  )
}
function IconDomains() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="7" />
      <ellipse cx="9" cy="9" rx="3" ry="7" />
      <line x1="2" y1="9" x2="16" y2="9" />
      <path d="M3.5 5.5 Q9 7 14.5 5.5" />
      <path d="M3.5 12.5 Q9 11 14.5 12.5" />
    </svg>
  )
}
function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="2.5" />
      <path d="M9 2v1.5M9 14.5V16M2 9h1.5M14.5 9H16M4.1 4.1l1.1 1.1M12.8 12.8l1.1 1.1M13.9 4.1l-1.1 1.1M5.2 12.8l-1.1 1.1" />
    </svg>
  )
}

const NAV_ITEMS = [
  { label: 'Pages',     Icon: IconPages },
  { label: 'Design',    Icon: IconDesign },
  { label: 'Commerce',  Icon: IconCommerce },
  { label: 'Marketing', Icon: IconMarketing },
  { label: 'Analytics', Icon: IconAnalytics },
  { label: 'Domains',   Icon: IconDomains },
  { label: 'Settings',  Icon: IconSettings },
]

// ── Domain search helpers ────────────────────────────────────────────────────

const OVERLAY_TLD_CATALOG: Array<{ tld: string; base: number; sale: number | null }> = [
  { tld: '.com',    base: 20, sale: 14 },
  { tld: '.net',    base: 20, sale: 14 },
  { tld: '.org',    base: 20, sale: 9 },
  { tld: '.co',     base: 36, sale: 26 },
  { tld: '.io',     base: 60, sale: 48 },
  { tld: '.me',     base: 26, sale: 18 },
  { tld: '.live',   base: 20, sale: 10 },
  { tld: '.store',  base: 20, sale: 12 },
  { tld: '.studio', base: 28, sale: 22 },
  { tld: '.art',    base: 24, sale: 18 },
  { tld: '.shop',   base: 30, sale: 20 },
  { tld: '.online', base: 20, sale: 8 },
  { tld: '.design', base: 34, sale: 28 },
  { tld: '.agency', base: 28, sale: null },
]

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

interface SearchResult {
  id: string; name: string; tld: string; available: boolean
  price: number; salePrice: number | null; tag: string | null
}

function generateResultsFromQuery(rawQuery: string): SearchResult[] {
  const stem = rawQuery.trim().toLowerCase().replace(/\s+/g, '').replace(/^\./, '').replace(/\.[a-z]+$/, '')
  if (!stem) return []
  const results: SearchResult[] = []
  const exactTld = rawQuery.includes('.') ? '.' + rawQuery.split('.').pop()! : '.com'
  const exactCatalog = OVERLAY_TLD_CATALOG.find((t) => t.tld === exactTld) ?? { tld: exactTld, base: 20, sale: 14 }
  results.push({ id: `${stem}${exactTld}`, name: stem + exactTld, tld: exactTld, available: true, price: exactCatalog.base, salePrice: exactCatalog.sale, tag: 'Best match' })
  for (const cat of OVERLAY_TLD_CATALOG) {
    if (cat.tld === exactTld) continue
    results.push({ id: `${stem}${cat.tld}`, name: stem + cat.tld, tld: cat.tld, available: hashStr(stem + cat.tld) % 4 !== 0, price: cat.base, salePrice: cat.sale, tag: null })
  }
  return results
}

// ── Get New Domain overlay ────────────────────────────────────────────────────

/** Derive a domain-safe stem from the business name */
function businessNameToStem(name: string): string {
  return name
    .toLowerCase()
    .replace(/[''`]/g, '')       // strip apostrophes
    .replace(/[^a-z0-9]+/g, '')  // strip everything non-alphanumeric
}

const DEFAULT_STEM = businessNameToStem(MOCK_USER.name) // "mayasceramicsstudio"

function SearchResultRow({
  result,
  inCart,
  onAdd,
  onRemove,
}: {
  result: SearchResult
  inCart: boolean
  onAdd: (r: SearchResult) => void
  onRemove: (id: string) => void
}) {
  function handleRowClick() {
    if (!result.available) return
    inCart ? onRemove(result.id) : onAdd(result)
  }

  return (
    <Flex
      alignItems="center"
      onClick={handleRowClick}
      sx={{
        minHeight: 66,
        py: '11px',
        borderBottom: '1px solid #ebebeb',
        opacity: result.available ? 1 : 0.38,
        cursor: result.available ? 'pointer' : 'default',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      {/* Domain name */}
      <Text.Body
        m={0}
        sx={{ flex: 1, fontSize: '14px', color: result.available ? '#000' : '#aaa', textDecoration: result.available ? 'none' : 'line-through' }}
      >
        {result.name}
      </Text.Body>

      {/* Right side — differs by cart state */}
      {result.available && (
        inCart ? (
          <Flex alignItems="center" gap={4} sx={{ flexShrink: 0 }}>
            <Text.Caption m={0} sx={{ fontSize: '13px', color: '#000' }}>Added to cart</Text.Caption>
            <Checkmark sx={{ width: 16, height: 16, color: '#000' }} />
          </Flex>
        ) : (
          <Flex alignItems="center" gap={3} sx={{ flexShrink: 0 }}>
            <Flex alignItems="baseline" gap={2}>
              {result.salePrice !== null && (
                <Text.Caption m={0} sx={{ fontSize: '13px', color: '#aaa', textDecoration: 'line-through' }}>
                  ${result.price}
                </Text.Caption>
              )}
              <Text.Body m={0} sx={{ fontSize: '14px', color: '#000' }}>
                ${result.salePrice ?? result.price}
              </Text.Body>
            </Flex>
            <Box
              as="button"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              sx={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', p: '4px', flexShrink: 0, color: '#000', '&:hover': { color: '#555' } }}
            >
              <ShoppingBag sx={{ width: 18, height: 18 }} />
            </Box>
          </Flex>
        )
      )}
    </Flex>
  )
}

function GetNewDomainOverlay({
  cart,
  onAdd,
  onRemove,
  onClose,
  onCheckout,
}: {
  cart: SearchResult[]
  onAdd: (r: SearchResult) => void
  onRemove: (id: string) => void
  onClose: () => void
  onCheckout: () => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>(
    () => generateResultsFromQuery(DEFAULT_STEM)
  )
  const [cartOpen, setCartOpen] = useState(false)
  const cartRef = useRef<HTMLDivElement>(null)
  const labelId = useId()

  useEffect(() => {
    const trimmed = query.trim()
    const stem = trimmed || DEFAULT_STEM
    const timer = setTimeout(() => setResults(generateResultsFromQuery(stem)), trimmed ? 250 : 0)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (!cartOpen) return
    function handleClick(e: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) setCartOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [cartOpen])

  const cartIds = new Set(cart.map((c) => c.id))
  const cartLabel = cart.length === 1 ? '1 DOMAIN' : `${cart.length} DOMAINS`

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
        {/* Header: logo + X, no bottom border */}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          sx={{ height: 88, flexShrink: 0 }}
        >
          <LogoSquarespace />
          <Box
            as="button"
            onClick={onClose}
            sx={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#444', p: '4px', borderRadius: 4, '&:hover': { background: '#f5f5f5' } }}
          >
            <CrossSmall sx={{ width: 20, height: 20 }} />
          </Box>
        </Flex>

        {/* Scrollable body */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: '20%' }}>

          {/* Title row + CHECKOUT — matches content indent */}
          <Flex
            alignItems="center"
            justifyContent="space-between"
            pt={5}
            pb={4}
          >
            <Text.Body m={0} fontWeight="semibold" sx={{ fontSize: '26px' }}>
              Get a New Domain
            </Text.Body>

            <Flex alignItems="center" gap={6}>
              {/* Cart dropdown — only when items in cart */}
              {cart.length > 0 && (
                <Box ref={cartRef} sx={{ position: 'relative' }}>
                  <Flex
                    as="button"
                    alignItems="center"
                    gap={1}
                    onClick={() => setCartOpen((v) => !v)}
                    sx={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      p: 0,
                      '& .cart-label': {
                        backgroundImage: 'linear-gradient(currentColor, currentColor)',
                        backgroundSize: '0% 1px',
                        backgroundPosition: 'right bottom',
                        backgroundRepeat: 'no-repeat',
                        transition: 'background-size 0.28s ease',
                        paddingBottom: '1px',
                      },
                      '&:hover .cart-label': {
                        backgroundSize: '100% 1px',
                        backgroundPosition: 'left bottom',
                      },
                    }}
                  >
                    <Box
                      as="span"
                      className="cart-label"
                      sx={{ fontSize: '14px', fontWeight: 500 }}
                    >
                      {cartLabel}
                    </Box>
                    {cartOpen
                      ? <ChevronSmallUp sx={{ width: 16, height: 16 }} />
                      : <ChevronSmallDown sx={{ width: 16, height: 16 }} />}
                  </Flex>

                  {/* Popover */}
                  {cartOpen && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        right: 0,
                        minWidth: 280,
                        background: '#fff',
                        border: '1px solid #e8e8e8',
                        borderRadius: 6,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                        zIndex: 10,
                        overflow: 'hidden',
                      }}
                    >
                      {cart.map((item) => (
                        <Flex
                          key={item.id}
                          alignItems="center"
                          gap={3}
                          px={4}
                          py={3}
                          sx={{ borderBottom: '1px solid #f0f0f0', '&:last-child': { borderBottom: 'none' } }}
                        >
                          <Box
                            as="button"
                            onClick={() => onRemove(item.id)}
                            sx={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#888', flexShrink: 0, p: 0, '&:hover': { color: '#000' } }}
                          >
                            <CrossSmall sx={{ width: 16, height: 16 }} />
                          </Box>
                          <Text.Body m={0} sx={{ flex: 1, fontSize: '13px', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.name}
                          </Text.Body>
                          <Text.Caption m={0} color="fg.muted" sx={{ fontSize: '13px', flexShrink: 0 }}>
                            ${item.salePrice ?? item.price} / yr
                          </Text.Caption>
                        </Flex>
                      ))}
                    </Box>
                  )}
                </Box>
              )}

              <Button.Primary
                size="medium"
                disabled={cart.length === 0}
                onClick={onCheckout}
              >
                CHECKOUT
              </Button.Primary>
            </Flex>
          </Flex>


          {/* Search bar — same horizontal indent as title and rows */}
          <Flex
            alignItems="center"
            gap={2}
            mb={3}
            px={4}
            sx={{
              border: '1px solid #d8d8d8',
              borderRadius: 6,
              height: 44,
              background: '#f5f5f5',
              '&:focus-within': { borderColor: '#999', background: '#fff' },
              transition: 'border-color 0.15s, background 0.15s',
            }}
          >
            <Search color="fg.muted" sx={{ flexShrink: 0, width: 16, height: 16 }} />
            <Field.Root name="overlay-domain-search" sx={{ flex: 1, minWidth: 0 }}>
              <label id={labelId} style={{ display: 'none' }}>Search for your domain</label>
              <TextInput
                aria-labelledby={labelId}
                placeholder="Search for your domain"
                value={query}
                onChange={(v: string) => setQuery(v)}
                sx={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '14px', padding: 0, color: 'fg.default' }}
              />
            </Field.Root>
          </Flex>

          {/* Results */}
          <Box>
            {results.map((r) => (
              <SearchResultRow key={r.id} result={r} inCart={cartIds.has(r.id)} onAdd={onAdd} onRemove={onRemove} />
            ))}
          </Box>

        </Box>
    </Box>
  )
}

// ── Checkout dialog ───────────────────────────────────────────────────────────

function CheckoutDialog({ isOpen, cart, onClose, onComplete }: { isOpen: boolean; cart: SearchResult[]; onClose: () => void; onComplete: () => void }) {
  const [step, setStep] = useState<CheckoutStep>('Review')
  const [selectedSite, setSelectedSite] = useState(false)
  const total = cart.reduce((sum, r) => sum + (r.salePrice ?? r.price), 0)

  function advance() {
    const idx = CHECKOUT_STEPS.indexOf(step)
    if (idx < CHECKOUT_STEPS.length - 1) setStep(CHECKOUT_STEPS[idx + 1])
  }
  function reset() { setStep('Review'); setSelectedSite(false); onClose() }
  const stepIdx = CHECKOUT_STEPS.indexOf(step)

  return (
    <Dialog.Transition>
      {isOpen && (
        <Dialog.Modal onRequestClose={step === 'Confirm' ? onComplete : reset}>
          <Dialog.Overlay />
          <Dialog size="medium">
            {step !== 'Confirm' && (
              <Dialog.Header>
                <Dialog.Header.Title m={0}>Checkout</Dialog.Header.Title>
                <Dialog.CloseButton onClick={reset} />
              </Dialog.Header>
            )}
            <Dialog.Content>
              {step !== 'Confirm' && (
                <Flex gap={2} alignItems="center" mb={6}>
                  {CHECKOUT_STEPS.map((s, i) => {
                    const done = i < stepIdx; const current = s === step
                    return (
                      <Flex key={s} alignItems="center" gap={2}>
                        <Box sx={{ width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? 'var(--colors-fg-success)' : current ? 'var(--colors-fg-default)' : 'var(--colors-bg-strong)', flexShrink: 0 }}>
                          {done ? <Checkmark color="fg.onStrong" sx={{ width: 12, height: 12 }} /> : <Text.Caption m={0} sx={{ color: 'var(--colors-fg-onStrong)', fontSize: '10px', fontWeight: 600 }}>{i + 1}</Text.Caption>}
                        </Box>
                        <Text.Caption m={0} fontWeight={current ? 'semibold' : 'book'} color={current ? 'fg.default' : 'fg.muted'}>{s}</Text.Caption>
                        {i < CHECKOUT_STEPS.length - 1 && <Box sx={{ width: 24, height: 1, background: 'var(--colors-border-default)', mx: 1 }} />}
                      </Flex>
                    )
                  })}
                </Flex>
              )}
              {step === 'Review' && (
                <Stack space={4}>
                  <Text.Subtitle m={0} fontWeight="semibold">Review your order</Text.Subtitle>
                  <Card px={0} py={0} sx={{ overflow: 'hidden' }}>
                    {cart.map((item, i) => (
                      <Flex key={item.id} alignItems="center" justifyContent="space-between" px={4} py={3} borderBottom={i < cart.length - 1 ? '1px solid' : undefined} borderColor="border.default">
                        <Box><Text.Body m={0} fontWeight="semibold">{item.name}</Text.Body><Text.Caption m={0} color="fg.muted">1 year · WHOIS privacy included</Text.Caption></Box>
                        <Text.Body m={0} fontWeight="semibold">${item.salePrice ?? item.price}</Text.Body>
                      </Flex>
                    ))}
                    <Flex alignItems="center" justifyContent="space-between" px={4} py={3} bg="bg.inset">
                      <Text.Body m={0} fontWeight="semibold">Total</Text.Body>
                      <Text.Body m={0} fontWeight="semibold">${total}/yr</Text.Body>
                    </Flex>
                  </Card>
                </Stack>
              )}
              {step === 'Payment' && (
                <Stack space={4}>
                  <Text.Subtitle m={0} fontWeight="semibold">Payment method</Text.Subtitle>
                  <Card px={4} py={4}>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Box><Text.Body m={0} fontWeight="semibold">Visa ···· 4242</Text.Body><Text.Caption m={0} color="fg.muted">Expires 09/2027</Text.Caption></Box>
                      <Box px={3} py={1} sx={{ border: '1px solid var(--colors-border-default)', borderRadius: 4 }}><Text.Caption m={0} fontWeight="semibold" sx={{ letterSpacing: '0.06em' }}>VISA</Text.Caption></Box>
                    </Flex>
                  </Card>
                  <Text.Caption m={0} color="fg.muted">You'll be charged ${total}/yr. Renews automatically — cancel any time.</Text.Caption>
                </Stack>
              )}
              {step === 'Connect' && (
                <Stack space={4}>
                  <Text.Subtitle m={0} fontWeight="semibold">Connect to your website</Text.Subtitle>
                  <Text.Body m={0} color="fg.muted">Choose a Squarespace site to connect your new domain to.</Text.Body>
                  <Box as="button" onClick={() => setSelectedSite(true)} px={4} py={4} sx={{ border: '1px solid', borderColor: selectedSite ? 'border.strong' : 'border.default', borderRadius: 6, cursor: 'pointer', background: 'transparent', width: '100%', textAlign: 'left', outline: selectedSite ? '2px solid var(--colors-border-strong)' : 'none', outlineOffset: 2 }}>
                    <Flex alignItems="center" gap={3}>
                      <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid', borderColor: selectedSite ? 'border.strong' : 'border.default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {selectedSite && <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--colors-fg-default)' }} />}
                      </Box>
                      <Box>
                        <Text.Body m={0} fontWeight="semibold">{MOCK_USER.name}</Text.Body>
                        <Text.Caption m={0} color="fg.muted">{MOCK_USER.url}</Text.Caption>
                      </Box>
                    </Flex>
                  </Box>
                  <Text.Caption m={0} color="fg.muted" sx={{ cursor: 'pointer', textDecoration: 'underline' }}>Skip for now</Text.Caption>
                </Stack>
              )}
              {step === 'Confirm' && (
                <Flex flexDirection="column" alignItems="center" gap={4} py={4} sx={{ textAlign: 'center' }}>
                  <Box sx={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--colors-bg-success-default)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckmarkCircle color="fg.success" sx={{ width: 28, height: 28 }} />
                  </Box>
                  <Box><Text.Title m={0} fontWeight="semibold">You're all set!</Text.Title><Text.Caption m={0} color="fg.muted" sx={{ mt: 1 }}>Order SQ-{Date.now().toString().slice(-6)}</Text.Caption></Box>
                  <Flex gap={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                    {cart.map((item) => (<Box key={item.id} px={3} py={1} bg="bg.inset" sx={{ borderRadius: 4 }}><Text.Caption m={0} fontWeight="semibold">{item.name}</Text.Caption></Box>))}
                  </Flex>
                  <Text.Body m={0} color="fg.muted">Charged ${total}/yr · DNS propagation may take up to 48 hours.</Text.Body>
                </Flex>
              )}
            </Dialog.Content>
            <Dialog.Footer justifyContent="end">
              {step === 'Review' && <Button.Primary size="medium" onClick={advance}>Continue to payment →</Button.Primary>}
              {step === 'Payment' && <Button.Primary size="medium" onClick={advance}>Continue to connect →</Button.Primary>}
              {step === 'Connect' && <Flex gap={3} alignItems="center"><Button.Primary size="medium" onClick={advance}>Complete purchase →</Button.Primary><Button.Secondary size="medium" onClick={reset}>Cancel</Button.Secondary></Flex>}
              {step === 'Confirm' && <Button.Primary size="medium" onClick={onComplete}>Done</Button.Primary>}
            </Dialog.Footer>
          </Dialog>
        </Dialog.Modal>
      )}
    </Dialog.Transition>
  )
}

// ── Full-page settings modal ──────────────────────────────────────────────────

function SettingsModal({
  onClose,
  onGetDomain,
}: {
  onClose: () => void
  onGetDomain: () => void
}) {
  return (
    <>
      {/* Scrim — darkens the dashboard behind the modal */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'rgba(0,0,0,0.45)',
          pointerEvents: 'none',
        }}
      />

      {/* Modal panel */}
      <Box
        sx={{
          position: 'fixed',
          top: '56px',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
      {/* Header */}
      <Flex
        alignItems="center"
        justifyContent="space-between"
        px={5}
        sx={{ height: 52, borderBottom: '1px solid #e8e8e8', flexShrink: 0 }}
      >
        <Text.Body m={0} fontWeight="semibold" sx={{ fontSize: '15px' }}>
          Settings
        </Text.Body>
        <Flex alignItems="center" gap={1}>
          <Box
            as="button"
            sx={{ background: 'none', border: 'none', cursor: 'pointer', p: '6px', borderRadius: 4, display: 'flex', alignItems: 'center', color: '#666', '&:hover': { background: '#f5f5f5' } }}
          >
            <Search sx={{ width: 17, height: 17 }} />
          </Box>
          <Box
            as="button"
            onClick={onClose}
            sx={{ background: 'none', border: 'none', cursor: 'pointer', p: '6px', borderRadius: 4, display: 'flex', alignItems: 'center', color: '#666', '&:hover': { background: '#f5f5f5' } }}
          >
            <CrossSmall sx={{ width: 17, height: 17 }} />
          </Box>
        </Flex>
      </Flex>

      {/* Body */}
      <Flex sx={{ flex: 1, overflow: 'hidden' }}>

        {/* Left nav */}
        <Box
          sx={{
            width: 220,
            borderRight: '1px solid #e8e8e8',
            flexShrink: 0,
            pt: 3,
            pb: 3,
            overflowY: 'auto',
          }}
        >
          {SETTINGS_NAV.map((item) => {
            const active = item === 'Domains & Email'
            return (
              <Box
                key={item}
                as="button"
                sx={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  px: 5,
                  py: '9px',
                  cursor: 'pointer',
                  '&:hover': { background: '#f7f7f7' },
                }}
              >
                <Text.Body
                  m={0}
                  sx={{
                    fontSize: '13px',
                    fontWeight: active ? 700 : 400,
                    color: active ? '#000' : '#444',
                    borderBottom: active ? '1.5px solid #000' : 'none',
                    display: 'inline',
                    paddingBottom: active ? '1px' : 0,
                  }}
                >
                  {item}
                </Text.Body>
              </Box>
            )
          })}
        </Box>

        {/* Main content */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: 8, pt: 6, pb: 10 }}>

          {/* Breadcrumb */}
          <Flex alignItems="center" gap={1} mb={3}>
            <Text.Caption m={0} sx={{ fontSize: '12px', color: '#000', textDecoration: 'underline', cursor: 'pointer', textUnderlineOffset: '2px' }}>
              Domains &amp; Email
            </Text.Caption>
            <Text.Caption m={0} color="fg.muted" sx={{ fontSize: '12px' }}>/</Text.Caption>
            <Text.Caption m={0} color="fg.muted" sx={{ fontSize: '12px' }}>Domains</Text.Caption>
          </Flex>

          {/* Title */}
          <Text.Body m={0} fontWeight="semibold" sx={{ fontSize: '22px', mb: 2 }}>
            Domains
          </Text.Body>

          {/* Subtitle */}
          <Text.Body m={0} color="fg.muted" sx={{ fontSize: '13px', mb: 5 }}>
            Buy, connect, and manage domains associated with your website.{' '}
            <Box as="span" sx={{ color: '#000', textDecoration: 'underline', cursor: 'pointer', textUnderlineOffset: '2px' }}>
              Learn more
            </Box>
          </Text.Body>

          {/* CTAs */}
          <Flex gap={3} mb={6}>
            <Box
              as="button"
              onClick={onGetDomain}
              sx={{
                background: '#000',
                color: '#fff',
                border: 'none',
                px: 4,
                height: 36,
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                '&:hover': { background: '#222' },
                transition: 'background 0.12s',
              }}
            >
              GET A DOMAIN
            </Box>
            <Box
              as="button"
              sx={{
                background: 'none',
                color: '#000',
                border: '1px solid #ccc',
                px: 4,
                height: 36,
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.04em',
                '&:hover': { borderColor: '#888' },
                transition: 'border-color 0.12s',
              }}
            >
              USE A DOMAIN I OWN
            </Box>
          </Flex>

          {/* Built-in domain */}
          <Text.Caption m={0} sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', mb: 2, display: 'block' }}>
            Built-in Domain
          </Text.Caption>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            py={4}
            sx={{ borderBottom: '1px solid #e8e8e8', cursor: 'pointer', '&:hover': { background: '#fafafa' }, px: 1, mx: -1 }}
          >
            <Box>
              <Text.Body m={0} sx={{ fontSize: '14px' }}>{MOCK_USER.url}</Text.Body>
              <Text.Caption m={0} color="fg.muted" sx={{ fontSize: '12px', mt: '2px' }}>Never Expires</Text.Caption>
            </Box>
            <ArrowRight color="fg.muted" sx={{ width: 16, height: 16, flexShrink: 0 }} />
          </Flex>

          {/* Owned domains */}
          {OWNED_DOMAINS.length > 0 && (
            <Box mt={5}>
              <Text.Caption m={0} sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', mb: 2, display: 'block' }}>
                Your Domains
              </Text.Caption>
              {OWNED_DOMAINS.map((domain) => (
                <Flex
                  key={domain.id}
                  alignItems="center"
                  justifyContent="space-between"
                  py={4}
                  sx={{ borderBottom: '1px solid #e8e8e8', cursor: 'pointer', '&:hover': { background: '#fafafa' }, px: 1, mx: -1 }}
                >
                  <Box>
                    <Text.Body m={0} sx={{ fontSize: '14px' }}>{domain.name}</Text.Body>
                    <Text.Caption m={0} color="fg.muted" sx={{ fontSize: '12px', mt: '2px' }}>
                      Renews {domain.renewsAt} · ${domain.price}/yr
                    </Text.Caption>
                  </Box>
                  <ArrowRight color="fg.muted" sx={{ width: 16, height: 16, flexShrink: 0 }} />
                </Flex>
              ))}
            </Box>
          )}

        </Box>
      </Flex>
    </Box>
    </>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const view = searchParams.get('view') ?? 'settings'

  const [cart, setCart] = useState<SearchResult[]>([])
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  function goTo(v: string) {
    if (v === 'settings') navigate('/dashboard', { replace: false })
    else navigate(`/dashboard?view=${v}`, { replace: false })
  }

  function addToCart(result: SearchResult) {
    setCart((prev) => prev.find((r) => r.id === result.id) ? prev : [...prev, result])
  }
  function removeFromCart(id: string) { setCart((prev) => prev.filter((r) => r.id !== id)) }
  function handleCheckoutComplete() { setCheckoutOpen(false); setCart([]); goTo('settings') }

  return (
    <Box sx={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>

      {/* ── Top bar ── */}
      <Flex
        alignItems="center"
        px={4}
        gap={3}
        sx={{ height: 56, borderBottom: '1px solid #e8e8e8', flexShrink: 0 }}
      >
        <Box sx={{ width: 28, height: 28, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <LogoSquarespace sx={{ width: 28, height: 28 }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Text.Body m={0} fontWeight="semibold" sx={{ fontSize: '13px', lineHeight: 1.3 }}>
            {MOCK_USER.name}
          </Text.Body>
          <Text.Caption m={0} color="fg.muted" sx={{ fontSize: '11px', lineHeight: 1.3 }}>
            {MOCK_USER.url}
          </Text.Caption>
        </Box>
        <Flex alignItems="center" gap={3} sx={{ flexShrink: 0 }}>
          <Text.Body m={0} sx={{ fontSize: '13px', color: '#444' }}>{MOCK_USER.plan}</Text.Body>
          <Box sx={{ width: 32, height: 32, borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Text.Caption m={0} sx={{ color: '#fff', fontSize: '11px', fontWeight: 700, lineHeight: 1 }}>{MOCK_USER.initials}</Text.Caption>
          </Box>
        </Flex>
      </Flex>

      {/* ── Dashboard body ── */}
      <Flex sx={{ flex: 1, overflow: 'hidden' }}>

        {/* Left nav */}
        <Box sx={{ width: 190, borderRight: '1px solid #e8e8e8', flexShrink: 0, py: 2, overflowY: 'auto' }}>
          {NAV_ITEMS.map(({ label, Icon }) => {
            const active = label === 'Domains'
            return (
              <Flex
                key={label}
                as="button"
                alignItems="center"
                gap={3}
                px={4}
                sx={{
                  width: '100%',
                  height: 40,
                  background: 'none',
                  border: 'none',
                  borderRight: active ? '3px solid #000' : '3px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: active ? '#000' : '#555',
                  transition: 'background 0.12s',
                  '&:hover': { background: '#f5f5f5' },
                }}
              >
                <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  <Icon />
                </Box>
                <Text.Body m={0} sx={{ fontSize: '13px', fontWeight: active ? 600 : 400, color: 'inherit' }}>
                  {label}
                </Text.Body>
              </Flex>
            )
          })}
        </Box>

        {/* Main content */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: 8, pt: 7, pb: 10, minWidth: 0 }}>
          <Text.Body m={0} fontWeight="semibold" sx={{ fontSize: '26px', mb: 5 }}>Domains</Text.Body>

          <Text.Caption m={0} sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', mb: 2, display: 'block' }}>
            Your Domains
          </Text.Caption>

          <Box sx={{ border: '1px solid #e8e8e8', borderRadius: 8, overflow: 'hidden', mb: 5 }}>
            {OWNED_DOMAINS.map((domain, i) => (
              <Flex
                key={domain.id}
                alignItems="center"
                gap={4}
                px={5}
                py={4}
                sx={{ borderBottom: i < OWNED_DOMAINS.length - 1 ? '1px solid #e8e8e8' : 'none', background: '#fff', '&:hover': { background: '#fafafa' }, transition: 'background 0.12s' }}
              >
                <Flex alignItems="center" gap={2} sx={{ flex: 1, minWidth: 0 }}>
                  <Text.Body m={0} fontWeight="semibold" sx={{ fontSize: '14px' }}>{domain.name}</Text.Body>
                  <Box sx={{ px: '7px', py: '2px', border: '1px solid #2d8f4e', borderRadius: 4, flexShrink: 0 }}>
                    <Text.Caption m={0} sx={{ fontSize: '11px', color: '#2d8f4e', fontWeight: 500, lineHeight: 1.4 }}>Active</Text.Caption>
                  </Box>
                </Flex>
                <Text.Caption m={0} color="fg.muted" sx={{ fontSize: '13px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                  Renews {domain.renewsAt} · ${domain.price}/yr
                </Text.Caption>
                <Box as="button" sx={{ background: 'none', border: '1px solid #ccc', borderRadius: 4, px: '14px', height: 32, cursor: 'pointer', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', color: '#000', flexShrink: 0, '&:hover': { borderColor: '#888', background: '#f5f5f5' }, transition: 'border-color 0.12s, background 0.12s' }}>
                  MANAGE
                </Box>
              </Flex>
            ))}
          </Box>

          <Box sx={{ borderBottom: '1px solid #e8e8e8', mb: 5 }} />

          <Flex gap={3}>
            <Box as="button" onClick={() => goTo('search')} sx={{ background: '#000', color: '#fff', border: 'none', px: 5, height: 40, borderRadius: 4, cursor: 'pointer', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', '&:hover': { background: '#222' }, transition: 'background 0.12s' }}>
              GET A DOMAIN
            </Box>
            <Box as="button" sx={{ background: 'none', color: '#000', border: '1px solid #ccc', px: 5, height: 40, borderRadius: 4, cursor: 'pointer', fontSize: '12px', fontWeight: 500, letterSpacing: '0.04em', '&:hover': { borderColor: '#888' }, transition: 'border-color 0.12s' }}>
              USE A DOMAIN I OWN
            </Box>
          </Flex>
        </Box>

        {/* Right cart */}
        <Box sx={{ width: 215, borderLeft: '1px solid #e8e8e8', flexShrink: 0, px: 5, pt: 5 }}>
          <Text.Caption m={0} sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', mb: 3, display: 'block' }}>
            Cart
          </Text.Caption>
          {cart.length === 0 ? (
            <Text.Body m={0} color="fg.muted" sx={{ fontSize: '13px' }}>Add domains to get started.</Text.Body>
          ) : (
            <Box>
              {cart.map((item) => (
                <Flex key={item.id} alignItems="center" justifyContent="space-between" mb={2} gap={2}>
                  <Box sx={{ minWidth: 0 }}>
                    <Text.Caption m={0} fontWeight="semibold" sx={{ fontSize: '12px', wordBreak: 'break-all' }}>{item.name}</Text.Caption>
                    <Text.Caption m={0} color="fg.muted" sx={{ fontSize: '11px' }}>${item.salePrice ?? item.price}/yr</Text.Caption>
                  </Box>
                  <Box as="button" onClick={() => removeFromCart(item.id)} sx={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--colors-fg-muted)', flexShrink: 0, display: 'flex', alignItems: 'center', p: '2px', '&:hover': { color: 'var(--colors-fg-default)' } }}>
                    <CrossSmall sx={{ width: 14, height: 14 }} />
                  </Box>
                </Flex>
              ))}
              <Box as="button" onClick={() => setCheckoutOpen(true)} sx={{ mt: 3, width: '100%', background: '#000', color: '#fff', border: 'none', borderRadius: 4, height: 36, cursor: 'pointer', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', '&:hover': { background: '#222' } }}>
                CHECKOUT
              </Box>
            </Box>
          )}
        </Box>

      </Flex>

      {/* ── Bottom bar ── */}
      <Flex alignItems="center" justifyContent="space-between" px={4} sx={{ height: 40, borderTop: '1px solid #e8e8e8', flexShrink: 0, background: '#fff' }}>
        <Text.Caption m={0} color="fg.muted" sx={{ fontSize: '12px', cursor: 'pointer', '&:hover': { color: 'fg.default' } }}>
          View session logs
        </Text.Caption>
        <ChevronSmallUp sx={{ width: 14, height: 14, color: 'var(--colors-fg-muted)' }} />
      </Flex>

      {/* ── Settings modal (default) ── */}
      {view === 'settings' && (
        <SettingsModal
          onClose={() => goTo('settings')}
          onGetDomain={() => goTo('search')}
        />
      )}

      {/* ── Get New Domain search modal ── */}
      {view === 'search' && (
        <GetNewDomainOverlay
          cart={cart}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onClose={() => navigate(-1)}
          onCheckout={() => setCheckoutOpen(true)}
        />
      )}

      <CheckoutDialog
        isOpen={checkoutOpen}
        cart={cart}
        onClose={() => setCheckoutOpen(false)}
        onComplete={handleCheckoutComplete}
      />
    </Box>
  )
}

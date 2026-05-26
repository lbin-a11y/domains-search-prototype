import { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Box, Flex, Text, Button } from '@sqs/rosetta-primitives'
import { Global, Trash, ChevronSmallDown } from '@sqs/rosetta-icons'

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

function DomainCard({
  item,
  onRemove,
}: {
  item: DomainResult
  onRemove: (id: string) => void
}) {
  const price = item.salePrice ?? item.originalPrice
  const discountPct =
    item.salePrice !== null
      ? Math.round((1 - item.salePrice / item.originalPrice) * 100)
      : null
  const renewalPrice = item.originalPrice

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: '6px',
        overflow: 'hidden',
        display: 'flex',
        flexShrink: 0,
        width: '100%',
      }}
    >
      {/* Thumbnail placeholder */}
      <Box
        sx={{
          width: 117,
          minHeight: 179,
          flexShrink: 0,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(196,196,196,0.15)',
            backdropFilter: 'blur(5.5px)',
          }}
        />
        <Global
          sx={{
            width: 28,
            height: 28,
            color: 'rgba(255,255,255,0.8)',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ flex: '1 0 0', minWidth: 0, overflow: 'hidden', px: 6 }}>
        <Box sx={{ height: 22 }} />

        {/* Domain name + discount badge */}
        <Flex alignItems="flex-start" justifyContent="space-between" sx={{ gap: 3 }}>
          <Text.Body
            m={0}
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              color: 'fg.default',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {item.name}
          </Text.Body>
          {discountPct !== null && (
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'var(--colors-accent-fg, #0862d1)',
                borderRadius: '3px',
                px: '8px',
                py: '5px',
                flexShrink: 0,
              }}
            >
              <Text.Body
                m={0}
                sx={{
                  fontSize: '9.75px',
                  fontWeight: 600,
                  color: 'var(--colors-accent-fg, #0862d1)',
                  letterSpacing: '0.075em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {discountPct}% off first year
              </Text.Body>
            </Box>
          )}
        </Flex>

        <Box sx={{ height: 22 }} />

        {/* Term dropdown (static) */}
        <Box
          sx={{
            background: 'var(--colors-canvas-subtle, #f2f2f2)',
            px: '11px',
            py: '11px',
            width: '100%',
          }}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Text.Body m={0} sx={{ fontSize: '14px', color: 'fg.default' }}>
              1 year
            </Text.Body>
            <Flex alignItems="center" gap={2}>
              {item.salePrice !== null && (
                <Text.Body
                  m={0}
                  sx={{
                    fontSize: '14px',
                    color: 'fg.muted',
                    textDecoration: 'line-through',
                  }}
                >
                  ${item.originalPrice}
                </Text.Body>
              )}
              <Text.Body m={0} sx={{ fontSize: '14px', fontWeight: 500, color: 'fg.default' }}>
                ${price}
              </Text.Body>
              <ChevronSmallDown sx={{ width: 22, height: 22, color: 'fg.default' }} />
            </Flex>
          </Flex>
        </Box>

        <Box sx={{ height: 16 }} />

        {/* Renewal info + trash */}
        <Flex alignItems="flex-start" justifyContent="space-between" sx={{ gap: 3 }}>
          <Text.Body
            m={0}
            sx={{ fontSize: '12px', color: 'fg.muted', lineHeight: '16px' }}
          >
            Renews annually at ${renewalPrice}.00 + taxes
          </Text.Body>
          <Box
            as="button"
            onClick={() => onRemove(item.id)}
            sx={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              color: 'fg.muted',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              '&:hover': { color: 'fg.default' },
            }}
          >
            <Trash sx={{ width: 16, height: 16 }} />
          </Box>
        </Flex>

        <Box sx={{ height: 27 }} />
      </Box>
    </Box>
  )
}

export default function Cart() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as { items?: DomainResult[] } | null
  const initialItems: DomainResult[] = state?.items ?? []

  const [items, setItems] = useState<DomainResult[]>(initialItems)

  if (initialItems.length === 0) {
    return <Navigate to="/domain-search" replace />
  }

  const subtotal = items.reduce((sum, r) => sum + (r.salePrice ?? r.originalPrice), 0)

  const removeItem = (id: string) => {
    const next = items.filter((i) => i.id !== id)
    if (next.length === 0) {
      navigate('/domain-search', { replace: true })
    } else {
      setItems(next)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'canvas.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 6,
        py: 8,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 543 }}>
        {/* Title */}
        <Text.Body m={0} sx={{ fontSize: '28px', fontWeight: 500, lineHeight: '32px', letterSpacing: '0.02em' }}>
          Cart Overview
        </Text.Body>

        <Box sx={{ height: 44 }} />

        {/* Section header: domain count + subtotal */}
        <Flex alignItems="center" justifyContent="space-between">
          <Text.Body m={0} sx={{ fontSize: '14px', color: 'fg.default' }}>
            Domain ({items.length})
          </Text.Body>
          <Text.Body m={0} sx={{ fontSize: '14px', fontWeight: 500, color: 'fg.default' }}>
            ${subtotal}.00
          </Text.Body>
        </Flex>

        <Box sx={{ height: 16 }} />

        {/* Domain cards */}
        <Flex flexDirection="column" sx={{ gap: 4 }}>
          {items.map((item) => (
            <DomainCard key={item.id} item={item} onRemove={removeItem} />
          ))}
        </Flex>

        <Box sx={{ height: 49 }} />

        {/* CTA */}
        <Button.Primary
          sx={{
            width: '100%',
            height: 55,
            borderRadius: 0,
            fontSize: '12px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Continue to checkout
        </Button.Primary>

        <Box sx={{ height: 55 }} />
      </Box>
    </Box>
  )
}

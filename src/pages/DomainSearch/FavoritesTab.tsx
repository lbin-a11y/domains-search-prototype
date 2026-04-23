import { useState } from 'react'
import { Box, Flex, Text } from '@sqs/rosetta-primitives'
import { HeartFilled, ShoppingBag, Checkmark } from '@sqs/rosetta-icons'
import type { FavoritedDomain } from '../../context/AppContext'

const SPARK_ANGLES = [0, 60, 120, 180, 240, 300]
const SPARK_DIST = 18

function FavoriteRow({
  domain,
  inCart,
  onToggleCart,
  onRemoveFavorite,
}: {
  domain: FavoritedDomain
  inCart: boolean
  onToggleCart: (id: string) => void
  onRemoveFavorite: (id: string) => void
}) {
  const [heartPhase, setHeartPhase] = useState<'idle' | 'burst' | 'fade'>('idle')

  function triggerHeartAnim() {
    setHeartPhase('burst')
    window.setTimeout(() => setHeartPhase('fade'), 180)
    window.setTimeout(() => setHeartPhase('idle'), 430)
  }

  function handleRemove() {
    triggerHeartAnim()
    window.setTimeout(() => onRemoveFavorite(domain.id), 430)
  }

  function sparkStyle(angle: number): React.CSSProperties {
    const rad = (angle * Math.PI) / 180
    const tx = Math.cos(rad) * SPARK_DIST
    const ty = Math.sin(rad) * SPARK_DIST
    const bTx = heartPhase === 'burst' ? tx * 0.6 : heartPhase === 'fade' ? tx : 0
    const bTy = heartPhase === 'burst' ? ty * 0.6 : heartPhase === 'fade' ? ty : 0
    const scale = heartPhase === 'idle' ? 0 : heartPhase === 'burst' ? 1 : 0.3
    const opacity = heartPhase === 'idle' ? 0 : heartPhase === 'burst' ? 1 : 0
    const transition = heartPhase === 'burst'
      ? 'transform 0.18s cubic-bezier(0.2,0,0.1,1), opacity 0.18s ease'
      : heartPhase === 'fade'
      ? 'transform 0.22s ease-in, opacity 0.2s ease-in'
      : 'none'
    return {
      transform: `translate(calc(-50% + ${bTx}px), calc(-50% + ${bTy}px)) scale(${scale})`,
      opacity,
      transition,
    }
  }

  return (
    <Flex
      alignItems="center"
      gap={3}
      px={4}
      py={3}
      sx={{
        minHeight: 44,
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'background 0.15s ease, transform 0.15s ease',
        '&:hover': {
          background: 'var(--colors-bg-default)',
          transform: 'translateX(4px)',
        },
      }}
    >
      {/* Domain name */}
      <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
        <Text.Body
          m={0}
          sx={{ color: 'fg.default', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {domain.name}
        </Text.Body>
      </Box>

      {/* Heart (filled, black) — click removes from favorites with burst animation */}
      <Box sx={{ position: 'relative', overflow: 'visible', flexShrink: 0 }}>
        {SPARK_ANGLES.map((angle) => (
          <Box
            key={angle}
            style={sparkStyle(angle)}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'var(--colors-fg-default)',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />
        ))}
        <Box
          as="button"
          onClick={handleRemove}
          aria-label="Remove from favorites"
          style={{
            transform: heartPhase === 'burst' ? 'scale(1.35)' : 'scale(1)',
            transition: heartPhase === 'burst' ? 'transform 0.12s ease-out' : 'transform 0.2s ease-in',
          }}
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
            '&:hover': { background: 'var(--colors-bg-default)' },
          }}
        >
          <HeartFilled sx={{ width: 16, height: 16, color: 'var(--colors-fg-default)' }} />
        </Box>
      </Box>

      {/* Price — fixed width to align with search results */}
      <Flex alignItems="center" gap={2} sx={{ flexShrink: 0, width: '82px', justifyContent: 'flex-end' }}>
        {domain.salePrice !== null ? (
          <>
            <Text.Caption m={0} color="fg.disabled" sx={{ textDecoration: 'line-through', fontSize: '13px' }}>
              ${domain.originalPrice}
            </Text.Caption>
            <Text.Body m={0}>${domain.salePrice}</Text.Body>
          </>
        ) : (
          <Text.Body m={0}>${domain.originalPrice}</Text.Body>
        )}
      </Flex>

      {/* Cart button — rightmost */}
      <Box
        as="button"
        onClick={() => onToggleCart(domain.id)}
        aria-label={inCart ? 'Remove from cart' : 'Add to cart'}
        sx={{
          border: 'none', cursor: 'pointer', width: 36, height: 36, borderRadius: 8,
          position: 'relative', flexShrink: 0,
          background: inCart ? 'var(--colors-fg-default)' : 'transparent',
          transition: 'background 0.25s ease',
          '&:hover': { background: inCart ? '#333' : 'var(--colors-bg-default)' },
        }}
      >
        <Box sx={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: inCart ? 0 : 1,
          transform: inCart ? 'scale(0.4) rotate(-15deg)' : 'scale(1) rotate(0deg)',
          transition: 'opacity 0.2s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <ShoppingBag sx={{ width: 18, height: 18, color: 'var(--colors-fg-muted)' }} />
        </Box>
        <Box sx={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: inCart ? 1 : 0,
          transform: inCart ? 'scale(1) rotate(0deg)' : 'scale(0.4) rotate(15deg)',
          transition: 'opacity 0.2s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <Checkmark sx={{ width: 16, height: 16, color: '#ffffff' }} />
        </Box>
      </Box>
    </Flex>
  )
}

interface FavoritesTabProps {
  favorites: Map<string, FavoritedDomain>
  cart: Set<string>
  onToggleCart: (id: string) => void
  onRemoveFavorite: (id: string) => void
}

export default function FavoritesTab({ favorites, cart, onToggleCart, onRemoveFavorite }: FavoritesTabProps) {
  const items = Array.from(favorites.values())

  if (items.length === 0) {
    return (
      <Flex justifyContent="center" alignItems="center" sx={{ minHeight: 200 }}>
        <Text.Body m={0} color="fg.muted">Saved domains appear here.</Text.Body>
      </Flex>
    )
  }

  return (
    <Box>
      {items.map((domain) => (
        <FavoriteRow
          key={domain.id}
          domain={domain}
          inCart={cart.has(domain.id)}
          onToggleCart={onToggleCart}
          onRemoveFavorite={onRemoveFavorite}
        />
      ))}
    </Box>
  )
}

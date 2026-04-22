import { Box, Flex, Text } from '@sqs/rosetta-primitives'
import { Heart, ShoppingBag, Checkmark } from '@sqs/rosetta-icons'
import type { FavoritedDomain } from '../../context/AppContext'

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
        <Text.Body m={0} color="fg.muted">Domains you save appear here.</Text.Body>
      </Flex>
    )
  }

  return (
    <Box>
      {items.map((domain, i) => {
        const inCart = cart.has(domain.id)
        return (
          <Flex
            key={domain.id}
            alignItems="center"
            gap={3}
            px={4}
            py={3}
            sx={{
              minHeight: 44,
              ...(i === 0 ? {
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: 8,
                mb: 2,
              } : {
                borderRadius: 8,
                transition: 'background 0.15s ease',
                '&:hover': { background: 'var(--colors-bg-default)' },
              }),
            }}
          >
            {/* Domain name */}
            <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
              <Text.Body m={0} sx={{ color: 'fg.default', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {domain.name}
              </Text.Body>
            </Box>

            {/* Price */}
            <Flex alignItems="center" gap={2} sx={{ flexShrink: 0 }}>
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

            {/* Add to cart */}
            <Box
              as="button"
              onClick={() => onToggleCart(domain.id)}
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

            {/* Remove from favorites */}
            <Box
              as="button"
              onClick={() => onRemoveFavorite(domain.id)}
              aria-label="Remove from saved"
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
                background: 'transparent',
                transition: 'background 0.2s ease',
                '&:hover': { background: 'var(--colors-bg-default)' },
              }}
            >
              <Heart sx={{ width: 18, height: 18, color: '#e05252' }} />
            </Box>
          </Flex>
        )
      })}
    </Box>
  )
}

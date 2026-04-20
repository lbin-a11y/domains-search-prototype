'use client';

import type { Domain } from '@/lib/types';
import { Tag } from '@/components/shared/Tag';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { useStore } from '@/lib/store';

interface Props {
  domain: Domain;
  showCompare?: boolean;
}

export function DomainResultRow({ domain, showCompare = false }: Props) {
  const addItem = useStore((s) => s.addItem);
  const isInCart = useStore((s) => s.isInCart);
  const toggleSave = useStore((s) => s.toggleSave);
  const isSaved = useStore((s) => s.isSaved);
  const toggleCompare = useStore((s) => s.toggleCompare);
  const isComparing = useStore((s) => s.isComparing);
  const showToast = useStore((s) => s.showToast);
  const setShowNudge = useStore((s) => s.setShowNudge);
  const setTab = useStore((s) => s.setTab);

  const inCart = isInCart(domain.id);
  const saved = isSaved(domain.id);
  const comparing = isComparing(domain.id);

  const handleGet = () => {
    if (domain.status !== 'available' && domain.status !== 'premium') return;
    addItem(domain);
  };

  const handleStar = () => {
    toggleSave(domain);
    if (!saved) {
      showToast(`${domain.name} saved to your hub`, {
        label: 'View list →',
        onClick: () => setTab('hub'),
      });
      setShowNudge(true);
    }
  };

  const isTaken = domain.status === 'taken';

  return (
    <div className="flex items-center justify-between py-4 border-b border-[var(--sq-gray-01)] group">
      {/* Left: domain name + tags */}
      <div className="flex items-center gap-3 min-w-0">
        {showCompare && (
          <input
            type="checkbox"
            checked={comparing}
            onChange={() => toggleCompare(domain.id)}
            disabled={domain.status === 'taken'}
            className="w-4 h-4 cursor-pointer"
            aria-label={`Compare ${domain.name}`}
          />
        )}
        <span className={`text-[15px] tracking-[-0.015px] ${isTaken ? 'text-[var(--sq-gray-02)] line-through' : ''}`}>
          {domain.name}
        </span>
        {domain.tags.map((tag) => (
          <Tag key={tag} variant={tag} />
        ))}
        {isTaken && <Tag variant="taken" />}
      </div>

      {/* Right: price + actions */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {!isTaken && (
          <PriceDisplay
            price={domain.pricePerYear}
            originalPrice={domain.originalPricePerYear}
          />
        )}

        {/* Star / save */}
        <button
          onClick={handleStar}
          className="w-9 h-9 flex items-center justify-center text-[var(--sq-gray-02)] hover:text-black transition-colors"
          aria-label={saved ? `Remove ${domain.name} from hub` : `Save ${domain.name} to hub`}
        >
          {saved ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M9 1.5l2.16 4.38 4.84.7-3.5 3.41.83 4.82L9 12.35l-4.33 2.26.83-4.82L2 6.58l4.84-.7L9 1.5z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 1.5l2.16 4.38 4.84.7-3.5 3.41.83 4.82L9 12.35l-4.33 2.26.83-4.82L2 6.58l4.84-.7L9 1.5z" />
            </svg>
          )}
        </button>

        {/* Get / Add button */}
        {!isTaken && (
          <button
            onClick={handleGet}
            disabled={inCart}
            className={`h-10 px-5 text-[13px] font-medium uppercase tracking-[0.04em] transition-colors ${
              inCart
                ? 'bg-[var(--sq-gray-01)] text-[var(--sq-gray-02)] cursor-default'
                : 'bg-black text-white hover:bg-[var(--sq-gray-03)]'
            }`}
          >
            {inCart ? 'Added' : 'Get'}
          </button>
        )}

        {/* Watchlist for taken */}
        {isTaken && (
          <button
            onClick={handleStar}
            className="h-10 px-4 text-[12px] font-medium uppercase tracking-[0.04em] border border-[var(--sq-gray-01)] hover:border-black transition-colors"
          >
            {saved ? 'Watching' : 'Watch'}
          </button>
        )}
      </div>
    </div>
  );
}

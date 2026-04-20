'use client';

import type { Domain } from '@/lib/types';
import { Tag } from '@/components/shared/Tag';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { useStore } from '@/lib/store';

interface Props {
  domain: Domain;
}

export function DashboardResultRow({ domain }: Props) {
  const addItem = useStore((s) => s.addItem);
  const isInCart = useStore((s) => s.isInCart);
  const showToast = useStore((s) => s.showToast);

  const inCart = isInCart(domain.id);
  const isTaken = domain.status === 'taken';

  const handleConnect = () => {
    addItem(domain);
    showToast(`${domain.name} added to cart`);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-[var(--sq-gray-01)]">
      <div className="flex items-center gap-3 min-w-0">
        <span className={`text-[14px] ${isTaken ? 'line-through text-[var(--sq-gray-02)]' : ''}`}>
          {domain.name}
        </span>
        {domain.tags.map((tag) => (
          <Tag key={tag} variant={tag} />
        ))}
        {isTaken && <Tag variant="taken" />}
        {domain.isTransferable && !isTaken && (
          <span className="text-[11px] text-[var(--sq-gray-02)]">Transfer available</span>
        )}
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        {!isTaken && <PriceDisplay price={domain.pricePerYear} originalPrice={domain.originalPricePerYear} size="sm" />}
        {!isTaken && (
          <button
            onClick={handleConnect}
            disabled={inCart}
            className={`h-9 px-4 text-[12px] font-medium uppercase tracking-[0.04em] transition-colors ${
              inCart
                ? 'bg-[var(--sq-gray-01)] text-[var(--sq-gray-02)] cursor-default'
                : 'bg-black text-white hover:bg-[var(--sq-gray-03)]'
            }`}
          >
            {inCart ? 'In cart' : 'Connect to site'}
          </button>
        )}
      </div>
    </div>
  );
}

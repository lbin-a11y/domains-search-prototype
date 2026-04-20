'use client';

import { useStore } from '@/lib/store';
import { PriceDisplay } from '@/components/shared/PriceDisplay';

export function CartSidebar() {
  const items = useStore((s) => s.cartItems);
  const removeItem = useStore((s) => s.removeItem);
  const openCheckout = useStore((s) => s.openCheckout);
  const isCheckoutOpen = useStore((s) => s.checkoutOpen);

  const total = items.reduce((sum, i) => sum + (i.domain.pricePerYear ?? 0), 0);

  return (
    <aside className="w-[260px] flex-shrink-0 border-l border-[var(--sq-gray-01)] flex flex-col">
      <div className="px-5 py-4 border-b border-[var(--sq-gray-01)]">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.7px] text-[var(--sq-gray-02)]">
          Cart {items.length > 0 ? `(${items.length})` : ''}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-3">
        {items.length === 0 ? (
          <p className="text-[13px] text-[var(--sq-gray-02)] mt-4">
            Add domains to get started.
          </p>
        ) : (
          <div className="space-y-0">
            {items.map((item) => (
              <div key={item.domain.id} className="flex items-center justify-between py-3 border-b border-[var(--sq-gray-01)]">
                <div className="min-w-0 mr-2">
                  <p className="text-[13px] font-medium truncate">{item.domain.name}</p>
                  <PriceDisplay price={item.domain.pricePerYear} size="sm" />
                </div>
                <button
                  onClick={() => removeItem(item.domain.id)}
                  className="text-[var(--sq-gray-02)] hover:text-black flex-shrink-0"
                  aria-label={`Remove ${item.domain.name}`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && !isCheckoutOpen && (
        <div className="px-5 py-4 border-t border-[var(--sq-gray-01)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] uppercase tracking-[0.04em] font-medium">Total</span>
            <span className="text-[14px] font-medium">${total}/yr</span>
          </div>
          <button
            onClick={openCheckout}
            className="w-full bg-black text-white h-11 text-[12px] font-medium uppercase tracking-[0.04em] hover:bg-[var(--sq-gray-03)]"
          >
            Checkout
          </button>
        </div>
      )}
    </aside>
  );
}

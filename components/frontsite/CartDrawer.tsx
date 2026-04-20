'use client';

import { useStore } from '@/lib/store';
import { PriceDisplay } from '@/components/shared/PriceDisplay';

export function CartDrawer() {
  const isOpen = useStore((s) => s.cartOpen);
  const closeCart = useStore((s) => s.closeCart);
  const items = useStore((s) => s.cartItems);
  const removeItem = useStore((s) => s.removeItem);

  const total = items.reduce((sum, i) => sum + (i.domain.pricePerYear ?? 0) * i.registrationYears, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/20"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[120] w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--sq-gray-01)]">
          <h2 className="text-[15px] font-medium uppercase tracking-[0.04em]">Cart ({items.length})</h2>
          <button onClick={closeCart} className="text-[20px] leading-none opacity-50 hover:opacity-100">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-0">
          {items.length === 0 ? (
            <p className="text-[14px] text-[var(--sq-gray-02)] mt-8 text-center">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.domain.id} className="flex items-center justify-between py-4 border-b border-[var(--sq-gray-01)]">
                <div>
                  <p className="text-[14px] font-medium">{item.domain.name}</p>
                  <p className="text-[12px] text-[var(--sq-gray-02)] mt-0.5">
                    {item.registrationYears} yr · Privacy included
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <PriceDisplay price={item.domain.pricePerYear} size="sm" period="" />
                  <button
                    onClick={() => removeItem(item.domain.id)}
                    className="text-[var(--sq-gray-02)] hover:text-black text-[13px]"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[var(--sq-gray-01)]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] uppercase tracking-[0.04em] font-medium">Subtotal</span>
              <span className="text-[15px] font-medium">${total}/yr</span>
            </div>
            <button className="w-full bg-black text-white h-14 text-[14px] font-medium uppercase tracking-[0.04em] hover:bg-[var(--sq-gray-03)]">
              Continue
            </button>
            <p className="text-[11px] text-[var(--sq-gray-02)] text-center mt-3">
              Sign in or create an account to complete purchase
            </p>
          </div>
        )}
      </div>
    </>
  );
}

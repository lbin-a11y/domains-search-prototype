'use client';

import type { CheckoutStepId, CartItem, OrderConfirmation } from '@/lib/types';
import { mockUser, mockPaymentMethod } from '@/lib/mock-data';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { useStore } from '@/lib/store';

interface Props {
  step: CheckoutStepId;
  items: CartItem[];
  siteToConnect: string | null;
  orderConfirmation: OrderConfirmation | null;
  onAdvance: () => void;
  onSetSite: (siteId: string) => void;
  onComplete: () => void;
}

export function CheckoutStepContent({ step, items, siteToConnect, orderConfirmation, onAdvance, onSetSite, onComplete }: Props) {
  const total = items.reduce((sum, i) => sum + (i.domain.pricePerYear ?? 0), 0);

  if (step === 'review') {
    return (
      <div>
        <h3 className="text-[17px] font-medium mb-4">Review your order</h3>
        <div className="border border-[var(--sq-gray-01)] mb-6">
          {items.map((item, i) => (
            <div key={item.domain.id} className={`flex items-center justify-between px-5 py-4 ${i < items.length - 1 ? 'border-b border-[var(--sq-gray-01)]' : ''}`}>
              <div>
                <p className="text-[14px] font-medium">{item.domain.name}</p>
                <p className="text-[12px] text-[var(--sq-gray-02)]">1 year · WHOIS privacy included</p>
              </div>
              <PriceDisplay price={item.domain.pricePerYear} size="sm" />
            </div>
          ))}
          <div className="flex items-center justify-between px-5 py-4 border-t border-[var(--sq-gray-01)] bg-[var(--sq-bg-inset)]">
            <span className="text-[13px] font-medium uppercase tracking-[0.04em]">Total</span>
            <span className="text-[15px] font-medium">${total}/yr</span>
          </div>
        </div>
        <button onClick={onAdvance} className="bg-black text-white h-12 px-8 text-[13px] font-medium uppercase tracking-[0.04em] hover:bg-[var(--sq-gray-03)]">
          Continue to payment →
        </button>
      </div>
    );
  }

  if (step === 'payment') {
    const pm = mockPaymentMethod;
    return (
      <div>
        <h3 className="text-[17px] font-medium mb-4">Payment method</h3>
        <div className="border border-[var(--sq-gray-01)] p-5 mb-6 flex items-center justify-between">
          <div>
            <p className="text-[14px] font-medium">{pm.brand} ···· {pm.last4}</p>
            <p className="text-[12px] text-[var(--sq-gray-02)]">Expires {pm.expiryMonth}/{pm.expiryYear}</p>
          </div>
          <div className="w-10 h-7 border border-[var(--sq-gray-01)] flex items-center justify-center text-[11px] font-medium">
            VISA
          </div>
        </div>
        <p className="text-[12px] text-[var(--sq-gray-02)] mb-6">
          You&apos;ll be charged ${total}/yr · Cancel anytime
        </p>
        <button onClick={onAdvance} className="bg-black text-white h-12 px-8 text-[13px] font-medium uppercase tracking-[0.04em] hover:bg-[var(--sq-gray-03)]">
          Continue to connect →
        </button>
      </div>
    );
  }

  if (step === 'connect') {
    const site = mockUser.websites[0];
    return (
      <div>
        <h3 className="text-[17px] font-medium mb-2">Connect to your website</h3>
        <p className="text-[13px] text-[var(--sq-gray-02)] mb-5">Choose a site to connect your new domain to.</p>
        <div
          onClick={() => onSetSite(site.id)}
          className={`border p-5 mb-6 cursor-pointer transition-colors ${siteToConnect === site.id ? 'border-black' : 'border-[var(--sq-gray-01)] hover:border-black'}`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${siteToConnect === site.id ? 'border-black' : 'border-[var(--sq-gray-01)]'}`}>
              {siteToConnect === site.id && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
            </div>
            <div>
              <p className="text-[14px] font-medium">{site.name}</p>
              <p className="text-[12px] text-[var(--sq-gray-02)]">{site.url}</p>
            </div>
          </div>
        </div>
        <button
          onClick={onAdvance}
          disabled={!siteToConnect}
          className={`h-12 px-8 text-[13px] font-medium uppercase tracking-[0.04em] transition-colors ${siteToConnect ? 'bg-black text-white hover:bg-[var(--sq-gray-03)]' : 'bg-[var(--sq-gray-01)] text-[var(--sq-gray-02)] cursor-not-allowed'}`}
        >
          Complete purchase →
        </button>
        <button onClick={onAdvance} className="ml-4 text-[13px] text-[var(--sq-gray-02)] underline">
          Skip for now
        </button>
      </div>
    );
  }

  if (step === 'confirm' && orderConfirmation) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-full bg-[var(--sq-green-bg)] text-[var(--sq-green-fg)] flex items-center justify-center text-[22px] mx-auto mb-4">
          ✓
        </div>
        <h3 className="text-[22px] font-normal tracking-[-0.5px] mb-2">You&apos;re all set!</h3>
        <p className="text-[13px] text-[var(--sq-gray-02)] mb-1">Order {orderConfirmation.orderId}</p>
        <div className="flex flex-wrap gap-2 justify-center my-4">
          {orderConfirmation.domains.map((d) => (
            <span key={d.id} className="bg-[var(--sq-bg-inset)] px-3 py-1 text-[13px] font-medium">
              {d.name}
            </span>
          ))}
        </div>
        <p className="text-[13px] text-[var(--sq-gray-02)] mb-6">
          Charged ${orderConfirmation.totalCharged}/yr · DNS propagation may take up to 48 hours
        </p>
        <button
          onClick={onComplete}
          className="bg-black text-white h-12 px-8 text-[13px] font-medium uppercase tracking-[0.04em] hover:bg-[var(--sq-gray-03)]"
        >
          Done
        </button>
      </div>
    );
  }

  return null;
}

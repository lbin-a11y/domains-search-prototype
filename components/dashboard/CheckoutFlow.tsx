'use client';

import { useStore } from '@/lib/store';
import { StepIndicator } from './StepIndicator';
import { CheckoutStepContent } from './CheckoutStep';

export function CheckoutFlow() {
  const isOpen = useStore((s) => s.checkoutOpen);
  const steps = useStore((s) => s.steps);
  const currentStep = useStore((s) => s.currentStep);
  const siteToConnect = useStore((s) => s.siteToConnect);
  const orderConfirmation = useStore((s) => s.orderConfirmation);
  const items = useStore((s) => s.cartItems);
  const advanceStep = useStore((s) => s.advanceStep);
  const setSiteToConnect = useStore((s) => s.setSiteToConnect);
  const completeOrder = useStore((s) => s.completeOrder);
  const resetCheckout = useStore((s) => s.resetCheckout);
  const clearCart = useStore((s) => s.clearCart);
  const closeCheckout = useStore((s) => s.closeCheckout);

  if (!isOpen) return null;

  const handleAdvance = () => {
    if (currentStep === 'connect') {
      completeOrder(items);
    } else {
      advanceStep();
    }
  };

  const handleComplete = () => {
    resetCheckout();
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-start justify-center pt-16">
      <div className="absolute inset-0 bg-black/30" onClick={closeCheckout} />
      <div className="relative bg-white w-full max-w-xl mx-4 p-8 shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.04em]">Checkout</h2>
          {currentStep !== 'confirm' && (
            <button onClick={closeCheckout} className="opacity-40 hover:opacity-100 text-[18px] leading-none">✕</button>
          )}
        </div>

        <StepIndicator steps={steps} currentStep={currentStep} />

        <CheckoutStepContent
          step={currentStep}
          items={items}
          siteToConnect={siteToConnect}
          orderConfirmation={orderConfirmation}
          onAdvance={handleAdvance}
          onSetSite={setSiteToConnect}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}

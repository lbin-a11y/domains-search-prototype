'use client';

import { useStore } from '@/lib/store';

export function SignInNudge() {
  const showNudge = useStore((s) => s.showNudge);
  const setShowNudge = useStore((s) => s.setShowNudge);
  const setShowLoginModal = useStore((s) => s.setShowLoginModal);

  if (!showNudge) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[140] flex justify-center pointer-events-none">
      <div className="bg-[var(--sq-fg-default)] text-white px-6 py-4 flex items-center gap-6 shadow-xl pointer-events-auto max-w-lg w-full mx-4">
        <p className="text-[13px] flex-1">Sign in to save your shortlist and get price alerts.</p>
        <button
          onClick={() => setShowLoginModal(true)}
          className="bg-white text-black px-5 h-10 text-[12px] font-medium uppercase tracking-[0.04em] whitespace-nowrap hover:bg-[var(--sq-gray-01)]"
        >
          Log in
        </button>
        <button
          onClick={() => setShowNudge(false)}
          className="opacity-50 hover:opacity-100 text-[18px] leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

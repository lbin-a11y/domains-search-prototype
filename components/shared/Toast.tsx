'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';

export function Toast() {
  const toast = useStore((s) => s.toast);
  const dismissToast = useStore((s) => s.dismissToast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismissToast, 4000);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-[var(--sq-fg-default)] text-white px-5 py-3 text-[13px] shadow-lg">
      <span>{toast.message}</span>
      {toast.action && (
        <button
          onClick={toast.action.onClick}
          className="underline font-medium whitespace-nowrap"
        >
          {toast.action.label}
        </button>
      )}
      <button onClick={dismissToast} className="ml-1 opacity-60 hover:opacity-100">
        ✕
      </button>
    </div>
  );
}

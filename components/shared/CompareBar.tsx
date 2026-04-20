'use client';

import { useStore } from '@/lib/store';

export function CompareBar() {
  const compareSelection = useStore((s) => s.compareSelection);
  const savedDomains = useStore((s) => s.savedDomains);
  const setShowCompareSheet = useStore((s) => s.setShowCompareSheet);
  const clearCompare = useStore((s) => s.clearCompare);

  if (compareSelection.length < 2) return null;

  const selected = savedDomains.filter((d) => compareSelection.includes(d.id));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] bg-[var(--sq-fg-default)] text-white flex items-center justify-between px-10 py-4 shadow-2xl">
      <div className="flex items-center gap-4">
        <span className="text-[13px] uppercase tracking-[0.04em] font-medium">
          {compareSelection.length} domains selected
        </span>
        <div className="flex gap-2">
          {selected.map((d) => (
            <span key={d.id} className="text-[13px] bg-white/10 px-3 py-1">
              {d.name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={clearCompare}
          className="text-[13px] opacity-60 hover:opacity-100 uppercase tracking-[0.04em]"
        >
          Clear
        </button>
        <button
          onClick={() => setShowCompareSheet(true)}
          className="bg-white text-black px-6 h-11 text-[13px] font-medium uppercase tracking-[0.04em] hover:bg-[var(--sq-gray-01)]"
        >
          Compare →
        </button>
      </div>
    </div>
  );
}

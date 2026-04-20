'use client';

import { useStore } from '@/lib/store';

const TLDS = [
  { tld: '.com', price: '$18' },
  { tld: '.net', price: '$15' },
  { tld: '.org', price: '$16' },
  { tld: '.studio', price: '$22' },
  { tld: '.art', price: '$28' },
  { tld: '.shop', price: '$20' },
  { tld: '.store', price: '$18' },
  { tld: '.co', price: '$30' },
];

export function TldSuggestions() {
  const runSearch = useStore((s) => s.runSearch);
  const setQuery = useStore((s) => s.setQuery);

  const handleClick = (tld: string) => {
    const q = tld;
    setQuery(q);
    runSearch(q);
  };

  return (
    <div className="mt-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.7px] text-[var(--sq-gray-02)] mb-3">
        Popular extensions
      </p>
      <div className="flex flex-wrap gap-2">
        {TLDS.map(({ tld, price }) => (
          <button
            key={tld}
            onClick={() => handleClick(tld)}
            className="inline-flex items-center gap-2 px-4 h-10 border border-[var(--sq-gray-01)] text-[13px] hover:border-black transition-colors bg-white"
          >
            <span className="font-medium">{tld}</span>
            <span className="text-[var(--sq-gray-02)]">from {price}/yr</span>
          </button>
        ))}
      </div>
    </div>
  );
}

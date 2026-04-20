'use client';

import { useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

interface Props {
  variant?: 'frontsite' | 'dashboard';
  placeholder?: string;
}

export function SearchBar({ variant = 'frontsite', placeholder = 'Search for a domain...' }: Props) {
  const query = useStore((s) => s.query);
  const setQuery = useStore((s) => s.setQuery);
  const runSearch = useStore((s) => s.runSearch);
  const clearSearch = useStore((s) => s.clearSearch);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync URL ?q= param on mount
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && q !== query) {
      runSearch(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!val.trim()) {
      clearSearch();
      router.replace('?', { scroll: false });
      return;
    }
    debounceRef.current = setTimeout(() => {
      runSearch(val.trim());
      router.replace(`?q=${encodeURIComponent(val.trim())}`, { scroll: false });
    }, 280);
  };

  const handleClear = () => {
    clearSearch();
    router.replace('?', { scroll: false });
  };

  const isDashboard = variant === 'dashboard';

  return (
    <div
      id="search"
      className={`relative flex items-center ${isDashboard ? '' : 'bg-[var(--sq-bg-inset)] p-2'}`}
    >
      {/* Search icon */}
      <span className={`absolute left-${isDashboard ? '3' : '5'} text-[var(--sq-gray-02)] pointer-events-none`}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11.5 11.5 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full bg-white border border-[var(--sq-gray-01)] pl-11 pr-12 py-4 text-[15px] outline-none focus:border-black transition-colors ${isDashboard ? 'rounded' : ''}`}
        aria-label="Search for a domain"
      />

      {/* Clear button */}
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-4 text-[var(--sq-gray-02)] hover:text-black transition-colors"
          aria-label="Clear search"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

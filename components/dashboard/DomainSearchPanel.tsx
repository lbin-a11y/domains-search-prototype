'use client';

import { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { SearchBar } from '@/components/frontsite/SearchBar';
import { FilterBar } from './FilterBar';
import { DashboardResultRow } from './DashboardResultRow';
import { LoadingSkeleton } from '@/components/frontsite/LoadingSkeleton';
import { EmptyState } from '@/components/frontsite/EmptyState';

export function DomainSearchPanel() {
  const results = useStore((s) => s.results);
  const isLoading = useStore((s) => s.isLoading);
  const hasSearched = useStore((s) => s.hasSearched);
  const clearSearch = useStore((s) => s.clearSearch);

  const [activeTlds, setActiveTlds] = useState<string[]>([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const toggleTld = (tld: string) => {
    setActiveTlds((prev) =>
      prev.includes(tld) ? prev.filter((t) => t !== tld) : [...prev, tld]
    );
  };

  const filtered = useMemo(() => {
    let list = results;
    if (activeTlds.length > 0) {
      list = list.filter((r) => activeTlds.includes(r.domain.tld));
    }
    if (showAvailableOnly) {
      list = list.filter((r) => r.domain.status === 'available' || r.domain.status === 'premium');
    }
    return list;
  }, [results, activeTlds, showAvailableOnly]);

  return (
    <section className="flex-1 min-w-0">
      <h2 className="text-[11px] font-medium uppercase tracking-[0.7px] text-[var(--sq-gray-02)] mb-3">
        Add a domain
      </h2>

      <SearchBar variant="dashboard" placeholder="Search for a domain to connect..." />

      {hasSearched && (
        <FilterBar
          activeTlds={activeTlds}
          showAvailableOnly={showAvailableOnly}
          onTldToggle={toggleTld}
          onAvailableToggle={() => setShowAvailableOnly((v) => !v)}
        />
      )}

      {isLoading && <LoadingSkeleton rows={5} />}

      {!isLoading && hasSearched && filtered.length === 0 && (
        <EmptyState
          title="No domains found"
          subtitle="Try a different search or adjust your filters."
          action={{ label: 'Clear filters', onClick: () => { setActiveTlds([]); setShowAvailableOnly(false); clearSearch(); } }}
        />
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="mt-2">
          {filtered.map((r) => (
            <DashboardResultRow key={r.domain.id} domain={r.domain} />
          ))}
        </div>
      )}
    </section>
  );
}

'use client';

import type { SearchResult } from '@/lib/types';
import { DomainResultRow } from './DomainResultRow';

interface Props {
  results: SearchResult[];
  showCompare?: boolean;
}

export function ResultsGrid({ results, showCompare = false }: Props) {
  const topResults = results.filter((r) => r.section === 'top');
  const moreResults = results.filter((r) => r.section === 'more');

  return (
    <div className="mt-2">
      {topResults.map((r) => (
        <DomainResultRow key={r.domain.id} domain={r.domain} showCompare={showCompare} />
      ))}

      {moreResults.length > 0 && (
        <>
          <div className="flex items-center gap-4 py-6">
            <div className="flex-1 h-px bg-[var(--sq-gray-01)]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.7px] text-[var(--sq-gray-02)]">
              More options
            </span>
            <div className="flex-1 h-px bg-[var(--sq-gray-01)]" />
          </div>
          {moreResults.map((r) => (
            <DomainResultRow key={r.domain.id} domain={r.domain} showCompare={showCompare} />
          ))}
        </>
      )}
    </div>
  );
}

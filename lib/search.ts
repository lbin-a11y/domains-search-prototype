import type { Domain, SearchResult } from './types';
import { allDomains } from './mock-data';

export function searchDomains(query: string): SearchResult[] {
  const q = query.trim().toLowerCase().replace(/\s+/g, '');
  if (!q) return [];

  const stripped = q.replace(/^www\./, '').replace(/\.[a-z]+$/, '');

  const scored = allDomains.map((domain) => {
    const sld = domain.sld.toLowerCase();
    const name = domain.name.toLowerCase();
    let score = 0;

    if (sld === stripped) score += 100;
    else if (sld.includes(stripped)) score += 60;
    else if (stripped.includes(sld)) score += 40;
    else if (name.includes(stripped)) score += 30;
    else if (stripped.split('').every((c) => sld.includes(c))) score += 10;
    else return null;

    // Boost .com
    if (domain.tld === '.com') score += 20;
    // Deprioritize premium
    if (domain.isPremium) score -= 30;
    // Deprioritize taken
    if (domain.status === 'taken') score -= 50;

    return { domain, score };
  }).filter(Boolean) as { domain: Domain; score: number }[];

  const sorted = scored.sort((a, b) => b.score - a.score);

  return sorted.map((item, idx) => ({
    domain: item.domain,
    rank: idx,
    section: idx < 5 ? 'top' : 'more',
  }));
}

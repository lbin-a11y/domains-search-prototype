'use client';

import { useStore } from '@/lib/store';
import { Tag } from './Tag';
import { PriceDisplay } from './PriceDisplay';

export function CompareSheet() {
  const showCompareSheet = useStore((s) => s.showCompareSheet);
  const setShowCompareSheet = useStore((s) => s.setShowCompareSheet);
  const compareSelection = useStore((s) => s.compareSelection);
  const savedDomains = useStore((s) => s.savedDomains);
  const addItem = useStore((s) => s.addItem);
  const showToast = useStore((s) => s.showToast);

  const domains = savedDomains.filter((d) => compareSelection.includes(d.id));

  if (!showCompareSheet) return null;

  const rows = [
    { label: 'Price', render: (d: typeof domains[0]) => <PriceDisplay price={d.pricePerYear} size="sm" /> },
    { label: 'Renewal', render: (d: typeof domains[0]) => <PriceDisplay price={d.renewalPricePerYear} size="sm" /> },
    { label: 'Status', render: (d: typeof domains[0]) => <Tag variant={d.status} /> },
    { label: 'WHOIS Privacy', render: () => <span className="text-[var(--sq-green-fg)] text-[13px]">Included</span> },
    { label: 'TLD', render: (d: typeof domains[0]) => <span className="text-[13px]">{d.tld}</span> },
  ];

  return (
    <div className="fixed inset-0 z-[180] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={() => setShowCompareSheet(false)} />
      <div className="relative bg-white shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between px-10 py-5 border-b border-[var(--sq-gray-01)]">
          <h2 className="text-[17px] font-medium">Compare domains</h2>
          <button
            onClick={() => setShowCompareSheet(false)}
            className="text-[20px] leading-none opacity-50 hover:opacity-100"
          >
            ✕
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-[var(--sq-gray-01)]">
                <th className="text-left px-10 py-4 text-[11px] uppercase tracking-[0.7px] text-[var(--sq-gray-02)] w-32">Feature</th>
                {domains.map((d) => (
                  <th key={d.id} className="text-left px-6 py-4">
                    <span className="text-[15px] font-medium">{d.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-[var(--sq-gray-01)]">
                  <td className="px-10 py-4 text-[12px] uppercase tracking-[0.5px] text-[var(--sq-gray-02)]">
                    {row.label}
                  </td>
                  {domains.map((d) => (
                    <td key={d.id} className="px-6 py-4">
                      {row.render(d)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="px-10 py-4" />
                {domains.map((d) => (
                  <td key={d.id} className="px-6 py-4">
                    {d.status === 'available' ? (
                      <button
                        onClick={() => {
                          addItem(d);
                          showToast(`${d.name} added to cart`);
                          setShowCompareSheet(false);
                        }}
                        className="bg-black text-white px-5 h-10 text-[13px] font-medium uppercase tracking-[0.04em] hover:bg-[var(--sq-gray-03)]"
                      >
                        Get
                      </button>
                    ) : (
                      <span className="text-[13px] text-[var(--sq-gray-02)]">Unavailable</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

const TLDS = ['.com', '.net', '.org', '.studio', '.art', '.shop', '.store', '.co'];

interface Props {
  activeTlds: string[];
  showAvailableOnly: boolean;
  onTldToggle: (tld: string) => void;
  onAvailableToggle: () => void;
}

export function FilterBar({ activeTlds, showAvailableOnly, onTldToggle, onAvailableToggle }: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap py-3">
      <span className="text-[11px] uppercase tracking-[0.7px] text-[var(--sq-gray-02)] font-medium mr-1">Filter:</span>

      {TLDS.map((tld) => {
        const isActive = activeTlds.includes(tld);
        return (
          <button
            key={tld}
            onClick={() => onTldToggle(tld)}
            className={`px-3 h-8 text-[12px] border transition-colors ${
              isActive
                ? 'border-black bg-black text-white'
                : 'border-[var(--sq-gray-01)] hover:border-black text-[var(--sq-gray-03)]'
            }`}
          >
            {tld}
          </button>
        );
      })}

      <div className="ml-2 flex items-center gap-2">
        <button
          onClick={onAvailableToggle}
          className={`relative w-10 h-5 rounded-full transition-colors ${showAvailableOnly ? 'bg-black' : 'bg-[var(--sq-gray-01)]'}`}
          role="switch"
          aria-checked={showAvailableOnly}
          aria-label="Show available only"
        >
          <span
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${showAvailableOnly ? 'translate-x-5' : 'translate-x-0.5'}`}
          />
        </button>
        <span className="text-[12px] text-[var(--sq-gray-03)]">Available only</span>
      </div>
    </div>
  );
}

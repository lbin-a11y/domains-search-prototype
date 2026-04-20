import { mockUser } from '@/lib/mock-data';
import { Tag } from '@/components/shared/Tag';

export function OwnedDomainsList() {
  const domains = mockUser.ownedDomains;

  return (
    <section className="mb-8">
      <h2 className="text-[11px] font-medium uppercase tracking-[0.7px] text-[var(--sq-gray-02)] mb-3">
        Your domains
      </h2>
      <div className="border border-[var(--sq-gray-01)]">
        {domains.map((domain, i) => (
          <div
            key={domain.id}
            className={`flex items-center justify-between px-5 py-4 ${i < domains.length - 1 ? 'border-b border-[var(--sq-gray-01)]' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-medium">{domain.name}</span>
              <Tag variant="available" label="Active" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-[var(--sq-gray-02)]">Renews {domain.renewalPricePerYear ? `$${domain.renewalPricePerYear}/yr` : ''}</span>
              <button className="h-8 px-4 text-[12px] border border-[var(--sq-gray-01)] hover:border-black transition-colors uppercase tracking-[0.04em] font-medium">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

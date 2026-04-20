import type { DomainTag, DomainStatus } from '@/lib/types';

type TagVariant = DomainTag | DomainStatus;

const styles: Record<TagVariant, string> = {
  closest:   'bg-[var(--sq-yellow-bg)] text-[var(--sq-yellow-fg)]',
  premium:   'bg-[var(--sq-blue-bg)] text-[var(--sq-blue-fg)]',
  promoted:  'bg-[var(--sq-blue-bg)] text-[var(--sq-blue-fg)]',
  watchlist: 'bg-[var(--sq-amber-bg)] text-[var(--sq-amber-fg)]',
  available: 'bg-[var(--sq-green-bg)] text-[var(--sq-green-fg)]',
  taken:     'bg-[var(--sq-red-bg)] text-[var(--sq-red-fg)]',
  suggested: 'bg-[var(--sq-blue-bg)] text-[var(--sq-blue-fg)]',
};

const labels: Record<TagVariant, string> = {
  closest:   'Closest match',
  premium:   'Premium',
  promoted:  'Sponsored',
  watchlist: 'On watchlist',
  available: 'Available',
  taken:     'Taken',
  suggested: 'Suggested',
};

interface Props {
  variant: TagVariant;
  label?: string;
}

export function Tag({ variant, label }: Props) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium whitespace-nowrap ${styles[variant]}`}
    >
      {label ?? labels[variant]}
    </span>
  );
}

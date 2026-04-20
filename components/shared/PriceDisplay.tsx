interface Props {
  price: number | null;
  originalPrice?: number | null;
  period?: string;
  size?: 'sm' | 'md';
}

export function PriceDisplay({ price, originalPrice, period = '/yr', size = 'md' }: Props) {
  if (price === null) return null;

  const base = size === 'sm' ? 'text-[13px]' : 'text-[15px]';

  return (
    <span className={`flex items-baseline gap-1.5 ${base}`}>
      {originalPrice && (
        <span className="line-through text-[var(--sq-gray-02)]">
          ${originalPrice}
        </span>
      )}
      <span className="font-medium">
        ${price}
        <span className="text-[var(--sq-gray-02)] font-normal">{period}</span>
      </span>
    </span>
  );
}

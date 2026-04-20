interface Props {
  title?: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({
  title = 'No results found',
  subtitle = 'Try a different name or extension.',
  action,
}: Props) {
  return (
    <div className="mt-16 text-center py-16">
      <div className="text-[40px] mb-4 opacity-20">◎</div>
      <p className="text-[17px] font-medium mb-2">{title}</p>
      <p className="text-[14px] text-[var(--sq-gray-02)]">{subtitle}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 bg-black text-white px-6 h-11 text-[13px] font-medium uppercase tracking-[0.04em] hover:bg-[var(--sq-gray-03)]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

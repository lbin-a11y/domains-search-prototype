export function LoadingSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="mt-6 space-y-0">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between py-4 border-b border-[var(--sq-gray-01)] animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="h-4 w-48 bg-[var(--sq-gray-01)] rounded" />
            <div className="h-5 w-20 bg-[var(--sq-gray-01)] rounded-full" />
          </div>
          <div className="flex items-center gap-6">
            <div className="h-4 w-16 bg-[var(--sq-gray-01)] rounded" />
            <div className="h-10 w-16 bg-[var(--sq-gray-01)] rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

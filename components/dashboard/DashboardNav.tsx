import { mockUser } from '@/lib/mock-data';

export function DashboardNav() {
  const site = mockUser.websites[0];

  return (
    <nav
      className="sticky top-0 z-[100] bg-white border-b border-[var(--sq-gray-01)]"
      style={{ height: 'var(--sq-nav-h)' }}
    >
      <div className="h-full flex items-center justify-between px-6">
        {/* Left: logo + site name */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
              <circle cx="13" cy="13" r="13" fill="#000" />
              <path d="M8 13a5 5 0 0 1 10 0 5 5 0 0 1-10 0Z" fill="#fff" />
            </svg>
          </div>
          <div className="w-px h-6 bg-[var(--sq-gray-01)]" />
          <div>
            <p className="text-[13px] font-medium leading-tight">{site.name}</p>
            <p className="text-[11px] text-[var(--sq-gray-02)]">{site.url}</p>
          </div>
        </div>

        {/* Right: user avatar */}
        <div className="flex items-center gap-4">
          <span className="text-[12px] text-[var(--sq-gray-02)]">{mockUser.plan} plan</span>
          <div className="w-9 h-9 rounded-full bg-[var(--sq-fg-default)] text-white flex items-center justify-center text-[12px] font-medium">
            {mockUser.avatarInitials}
          </div>
        </div>
      </div>
    </nav>
  );
}

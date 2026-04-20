'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Pages', href: '#', icon: '⊞' },
  { label: 'Design', href: '#', icon: '◈' },
  { label: 'Commerce', href: '#', icon: '◉' },
  { label: 'Marketing', href: '#', icon: '◎' },
  { label: 'Analytics', href: '#', icon: '▦' },
  { label: 'Domains', href: '/dashboard', icon: '◐', active: true },
  { label: 'Settings', href: '#', icon: '⚙' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] flex-shrink-0 border-r border-[var(--sq-gray-01)] flex flex-col py-4">
      {NAV_ITEMS.map((item) => {
        const isActive = item.href === pathname || item.active;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-5 py-3 text-[13px] transition-colors ${
              isActive
                ? 'font-medium text-black bg-[var(--sq-bg-inset)]'
                : 'text-[var(--sq-gray-03)] hover:text-black hover:bg-[var(--sq-bg-inset)]'
            }`}
          >
            <span className="text-[16px] w-5 text-center opacity-70">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}

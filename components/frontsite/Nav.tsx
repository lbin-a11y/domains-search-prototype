'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store';

export function Nav() {
  const setShowLoginModal = useStore((s) => s.setShowLoginModal);

  return (
    <nav
      className="sticky top-0 z-[100] bg-white border-b border-[var(--sq-gray-01)]"
      style={{ height: 'var(--sq-nav-h)' }}
    >
      <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-10">
        {/* Logo */}
        <div className="flex items-center gap-1.5">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
            <circle cx="13" cy="13" r="13" fill="#000" />
            <path d="M8 13a5 5 0 0 1 10 0 5 5 0 0 1-10 0Z" fill="#fff" />
          </svg>
          <span className="text-[13px] tracking-[1.5px] font-bold uppercase">Squarespace</span>
          <span className="text-[13px] tracking-[0.5px] text-[var(--sq-gray-02)] ml-1">Domains</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-[14px] font-medium uppercase tracking-[0.02em] hover:opacity-60">
            Transfer a domain
          </Link>
          <Link href="/dashboard" className="text-[14px] font-medium uppercase tracking-[0.02em] hover:opacity-60">
            Dashboard
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setShowLoginModal(true)}
            className="text-[14px] font-medium uppercase tracking-[0.02em] hover:opacity-60"
          >
            Log in
          </button>
          <Link
            href="#search"
            className="bg-black text-white h-[62px] px-7 text-[14px] font-medium uppercase tracking-[0.04em] hidden md:inline-flex items-center justify-center hover:bg-[var(--sq-gray-03)]"
          >
            Find a domain
          </Link>
        </div>
      </div>
    </nav>
  );
}

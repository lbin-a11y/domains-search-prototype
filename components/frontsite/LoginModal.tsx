'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';

export function LoginModal() {
  const showLoginModal = useStore((s) => s.showLoginModal);
  const setShowLoginModal = useStore((s) => s.setShowLoginModal);
  const showToast = useStore((s) => s.showToast);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!showLoginModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoginModal(false);
    showToast('Signed in as ' + (email || 'user@example.com'));
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => setShowLoginModal(false)} />
      <div className="relative bg-white w-full max-w-sm mx-4 p-8 shadow-2xl">
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 opacity-40 hover:opacity-100 text-[20px] leading-none"
        >
          ✕
        </button>

        <h2 className="text-[22px] font-normal tracking-[-0.5px] mb-6">Log in to Squarespace</h2>

        {/* Social buttons */}
        <div className="space-y-2 mb-5">
          {['Continue with Google', 'Continue with Apple'].map((label) => (
            <button
              key={label}
              onClick={() => { setShowLoginModal(false); showToast('Signed in'); }}
              className="w-full h-12 border border-[var(--sq-gray-01)] text-[13px] font-medium hover:border-black transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[var(--sq-gray-01)]" />
          <span className="text-[11px] text-[var(--sq-gray-02)]">or</span>
          <div className="flex-1 h-px bg-[var(--sq-gray-01)]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full h-12 border border-[var(--sq-gray-01)] px-4 text-[14px] outline-none focus:border-black transition-colors"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-12 border border-[var(--sq-gray-01)] px-4 text-[14px] outline-none focus:border-black transition-colors"
          />
          <button
            type="submit"
            className="w-full h-12 bg-black text-white text-[13px] font-medium uppercase tracking-[0.04em] hover:bg-[var(--sq-gray-03)]"
          >
            Log in
          </button>
        </form>

        <p className="text-[12px] text-center text-[var(--sq-gray-02)] mt-4">
          Don&apos;t have an account?{' '}
          <button className="underline text-black">Sign up</button>
        </p>
      </div>
    </div>
  );
}

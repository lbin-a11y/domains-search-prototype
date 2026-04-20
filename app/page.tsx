'use client';

import { Suspense } from 'react';
import { Nav } from '@/components/frontsite/Nav';
import { HeroSection } from '@/components/frontsite/HeroSection';
import { SearchBar } from '@/components/frontsite/SearchBar';
import { TldSuggestions } from '@/components/frontsite/TldSuggestions';
import { ResultsGrid } from '@/components/frontsite/ResultsGrid';
import { LoadingSkeleton } from '@/components/frontsite/LoadingSkeleton';
import { EmptyState } from '@/components/frontsite/EmptyState';
import { CartDrawer } from '@/components/frontsite/CartDrawer';
import { SignInNudge } from '@/components/frontsite/SignInNudge';
import { LoginModal } from '@/components/frontsite/LoginModal';
import { Toast } from '@/components/shared/Toast';
import { CompareBar } from '@/components/shared/CompareBar';
import { CompareSheet } from '@/components/shared/CompareSheet';
import { useStore } from '@/lib/store';

function FrontsiteContent() {
  const results = useStore((s) => s.results);
  const isLoading = useStore((s) => s.isLoading);
  const hasSearched = useStore((s) => s.hasSearched);
  const activeTab = useStore((s) => s.activeTab);
  const savedDomains = useStore((s) => s.savedDomains);
  const clearSearch = useStore((s) => s.clearSearch);
  const setTab = useStore((s) => s.setTab);

  const availableSaved = savedDomains.filter((d) => d.status === 'available' || d.status === 'premium');
  const takenSaved = savedDomains.filter((d) => d.status === 'taken');

  return (
    <>
      <Nav />

      <main className="max-w-[1440px] mx-auto px-10 pb-24">
        <HeroSection />

        {/* Tab bar */}
        <div className="flex border-b border-[var(--sq-gray-01)] mt-8">
          {(['search', 'hub'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setTab(tab)}
              className={`px-0 pb-3 mr-8 text-[13px] font-medium uppercase tracking-[0.04em] border-b-2 transition-colors relative ${
                activeTab === tab
                  ? 'border-black text-black'
                  : 'border-transparent text-[var(--sq-gray-02)] hover:text-black'
              }`}
            >
              {tab === 'search' ? 'Search' : 'Your hub'}
              {tab === 'hub' && savedDomains.length > 0 && (
                <span className="ml-1.5 bg-black text-white text-[10px] w-4 h-4 rounded-full inline-flex items-center justify-center">
                  {savedDomains.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search tab */}
        {activeTab === 'search' && (
          <div className="mt-6" style={{ maxWidth: 'var(--sq-col-w)', marginLeft: 'max(0px, calc(25% - 10px))' }}>
            <SearchBar />

            {!hasSearched && <TldSuggestions />}

            {isLoading && <LoadingSkeleton />}

            {!isLoading && hasSearched && results.length === 0 && (
              <EmptyState action={{ label: 'Clear search', onClick: clearSearch }} />
            )}

            {!isLoading && results.length > 0 && <ResultsGrid results={results} />}
          </div>
        )}

        {/* Hub tab */}
        {activeTab === 'hub' && (
          <div className="mt-6" style={{ maxWidth: 'var(--sq-col-w)', marginLeft: 'max(0px, calc(25% - 10px))' }}>
            {savedDomains.length === 0 ? (
              <EmptyState
                title="Your hub is empty"
                subtitle="Star domains from search results to save them here."
                action={{ label: 'Search domains', onClick: () => setTab('search') }}
              />
            ) : (
              <>
                {availableSaved.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[11px] font-medium uppercase tracking-[0.7px] text-[var(--sq-gray-02)] mb-2">
                      Available
                    </p>
                    <ResultsGrid
                      results={availableSaved.map((d, i) => ({ domain: d, rank: i, section: 'top' as const }))}
                      showCompare
                    />
                  </div>
                )}
                {takenSaved.length > 0 && (
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.7px] text-[var(--sq-gray-02)] mb-2 mt-6">
                      Taken
                    </p>
                    <ResultsGrid
                      results={takenSaved.map((d, i) => ({ domain: d, rank: i, section: 'top' as const }))}
                      showCompare
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      <CartDrawer />
      <SignInNudge />
      <LoginModal />
      <Toast />
      <CompareBar />
      <CompareSheet />
    </>
  );
}

export default function FrontsitePage() {
  return (
    <Suspense>
      <FrontsiteContent />
    </Suspense>
  );
}

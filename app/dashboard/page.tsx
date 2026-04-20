'use client';

import { Suspense } from 'react';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { OwnedDomainsList } from '@/components/dashboard/OwnedDomainsList';
import { DomainSearchPanel } from '@/components/dashboard/DomainSearchPanel';
import { CartSidebar } from '@/components/dashboard/CartSidebar';
import { CheckoutFlow } from '@/components/dashboard/CheckoutFlow';
import { Toast } from '@/components/shared/Toast';

function DashboardContent() {
  return (
    <>
      <DashboardNav />

      <div className="flex h-[calc(100vh-var(--sq-nav-h))]">
        <DashboardSidebar />

        {/* Main content */}
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <h1 className="text-[22px] font-normal tracking-[-0.5px] mb-6">Domains</h1>
            <OwnedDomainsList />
            <DomainSearchPanel />
          </div>
          <CartSidebar />
        </main>
      </div>

      <CheckoutFlow />
      <Toast />
    </>
  );
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}

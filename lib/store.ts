'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type {
  Domain,
  SearchResult,
  CartItem,
  CheckoutStep,
  CheckoutStepId,
  OrderConfirmation,
  ActiveTab,
} from './types';
import { mockUser } from './mock-data';
import { searchDomains } from './search';

// ── Search ────────────────────────────────────────────────────────────────────

interface SearchSlice {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  hasSearched: boolean;
  activeTab: ActiveTab;
  recentSearches: string[];
  setQuery: (q: string) => void;
  runSearch: (q: string) => Promise<void>;
  clearSearch: () => void;
  setTab: (tab: ActiveTab) => void;
}

// ── Cart ──────────────────────────────────────────────────────────────────────

interface CartSlice {
  cartItems: CartItem[];
  cartOpen: boolean;
  addItem: (domain: Domain) => void;
  removeItem: (domainId: string) => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  isInCart: (domainId: string) => boolean;
}

// ── Checkout ──────────────────────────────────────────────────────────────────

const CHECKOUT_STEPS: CheckoutStep[] = [
  { id: 'review', label: 'Review', isComplete: false },
  { id: 'payment', label: 'Payment', isComplete: false },
  { id: 'connect', label: 'Connect', isComplete: false },
  { id: 'confirm', label: 'Confirm', isComplete: false },
];

interface CheckoutSlice {
  checkoutOpen: boolean;
  currentStep: CheckoutStepId;
  steps: CheckoutStep[];
  siteToConnect: string | null;
  orderConfirmation: OrderConfirmation | null;
  openCheckout: () => void;
  closeCheckout: () => void;
  advanceStep: () => void;
  setSiteToConnect: (siteId: string) => void;
  completeOrder: (items: CartItem[]) => void;
  resetCheckout: () => void;
}

// ── Hub ───────────────────────────────────────────────────────────────────────

interface HubSlice {
  savedDomains: Domain[];
  compareSelection: string[];
  alertsEnabled: boolean;
  toggleSave: (domain: Domain) => void;
  toggleCompare: (domainId: string) => void;
  toggleAlerts: () => void;
  isSaved: (domainId: string) => boolean;
  isComparing: (domainId: string) => boolean;
  clearCompare: () => void;
}

// ── UI ────────────────────────────────────────────────────────────────────────

interface UISlice {
  showNudge: boolean;
  showLoginModal: boolean;
  showCompareSheet: boolean;
  toast: { message: string; action?: { label: string; onClick: () => void } } | null;
  setShowNudge: (v: boolean) => void;
  setShowLoginModal: (v: boolean) => void;
  setShowCompareSheet: (v: boolean) => void;
  showToast: (message: string, action?: { label: string; onClick: () => void }) => void;
  dismissToast: () => void;
}

type StoreState = SearchSlice & CartSlice & CheckoutSlice & HubSlice & UISlice;

export const useStore = create<StoreState>()(
  persist(
    immer((set, get) => ({
      // ── Search ──────────────────────────────────────────────────────────────
      query: '',
      results: [],
      isLoading: false,
      hasSearched: false,
      activeTab: 'search' as ActiveTab,
      recentSearches: mockUser.recentSearches,

      setQuery: (q) => set((s) => { s.query = q; }),

      runSearch: async (q) => {
        set((s) => { s.isLoading = true; s.hasSearched = true; s.query = q; });
        await new Promise((r) => setTimeout(r, 280));
        const results = searchDomains(q);
        set((s) => {
          s.results = results;
          s.isLoading = false;
          if (q && !s.recentSearches.includes(q)) {
            s.recentSearches = [q, ...s.recentSearches].slice(0, 8);
          }
        });
      },

      clearSearch: () => set((s) => {
        s.query = '';
        s.results = [];
        s.hasSearched = false;
        s.isLoading = false;
      }),

      setTab: (tab) => set((s) => { s.activeTab = tab; }),

      // ── Cart ────────────────────────────────────────────────────────────────
      cartItems: [],
      cartOpen: false,

      addItem: (domain) => set((s) => {
        if (!s.cartItems.find((i) => i.domain.id === domain.id)) {
          s.cartItems.push({ domain, addedAt: Date.now(), registrationYears: 1, isPrivacyEnabled: true });
        }
        s.cartOpen = true;
      }),

      removeItem: (domainId) => set((s) => {
        s.cartItems = s.cartItems.filter((i) => i.domain.id !== domainId);
      }),

      openCart: () => set((s) => { s.cartOpen = true; }),
      closeCart: () => set((s) => { s.cartOpen = false; }),
      clearCart: () => set((s) => { s.cartItems = []; s.cartOpen = false; }),

      isInCart: (domainId) => get().cartItems.some((i) => i.domain.id === domainId),

      // ── Checkout ────────────────────────────────────────────────────────────
      checkoutOpen: false,
      currentStep: 'review' as CheckoutStepId,
      steps: CHECKOUT_STEPS,
      siteToConnect: null,
      orderConfirmation: null,

      openCheckout: () => set((s) => {
        s.checkoutOpen = true;
        s.cartOpen = false;
        s.currentStep = 'review';
        s.steps = CHECKOUT_STEPS.map((step) => ({ ...step, isComplete: false }));
        s.siteToConnect = null;
        s.orderConfirmation = null;
      }),

      closeCheckout: () => set((s) => { s.checkoutOpen = false; }),

      advanceStep: () => set((s) => {
        const order: CheckoutStepId[] = ['review', 'payment', 'connect', 'confirm'];
        const idx = order.indexOf(s.currentStep);
        s.steps = s.steps.map((step) =>
          step.id === s.currentStep ? { ...step, isComplete: true } : step
        );
        if (idx < order.length - 1) {
          s.currentStep = order[idx + 1];
        }
      }),

      setSiteToConnect: (siteId) => set((s) => { s.siteToConnect = siteId; }),

      completeOrder: (items) => set((s) => {
        s.orderConfirmation = {
          orderId: `SQ-${Date.now()}`,
          domains: items.map((i) => i.domain),
          totalCharged: items.reduce((sum, i) => sum + (i.domain.pricePerYear ?? 0) * i.registrationYears, 0),
          connectedSiteId: s.siteToConnect,
          timestamp: Date.now(),
        };
        s.steps = s.steps.map((step) => ({ ...step, isComplete: true }));
        s.currentStep = 'confirm';
      }),

      resetCheckout: () => set((s) => {
        s.checkoutOpen = false;
        s.currentStep = 'review';
        s.steps = CHECKOUT_STEPS.map((step) => ({ ...step, isComplete: false }));
        s.siteToConnect = null;
        s.orderConfirmation = null;
      }),

      // ── Hub ─────────────────────────────────────────────────────────────────
      savedDomains: [],
      compareSelection: [],
      alertsEnabled: false,

      toggleSave: (domain) => set((s) => {
        const idx = s.savedDomains.findIndex((d) => d.id === domain.id);
        if (idx >= 0) {
          s.savedDomains.splice(idx, 1);
        } else {
          s.savedDomains.push(domain);
        }
      }),

      toggleCompare: (domainId) => set((s) => {
        const idx = s.compareSelection.indexOf(domainId);
        if (idx >= 0) {
          s.compareSelection.splice(idx, 1);
        } else if (s.compareSelection.length < 3) {
          s.compareSelection.push(domainId);
        }
      }),

      toggleAlerts: () => set((s) => { s.alertsEnabled = !s.alertsEnabled; }),

      isSaved: (domainId) => get().savedDomains.some((d) => d.id === domainId),
      isComparing: (domainId) => get().compareSelection.includes(domainId),
      clearCompare: () => set((s) => { s.compareSelection = []; }),

      // ── UI ──────────────────────────────────────────────────────────────────
      showNudge: false,
      showLoginModal: false,
      showCompareSheet: false,
      toast: null,

      setShowNudge: (v) => set((s) => { s.showNudge = v; }),
      setShowLoginModal: (v) => set((s) => { s.showLoginModal = v; }),
      setShowCompareSheet: (v) => set((s) => { s.showCompareSheet = v; }),

      showToast: (message, action) => set((s) => { s.toast = { message, action }; }),
      dismissToast: () => set((s) => { s.toast = null; }),
    })),
    {
      name: 'domains-prototype-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        savedDomains: state.savedDomains,
        recentSearches: state.recentSearches,
      }),
    }
  )
);

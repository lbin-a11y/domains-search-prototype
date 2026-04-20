export type DomainStatus = 'available' | 'taken' | 'premium' | 'suggested';
export type DomainTag = 'closest' | 'premium' | 'promoted' | 'watchlist';
export type CheckoutStepId = 'review' | 'payment' | 'connect' | 'confirm';
export type ActiveTab = 'search' | 'hub';

export interface Domain {
  id: string;
  name: string;
  tld: string;
  sld: string;
  status: DomainStatus;
  pricePerYear: number | null;
  originalPricePerYear: number | null;
  renewalPricePerYear: number | null;
  tags: DomainTag[];
  isPremium: boolean;
  isTransferable: boolean;
}

export interface SearchResult {
  domain: Domain;
  rank: number;
  section: 'top' | 'more';
}

export interface CartItem {
  domain: Domain;
  addedAt: number;
  registrationYears: number;
  isPrivacyEnabled: boolean;
}

export interface MockPaymentMethod {
  type: 'card';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
}

export interface Website {
  id: string;
  name: string;
  url: string;
  template: string;
  connectedDomains: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  plan: 'personal' | 'business' | 'commerce';
  websites: Website[];
  ownedDomains: Domain[];
  savedDomains: Domain[];
  recentSearches: string[];
  paymentMethod: MockPaymentMethod;
}

export interface CheckoutStep {
  id: CheckoutStepId;
  label: string;
  isComplete: boolean;
}

export interface OrderConfirmation {
  orderId: string;
  domains: Domain[];
  totalCharged: number;
  connectedSiteId: string | null;
  timestamp: number;
}

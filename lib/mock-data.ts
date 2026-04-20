import type { Domain, User, MockPaymentMethod } from './types';

export const mockPaymentMethod: MockPaymentMethod = {
  type: 'card',
  last4: '4242',
  brand: 'Visa',
  expiryMonth: 9,
  expiryYear: 2027,
};

const makeAvailable = (
  sld: string,
  tld: string,
  price: number,
  opts: Partial<Domain> = {}
): Domain => ({
  id: `${sld}${tld}`.replace(/\./g, '-'),
  name: `${sld}${tld}`,
  tld,
  sld,
  status: 'available',
  pricePerYear: price,
  originalPricePerYear: opts.originalPricePerYear ?? null,
  renewalPricePerYear: price + 5,
  tags: [],
  isPremium: false,
  isTransferable: true,
  ...opts,
});

const makeTaken = (sld: string, tld: string): Domain => ({
  id: `${sld}${tld}`.replace(/\./g, '-'),
  name: `${sld}${tld}`,
  tld,
  sld,
  status: 'taken',
  pricePerYear: null,
  originalPricePerYear: null,
  renewalPricePerYear: null,
  tags: [],
  isPremium: false,
  isTransferable: true,
});

export const allDomains: Domain[] = [
  // Top results for "ceramics" / "maya" searches
  makeAvailable('mayasceramics', '.com', 18, { tags: ['closest'], originalPricePerYear: 26 }),
  makeAvailable('mayasceramics', '.studio', 22),
  makeAvailable('mayasceramics', '.art', 28),
  makeAvailable('mayasceramics', '.shop', 20),
  makeAvailable('mayasceramics', '.co', 30),
  makeAvailable('mayasceramics', '.store', 18),
  makeTaken('mayasceramics', '.net'),
  makeTaken('mayasceramics', '.org'),

  // Ceramics variations
  makeAvailable('ceramicsbymaya', '.com', 18),
  makeAvailable('ceramicsbymaya', '.studio', 22),
  makeAvailable('ceramicsbymaya', '.art', 28, { tags: ['closest'] }),
  makeTaken('ceramicsbymaya', '.shop'),
  makeAvailable('ceramicsstudio', '.com', 18),
  makeAvailable('ceramicsstudio', '.art', 28),
  makeAvailable('ceramicsstudio', '.studio', 22),

  // Premium domains
  makeAvailable('ceramics', '.com', 4500, { isPremium: true, tags: ['premium'], pricePerYear: 4500, originalPricePerYear: null }),
  makeAvailable('ceramics', '.art', 65, { isPremium: true, tags: ['premium'] }),

  // Other TLD variants
  makeAvailable('mayapottery', '.com', 18),
  makeAvailable('mayapottery', '.studio', 22),
  makeAvailable('mayapottery', '.shop', 20),
  makeTaken('mayapottery', '.co'),

  // Generic creative terms
  makeAvailable('mayacraft', '.com', 18),
  makeAvailable('mayacraft', '.store', 18),
  makeAvailable('handmadebyMaya', '.com', 18),
  makeAvailable('handmadebyMaya', '.shop', 20),
  makeAvailable('theclayco', '.com', 18, { originalPricePerYear: 24 }),
  makeAvailable('theclayco', '.shop', 18),
  makeTaken('maya', '.com'),
  makeTaken('maya', '.studio'),
  makeAvailable('mayaworks', '.com', 18),
  makeAvailable('mayaworks', '.art', 28),
];

export const ownedDomains: Domain[] = [
  makeAvailable('mayasceramicsstudio', '.com', 18),
  makeAvailable('myceramics', '.net', 15),
];

export const mockUser: User = {
  id: 'user-maya-001',
  name: 'Maya Chen',
  email: 'maya@mayasceramics.com',
  avatarInitials: 'MC',
  plan: 'business',
  websites: [
    {
      id: 'site-001',
      name: "Maya's Ceramics Studio",
      url: 'mayasceramicsstudio.squarespace.com',
      template: 'Brine',
      connectedDomains: ['mayasceramicsstudio.com'],
    },
  ],
  ownedDomains,
  savedDomains: [],
  recentSearches: ['ceramics', 'maya pottery', 'clay studio'],
  paymentMethod: mockPaymentMethod,
};

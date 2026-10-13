// lib/products.ts
// PRESSI: the single source of truth for the catalog and shop info.
// The homepage, set pages, cart and sitemap all read from this file.
//
// NOTE: set names, finishes and photos are placeholders until Dina sends
// the real catalog. Prices are each category's STARTING price.
// The `slug` becomes the page address (/sets/soft-nude). Choose the final
// set names before launch: changing a slug later changes its URL.

// ─── Shop info (change these in ONE place) ───────────────────
export const WHATSAPP_NUMBER = '96176950819'; // +961 76 950 819
export const INSTAGRAM_URL = 'https://www.instagram.com/pressi_dina';
export const FREE_DELIVERY_THRESHOLD = 80; // free delivery over $80 (Lebanon only)

// ─── Options shared by every set ─────────────────────────────
export const SHAPES = [
  'Almond',
  'Coffin',
  'Square',
  'Oval',
  'Stiletto',
  'Round',
] as const;

export const LENGTHS = ['Short', 'Medium', 'Long', 'Extra Long'] as const;

export const FINISHES = [
  'Glossy',
  'Matte',
  'Chrome',
  'French tip',
  'Gold flake',
  'Ombré',
  'Marble',
] as const;

export const SIZES = ['XS', 'S', 'M', 'L', 'Custom'] as const;

export const BOX_ITEMS = [
  'Nails',
  'Glue',
  'Wooden stick',
  'Mini file',
  'Mini buffer',
  'Alcohol wipe',
  'Hand cream',
  'Thank you card',
  'Loyalty card',
  'Reminder sticker',
] as const;

// ─── Types ───────────────────────────────────────────────────
export type CategoryId = 'everyday' | 'frenshi' | 'minimal' | 'full';

export type Category = {
  id: CategoryId;
  name: string;
  tagline: string;
  desc: string;
  priceLabel: string; // text shown on the category card
  startingPrice: number;
  accentColor: string;
  imageUrl: string;
};

export type Product = {
  id: string; // used by the cart. Keep '1'..'8' so saved carts still match
  slug: string; // used in the page address: /sets/<slug>
  name: string;
  price: number; // category starting price (shown as "From $X")
  categoryId: CategoryId;
  finish: string;
  imageUrl: string;
};

// ─── The 4 categories ────────────────────────────────────────
export const categories: Category[] = [
  {
    id: 'everyday',
    name: 'Everyday Pressi',
    tagline: 'Soft. Minimal. Effortless.',
    desc: 'Elegant nude, beige, and soft pink shades for everyday wear.',
    priceLabel: 'from $23',
    startingPrice: 23,
    accentColor: '#E8C7CA',
    imageUrl:
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=90',
  },
  {
    id: 'frenshi',
    name: 'Frenshi',
    tagline: 'Timeless. Refined. Iconic.',
    desc: 'A modern take on the classic French manicure with clean lines and delicate tips.',
    priceLabel: 'from $29',
    startingPrice: 29,
    accentColor: '#E5D5C3',
    imageUrl:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=90',
  },
  {
    id: 'minimal',
    name: 'Minimal Pressi',
    tagline: 'Aura. Delicate. Special.',
    desc: 'Chrome, cat-eye, ombré, and eye-catching finishes for a little extra shine.',
    priceLabel: 'from $35',
    startingPrice: 35,
    accentColor: '#A8B89A',
    imageUrl:
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=90',
  },
  {
    id: 'full',
    name: 'Full Pressi',
    tagline: 'Glow. Shimmer. Statement.',
    desc: 'Statement designs for brides, engagements, weddings, and memorable occasions.',
    priceLabel: '$43+',
    startingPrice: 43,
    accentColor: '#C9A961',
    imageUrl:
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=90',
  },
];

// ─── The 8 sets (2 per category) ─────────────────────────────
export const products: Product[] = [
  {
    id: '1',
    slug: 'everyday-french',
    name: 'The Everyday French',
    price: 29,
    categoryId: 'frenshi',
    finish: 'French tip',
    imageUrl:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=90',
  },
  {
    id: '2',
    slug: 'soft-nude',
    name: 'The Soft Nude',
    price: 23,
    categoryId: 'everyday',
    finish: 'Glossy',
    imageUrl:
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=90',
  },
  {
    id: '3',
    slug: 'golden-hour',
    name: 'The Golden Hour',
    price: 43,
    categoryId: 'full',
    finish: 'Gold flake',
    imageUrl:
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=90',
  },
  {
    id: '4',
    slug: 'pearl-glaze',
    name: 'The Pearl Glaze',
    price: 29,
    categoryId: 'frenshi',
    finish: 'Glossy',
    imageUrl:
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=90',
  },
  {
    id: '5',
    slug: 'sage-marble',
    name: 'The Sage Marble',
    price: 35,
    categoryId: 'minimal',
    finish: 'Marble',
    imageUrl:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=90',
  },
  {
    id: '6',
    slug: 'rose-cashmere',
    name: 'The Rose Cashmere',
    price: 23,
    categoryId: 'everyday',
    finish: 'Matte',
    imageUrl:
      'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=800&q=90',
  },
  {
    id: '7',
    slug: 'champagne-chrome',
    name: 'The Champagne Chrome',
    price: 35,
    categoryId: 'minimal',
    finish: 'Chrome',
    imageUrl:
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=90',
  },
  {
    id: '8',
    slug: 'silk-ceremony',
    name: 'The Silk Ceremony',
    price: 43,
    categoryId: 'full',
    finish: 'Ombré',
    imageUrl:
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=90',
  },
];

// ─── Helpers ─────────────────────────────────────────────────

// Find a category by its id. Ids are typed, so a wrong id fails at build time.
export function getCategory(id: CategoryId): Category {
  const found = categories.find((c) => c.id === id);
  if (!found) {
    throw new Error(`Unknown category: ${id}`);
  }
  return found;
}

// Find a set by its URL slug (returns undefined for an unknown address).
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// The page address for a set, e.g. "/sets/soft-nude".
export function getProductPath(product: Product): string {
  return `/sets/${product.slug}`;
}

// "You may also like": other sets from the same category first, then the rest.
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  );
  const others = products.filter((p) => p.categoryId !== product.categoryId);
  return [...sameCategory, ...others].slice(0, limit);
}

// One short description used for the page text, the link preview and Google.
// Built only from facts we know (category, finish, made to order).
export function getProductDescription(product: Product): string {
  const category = getCategory(product.categoryId);
  return `${product.name}: ${category.name} press-on nails with a ${product.finish.toLowerCase()} finish. Handmade in Lebanon and made to order in your shape, length and size. From $${product.price}.`;
}

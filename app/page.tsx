'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Hero from '@/components/Hero';

// ─── Feature flag ────────────────────────────────────────────
// Dina is launching with simple shopping first. Flip this to true to bring
// back the AI Stylist (header pill, menu entry, section, modal, footer link).
// All the AI code stays in this file, it is just hidden.
const SHOW_AI_STYLIST = false;

// ─── Contact & shipping ──────────────────────────────────────
const WHATSAPP_NUMBER = '96176950819'; // +961 76 950 819
const INSTAGRAM_URL = 'https://www.instagram.com/pressi_dina';
const FREE_DELIVERY_THRESHOLD = 80; // free delivery over $80 (Lebanon only)

// ─── Animation variants ──────────────────────────────────────
// Reusable editorial Framer Motion variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

// ─── Navigation (used by desktop nav, mobile menu and footer) ─
const NAV_LINKS = [
  { href: '#categories', label: 'Haute Categories' },
  { href: '#products', label: 'The Collection' },
  { href: '#ritual', label: 'The Ritual' },
  { href: '#story', label: 'Our Story' },
];

// ─── Brand values ────────────────────────────────────────────
const VALUES = [
  { title: 'Handmade', desc: 'Each set is crafted by hand.' },
  { title: 'Female-owned', desc: 'Founded by Dina.' },
  { title: 'Lebanese-made', desc: 'Designed and handcrafted in Lebanon.' },
];

// ─── Options shared by every set ─────────────────────────────
const SHAPES = ['Almond', 'Coffin', 'Square', 'Oval', 'Stiletto', 'Round'];
const LENGTHS = ['Short', 'Medium', 'Long', 'Extra Long'];
const FINISHES = [
  'Glossy',
  'Matte',
  'Chrome',
  'French tip',
  'Gold flake',
  'Ombré',
  'Marble',
];
const SIZES = ['XS', 'S', 'M', 'L', 'Custom'];

const BOX_ITEMS = [
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
];

// ─── The Pressi Ritual (3 steps) ─────────────────────────────
const RITUAL_STEPS = [
  {
    step: '01',
    label: 'Size',
    title: 'Find Your Fit',
    desc: 'Start with your PRESSI sizing kit to discover the sizes that fit your natural nails. Finding the right fit helps us prepare a set tailored to your measurements.',
    highlight: '#E8C7CA',
  },
  {
    step: '02',
    label: 'Select',
    title: 'Make It Yours',
    desc: 'Choose your favorite design, shape, and length, then share your sizing details. Your PRESSI set will be prepared according to your preferences.',
    highlight: '#A8B89A',
  },
  {
    step: '03',
    label: 'Press',
    title: 'Your Nails, Your Moment',
    desc: 'Follow the preparation and application instructions, apply the adhesive as directed, and press each nail carefully into place. Enjoy beautiful nails on your own time.',
    highlight: '#C9A961',
  },
];

// ─── 4 Categories ────────────────────────────────────────────
const categories = [
  {
    id: 'everyday',
    name: 'Everyday Pressi',
    tagline: 'Soft. Minimal. Effortless.',
    desc: 'Elegant nude, beige, and soft pink shades for everyday wear.',
    price_label: 'from $23',
    accentColor: '#E8C7CA',
    image_url:
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=90',
  },
  {
    id: 'frenshi',
    name: 'Frenshi',
    tagline: 'Timeless. Refined. Iconic.',
    desc: 'A modern take on the classic French manicure with clean lines and delicate tips.',
    price_label: 'from $29',
    accentColor: '#E5D5C3',
    image_url:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=90',
  },
  {
    id: 'minimal',
    name: 'Minimal Pressi',
    tagline: 'Aura. Delicate. Special.',
    desc: 'Chrome, cat-eye, ombré, and eye-catching finishes for a little extra shine.',
    price_label: 'from $35',
    accentColor: '#A8B89A',
    image_url:
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=90',
  },
  {
    id: 'full',
    name: 'Full Pressi',
    tagline: 'Glow. Shimmer. Statement.',
    desc: 'Statement designs for brides, engagements, weddings, and memorable occasions.',
    price_label: '$43+',
    accentColor: '#C9A961',
    image_url:
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=90',
  },
];

// ─── 8 placeholder sets (2 per category) ─────────────────────
// NOTE: names, finishes and photos are placeholders until Dina sends the
// real catalog. `price` is the category's starting price (shown as "From").
const products = [
  {
    id: '1',
    name: 'The Everyday French',
    price: 29,
    category: 'Frenshi',
    categoryId: 'frenshi',
    finish: 'French tip',
    image_url:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=90',
  },
  {
    id: '2',
    name: 'The Soft Nude',
    price: 23,
    category: 'Everyday Pressi',
    categoryId: 'everyday',
    finish: 'Glossy',
    image_url:
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=90',
  },
  {
    id: '3',
    name: 'The Golden Hour',
    price: 43,
    category: 'Full Pressi',
    categoryId: 'full',
    finish: 'Gold flake',
    image_url:
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=90',
  },
  {
    id: '4',
    name: 'The Pearl Glaze',
    price: 29,
    category: 'Frenshi',
    categoryId: 'frenshi',
    finish: 'Glossy',
    image_url:
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=90',
  },
  {
    id: '5',
    name: 'The Sage Marble',
    price: 35,
    category: 'Minimal Pressi',
    categoryId: 'minimal',
    finish: 'Marble',
    image_url:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=90',
  },
  {
    id: '6',
    name: 'The Rose Cashmere',
    price: 23,
    category: 'Everyday Pressi',
    categoryId: 'everyday',
    finish: 'Matte',
    image_url:
      'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=800&q=90',
  },
  {
    id: '7',
    name: 'The Champagne Chrome',
    price: 35,
    category: 'Minimal Pressi',
    categoryId: 'minimal',
    finish: 'Chrome',
    image_url:
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=90',
  },
  {
    id: '8',
    name: 'The Silk Ceremony',
    price: 43,
    category: 'Full Pressi',
    categoryId: 'full',
    finish: 'Ombré',
    image_url:
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=90',
  },
];

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type AIStylistResult = {
  title: string;
  category: string;
  shapeAndLength: string;
  finish: string;
  consultationStory: string;
  stylingTips: string[];
  suggestedMatchingProduct: string;
};

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Mobile menu (hamburger) state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // AI Stylist Modal State (only used when SHOW_AI_STYLIST is true)
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiOccasion, setAiOccasion] = useState('Quiet Luxury Dinner');
  const [aiSkinTone, setAiSkinTone] = useState('Medium Warm / Olive');
  const [aiDesiredShape, setAiDesiredShape] = useState('Almond');
  const [aiOutfit, setAiOutfit] = useState('Silk cream dress, gold jewelry');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIStylistResult | null>(null);

  // Load the saved cart from the browser (key must stay 'pressi-cart')
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pressi-cart');
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        // Only accept a real array, ignore anything malformed
        if (Array.isArray(parsed)) {
          queueMicrotask(() => {
            setCart(parsed as CartItem[]);
            setIsLoaded(true);
          });
          return;
        }
      }
    } catch {
      // ignore
    }
    queueMicrotask(() => {
      setIsLoaded(true);
    });
  }, []);

  // Save the cart whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('pressi-cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Mobile menu behaviour: lock page scroll, Escape closes, close on desktop width
  useEffect(() => {
    if (!isMenuOpen) return;

    // Stop the page behind the menu from scrolling
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    // If the screen grows to desktop width, the menu isn't needed anymore
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    // Cleanup: restore scrolling and remove the listeners
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [isMenuOpen]);

  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  // How far the cart is from free delivery (0 once unlocked)
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - totalPrice);

  // Opens WhatsApp with the order pre-filled (same flow as before)
  const checkoutOnWhatsApp = () => {
    if (cart.length === 0) return;
    const lines = cart
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.name} × ${i.quantity} — $${i.price * i.quantity}`
      )
      .join('\n');
    const message = `Hi PRESSI, I'd like to order:\n\n${lines}\n\nEstimated total: $${totalPrice}\n\nI'll share my preferred shape, length and sizing details here.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  // Category selection handler with smooth scroll
  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // AI Stylist consultation runner
  const handleRunAiStylist = async () => {
    setAiLoading(true);
    setAiResult(null);
    try {
      const res = await fetch('/api/ai/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion: aiOccasion,
          skinTone: aiSkinTone,
          desiredShape: aiDesiredShape,
          outfitDescription: aiOutfit,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAiResult(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.categoryId === activeCategory);

  return (
    <main className="min-h-dvh bg-ivory text-ink selection:bg-[#E5D5C3]">
      {/* Announcement Bar */}
      <div className="bg-ink text-ivory text-[10px] uppercase tracking-[0.22em] py-2.5 px-4 text-center border-b border-ink/20 flex items-center justify-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A961] animate-pulse" />
        <span>Beirut Atelier · Free delivery over $80</span>
        <span className="hidden md:inline text-[#C9A961]">
          ✦ Handmade in Lebanon
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-ivory/90 border-b border-ink/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          {/* Hamburger: phones & tablets only (hidden from lg up) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden -ml-2 w-11 h-11 flex items-center justify-center text-ink cursor-pointer"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/brand/logo-pressi-cropped.png"
              alt="Pressi by Dina"
              className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-ink/70">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-ink transition hover:border-b border-[#C9A961] pb-0.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3.5">
            {SHOW_AI_STYLIST && (
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="hidden sm:inline-flex min-h-11 items-center gap-2 px-4 rounded-full border border-[#C9A961] bg-[#E5D5C3]/30 text-[10px] uppercase tracking-[0.18em] font-medium text-ink hover:bg-[#C9A961] hover:text-ivory transition-all shadow-xs cursor-pointer"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="#C9A961"
                  className="shrink-0"
                >
                  <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
                </svg>
                <span>AI Stylist</span>
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex min-h-11 items-center gap-2 px-4 border border-ink/20 text-[11px] uppercase tracking-[0.18em] font-medium text-ink hover:bg-ink hover:text-ivory transition-all cursor-pointer"
            >
              <span>Your Set</span>
              <span className="w-5 h-5 rounded-full bg-[#E5D5C3] text-ink text-[10px] flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Values band: Handmade / Female-owned / Lebanese-made */}
      <section
        aria-label="Our values"
        className="border-y border-ink/10 bg-[#E5D5C3]/30"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          {VALUES.map((value) => (
            <div key={value.title}>
              <p className="font-display text-xl text-ink">{value.title}</p>
              <p className="mt-1 text-sm text-ink/70">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Categories */}
      <section
        id="categories"
        className="scroll-mt-24 max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-14"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C9A961] font-medium mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8B89A]" />
              <span>Four Ways to Press</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink font-normal">
              Made to Press. Made to Impress.
            </h2>
            <p className="mt-2 text-sm text-ink/70 font-light max-w-lg">
              Choose a style to see its sets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-ink/60">
              Showing:
            </span>
            <span className="px-3 py-1 bg-[#E5D5C3] border border-ink/10 text-xs font-display text-ink">
              {activeCategory === 'all'
                ? 'All Sets'
                : categories.find((c) => c.id === activeCategory)?.name}
            </span>
            {activeCategory !== 'all' && (
              <button
                onClick={() => setActiveCategory('all')}
                className="inline-flex min-h-11 items-center px-2 text-[10px] uppercase tracking-[0.16em] text-ink/60 hover:text-ink underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </motion.div>

        {/* Category cards */}
        <motion.div
key={activeCategory}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={() => handleSelectCategory(cat.id)}
                // Keyboard support: behaves like a button
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectCategory(cat.id);
                  }
                }}
                className={`group relative p-5 bg-white/80 border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-2xl ${
                  isActive
                    ? 'border-[#C9A961] ring-2 ring-[#C9A961]/40 bg-white shadow-lg'
                    : 'border-ink/15 hover:border-ink/35'
                }`}
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-[#EFE7DB] mb-4">
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  {/* Thin accent line in the category color */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ backgroundColor: cat.accentColor }}
                  />
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg text-ink group-hover:text-[#C9A961] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-ink/70 font-medium whitespace-nowrap">
                    {cat.price_label}
                  </span>
                </div>

                <p className="mt-1 font-display italic text-sm text-ink/70">
                  {cat.tagline}
                </p>

                <p className="mt-3 text-xs text-ink/70 leading-relaxed font-light min-h-[48px]">
                  {cat.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between text-[10px] uppercase tracking-[0.16em]">
                  <span className="text-ink/60">Made to order</span>
                  <span
                    className={`font-medium transition-colors ${
                      isActive
                        ? 'text-[#C9A961]'
                        : 'text-ink/80 group-hover:text-[#C9A961]'
                    }`}
                  >
                    {isActive ? 'Filtered ✓' : 'Explore Set →'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* The Collection */}
      <section
        id="products"
        className="scroll-mt-24 max-w-7xl mx-auto px-6 sm:px-8 py-20 border-t border-ink/10"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 gap-6 border-b border-ink/10 pb-6"
        >
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-display text-3xl sm:text-5xl tracking-tight text-ink">
                The Collection
              </h3>
              <span className="px-2.5 py-0.5 bg-[#E5D5C3] text-[10px] uppercase tracking-[0.18em] font-medium text-ink">
                {filteredProducts.length} Sets
              </span>
            </div>
            <p className="text-sm text-ink/70 mt-1.5 font-light">
              {activeCategory === 'all'
                ? 'Every set is handcrafted in Lebanon and made to order.'
                : `Showing ${
                    categories.find((c) => c.id === activeCategory)?.name
                  }`}
            </p>
          </div>

          {/* Filter pills (44px tall for easy tapping) */}
          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em]">
            <button
              onClick={() => setActiveCategory('all')}
              className={`inline-flex min-h-11 items-center px-4 transition-all border cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-ink text-ivory border-ink'
                  : 'bg-white/60 text-ink/70 border-ink/15 hover:border-ink'
              }`}
            >
              All ({products.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`inline-flex min-h-11 items-center px-4 transition-all border cursor-pointer ${
                  activeCategory === c.id
                    ? 'bg-ink text-ivory border-ink'
                    : 'bg-white/60 text-ink/70 border-ink/15 hover:border-ink'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Options shared by every set */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 border-b border-ink/10 pb-8">
          {[
            { label: 'Shapes', values: SHAPES },
            { label: 'Lengths', values: LENGTHS },
            { label: 'Finishes', values: FINISHES },
            { label: 'Sizes', values: SIZES },
          ].map((group) => (
            <div key={group.label}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/60 mb-1.5">
                {group.label}
              </p>
              <p className="text-sm text-ink/80 leading-relaxed">
                {group.values.join(' · ')}
              </p>
            </div>
          ))}
        </div>

        {/* Product grid: 2 columns on phones, 4 on desktop */}
<motion.div
  key={activeCategory}
  initial="hidden"
  animate="visible"
  variants={containerVariants}
  className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8"
>
          {filteredProducts.map((p) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col justify-between bg-white/90 border border-ink/15 p-3 sm:p-4.5 shadow-sm hover:shadow-2xl hover:border-ink/40 transition-all duration-300"
            >
              <div>
                <div className="relative overflow-hidden aspect-[4/5] bg-[#EFE7DB] mb-3 sm:mb-4.5 border border-ink/5">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 max-w-[85%] truncate text-[8.5px] uppercase tracking-[0.2em] font-medium text-ivory bg-ink/80 px-2.5 py-1 backdrop-blur-xs">
                    {p.category}
                  </span>
                </div>

                {/* Name and price stack on phones, sit side by side from sm up */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3">
                  <div>
                    <h4 className="font-display text-base sm:text-xl leading-tight text-ink group-hover:text-[#C9A961] transition-colors">
                      {p.name}
                    </h4>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-ink/70">
                      {p.finish} finish
                    </p>
                  </div>
                  <p className="font-display text-base sm:text-lg text-ink font-medium whitespace-nowrap">
                    From ${p.price}
                  </p>
                </div>
              </div>

              <button
                onClick={() => addToCart(p)}
                className="mt-4 sm:mt-5 w-full min-h-11 border border-ink/20 py-3 text-[10px] uppercase tracking-[0.2em] text-ink font-medium transition-all duration-300 hover:bg-ink hover:text-ivory hover:border-ink cursor-pointer flex items-center justify-center gap-2 group-hover:bg-ink group-hover:text-ivory"
              >
                <span>Add to Set</span>
                <span className="text-xs">→</span>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* AI Couture Stylist Section (hidden while SHOW_AI_STYLIST is false) */}
      {SHOW_AI_STYLIST && (
        <section className="bg-[#E5D5C3]/35 border-y border-ink/10 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={headerVariants}
            className="max-w-6xl mx-auto px-6 sm:px-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#C9A961] font-medium mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A961]" />
                  <span>AI Nail Stylist</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
                  Pressi AI Nail Atelier &amp; Stylist
                </h2>
                <p className="mt-4 text-ink/75 text-base sm:text-lg font-light leading-relaxed max-w-xl">
                  Tell our AI your occasion, outfit palette, and hand silhouette
                  to receive a bespoke manicure recommendation and styling tips
                  in seconds.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="px-8 py-3.5 bg-ink text-ivory text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-ink/85 transition shadow-sm cursor-pointer"
                  >
                    Start AI Consultation ✦
                  </button>
                  <a
                    href="#products"
                    className="px-6 py-3.5 border border-ink/20 text-ink text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-ink/5 transition"
                  >
                    Browse All Sets
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 bg-ivory border border-ink/10 shadow-xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-ink/10 text-[10px] uppercase tracking-[0.2em] text-ink/60">
                  <span>Atelier Consultation</span>
                  <span className="text-[#C9A961]">Dina AI</span>
                </div>
                <p className="font-display text-xl text-ink mt-5">
                  &ldquo;Quiet Luxury for a Beirut Summer Soirée&rdquo;
                </p>
                <p className="text-xs text-ink/70 mt-2 leading-relaxed font-light">
                  Recommendation: Almond medium with champagne reflection.
                  Illuminates warm golden jewelry and elevates silk textures
                  effortlessly.
                </p>
                <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-ink/60">
                    Matched Set: The Golden Hour ($43)
                  </span>
                  <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="text-[10px] uppercase tracking-[0.18em] text-[#C9A961] font-semibold hover:underline cursor-pointer"
                  >
                    Try Yours →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* The Pressi Ritual (3 steps) */}
      <section id="ritual" className="scroll-mt-24 py-24 bg-ivory">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={headerVariants}
            className="max-w-xl mb-16"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A961] font-medium mb-3">
              The Three-Step Method
            </p>
            <h3 className="font-display text-3xl sm:text-4xl text-ink">
              The Pressi Ritual
            </h3>
            <p className="text-ink/70 text-sm sm:text-base mt-3 font-light">
              Three simple steps, from your sizing kit to your fingertips.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {RITUAL_STEPS.map((item) => (
              <motion.div
                key={item.step}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-8 bg-white/70 border border-ink/10 shadow-xs hover:border-[#C9A961]/40 transition-all duration-300"
              >
                <span
                  className="font-display text-3xl font-medium"
                  style={{ color: item.highlight }}
                >
                  {item.step}
                </span>
                <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-ink/60">
                  {item.label}
                </p>
                <h4 className="font-display text-xl text-ink mt-1">
                  {item.title}
                </h4>
                <p className="text-sm text-ink/70 mt-3 leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What's in the Box + Sizing & Fit */}
      <section
        id="box"
        className="scroll-mt-24 bg-[#E5D5C3]/35 border-y border-ink/10 py-16 sm:py-24"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* What's in the box */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A961] font-medium mb-3">
              The Unboxing
            </p>
            <h3 className="font-display text-3xl sm:text-4xl text-ink">
              What&apos;s in the Box
            </h3>
            <p className="mt-3 text-sm sm:text-base text-ink/70 font-light max-w-md">
              Everything you need to apply your set, plus a few small extras.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-ink/80">
              {BOX_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#C9A961]" aria-hidden="true">
                    ✦
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sizing & fit */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A961] font-medium mb-3">
              Sizing &amp; Fit
            </p>
            <h3 className="font-display text-3xl sm:text-4xl text-ink">
              Your Free Sizing Kit
            </h3>
            <p className="mt-3 text-sm sm:text-base text-ink/70 font-light max-w-md">
              Every PRESSI journey starts with a sizing kit, shipped to your
              door at no cost. Use it to find the sizes that fit your natural
              nails.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <span
                  key={size}
                  className="min-w-12 px-4 py-2.5 text-center text-xs uppercase tracking-[0.16em] bg-ivory border border-ink/15 text-ink"
                >
                  {size}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-ink/70 font-light max-w-md">
              Custom-fit sets are available if you want a tailored match, and
              they ship to you like every order.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story: Meet Dina */}
      <section id="story" className="scroll-mt-24 py-16 sm:py-24 bg-ivory">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A961] font-medium mb-3">
              Our Story
            </p>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight">
              Meet Dina
            </h3>
          </div>
          <div className="lg:col-span-7 space-y-5 text-base text-ink/75 font-light leading-relaxed">
            <p>
              PRESSI was started by Dina Mansour, a Lebanese entrepreneur with a
              background in hospitality. Her love for beautiful nails began in
              childhood.
            </p>
            <p>
              Frustrated by her own salon visits, she set out to build something
              better: beautiful nails you can apply yourself, on your own time.
              Every set is designed and handcrafted by hand in Lebanon, made to
              order, and packed so that opening the box feels special.
            </p>
            <p className="font-display text-xl sm:text-2xl text-ink pt-2">
              Made to Press. Made to Impress.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Menu (phones & tablets). It lives outside <header> because the
          header's backdrop-blur would trap position:fixed children. */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="lg:hidden">
            {/* Dark backdrop, tap to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink/40 z-40 backdrop-blur-xs"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Panel slides in from the left */}
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed top-0 left-0 h-dvh w-[86%] max-w-sm bg-ivory z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10">
                <img
                  src="/brand/logo-pressi-cropped.png"
                  alt="Pressi by Dina"
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="-mr-2 w-11 h-11 flex items-center justify-center text-2xl text-ink/60 hover:text-ink cursor-pointer"
                >
                  ×
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="min-h-14 flex items-center font-display text-2xl text-ink border-b border-ink/10"
                  >
                    {link.label}
                  </a>
                ))}

                {/* AI Stylist entry (only when the flag is on) */}
                {SHOW_AI_STYLIST && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsAiModalOpen(true);
                    }}
                    className="min-h-14 flex items-center gap-2 text-left font-display text-2xl text-ink border-b border-ink/10 cursor-pointer"
                  >
                    ✦ AI Stylist
                  </button>
                )}
              </nav>

              <div className="px-6 py-5 border-t border-ink/10 flex flex-col gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 flex items-center justify-center bg-ink text-ivory text-[11px] uppercase tracking-[0.2em] font-medium"
                >
                  WhatsApp Atelier
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 flex items-center justify-center border border-ink/20 text-ink text-[11px] uppercase tracking-[0.2em] font-medium"
                >
                  Instagram @pressi_dina
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* AI Stylist Modal (hidden while SHOW_AI_STYLIST is false) */}
      {SHOW_AI_STYLIST && (
        <AnimatePresence>
          {isAiModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
                onClick={() => setIsAiModalOpen(false)}
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-2xl bg-ivory border border-ink/15 shadow-2xl p-6 sm:p-8 max-h-[90dvh] overflow-y-auto z-10"
              >
                <div className="flex items-center justify-between pb-4 border-b border-ink/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#C9A961] font-medium">
                      Atelier Consultation
                    </span>
                    <h3 className="font-display text-2xl text-ink">
                      Pressi AI Nail Stylist
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsAiModalOpen(false)}
                    aria-label="Close"
                    className="-mr-2 w-11 h-11 flex items-center justify-center text-2xl text-ink/60 hover:text-ink cursor-pointer"
                  >
                    ×
                  </button>
                </div>

                {!aiResult ? (
                  <div className="mt-6 space-y-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-ink/70 font-medium mb-2">
                        Occasion or Event
                      </label>
                      <input
                        type="text"
                        value={aiOccasion}
                        onChange={(e) => setAiOccasion(e.target.value)}
                        placeholder="e.g. Wedding guest, Boardroom, Weekend getaway"
                        className="w-full bg-white border border-ink/20 px-4 py-2.5 text-base sm:text-sm text-ink focus:outline-hidden focus:border-[#C9A961]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.16em] text-ink/70 font-medium mb-2">
                          Skin Undertone
                        </label>
                        <select
                          value={aiSkinTone}
                          onChange={(e) => setAiSkinTone(e.target.value)}
                          className="w-full bg-white border border-ink/20 px-3 py-2.5 text-base sm:text-sm text-ink focus:outline-hidden focus:border-[#C9A961]"
                        >
                          <option value="Fair Cool / Rosy">Fair Cool / Rosy</option>
                          <option value="Fair Warm / Peach">Fair Warm / Peach</option>
                          <option value="Medium Warm / Olive">
                            Medium Warm / Olive
                          </option>
                          <option value="Tan / Golden">Tan / Golden</option>
                          <option value="Deep Rich / Neutral">
                            Deep Rich / Neutral
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.16em] text-ink/70 font-medium mb-2">
                          Desired Shape
                        </label>
                        <select
                          value={aiDesiredShape}
                          onChange={(e) => setAiDesiredShape(e.target.value)}
                          className="w-full bg-white border border-ink/20 px-3 py-2.5 text-base sm:text-sm text-ink focus:outline-hidden focus:border-[#C9A961]"
                        >
                          <option value="Almond">Almond (Classic)</option>
                          <option value="Coffin">Coffin (Contemporary)</option>
                          <option value="Oval">Oval (Understated)</option>
                          <option value="Square">Square (Editorial)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-ink/70 font-medium mb-2">
                        Outfit / Mood / Jewelry
                      </label>
                      <textarea
                        rows={2}
                        value={aiOutfit}
                        onChange={(e) => setAiOutfit(e.target.value)}
                        placeholder="e.g. Silk gown, stacked gold rings"
                        className="w-full bg-white border border-ink/20 px-4 py-2 text-base sm:text-sm text-ink focus:outline-hidden focus:border-[#C9A961]"
                      />
                    </div>

                    <button
                      disabled={aiLoading}
                      onClick={handleRunAiStylist}
                      className="w-full py-3.5 bg-ink text-ivory text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-ink/85 transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      {aiLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-ivory border-t-transparent rounded-full animate-spin" />
                          <span>Curating Manicure with Gemini...</span>
                        </>
                      ) : (
                        <span>Generate Couture Consultation ✦</span>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 space-y-6">
                    <div className="p-6 bg-white border border-[#C9A961]/40 shadow-xs">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-[#C9A961] font-semibold">
                        Your Bespoke Recommendation
                      </span>
                      <h4 className="font-display text-2xl text-ink mt-1">
                        {aiResult.title}
                      </h4>
                      <div className="flex flex-wrap gap-3 mt-3 text-xs text-ink/60">
                        <span className="px-2.5 py-0.5 bg-[#E5D5C3]/40 border border-ink/10">
                          {aiResult.category}
                        </span>
                        <span className="px-2.5 py-0.5 bg-[#E5D5C3]/40 border border-ink/10">
                          {aiResult.shapeAndLength}
                        </span>
                        <span className="px-2.5 py-0.5 bg-[#E5D5C3]/40 border border-ink/10">
                          {aiResult.finish}
                        </span>
                      </div>

                      <p className="mt-4 text-sm text-ink/75 leading-relaxed font-light">
                        {aiResult.consultationStory}
                      </p>

                      <div className="mt-5 pt-4 border-t border-ink/10">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-ink/50 mb-2 font-medium">
                          Atelier Styling Guidance:
                        </p>
                        <ul className="space-y-1.5 text-xs text-ink/70">
                          {aiResult.stylingTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#C9A961]">✦</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          const matched =
                            products.find(
                              (p) =>
                                p.name.toLowerCase() ===
                                aiResult.suggestedMatchingProduct.toLowerCase()
                            ) || products[2];
                          addToCart(matched);
                          setIsAiModalOpen(false);
                        }}
                        className="flex-1 min-h-11 py-3 bg-ink text-ivory text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-ink/85 transition cursor-pointer"
                      >
                        Add &quot;{aiResult.suggestedMatchingProduct}&quot; to Set
                      </button>
                      <button
                        onClick={() => setAiResult(null)}
                        className="min-h-11 px-6 py-3 border border-ink/20 text-[11px] uppercase tracking-[0.18em] hover:bg-ink/5 transition cursor-pointer"
                      >
                        New Consultation
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink/40 z-40 backdrop-blur-xs"
              onClick={() => setIsCartOpen(false)}
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-dvh w-full max-w-md bg-ivory z-50 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-ink/10">
                <div>
                  <h3 className="font-display text-lg">Your Set</h3>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-ink/60">
                    {totalItems} Selected Items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close cart"
                  className="-mr-2 w-11 h-11 flex items-center justify-center text-2xl leading-none hover:opacity-60 cursor-pointer"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cart.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-ink/60 text-sm">
                      Your set is currently empty.
                    </p>
                    {SHOW_AI_STYLIST ? (
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          setIsAiModalOpen(true);
                        }}
                        className="mt-4 px-4 min-h-11 border border-[#C9A961] text-[10px] uppercase tracking-[0.16em] text-ink hover:bg-[#C9A961] hover:text-ivory transition"
                      >
                        Ask AI Stylist for Recommendation ✦
                      </button>
                    ) : (
                      <a
                        href="#products"
                        onClick={() => setIsCartOpen(false)}
                        className="mt-4 inline-flex min-h-11 items-center px-5 border border-ink/20 text-[10px] uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-ivory transition"
                      >
                        Browse the Collection
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="space-y-5">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between gap-4 p-3 bg-white/60 border border-ink/10"
                      >
                        <div className="flex-1">
                          <p className="font-display text-base text-ink">
                            {item.name}
                          </p>
                          <p className="text-ink/60 text-xs mt-0.5">
                            from ${item.price} each
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="w-11 h-11 border border-ink/15 rounded hover:bg-ink/5 text-base cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="w-11 h-11 border border-ink/15 rounded hover:bg-ink/5 text-base cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-ink/10 px-6 py-5 bg-white/40">
                  {/* Free delivery progress (Lebanon, over $80) */}
                  <p className="text-xs text-ink/70 mb-3">
                    {amountToFreeDelivery > 0
                      ? `Add $${amountToFreeDelivery} more for free delivery.`
                      : 'You have unlocked free delivery ✦'}
                  </p>
                  <div className="flex justify-between mb-2">
                    <span className="font-display text-lg">Estimated total</span>
                    <span className="font-display text-xl">${totalPrice}</span>
                  </div>
                  <p className="text-xs text-ink/60 mb-4">
                    Made to order. Final price, shape, length and sizing are
                    confirmed on WhatsApp.
                  </p>
                  <button
                    onClick={checkoutOnWhatsApp}
                    className="w-full min-h-11 bg-ink text-ivory py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-ink/85 transition cursor-pointer"
                  >
                    Checkout on WhatsApp
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-ink/10 py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-xs text-ink/70">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img
              src="/brand/logo-pressi-cropped.png"
              alt="Pressi by Dina"
              className="h-7 w-auto"
            />
            <span className="tracking-[0.15em] uppercase text-[10px]">
              © 2026 PRESSI by Dina. Beirut, Lebanon. Made to Press. Made to
              Impress.
            </span>
          </div>

          {/* Footer links (each one is at least 44px tall to tap) */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-0 tracking-[0.14em] uppercase text-[10px] [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center [&>button]:min-h-11">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-ink transition"
              >
                {link.label}
              </a>
            ))}
            {SHOW_AI_STYLIST && (
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="text-[#C9A961] font-semibold hover:underline cursor-pointer"
              >
                ✦ AI Stylist
              </button>
            )}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition"
            >
              WhatsApp Atelier
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Shipping & policy line */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-10 pt-6 border-t border-ink/10 flex flex-col md:flex-row md:justify-between gap-2 text-[11px] text-ink/70 text-center md:text-left">
          <p>
            Delivery within Lebanon only for now · Free over $80 · 1-3 business
            days
          </p>
          <p>Every set is made to order. No returns or refunds.</p>
        </div>
      </footer>
    </main>
  );
}

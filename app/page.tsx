'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Hero from '@/components/Hero';

const WHATSAPP_NUMBER = '96170083049';

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

// 4 Iconic Categories matching the Pressi Brand Bible
const categories = [
  {
    id: 'french',
    name: 'The French Edit',
    tagline: 'Modern Minimalist',
    desc: 'Micro-fine tips & milky contours.',
    shape: 'Almond & Oval',
    price_from: '$30',
    accentColor: '#A8B89A',
    image_url:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=90',
  },
  {
    id: 'nude',
    name: 'The Soft Nude',
    tagline: 'Quiet Luxury',
    desc: 'Cashmere dewy nude undertone.',
    shape: 'Coffin & Almond',
    price_from: '$28',
    accentColor: '#E8C7CA',
    image_url:
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=90',
  },
  {
    id: 'gold',
    name: 'The Golden Hour',
    tagline: 'Jewelry Finish',
    desc: '24k gold leaf & radiant gel.',
    shape: 'Almond & Coffin',
    price_from: '$34',
    accentColor: '#C9A961',
    image_url:
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=90',
  },
  {
    id: 'bridal',
    name: 'The Bridal Atelier',
    tagline: 'Couture Glaze',
    desc: 'Pearl luminescence & soft chrome.',
    shape: 'Almond & Square',
    price_from: '$38',
    accentColor: '#E5D5C3',
    image_url:
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=90',
  },
];

// Complete 8-piece Atelier Product Catalog
const products = [
  {
    id: '1',
    name: 'The Everyday French',
    price: 30,
    description: 'Almond · Short / Med / Long',
    category: 'The French Edit',
    categoryId: 'french',
    finish: 'Micro-Line Classic',
    image_url:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=90',
  },
  {
    id: '2',
    name: 'The Soft Nude',
    price: 28,
    description: 'Coffin · Short / Medium',
    category: 'The Soft Nude',
    categoryId: 'nude',
    finish: 'Cashmere Dew',
    image_url:
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=90',
  },
  {
    id: '3',
    name: 'The Golden Hour',
    price: 34,
    description: 'Almond · Medium / Long',
    category: 'The Golden Hour',
    categoryId: 'gold',
    finish: '24k Gold Shimmer',
    image_url:
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=90',
  },
  {
    id: '4',
    name: 'The Pearl Glaze',
    price: 38,
    description: 'Almond · Medium',
    category: 'The Bridal Atelier',
    categoryId: 'bridal',
    finish: 'Pearl Luster',
    image_url:
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=90',
  },
  {
    id: '5',
    name: 'The Sage Marble',
    price: 32,
    description: 'Oval · Medium',
    category: 'The French Edit',
    categoryId: 'french',
    finish: 'Sage & Quartz Vein',
    image_url:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=90',
  },
  {
    id: '6',
    name: 'The Rose Cashmere',
    price: 29,
    description: 'Almond · Short / Medium',
    category: 'The Soft Nude',
    categoryId: 'nude',
    finish: 'Blush Cream Gel',
    image_url:
      'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=800&q=90',
  },
  {
    id: '7',
    name: 'The Champagne Chrome',
    price: 36,
    description: 'Coffin · Medium / Long',
    category: 'The Golden Hour',
    categoryId: 'gold',
    finish: 'Liquid Gold Mirror',
    image_url:
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=90',
  },
  {
    id: '8',
    name: 'The Silk Ceremony',
    price: 42,
    description: 'Almond · Custom Fit',
    category: 'The Bridal Atelier',
    categoryId: 'bridal',
    finish: 'Bridal Crystal Accent',
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

  // AI Stylist Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiOccasion, setAiOccasion] = useState('Quiet Luxury Dinner');
  const [aiSkinTone, setAiSkinTone] = useState('Medium Warm / Olive');
  const [aiDesiredShape, setAiDesiredShape] = useState('Almond');
  const [aiOutfit, setAiOutfit] = useState('Silk cream dress, gold jewelry');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIStylistResult | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pressi-cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        queueMicrotask(() => {
          setCart(parsed);
          setIsLoaded(true);
        });
        return;
      }
    } catch {
      // ignore
    }
    queueMicrotask(() => {
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('pressi-cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

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

  const checkoutOnWhatsApp = () => {
    if (cart.length === 0) return;
    const lines = cart
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.name} × ${i.quantity} — $${i.price * i.quantity}`
      )
      .join('\n');
    const message = `Hi Pressi, I'd like to order:\n\n${lines}\n\nTotal: $${totalPrice}`;
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
    <main className="min-h-screen bg-ivory text-ink selection:bg-[#E5D5C3]">
      {/* Announcement Bar */}
      <div className="bg-ink text-ivory text-[10px] uppercase tracking-[0.22em] py-2.5 px-4 text-center border-b border-ink/20 flex items-center justify-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A961] animate-pulse" />
        <span>Beirut Atelier · Worldwide Delivery over $80</span>
        <span className="hidden md:inline text-[#C9A961]">✦ Fine Nail Jewelry</span>
      </div>

      {/* Redesigned Luxury Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-ivory/90 border-b border-ink/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/brand/logo-pressi-cropped.png"
              alt="Pressi by Dina"
              className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-ink/70">
            <a
              href="#categories"
              className="hover:text-ink transition hover:border-b border-[#C9A961] pb-0.5"
            >
              Haute Categories
            </a>
            <a
              href="#products"
              className="hover:text-ink transition hover:border-b border-[#C9A961] pb-0.5"
            >
              The Collection
            </a>
            <a
              href="#ritual"
              className="hover:text-ink transition hover:border-b border-[#C9A961] pb-0.5"
            >
              The Ritual
            </a>
          </nav>

          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#C9A961] bg-[#E5D5C3]/30 text-[10px] uppercase tracking-[0.18em] font-medium text-ink hover:bg-[#C9A961] hover:text-ivory transition-all shadow-xs cursor-pointer"
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
              <span className="hidden sm:inline">AI Stylist</span>
              <span className="sm:hidden">Stylist</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-ink/20 text-[11px] uppercase tracking-[0.18em] font-medium text-ink hover:bg-ink hover:text-ivory transition-all cursor-pointer"
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

      {/* 4 Iconic Categories Floating Section */}
      <section id="categories" className="max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-14">
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
              <span>Couture Aesthetics</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink font-normal">
              Four Iconic Categories
            </h2>
            <p className="mt-2 text-sm text-ink/65 font-light max-w-lg">
              Click any category card below to filter the collection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-ink/50">
              Active Filter:
            </span>
            <span className="px-3 py-1 bg-[#E5D5C3] border border-ink/10 text-xs font-display text-ink">
              {activeCategory === 'all'
                ? 'All Sets'
                : categories.find((c) => c.id === activeCategory)?.name}
            </span>
            {activeCategory !== 'all' && (
              <button
                onClick={() => setActiveCategory('all')}
                className="text-[10px] uppercase tracking-[0.16em] text-ink/60 hover:text-ink underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </motion.div>

        {/* 4 Interactive Floating Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] font-medium text-ink shadow-xs"
                    style={{ backgroundColor: cat.accentColor }}
                  >
                    {cat.tagline}
                  </div>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg text-ink group-hover:text-[#C9A961] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-ink/70 font-medium">
                    from {cat.price_from}
                  </span>
                </div>

                <p className="mt-2 text-xs text-ink/65 leading-relaxed font-light min-h-[36px]">
                  {cat.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between text-[10px] uppercase tracking-[0.16em]">
                  <span className="text-ink/50">{cat.shape}</span>
                  <span
                    className={`font-medium transition-colors ${
                      isActive ? 'text-[#C9A961]' : 'text-ink/80 group-hover:text-[#C9A961]'
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

      {/* The Collection Section */}
      <section id="products" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 border-t border-ink/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-12 gap-6 border-b border-ink/10 pb-6"
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
            <p className="text-sm text-ink/60 mt-1.5 font-light">
              {activeCategory === 'all'
                ? 'All handcrafted atelier sets in luxury salon gel'
                : `Showing ${
                    categories.find((c) => c.id === activeCategory)?.name
                  }`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em]">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 transition-all border cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-ink text-ivory border-ink'
                  : 'bg-white/60 text-ink/70 border-ink/15 hover:border-ink'
              }`}
            >
              All (8)
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3.5 py-1.5 transition-all border cursor-pointer ${
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

        {/* Product Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredProducts.map((p) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col justify-between bg-white/90 border border-ink/15 p-4.5 shadow-sm hover:shadow-2xl hover:border-ink/40 transition-all duration-300"
            >
              <div>
                <div className="relative overflow-hidden aspect-[4/5] bg-[#EFE7DB] mb-4.5 border border-ink/5">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                  <span className="absolute top-3 left-3 text-[8.5px] uppercase tracking-[0.2em] font-medium text-ivory bg-ink/80 px-2.5 py-1 backdrop-blur-xs">
                    {p.category}
                  </span>
                  <span className="absolute bottom-3 right-3 text-[8px] uppercase tracking-[0.16em] font-medium text-ink/90 bg-[#E5D5C3]/90 px-2 py-0.5 backdrop-blur-xs">
                    {p.finish}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-display text-xl leading-tight text-ink group-hover:text-[#C9A961] transition-colors">
                      {p.name}
                    </h4>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink/55">
                      {p.description}
                    </p>
                  </div>
                  <p className="font-display text-lg text-ink font-medium whitespace-nowrap">
                    ${p.price}
                  </p>
                </div>
              </div>

              <button
                onClick={() => addToCart(p)}
                className="mt-5 w-full border border-ink/20 py-3 text-[10px] uppercase tracking-[0.2em] text-ink font-medium transition-all duration-300 hover:bg-ink hover:text-ivory hover:border-ink cursor-pointer flex items-center justify-center gap-2 group-hover:bg-ink group-hover:text-ivory"
              >
                <span>Add to Set</span>
                <span className="text-xs">→</span>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* AI Couture Stylist Section */}
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
                <span>Gemini-Powered Intelligence</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
                Pressi AI Nail Atelier &amp; Stylist
              </h2>
              <p className="mt-4 text-ink/75 text-base sm:text-lg font-light leading-relaxed max-w-xl">
                Tell our AI your occasion, outfit palette, and hand silhouette.
                Powered by Gemini 3.8 Flash, receive a bespoke manicure recommendation,
                curated nail art finishes, and customized styling tips in seconds.
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
              <p className="text-xs text-ink/65 mt-2 leading-relaxed font-light">
                Recommendation: Almond medium with champagne reflection. Illuminates warm golden jewelry and elevates silk textures effortlessly.
              </p>
              <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.16em] text-ink/50">
                  Matched Set: The Golden Hour ($34)
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

      {/* 3-Step Pressi Ritual section */}
      <section id="ritual" className="py-24 bg-ivory">
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
            <p className="text-ink/65 text-sm sm:text-base mt-3 font-light">
              Salon perfection in ten minutes, designed to last up to three weeks and reusable for multiple occasions.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '01',
                title: 'Size',
                desc: 'Match each nail to your natural nail bed for a seamless, comfortable fit.',
                highlight: '#E8C7CA',
              },
              {
                step: '02',
                title: 'Select',
                desc: 'Choose liquid salon glue for weeks of wear or adhesive tabs for weekend glam.',
                highlight: '#A8B89A',
              },
              {
                step: '03',
                title: 'Press',
                desc: 'Align at a 45° angle at the cuticle line, press firmly for 30 seconds, and glow.',
                highlight: '#C9A961',
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-8 bg-white/70 border border-ink/10 shadow-xs hover:border-[#C9A961]/40 transition-all duration-300"
              >
                <span
                  className="font-display text-3xl font-semibold"
                  style={{ color: item.highlight }}
                >
                  {item.step}
                </span>
                <h4 className="font-display text-xl text-ink mt-4">
                  {item.title}
                </h4>
                <p className="text-sm text-ink/65 mt-2 leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Stylist Modal */}
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
              className="relative w-full max-w-2xl bg-ivory border border-ink/15 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10"
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
                  className="text-2xl text-ink/60 hover:text-ink cursor-pointer"
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
                      className="w-full bg-white border border-ink/20 px-4 py-2.5 text-sm text-ink focus:outline-hidden focus:border-[#C9A961]"
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
                        className="w-full bg-white border border-ink/20 px-3 py-2.5 text-sm text-ink focus:outline-hidden focus:border-[#C9A961]"
                      >
                        <option value="Fair Cool / Rosy">Fair Cool / Rosy</option>
                        <option value="Fair Warm / Peach">Fair Warm / Peach</option>
                        <option value="Medium Warm / Olive">Medium Warm / Olive</option>
                        <option value="Tan / Golden">Tan / Golden</option>
                        <option value="Deep Rich / Neutral">Deep Rich / Neutral</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-ink/70 font-medium mb-2">
                        Desired Shape
                      </label>
                      <select
                        value={aiDesiredShape}
                        onChange={(e) => setAiDesiredShape(e.target.value)}
                        className="w-full bg-white border border-ink/20 px-3 py-2.5 text-sm text-ink focus:outline-hidden focus:border-[#C9A961]"
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
                      className="w-full bg-white border border-ink/20 px-4 py-2 text-sm text-ink focus:outline-hidden focus:border-[#C9A961]"
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
                        const matched = products.find(
                          (p) =>
                            p.name.toLowerCase() ===
                            aiResult.suggestedMatchingProduct.toLowerCase()
                        ) || products[2];
                        addToCart(matched);
                        setIsAiModalOpen(false);
                      }}
                      className="flex-1 py-3 bg-ink text-ivory text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-ink/85 transition cursor-pointer"
                    >
                      Add &quot;{aiResult.suggestedMatchingProduct}&quot; to Set
                    </button>
                    <button
                      onClick={() => setAiResult(null)}
                      className="px-6 py-3 border border-ink/20 text-[11px] uppercase tracking-[0.18em] hover:bg-ink/5 transition cursor-pointer"
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-ivory z-50 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-ink/10">
                <div>
                  <h3 className="font-display text-lg">Your Set</h3>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-ink/50">
                    {totalItems} Selected Items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-2xl leading-none hover:opacity-60 cursor-pointer"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cart.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-ink/50 text-sm">Your set is currently empty.</p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsAiModalOpen(true);
                      }}
                      className="mt-4 px-4 py-2 border border-[#C9A961] text-[10px] uppercase tracking-[0.16em] text-ink hover:bg-[#C9A961] hover:text-ivory transition"
                    >
                      Ask AI Stylist for Recommendation ✦
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between gap-4 p-3 bg-white/60 border border-ink/10"
                      >
                        <div className="flex-1">
                          <p className="font-display text-base text-ink">{item.name}</p>
                          <p className="text-ink/50 text-xs mt-0.5">
                            ${item.price} each
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 border border-ink/15 rounded hover:bg-ink/5 text-sm cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 border border-ink/15 rounded hover:bg-ink/5 text-sm cursor-pointer"
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
                  <div className="flex justify-between mb-4">
                    <span className="font-display text-lg">Total</span>
                    <span className="font-display text-xl">${totalPrice}</span>
                  </div>
                  <button
                    onClick={checkoutOnWhatsApp}
                    className="w-full bg-ink text-ivory py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-ink/85 transition cursor-pointer"
                  >
                    Checkout on WhatsApp
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Editorial Footer */}
      <footer className="border-t border-ink/10 py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-xs text-ink/65">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src="/brand/logo-pressi-cropped.png"
              alt="Pressi by Dina"
              className="h-7 w-auto"
            />
            <span className="tracking-[0.15em] uppercase text-[10px]">
              © 2026 Pressi by Dina. Beirut Atelier.
            </span>
          </div>

          <div className="flex flex-wrap gap-8 tracking-[0.14em] uppercase text-[10px]">
            <a href="#categories" className="hover:text-ink transition">
              Categories
            </a>
            <a href="#products" className="hover:text-ink transition">
              The Collection
            </a>
            <a href="#ritual" className="hover:text-ink transition">
              The Ritual
            </a>
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="text-[#C9A961] font-semibold hover:underline cursor-pointer"
            >
              ✦ AI Stylist
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition"
            >
              WhatsApp Atelier
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

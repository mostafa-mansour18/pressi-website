'use client';

import { motion, useReducedMotion } from 'framer-motion';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=90';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-ivory text-ink">
      <div className="relative z-10 mx-auto grid min-h-[780px] max-w-[1600px] grid-cols-1 items-center gap-12 px-6 py-12 sm:px-10 md:min-h-[760px] md:grid-cols-12 md:gap-12 md:px-14 lg:gap-16 lg:px-20 lg:py-16">
        
        {/* LEFT: editorial copy */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-20 order-1 md:col-span-5 md:pr-4 lg:pr-12"
        >
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-ink/65 sm:text-xs">
              PRESSI BY DINA
            </p>
          </div>

          <h1 className="max-w-[650px] font-display text-[clamp(3.5rem,7vw,7.2rem)] font-normal leading-[0.94] tracking-[-0.055em]">
            Made to<br />Press.<br />
            <span className="italic text-[#A58A56]">
              Made to<br />Impress.
            </span>
          </h1>

          <p className="mt-8 max-w-[360px] text-[15px] leading-[1.9] text-ink/70 sm:text-base">
            Hand-finished press-on nails, made to your shape, length and design. Beirut, Lebanon.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="#products"
              className="group min-h-[54px] border border-ink bg-transparent text-ink hover:bg-ink hover:text-ivory transition-colors duration-300 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] flex items-center gap-4"
            >
              Discover Your Set
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="#story" className="group inline-flex min-h-11 items-center gap-2 py-3 text-xs text-ink/75 transition-colors hover:text-ink">
              <span>Our Story</span>
              <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </a>
          </div>

          <div className="mt-14 flex items-center gap-3 border-t border-ink/10 pt-5">
            <span className="text-sm text-gold">✳</span>
            <p className="text-[9px] uppercase tracking-[0.2em] text-ink/55 sm:text-[10px]">
              Your nails. Your time. Your signature.
            </p>
          </div>
        </motion.div>

        {/* RIGHT: photography */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: reduceMotion ? 0 : 0.15, ease: 'easeOut' }}
          className="relative order-2 min-w-0 md:col-span-7"
        >
          <div className="relative mx-auto aspect-[4/4.8] w-full max-w-[620px] overflow-hidden rounded-sm bg-[#E9DED0] sm:aspect-[4/4.5] md:aspect-[4/5.2] md:max-w-none lg:my-8 lg:mr-8">
            <img
              src={HERO_IMAGE}
              alt="PRESSI press-on nail collection editorial"
              className="absolute inset-0 h-full w-full object-cover sepia-[0.15] contrast-105 brightness-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#34271B]/10 via-transparent to-white/5" />
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 px-1">
            <p className="text-[9px] uppercase tracking-[0.2em] text-ink/55 sm:text-[10px]">Made to feel like you</p>
            <span className="h-px w-10 bg-gold/70" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
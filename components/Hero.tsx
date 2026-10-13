'use client';

// components/Hero.tsx
// PRESSI — luxury editorial hero.
// The photo slot automatically becomes a designed placeholder
// until the agency photography is available.

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';

// Replace this single value with the final photo URL when ready.
// Leave it empty ('') to show the designed ivory-and-beige placeholder card.
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=90';
// paste photo URL here when ready

const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-ivory text-ink">
      {/* Atmospheric gold particles sit behind the content. */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-50">
        <Hero3D />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[780px] max-w-[1600px] grid-cols-1 items-center gap-10 px-6 py-12 sm:px-10 md:min-h-[760px] md:grid-cols-12 md:gap-8 md:px-14 lg:px-20 lg:py-16">
        {/* LEFT: editorial copy and clear shopping action. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-20 order-1 md:col-span-5 md:pr-2 lg:pr-8"
        >
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-ink/65 sm:text-xs">
              PRESSI BY DINA
            </p>
          </div>

          {/* Headline: first sentence upright, second sentence italic gold.
              Each line is short, so it never wraps awkwardly on phones. */}
          <h1 className="max-w-[650px] font-display text-[clamp(3.5rem,6.5vw,6.6rem)] font-normal leading-[0.94] tracking-[-0.055em]">
            Made to
            <br />
            Press.
            <br />
            <span className="italic text-[#A58A56]">
              Made to
              <br />
              Impress.
            </span>
          </h1>

          <p className="mt-7 max-w-[360px] text-[15px] leading-[1.9] text-ink/70 sm:text-base">
            Hand-finished press-on nails, made to your shape, length and
            design. Beirut, Lebanon.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="#products"
              className="group inline-flex min-h-[54px] items-center justify-center gap-8 border border-ink bg-ink px-6 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-300 hover:bg-transparent hover:text-ink sm:px-7"
            >
              Discover Your Set
              <span
                aria-hidden="true"
                className="text-base transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>

            <a
              href="#story"
              className="group inline-flex min-h-11 items-center gap-2 py-3 text-xs text-ink/75 transition-colors hover:text-ink"
            >
              <span>Our Story</span>
              <span
                aria-hidden="true"
                className="text-gold transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
          </div>

          <div className="mt-12 flex items-center gap-3 border-t border-ink/10 pt-5">
            <span className="text-sm text-gold" aria-hidden="true">
              ✳
            </span>
            <p className="text-[9px] uppercase tracking-[0.2em] text-ink/55 sm:text-[10px]">
              Your nails. Your time. Your signature.
            </p>
          </div>
        </motion.div>

        {/* RIGHT: photography or intentional temporary art direction. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: reduceMotion ? 0 : 0.15,
            ease: 'easeOut',
          }}
          className="relative order-2 min-w-0 md:col-span-7"
        >
          <div className="relative mx-auto aspect-[4/4.8] w-full max-w-[620px] overflow-hidden bg-[#E9DED0] sm:aspect-[4/4.5] md:aspect-[4/5.2] md:max-w-none">
            {HERO_IMAGE ? (
              // The agency photo replaces the placeholder automatically.
              // Use a well-composed portrait or editorial nail photograph.
              <img
                src={HERO_IMAGE}
                alt="PRESSI press-on nail collection editorial"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              // Designed placeholder: warm, quiet, and intentional.
              <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(145deg,#F5F0E8_0%,#E9DED0_48%,#DCC8B5_100%)]">
                {/* Soft, oversized light forms add depth without fake nails. */}
                <div className="absolute -right-[20%] -top-[8%] h-[58%] w-[78%] rounded-full bg-[#FFFDF7]/45 blur-3xl" />
                <div className="absolute -bottom-[12%] -left-[12%] h-[55%] w-[75%] rounded-full bg-[#C9A961]/10 blur-3xl" />

                {/* Fine frame creates a considered editorial composition. */}
                <div className="absolute inset-[18px] border border-white/50 sm:inset-6 md:inset-8" />

                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  {/* PRESSI's champagne-gold four-point sparkle. */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 64 64"
                    className="mb-7 h-12 w-12 text-gold sm:h-14 sm:w-14"
                    fill="none"
                  >
                    <path
                      d="M32 2C35.4 19.5 44.5 28.6 62 32C44.5 35.4 35.4 44.5 32 62C28.6 44.5 19.5 35.4 2 32C19.5 28.6 28.6 19.5 32 2Z"
                      fill="currentColor"
                    />
                    <circle cx="51" cy="12" r="2" fill="currentColor" />
                    <circle cx="12" cy="49" r="1.5" fill="currentColor" />
                  </svg>

                  <p className="font-display text-4xl italic leading-tight tracking-[-0.035em] text-[#514536] sm:text-5xl md:text-6xl">
                    The Pressi
                    <br />
                    ritual
                  </p>

                  <span className="mt-6 h-px w-9 bg-gold/80" />

                  <p className="mt-5 text-[9px] uppercase tracking-[0.27em] text-[#665848]/75 sm:text-[10px]">
                    A moment, just for you
                  </p>
                </div>

                <p className="absolute bottom-8 left-0 right-0 text-center text-[8px] uppercase tracking-[0.25em] text-[#665848]/55 sm:bottom-10 sm:text-[9px]">
                  PRESSI BY DINA · EST. IN BEAUTY
                </p>
              </div>
            )}

            {/* Gentle image tint gives future photography a cohesive warmth. */}
            {HERO_IMAGE && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#34271B]/10 via-transparent to-white/5"
              />
            )}
          </div>

          {/* Small editorial caption outside the image frame. */}
          <div className="mt-4 flex items-center justify-between gap-4 px-1">
            <p className="text-[9px] uppercase tracking-[0.2em] text-ink/55 sm:text-[10px]">
              Made to feel like you
            </p>
            <span className="h-px w-10 bg-gold/70" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

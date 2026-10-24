import Image from 'next/image';

type Guide = {
  id: string;
  title: string;
  blurb: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  // Minimum width on small screens so the small text in the image stays readable
  scrollWidth: string;
};

const GUIDES: Guide[] = [
  {
    id: 'shape-guide',
    title: 'Shape guide',
    blurb:
      'Almond, oval, square, coffin or stiletto. Compare each one from the top and the side to find the shape that suits your hands.',
    src: '/images/pressi-shape-guide.png',
    alt: 'Pressi shape guide showing almond, oval, square, coffin and stiletto nails in top view and side view',
    width: 1536,
    height: 1024,
    scrollWidth: 'min-w-[900px]',
  },
  {
    id: 'application-kit',
    title: 'Application kit',
    blurb:
      'Nail glue, an alcohol wipe, a cuticle pusher, a small file and a small buffer. This is what you use to prepare your nails and press on your set.',
    src: '/images/pressi-application-kit.png',
    alt: 'Pressi application kit: nail glue, alcohol wipe, cuticle pusher, small file and small buffer',
    width: 1312,
    height: 1199,
    scrollWidth: 'min-w-[820px]',
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-dvh bg-ivory text-ink selection:bg-[#E5D5C3]">
      <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 sm:py-20 lg:py-24">
        {/* Page heading */}
        <header className="mx-auto max-w-2xl text-center">
          <img
            src="/brand/logo-pressi-cropped.png"
            alt="Pressi by Dina"
            className="mx-auto h-9 w-auto sm:h-10"
          />
          <h1 className="mt-10 font-display text-4xl font-light leading-tight sm:text-5xl">
            Before you order
          </h1>
          <p className="mx-auto mt-4 max-w-prose text-base font-light leading-relaxed text-ink/70 sm:text-lg">
            Choose the shape that suits your hands, and see what you will use to
            apply your set.
          </p>
        </header>

        {/* The two guides: stacked on phones and tablets, side by side on wide screens */}
        <div className="mt-14 grid items-start gap-14 sm:mt-20 xl:grid-cols-2 xl:gap-10">
          {GUIDES.map((guide, index) => (
            <section key={guide.id} aria-labelledby={`${guide.id}-title`}>
              <h2
                id={`${guide.id}-title`}
                className="font-display text-2xl font-normal sm:text-3xl"
              >
                {guide.title}
              </h2>
              <p className="mt-3 max-w-prose text-sm font-light leading-relaxed text-ink/70 sm:text-base">
                {guide.blurb}
              </p>

              {/* Soft cream frame with a subtle rounded corner */}
              <div className="mt-6 rounded-2xl border border-ink/10 bg-[#F3ECE2] p-2 sm:p-3">
                {/* Scrolls sideways on small screens, normal size from lg up */}
                <div
                  role="region"
                  aria-label={`${guide.title} image, scrolls sideways on small screens`}
                  tabIndex={0}
                  className="overflow-x-auto rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/40 lg:overflow-visible"
                >
                  <Image
                    src={guide.src}
                    alt={guide.alt}
                    width={guide.width}
                    height={guide.height}
                    priority={index === 0}
                    sizes="(min-width: 1280px) 600px, (min-width: 1024px) 960px, 900px"
                    className={`h-auto w-full rounded-xl ${guide.scrollWidth} lg:min-w-0`}
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 text-sm text-ink/60">
                <p className="lg:hidden">Swipe sideways to read the details.</p>
                <a
                  href={guide.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-ink"
                >
                  View full size
                </a>
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 text-center font-display text-lg italic text-ink/70">
          Made to Press. Made to Impress.
        </p>
      </div>
    </main>
  );
}
// components/hero.jsx
'use client';

import Image from 'next/image';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Changed to framer-motion for consistency with common Next.js usage, assuming you use it or similar lib
import { Button } from '@/components/ui/button';

// --- SLIDE DATA (Kept the same) ---
const SLIDES = [
  {
    headline: 'Custom shelves that feel built-in.',
    subhead:
      'Upgrade cabinets, pantries, closets, and awkward spaces with tailored shelving made to fit.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
    alt: 'Custom pantry shelving',
  },
  {
    headline: 'Organize your space—beautifully.',
    subhead:
      'Minimal, durable designs that make everyday life smoother (and your home feel calmer).',
    image:
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1800&q=80',
    alt: 'Closet organization shelving',
  },
  {
    headline: 'Made by a small, women-owned shop.',
    subhead:
      'Crafted with care, measured for your needs, and finished for a polished, premium look.',
    image:
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1800&q=80',
    alt: 'Woodworking and shelving craftsmanship',
  },
];

// --- HERO COMPONENT ---

export default function Hero() {
  const [index, setIndex] = React.useState(0);
  const headerRef = React.useRef(null);
  const isMounted = React.useRef(true); // For cleanup safety

  // 1. Logic to set the CSS variable for Header Height
  const setHeaderHeightVariable = React.useCallback(() => {
    // Attempt to find the sticky header element by its tag or class/ID
    // Assuming the header is the first sticky element or we can query it
    const headerElement = document.querySelector('header.sticky');

    if (headerElement) {
      // Get the current height of the header element (which changes on scroll)
      const height = headerElement.offsetHeight;
      // Set the CSS variable on the document root
      document.documentElement.style.setProperty(
        '--header-height',
        `${height}px`
      );
    } else {
      // Fallback if header is not found or not mounted yet
      document.documentElement.style.setProperty('--header-height', '200px');
    }
  }, []);

  React.useEffect(() => {
    isMounted.current = true;
    setHeaderHeightVariable(); // Set height initially

    const handleScroll = () => {
      // Throttle or debounce this in production for performance, but for this context,
      // direct call on scroll works to instantly update the hero's height when the header shrinks.
      if (isMounted.current) {
        setHeaderHeightVariable();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      isMounted.current = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [setHeaderHeightVariable]);

  // 2. Carousel Interval
  React.useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[index];

  return (
    <section
      className='relative flex flex-col justify-end overflow-hidden'
      // FIX 1: Calculate the hero height based on the viewport minus the header's current height
      style={{ minHeight: 'calc(100vh - var(--header-height, 220px))' }}
    >
      {/* --- BACKGROUND IMAGE CAROUSEL --- */}
      <div className='absolute inset-0 -z-10'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={slide.image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className='absolute inset-0'
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority
              className='object-cover'
              sizes='100vw'
            />
            {/* FIX 2: Darker overlay for better text contrast and professional depth */}
            <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10' />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- HERO CONTENT CONTAINER --- */}
      <div className='mx-auto flex w-full max-w-6xl grow items-center px-4 pt-16 pb-24 md:px-8 md:py-24'>
        <div className='grid items-end gap-8 md:grid-cols-12'>
          {/* --- LEFT: TEXT & CTA --- */}
          <div className='md:col-span-7'>
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className='inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm'
            >
              Custom shelving & storage solutions
            </motion.p>

            {/* Headline */}
            <AnimatePresence mode='wait'>
              <motion.h1
                key={slide.headline}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className='mt-4 text-balance text-5xl font-extrabold tracking-tight text-white md:text-7xl drop-shadow-lg' // Increased font size/weight
              >
                {slide.headline}
              </motion.h1>
            </AnimatePresence>

            {/* Subhead / Description */}
            <AnimatePresence mode='wait'>
              <motion.p
                key={slide.subhead}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className='mt-4 max-w-xl text-pretty text-lg text-white/90 md:text-xl drop-shadow-md'
              >
                {slide.subhead}
              </motion.p>
            </AnimatePresence>

            {/* Call to Action Buttons */}
            <div className='mt-8 flex flex-wrap gap-4'>
              <Button
                className='rounded-full h-12 px-8 text-base font-bold bg-(--brand) hover:bg-(--brand-dark)'
                asChild
              >
                <a href='#shop'>Start Building Now</a>
              </Button>
              <Button
                variant='secondary'
                className='rounded-full h-12 px-8 text-base font-semibold'
                asChild
              >
                <a href='#how'>See How It Works</a>
              </Button>
            </div>

            {/* Carousel Dots */}
            <div className='mt-10 flex items-center gap-2'>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={[
                    'h-3 w-3 rounded-full transition-all',
                    i === index
                      ? 'bg-white w-10'
                      : 'bg-white/50 hover:bg-white/80', // Active dot is longer
                  ].join(' ')}
                />
              ))}
            </div>
          </div>

          {/* --- RIGHT: Quick Links / Promo Card --- */}
          <div className='md:col-span-5 self-end'>
            {' '}
            {/* self-end ensures the box sits near the bottom */}
            <div className='rounded-3xl border border-white/20 bg-white/15 p-6 text-white backdrop-blur-md shadow-xl'>
              <div className='text-sm font-bold uppercase tracking-wider'>
                Popular Spaces
              </div>
              <div className='mt-4 grid grid-cols-3 gap-3 text-sm'>
                {[
                  'Pantries',
                  'Closets',
                  'Cabinets',
                  'Laundry',
                  'Garage',
                  'Office',
                ].map((t) => (
                  <span
                    key={t}
                    className='rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-center text-white font-medium hover:bg-white/20 transition cursor-pointer'
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className='mt-5 text-xs text-white/70'>
                All products are custom-sized to your exact measurements. Start
                designing or get a free consultation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Anchor targets */}
      <div id='shop' className='h-1' />
      <div id='how' className='h-1' />
      <div id='reviews' className='h-1' />
      <div id='faq' className='h-1' />
    </section>
  );
}

// components/reviews.jsx (Auto-Scrolling Marquee)
'use client';

import { Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming Button component is available

// Define a richer set of testimonials for the marquee effect
const TESTIMONIALS = [
  {
    name: 'Amanda R.',
    title: 'Pantry Upgrade',
    quote:
      'The shelves fit like they were always part of the cabinet. My pantry went from chaos to calm.',
    rating: 5,
  },
  {
    name: 'Tiffany K.',
    title: 'Closet Organization',
    quote:
      'Clean, sturdy, and beautiful. The measurements were perfect and the finish looks premium. I highly recommend!',
    rating: 5,
  },
  {
    name: 'Jenna S.',
    title: 'Kitchen Storage',
    quote:
      'Fast communication and thoughtful craftsmanship. It feels custom in the best way. Absolutely thrilled with the final result.',
    rating: 5,
  },
  {
    name: 'Mark D.',
    title: 'Garage Workbench',
    quote:
      'Solid construction and perfect size. They turned my messy garage into a functional workspace.',
    rating: 5,
  },
  {
    name: 'Sarah L.',
    title: 'Home Office Bookshelves',
    quote:
      'The Dark Walnut stain is stunning. Excellent customer service and quick delivery of the custom pieces.',
    rating: 4,
  },
  {
    name: 'Chris W.',
    title: 'Laundry Room',
    quote:
      'Finally, organization! The quality is fantastic, far better than off-the-shelf options.',
    rating: 5,
  },
];

// To create the infinite loop effect, we duplicate the array.
// This ensures that as the first set scrolls off, the second set seamlessly appears.
const SCROLLING_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS];

// Helper component to render stars
const StarRating = ({ rating }) => (
  <div className='flex items-center space-x-0.5'>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 fill-yellow-500 transition-colors ${
          i < rating ? 'text-yellow-500' : 'text-gray-300'
        }`}
      />
    ))}
  </div>
);

export default function Reviews() {
  return (
    <div className='space-y-12' id='reviews'>
      {/* --- Section Header --- */}
      <div>
        <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
          Trusted by Customers:{' '}
          <span className='text-(--brand)'>4.9/5 Star Average</span>
        </h2>
        <p className='mt-3 max-w-3xl text-lg text-muted-foreground'>
          Trust comes from consistency—clean builds, accurate fit, and a
          polished finish. See what homeowners are saying about their custom
          shelving.
        </p>
      </div>

      {/* --- Testimonial Marquee Container --- */}
      <div
        className='sc-marquee-wrap overflow-hidden relative py-6'
        // Define the duration for the marquee animation. Lower value means faster scroll.
        style={{ '--sc-marquee-duration': '50s' }}
      >
        <div
          className='sc-marquee-track flex'
          // Use min-w-max to ensure the entire concatenated array can fit on one line
        >
          {SCROLLING_TESTIMONIALS.map((t, idx) => (
            // Card wrapper must be inline-block with a fixed width
            <div
              key={`${t.name}-${idx}`}
              className='flex-none w-85 md:w-100 lg:w-112.5 p-4' // Fixed width for scroll consistency
            >
              <div className='relative flex flex-col justify-between h-full rounded-xl border border-border/80 bg-card p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
                {/* Quote Icon */}
                <Quote className='absolute right-5 top-5 h-8 w-8 text-muted/50' />

                {/* Rating */}
                <StarRating rating={t.rating} />

                {/* Quote Text */}
                <p className='mt-4 text-lg font-medium leading-relaxed text-foreground'>
                  “{t.quote}”
                </p>

                {/* Author Info */}
                <div className='mt-6 border-t pt-4'>
                  <div className='text-base font-bold text-foreground'>
                    {t.name}
                  </div>
                  <div className='text-sm text-muted-foreground'>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* End Marquee Container */}

      {/* --- CTA Block --- */}
      <div className='flex justify-center'>
        <div className='w-full max-w-xl rounded-2xl border bg-muted/30 p-5 text-sm text-center'>
          <p className='font-semibold text-foreground'>
            Ready to start your project?
          </p>
          <p className='mt-1 text-muted-foreground'>
            We can integrate real review feeds (Shopify, Loox, etc.) when your
            site goes live to showcase live social proof.
          </p>
          <Button
            variant='link'
            className='mt-2 text-sm font-semibold text-(--brand) hover:text-(--brand-dark)'
          >
            Read All {TESTIMONIALS.length * 20}+ Reviews →
          </Button>
        </div>
      </div>
    </div>
  );
}

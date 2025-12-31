// components/site-footer.jsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Instagram, Facebook } from 'lucide-react';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t bg-linear-to-b from-background to-(--brand-2)/10 pt-16 pb-8'>
      <div className='mx-auto w-full max-w-7xl px-4 lg:px-8'>
        {/* --- MAIN GRID AREA --- */}
        <div className='grid gap-12 md:grid-cols-12'>
          {/* --- COLUMN 1: Brand Info & Newsletter (Larger block) --- */}
          <div className='md:col-span-5 lg:col-span-4'>
            {/* Brand Title (Use Brand Ink for contrast) */}
            <div className='text-2xl font-extrabold text-(--brand-ink)'>
              Shelf Crafters
            </div>

            <p className='mt-3 max-w-sm text-base text-muted-foreground'>
              Women-owned custom shelving & storage solutions—tailored for
              cabinets, pantries, closets, and more.
            </p>

            {/* Newsletter: Elevated and using the primary brand color for impact */}
            <div className='mt-8 rounded-xl bg-(--brand) text-white p-5 shadow-xl'>
              <div className='flex items-center text-lg font-bold text-white mb-2'>
                <Mail className='h-5 w-5 mr-2' /> Get Shelf Design Tips
              </div>
              <p className='text-sm text-white/90'>
                Join our newsletter for new product drops, storage ideas, and
                exclusive seasonal promos.
              </p>

              <div className='mt-4 flex gap-2'>
                <Input
                  placeholder='Enter your email'
                  type='email'
                  className='h-10 bg-white text-black placeholder:text-gray-500 rounded-lg border-0 focus:ring-2 focus:ring-white'
                />
                <Button className='h-10 px-4 rounded-lg bg-(--brand-ink) hover:bg-black transition-colors'>
                  Sign up
                </Button>
              </div>

              <p className='mt-2 text-xs text-white/70'>
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* --- COLUMN 2: Navigation Links & Social (Wider use of columns) --- */}
          <div className='grid gap-10 md:col-span-7 lg:col-span-8 md:grid-cols-4'>
            {/* Shop Links */}
            <div className='space-y-4'>
              <div className='text-base font-bold text-foreground border-b pb-2 mb-2'>
                Shop
              </div>
              <ul className='space-y-3 text-sm'>
                <li>
                  <a
                    className='hover:text-foreground text-muted-foreground transition-colors'
                    href='#shop'
                  >
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a
                    className='hover:text-foreground text-muted-foreground transition-colors'
                    href='#how'
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    className='hover:text-foreground text-muted-foreground transition-colors'
                    href='#reviews'
                  >
                    Customer Stories
                  </a>
                </li>
                <li>
                  <Link
                    className='hover:text-foreground text-muted-foreground transition-colors'
                    href='/customizer'
                  >
                    Design Your Shelf
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className='space-y-4'>
              <div className='text-base font-bold text-foreground border-b pb-2 mb-2'>
                Company
              </div>
              <ul className='space-y-3 text-sm'>
                <li>
                  <Link
                    className='hover:text-foreground text-muted-foreground transition-colors'
                    href='/about'
                  >
                    About Shelf Crafters
                  </Link>
                </li>
                <li>
                  <Link
                    className='hover:text-foreground text-muted-foreground transition-colors'
                    href='/contact'
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className='hover:text-foreground text-muted-foreground transition-colors'
                    href='/sustainability'
                  >
                    Our Wood Source
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div className='space-y-4'>
              <div className='text-base font-bold text-foreground border-b pb-2 mb-2'>
                Support
              </div>
              <ul className='space-y-3 text-sm'>
                <li>
                  <a
                    className='hover:text-foreground text-muted-foreground transition-colors'
                    href='#faq'
                  >
                    FAQ & Help Center
                  </a>
                </li>
                <li>
                  <Link
                    className='hover:text-foreground text-muted-foreground transition-colors'
                    href='/shipping'
                  >
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link
                    className='hover:text-foreground text-muted-foreground transition-colors'
                    href='/terms'
                  >
                    Legal & Terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Column (New) */}
            <div className='space-y-4'>
              <div className='text-base font-bold text-foreground border-b pb-2 mb-2'>
                Connect
              </div>
              <div className='flex gap-4'>
                <a
                  href='#'
                  aria-label='Instagram'
                  className='text-muted-foreground hover:text-(--brand) transition-colors'
                >
                  <Instagram className='h-6 w-6' />
                </a>
                <a
                  href='#'
                  aria-label='Facebook'
                  className='text-muted-foreground hover:text-(--brand) transition-colors'
                >
                  <Facebook className='h-6 w-6' />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- COPYRIGHT/BOTTOM BAR --- */}
        <div className='mt-12 flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between'>
          <div className='order-2 md:order-1'>
            © {currentYear} Shelf Crafters. All rights reserved.
          </div>
          <div className='order-1 md:order-2 flex gap-4 text-xs font-semibold uppercase tracking-wider'>
            <span>Made with care.</span>
            <span className='hidden md:inline'>|</span>
            <span>Crafted for everyday life.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

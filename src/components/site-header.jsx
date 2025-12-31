'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Menu, ShoppingBag, Search, User, ChevronRight, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

// Replace these with your actual components
import { useCart } from '@/components/cart/cart-provider';
import SearchDialog from '@/components/search-dialog';
import AnnouncementBar from '@/components/announcement-bar';

// --- Data Constants (Kept as is) ---
const SHOP_ITEMS = [
  {
    title: 'Cabinet Shelves',
    href: '/collections/cabinet-shelves',
    desc: 'Custom-fit kitchen storage',
  },
  {
    title: 'Pantry Organizers',
    href: '/collections/pantry',
    desc: 'Maximize your dry storage',
  },
  {
    title: 'Closet Shelving',
    href: '/collections/closet',
    desc: 'Tailored wardrobe layouts',
  },
  {
    title: 'Floating Shelves',
    href: '/collections/floating',
    desc: 'Modern minimalist displays',
  },
  {
    title: 'Shelf Add-ons',
    href: '/collections/accessories',
    desc: 'Dividers, risers & more',
  },
  {
    title: 'Samples',
    href: '/products/samples',
    desc: 'Test finishes in your home',
  },
];

const LEARN_ITEMS = [
  {
    title: 'How It Works',
    href: '/pages/how-it-works',
    desc: 'Our measure-to-fit process',
  },
  {
    title: 'Installation',
    href: '/pages/installation',
    desc: 'DIY guides and videos',
  },
  { title: 'FAQs', href: '/pages/faq', desc: 'Common questions answered' },
  {
    title: 'Materials',
    href: '/pages/materials',
    desc: 'Wood types and finish options',
  },
];

export default function SiteHeader() {
  const { count } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger effect after scrolling 50px
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnnouncementBar
        speed={140}
        items={[
          { text: 'Free shipping on all orders over $200' },
          { text: 'Handcrafted in the USA' },
          { text: 'Current lead time: 2-3 weeks' },
        ]}
      />

      <motion.header
        className={cn(
          'sticky top-0 z-50 w-full border-b transition-all duration-500 ease-in-out',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm'
            : 'bg-background/50 border-transparent'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className={cn(
            'mx-auto grid w-full max-w-360 grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8 lg:px-12 transition-all duration-500 ease-in-out',
            // Conditional padding/alignment on the content wrapper for unscrolled state
            !isScrolled && 'py-1 md:py-2' // Added a very slight padding to lift content off the top/bottom edge
          )}
        >
          {/* --- LEFT: Navigation (Desktop) / Trigger (Mobile) --- */}
          <div className='flex items-center justify-start'>
            {/* Mobile Hamburger */}
            <div className='lg:hidden'>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant='ghost' size='icon' className='-ml-2'>
                    <Menu className='h-7 w-7 stroke-[1.5]' />
                  </Button>
                </SheetTrigger>
                <SheetContent side='left' className='w-full max-w-87.5 p-0'>
                  <MobileMenuContent
                    closeMenu={() => setMobileMenuOpen(false)}
                    shopItems={SHOP_ITEMS}
                    learnItems={LEARN_ITEMS}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden lg:block'>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavMenuTrigger title='SHOP'>
                    <MegaMenuContent items={SHOP_ITEMS} category='SHOP' />
                  </NavMenuTrigger>

                  <NavMenuTrigger title='LEARN'>
                    <MegaMenuContent
                      items={LEARN_ITEMS}
                      category='LEARN'
                      layout='simple'
                    />
                  </NavMenuTrigger>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href='/pages/about' className={navLinkClasses()}>
                        ABOUT
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* --- CENTER: Logo --- */}
          <div className='flex items-center justify-center'>
            <Link href='/' className='group relative block'>
              <motion.div
                layout
                className='relative flex items-center justify-center'
              >
                <Image
                  src='/logo.png'
                  alt='Shelf Crafters'
                  width={600}
                  height={220}
                  priority
                  className={cn(
                    'w-auto object-contain transition-all duration-500 ease-in-out',
                    isScrolled ? 'h-10 md:h-20' : 'h-35 md:h-55'
                  )}
                />
              </motion.div>
            </Link>
          </div>

          {/* --- RIGHT: Utilities --- */}
          <div className='flex items-center justify-end gap-1 md:gap-3'>
            <SearchDialog
              trigger={
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-foreground/80 hover:text-foreground'
                >
                  <Search className='h-6 w-6 stroke-[1.5]' />
                </Button>
              }
            />

            <Link href='/account' className='hidden md:inline-flex'>
              <Button
                variant='ghost'
                size='icon'
                className='text-foreground/80 hover:text-foreground'
              >
                <User className='h-6 w-6 stroke-[1.5]' />
              </Button>
            </Link>

            <Button
              variant='ghost'
              size='icon'
              className='group relative text-foreground/80 hover:text-foreground'
            >
              <ShoppingBag className='h-6 w-6 stroke-[1.5]' />
              {count > 0 && (
                <span className='absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-(--brand) text-[10px] font-bold text-white shadow-sm ring-1 ring-background'>
                  {count}
                </span>
              )}
            </Button>
          </div>
        </div>
      </motion.header>
    </>
  );
}

// --- SUB-COMPONENTS (Kept the same) ---

function navLinkClasses() {
  return cn(
    navigationMenuTriggerStyle(),
    'bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent',
    'text-[12px] font-bold tracking-[0.15em] uppercase text-foreground/80 hover:text-foreground transition-colors cursor-pointer'
  );
}

// Wrapper for the Menu Triggers
function NavMenuTrigger({ title, children }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={navLinkClasses()}>
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>{children}</NavigationMenuContent>
    </NavigationMenuItem>
  );
}

// Desktop Mega Menu Content
function MegaMenuContent({ items, category }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className='w-200 p-6' // Corrected width value
    >
      <div className='grid grid-cols-12 gap-8'>
        {/* Navigation Links Column */}
        <div className='col-span-4 space-y-4'>
          <h4 className='text-xs font-bold tracking-widest text-muted-foreground mb-4 border-b pb-2'>
            {category} BY CATEGORY
          </h4>
          <ul className='space-y-3'>
            {items.map((item) => (
              <li key={item.title}>
                <NavigationMenuLink asChild>
                  <Link href={item.href} className='group block'>
                    <div className='text-sm font-medium text-foreground/90 group-hover:text-(--brand) transition-colors'>
                      {item.title}
                    </div>
                    <div className='text-[11px] text-muted-foreground group-hover:text-muted-foreground/80 line-clamp-1'>
                      {item.desc}
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual / Promo Column */}
        <div className='col-span-8'>
          <div className='grid grid-cols-2 gap-4 h-full'>
            <PromoCard
              title='New Arrivals'
              subtitle='Spring Collection'
              image='/hero/pantry.jpg'
              href='/collections/new'
            />
            <PromoCard
              title='Best Sellers'
              subtitle='Customer Favorites'
              image='/hero/closet.jpg'
              href='/collections/best-sellers'
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PromoCard({ title, subtitle, image, href }) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className='group relative block h-full w-full overflow-hidden rounded-lg bg-muted'
      >
        <Image
          src={image}
          alt={title}
          fill
          className='object-cover transition-transform duration-700 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent' />
        <div className='absolute bottom-4 left-4 text-white'>
          <p className='text-[10px] uppercase tracking-wider font-medium opacity-90'>
            {subtitle}
          </p>
          <p className='text-lg font-bold tracking-wide'>{title}</p>
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

// --- MOBILE MENU (Kept the same) ---

function MobileMenuContent({ closeMenu, shopItems, learnItems }) {
  return (
    <div className='flex flex-col h-full bg-background'>
      <SheetHeader className='px-6 py-4 border-b flex flex-row items-center justify-between'>
        <SheetTitle className='text-lg font-bold tracking-tight'>
          Menu
        </SheetTitle>
      </SheetHeader>

      <ScrollArea className='flex-1 px-6 py-6'>
        <div className='flex flex-col space-y-8'>
          {/* Shop Section */}
          <div className='space-y-3'>
            <h4 className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>
              Shop
            </h4>
            <div className='grid gap-2'>
              {shopItems.map((item) => (
                <MobileLink
                  key={item.title}
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.title}
                </MobileLink>
              ))}
            </div>
          </div>

          <Separator />

          {/* Learn Section */}
          <div className='space-y-3'>
            <h4 className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>
              Company
            </h4>
            <div className='grid gap-2'>
              {learnItems.map((item) => (
                <MobileLink
                  key={item.title}
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.title}
                </MobileLink>
              ))}
              <MobileLink href='/contact' onClick={closeMenu}>
                Contact Us
              </MobileLink>
            </div>
          </div>

          <div className='pt-4'>
            <Button
              className='w-full rounded-full'
              size='lg'
              onClick={closeMenu}
            >
              Sign In / Register
            </Button>
          </div>
        </div>
      </ScrollArea>

      <div className='border-t p-6 bg-muted/20'>
        <p className='text-xs text-center text-muted-foreground'>
          &copy; 2024 Shelf Crafters
        </p>
      </div>
    </div>
  );
}

function MobileLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className='flex items-center justify-between py-2 text-base font-medium transition-colors hover:text-(--brand)'
    >
      {children}
      <ChevronRight className='h-4 w-4 text-muted-foreground/50' />
    </Link>
  );
}

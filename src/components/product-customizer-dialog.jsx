// components/product-customizer-dialog.jsx (FINAL FIXES - Footer Overlap Resolution)
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, X, Zap } from 'lucide-react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useCart } from '@/components/cart/cart-provider'; // To handle Add to Cart

function formatMoney(price) {
  if (!price) return '—';
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: price.currencyCode || 'USD',
      maximumFractionDigits: 0,
    }).format(price.amount);
  } catch {
    return `${price.amount} ${price.currencyCode}`;
  }
}

// Placeholder form options for custom shelving
const FINISHES = [
  'Dark Walnut',
  'White Oak',
  'Maple',
  'Natural Finish',
  'Grey Wash',
];
const EDGE_STYLES = ['Bullnose', 'Square Edge', 'Pencil Round', 'Chamfer'];

export default function ProductCustomizerDialog({ product }) {
  const { increment } = useCart();
  const [selectedFinish, setSelectedFinish] = React.useState(FINISHES[0]);
  const [selectedEdge, setSelectedEdge] = React.useState(EDGE_STYLES[0]);
  const [width, setWidth] = React.useState('36');
  const [depth, setDepth] = React.useState('12');

  const img = product?.image;
  const productLink = `/products/${product.handle || product.id}`;

  const handleAddToCart = () => {
    console.log(
      `Adding ${product.title} to cart with options: ${selectedFinish}, W:${width}, D:${depth}`
    );
    increment();
  };

  return (
    <DialogContent className='max-w-7xl sm:max-w-[95vw] md:max-w-[90vw] h-[95vh] p-0 flex flex-col md:flex-row gap-0'>
      {/* --- LEFT SIDE: Image Lightbox (50% width on desktop) --- */}
      <div className='relative w-full md:w-1/2 h-2/5 md:h-full bg-muted overflow-hidden'>
        {img?.url ? (
          <Image
            src={img.url}
            alt={img.altText || product.title}
            fill
            priority
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center text-sm text-muted-foreground'>
            No Image Preview
          </div>
        )}
      </div>

      {/* --- RIGHT SIDE: Customizer Form & Details (50% width on desktop) --- */}
      <div className='w-full md:w-1/2 h-3/5 md:h-full flex flex-col bg-background relative'>
        {/* Scrollable Area Container (FIX: Added generous pb-40 to clear the sticky footer) */}
        <div className='flex-1 overflow-y-auto p-6 lg:p-12 **pb-40**'>
          {/* Header */}
          <DialogHeader className='mb-8'>
            <DialogTitle className='text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-balance'>
              {product.title}
            </DialogTitle>
            <DialogDescription className='mt-2 text-2xl font-bold text-foreground'>
              {formatMoney(product.price)} USD{' '}
              <span className='text-base font-normal text-muted-foreground'>
                *Starting Price
              </span>
            </DialogDescription>
            <div className='flex items-center mt-2 text-sm text-muted-foreground'>
              <Zap className='h-4 w-4 mr-1 text-yellow-600' /> Custom Made to
              Order in 2-3 Weeks
            </div>
          </DialogHeader>

          {/* --- Customization Form (Increased vertical spacing) --- */}
          <div className='space-y-10 pb-4'>
            <h3 className='text-xl font-bold border-b pb-3'>
              Configure Your Product
            </h3>

            {/* 1. Finish Selection */}
            <div className='space-y-3'>
              <label className='text-base font-semibold block'>
                1. Select Finish
              </label>
              <div className='p-4 border rounded-xl bg-muted/50'>
                <Select
                  value={selectedFinish}
                  onValueChange={setSelectedFinish}
                >
                  <SelectTrigger className='w-full h-11 rounded-lg'>
                    <SelectValue placeholder='Select a finish' />
                  </SelectTrigger>
                  <SelectContent>
                    {FINISHES.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 2. Edge Style Selection */}
            <div className='space-y-3'>
              <label className='text-base font-semibold block'>
                2. Choose Edge Style
              </label>
              <div className='p-4 border rounded-xl bg-muted/50'>
                <Select value={selectedEdge} onValueChange={setSelectedEdge}>
                  <SelectTrigger className='w-full h-11 rounded-lg'>
                    <SelectValue placeholder='Select edge profile' />
                  </SelectTrigger>
                  <SelectContent>
                    {EDGE_STYLES.map((e) => (
                      <SelectItem key={e} value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 3. Measurement Inputs */}
            <div className='space-y-3'>
              <label className='text-base font-semibold block'>
                3. Enter Dimensions (in inches)
              </label>
              <div className='p-4 border rounded-xl bg-muted/50'>
                <div className='flex gap-4'>
                  <div className='flex-1'>
                    <span className='text-xs text-muted-foreground block mb-1'>
                      Width (W)
                    </span>
                    <Input
                      type='number'
                      placeholder='Min: 12'
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className='rounded-lg text-center h-11'
                    />
                  </div>
                  <div className='flex-1'>
                    <span className='text-xs text-muted-foreground block mb-1'>
                      Depth (D)
                    </span>
                    <Input
                      type='number'
                      placeholder='Min: 6'
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      className='rounded-lg text-center h-11'
                    />
                  </div>
                </div>
                <p className='text-xs text-muted-foreground mt-3'>
                  Enter your exact required dimensions. We handle the rest!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Sticky Footer CTA (This position is fixed and now has enough buffer) --- */}
        <div className='border-t p-6 lg:p-12 bottom-0 bg-background/95 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]'>
          <p className='text-lg font-bold text-foreground mb-3 flex items-center justify-between'>
            <span>Estimated Total:</span>
            <span className='text-(--brand)'>$120.00 USD</span>
          </p>
          <Button
            onClick={handleAddToCart}
            className='w-full rounded-full h-12 text-base font-bold bg-(--brand) hover:bg-(--brand-dark)'
          >
            <ShoppingBag className='h-5 w-5 mr-2' /> Add Customized Item to Cart
          </Button>

          <Link href={productLink}>
            <Button
              variant='link'
              className='w-full mt-2 text-sm text-muted-foreground hover:text-foreground'
            >
              Need help? View Full Product Page →
            </Button>
          </Link>
        </div>
      </div>
    </DialogContent>
  );
}

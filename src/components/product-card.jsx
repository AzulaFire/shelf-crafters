'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/cart/cart-provider';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog'; // Import Dialog components
import ProductCustomizerDialog from './product-customizer-dialog'; // Import the new modal component

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

export default function ProductCard({ product }) {
  const { increment } = useCart();
  const img = product?.image;
  const productLink = `/products/${product.handle || product.id}`;

  return (
    // Wrap the card in a Dialog component
    <Dialog>
      <div className='group flex h-full flex-col overflow-hidden rounded-xl border bg-background shadow-lg transition hover:shadow-xl'>
        {/* --- Image Area (Linked to full product page) --- */}
        <Link href={productLink} className='relative block'>
          <div className='relative aspect-4/3 w-full overflow-hidden bg-muted'>
            {img?.url ? (
              <Image
                src={img.url}
                alt={img.altText || product.title}
                fill
                className='object-cover transition duration-500 group-hover:scale-[1.03] group-hover:opacity-90'
                sizes='(max-width: 1024px) 50vw, 33vw'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center text-xs text-muted-foreground'>
                No image
              </div>
            )}
          </div>
        </Link>

        <div className='flex grow flex-col justify-between p-4'>
          {/* --- Product Info --- */}
          <div className='mb-3'>
            {/* Category/Type */}
            <div className='text-xs font-medium uppercase tracking-wider text-muted-foreground/80'>
              {product.productType || 'Shelf'}
            </div>

            {/* Title - Linked to full product page */}
            <Link href={productLink}>
              <div className='mt-1 text-lg font-bold leading-snug text-foreground transition-colors hover:text-(--brand)'>
                {product.title}
              </div>
            </Link>

            {/* Price */}
            <div className='mt-2 text-base font-semibold text-foreground'>
              {formatMoney(product.price)}
            </div>
          </div>

          {/* --- CTA Buttons: Dialog Trigger --- */}
          <div className='flex gap-2'>
            {/* Primary Action: Opens the Customizer Dialog */}
            <DialogTrigger asChild>
              <Button
                className='w-full rounded-full h-10 px-4 bg-(--brand) hover:bg-(--brand-dark) text-sm font-semibold'
                // Stop propagation if the card itself was ever a link or trigger
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className='h-4 w-4 mr-2' /> View & Customize
              </Button>
            </DialogTrigger>
          </div>
        </div>
      </div>

      {/* --- The Customizer Modal Content --- */}
      <ProductCustomizerDialog product={product} />
    </Dialog>
  );
}

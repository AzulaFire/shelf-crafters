'use client';

import React from 'react';
import { motion } from 'framer-motion'; // Using framer-motion here for consistency
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product-card';
import { Search } from 'lucide-react';

function unique(list) {
  return Array.from(new Set(list)).filter(Boolean);
}

export default function ProductGallery({ products = [] }) {
  const [query, setQuery] = React.useState('');
  const types = unique(products.map((p) => p.productType));
  const [activeType, setActiveType] = React.useState('All');

  // Keep activeType valid
  React.useEffect(() => {
    if (activeType !== 'All' && !types.includes(activeType))
      setActiveType('All');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [types.join('|')]);

  const q = query.trim().toLowerCase();
  const filtered = products
    .filter((p) => (activeType === 'All' ? true : p.productType === activeType))
    .filter((p) => {
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    });

  const filters = ['All', ...types];

  return (
    <div className='space-y-8'>
      {/* --- Filter and Search Bar --- */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        {/* Category Filters (Scrollable on small screens) */}
        <div className='flex overflow-x-auto whitespace-nowrap pb-1'>
          <div className='flex gap-2'>
            {filters.map((t) => {
              const active = t === activeType;
              return (
                <Button
                  key={t}
                  variant={active ? 'default' : 'outline'} // Using 'outline' for secondary look
                  className='rounded-full px-4 text-sm'
                  onClick={() => setActiveType(t)}
                >
                  {t}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Search Input */}
        <div className='w-full md:max-w-xs'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search products...'
              className='pl-10 rounded-full' // Padding for the search icon
            />
          </div>
        </div>
      </div>

      {/* --- Product Grid --- */}
      {products.length === 0 ? (
        <div className='rounded-2xl border bg-muted/30 p-8 text-center text-base text-muted-foreground'>
          💡 **No Products Found:** Please ensure your data source is connected
          and populated. Products will appear here when ready.
        </div>
      ) : filtered.length === 0 ? (
        <div className='rounded-2xl border bg-muted/30 p-8 text-center text-base text-muted-foreground'>
          😔 **No Matches:** Try adjusting your search query or selecting a
          different category filter.
        </div>
      ) : (
        <motion.div
          layout
          className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        >
          {filtered.map((p) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

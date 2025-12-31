// components/search-dialog.jsx
'use client';

import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchDialog({ trigger }) {
  const [q, setQ] = React.useState('');

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-50 bg-black/40 backdrop-blur-sm' />
        <Dialog.Content className='fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-background p-4 shadow-xl'>
          <div className='flex items-center justify-between gap-3'>
            <Dialog.Title className='text-sm font-semibold'>
              Search
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant='ghost' size='icon' aria-label='Close'>
                <X className='h-4 w-4' />
              </Button>
            </Dialog.Close>
          </div>

          <div className='mt-3 space-y-3'>
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='Search products, spaces, ideas…'
              autoFocus
            />

            <div className='rounded-xl border bg-muted/30 p-3 text-sm text-muted-foreground'>
              Search UI is ready. Hook this up later to a Shopify product search
              route (e.g. `/search?q=...`).
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

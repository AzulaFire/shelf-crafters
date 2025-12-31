// app/layout.jsx
import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { CartProvider } from '@/components/cart/cart-provider';

export const metadata = {
  title: 'Shelf Crafters | Custom Shelving & Storage Solutions',
  description:
    'Women-owned custom shelving solutions for cabinets, pantries, closets, and more. Crafted to fit your space perfectly.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-background text-foreground antialiased'>
        <CartProvider>
          <div className='flex min-h-screen flex-col'>
            <SiteHeader />
            <main className='flex-1'>{children}</main>
            <SiteFooter />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

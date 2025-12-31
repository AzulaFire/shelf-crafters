// app/page.jsx
import Hero from '@/components/hero';
import ProductGallery from '@/components/product-gallery';
import Reviews from '@/components/reviews';
import { getFeaturedProducts } from '@/lib/shopify';

export const revalidate = 60; // cache for 60s; tweak later

export default async function HomePage() {
  const products = await getFeaturedProducts({ first: 12 });

  return (
    <div>
      <Hero />

      <section className='mx-auto w-full max-w-6xl px-4 py-14 md:py-18'>
        <div className='mb-7'>
          <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>
            Built to fit your space
          </h2>
          <p className='mt-2 max-w-2xl text-sm text-muted-foreground md:text-base'>
            Tailored shelving solutions for cabinets, pantries, closets, and
            more—designed for real homes and real life.
          </p>
        </div>

        <ProductGallery products={products} />
      </section>

      <section className='border-t bg-muted/30'>
        <div className='mx-auto w-full max-w-6xl px-4 py-14 md:py-18'>
          <Reviews />
        </div>
      </section>
    </div>
  );
}

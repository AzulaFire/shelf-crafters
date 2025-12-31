'use client';

import React from 'react';

function Dot() {
  return (
    <span
      aria-hidden='true'
      className='inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-(--brand-ink)/70'
    />
  );
}

function MarqueeItems({ items, ariaHidden = false }) {
  return (
    <div
      className='flex items-center'
      aria-hidden={ariaHidden ? 'true' : undefined}
    >
      {items.map((item, idx) => (
        <div
          key={`${item.text}-${idx}`}
          className='mx-5 flex items-center gap-3 text-xs font-semibold tracking-wide'
        >
          {item.href ? (
            <a
              href={item.href}
              className='underline decoration-(--brand-ink)/40 underline-offset-4 transition hover:decoration-(--brand-ink)/70'
            >
              {item.text}
            </a>
          ) : (
            <span>{item.text}</span>
          )}
          <Dot />
        </div>
      ))}
    </div>
  );
}

/**
 * AnnouncementBar (pixel-speed marquee)
 * - speed is pixels-per-second (pps)
 * - auto-calculates duration based on measured content width
 */
export default function AnnouncementBar({
  items = [
    { text: 'Free shipping on all orders (contiguous US)' },
    { text: 'Custom shelving made to fit your space' },
    { text: 'Holiday shutdown schedule', href: '/blogs/news/holiday-schedule' },
  ],
  speed = 60, // ✅ pixels per second (increase = faster)
}) {
  const contentRef = React.useRef(null);
  const [duration, setDuration] = React.useState(60); // fallback

  React.useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const compute = () => {
      // This element contains ONE set of items; the animation moves by 50% (one set)
      const width = el.scrollWidth;
      if (!width) return;

      // duration(seconds) = distance(px) / speed(px/sec)
      const next = Math.max(8, width / Math.max(10, speed));
      setDuration(next);
    };

    compute();

    const ro = new ResizeObserver(compute);
    ro.observe(el);

    // also recompute on window resize
    window.addEventListener('resize', compute);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, [speed, items]);

  if (!items?.length) return null;

  return (
    <div
      className='sc-marquee-wrap relative w-full overflow-hidden border-b bg-(--brand) text-(--brand-ink)'
      role='region'
      aria-label='Store announcements'
    >
      <div className='pointer-events-none absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0' />

      <div className='flex h-11 items-center'>
        <div
          className='sc-marquee-track flex w-max items-center whitespace-nowrap will-change-transform motion-reduce:animate-none'
          style={{ '--sc-marquee-duration': `${duration}s` }}
        >
          {/* First set (measured) */}
          <div ref={contentRef} className='flex items-center'>
            <MarqueeItems items={items} />
          </div>

          {/* Second set (duplicate for seamless loop) */}
          <MarqueeItems items={items} ariaHidden />
        </div>
      </div>
    </div>
  );
}

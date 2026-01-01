'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQS = [
  {
    q: 'What’s the current lead time?',
    a: 'Most orders ship in about two weeks. Every piece is made to order, so we use that time to cut, finish, and pack everything carefully.',
  },
  {
    q: 'Can I cancel or change my order?',
    a: 'If you reach out quickly, we’ll do our best to help. Once production starts on a custom-sized order, changes may be limited.',
  },
  {
    q: 'What measurements do I need?',
    a: 'Typically: width and depth of your wire shelf. If your space is unusual, we may ask for an extra measurement so the fit is perfect.',
  },
  {
    q: 'Do I need special tools?',
    a: 'Nope. A basic tape measure is enough. We keep the process simple so you can order confidently.',
  },
  {
    q: 'How do I choose a finish?',
    a: 'Think warm vs. cool tones, then consider what you’re matching (cabinets, flooring, trim). Samples are the easiest way to choose in your home’s lighting.',
  },
  {
    q: 'Can I order samples first?',
    a: 'No. Email our staff to avoid “it looked different online” surprises. Lighting changes everything.',
  },
  {
    q: 'How do the shelf covers install?',
    a: 'They’re designed to sit securely on top of your existing wire shelves—no demolition, no permanent changes. Video install guides are coming soon.',
  },
  {
    q: 'Will it work in pantries, closets, and laundry rooms?',
    a: 'Yes. These are some of the most common spaces. If your wire shelving is a standard style, you’re in the sweet spot.',
  },
  {
    q: 'How do I clean and care for them?',
    a: 'Wipe with a soft cloth. A lightly damp microfiber works for small messes. Avoid harsh chemicals and abrasive scrubbers to protect the finish.',
  },
  {
    q: 'Are they durable for everyday use?',
    a: 'That’s the whole point. They’re built for real life—daily pantry traffic, laundry rooms, and busy cabinets—while still looking finished.',
  },
];

export default function FAQ() {
  return (
    <section id='faq' className='mx-auto w-full max-w-6xl px-4'>
      <div className='mb-10 text-center md:text-left'>
        <h2 className='text-3xl font-extrabold tracking-tight md:text-4xl text-brand-ink'>
          Frequently Asked Questions
        </h2>
        <p className='mt-3 max-w-3xl text-lg text-muted-foreground mx-auto md:mx-0'>
          Quick answers to the stuff that matters: fit, strength, install, lead
          times, and finishes.
        </p>
      </div>

      {/* --- Accordion Container --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7 }}
        className='border border-border/50 bg-white shadow-xl rounded-xl overflow-hidden'
      >
        <Accordion
          type='single'
          collapsible
          className='divide-y divide-border/70'
        >
          {FAQS.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className='px-4 sm:px-8'>
              <AccordionTrigger
                className='
                  py-5 text-left text-base md:text-lg 
                  font-semibold text-foreground/90 
                  hover:no-underline 
                  data-[state=open]:text-brand 
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
                '
              >
                {item.q}
              </AccordionTrigger>
              <AccordionContent className='pb-6 text-neutral-700 leading-relaxed text-base font-normal'>
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}

'use client';

import { type LucideIcon } from 'lucide-react';
import type { ProductVariant } from '@/lib/product-models';

export interface ProductFeature {
  icon: LucideIcon;
  label: string;
  detail: string;
}

export interface ProductSectionProps {
  id: string;
  index: string;
  eyebrow: string;
  name: string;
  tagline: string;
  description: string;
  features: ProductFeature[];
  notes: { label: string; value: string }[];
  modelPath: string;
  variant: ProductVariant;
  reverse?: boolean;
  accentClass: string; // tailwind gradient classes for the stage
}

export default function ProductSection({
  id,
  index,
  eyebrow,
  name,
  tagline,
  description,
  features,
  notes,
  modelPath,
  variant,
  reverse = false,
  accentClass,
}: ProductSectionProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-b border-sand/50 bg-pearl pb-32 pt-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16 ${
            reverse ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Canvas stage */}
          <div className="lg:col-span-6">
            <div
              data-gsap-stage
              data-model={modelPath}
              data-variant={variant}
              className={`canvas-stage relative mx-auto h-[400px] w-full max-w-[30rem] rounded-[2.5rem] border border-sand/50 md:h-[600px] ${accentClass}`}
            >
              <div className="absolute inset-10 rounded-full border border-softGold/20" />
              <div className="absolute inset-20 rounded-full border border-softGold/10" />

              {/* Index badge */}
              <span className="absolute left-6 top-6 font-serif text-5xl text-softGold/30">
                {index}
              </span>

              {[
                'left-4 top-4',
                'right-4 top-4',
                'left-4 bottom-4',
                'right-4 bottom-4',
              ].map((pos) => (
                <span
                  key={pos}
                  className={`absolute ${pos} h-3 w-3 border-softGold/50 ${
                    pos.includes('top') ? 'border-t' : 'border-b'
                  } ${pos.includes('left') ? 'border-l' : 'border-r'}`}
                />
              ))}
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6">
            <div className="gsap-reveal flex items-center gap-3 text-goldDeep">
              <span className="text-[0.62rem] uppercase tracking-luxe">
                {eyebrow}
              </span>
              <span className="h-px w-12 bg-softGold" />
            </div>

            <h2 className="gsap-reveal mt-5 font-serif text-4xl leading-tight text-charcoal md:text-5xl">
              {name}
            </h2>
            <p className="gsap-reveal mt-3 font-serif text-xl italic text-goldDeep/90">
              {tagline}
            </p>

            <p className="gsap-reveal mt-6 max-w-lg text-[0.95rem] leading-relaxed text-espresso/80">
              {description}
            </p>

            <ul className="gsap-reveal mt-9 space-y-5">
              {features.map(({ icon: Icon, label, detail }) => (
                <li key={label} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-softGold/40 bg-ivory">
                    <Icon size={16} className="text-goldDeep" />
                  </span>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide-luxe text-charcoal">
                      {label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-espresso/75">
                      {detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="gsap-reveal mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-sand/60 bg-sand/60">
              {notes.map((n) => (
                <div key={n.label} className="bg-pearl px-5 py-4">
                  <p className="text-[0.62rem] uppercase tracking-luxe text-taupe">
                    {n.label}
                  </p>
                  <p className="mt-1 font-serif text-lg text-charcoal">
                    {n.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { ArrowDown, ShieldCheck, Sparkles, Leaf } from 'lucide-react';
import { PRODUCT_MODELS } from '@/lib/product-models';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-pearl via-ivory to-sand/60"
    >
      <div className="pointer-events-none absolute -left-40 top-32 h-[34rem] w-[34rem] rounded-full bg-softGold/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[30rem] w-[30rem] rounded-full bg-beige/30 blur-[120px]" />

      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-28 pt-28 md:pb-16 lg:grid-cols-12 lg:px-10 lg:pt-32">
        <p className="gsap-reveal col-span-full text-center text-[0.65rem] uppercase leading-relaxed tracking-[0.16em] text-taupe sm:tracking-luxe">
          Perawatan kulit berbasis klinik
        </p>
        <div className="lg:col-span-4">
          <div className="gsap-reveal flex items-center gap-3 text-goldDeep">
            <span className="h-px w-10 shrink-0 bg-softGold" />
            <span className="text-[0.68rem] uppercase leading-relaxed tracking-[0.12em]">
              Diformulasikan di Rosaura Skin Clinic, Belitang, OKU Timur
            </span>
          </div>

          <h1 className="gsap-reveal mt-6 font-serif text-4xl leading-[1.08] text-charcoal md:text-5xl">
            Presisi Klinis,
            <br />
            <span className="italic text-goldDeep">Sentuhan Eksklusif.</span>
          </h1>

          <p className="gsap-reveal mt-7 max-w-sm text-[0.95rem] leading-relaxed text-espresso/75">
            Lahir dari dedikasi Rosaura Skin Clinic, afterAURAskin
            diformulasikan secara khusus oleh dr. Gita Rosadila. Perawatan
            harian berbasis bukti medis untuk mencerahkan dan memelihara
            kesehatan kulit Anda.
          </p>

          <div className="gsap-reveal mt-9 flex flex-col gap-3 md:flex-row md:flex-wrap">
            <a
              href="#sunblock"
              className="rounded-full bg-charcoal px-7 py-3.5 text-center text-[0.72rem] uppercase tracking-[0.14em] text-pearl transition-all duration-500 ease-luxe hover:bg-goldDeep"
            >
              Jelajahi Produk
            </a>
            <a
              href="#ritual"
              className="rounded-full border border-charcoal/20 px-7 py-3.5 text-center text-[0.72rem] uppercase tracking-[0.14em] text-charcoal transition-all duration-500 ease-luxe hover:border-softGold hover:text-goldDeep"
            >
              Filosofi Kami
            </a>
          </div>

          <div className="gsap-reveal mt-12 flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-7">
            {[
              { icon: ShieldCheck, label: 'Teruji dermatologis' },
              { icon: Leaf, label: 'Formulasi bersih' },
              { icon: Sparkles, label: 'Diracik di klinik' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-taupe"
              >
                <Icon size={15} className="text-softGold" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            id="hero-canvas-stage"
            data-gsap-stage
            data-model={PRODUCT_MODELS.sunblock.path}
            data-variant={PRODUCT_MODELS.sunblock.variant}
            className="canvas-stage relative mx-auto h-[400px] w-full max-w-[34rem] rounded-[2.5rem] border border-sand/50 md:h-[600px]"
          >
            <div className="absolute inset-10 rounded-full border border-softGold/20" />
            <div className="absolute inset-20 rounded-full border border-softGold/15" />
            <div className="absolute inset-28 rounded-full border border-softGold/10" />

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

        <div className="lg:col-span-3">
          <div className="gsap-reveal flex h-full flex-col justify-end gap-8">
            <div className="rounded-3xl border border-sand/60 bg-pearl/70 p-6 backdrop-blur">
              <p className="font-serif text-4xl text-goldDeep">98%</p>
              <p className="mt-2 text-[0.72rem] uppercase leading-relaxed tracking-[0.12em] text-taupe">
                Tingkat Kepuasan Klinis
              </p>
              <p className="mt-3 text-xs leading-relaxed text-espresso/70">
                Berdasarkan evaluasi perawatan pasien di Rosaura Skin Clinic.
              </p>
            </div>

            <div>
              <p className="font-serif text-lg italic text-charcoal/80">
                &ldquo;Kulit yang dirawat dengan sabar akan mengingat setiap
                kelembutan.&rdquo;
              </p>
              <p className="mt-3 text-[0.62rem] uppercase leading-relaxed tracking-[0.12em] text-taupe">
                — dr. Gita Rosadila, Founder Rosaura Skin Clinic
              </p>
            </div>

            <a
              href="#sunblock"
              className="group flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.14em] text-charcoal"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/20 transition-all duration-500 ease-luxe group-hover:border-softGold group-hover:bg-softGold group-hover:text-pearl">
                <ArrowDown size={14} />
              </span>
              Gulir untuk menjelajah
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

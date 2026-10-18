'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Tabir Surya', href: '#sunblock' },
  { label: 'Pembersih Wajah', href: '#facial-wash' },
  { label: 'Krim Malam', href: '#night-cream' },
  { label: 'Filosofi Kami', href: '#ritual' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe ${
        scrolled
          ? 'glass-panel border-b border-sand/60 py-4'
          : 'bg-transparent py-7'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="leading-none">
          <span className="block font-serif text-[1.15rem] tracking-wide text-charcoal sm:text-2xl">
            afterAURAskin
          </span>
          <span className="mt-1 block text-[0.58rem] tracking-[0.22em] text-taupe">
            by ROSAURA
          </span>
        </a>

        <ul className="hidden items-center gap-4 md:flex lg:gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-[0.62rem] uppercase tracking-[0.14em] text-espresso/80 transition-colors duration-500 hover:text-charcoal lg:text-[0.72rem] lg:tracking-wide-luxe"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-softGold to-transparent transition-all duration-500 ease-luxe group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="#klinik"
            className="rounded-full border border-softGold/50 px-5 py-2.5 text-[0.62rem] uppercase tracking-[0.14em] text-goldDeep transition-all duration-500 ease-luxe hover:bg-softGold hover:text-pearl"
          >
            Konsultasi Sekarang
          </a>
        </div>

        <button
          aria-label="Buka menu"
          onClick={() => setOpen((v) => !v)}
          className="text-charcoal md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-luxe md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="mx-6 mt-4 flex flex-col gap-1 rounded-3xl border border-sand/70 bg-pearl/95 p-4 backdrop-blur">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm uppercase tracking-wide-luxe text-espresso transition-colors hover:bg-ivory"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#klinik"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-2xl bg-softGold px-4 py-3 text-center text-sm uppercase tracking-[0.14em] text-pearl"
            >
              Konsultasi Sekarang
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

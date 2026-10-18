import { Instagram, Facebook, Mail } from 'lucide-react';

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Mail, label: 'Surel' },
];

export default function Footer() {
  return (
    <footer id="klinik" className="relative overflow-hidden bg-charcoal text-pearl">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-softGold/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-3xl tracking-wide text-pearl md:text-4xl">
              afterAURAskin
            </p>
            <p className="mt-2 text-[0.62rem] tracking-[0.22em] text-softGold">
              by ROSAURA
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-pearl/70">
              Perawatan klinis yang diformulasikan oleh dr. Gita Rosadila,
              Founder Rosaura Skin Clinic, di Belitang, OKU Timur.
            </p>
            <div className="mt-6 flex gap-4">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-pearl/20 transition-all duration-500 ease-luxe hover:border-softGold hover:bg-softGold hover:text-charcoal"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-[0.62rem] uppercase tracking-luxe text-softGold">
              Koleksi
            </p>
            <ul className="mt-5 space-y-3 text-sm text-pearl/75">
              <li>
                <a href="#sunblock" className="transition-colors hover:text-pearl">
                  Veil Surya SPF 50+
                </a>
              </li>
              <li>
                <a href="#facial-wash" className="transition-colors hover:text-pearl">
                  Pembersih Pure Rinse
                </a>
              </li>
              <li>
                <a href="#night-cream" className="transition-colors hover:text-pearl">
                  Krim Malam
                </a>
              </li>
              <li>
                <a href="#ritual" className="transition-colors hover:text-pearl">
                  Filosofi Kami
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-[0.62rem] uppercase tracking-luxe text-softGold">
              Klinik
            </p>
            <ul className="mt-5 space-y-3 text-sm text-pearl/75">
              <li>Rosaura Skin Clinic</li>
              <li>Belitang, OKU Timur</li>
              <li>Sumatera Selatan</li>
            </ul>
            <form className="mt-6 flex max-w-xs flex-col gap-3 border-b border-pearl/25 pb-2 sm:flex-row sm:items-center md:flex-row">
              <input
                type="email"
                placeholder="Surel untuk catatan ritual"
                className="w-full bg-transparent text-sm text-pearl placeholder:text-pearl/40 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-left text-[0.62rem] uppercase tracking-luxe text-softGold transition-colors hover:text-pearl"
              >
                Gabung
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-pearl/15 pt-6 text-[0.65rem] uppercase tracking-[0.14em] text-pearl/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} afterAURAskin by ROSAURA</p>
          <p>Diracik dengan presisi klinis</p>
        </div>
      </div>
    </footer>
  );
}

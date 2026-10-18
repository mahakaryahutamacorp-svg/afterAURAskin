'use client';

import { Sunrise, Sun, Moon } from 'lucide-react';

const steps = [
  {
    icon: Sunrise,
    time: 'Pagi',
    title: 'Membersihkan',
    detail:
      'Mulai dengan Pure Rinse untuk mengangkat sisa malam dan menyiapkan kulit. Penyegaran sejuk sebelum hari dimulai.',
  },
  {
    icon: Sun,
    time: 'Siang',
    title: 'Melindungi',
    detail:
      'Lapiskan Veil Surya sebagai langkah terakhir. Perisai ringan yang tak terlihat, terhadap cahaya dan polusi.',
  },
  {
    icon: Moon,
    time: 'Malam',
    title: 'Memulihkan',
    detail:
      'Tutup hari dengan Krim Malam. Pencerahan dan perbaikan, selaras dengan waktu istirahat Anda.',
  },
];

export default function RitualSection() {
  return (
    <section
      id="ritual"
      className="relative overflow-hidden bg-gradient-to-b from-ivory to-pearl pb-32 pt-24 md:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-softGold to-transparent" />

      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <p className="gsap-reveal text-[0.65rem] uppercase tracking-luxe text-goldDeep">
          Filosofi Kami
        </p>
        <h2 className="gsap-reveal mx-auto mt-5 max-w-2xl font-serif text-4xl leading-tight text-charcoal md:text-5xl">
          Tiga langkah,
          <span className="italic text-goldDeep"> satu hari yang bercahaya.</span>
        </h2>
        <p className="gsap-reveal mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed text-espresso/80">
          Irama yang utuh, diformulasikan sebagai satu sistem — setiap langkah
          menyiapkan kulit untuk langkah berikutnya, dan hasilnya berlapis dari
          minggu ke minggu.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map(({ icon: Icon, time, title, detail }, i) => (
            <div
              key={title}
              className="gsap-reveal group relative rounded-3xl border border-sand/60 bg-pearl/80 p-8 text-center backdrop-blur transition-all duration-700 ease-luxe hover:-translate-y-1.5 hover:border-softGold/50 hover:shadow-[0_30px_60px_-30px_rgba(169,132,60,0.35)]"
            >
              <span className="absolute right-6 top-5 font-serif text-3xl text-softGold/25">
                0{i + 1}
              </span>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-softGold/40 bg-ivory transition-colors duration-500 group-hover:bg-softGold group-hover:text-pearl">
                <Icon size={20} className="text-goldDeep" />
              </span>
              <p className="mt-5 text-[0.62rem] uppercase tracking-luxe text-taupe">
                {time}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-charcoal md:text-3xl">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-espresso/75">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

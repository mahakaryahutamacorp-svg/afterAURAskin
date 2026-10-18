'use client';

import { Moon, SunMedium, Layers, Clock } from 'lucide-react';
import ProductSection from './product-section';
import { PRODUCT_MODELS } from '@/lib/product-models';

export default function NightCreamSection() {
  return (
    <ProductSection
      id="night-cream"
      index="03"
      eyebrow="Pemulihan Malam"
      name="Krim Malam"
      tagline="Pencerahan yang bangun bersama Anda."
      description="Perawatan malam yang bekerja selaras dengan siklus perbaikan kulit. Tranexamic tersalut dan niacinamide meratakan warna kulit dengan lembut, sementara kompleks peptida-lipid memulihkan kepadatan semalaman — sehingga pagi menyambut kulit yang tampak bercahaya dari dalam."
      features={[
        {
          icon: SunMedium,
          label: 'Pencerahan terarah',
          detail:
            'Tranexamic acid tersalut, niacinamide, dan alpha-arbutin bekerja sepanjang malam untuk memudarkan noda dan meratakan warna — tanpa iritasi.',
        },
        {
          icon: Moon,
          label: 'Perbaikan siklus tidur',
          detail:
            'Disusun untuk jendela pemulihan malam, saat pergantian sel memuncak dan penyerapan bahan aktif berada di titik terdalam.',
        },
        {
          icon: Layers,
          label: 'Bantalan peptida-lipid',
          detail:
            'Ceramide dan bio-peptida membangun kembali pelindung kelembapan, memulihkan kekenyalan dan ketahanan menjelang pagi.',
        },
        {
          icon: Clock,
          label: 'Bahan aktif lepas lambat',
          detail:
            'Enkapsulasi lepas lambat mengantarkan pencerah secara bertahap, menjaga khasiat sekaligus menekan risiko sensitivitas.',
        },
      ]}
      notes={[
        { label: 'Aksi', value: 'Pencerahan' },
        { label: 'Siklus', value: 'Perbaikan malam' },
        { label: 'Tekstur', value: 'Krim beludru' },
        { label: 'Volume', value: '30 ml' },
      ]}
      modelPath={PRODUCT_MODELS.nightCream.path}
      variant={PRODUCT_MODELS.nightCream.variant}
      accentClass="bg-gradient-to-tr from-ivory via-pearl to-sand/50"
    />
  );
}

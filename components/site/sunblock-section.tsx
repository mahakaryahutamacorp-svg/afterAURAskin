'use client';

import { Sun, Feather, Droplets, Clock } from 'lucide-react';
import ProductSection from './product-section';
import { PRODUCT_MODELS } from '@/lib/product-models';

export default function SunblockSection() {
  return (
    <ProductSection
      id="sunblock"
      index="01"
      eyebrow="Perlindungan Siang"
      name="Veil Surya"
      tagline="Perisai UV yang ringan, nyaris tak terasa."
      description="Tabir surya SPF 50+ spektrum luas dengan filter mineral yang stabil dan basis bebas silikon. Diformulasikan di Rosaura Skin Clinic untuk kulit pasca-perawatan — melindungi tanpa residu putih, hanya menyisakan hasil akhir yang lembut dan berembun."
      features={[
        {
          icon: Sun,
          label: 'SPF 50+ spektrum luas',
          detail:
            'Perlindungan PA++++ terhadap sinar UVA yang menua dan UVB yang membakar, teruji kestabilan fotonya.',
        },
        {
          icon: Feather,
          label: 'Tekstur sehalus udara',
          detail:
            'Emulsi yang melebur dalam hitungan detik — tanpa residu putih, tanpa rasa lengket, tanpa menggelombang di bawah riasan.',
        },
        {
          icon: Droplets,
          label: 'Kompleks kunci hidrasi',
          detail:
            'Squalane dan niacinamide menjaga kelembapan sepanjang hari, memperkuat pelindung kulit dari polusi dan cahaya biru.',
        },
        {
          icon: Clock,
          label: 'Ketahanan delapan jam',
          detail:
            'Tetap fotostabil hingga delapan jam pemakaian di luar ruang. Pendamping senyap untuk ritual pagi.',
        },
      ]}
      notes={[
        { label: 'SPF', value: '50+ PA++++' },
        { label: 'Tekstur', value: 'Tirai cair' },
        { label: 'Hasil akhir', value: 'Embun lembut' },
        { label: 'Volume', value: '50 ml' },
      ]}
      modelPath={PRODUCT_MODELS.sunblock.path}
      variant={PRODUCT_MODELS.sunblock.variant}
      accentClass="bg-gradient-to-br from-pearl via-ivory to-sand/70"
    />
  );
}

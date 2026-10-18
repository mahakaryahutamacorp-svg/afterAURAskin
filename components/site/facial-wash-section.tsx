'use client';

import { Waves, Sparkle, Wind, Leaf } from 'lucide-react';
import ProductSection from './product-section';
import { PRODUCT_MODELS } from '@/lib/product-models';

export default function FacialWashSection() {
  return (
    <ProductSection
      id="facial-wash"
      index="02"
      eyebrow="Penyegaran Pagi"
      name="Pure Rinse"
      tagline="Hempasan sejuk yang mengangkat sisa hari."
      description="Pembersih gel-ke-busa yang mengangkat kotoran, sebum berlebih, dan residu aktivitas — tanpa mengganggu mantel asam kulit. Air mentimun yang menyejukkan dan surfaktan asam amino meninggalkan kulit segar, tenang, dan tampak lebih jernih."
      features={[
        {
          icon: Sparkle,
          label: 'Klarifikasi pori',
          detail:
            'Surfaktan asam amino melarutkan sisa kotoran dan tabir surya, lalu bilas bersih tanpa rasa ketat.',
        },
        {
          icon: Waves,
          label: 'Awan busa lembap',
          detail:
            'Busa yang lembut menahan air di permukaan kulit, sehingga membersihkan tidak pernah terasa mengeringkan.',
        },
        {
          icon: Wind,
          label: 'Sensasi sejuk',
          detail:
            'Air bio mentimun dan bisabolol menenangkan sejak sentuhan pertama — penyegaran seketika untuk kulit yang memerah atau sensitif.',
        },
        {
          icon: Leaf,
          label: 'pH 5,5 yang aman',
          detail:
            'Disusun mengikuti keasaman alami kulit, menjaga pelindung dan keseimbangan mikrobioma.',
        },
      ]}
      notes={[
        { label: 'Jenis', value: 'Gel-ke-busa' },
        { label: 'pH', value: '5,5 seimbang' },
        { label: 'Sensasi', value: 'Sejuk menyegarkan' },
        { label: 'Volume', value: '150 ml' },
      ]}
      modelPath={PRODUCT_MODELS.facialWash.path}
      variant={PRODUCT_MODELS.facialWash.variant}
      reverse
      accentClass="bg-gradient-to-bl from-pearl via-ivory to-sand/60"
    />
  );
}

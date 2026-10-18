import dynamic from 'next/dynamic';
import Navbar from '@/components/site/navbar';
import Hero from '@/components/site/hero';
import SunblockSection from '@/components/site/sunblock-section';
import FacialWashSection from '@/components/site/facial-wash-section';
import NightCreamSection from '@/components/site/night-cream-section';
import RitualSection from '@/components/site/ritual-section';
import Footer from '@/components/site/footer';
import ScrollProgress from '@/components/site/scroll-progress';

const FlyingProduct = dynamic(
  () => import('@/components/site/flying-product'),
  { ssr: false },
);

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Navbar />
      <FlyingProduct />
      <Hero />
      <SunblockSection />
      <FacialWashSection />
      <NightCreamSection />
      <RitualSection />
      <Footer />
    </main>
  );
}

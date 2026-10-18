'use client';

import { Canvas } from '@react-three/fiber';
import DummyBottle from './DummyBottle';

export default function ProductCanvas({
  productType = 'sunblock',
  isNightCream = false,
}) {
  const night =
    isNightCream || productType === 'night-cream' || productType === 'jar';

  return (
    <div
      className="relative h-full w-full"
      style={{ touchAction: 'none' }}
      onPointerDown={(event) => {
        event.preventDefault();
      }}
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        camera={{
          position: [
            0,
            night ? 0.28 : 0.08,
            night ? 6.8 : productType === 'facial-wash' ? 7.6 : 8.6,
          ],
          fov: 30,
        }}
        style={{ touchAction: 'none', width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
        onPointerDown={(event) => {
          event.stopPropagation();
          if (event.nativeEvent?.cancelable) {
            event.nativeEvent.preventDefault();
          }
        }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[2.2, 6.5, 4.5]} intensity={1.05} color="#ffffff" />
        <directionalLight position={[-3.5, 1.5, 3]} intensity={0.38} color="#f3eee6" />
        <DummyBottle productType={productType} isNightCream={night} />
      </Canvas>
    </div>
  );
}

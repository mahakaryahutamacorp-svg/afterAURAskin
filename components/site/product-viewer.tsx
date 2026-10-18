'use client';

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bounds, useGLTF } from '@react-three/drei';
import type { Group } from 'three';
import type { ProductModel, ProductVariant } from '@/lib/product-models';

interface ProductViewerProps {
  model: ProductModel;
}

interface SpinningGroupProps {
  children: ReactNode;
}

function SpinningGroup({ children }: SpinningGroupProps) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.4;
  });

  return <group ref={groupRef}>{children}</group>;
}

function TubeStandIn() {
  return (
    <group position={[0, -0.05, 0]}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.58, 0.74, 2.3, 40]} />
        <meshStandardMaterial color="#F7F3EC" roughness={0.18} metalness={0.28} />
      </mesh>
      <mesh position={[0, -1.1, 0]} scale={[1.2, 0.16, 1]}>
        <sphereGeometry args={[0.62, 24, 16]} />
        <meshStandardMaterial color="#F7F3EC" roughness={0.24} metalness={0.16} />
      </mesh>
      <mesh position={[0, 1.38, 0]}>
        <cylinderGeometry args={[0.28, 0.42, 0.36, 32]} />
        <meshStandardMaterial color="#C6A15B" roughness={0.28} metalness={0.82} />
      </mesh>
      <mesh position={[0, 1.64, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.2, 24]} />
        <meshStandardMaterial color="#C6A15B" roughness={0.3} metalness={0.75} />
      </mesh>
    </group>
  );
}

function CylinderStandIn() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.7, 0.7, 2.15, 48]} />
        <meshStandardMaterial color="#F4F7F8" roughness={0.16} metalness={0.32} />
      </mesh>
      <mesh position={[0, 0.35, 0.71]}>
        <boxGeometry args={[0.9, 0.55, 0.02]} />
        <meshStandardMaterial color="#C6A15B" roughness={0.4} metalness={0.45} />
      </mesh>
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.28, 32]} />
        <meshStandardMaterial color="#C6A15B" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0.28, 1.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.42, 16]} />
        <meshStandardMaterial color="#C6A15B" metalness={0.75} roughness={0.3} />
      </mesh>
    </group>
  );
}

function JarStandIn() {
  return (
    <group>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[1.02, 1.02, 1.15, 48]} />
        <meshStandardMaterial color="#F7F3EC" roughness={0.2} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[1.06, 1.06, 0.2, 48]} />
        <meshStandardMaterial color="#C6A15B" metalness={0.82} roughness={0.25} />
      </mesh>
    </group>
  );
}

function StandIn({ variant }: { variant: ProductVariant }) {
  if (variant === 'cylinder') return <CylinderStandIn />;
  if (variant === 'jar') return <JarStandIn />;
  return <TubeStandIn />;
}

function MeshyModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  const clone = useMemo(() => scene.clone(true), [scene]);

  return (
    <Bounds fit clip margin={1.3}>
      <primitive object={clone} />
    </Bounds>
  );
}

function Scene({ model, useMesh }: { model: ProductModel; useMesh: boolean }) {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 5, 3]} intensity={1.4} color="#fff8ee" />
      <directionalLight position={[-3.5, 1.5, -2]} intensity={0.45} color="#f0d7a4" />
      <SpinningGroup>
        {useMesh ? (
          <Suspense fallback={<StandIn variant={model.variant} />}>
            <MeshyModel modelPath={model.path} />
          </Suspense>
        ) : (
          <StandIn variant={model.variant} />
        )}
      </SpinningGroup>
    </>
  );
}

function useMeshyModel(modelPath: string) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setAvailable(false);

    fetch(modelPath, { method: 'HEAD' })
      .then((response) => {
        if (!cancelled) setAvailable(response.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });

    return () => {
      cancelled = true;
    };
  }, [modelPath]);

  return available;
}

export default function ProductViewer({ model }: ProductViewerProps) {
  const useMesh = useMeshyModel(model.path);

  return (
    <div className="h-full w-full" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0.2, 7.4], fov: 30 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
      >
        <Scene model={model} useMesh={useMesh} />
      </Canvas>
    </div>
  );
}

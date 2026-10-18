'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { CanvasTexture, MathUtils } from 'three';

const PRODUCT_LINES = {
  sunblock: 'DAILY SUNBLOCK SPF 50+',
  'facial-wash': 'GENTLE FACIAL WASH',
  'night-cream': 'NIGHT CREAM WHITENING',
};

function resolveProduct(productType, isNightCream) {
  if (isNightCream || productType === 'night-cream' || productType === 'jar') {
    return 'night-cream';
  }
  if (productType === 'facial-wash' || productType === 'cylinder') {
    return 'facial-wash';
  }
  return 'sunblock';
}

function Glass({ args, position }) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={args} />
      <meshStandardMaterial
        color="#F7F3EC"
        metalness={0.6}
        roughness={0.2}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

function Gold({ args, position }) {
  return (
    <mesh position={position}>
      <cylinderGeometry args={args} />
      <meshStandardMaterial color="#E4C56A" metalness={0.78} roughness={0.22} />
    </mesh>
  );
}

function drawTrackedText(ctx, text, x, y, spacing) {
  const widths = [...text].map((char) => ctx.measureText(char).width);
  const total = widths.reduce((sum, width) => sum + width, 0) + spacing * (text.length - 1);
  let cursor = x - total / 2;
  [...text].forEach((char, index) => {
    ctx.fillText(char, cursor + widths[index] / 2, y);
    cursor += widths[index] + spacing;
  });
}

function createLabelTexture(line) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#F7F3EC';
  ctx.fillRect(0, 0, 1024, 512);
  ctx.strokeStyle = '#C6A15B';
  ctx.lineWidth = 10;
  ctx.strokeRect(28, 28, 968, 456);
  ctx.fillStyle = '#2C2622';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '78px Georgia, "Times New Roman", serif';
  ctx.fillText('afterAURAskin', 512, 150);
  ctx.fillStyle = '#A9843C';
  ctx.font = '30px Arial, sans-serif';
  drawTrackedText(ctx, 'BY ROSAURA', 512, 230, 10);
  ctx.fillStyle = '#5C5348';
  ctx.font = '28px Arial, sans-serif';
  drawTrackedText(ctx, line, 512, 300, 3);
  ctx.fillStyle = '#C6A15B';
  ctx.fillRect(392, 348, 240, 3);
  ctx.font = '24px Arial, sans-serif';
  drawTrackedText(ctx, 'CLINICALLY PROVEN', 512, 400, 6);
  const texture = new CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function CurvedProductLabel({ radius, y, height, theta = 1.25, line }) {
  const texture = useMemo(() => createLabelTexture(line), [line]);

  return (
    <mesh position={[0, y, 0]}>
      <cylinderGeometry args={[radius, radius, height, 64, 1, true, -theta / 2, theta]} />
      <meshStandardMaterial
        map={texture}
        color="#F7F3EC"
        roughness={0.42}
        metalness={0.08}
        side={2}
      />
    </mesh>
  );
}

const TUBE_BODY = '#F3EFE8';
const TUBE_CAP = '#D2CBC2';
const TUBE_INK = '#4E4943';

function MatteCylinder({ args, position, color = TUBE_BODY }) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.74} metalness={0.03} />
    </mesh>
  );
}

function createTubeLabelTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = TUBE_INK;

  ctx.font = '128px Georgia, "Times New Roman", serif';
  ctx.fillText('afterAURAskin', 512, 360);
  ctx.font = '50px Georgia, "Times New Roman", serif';
  ctx.fillText('by rosaura', 512, 500);

  ctx.font = '46px Arial, sans-serif';
  drawTrackedText(ctx, 'RADIANT RENEWAL', 512, 820, 4);
  drawTrackedText(ctx, 'FACE CREAM', 512, 900, 5);

  ctx.font = 'italic 42px Georgia, "Times New Roman", serif';
  ctx.fillText('Hydrates  ·  Replenishes  ·  Restores', 512, 1080);

  ctx.font = '34px Arial, sans-serif';
  drawTrackedText(ctx, 'WITH NIACINAMIDE', 512, 1360, 2);
  drawTrackedText(ctx, 'HYALURONIC ACID', 512, 1436, 2);
  drawTrackedText(ctx, 'AND BOTANICAL EXTRACTS', 512, 1512, 2);

  ctx.font = '36px Arial, sans-serif';
  ctx.fillText('50 mL  e  1.7 FL. OZ.', 512, 1820);

  const texture = new CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function TubeCrimp() {
  const ridges = Array.from({ length: 36 }, (_, index) => {
    const span = 1.08;
    const x = -span / 2 + ((index + 0.5) * span) / 36;
    return (
      <mesh key={index} position={[x, 0.045, 0]}>
        <boxGeometry args={[0.012, 0.07, 0.028]} />
        <meshStandardMaterial color="#D9D3CA" roughness={0.58} metalness={0.04} />
      </mesh>
    );
  });

  return (
    <group position={[0, 1.46, 0]}>
      <mesh scale={[1, 1, 0.16]}>
        <cylinderGeometry args={[0.62, 0.64, 0.05, 48]} />
        <meshStandardMaterial color={TUBE_BODY} roughness={0.74} metalness={0.03} />
      </mesh>
      {ridges}
    </group>
  );
}

function ReferenceTube() {
  const texture = useMemo(() => createTubeLabelTexture(), []);

  return (
    <group>
      <MatteCylinder args={[0.5, 0.5, 0.62, 64]} position={[0, -1.18, 0]} color={TUBE_CAP} />
      <MatteCylinder args={[0.46, 0.5, 0.08, 48]} position={[0, -0.84, 0]} />
      <MatteCylinder args={[0.64, 0.5, 2.15, 80]} position={[0, 0.28, 0]} />
      <MatteCylinder args={[0.66, 0.64, 0.12, 48]} position={[0, 1.38, 0]} />
      <TubeCrimp />
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.655, 0.52, 1.72, 80, 1, true, -0.62, 1.24]} />
        <meshStandardMaterial
          map={texture}
          transparent
          roughness={0.82}
          metalness={0.02}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-2}
        />
      </mesh>
    </group>
  );
}

function FacialWashForm() {
  return (
    <group>
      <Glass args={[0.74, 0.78, 1.95, 64]} position={[0, -0.12, 0]} />
      <Glass args={[0.8, 0.8, 0.08, 48]} position={[0, -1.08, 0]} />
      <Glass args={[0.62, 0.74, 0.14, 48]} position={[0, 0.86, 0]} />
      <Gold args={[0.66, 0.66, 0.07, 48]} position={[0, 0.98, 0]} />
      <Gold args={[0.28, 0.34, 0.22, 40]} position={[0, 1.14, 0]} />
      <Gold args={[0.16, 0.2, 0.16, 32]} position={[0, 1.32, 0]} />
      <Gold args={[0.05, 0.05, 0.28, 16]} position={[0.16, 1.38, 0]} />
      <CurvedProductLabel
        radius={0.86}
        y={-0.08}
        height={0.9}
        line={PRODUCT_LINES['facial-wash']}
      />
    </group>
  );
}

function NightCreamForm() {
  return (
    <group>
      <Glass args={[1.12, 1.2, 0.92, 64]} position={[0, -0.16, 0]} />
      <Glass args={[1.04, 1.12, 0.14, 64]} position={[0, 0.32, 0]} />
      <Gold args={[1.18, 1.18, 0.06, 64]} position={[0, 0.44, 0]} />
      <Gold args={[1.22, 1.24, 0.1, 64]} position={[0, 0.54, 0]} />
      <Gold args={[1.14, 1.18, 0.07, 64]} position={[0, 0.63, 0]} />
      <Gold args={[1.06, 1.08, 0.045, 64]} position={[0, 0.69, 0]} />
      <CurvedProductLabel
        radius={1.26}
        y={-0.12}
        height={0.62}
        theta={1.15}
        line={PRODUCT_LINES['night-cream']}
      />
    </group>
  );
}

export default function DummyBottle({
  isNightCream = false,
  productType = 'sunblock',
}) {
  const rig = useRef(null);
  const shadow = useRef(null);
  const target = useRef({ rotY: 0, tiltX: 0, tiltZ: 0 });
  const current = useRef({ rotY: 0, tiltX: 0, tiltZ: 0 });
  const idleSpin = useRef(0);
  const lastMove = useRef(0);
  const previousPointer = useRef({ x: 0, y: 0, ready: false });

  const product = resolveProduct(productType, isNightCream);
  const floorY = product === 'night-cream' ? -0.78 : product === 'sunblock' ? -1.52 : -1.32;

  const markActive = (event) => {
    event.stopPropagation();
    lastMove.current = performance.now();
  };

  useFrame((state, delta) => {
    const moving = performance.now() - lastMove.current < 140;
    const pointer = state.pointer;

    if (moving) {
      if (previousPointer.current.ready) {
        const deltaX = pointer.x - previousPointer.current.x;
        const deltaY = pointer.y - previousPointer.current.y;
        target.current.rotY += deltaX * Math.PI * 2.8;
        target.current.tiltX = MathUtils.clamp(
          -pointer.y * 0.36 - deltaY * 0.45,
          -0.42,
          0.42,
        );
        target.current.tiltZ = MathUtils.clamp(pointer.x * 0.24, -0.3, 0.3);
      }
      previousPointer.current.x = pointer.x;
      previousPointer.current.y = pointer.y;
      previousPointer.current.ready = true;
      idleSpin.current = target.current.rotY;
    } else {
      previousPointer.current.ready = false;
      idleSpin.current += delta * 0.22;
      target.current.rotY = idleSpin.current;
      target.current.tiltX = 0;
      target.current.tiltZ = 0;
    }

    const damp = 1 - Math.exp(-7 * delta);
    current.current.rotY = MathUtils.lerp(current.current.rotY, target.current.rotY, damp);
    current.current.tiltX = MathUtils.lerp(current.current.tiltX, target.current.tiltX, damp);
    current.current.tiltZ = MathUtils.lerp(current.current.tiltZ, target.current.tiltZ, damp);

    if (rig.current) {
      rig.current.rotation.x = current.current.tiltX;
      rig.current.rotation.y = current.current.rotY;
      rig.current.rotation.z = current.current.tiltZ;
    }

    if (shadow.current) {
      shadow.current.position.x = MathUtils.lerp(
        shadow.current.position.x,
        current.current.tiltZ * 0.7,
        damp,
      );
      shadow.current.position.z = MathUtils.lerp(
        shadow.current.position.z,
        -current.current.tiltX * 0.7,
        damp,
      );
    }
  });

  return (
    <group>
      <group ref={rig}>
        {product === 'night-cream' ? <NightCreamForm /> : null}
        {product === 'facial-wash' ? <FacialWashForm /> : null}
        {product === 'sunblock' ? <ReferenceTube /> : null}
      </group>

      <mesh
        position={[0, 0, 2.4]}
        visible={false}
        onPointerDown={(event) => {
          event.stopPropagation();
          const native = event.nativeEvent;
          native?.target?.setPointerCapture?.(native.pointerId);
          markActive(event);
        }}
        onPointerMove={markActive}
        onPointerUp={() => {
          lastMove.current = 0;
        }}
        onPointerLeave={() => {
          lastMove.current = 0;
        }}
      >
        <planeGeometry args={[14, 14]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <group ref={shadow} position={[0, floorY, 0]}>
        <ContactShadows
          opacity={0.38}
          scale={7}
          blur={2.6}
          far={3.2}
          resolution={512}
          frames={1}
          color="#8d7b66"
        />
      </group>
    </group>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCanvas from '@/components/ProductCanvas';
import {
  PRODUCT_MODELS,
  type ProductModel,
  type ProductVariant,
} from '@/lib/product-models';

interface StageSnapshot {
  element: HTMLElement;
  left: number;
  top: number;
  width: number;
  height: number;
  centerY: number;
}

const VARIANTS: ProductVariant[] = ['tube', 'cylinder', 'jar'];

function readVariant(value: string | undefined): ProductVariant {
  if (value && VARIANTS.includes(value as ProductVariant)) {
    return value as ProductVariant;
  }
  return 'tube';
}

function readStages(): StageSnapshot[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-gsap-stage]')).map(
    (element) => {
      const rect = element.getBoundingClientRect();
      return {
        element,
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        centerY: rect.top + rect.height / 2,
      };
    },
  );
}

export default function FlyingProduct() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState<ProductModel>(PRODUCT_MODELS.sunblock);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const current = {
      x: 0,
      y: 0,
      width: 320,
      height: 320,
      opacity: 0,
      scale: 1,
      rotate: 0,
    };
    const target = { ...current };
    let activePath: string = PRODUCT_MODELS.sunblock.path;
    let primed = false;

    const apply = () => {
      gsap.set(shell, {
        x: current.x,
        y: current.y,
        width: current.width,
        height: current.height,
        opacity: current.opacity,
        scale: current.scale,
        rotate: current.rotate,
      });
    };

    const measure = () => {
      const stages = readStages();
      if (stages.length === 0) return;

      const focus = window.innerHeight * 0.46;
      let segment = 0;

      for (let index = 0; index < stages.length - 1; index += 1) {
        if (focus >= stages[index + 1].centerY) segment = index + 1;
        else break;
      }

      const from = stages[segment];
      const to = stages[Math.min(segment + 1, stages.length - 1)];
      const span = to.centerY - from.centerY;
      const raw = span === 0 ? 0 : (focus - from.centerY) / span;
      const progress = gsap.parseEase('power2.inOut')(
        gsap.utils.clamp(0, 1, raw),
      );
      const mix = (start: number, end: number) => start + (end - start) * progress;
      const lift = Math.sin(progress * Math.PI);

      target.x = mix(from.left, to.left);
      target.y = mix(from.top, to.top);
      target.width = mix(from.width, to.width);
      target.height = mix(from.height, to.height);
      target.scale = 1 + lift * 0.045;
      target.rotate =
        ((to.left - from.left) / Math.max(window.innerWidth, 1)) * 7 * lift;

      const bottom = target.y + target.height;
      const offscreen = bottom < 48 || target.y > window.innerHeight - 48;
      target.opacity = offscreen ? 0 : 1;

      const dominant = progress < 0.55 ? from.element : to.element;
      const nextPath = dominant.dataset.model ?? PRODUCT_MODELS.sunblock.path;
      const nextModel: ProductModel = {
        path: nextPath,
        variant: readVariant(dominant.dataset.variant),
      };

      if (nextPath !== activePath) {
        activePath = nextPath;
        setModel(nextModel);
      }

      if (!primed) {
        current.x = target.x;
        current.y = target.y;
        current.width = target.width;
        current.height = target.height;
        current.opacity = target.opacity;
        current.scale = target.scale;
        current.rotate = target.rotate;
        primed = true;
        apply();
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: measure,
      onRefresh: measure,
    });

    const tick = () => {
      measure();
      const easing = reducedMotion ? 1 : 0.16;
      current.x += (target.x - current.x) * easing;
      current.y += (target.y - current.y) * easing;
      current.width += (target.width - current.width) * easing;
      current.height += (target.height - current.height) * easing;
      current.opacity += (target.opacity - current.opacity) * easing;
      current.scale += (target.scale - current.scale) * easing;
      current.rotate += (target.rotate - current.rotate) * easing;
      apply();
    };

    gsap.ticker.add(tick);
    measure();
    apply();

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(tick);
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={shellRef}
      className="pointer-events-auto fixed left-0 top-0 z-30 opacity-0"
      style={{ width: 320, height: 320, touchAction: 'none' }}
    >
      <ProductCanvas
        key={model.variant}
        productType={
          model.variant === 'jar'
            ? 'night-cream'
            : model.variant === 'cylinder'
              ? 'facial-wash'
              : 'sunblock'
        }
        isNightCream={model.variant === 'jar'}
      />
    </div>
  );
}

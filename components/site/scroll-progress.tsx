'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight scroll progress bar + subtle GSAP-ready reveal hook.
 * Activates any element with the `.gsap-reveal` class on scroll-into-view
 * using IntersectionObserver, so the page is graceful before GSAP is wired in.
 * When GSAP is later installed, it can take over these elements by selector.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = barRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? doc.scrollTop / max : 0;
      el.style.transform = `scaleX(${ratio})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.gsap-reveal'),
    );
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.transition =
              'opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)';
            (e.target as HTMLElement).style.opacity = '1';
            (e.target as HTMLElement).style.transform = 'none';
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-softGold via-goldDeep to-softGold"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';

/**
 * Eigener Cursor: kleiner Punkt + nachlaufender Ring.
 * Wird bei Zeigegeräten mit feinem Pointer aktiv, sonst inaktiv.
 */
export const Cursor: React.FC = () => {
  const punkt = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const [an, setAn] = useState(false);

  useEffect(() => {
    const fein = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fein || reduce) return;

    setAn(true);
    document.documentElement.classList.add('cursor-aktiv');

    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let rx = px;
    let ry = py;
    let raf = 0;

    const move = (e: MouseEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (punkt.current) punkt.current.style.transform = `translate(${px}px, ${py}px)`;

      const t = e.target as HTMLElement;
      const interaktiv = !!t.closest('a, button, input, textarea, [data-cursor]');
      if (ring.current) ring.current.dataset.hover = interaktiv ? '1' : '0';
    };

    const tick = () => {
      rx += (px - rx) * 0.18;
      ry += (py - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('cursor-aktiv');
    };
  }, []);

  if (!an) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
      <div
        ref={punkt}
        className="absolute -left-[3px] -top-[3px] w-1.5 h-1.5 rounded-full bg-signal"
      />
      <div
        ref={ring}
        data-hover="0"
        className="absolute -left-4 -top-4 w-8 h-8 rounded-full border border-linie-stark transition-[width,height,left,top,background-color,opacity] duration-300 data-[hover=1]:w-14 data-[hover=1]:h-14 data-[hover=1]:-left-7 data-[hover=1]:-top-7 data-[hover=1]:bg-text/10 data-[hover=1]:border-signal"
      />
    </div>
  );
};

export default Cursor;

import { useEffect, useRef, useState } from 'react';

interface Ergebnis<T extends HTMLElement> {
  ref: React.RefObject<T>;
  wert: number;
}

/**
 * Zählt von 0 auf `ziel` hoch, sobald das Element im Blickfeld ist — einmal.
 *
 * Wer Bewegung reduziert haben will, sieht sofort den Endwert: die Zahl ist
 * die Information, die Animation nur Beiwerk.
 */
export function benutzeZaehler<T extends HTMLElement = HTMLDivElement>(
  ziel: number,
  dauerMs = 1200,
): Ergebnis<T> {
  const ref = useRef<T>(null);
  const [wert, setzeWert] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const sparsam = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sparsam) {
      setzeWert(ziel);
      return;
    }

    let rafId = 0;
    let start = 0;

    const schritt = (jetzt: number) => {
      if (start === 0) {
        start = jetzt;
      }
      const p = Math.min((jetzt - start) / dauerMs, 1);
      // Exponentielles Auslaufen — schnell an, ruhig aus.
      const geglaettet = 1 - Math.pow(1 - p, 3);
      setzeWert(Math.round(ziel * geglaettet));
      if (p < 1) {
        rafId = requestAnimationFrame(schritt);
      }
    };

    const beobachter = new IntersectionObserver(
      (eintraege) => {
        if (eintraege.some((e) => e.isIntersecting)) {
          beobachter.disconnect();
          rafId = requestAnimationFrame(schritt);
        }
      },
      { threshold: 0.4 },
    );

    beobachter.observe(element);

    return () => {
      beobachter.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [ziel, dauerMs]);

  return { ref, wert };
}

export default benutzeZaehler;

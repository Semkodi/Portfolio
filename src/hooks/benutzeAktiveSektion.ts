import { useEffect, useState } from 'react';

/**
 * Meldet, welche Sektion gerade im Blickfeld ist — Grundlage für die
 * Fortschrittspunkte der Seitenleiste und die aktive Navigation.
 *
 * `ids` muss eine stabile Referenz sein (Modulkonstante), sonst baut der
 * Effect bei jedem Render einen neuen Beobachter auf.
 */
export function benutzeAktiveSektion(ids: readonly string[]): string {
  const [aktiv, setAktiv] = useState(ids[0] ?? '');

  useEffect(() => {
    const elemente = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elemente.length === 0) {
      return;
    }

    const beobachter = new IntersectionObserver(
      (eintraege) => {
        const sichtbar = eintraege
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (sichtbar) {
          setAktiv(sichtbar.target.id);
        }
      },
      // Nur das mittlere Band des Fensters zählt — sonst springt die
      // Markierung, sobald eine Sektion am Rand auftaucht.
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    elemente.forEach((el) => beobachter.observe(el));
    return () => beobachter.disconnect();
  }, [ids]);

  return aktiv;
}

export default benutzeAktiveSektion;

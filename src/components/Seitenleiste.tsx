import React from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { profil, ui } from '../data/inhalt';
import { sektionen, sektionsIds } from '../data/navigation';
import { benutzeAktiveSektion } from '../hooks/benutzeAktiveSektion';

/**
 * Feste Leiste am linken Rand: Monogramm, Fortschrittspunkte je Sektion,
 * Name hochkant. Ab `lg` sichtbar — darunter übernimmt die Statuszeile.
 */
export const Seitenleiste: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const aktiv = benutzeAktiveSektion(sektionsIds);

  return (
    <div className="hidden lg:flex fixed top-0 left-0 bottom-0 z-50 w-[88px] flex-col items-center justify-between border-r border-linie bg-raum/70 backdrop-blur-sm py-7">
      <a
        href="#start"
        aria-label={ui.nav.home[sprache]}
        className="flex h-[34px] w-[34px] items-center justify-center border border-signal font-mono-code text-xs text-signal transition-colors hover:bg-signal hover:text-signal-tief"
      >
        {profil.initialen}
      </a>

      <nav aria-label={sprache === 'de' ? 'Sektionen' : 'Sections'}>
        <ul className="flex flex-col items-center gap-1">
          {sektionen.map(({ id, navSchluessel }) => {
            const istAktiv = aktiv === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-label={ui.nav[navSchluessel][sprache]}
                  aria-current={istAktiv ? 'true' : undefined}
                  className="group flex h-11 w-11 items-center justify-center"
                >
                  <span
                    className={
                      istAktiv
                        ? 'block h-[9px] w-[9px] rounded-full bg-signal shadow-[0_0_12px_rgba(255,154,60,0.8)] transition-all'
                        : 'block h-[7px] w-[7px] rounded-full bg-text/25 transition-all group-hover:bg-text/60'
                    }
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <span className="font-mono-code text-[11px] tracking-[0.22em] text-text-3 [writing-mode:vertical-rl] rotate-180">
        {profil.name.toUpperCase()}
      </span>
    </div>
  );
};

export default Seitenleiste;

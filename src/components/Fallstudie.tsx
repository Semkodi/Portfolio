import React from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import type { Projekt } from '../data/inhalt';
import Reveal from './Reveal';

/**
 * Skizze eines Browserfensters — deutet die Seite an, ohne einen
 * Screenshot vorzutäuschen. Rein dekorativ.
 */
const BrowserSkizze: React.FC<{ adresse: string }> = ({ adresse }) => (
  <div aria-hidden className="border border-linie bg-raum-2">
    <div className="flex items-center gap-2 border-b border-linie px-4 py-3">
      <span className="h-2 w-2 rounded-full bg-text/20" />
      <span className="h-2 w-2 rounded-full bg-text/20" />
      <span className="h-2 w-2 rounded-full bg-text/20" />
      <span className="ml-3 flex-1 truncate bg-text/5 px-3 py-1 font-mono-code text-[10.5px] text-text-3">
        {adresse}
      </span>
    </div>
    <div className="flex flex-col gap-4 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium">simply switch</span>
        <span className="hidden gap-3 font-mono-code text-[10px] text-text-3 sm:flex">
          <span>PRIVAT</span>
          <span>BEAMTE</span>
          <span>VERTRAGSCHECK</span>
          <span>KONTAKT</span>
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="h-5 w-[72%] bg-text/10" />
        <div className="h-5 w-[46%] bg-signal/30" />
        <div className="mt-1.5 h-2 w-[62%] bg-text/[0.07]" />
        <div className="h-2 w-[54%] bg-text/[0.07]" />
      </div>
      <div className="mt-1 grid grid-cols-4 gap-2.5">
        <div className="h-14 border border-linie" />
        <div className="h-14 border border-linie" />
        <div className="h-14 border border-linie" />
        <div className="h-14 border border-signal/30" />
      </div>
    </div>
  </div>
);

/** Ausführliche Vorstellung des Live-Kundenprojekts. */
export const Fallstudie: React.FC<{ projekt: Projekt }> = ({ projekt }) => {
  const { sprache } = benutzeSpracheSpeicher();
  const adresse = projekt.live?.replace(/^https?:\/\//, '') ?? '';

  return (
    <Reveal art="auf">
      <div className="grid grid-cols-1 gap-8 border border-linie bg-text/[0.025] p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <BrowserSkizze adresse={projekt.live ?? ''} />
        </div>

        <div className="flex flex-col gap-5 lg:col-span-5">
          <h3 className="text-[32px] leading-none font-bold tracking-[-0.03em]">{projekt.titel}</h3>

          <p className="max-w-[60ch] text-[15px] leading-[1.7] text-text-2">
            {projekt.beschreibung[sprache]}
          </p>

          <ul className="flex flex-col gap-2.5">
            {projekt.highlights[sprache].map((h) => (
              <li key={h} className="flex gap-3 text-[14.5px] leading-snug text-text-2">
                <span className="shrink-0 text-signal">—</span>
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {projekt.tags.map((t) => (
              <span
                key={t}
                className="border border-linie-stark px-3 py-1.5 font-mono-code text-[11px] text-text-2"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={projekt.live}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="mt-auto inline-flex items-center gap-2 self-start pt-2 text-[15px] text-signal link-unterstrich"
          >
            {sprache === 'de' ? 'Live ansehen' : 'View live'}
            <span aria-hidden>↗</span>
            <span className="sr-only">{adresse}</span>
          </a>
        </div>
      </div>
    </Reveal>
  );
};

export default Fallstudie;

import React from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { hero, profil, projekte } from '../data/inhalt';
import Reveal from '../components/Reveal';
import Kennzahl from '../components/Kennzahl';

const liveProjekt = projekte.find((p) => p.live);

export const Hero: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();

  return (
    <section
      id="start"
      className="relative overflow-hidden px-5 pt-32 pb-20 sm:px-8 sm:pt-40 lg:px-12"
    >
      {/* Messlinie, die einmal durch den oberen Bereich wandert. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-5 top-0 h-px animate-scan bg-[linear-gradient(90deg,transparent,rgba(255,154,60,0.7),transparent)] sm:inset-x-8 lg:inset-x-12"
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal art="blende">
            <span className="font-mono-code text-xs tracking-[0.2em] uppercase text-text-3">
              {profil.rolle[sprache]}
            </span>
          </Reveal>

          <h1 className="mt-7 text-[clamp(2.75rem,7.5vw,5.125rem)] leading-[1.02] font-bold tracking-[-0.04em]">
            <Reveal art="auf" as="span" className="block">
              {hero.zeile1[sprache]}
            </Reveal>
            <Reveal art="auf" as="span" delay={0.12} className="block text-signal">
              {hero.zeile2[sprache]}
            </Reveal>
            <Reveal art="auf" as="span" delay={0.24} className="block">
              {hero.zeile3[sprache]}
            </Reveal>
          </h1>

          <Reveal art="auf" delay={0.36}>
            <p className="mt-8 max-w-[60ch] text-[17px] leading-[1.72] text-text-2">
              {hero.intro[sprache]}
            </p>
          </Reveal>

          <Reveal art="auf" delay={0.46} className="mt-10 flex flex-wrap gap-3.5">
            <a
              href="#werk"
              data-cursor
              className="bg-signal px-7 py-4 text-[15px] font-medium text-signal-tief shadow-[0_12px_44px_rgba(255,154,60,0.3)] transition-colors hover:bg-[#ffb066]"
            >
              {hero.ctaProjekte[sprache]}
            </a>
            <a
              href={`mailto:${profil.email}`}
              data-cursor
              className="border border-linie-stark px-7 py-4 text-[15px] transition-colors hover:border-signal hover:text-signal"
            >
              {profil.email}
            </a>
          </Reveal>
        </div>

        {liveProjekt && (
          <Reveal art="blende" delay={0.2} className="lg:col-span-5">
            <div className="border border-signal/30 bg-signal-weich/40 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2.5">
                  <span className="h-2 w-2 shrink-0 animate-blinken rounded-full bg-signal" />
                  <span className="font-mono-code text-[11px] tracking-[0.16em] uppercase text-signal">
                    {sprache === 'de' ? 'Live in Produktion' : 'Live in production'}
                  </span>
                </span>
                <span className="font-mono-code text-[11px] text-text-3">
                  {liveProjekt.kategorie === 'web' ? 'WEB' : ''}
                </span>
              </div>

              <a
                href={liveProjekt.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="mt-5 block text-3xl font-bold tracking-[-0.03em] transition-colors hover:text-signal"
              >
                simply-switch.de
              </a>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-text-2">
                {liveProjekt.untertitel[sprache]} —{' '}
                {sprache === 'de'
                  ? 'Konzept, Umsetzung und Auslieferung von mir.'
                  : 'designed, built and shipped by me.'}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-linie pt-5">
                {liveProjekt.kennzahlen?.map((k) => (
                  <Kennzahl
                    key={k.label.de}
                    wert={k.wert}
                    suffix={k.suffix}
                    label={k.label[sprache]}
                  />
                ))}
                <a
                  href={liveProjekt.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="group flex flex-col gap-1.5"
                >
                  <span className="text-2xl font-bold tracking-tight text-signal transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                  <span className="font-mono-code text-[10.5px] tracking-[0.1em] uppercase text-text-3 transition-colors group-hover:text-text-2">
                    {sprache === 'de' ? 'Live ansehen' : 'View live'}
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Hero;

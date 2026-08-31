import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { projekte } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import Fallstudie from '../components/Fallstudie';
import Reveal from '../components/Reveal';

const fallstudie = projekte.find((p) => p.live);
const weitere = projekte.filter((p) => !p.live);

export const Werk: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const [offen, setzeOffen] = useState<string | null>(null);

  return (
    <section id="werk" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      {fallstudie && (
        <>
          <SektionKopf
            nummer="02"
            label={sprache === 'de' ? 'Fallstudie' : 'Case study'}
            rechts={sprache === 'de' ? 'Kundenprojekt' : 'Client project'}
          />
          <Fallstudie projekt={fallstudie} />
        </>
      )}

      <div className="mt-24 sm:mt-32">
        <SektionKopf
          nummer="03"
          label={sprache === 'de' ? 'Weitere Arbeiten' : 'More work'}
          rechts={`${String(weitere.length).padStart(2, '0')} ${sprache === 'de' ? 'Einträge' : 'entries'}`}
        />

        <div>
          {weitere.map((p, i) => {
            const aktiv = offen === p.id;
            return (
              <Reveal key={p.id} art="auf" delay={i * 0.05}>
                <div className="border-t border-linie last:border-b">
                  <button
                    type="button"
                    onClick={() => setzeOffen(aktiv ? null : p.id)}
                    aria-expanded={aktiv}
                    data-cursor
                    className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-6 pl-5 text-left sm:gap-8"
                  >
                    {/* Signalkante der offenen Zeile */}
                    <span
                      aria-hidden
                      className={`absolute top-4 bottom-4 left-0 w-0.5 transition-all duration-500 ${
                        aktiv
                          ? 'bg-signal shadow-[0_0_14px_rgba(255,154,60,0.6)]'
                          : 'bg-transparent group-hover:bg-linie-stark'
                      }`}
                    />
                    <span className="font-mono-code text-xs text-signal">
                      {String(i + 2).padStart(3, '0')}
                    </span>
                    <span className="flex flex-col gap-1.5">
                      <span className="text-2xl leading-tight font-medium tracking-[-0.025em] sm:text-[26px]">
                        {p.titel}
                      </span>
                      <span className="text-[13.5px] text-text-3">{p.untertitel[sprache]}</span>
                    </span>
                    <span
                      aria-hidden
                      className={`text-xl leading-none text-text-3 transition-transform duration-500 ${
                        aktiv ? 'rotate-45 text-signal' : 'group-hover:text-text'
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {aktiv && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-8 pb-10 pl-5 lg:grid-cols-12">
                          <div className="flex flex-col gap-5 lg:col-span-6">
                            <p className="max-w-[62ch] text-[15.5px] leading-[1.7] text-text-2">
                              {p.beschreibung[sprache]}
                            </p>
                            <div>
                              <div className="label mb-2">
                                {sprache === 'de' ? 'Umsetzung' : 'Approach'}
                              </div>
                              <p className="max-w-[62ch] text-[15px] leading-[1.7] text-text-2">
                                {p.architektur[sprache]}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {p.tags.map((t) => (
                                <span
                                  key={t}
                                  className="border border-linie px-2.5 py-1 font-mono-code text-[11px] text-text-3"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="lg:col-span-5 lg:col-start-8">
                            <div className="label mb-3">
                              {sprache === 'de' ? 'Kern-Features' : 'Key features'}
                            </div>
                            <ul className="flex flex-col gap-3">
                              {p.highlights[sprache].map((h, hi) => (
                                <li key={h} className="flex gap-3 text-[14.5px] leading-snug text-text-2">
                                  <span className="shrink-0 font-mono-code text-[11px] text-signal">
                                    {String(hi + 1).padStart(2, '0')}
                                  </span>
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Werk;

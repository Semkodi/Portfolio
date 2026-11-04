import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { projekte } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import Fallstudie from '../components/Fallstudie';
import Reveal from '../components/Reveal';
import { audio } from '../utils/audio';
import { FolderGit2, ChevronDown, ExternalLink } from 'lucide-react';

const fallstudie = projekte.find((p) => p.live);
const weitere = projekte.filter((p) => !p.live);

export const Werk: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const [offen, setzeOffen] = useState<string | null>(null);

  const toggleProjekt = (id: string) => {
    const neuerZustand = offen === id ? null : id;
    setzeOffen(neuerZustand);
    audio.spieleKlick();
  };

  return (
    <section id="werk" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 bg-raum border-b border-linie-stark">
      {/* 02. Flagship Fallstudie simply switch */}
      {fallstudie && (
        <div>
          <SektionKopf
            nummer="02"
            label={sprache === 'de' ? 'Fallstudie & Flagship' : 'Case study & Flagship'}
            rechts={sprache === 'de' ? 'Kundenprojekt // simply switch' : 'Client project // simply switch'}
          />
          <div className="mt-8">
            <Fallstudie projekt={fallstudie} />
          </div>
        </div>
      )}

      {/* Weitere Arbeiten & Architektur-Systeme */}
      <div className="mt-28 sm:mt-36">
        <div className="flex items-center justify-between border-b border-linie pb-4">
          <div className="flex items-center gap-2.5 font-mono-code text-[12px] text-signal font-semibold uppercase tracking-[0.2em]">
            <FolderGit2 className="h-4 w-4" />
            <span>WEITERE SYSTEME & PROJEKTE</span>
          </div>
          <span className="font-mono-code text-[11px] text-text-3">
            {weitere.length} {sprache === 'de' ? 'REPOSITORIES' : 'REPOSITORIES'}
          </span>
        </div>

        <div className="mt-4">
          {weitere.map((p, i) => {
            const aktiv = offen === p.id;
            return (
              <Reveal key={p.id} art="auf" delay={i * 0.05}>
                <div className="border-b border-linie/80 transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleProjekt(p.id)}
                    aria-expanded={aktiv}
                    className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-6 pl-5 text-left sm:gap-8 hover:bg-raum-2/60 transition-colors"
                  >
                    {/* Leuchtende Signalkante links */}
                    <span
                      aria-hidden
                      className={`absolute top-3 bottom-3 left-0 w-1 rounded-r transition-all duration-300 ${
                        aktiv
                          ? 'bg-signal shadow-[0_0_12px_#ff9a3c]'
                          : 'bg-transparent group-hover:bg-linie-stark'
                      }`}
                    />

                    {/* Commit/Index Nummer */}
                    <span className="font-mono-code text-xs text-signal font-semibold">
                      #{String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Titel & Subtitel */}
                    <span className="flex flex-col gap-1">
                      <span className="text-xl sm:text-2xl font-bold tracking-tight text-text group-hover:text-signal transition-colors">
                        {p.titel}
                      </span>
                      <span className="font-mono-code text-[12px] text-text-3">
                        {p.untertitel[sprache]}
                      </span>
                    </span>

                    {/* Expand Chevron */}
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline font-mono-code text-[11px] text-text-3">
                        {aktiv ? '[SCHLIESSEN]' : '[DETAILS]'}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-text-3 transition-transform duration-300 ${
                          aktiv ? 'rotate-180 text-signal' : 'group-hover:text-text'
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {aktiv && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden bg-raum-2/40"
                      >
                        <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-12 border-t border-linie/60">
                          <div className="flex flex-col gap-5 lg:col-span-7">
                            <p className="text-[15px] leading-[1.7] text-text-2">
                              {p.beschreibung[sprache]}
                            </p>
                            <div>
                              <span className="font-mono-code text-[11px] text-signal font-semibold uppercase tracking-wider block mb-1.5">
                                [ARCHITEKTUR & UMSETZUNG]
                              </span>
                              <p className="text-[14.5px] leading-[1.7] text-text-2">
                                {p.architektur[sprache]}
                              </p>
                            </div>

                            {/* Tech Badges */}
                            <div className="flex flex-wrap gap-2 pt-2">
                              {p.tags.map((t) => (
                                <span
                                  key={t}
                                  className="rounded border border-linie bg-raum px-2.5 py-1 font-mono-code text-[10.5px] text-text-3"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-linie/60 lg:pl-8">
                            <span className="font-mono-code text-[11px] text-signal font-semibold uppercase tracking-wider block mb-3">
                              [KERN-FUNKTIONEN]
                            </span>
                            <ul className="space-y-2.5">
                              {p.highlights[sprache].map((h, hi) => (
                                <li
                                  key={h}
                                  className="flex items-start gap-2.5 text-[14px] leading-snug text-text-2"
                                >
                                  <span className="font-mono-code text-[11px] text-signal shrink-0 pt-0.5">
                                    0{hi + 1}
                                  </span>
                                  <span>{h}</span>
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

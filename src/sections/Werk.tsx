import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { projekte } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import Fallstudie from '../components/Fallstudie';
import Reveal from '../components/Reveal';
import { audio } from '../utils/audio';
import { FolderGit2, ChevronDown, ExternalLink, Github, Globe, Lock } from 'lucide-react';

const fallstudie = projekte.find((p) => p.id === 'simply-switch') || projekte[0];
const weitere = projekte.filter((p) => p.id !== 'simply-switch');

export const Werk: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const [offen, setzeOffen] = useState<string | null>('mendix-thm');

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-linie pb-4 gap-2">
          <div className="flex items-center gap-2.5 font-mono-code text-[12px] text-signal font-semibold uppercase tracking-[0.2em]">
            <FolderGit2 className="h-4 w-4" />
            <span>{sprache === 'de' ? 'WEITERE SYSTEME & OPEN-SOURCE REPOSITORIES' : 'MORE SYSTEMS & OPEN-SOURCE REPOSITORIES'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-[11px] text-text-3">
              {weitere.length} {sprache === 'de' ? 'SYSTEME ONLINE' : 'SYSTEMS ONLINE'}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {weitere.map((p, i) => {
            const aktiv = offen === p.id;
            return (
              <Reveal key={p.id} art="auf" delay={i * 0.05}>
                <div
                  className={`rounded-xl border transition-all duration-300 ${
                    aktiv
                      ? 'border-signal/80 bg-raum-2/80 shadow-[0_8px_30px_rgba(255,154,60,0.12)]'
                      : 'border-linie bg-raum-2/40 hover:border-linie-stark hover:bg-raum-2/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleProjekt(p.id)}
                    aria-expanded={aktiv}
                    className="group relative flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 text-left"
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

                    {/* Titel, Index & Badges */}
                    <div className="flex items-start sm:items-center gap-4 min-w-0">
                      <span className="font-mono-code text-xs text-signal font-bold pt-0.5 sm:pt-0 shrink-0">
                        #{String(i + 1).padStart(2, '0')}
                      </span>

                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="text-lg sm:text-xl font-bold tracking-tight text-text group-hover:text-signal transition-colors">
                            {p.titel}
                          </span>
                          <span className="inline-block rounded border border-signal/30 bg-signal/10 px-2 py-0.5 font-mono-code text-[10px] font-bold uppercase tracking-wider text-signal">
                            {p.badge}
                          </span>
                        </div>
                        <p className="font-mono-code text-[12px] text-text-3 truncate">
                          {p.untertitel[sprache]}
                        </p>
                      </div>
                    </div>

                    {/* Rechte Seite: Tags Vorschau & Chevron */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-linie/40">
                      <div className="hidden lg:flex items-center gap-1.5">
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded border border-linie/80 bg-raum px-2 py-0.5 font-mono-code text-[10px] text-text-3"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-[11px] text-text-3 hidden sm:inline">
                          {aktiv ? '[SCHLIESSEN]' : '[DETAILS]'}
                        </span>
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg border border-linie transition-all ${
                            aktiv ? 'border-signal bg-signal/15 text-signal' : 'bg-raum text-text-3 group-hover:text-text'
                          }`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${aktiv ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {aktiv && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-12 border-t border-linie/60 bg-raum-2/30">
                          {/* Linke Spalte: Beschreibung & Architektur & Action-Links */}
                          <div className="flex flex-col gap-6 lg:col-span-7">
                            <p className="text-[15px] leading-[1.7] text-text-2">
                              {p.beschreibung[sprache]}
                            </p>

                            <div className="rounded-lg border border-linie/80 bg-raum/60 p-4 sm:p-5">
                              <span className="font-mono-code text-[11px] text-signal font-semibold uppercase tracking-wider block mb-1.5">
                                [ARCHITEKTUR & CODE-PATTERNS]
                              </span>
                              <p className="text-[14px] leading-[1.7] text-text-2">
                                {p.architektur[sprache]}
                              </p>
                            </div>

                            {/* Tech Badges */}
                            <div>
                              <span className="font-mono-code text-[10.5px] text-text-3 uppercase tracking-wider block mb-2">
                                EINGESETZTE TECHNOLOGIEN:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {p.tags.map((t) => (
                                  <span
                                    key={t}
                                    className="rounded border border-linie bg-raum px-2.5 py-1 font-mono-code text-[11px] text-text-2 font-medium"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons: GitHub & Live Demo */}
                            <div className="flex flex-wrap items-center gap-3 pt-2">
                              {p.github && (
                                <a
                                  href={p.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-lg border border-linie-stark bg-raum-2 px-4 py-2.5 font-mono-code text-[12px] font-semibold text-text hover:border-signal hover:text-signal hover:bg-raum transition-all shadow-sm"
                                >
                                  <Github className="h-4 w-4" />
                                  <span>GitHub Repository</span>
                                  <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
                                </a>
                              )}

                              {p.live && (
                                <a
                                  href={p.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-lg border border-signal/60 bg-signal/15 px-4 py-2.5 font-mono-code text-[12px] font-bold text-signal hover:bg-signal hover:text-signal-tief transition-all shadow-sm"
                                >
                                  <Globe className="h-4 w-4" />
                                  <span>Live Demo aufrufen</span>
                                  <ExternalLink className="h-3 w-3 ml-0.5" />
                                </a>
                              )}

                              {!p.github && !p.live && (
                                <div className="inline-flex items-center gap-2 rounded-lg border border-linie/80 bg-raum/80 px-3.5 py-2 font-mono-code text-[11.5px] text-text-3">
                                  <Lock className="h-3.5 w-3.5 text-signal" />
                                  <span>Internes Hochschulprojekt (THM Wetzlar) · 12 Tickets im Produktivbetrieb</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Rechte Spalte: Kernfunktionen & Meilensteine */}
                          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-linie/60 lg:pl-8 flex flex-col justify-between">
                            <div>
                              <span className="font-mono-code text-[11px] text-signal font-semibold uppercase tracking-wider block mb-4">
                                [KERN-FUNKTIONEN & ERGEBNISSE]
                              </span>
                              <ul className="space-y-3">
                                {p.highlights[sprache].map((h, hi) => (
                                  <li
                                    key={h}
                                    className="flex items-start gap-3 rounded-lg border border-linie/40 bg-raum/40 p-3 text-[13.5px] leading-snug text-text-2 hover:border-linie transition-colors"
                                  >
                                    <span className="font-mono-code text-[11px] text-signal font-bold shrink-0 pt-0.5">
                                      0{hi + 1}
                                    </span>
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mt-6 pt-4 border-t border-linie/40 flex items-center justify-between text-text-3 font-mono-code text-[11px]">
                              <span>VERIFIZIERT & DOKUMENTIERT</span>
                              <span className="text-signal font-semibold">STATUS // BEREIT</span>
                            </div>
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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { projekte } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import Reveal from '../components/Reveal';

export const Werk: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const [offen, setOffen] = useState<string | null>(projekte[0]?.id ?? null);

  return (
    <section id="werk" className="relative py-24 sm:py-36 px-5 sm:px-8 max-w-[1500px] mx-auto">
      <SektionKopf
        nummer="02"
        label={sprache === 'de' ? 'Ausgewählte Arbeiten' : 'Selected work'}
        titel={
          <>
            {sprache === 'de' ? 'Projekte' : 'Projects'}{' '}
            <span className="italic-display text-[color:var(--color-sienna)]">({projekte.length})</span>
          </>
        }
      />

      <div className="regel">
        {projekte.map((p, i) => {
          const aktiv = offen === p.id;
          return (
            <Reveal key={p.id} art="auf" delay={i * 0.05} className="regel">
              <button
                onClick={() => setOffen(aktiv ? null : p.id)}
                data-cursor
                className="group w-full text-left py-6 sm:py-8 grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-8"
              >
                <span className="font-mono-code text-xs text-[color:var(--color-ink-faint)] group-hover:text-[color:var(--color-sienna)] transition-colors">
                  0{i + 1}
                </span>
                <span className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                  <span
                    className={`font-display text-3xl sm:text-5xl lg:text-6xl leading-none transition-all duration-500 group-hover:translate-x-2 ${
                      aktiv ? 'text-[color:var(--color-sienna)]' : ''
                    }`}
                  >
                    {p.titel}
                  </span>
                  <span className="label mt-2 sm:mt-0">{p.badge}</span>
                </span>
                <span
                  className={`font-display text-2xl leading-none transition-transform duration-500 ${
                    aktiv ? 'rotate-45' : ''
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
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 pt-2">
                      <div className="lg:col-span-1 hidden lg:block" />
                      <div className="lg:col-span-6 space-y-5">
                        <p className="font-display text-xl sm:text-2xl leading-snug">{p.beschreibung[sprache]}</p>
                        <div>
                          <div className="label mb-2">{sprache === 'de' ? 'Umsetzung' : 'Approach'}</div>
                          <p className="text-[color:var(--color-ink-soft)] leading-relaxed">{p.architektur[sprache]}</p>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 regel">
                          {p.tags.map((t) => (
                            <span key={t} className="font-mono-code text-xs text-[color:var(--color-ink-faint)]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="lg:col-span-4 lg:col-start-9">
                        <div className="label mb-3">{sprache === 'de' ? 'Kern-Features' : 'Key features'}</div>
                        <ul className="space-y-3">
                          {p.highlights[sprache].map((h, hi) => (
                            <li key={hi} className="flex gap-3 text-sm leading-snug">
                              <span className="font-mono-code text-xs text-[color:var(--color-sienna)] shrink-0">
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
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Werk;

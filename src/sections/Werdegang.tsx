import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { werdegang } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import Reveal from '../components/Reveal';

export const Werdegang: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 85%'] });
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="werdegang" className="relative py-24 sm:py-36 px-5 sm:px-8 max-w-[1500px] mx-auto">
      <SektionKopf
        nummer="04"
        label={sprache === 'de' ? 'Werdegang' : 'Career'}
        titel={
          <>
            {sprache === 'de' ? 'Der' : 'The'}{' '}
            <span className="italic-display text-[color:var(--color-sienna)]">{sprache === 'de' ? 'Weg' : 'path'}</span>
          </>
        }
      />

      <div ref={ref} className="relative pl-6 sm:pl-8">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[color:var(--color-line)]" />
        <motion.div className="absolute left-0 top-0 w-px bg-[color:var(--color-sienna)]" style={{ height: h }} />

        <div className="regel">
          {werdegang.map((s, i) => (
            <Reveal
              key={i}
              art="auf"
              delay={i * 0.06}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 regel"
            >
              <div className="md:col-span-3">
                <div className="font-display text-3xl sm:text-4xl">{s.zeitraum[sprache]}</div>
                <div className="label mt-2">{s.badge[sprache]}</div>
              </div>
              <div className="md:col-span-9 space-y-3">
                <h3 className="font-display text-2xl sm:text-3xl leading-tight">{s.titel[sprache]}</h3>
                <p className="font-mono-code text-xs text-[color:var(--color-ink-faint)]">{s.organisation[sprache]}</p>
                <p className="text-[color:var(--color-ink-soft)] leading-relaxed max-w-2xl">{s.beschreibung[sprache]}</p>
                <ul className="flex flex-wrap gap-x-6 gap-y-1 pt-2">
                  {s.punkte[sprache].map((p, pi) => (
                    <li key={pi} className="font-mono-code text-xs text-[color:var(--color-ink-faint)] flex gap-2">
                      <span className="text-[color:var(--color-sienna)]">—</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Werdegang;

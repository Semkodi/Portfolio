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
  const hoehe = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="werdegang" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SektionKopf
        nummer="05"
        label={sprache === 'de' ? 'Werdegang' : 'Career'}
        rechts={`${String(werdegang.length).padStart(2, '0')} ${sprache === 'de' ? 'Stationen' : 'stages'}`}
      />

      {/* Die Linie füllt sich mit dem Scrollfortschritt — sie zeigt, wie weit
          man in der Zeitleiste ist. */}
      <div ref={ref} className="relative pl-7 sm:pl-9">
        <div aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-linie" />
        <motion.div
          aria-hidden
          className="absolute top-0 left-0 w-px bg-signal"
          style={{ height: hoehe }}
        />

        {werdegang.map((s, i) => (
          <Reveal key={s.titel.de} art="auf" delay={i * 0.06}>
            <div className="grid grid-cols-1 gap-4 border-t border-linie py-9 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <div className="text-2xl font-medium tracking-[-0.02em]">{s.zeitraum[sprache]}</div>
                <div className="label mt-2">{s.badge[sprache]}</div>
              </div>
              <div className="flex flex-col gap-3 md:col-span-9">
                <h3 className="text-xl leading-snug font-medium tracking-[-0.02em] sm:text-[22px]">
                  {s.titel[sprache]}
                </h3>
                <p className="font-mono-code text-[11.5px] tracking-[0.08em] text-text-3">
                  {s.organisation[sprache]}
                </p>
                <p className="max-w-[64ch] text-[15px] leading-[1.7] text-text-2">
                  {s.beschreibung[sprache]}
                </p>
                <ul className="mt-1 flex flex-wrap gap-x-6 gap-y-1.5">
                  {s.punkte[sprache].map((p) => (
                    <li key={p} className="flex gap-2 font-mono-code text-[11.5px] text-text-3">
                      <span className="text-signal">—</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Werdegang;

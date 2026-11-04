import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { werdegang } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import { ScanHeadline } from '../components/ScanHeadline';
import { audio } from '../utils/audio';
import { GitCommit, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const Werdegang: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const ref = useRef<HTMLDivElement | null>(null);
  const [aktiveStation, setAktiveStation] = useState<number>(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 85%'] });
  const hoehe = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const klickStation = (idx: number) => {
    setAktiveStation(idx);
    audio.spieleBefehl();
  };

  return (
    <section id="werdegang" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 bg-raum border-b border-linie-stark">
      <SektionKopf
        nummer="04"
        label={sprache === 'de' ? 'Werdegang & Meilensteine' : 'Career & Milestones'}
        rechts={`${werdegang.length} ${sprache === 'de' ? 'Stationen' : 'stages'}`}
      />

      <div className="mt-8 border-b border-linie pb-8">
        <ScanHeadline
          titel={
            sprache === 'de'
              ? 'Vom soliden Fundament zum produktiven Entwickler.'
              : 'From solid foundations to shipping production code.'
          }
          kursivWort="Fundament"
          akzentWort="Entwickler."
          subtitel="MEILENSTEINE // PRAXIS-TIMELINE"
        />
      </div>

      {/* Interaktive Timeline */}
      <div ref={ref} style={{ position: 'relative' }} className="relative mt-12 pl-6 sm:pl-10">
        {/* Durchgehende Timeline-Linie */}
        <div aria-hidden className="absolute top-0 bottom-0 left-2 w-0.5 bg-linie" />
        {/* Dynamisch mitscrollende Signallinie */}
        <motion.div
          aria-hidden
          className="absolute top-0 left-2 w-0.5 bg-gradient-to-b from-signal via-signal to-[#ffb066] shadow-[0_0_12px_#ff9a3c]"
          style={{ height: hoehe }}
        />

        <div className="space-y-10">
          {werdegang.map((s, i) => {
            const istAusgewaehlt = aktiveStation === i;

            return (
              <div
                key={s.titel.de}
                onClick={() => klickStation(i)}
                className={`group relative cursor-pointer rounded-xl border p-6 sm:p-8 transition-all duration-300 ${
                  istAusgewaehlt
                    ? 'border-signal bg-raum-2/90 shadow-[0_12px_36px_rgba(255,154,60,0.18)] scale-[1.01]'
                    : 'border-linie bg-raum-2/40 hover:border-linie-stark hover:bg-raum-2/70 opacity-75 hover:opacity-100'
                }`}
              >
                {/* Git Commit Node auf der Linie */}
                <div
                  className={`absolute -left-[27px] sm:-left-[43px] top-8 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                    istAusgewaehlt
                      ? 'border-signal bg-signal shadow-[0_0_12px_#ff9a3c]'
                      : 'border-linie bg-raum group-hover:border-signal'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      istAusgewaehlt ? 'bg-signal-tief' : 'bg-text-3'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
                  {/* Zeitraum & Badge */}
                  <div className="md:col-span-4 space-y-2">
                    <div className="flex items-center gap-2 font-mono-code text-[11px] text-signal font-semibold">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{s.zeitraum[sprache]}</span>
                    </div>

                    <div className="inline-block rounded border border-signal/40 bg-signal/15 px-2.5 py-1 font-mono-code text-[11px] font-bold uppercase text-signal">
                      {s.badge[sprache]}
                    </div>

                    <p className="font-mono-code text-[12px] text-text-3 pt-1">
                      {s.organisation[sprache]}
                    </p>
                  </div>

                  {/* Titel & Tätigkeiten */}
                  <div className="md:col-span-8 space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text">
                      {s.titel[sprache]}
                    </h3>

                    <p className="text-[15px] leading-[1.7] text-text-2">
                      {s.beschreibung[sprache]}
                    </p>

                    {/* Meilenstein-Punkte */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-linie/60">
                      {s.punkte[sprache].map((p) => (
                        <div
                          key={p}
                          className="flex items-start gap-2 font-mono-code text-[11.5px] text-text-2"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-signal shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Werdegang;

import React from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { skillGruppen } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import Reveal from '../components/Reveal';

export const Skills: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();

  return (
    <section id="skills" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SektionKopf
        nummer="04"
        label={sprache === 'de' ? 'Werkzeuge' : 'Tooling'}
        rechts={`${skillGruppen.length} ${sprache === 'de' ? 'Bereiche' : 'areas'}`}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {skillGruppen.map((g, i) => (
          <Reveal key={g.kategorie.de} art="auf" delay={i * 0.06}>
            <div className="relative h-full overflow-hidden border border-linie p-6">
              {/* Lichtstreifen, versetzt je Spalte */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-[70px] animate-streifen bg-[linear-gradient(90deg,transparent,rgba(255,154,60,0.09),transparent)]"
                style={{ animationDelay: `${i * 0.9}s` }}
              />
              <span className="relative font-mono-code text-[11px] tracking-[0.14em] uppercase text-signal">
                {g.kategorie[sprache]}
              </span>
              <ul className="relative mt-4 flex flex-col gap-2.5">
                {g.items.map((it) => (
                  <li key={it.name} className="text-[14.5px] text-text-2">
                    {it.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;

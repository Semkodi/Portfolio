import React from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { skillGruppen } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import Reveal from '../components/Reveal';

export const Skills: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();

  return (
    <section id="skills" className="relative py-24 sm:py-36 px-5 sm:px-8 max-w-[1500px] mx-auto">
      <SektionKopf
        nummer="03"
        label={sprache === 'de' ? 'Werkzeuge' : 'Tooling'}
        titel={
          <>
            {sprache === 'de' ? 'Stack &' : 'Stack &'}{' '}
            <span className="italic-display text-[color:var(--color-sienna)]">
              {sprache === 'de' ? 'Fähigkeiten' : 'skills'}
            </span>
          </>
        }
      />

      <div className="regel">
        {skillGruppen.map((g, i) => (
          <Reveal
            key={i}
            art="auf"
            delay={i * 0.05}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-9 regel"
          >
            <div className="md:col-span-4 flex items-baseline gap-3">
              <span className="font-mono-code text-xs text-[color:var(--color-sienna)]">0{i + 1}</span>
              <h3 className="font-display text-2xl sm:text-3xl">{g.kategorie[sprache]}</h3>
            </div>
            <div className="md:col-span-8">
              <p className="font-display text-xl sm:text-3xl leading-snug">
                {g.items.map((it, k) => (
                  <span key={it.name}>
                    <span className={it.level >= 82 ? 'text-[color:var(--color-ink)]' : 'text-[color:var(--color-ink-faint)]'}>
                      {it.name}
                    </span>
                    {k < g.items.length - 1 && <span className="text-[color:var(--color-ink-faint)] px-2">·</span>}
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;

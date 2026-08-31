import React from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { profil } from '../data/inhalt';
import Monogramm from './Monogramm';

export const Fussbereich: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const jahr = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[color:var(--color-ink)] px-5 sm:px-8 max-w-[1500px] mx-auto pt-16 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4 text-[color:var(--color-ink)]">
            <Monogramm groesse={34} />
          </div>
          <p className="font-display text-4xl sm:text-6xl leading-[0.9]">
            {sprache === 'de' ? 'Lass uns' : "Let's"}
            <br />
            <span className="italic-display text-[color:var(--color-sienna)]">
              {sprache === 'de' ? 'etwas bauen.' : 'build something.'}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2 font-mono-code text-xs sm:text-right">
          <a href={`mailto:${profil.email}`} className="link-unterstrich" data-cursor>
            {profil.email}
          </a>
          <a href={profil.github} target="_blank" rel="noopener noreferrer" className="link-unterstrich" data-cursor>
            GitHub ↗
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="link-unterstrich sm:self-end"
            data-cursor
          >
            {sprache === 'de' ? 'Nach oben ↑' : 'Back to top ↑'}
          </button>
        </div>
      </div>

      <div className="mt-16 pt-6 regel flex flex-col sm:flex-row justify-between gap-2 label">
        <span>© {jahr} {profil.name}</span>
        <span>React · TypeScript · Vite · Tailwind · Fraunces</span>
      </div>
    </footer>
  );
};

export default Fussbereich;

import React from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { profil } from '../data/inhalt';

export const Fussbereich: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const jahr = new Date().getFullYear();

  // E-Mail dynamisch generieren (Schutz vor automatischen Scraping-Bots)
  const emailAdresse = `${'borogovacsemir'}@${'gmail.com'}`;

  return (
    <footer className="relative border-t border-linie px-5 pt-10 pb-9 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center border border-signal font-mono-code text-[10px] text-signal">
            {profil.initialen}
          </span>
          <span className="font-mono-code text-[11px] tracking-[0.12em] uppercase text-text-3">
            © {jahr} {profil.name}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 font-mono-code text-[11px] tracking-[0.1em] uppercase">
          <a href={`mailto:${emailAdresse}`} className="link-unterstrich text-text-2" data-cursor>
            {emailAdresse}
          </a>
          <a
            href={profil.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-unterstrich text-text-2"
            data-cursor
          >
            GitHub ↗
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="link-unterstrich text-text-2"
            data-cursor
          >
            {sprache === 'de' ? 'Nach oben ↑' : 'Back to top ↑'}
          </button>
        </div>
      </div>

      <div className="mt-8 border-t border-linie pt-5 font-mono-code text-[10.5px] tracking-[0.1em] uppercase text-text-3">
        React · TypeScript · Vite · Tailwind v4 · Chivo
      </div>
    </footer>
  );
};

export default Fussbereich;

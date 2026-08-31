import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { profil, ui } from '../data/inhalt';
import { sektionen, sektionsIds } from '../data/navigation';
import { benutzeAktiveSektion } from '../hooks/benutzeAktiveSektion';

/**
 * Statuszeile am oberen Rand: Verfügbarkeit links, Sektionen in der Mitte,
 * Standort und Sprache rechts. Unter `lg` trägt sie zusätzlich Monogramm
 * und Menüschalter, weil die Seitenleiste dort nicht mitläuft.
 */
export const Statusleiste: React.FC = () => {
  const { sprache, setzeSprache } = benutzeSpracheSpeicher();
  const aktiv = benutzeAktiveSektion(sektionsIds);
  const [gescrollt, setzeGescrollt] = useState(false);
  const [menueOffen, setzeMenueOffen] = useState(false);

  useEffect(() => {
    const beiScroll = () => setzeGescrollt(window.scrollY > 12);
    beiScroll();
    window.addEventListener('scroll', beiScroll, { passive: true });
    return () => window.removeEventListener('scroll', beiScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 lg:left-[88px] z-40 border-b transition-colors duration-300 ${
        gescrollt ? 'border-linie bg-raum/85 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <a
            href="#start"
            aria-label={ui.nav.home[sprache]}
            className="flex h-8 w-8 items-center justify-center border border-signal font-mono-code text-[11px] text-signal lg:hidden"
          >
            {profil.initialen}
          </a>
          <span className="flex items-center gap-2.5">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-signal animate-blinken" />
            <span className="font-mono-code text-[11px] tracking-[0.12em] text-signal uppercase">
              {profil.verfuegbar[sprache]}
            </span>
          </span>
        </div>

        <nav
          aria-label={sprache === 'de' ? 'Sektionen' : 'Sections'}
          className="hidden md:flex items-center gap-7"
        >
          {sektionen.map(({ id, navSchluessel }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={aktiv === id ? 'true' : undefined}
              className={`font-mono-code text-[11px] tracking-[0.12em] uppercase transition-colors ${
                aktiv === id ? 'text-text' : 'text-text-3 hover:text-text-2'
              }`}
            >
              {ui.nav[navSchluessel][sprache]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <span className="hidden xl:block font-mono-code text-[11px] tracking-[0.12em] text-text-3 uppercase">
            {profil.standort[sprache]}
          </span>
          <div className="flex items-center gap-1 font-mono-code text-[11px]">
            <button
              type="button"
              onClick={() => setzeSprache('de')}
              aria-pressed={sprache === 'de'}
              className={sprache === 'de' ? 'text-text' : 'text-text-3 hover:text-text-2'}
            >
              DE
            </button>
            <span className="text-text-3">/</span>
            <button
              type="button"
              onClick={() => setzeSprache('en')}
              aria-pressed={sprache === 'en'}
              className={sprache === 'en' ? 'text-text' : 'text-text-3 hover:text-text-2'}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            onClick={() => setzeMenueOffen((v) => !v)}
            aria-expanded={menueOffen}
            className="md:hidden font-mono-code text-[11px] tracking-[0.12em] uppercase text-text"
          >
            {menueOffen ? (sprache === 'de' ? 'Zu' : 'Close') : (sprache === 'de' ? 'Menü' : 'Menu')}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menueOffen && (
          <motion.nav
            aria-label={sprache === 'de' ? 'Sektionen' : 'Sections'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-b border-linie bg-raum"
          >
            <div className="flex flex-col px-5 py-3">
              {sektionen.map(({ id, navSchluessel }, i) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setzeMenueOffen(false)}
                  className="flex min-h-[52px] items-center gap-4 border-t border-linie text-2xl"
                >
                  <span className="font-mono-code text-[11px] text-signal">
                    {String(i + 1).padStart(3, '0')}
                  </span>
                  {ui.nav[navSchluessel][sprache]}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Statusleiste;

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { profil, ui } from '../data/inhalt';
import { sektionen, sektionsIds } from '../data/navigation';
import { benutzeAktiveSektion } from '../hooks/benutzeAktiveSektion';
import { Menu, X } from 'lucide-react';

/**
 * Statuszeile am oberen Rand: Verfügbarkeit links, Sektionen in der Mitte,
 * Standort und Sprache rechts. Unter `lg` trägt sie zusätzlich Monogramm
 * und einen kompakten Menü-Button.
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
        gescrollt ? 'border-linie bg-raum/90 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4 lg:px-12">
        {/* Linke Seite: Monogramm & Verfügbarkeits-Pill (Kompakt auf Mobile) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <a
            href="#start"
            aria-label={ui.nav.home[sprache]}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center border border-signal font-mono-code text-[10.5px] sm:text-[11px] text-signal lg:hidden shrink-0 transition-colors hover:bg-signal hover:text-signal-tief"
          >
            {profil.initialen}
          </a>
          <span className="flex items-center gap-2">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-signal animate-blinken" />
            <span className="font-mono-code text-[10.5px] sm:text-[11px] tracking-[0.1em] text-signal uppercase">
              <span className="hidden sm:inline">{profil.verfuegbar[sprache]}</span>
              <span className="sm:hidden font-bold">VERFÜGBAR</span>
            </span>
          </span>
        </div>

        {/* Desktop Navigation */}
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
                aktiv === id ? 'text-text font-bold' : 'text-text-3 hover:text-text-2'
              }`}
            >
              {ui.nav[navSchluessel][sprache]}
            </a>
          ))}
        </nav>

        {/* Rechte Seite: Sprache & kompakter Menü-Button */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <span className="hidden xl:block font-mono-code text-[11px] tracking-[0.12em] text-text-3 uppercase">
            {profil.standort[sprache]}
          </span>
          <div className="flex items-center gap-1 font-mono-code text-[10.5px] sm:text-[11px]">
            <button
              type="button"
              onClick={() => setzeSprache('de')}
              aria-pressed={sprache === 'de'}
              className={sprache === 'de' ? 'text-text font-bold' : 'text-text-3 hover:text-text-2'}
            >
              DE
            </button>
            <span className="text-text-3">/</span>
            <button
              type="button"
              onClick={() => setzeSprache('en')}
              aria-pressed={sprache === 'en'}
              className={sprache === 'en' ? 'text-text font-bold' : 'text-text-3 hover:text-text-2'}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => setzeMenueOffen((v) => !v)}
            aria-expanded={menueOffen}
            className="flex items-center gap-1.5 rounded border border-linie bg-raum-2/90 px-2.5 py-1 font-mono-code text-[10.5px] uppercase tracking-wider text-text transition-colors hover:border-signal hover:text-signal md:hidden shrink-0 shadow-sm"
          >
            {menueOffen ? (
              <>
                <X className="h-3.5 w-3.5 text-signal" />
                <span>ZU</span>
              </>
            ) : (
              <>
                <Menu className="h-3.5 w-3.5 text-signal" />
                <span>MENÜ</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobiles Dropdown Menü */}
      <AnimatePresence>
        {menueOffen && (
          <motion.nav
            aria-label={sprache === 'de' ? 'Sektionen' : 'Sections'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-b border-linie bg-raum-2 shadow-2xl"
          >
            <div className="flex flex-col px-5 py-3">
              {sektionen.map(({ id, navSchluessel }, i) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setzeMenueOffen(false)}
                  className="flex min-h-[48px] items-center gap-4 border-t border-linie/60 text-lg font-medium text-text hover:text-signal transition-colors"
                >
                  <span className="font-mono-code text-[11px] text-signal font-bold">
                    {String(i + 1).padStart(2, '0')}
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

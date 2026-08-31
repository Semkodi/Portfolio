import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { ui, profil } from '../data/inhalt';
import Monogramm from './Monogramm';

const sektionen = ['werk', 'profil', 'skills', 'werdegang', 'kontakt'] as const;
const navKey: Record<(typeof sektionen)[number], keyof typeof ui.nav> = {
  werk: 'projekte',
  profil: 'ueber',
  skills: 'skills',
  werdegang: 'werdegang',
  kontakt: 'kontakt',
};

export const Navigation: React.FC = () => {
  const { sprache, setzeSprache } = benutzeSpracheSpeicher();
  const [scrolled, setScrolled] = useState(false);
  const [offen, setOffen] = useState(false);
  const { scrollYProgress } = useScroll();
  const fortschritt = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-[color:var(--color-sienna)]"
        style={{ scaleX: fortschritt }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-[color:var(--color-paper)]/85 backdrop-blur-md border-b border-[color:var(--color-line)]' : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
          <a href="#start" className="flex items-center gap-3 text-[color:var(--color-ink)]" data-cursor>
            <Monogramm groesse={30} />
            <span className="font-mono-code text-xs tracking-wide hidden sm:block">
              {profil.name}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {sektionen.map((s, i) => (
              <a
                key={s}
                href={`#${s}`}
                className="label !text-[color:var(--color-ink-soft)] hover:!text-[color:var(--color-ink)] link-unterstrich transition-colors"
              >
                <span className="text-[color:var(--color-ink-faint)] mr-1">0{i + 1}</span>
                {ui.nav[navKey[s]][sprache]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-mono-code text-xs">
              <button
                onClick={() => setzeSprache('de')}
                className={sprache === 'de' ? 'text-[color:var(--color-ink)] font-bold' : 'text-[color:var(--color-ink-faint)]'}
              >
                DE
              </button>
              <span className="text-[color:var(--color-ink-faint)]">/</span>
              <button
                onClick={() => setzeSprache('en')}
                className={sprache === 'en' ? 'text-[color:var(--color-ink)] font-bold' : 'text-[color:var(--color-ink-faint)]'}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setOffen((v) => !v)}
              className="md:hidden font-mono-code text-xs tracking-widest uppercase text-[color:var(--color-ink)]"
            >
              {offen ? 'Zu' : 'Menü'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {offen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-[color:var(--color-paper)] border-b border-[color:var(--color-line)]"
            >
              <div className="px-5 py-4 flex flex-col">
                {sektionen.map((s, i) => (
                  <a
                    key={s}
                    href={`#${s}`}
                    onClick={() => setOffen(false)}
                    className="py-3 regel font-display text-2xl flex items-baseline gap-3"
                  >
                    <span className="font-mono-code text-xs text-[color:var(--color-ink-faint)]">0{i + 1}</span>
                    {ui.nav[navKey[s]][sprache]}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navigation;

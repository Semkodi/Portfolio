import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { hero, profil } from '../data/inhalt';
import PartikelMonogramm from '../components/PartikelMonogramm';

export const Hero: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const [zeit, setZeit] = useState('');
  const { scrollY } = useScroll();
  const yType = useTransform(scrollY, [0, 600], [0, -60]);
  const yCanvas = useTransform(scrollY, [0, 600], [0, 90]);
  const fade = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const u = () =>
      setZeit(
        new Date().toLocaleTimeString('de-DE', {
          timeZone: 'Europe/Berlin',
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
    u();
    const id = window.setInterval(u, 30000);
    return () => window.clearInterval(id);
  }, []);

  const [vorname, ...rest] = profil.name.split(' ');
  const nachname = rest.join(' ');

  return (
    <section id="start" className="relative min-h-screen flex flex-col justify-between pt-24 pb-10 px-5 sm:px-8 max-w-[1500px] mx-auto overflow-hidden">
      <motion.div
        style={{ y: yCanvas }}
        className="pointer-events-none absolute -top-4 right-0 sm:right-4 w-[78vw] sm:w-[48vw] h-[78vw] sm:h-[48vw] max-w-[640px] max-h-[640px] opacity-80"
      >
        <PartikelMonogramm />
      </motion.div>

      {/* Kopfzeile */}
      <div className="relative flex items-start justify-between label">
        <motion.span style={{ opacity: fade }}>{hero.kicker[sprache]}</motion.span>
        <motion.span style={{ opacity: fade }} className="text-right">
          {profil.standort[sprache]}
          <br />
          {sprache === 'de' ? 'Ortszeit' : 'Local'} {zeit}
        </motion.span>
      </div>

      {/* Name */}
      <motion.div style={{ y: yType }} className="relative py-8">
        <h1 className="font-display font-medium leading-[0.84] tracking-[-0.03em]">
          <span className="block text-[clamp(3rem,13vw,8.5rem)]">{vorname}</span>
          <span className="block text-[clamp(3rem,13vw,8.5rem)] italic font-normal text-[color:var(--color-sienna)]">
            {nachname}
          </span>
        </h1>
      </motion.div>

      {/* Fußzeile */}
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-5">
          <p className="font-display text-xl sm:text-2xl leading-snug text-[color:var(--color-ink-soft)]">
            {hero.intro[sprache]}
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-9 flex flex-col gap-3">
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {hero.rollen[sprache].map((r) => (
              <span key={r} className="font-mono-code text-xs text-[color:var(--color-ink-faint)]">
                {r}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-6 pt-3 regel">
            <a href="#werk" className="font-mono-code text-sm link-unterstrich" data-cursor>
              {hero.ctaProjekte[sprache]} →
            </a>
            <a href="#kontakt" className="font-mono-code text-sm link-unterstrich" data-cursor>
              {hero.ctaKontakt[sprache]}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-wippen text-[color:var(--color-ink-faint)]">
        ↓
      </div>
    </section>
  );
};

export default Hero;

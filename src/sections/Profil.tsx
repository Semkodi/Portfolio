import React from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { ueberMich, profil } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import Reveal from '../components/Reveal';

export const Profil: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();

  return (
    <section id="profil" className="relative py-24 sm:py-36 px-5 sm:px-8 max-w-[1500px] mx-auto">
      <SektionKopf
        nummer="01"
        label={sprache === 'de' ? 'Profil' : 'Profile'}
        titel={
          <>
            {ueberMich.titel[sprache]} <span className="italic-display text-[color:var(--color-sienna)]">—</span>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7 space-y-6">
          <Reveal art="maske">
            <p className="font-display text-2xl sm:text-4xl leading-[1.15] font-normal">
              {ueberMich.headline[sprache]}
            </p>
          </Reveal>
          <Reveal art="auf" delay={0.1}>
            <p className="text-[color:var(--color-ink-soft)] leading-relaxed max-w-xl">{ueberMich.absatz1[sprache]}</p>
          </Reveal>
          <Reveal art="auf" delay={0.15}>
            <p className="text-[color:var(--color-ink-soft)] leading-relaxed max-w-xl">{ueberMich.absatz2[sprache]}</p>
          </Reveal>
        </div>

        <Reveal art="blende" className="lg:col-span-5">
          <div className="relative w-full max-w-sm mx-auto lg:ml-auto">
            <div className="absolute -inset-3 border border-[color:var(--color-ink)] translate-x-3 translate-y-3" />
            <img
              src="/profile.jpg"
              alt={profil.name}
              className="relative w-full aspect-[4/5] object-cover"
              style={{ filter: 'grayscale(0.4) sepia(0.25) contrast(1.02)' }}
            />
            <div className="relative mt-3 flex justify-between label">
              <span>{profil.name}</span>
              <span>{profil.standort[sprache]}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-20 sm:mt-28 regel">
        {ueberMich.werte.map((w, i) => (
          <Reveal
            key={i}
            art="auf"
            delay={i * 0.06}
            className="group grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-8 items-baseline py-7 regel"
          >
            <span className="sm:col-span-1 font-mono-code text-xs text-[color:var(--color-sienna)]">0{i + 1}</span>
            <h3 className="sm:col-span-4 font-display text-2xl sm:text-3xl">{w.titel[sprache]}</h3>
            <p className="sm:col-span-7 text-[color:var(--color-ink-soft)] leading-relaxed">{w.text[sprache]}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Profil;

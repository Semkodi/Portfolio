import React from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { ueberMich, profil } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import Reveal from '../components/Reveal';

export const Profil: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();

  return (
    <section id="profil" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SektionKopf
        nummer="01"
        label={sprache === 'de' ? 'Profil' : 'Profile'}
        rechts={profil.standort[sprache]}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal art="auf">
            <p className="max-w-[22ch] text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.12] font-bold tracking-[-0.035em] text-balance">
              {ueberMich.headline[sprache]}
            </p>
          </Reveal>
          <Reveal art="auf" delay={0.1}>
            <p className="mt-7 max-w-[64ch] text-[16px] leading-[1.75] text-text-2">
              {ueberMich.absatz1[sprache]}
            </p>
          </Reveal>
          <Reveal art="auf" delay={0.16}>
            <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.75] text-text-2">
              {ueberMich.absatz2[sprache]}
            </p>
          </Reveal>
        </div>

        <Reveal art="blende" delay={0.12} className="lg:col-span-4 lg:col-start-9">
          <figure className="relative">
            <img
              src="/profile.jpg"
              alt={profil.name}
              loading="lazy"
              className="w-full max-w-sm border border-linie object-cover grayscale"
              style={{ aspectRatio: '4 / 5' }}
            />
            <figcaption className="mt-3 flex max-w-sm justify-between font-mono-code text-[11px] tracking-[0.1em] uppercase text-text-3">
              <span>{profil.name}</span>
              <span>{profil.standort[sprache]}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3">
        {ueberMich.werte.map((w, i) => (
          <Reveal key={w.titel.de} art="auf" delay={i * 0.07}>
            <div className="flex flex-col gap-2.5 border-t border-linie pt-5">
              <span className="font-mono-code text-[11px] text-signal">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-medium tracking-[-0.02em]">{w.titel[sprache]}</h3>
              <p className="text-[14.5px] leading-[1.7] text-text-2">{w.text[sprache]}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Profil;

import React from 'react';
import Reveal from './Reveal';

interface Props {
  nummer: string;
  label: string;
  /** Kurze Angabe am rechten Rand, z. B. eine Anzahl. */
  rechts?: string;
}

/** Abschnitts-Kopf im Kontrollraum: Kennung links, Messwert rechts. */
export const SektionKopf: React.FC<Props> = ({ nummer, label, rechts }) => (
  <Reveal art="auf" className="mb-9 flex items-baseline justify-between gap-6 border-b border-linie pb-4">
    <h2 className="font-mono-code text-[13px] font-normal tracking-[0.2em] uppercase text-text">
      <span className="text-signal">{nummer}</span>
      <span className="px-2 text-text-3">/</span>
      {label}
    </h2>
    {rechts && (
      <span className="shrink-0 font-mono-code text-[11px] tracking-[0.12em] uppercase text-text-3">
        {rechts}
      </span>
    )}
  </Reveal>
);

export default SektionKopf;

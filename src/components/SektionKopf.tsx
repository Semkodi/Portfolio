import React from 'react';
import Reveal from './Reveal';

interface Props {
  nummer: string;
  label: string;
  titel: React.ReactNode;
}

/** Redaktioneller Abschnitts-Kopf: Nummer · Label · großer Titel. */
export const SektionKopf: React.FC<Props> = ({ nummer, label, titel }) => (
  <div className="mb-14 sm:mb-20">
    <Reveal art="blende" className="flex items-center gap-4 mb-6">
      <span className="font-mono-code text-xs text-[color:var(--color-sienna)]">{nummer}</span>
      <span className="h-px flex-1 bg-[color:var(--color-line)]" />
      <span className="label">{label}</span>
    </Reveal>
    <Reveal art="maske">
      <h2 className="font-display text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.92] font-medium">
        {titel}
      </h2>
    </Reveal>
  </div>
);

export default SektionKopf;

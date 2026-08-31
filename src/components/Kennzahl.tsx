import React from 'react';
import { benutzeZaehler } from '../hooks/benutzeZaehler';

interface Props {
  wert: number;
  suffix?: string;
  label: string;
  betont?: boolean;
}

/** Eine hochzählende Kennzahl mit Beschriftung darunter. */
export const Kennzahl: React.FC<Props> = ({ wert, suffix, label, betont = false }) => {
  const { ref, wert: aktuell } = benutzeZaehler<HTMLDivElement>(wert);

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <span
        className={`text-2xl font-bold tabular-nums tracking-tight ${betont ? 'text-signal' : 'text-text'}`}
      >
        {aktuell}
        {suffix}
      </span>
      <span className="font-mono-code text-[10.5px] tracking-[0.1em] uppercase text-text-3">
        {label}
      </span>
    </div>
  );
};

export default Kennzahl;

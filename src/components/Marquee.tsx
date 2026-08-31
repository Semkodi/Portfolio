import React from 'react';

/** Endlos laufendes Technik-Band. Inhalt wird für den nahtlosen Loop verdoppelt. */
export const Marquee: React.FC<{ eintraege: string[] }> = ({ eintraege }) => {
  const Spur = () => (
    <div className="laufband-spur">
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
          {eintraege.map((e) => (
            <span key={e} className="flex items-center">
              <span className="px-4 font-mono-code text-xs tracking-[0.14em] uppercase text-text-3">
                {e}
              </span>
              <span className="text-signal">/</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="laufband-halt select-none overflow-hidden border-y border-linie py-3.5">
      <Spur />
    </div>
  );
};

export default Marquee;

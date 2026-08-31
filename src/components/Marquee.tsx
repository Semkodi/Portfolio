import React from 'react';

/** Endlos laufendes Textband. Inhalt wird für den nahtlosen Loop verdoppelt. */
export const Marquee: React.FC<{ eintraege: string[] }> = ({ eintraege }) => {
  const Spur = () => (
    <div className="laufband-spur">
      {[0, 1].map((k) => (
        <div key={k} className="flex items-center shrink-0" aria-hidden={k === 1}>
          {eintraege.map((e, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 font-display text-[clamp(2rem,5vw,4rem)] leading-none font-medium tracking-tight">
                {e}
              </span>
              <span className="text-[color:var(--color-sienna)] text-lg">✳</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="laufband-halt overflow-hidden border-y border-[color:var(--color-line)] py-5 select-none">
      <Spur />
    </div>
  );
};

export default Marquee;

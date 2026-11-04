import React from 'react';

/**
 * Feststehende Hintergrundschicht: Messraster, Korn und ein
 * dezenter warmer Schein am unteren Rand. Der rotierende Radar-Sweep
 * wurde entfernt, damit das Layout sauber und ruhig bleibt.
 */
export const Atmosphaere: React.FC = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 raster opacity-60" />

    {/* Sanfter, unaufdringlicher warmer Schein am unteren Rand */}
    <div className="absolute -bottom-[320px] left-1/2 h-[620px] w-[1280px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,154,60,0.14),rgba(255,154,60,0))] blur-[50px] animate-atmen" />

    <div className="absolute inset-0 bg-[radial-gradient(rgba(231,236,239,0.04)_1px,transparent_1px)] [background-size:4px_4px] opacity-40" />
  </div>
);

export default Atmosphaere;

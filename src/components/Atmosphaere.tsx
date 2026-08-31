import React from 'react';

/**
 * Feststehende Hintergrundschicht: Messraster, Radar-Sweep, Korn und ein
 * warmer Schein am unteren Rand. Rein dekorativ, deshalb aus dem
 * Screenreader ausgeblendet und ohne Mausereignisse.
 */
export const Atmosphaere: React.FC = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 raster opacity-70" />

    <div className="absolute -right-[220px] top-[240px] h-[700px] w-[700px] rounded-full bg-[conic-gradient(from_0deg,rgba(255,154,60,0.14),rgba(255,154,60,0)_45%)] animate-radar" />

    <div className="absolute -bottom-[320px] left-1/2 h-[620px] w-[1280px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,154,60,0.18),rgba(255,154,60,0))] blur-[40px] animate-atmen" />

    <div className="absolute inset-0 bg-[radial-gradient(rgba(231,236,239,0.05)_1px,transparent_1px)] [background-size:4px_4px] opacity-50" />
  </div>
);

export default Atmosphaere;

import React, { useState } from 'react';
import { audio } from '../utils/audio';

interface ScanHeadlineProps {
  titel: string;
  kursivWort?: string;
  akzentWort?: string;
  subtitel?: string;
  className?: string;
}

export const ScanHeadline: React.FC<ScanHeadlineProps> = ({
  titel,
  kursivWort,
  akzentWort,
  subtitel,
  className = '',
}) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleMouseEnter = () => {
    if (!isScanning) {
      setIsScanning(true);
      audio.spieleKlick();
      setTimeout(() => setIsScanning(false), 1400);
    }
  };

  // Splittet Text und hebt kursiv oder akzentuiert hervor
  const renderText = () => {
    const woerter = titel.split(' ');
    return woerter.map((wort, idx) => {
      const sauberesWort = wort.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
      const istKursiv = kursivWort && sauberesWort.toLowerCase() === kursivWort.toLowerCase();
      const istAkzent = akzentWort && sauberesWort.toLowerCase() === akzentWort.toLowerCase();

      return (
        <span
          key={idx}
          className={`inline-block mr-[0.28em] transition-colors duration-300 ${
            istKursiv ? 'font-serif italic text-[#e6ccb2]' : ''
          } ${istAkzent ? 'text-signal font-semibold' : ''}`}
        >
          {wort}
        </span>
      );
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className={`group relative cursor-default select-none ${className}`}
    >
      {/* Editorial Headline */}
      <h2 className="relative text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold tracking-[-0.035em] leading-[1.06] text-text">
        {renderText()}

        {/* Luminous Scanline Sweep Effekt über die Buchstaben */}
        {isScanning && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          >
            <span className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-signal/40 to-transparent blur-sm animate-[scanline_1.4s_cubic-bezier(0.4,0,0.2,1)_forwards]" />
            <span className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[scanline_1.4s_cubic-bezier(0.4,0,0.2,1)_forwards]" />
          </span>
        )}
      </h2>

      {subtitel && (
        <p className="mt-4 font-mono-code text-[12px] uppercase tracking-[0.2em] text-text-3">
          {subtitel}
        </p>
      )}
    </div>
  );
};


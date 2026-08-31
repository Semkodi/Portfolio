import React from 'react';

interface Props {
  groesse?: number;
  className?: string;
  animiert?: boolean;
}

/** Lettermark aus den Initialen "SB" von Semir Borogovac. Tinte auf Papier. */
export const Monogramm: React.FC<Props> = ({ groesse = 40, className, animiert = false }) => {
  const id = React.useId();
  return (
    <svg
      width={groesse}
      height={groesse}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label="Semir Borogovac"
    >
      <rect
        x="2.5"
        y="2.5"
        width="59"
        height="59"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
        style={
          animiert
            ? { strokeDasharray: 240, strokeDashoffset: 240, animation: 'zeichnen 1.3s 0.15s ease forwards' }
            : undefined
        }
      />
      <path
        d="M27 15v34m0-34h9c4.1 0 6.7 3 6.7 6.5S39 28 35 28H27m0 0h10.5c4.7 0 7.7 3.1 7.7 7.1s-3.2 7-7.9 7H27"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.28"
      />
      <path
        d="M41 21c-1.7-3.5-6.1-4.8-10.2-4.4-4.5.4-7.8 3-7.8 6.8 0 4.1 3.5 5.7 8.8 6.7 5.5 1 9.2 2.8 9.2 7.1 0 4.3-4.1 7-9.1 7.3-4.8.3-9.2-1.4-10.9-4.9"
        stroke={`url(#${id}-g)`}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        style={
          animiert
            ? { strokeDasharray: 128, strokeDashoffset: 128, animation: 'zeichnen 1s 0.6s ease forwards' }
            : undefined
        }
      />
      <defs>
        <linearGradient id={`${id}-g`} x1="20" y1="16" x2="44" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#bf5227" />
          <stop offset="1" stopColor="#b0842d" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Monogramm;

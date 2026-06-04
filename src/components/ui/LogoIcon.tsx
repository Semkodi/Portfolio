import React from 'react';

/**
 * Eigenschaften für das LogoIcon.
 */
interface LogoIconProps {
    /** Die Kantenlänge des quadratischen Icons in Pixeln */
    groesse?: number;
    /** Optionale zusätzliche CSS-Klasse */
    klasse?: string;
}

/**
 * LogoIcon - Das charakteristische Cloud-Terminal-Markenlogo aus Semirs Logo.
 * Ein detailgetreues SVG mit leuchtenden Verläufen und Programmierer-Symbolik.
 */
export const LogoIcon: React.FC<LogoIconProps> = ({ groesse = 24, klasse = "" }) => {
    return (
        <svg 
            width={groesse} 
            height={groesse} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`drop-shadow-[0_0_8px_rgba(0,242,254,0.4)] transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.6)] ${klasse}`}
        >
            <defs>
                {/* Dynamischer Verlauf für die Cloud-Kontur */}
                <linearGradient id="logoWolkenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary, #00f2fe)" />
                    <stop offset="100%" stopColor="var(--secondary, #ec4899)" />
                </linearGradient>
                {/* Verlauf für die Leiterbahnen */}
                <linearGradient id="leiterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(0, 242, 254, 0.8)" />
                    <stop offset="100%" stopColor="rgba(236, 72, 153, 0.8)" />
                </linearGradient>
            </defs>

            {/* Leiterbahnen (Links) */}
            <path 
                d="M5 50 H25 L35 40" 
                stroke="url(#leiterGrad)" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                opacity="0.75"
            />
            <circle cx="5" cy="50" r="2.5" fill="#00f2fe" />
            <path 
                d="M8 60 H20 L28 52" 
                stroke="url(#leiterGrad)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                opacity="0.5"
            />
            <circle cx="8" cy="60" r="2" fill="#00f2fe" />

            {/* Leiterbahnen (Rechts) */}
            <path 
                d="M95 50 H75 L65 60" 
                stroke="url(#leiterGrad)" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                opacity="0.75"
            />
            <circle cx="95" cy="50" r="2.5" fill="#ec4899" />
            <path 
                d="M92 40 H80 L72 48" 
                stroke="url(#leiterGrad)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                opacity="0.5"
            />
            <circle cx="92" cy="40" r="2" fill="#ec4899" />

            {/* Äußere Wolken-Kontur mit feinem Glühen */}
            <path 
                d="M32 65 C20 65 14 55 19 45 C15 32 26 23 37 28 C45 16 61 16 67 28 C78 23 88 32 84 45 C89 55 83 65 71 65 Z" 
                stroke="url(#logoWolkenGrad)" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="#0e0f14"
            />

            {/* Innerer CLI-Terminal-Kasten */}
            <rect 
                x="37" 
                y="37" 
                width="26" 
                height="26" 
                rx="5" 
                stroke="var(--primary)" 
                strokeWidth="2.5" 
                fill="#050508"
            />

            {/* CLI Eingabeaufforderung (>) */}
            <path 
                d="M44 45 L49 50 L44 55" 
                stroke="var(--secondary)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            
            {/* Blinkender Unterstrich (Cursor) */}
            <line 
                x1="51" 
                y1="55" 
                x2="56" 
                y2="55" 
                stroke="var(--primary)" 
                strokeWidth="2" 
                strokeLinecap="round"
            />
        </svg>
    );
};

export default LogoIcon;

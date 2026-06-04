import React from 'react';

/**
 * SchaltkreisHintergrund - Rendert dekorative, leuchtende und animierte Leiterbahnen
 * an den linken und rechten Bildschirmrändern. Führt das Platinen-Design des Logos
 * harmonisch über die gesamte Portfolio-Website fort.
 */
export const SchaltkreisHintergrund: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
            {/* Farbverläufe für die Leiterbahnen */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <linearGradient id="schaltkreisCyanPink" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--primary, #00f2fe)" />
                        <stop offset="100%" stopColor="var(--secondary, #ec4899)" />
                    </linearGradient>
                    <linearGradient id="schaltkreisPinkCyan" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--secondary, #ec4899)" />
                        <stop offset="100%" stopColor="var(--primary, #00f2fe)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Linke Platinenbahnen */}
            <svg className="absolute left-0 top-0 h-full w-64 opacity-[0.12] lg:opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
                {/* Obere Bahn links */}
                <path 
                    d="M-10 150 H80 L130 200 H180" 
                    stroke="url(#schaltkreisCyanPink)" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="15 300"
                    className="animate-schaltkreis-fluss"
                />
                <path 
                    d="M-10 150 H80 L130 200 H180" 
                    stroke="rgba(0, 242, 254, 0.2)" 
                    strokeWidth="1" 
                    fill="none" 
                />
                <circle cx="180" cy="200" r="3.5" fill="var(--primary)" className="animate-pulse" />
                <circle cx="180" cy="200" r="1.5" fill="#000" />

                {/* Mittlere Bahn links */}
                <path 
                    d="M-10 400 H100 L140 360 H210" 
                    stroke="url(#schaltkreisCyanPink)" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="25 350"
                    style={{ animationDelay: '1.5s' }}
                    className="animate-schaltkreis-fluss"
                />
                <path 
                    d="M-10 400 H100 L140 360 H210" 
                    stroke="rgba(236, 72, 153, 0.2)" 
                    strokeWidth="1" 
                    fill="none" 
                />
                <circle cx="210" cy="360" r="3" fill="var(--secondary)" />

                {/* Untere Bahn links */}
                <path 
                    d="M-10 700 H60 L100 740 H160" 
                    stroke="url(#schaltkreisCyanPink)" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="20 280"
                    style={{ animationDelay: '0.7s' }}
                    className="animate-schaltkreis-fluss"
                />
                <path 
                    d="M-10 700 H60 L100 740 H160" 
                    stroke="rgba(0, 242, 254, 0.15)" 
                    strokeWidth="1" 
                    fill="none" 
                />
                <circle cx="160" cy="740" r="3.5" fill="var(--primary)" className="animate-pulse" />
                <circle cx="160" cy="740" r="1.5" fill="#000" />
            </svg>

            {/* Rechte Platinenbahnen */}
            <svg className="absolute right-0 top-0 h-full w-64 opacity-[0.12] lg:opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
                {/* Obere Bahn rechts */}
                <path 
                    d="M274 250 H180 L140 290 H90" 
                    stroke="url(#schaltkreisPinkCyan)" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="30 300"
                    style={{ animationDelay: '2.2s' }}
                    className="animate-schaltkreis-fluss-rev"
                />
                <path 
                    d="M274 250 H180 L140 290 H90" 
                    stroke="rgba(236, 72, 153, 0.2)" 
                    strokeWidth="1" 
                    fill="none" 
                />
                <circle cx="90" cy="290" r="3.5" fill="var(--secondary)" className="animate-pulse" />
                <circle cx="90" cy="290" r="1.5" fill="#000" />

                {/* Mittlere Bahn rechts */}
                <path 
                    d="M274 520 H160 L110 470 H50" 
                    stroke="url(#schaltkreisPinkCyan)" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="15 250"
                    style={{ animationDelay: '0.3s' }}
                    className="animate-schaltkreis-fluss-rev"
                />
                <path 
                    d="M274 520 H160 L110 470 H50" 
                    stroke="rgba(0, 242, 254, 0.15)" 
                    strokeWidth="1" 
                    fill="none" 
                />
                <circle cx="50" cy="470" r="3" fill="var(--primary)" />

                {/* Untere Bahn rechts */}
                <path 
                    d="M274 800 H200 L160 840 H100" 
                    stroke="url(#schaltkreisPinkCyan)" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="20 320"
                    style={{ animationDelay: '1.1s' }}
                    className="animate-schaltkreis-fluss-rev"
                />
                <path 
                    d="M274 800 H200 L160 840 H100" 
                    stroke="rgba(236, 72, 153, 0.2)" 
                    strokeWidth="1" 
                    fill="none" 
                />
                <circle cx="100" cy="840" r="3.5" fill="var(--secondary)" className="animate-pulse" />
                <circle cx="100" cy="840" r="1.5" fill="#000" />
            </svg>

            {/* CSS Animationen für den fließenden Strom-Effekt */}
            <style>{`
                .animate-schaltkreis-fluss {
                    animation: schaltkreis-lauf 6s linear infinite;
                }
                .animate-schaltkreis-fluss-rev {
                    animation: schaltkreis-lauf-rev 7s linear infinite;
                }

                @keyframes schaltkreis-lauf {
                    0% {
                        stroke-dashoffset: 350;
                    }
                    100% {
                        stroke-dashoffset: -350;
                    }
                }

                @keyframes schaltkreis-lauf-rev {
                    0% {
                        stroke-dashoffset: -350;
                    }
                    100% {
                        stroke-dashoffset: 350;
                    }
                }
            `}</style>
        </div>
    );
};

export default SchaltkreisHintergrund;

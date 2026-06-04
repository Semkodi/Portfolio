import React from 'react';

/**
 * SchaltkreisHintergrund - Rendert dekorative, leuchtende und animierte Leiterbahnen,
 * die sich als absolutes Overlay über die gesamte Höhe der Website erstrecken und mitscrollen.
 * Simuliert eine riesige, durchgehende Platine in Neon-Cyan und Neon-Magenta.
 */
export const SchaltkreisHintergrund: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
            {/* Farbverläufe für alle Leiterbahnen */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <linearGradient id="schaltkreisGradCyanPink" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--primary, #00f2fe)" />
                        <stop offset="100%" stopColor="var(--secondary, #ec4899)" />
                    </linearGradient>
                    <linearGradient id="schaltkreisGradPinkCyan" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--secondary, #ec4899)" />
                        <stop offset="100%" stopColor="var(--primary, #00f2fe)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* ========================================================================= */}
            {/* SYSTEM 1: OBERER BEREICH (Hero & Startbereich) - top: 50px */}
            {/* ========================================================================= */}
            <div className="absolute top-[50px] inset-x-0 h-[800px]">
                {/* Links */}
                <svg className="absolute left-0 top-0 h-full w-64 opacity-[0.14] lg:opacity-[0.2]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-10 150 H80 L130 200 H180" stroke="url(#schaltkreisGradCyanPink)" strokeWidth="1.5" fill="none" strokeDasharray="15 300" className="animate-schaltkreis-fluss" />
                    <path d="M-10 150 H80 L130 200 H180" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="1" fill="none" />
                    <circle cx="180" cy="200" r="3.5" fill="var(--primary)" className="animate-pulse" />
                    <circle cx="180" cy="200" r="1.5" fill="#000" />

                    <path d="M-10 400 H100 L140 360 H210" stroke="url(#schaltkreisGradCyanPink)" strokeWidth="1.5" fill="none" strokeDasharray="25 350" style={{ animationDelay: '1.5s' }} className="animate-schaltkreis-fluss" />
                    <path d="M-10 400 H100 L140 360 H210" stroke="rgba(236, 72, 153, 0.2)" strokeWidth="1" fill="none" />
                    <circle cx="210" cy="360" r="3" fill="var(--secondary)" />

                    <path d="M-10 650 H60 L100 690 H160" stroke="url(#schaltkreisGradCyanPink)" strokeWidth="1.5" fill="none" strokeDasharray="20 280" style={{ animationDelay: '0.7s' }} className="animate-schaltkreis-fluss" />
                    <path d="M-10 650 H60 L100 690 H160" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="160" cy="690" r="3.5" fill="var(--primary)" className="animate-pulse" />
                    <circle cx="160" cy="690" r="1.5" fill="#000" />
                </svg>

                {/* Rechts */}
                <svg className="absolute right-0 top-0 h-full w-64 opacity-[0.14] lg:opacity-[0.2]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M274 250 H180 L140 290 H90" stroke="url(#schaltkreisGradPinkCyan)" strokeWidth="1.5" fill="none" strokeDasharray="30 300" style={{ animationDelay: '2.2s' }} className="animate-schaltkreis-fluss-rev" />
                    <path d="M274 250 H180 L140 290 H90" stroke="rgba(236, 72, 153, 0.2)" strokeWidth="1" fill="none" />
                    <circle cx="90" cy="290" r="3.5" fill="var(--secondary)" className="animate-pulse" />
                    <circle cx="90" cy="290" r="1.5" fill="#000" />

                    <path d="M274 520 H160 L110 470 H50" stroke="url(#schaltkreisGradPinkCyan)" strokeWidth="1.5" fill="none" strokeDasharray="15 250" style={{ animationDelay: '0.3s' }} className="animate-schaltkreis-fluss-rev" />
                    <path d="M274 520 H160 L110 470 H50" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="50" cy="470" r="3" fill="var(--primary)" />
                </svg>
            </div>

            {/* ========================================================================= */}
            {/* SYSTEM 2: MITTE-OBEN (Über Mich & Skills) - top: 1100px */}
            {/* ========================================================================= */}
            <div className="absolute top-[1100px] inset-x-0 h-[800px]">
                {/* Links */}
                <svg className="absolute left-0 top-0 h-full w-64 opacity-[0.12] lg:opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-10 100 H120 L160 140 H230" stroke="url(#schaltkreisGradCyanPink)" strokeWidth="1.5" fill="none" strokeDasharray="20 250" style={{ animationDelay: '0.5s' }} className="animate-schaltkreis-fluss" />
                    <path d="M-10 100 H120 L160 140 H230" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="230" cy="140" r="3" fill="var(--primary)" />

                    <path d="M-10 450 H70 L110 410 H170 L200 440" stroke="url(#schaltkreisGradCyanPink)" strokeWidth="1.5" fill="none" strokeDasharray="15 200" style={{ animationDelay: '1.8s' }} className="animate-schaltkreis-fluss" />
                    <path d="M-10 450 H70 L110 410 H170 L200 440" stroke="rgba(236, 72, 153, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="200" cy="440" r="3.5" fill="var(--secondary)" className="animate-pulse" />
                    <circle cx="200" cy="440" r="1.5" fill="#000" />
                </svg>

                {/* Rechts */}
                <svg className="absolute right-0 top-0 h-full w-64 opacity-[0.12] lg:opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M274 200 H150 L110 240 H40" stroke="url(#schaltkreisGradPinkCyan)" strokeWidth="1.5" fill="none" strokeDasharray="25 300" style={{ animationDelay: '1.2s' }} className="animate-schaltkreis-fluss-rev" />
                    <path d="M274 200 H150 L110 240 H40" stroke="rgba(236, 72, 153, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="40" cy="240" r="3.5" fill="var(--secondary)" className="animate-pulse" />
                    <circle cx="40" cy="240" r="1.5" fill="#000" />

                    <path d="M274 500 H170 L130 460 H70" stroke="url(#schaltkreisGradPinkCyan)" strokeWidth="1.5" fill="none" strokeDasharray="15 220" style={{ animationDelay: '2.5s' }} className="animate-schaltkreis-fluss-rev" />
                    <path d="M274 500 H170 L130 460 H70" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="70" cy="460" r="3" fill="var(--primary)" />
                </svg>
            </div>

            {/* ========================================================================= */}
            {/* SYSTEM 3: MITTE-UNTEN (Projekte & Lebenslauf) - top: 2300px */}
            {/* ========================================================================= */}
            <div className="absolute top-[2300px] inset-x-0 h-[800px]">
                {/* Links */}
                <svg className="absolute left-0 top-0 h-full w-64 opacity-[0.12] lg:opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-10 220 H90 L130 180 H200" stroke="url(#schaltkreisGradCyanPink)" strokeWidth="1.5" fill="none" strokeDasharray="18 280" style={{ animationDelay: '2.0s' }} className="animate-schaltkreis-fluss" />
                    <path d="M-10 220 H90 L130 180 H200" stroke="rgba(236, 72, 153, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="200" cy="180" r="3.5" fill="var(--secondary)" className="animate-pulse" />
                    <circle cx="200" cy="180" r="1.5" fill="#000" />

                    <path d="M-10 520 H110 L150 560 H220" stroke="url(#schaltkreisGradCyanPink)" strokeWidth="1.5" fill="none" strokeDasharray="22 300" style={{ animationDelay: '0.2s' }} className="animate-schaltkreis-fluss" />
                    <path d="M-10 520 H110 L150 560 H220" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="220" cy="560" r="3" fill="var(--primary)" />
                </svg>

                {/* Rechts */}
                <svg className="absolute right-0 top-0 h-full w-64 opacity-[0.12] lg:opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M274 300 H160 L120 340 H50" stroke="url(#schaltkreisGradPinkCyan)" strokeWidth="1.5" fill="none" strokeDasharray="15 260" style={{ animationDelay: '0.9s' }} className="animate-schaltkreis-fluss-rev" />
                    <path d="M274 300 H160 L120 340 H50" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="50" cy="340" r="3" fill="var(--primary)" />

                    <path d="M274 580 H180 L140 540 H80" stroke="url(#schaltkreisGradPinkCyan)" strokeWidth="1.5" fill="none" strokeDasharray="30 350" style={{ animationDelay: '1.7s' }} className="animate-schaltkreis-fluss-rev" />
                    <path d="M274 580 H180 L140 540 H80" stroke="rgba(236, 72, 153, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="80" cy="540" r="3.5" fill="var(--secondary)" className="animate-pulse" />
                    <circle cx="80" cy="540" r="1.5" fill="#000" />
                </svg>
            </div>

            {/* ========================================================================= */}
            {/* SYSTEM 4: UNTERER BEREICH (Kontakt & Footer) - top: 3500px */}
            {/* ========================================================================= */}
            <div className="absolute top-[3500px] inset-x-0 h-[800px]">
                {/* Links */}
                <svg className="absolute left-0 top-0 h-full w-64 opacity-[0.14] lg:opacity-[0.2]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-10 180 H80 L120 220 H190" stroke="url(#schaltkreisGradCyanPink)" strokeWidth="1.5" fill="none" strokeDasharray="25 280" style={{ animationDelay: '1.1s' }} className="animate-schaltkreis-fluss" />
                    <path d="M-10 180 H80 L120 220 H190" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="190" cy="220" r="3" fill="var(--primary)" />

                    <path d="M-10 420 H100 L140 380 H210" stroke="url(#schaltkreisGradCyanPink)" strokeWidth="1.5" fill="none" strokeDasharray="15 300" style={{ animationDelay: '2.7s' }} className="animate-schaltkreis-fluss" />
                    <path d="M-10 420 H100 L140 380 H210" stroke="rgba(236, 72, 153, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="210" cy="380" r="3.5" fill="var(--secondary)" className="animate-pulse" />
                    <circle cx="210" cy="380" r="1.5" fill="#000" />
                </svg>

                {/* Rechts */}
                <svg className="absolute right-0 top-0 h-full w-64 opacity-[0.14] lg:opacity-[0.2]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M274 220 H170 L130 180 H60" stroke="url(#schaltkreisGradPinkCyan)" strokeWidth="1.5" fill="none" strokeDasharray="20 240" style={{ animationDelay: '0.4s' }} className="animate-schaltkreis-fluss-rev" />
                    <path d="M274 220 H170 L130 180 H60" stroke="rgba(236, 72, 153, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="60" cy="180" r="3.5" fill="var(--secondary)" className="animate-pulse" />
                    <circle cx="60" cy="180" r="1.5" fill="#000" />

                    <path d="M274 480 H150 L110 520 H40" stroke="url(#schaltkreisGradPinkCyan)" strokeWidth="1.5" fill="none" strokeDasharray="25 320" style={{ animationDelay: '1.9s' }} className="animate-schaltkreis-fluss-rev" />
                    <path d="M274 480 H150 L110 520 H40" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="40" cy="520" r="3" fill="var(--primary)" />
                </svg>
            </div>

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

import React from 'react';
import LogoIcon from './LogoIcon';

/**
 * MetallPanel - Simuliert die 3D-gebürstete Metallplatte aus Semirs Logo.
 * Beinhaltet den 3D-Schriftzug "SEMIR BOROGOVAC", das leuchtende Wolken-Terminal-Icon
 * und pulsierende Leiterbahnen direkt auf dem Panel.
 */
export const MetallPanel: React.FC = () => {
    return (
        <div 
            className="bg-titan-brushed rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative w-full max-w-4xl mx-auto border border-white/10 select-none overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* 1. Integrierte leuchtende Leiterbahnen auf dem Panel */}
            <svg 
                className="absolute inset-0 w-full h-full pointer-events-none rounded-[inherit] opacity-25" 
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Obere Kantenbahn */}
                <path 
                    d="M 20,20 L 150,20 L 180,50 L 300,50" 
                    stroke="rgba(0, 242, 254, 0.4)" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="10 150"
                    className="animate-schaltkreis-panel-lauf"
                />
                <path 
                    d="M 20,20 L 150,20 L 180,50 L 300,50" 
                    stroke="rgba(0, 242, 254, 0.15)" 
                    strokeWidth="1" 
                    fill="none" 
                />

                {/* Untere Kantenbahn */}
                <path 
                    d="M 800,280 L 680,280 L 650,250 L 500,250" 
                    stroke="rgba(236, 72, 153, 0.4)" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="12 120"
                    style={{ animationDelay: '1s' }}
                    className="animate-schaltkreis-panel-lauf-rev"
                />
                <path 
                    d="M 800,280 L 680,280 L 650,250 L 500,250" 
                    stroke="rgba(236, 72, 153, 0.15)" 
                    strokeWidth="1" 
                    fill="none" 
                />

                {/* Kurze Verbindungsbahn um das Logo */}
                <path 
                    d="M 200,60 L 230,90 L 230,170 L 260,200" 
                    stroke="rgba(236, 72, 153, 0.3)" 
                    strokeWidth="1.5" 
                    fill="none" 
                />
                <circle cx="260" cy="200" r="2.5" fill="#ec4899" />
            </svg>

            {/* 2. Leuchtendes Cloud-Terminal-Logo */}
            <div className="relative flex items-center justify-center scale-110 md:scale-125 select-none z-10 shrink-0">
                {/* Intensiverer Glow hinter dem Logo */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-[40px] -z-10 animate-pulse" />
                <LogoIcon groesse={110} />
            </div>

            {/* 3. Textbereich mit 3D-Buchstaben */}
            <div className="flex flex-col text-center md:text-left z-10 select-none">
                {/* 3D Name */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight flex flex-col sm:flex-row items-center gap-2 md:gap-3 leading-none select-none">
                    <span className="text-3d-silber font-extrabold select-none">Semir</span>
                    <span className="text-3d-gradient font-black tracking-tighter select-none">Borogovac</span>
                </h2>

                {/* Subtitle / Modern Software Solutions */}
                <p 
                    className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest text-[#71717a] mt-4 md:mt-5 font-mono select-none"
                    style={{ 
                        textShadow: '0 -1px 0 rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.06)'
                    }}
                >
                    Modern Software Solutions
                </p>
            </div>

            <style>{`
                @keyframes panel-schaltkreis-lauf {
                    0% { stroke-dashoffset: 200; }
                    100% { stroke-dashoffset: -200; }
                }
                @keyframes panel-schaltkreis-lauf-rev {
                    0% { stroke-dashoffset: -200; }
                    100% { stroke-dashoffset: 200; }
                }
                .animate-schaltkreis-panel-lauf {
                    animation: panel-schaltkreis-lauf 5s linear infinite;
                }
                .animate-schaltkreis-panel-lauf-rev {
                    animation: panel-schaltkreis-lauf-rev 5s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default MetallPanel;

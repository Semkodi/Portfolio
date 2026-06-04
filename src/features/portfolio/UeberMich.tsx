import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Hammer, HardHat, Code2 } from 'lucide-react';
import ScrollEnthuellung from '../../components/ui/ScrollEnthuellung';
import SpotlightKarte from '../../components/ui/SpotlightKarte';
import { benutzeSpracheSpeicher } from '@/speicher/spracheSpeicher';
import { uebersetzungen } from '../../data/uebersetzungen';

/**
 * UeberMich - Visualisiert den Werdegang von Semir im Story-Slider.
 * Konzept 3: Polier-zu-Entwickler Morphing-Hintergrund.
 * Zeigt fließenden Übergang von Bau-Vermessungslinien zu Software-Architektur-Diagrammen.
 */
const UeberMich: React.FC = () => {
    const [istDev, setIstDev] = useState<boolean>(true);
    const { sprache } = benutzeSpracheSpeicher();
    const t = uebersetzungen[sprache];

    const de = sprache === 'de';

    return (
        <section className="py-24 px-4 relative overflow-hidden" id="ueber-mich" aria-labelledby="about-title">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
                
                {/* Header */}
                <ScrollEnthuellung richtung="unten">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 pb-8">
                        <div>
                            <h2 id="about-title" className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
                                {t.ueberMich.titel.split(" ")[0]} <span className="gradient-text">{t.ueberMich.titel.split(" ").slice(1).join(" ")}</span>
                            </h2>
                            <p className="text-muted text-lg font-medium mt-2">
                                {t.ueberMich.subtitel}
                            </p>
                        </div>

                        {/* Umschalter (Macher-Story) */}
                        <div className="flex p-1.5 rounded-2xl glass bg-zinc-950/80 border-primary/20 shadow-xl relative z-20">
                            <button
                                onClick={() => setIstDev(false)}
                                className={`flex items-center gap-2 py-2.5 px-5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer
                                    ${!istDev ? 'bg-[#cd7f32] text-black shadow-lg font-extrabold' : 'text-muted hover:text-white'}`}
                            >
                                <Hammer size={14} />
                                <span>{de ? 'Polier 🏗️' : 'Foreman 🏗️'}</span>
                            </button>
                            <button
                                onClick={() => setIstDev(true)}
                                className={`flex items-center gap-2 py-2.5 px-5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer
                                    ${istDev ? 'bg-primary text-black shadow-lg font-extrabold' : 'text-muted hover:text-white'}`}
                            >
                                <Code2 size={14} />
                                <span>{de ? 'Developer 💻' : 'Developer 💻'}</span>
                            </button>
                        </div>
                    </div>
                </ScrollEnthuellung>

                {/* Transformations-Bereich */}
                <div className="grid md:grid-cols-2 items-center gap-12 min-h-[420px]">
                    
                    {/* Linke Seite: Dynamischer Text */}
                    <div className="relative overflow-hidden min-h-[220px] md:min-h-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={istDev ? 'dev' : 'polier'}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col gap-6"
                            >
                                <h3 className="text-3xl font-extrabold tracking-tight text-white uppercase">
                                    {istDev ? t.ueberMich.slider.dev.titel : t.ueberMich.slider.polier.titel}
                                </h3>
                                <p className="text-muted text-base sm:text-lg leading-relaxed text-pretty font-medium">
                                    {istDev ? t.ueberMich.slider.dev.beschreibung : t.ueberMich.slider.polier.beschreibung}
                                </p>
                                
                                {/* 2 Highlight-Karten */}
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div className="glass p-5 text-center rounded-2xl border-glass-border shadow-md hover:border-primary/30 transition-colors">
                                        <h4 className="text-lg font-bold gradient-text">
                                            {istDev ? "Clean Code" : "Organisation"}
                                        </h4>
                                        <p className="text-[9px] text-muted uppercase font-bold tracking-wider mt-1">
                                            {istDev ? (de ? "Struktur & Logik" : "Structure & Logic") : (de ? "Großbaustellen" : "Large Sites")}
                                        </p>
                                    </div>
                                    <div className="glass p-5 text-center rounded-2xl border-glass-border shadow-md hover:border-primary/30 transition-colors">
                                        <h4 className="text-lg font-bold gradient-text">
                                            {istDev ? "Java & Mendix" : "Führung"}
                                        </h4>
                                        <p className="text-[9px] text-muted uppercase font-bold tracking-wider mt-1">
                                            {istDev ? (de ? "Umschulung" : "Retraining") : (de ? "Verantwortung" : "Responsibility")}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Rechte Seite: Morphing-Bild mit Konzept-3-Hintergrund */}
                    <div className="flex justify-center">
                        <div className="relative group">
                            
                            {/* Konzept 3: Morphing Vektor-Hintergründe */}
                            <div className="absolute inset-0 -m-8 pointer-events-none opacity-[0.08] transition-opacity duration-500">
                                <AnimatePresence mode="wait">
                                    {!istDev ? (
                                        // Polier: Technische Bauzeichnungs-Linien (Winkelmesser, Konstruktionskreise)
                                        <motion.svg
                                            key="bau-linien"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="w-full h-full stroke-current text-[#cd7f32]"
                                            viewBox="0 0 100 100"
                                            fill="none"
                                            strokeWidth="0.5"
                                        >
                                            <circle cx="50" cy="50" r="40" strokeDasharray="2,2" />
                                            <circle cx="50" cy="50" r="25" />
                                            <line x1="50" y1="0" x2="50" y2="100" />
                                            <line x1="0" y1="50" x2="100" y2="50" />
                                            <path d="M 20 20 L 80 80 M 80 20 L 20 80" strokeDasharray="1,3" />
                                        </motion.svg>
                                    ) : (
                                        // Developer: UML Diagramme & Klassen-Strukturen
                                        <motion.svg
                                            key="code-uml"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="w-full h-full stroke-current text-primary"
                                            viewBox="0 0 100 100"
                                            fill="none"
                                            strokeWidth="0.5"
                                        >
                                            <rect x="10" y="10" width="30" height="20" rx="2" />
                                            <line x1="10" y1="20" x2="40" y2="20" />
                                            <rect x="60" y="15" width="30" height="25" rx="2" />
                                            <line x1="60" y1="25" x2="90" y2="25" />
                                            <rect x="35" y="65" width="35" height="20" rx="2" />
                                            <line x1="35" y1="75" x2="70" y2="75" />
                                            {/* Verbindungslinien (UML Pfeile) */}
                                            <path d="M 25 30 L 25 75 L 35 75" strokeDasharray="1,1" />
                                            <path d="M 75 40 L 75 65" />
                                            <polygon points="75,65 72,60 78,60" fill="none" />
                                        </motion.svg>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Dynamischer, pulsierender Leuchtkranz */}
                            <div className={`w-64 h-64 rounded-3xl absolute -z-10 opacity-20 blur-3xl transition-all duration-700
                                ${istDev ? 'bg-primary' : 'bg-[#cd7f32]'}`} 
                            />

                            {/* Das Bild-Fenster */}
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-glass-border p-2 glass transition-all duration-700 shadow-2xl relative">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={istDev ? 'dev' : 'polier'}
                                        src={istDev ? '/dev.png' : '/polier.png'}
                                        alt={istDev ? 'Developer' : 'Polier'}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full object-cover object-center rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                                        loading="lazy"
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Rotierender Zierrahmen */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-3xl border border-dashed border-primary/20 -m-4 md:-m-6 pointer-events-none"
                            />

                            {/* Tech-Badge */}
                            <div className="absolute -bottom-2 -right-2 glass p-4 rounded-xl shadow-2xl border border-glass-border">
                                {istDev ? (
                                    <Terminal size={24} className="text-primary animate-pulse" />
                                ) : (
                                    <Hammer size={24} className="text-[#cd7f32] animate-pulse" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UeberMich;

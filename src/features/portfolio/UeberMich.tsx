import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Hammer, User } from 'lucide-react';
import ScrollEnthuellung from '../../components/ui/ScrollEnthuellung';
import { benutzeSpracheSpeicher } from '@/speicher/spracheSpeicher';
import { uebersetzungen } from '../../data/uebersetzungen';

/**
 * UeberMich - Stellt Semirs Werdegang interaktiv dar.
 * Ermöglicht das Umschalten zwischen seiner Zeit als Polier und seiner Umschulung zum Developer.
 * Verwendet sein echtes Profilbild (profile.jpg) mit dynamischen Licht- und Icon-Effekten.
 */
const UeberMich: React.FC = () => {
    const [istDev, setIstDev] = useState<boolean>(true);
    const { sprache } = benutzeSpracheSpeicher();
    const t = uebersetzungen[sprache];
    const de = sprache === 'de';

    return (
        <section className="py-24 px-4 relative overflow-hidden" id="ueber-mich" aria-labelledby="about-title">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
                
                {/* Header-Zeile mit Umschalter */}
                <ScrollEnthuellung richtung="unten">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 pb-8">
                        <div>
                            <h2 id="about-title" className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
                                {t.ueberMich.titel.split(" ")[0]} <span className="gradient-text">{t.ueberMich.titel.split(" ").slice(1).join(" ")}</span>
                            </h2>
                            <p className="text-muted text-lg font-medium mt-2">
                                {de ? 'Vom Bauleiter zum Softwarearchitekten' : 'From Construction Manager to Software Architect'}
                            </p>
                        </div>

                        {/* Der Macher-Story Umschalter */}
                        <div className="flex p-1.5 rounded-2xl glass bg-zinc-950/80 border-primary/20 shadow-xl relative z-20">
                            <button
                                onClick={() => setIstDev(false)}
                                className={`flex items-center gap-2 py-2.5 px-5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer
                                    ${!istDev ? 'bg-[#cd7f32] text-black shadow-lg font-extrabold' : 'text-muted hover:text-white'}`}
                            >
                                <Hammer size={14} />
                                <span>{de ? 'Polier 🏗' : 'Foreman 🏗'}</span>
                            </button>
                            <button
                                onClick={() => setIstDev(true)}
                                className={`flex items-center gap-2 py-2.5 px-5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer
                                    ${istDev ? 'bg-primary text-black shadow-lg font-extrabold' : 'text-muted hover:text-white'}`}
                            >
                                <Terminal size={14} />
                                <span>{de ? 'Developer 💻' : 'Developer 💻'}</span>
                            </button>
                        </div>
                    </div>
                </ScrollEnthuellung>

                {/* Content-Bereich */}
                <div className="grid md:grid-cols-2 items-center gap-12 min-h-[400px]">
                    
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
                                
                                {/* Zwei Highlight-Karten */}
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div className="glass p-5 text-center rounded-2xl border-glass-border shadow-md hover:border-primary/30 transition-all duration-300">
                                        <h4 className="text-lg font-bold gradient-text">
                                            {istDev ? "Clean Code" : "Organisation"}
                                        </h4>
                                        <p className="text-[9px] text-muted uppercase font-bold tracking-wider mt-1">
                                            {istDev ? (de ? "Struktur & Logik" : "Structure & Logic") : (de ? "Großbaustellen" : "Large Sites")}
                                        </p>
                                    </div>
                                    <div className="glass p-5 text-center rounded-2xl border-glass-border shadow-md hover:border-primary/30 transition-all duration-300">
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

                    {/* Rechte Seite: Profilbild mit dynamischen Effekten */}
                    <div className="flex justify-center">
                        <div className="relative group">
                            
                            {/* Dynamischer, pulsierender Leuchtkranz im Hintergrund */}
                            <div className={`w-64 h-64 rounded-full absolute -z-10 opacity-20 blur-3xl transition-all duration-700
                                ${istDev ? 'bg-primary' : 'bg-[#cd7f32]'}`} 
                            />

                            {/* Foto-Fenster */}
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-glass-border p-2 glass transition-all duration-700 shadow-2xl relative">
                                <img
                                    src="/profile.jpg"
                                    alt="Profilbild von Semir Borogovac"
                                    className={`w-full h-full object-cover object-center rounded-full transition-all duration-500
                                        ${istDev ? 'grayscale-[30%] hover:grayscale-0' : 'sepia-[40%] hover:sepia-0'}`}
                                    loading="lazy"
                                />
                            </div>

                            {/* Rotierender Zierring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 -m-4 md:-m-6 pointer-events-none"
                            />

                            {/* Dynamisches Tech-Badge */}
                            <div className="absolute -bottom-2 -right-2 glass p-4 rounded-2xl shadow-2xl border border-glass-border animate-bounce-subtle">
                                {istDev ? (
                                    <Terminal size={24} className="text-primary" />
                                ) : (
                                    <Hammer size={24} className="text-[#cd7f32]" />
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

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import ScrollEnthuellung from '../../components/ui/ScrollEnthuellung';
import SpotlightKarte from '../../components/ui/SpotlightKarte';
import GlitzerText from '../../components/ui/GlitzerText';
import LaserRahmen from '../../components/ui/LaserRahmen';
import { benutzeSpracheSpeicher } from '@/speicher/spracheSpeicher';
import { uebersetzungen } from '../../data/uebersetzungen';

/**
 * UeberMich - Stellt den persönlichen Hintergrund und die Motivation vor.
 * Zeigt Semirs echtes Profilbild (profile.jpg) eingebettet in eine 3D-Spotlight-Karte.
 */
const UeberMich: React.FC = () => {
    const { sprache } = benutzeSpracheSpeicher();
    const t = uebersetzungen[sprache];

    return (
        <section className="py-24 px-4" aria-labelledby="about-title">
            <div className="grid md:grid-cols-2 items-center gap-12 max-w-7xl mx-auto">

                {/* Linke Seite: Text-Inhalte */}
                <ScrollEnthuellung richtung="links">
                    <div className="relative z-10">
                        <h2 id="about-title" className="text-4xl mb-6 font-extrabold tracking-tight">
                            <GlitzerText>{t.ueberMich.subtitel}</GlitzerText> <span className="gradient-text">{t.ueberMich.titel}</span>
                        </h2>

                        <p className="text-muted text-lg mb-6 leading-relaxed font-medium">
                            {t.ueberMich.beschreibung1}
                        </p>

                        <p className="text-muted text-lg mb-8 leading-relaxed font-medium">
                            {t.ueberMich.beschreibung2}
                        </p>

                        {/* Highlight-Karten */}
                        <div className="grid grid-cols-2 gap-4">
                            <article className="glass p-6 text-center rounded-2xl border border-glass-border shadow-lg group hover:border-primary/50 transition-colors">
                                <h4 className="text-2xl font-bold gradient-text">{t.ueberMich.karten.cleanCode.titel}</h4>
                                <p className="text-[10px] text-muted uppercase font-bold tracking-widest mt-1">{t.ueberMich.karten.cleanCode.text}</p>
                            </article>
                            <article className="glass p-6 text-center rounded-2xl border border-glass-border shadow-lg group hover:border-primary/50 transition-colors">
                                <h4 className="text-2xl font-bold gradient-text">{t.ueberMich.karten.lernbereit.titel}</h4>
                                <p className="text-[10px] text-muted uppercase font-bold tracking-widest mt-1">{t.ueberMich.karten.lernbereit.text}</p>
                            </article>
                        </div>
                    </div>
                </ScrollEnthuellung>

                {/* Rechte Seite: Profilbild mit 3D-Spotlight-Effekten */}
                <ScrollEnthuellung richtung="rechts" verzoegerung={0.2}>
                    <div className="relative flex justify-center">
                        {/* Gold-Leuchten im Hintergrund */}
                        <div className="w-64 h-64 bg-primary rounded-full absolute -z-10 opacity-20 blur-3xl animate-pulse" />

                        <div className="relative group">
                            {/* 3D-Spotlight-Karte für sein Bild */}
                            <SpotlightKarte klasse="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary/20 p-2 shadow-2xl transition-all duration-700 hover:border-primary/50 relative">
                                <LaserRahmen radius={9999} />
                                
                                <img
                                    src="/profile.jpg"
                                    alt="Profilbild von Semir Borogovac"
                                    className="w-full h-full object-cover object-center rounded-full grayscale hover:grayscale-0 transition-all duration-700"
                                    loading="lazy"
                                />
                            </SpotlightKarte>

                            {/* Dynamischer, rotierender Zierring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 -m-4 md:-m-6 pointer-events-none"
                            />

                            {/* Tech-Badge */}
                            <div className="absolute -bottom-2 -right-2 glass p-5 rounded-2xl shadow-2xl border border-glass-border animate-bounce-subtle">
                                <Terminal size={28} className="text-primary" />
                            </div>
                        </div>
                    </div>
                </ScrollEnthuellung>
            </div>
        </section>
    );
};

export default UeberMich;


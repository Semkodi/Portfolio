import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import ScrollEnthuellung from '../../components/ui/ScrollEnthuellung';

/**
 * UeberMich - Stellt den persönlichen Hintergrund und die Motivation vor.
 * Kombiniert Storytelling mit visuellen Akzenten durch Profilbild-Effekte.
 */
const UeberMich: React.FC = () => {
    return (
        <section className="py-24 px-4" aria-labelledby="about-title">
            <div className="grid md:grid-cols-2 items-center gap-12 max-w-7xl mx-auto">

                {/* Text-Inhalte */}
                <ScrollEnthuellung richtung="links">
                    <div className="relative z-10">
                        <h2 id="about-title" className="text-4xl mb-6 font-extrabold tracking-tight">
                            Mein Weg in die <span className="gradient-text">IT</span>
                        </h2>

                        <p className="text-muted text-lg mb-6 leading-relaxed font-medium">
                            Warum der Wechsel? Die Faszination daran, durch Code echte Probleme zu lösen und etwas zu erschaffen, hat mich zur Umschulung bewogen.
                        </p>

                        <p className="text-muted text-lg mb-8 leading-relaxed font-medium">
                            Als Fachinformatiker liegt mein Fokus darauf, nicht nur Code zu schreiben, sondern nachhaltige Lösungen zu entwickeln.
                            Mein technisches Verständnis kombiniert mit meiner vorherigen Berufserfahrung hilft mir, Projekte ganzheitlich zu betrachten.
                        </p>

                        {/* Highlight-Karten */}
                        <div className="grid grid-cols-2 gap-4">
                            <article className="glass p-6 text-center rounded-2xl border border-white/10 shadow-lg group hover:border-primary/50 transition-colors">
                                <h4 className="text-2xl font-bold gradient-text">Clean Code</h4>
                                <p className="text-[10px] text-muted uppercase font-bold tracking-widest mt-1">Priorität</p>
                            </article>
                            <article className="glass p-6 text-center rounded-2xl border border-white/10 shadow-lg group hover:border-primary/50 transition-colors">
                                <h4 className="text-2xl font-bold gradient-text">Lernbereit</h4>
                                <p className="text-[10px] text-muted uppercase font-bold tracking-widest mt-1">Einstellung</p>
                            </article>
                        </div>
                    </div>
                </ScrollEnthuellung>

                {/* Profilbild mit Premium-Effekten */}
                <ScrollEnthuellung richtung="rechts" verzoegerung={0.2}>
                    <div className="relative flex justify-center">
                        {/* Pulsierendes Hintergrund-Glow */}
                        <div className="w-64 h-64 bg-primary rounded-full absolute -z-10 opacity-20 blur-3xl animate-pulse" />

                        <div className="relative group">
                            {/* Glass-Rahmen für das Bild */}
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 p-2 glass transition-all duration-700 group-hover:border-primary/50 group-hover:scale-[1.02] shadow-2xl shadow-primary/10">
                                <img
                                    src="/profile.jpg"
                                    alt="Profilbild von Semir Borogovac"
                                    className="w-full h-full object-cover object-center rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 backdrop-blur-[2px] group-hover:backdrop-blur-0"
                                    loading="lazy"
                                />
                            </div>

                            {/* Dynamischer, rotierender Zierring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 -m-4 md:-m-6 pointer-events-none"
                            />

                            {/* Visuelles Tech-Badge */}
                            <div className="absolute -bottom-2 -right-2 glass p-5 rounded-2xl shadow-2xl border border-white/20 animate-bounce-subtle">
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

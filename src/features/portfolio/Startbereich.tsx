import React from 'react';
import { motion } from 'framer-motion';
import Schreibmaschine from '../../components/ui/Schreibmaschine';
import GlitzerText from '../../components/ui/GlitzerText';
import MagnetischerButton from '../../components/ui/MagnetischerButton';
import MetallPanel from '../../components/ui/MetallPanel';
import { benutzeSpracheSpeicher } from '@/speicher/spracheSpeicher';
import { uebersetzungen } from '../../data/uebersetzungen';

/**
 * Startbereich (Hero-Sektion) - Die erste visuelle Sektion mit dem Typewriter-Effekt.
 * Veredelt durch eine lebensechte 3D-Metallplatte (MetallPanel) und LED-Workstation-Leuchten.
 */
const Startbereich: React.FC = () => {
    const { sprache } = benutzeSpracheSpeicher();
    const t = uebersetzungen[sprache];

    return (
        <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden py-20" aria-label="Willkommensbereich">
            {/* 1. LED-Leuchtstäbe an den Seiten (Workstation-Atmosphäre aus dem Foto) */}
            <div 
                className="absolute left-6 top-1/2 -translate-y-1/2 w-1.5 h-[60vh] rounded-full bg-[#00f2fe] animate-led-cyan z-0 pointer-events-none hidden lg:block" 
                style={{ content: "''" }}
            />
            <div 
                className="absolute right-6 top-1/2 -translate-y-1/2 w-1.5 h-[60vh] rounded-full bg-[#ec4899] animate-led-pink z-0 pointer-events-none hidden lg:block" 
                style={{ content: "''" }}
            />

            {/* Weiches Hintergrundglühen */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#00f2fe]/10 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ec4899]/10 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="z-10 px-4 w-full flex flex-col items-center gap-8"
            >
                {/* Das 3D Metall-Panel als primärer Blickfang */}
                <div className="w-full px-2">
                    <MetallPanel />
                </div>

                {/* Sekundäre Textgruppe (Schreibmaschine & Beschreibung) */}
                <div className="max-w-3xl flex flex-col items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight hindernis">
                        <GlitzerText>{t.hero.titelStart}</GlitzerText> <br className="sm:hidden" />
                        <span className="inline-block mt-2 sm:mt-0 font-mono text-primary">
                            <Schreibmaschine woerter={t.hero.typewriter} />
                        </span>
                    </h1>

                    <p
                        className="max-w-2xl mx-auto text-muted text-sm sm:text-base md:text-lg text-pretty leading-relaxed font-medium mt-2 hindernis"
                        dangerouslySetInnerHTML={{ __html: t.hero.beschreibung }}
                    />
                </div>

                {/* CTAs */}
                <div className="flex gap-3 justify-center items-center flex-wrap mt-2">
                    <MagnetischerButton
                        href="#projekte"
                        variante="primary"
                        ariaLabel="Zu meinen Projekten scrollen"
                    >
                        {t.hero.btnProjekte}
                    </MagnetischerButton>
                    <MagnetischerButton
                        href="#kontakt"
                        variante="outline"
                        ariaLabel="Kontaktbereich öffnen"
                    >
                        {t.hero.btnKontakt}
                    </MagnetischerButton>
                </div>
            </motion.div>
        </section>
    );
};

export default Startbereich;



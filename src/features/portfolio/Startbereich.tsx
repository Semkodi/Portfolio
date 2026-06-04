import React from 'react';
import { motion } from 'framer-motion';
import Schreibmaschine from '../../components/ui/Schreibmaschine';
import GlitzerText from '../../components/ui/GlitzerText';
import MagnetischerButton from '../../components/ui/MagnetischerButton';
import { benutzeSpracheSpeicher } from '@/speicher/spracheSpeicher';
import { uebersetzungen } from '../../data/uebersetzungen';

/**
 * Startbereich (Hero-Sektion) - Die erste visuelle Sektion mit dem Typewriter-Effekt.
 */
const Startbereich: React.FC = () => {
    const { sprache } = benutzeSpracheSpeicher();
    const t = uebersetzungen[sprache];

    return (
        <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden" aria-label="Willkommensbereich">
            {/* Visuelle Hintergrund-Effekte für mehr Tiefe */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10 px-4"
            >
                <h1 className="text-5xl md:text-7xl mb-6 font-extrabold tracking-tight hindernis">
                    <GlitzerText>{t.hero.titelStart}</GlitzerText> <br />
                    <Schreibmaschine woerter={t.hero.typewriter} />
                </h1>

                <p
                    className="max-w-2xl mx-auto text-muted text-lg mb-10 text-pretty leading-relaxed font-medium hindernis"
                    dangerouslySetInnerHTML={{ __html: t.hero.beschreibung }}
                />

                <div className="flex gap-2 justify-center items-center flex-wrap">
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



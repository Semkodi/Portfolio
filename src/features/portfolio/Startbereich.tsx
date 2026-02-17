import React from 'react';
import { motion } from 'framer-motion';
import Schreibmaschine from '../../components/ui/Schreibmaschine';

/**
 * Startbereich (Hero-Sektion) - Die erste visuelle Sektion mit dem Typewriter-Effekt.
 */
const Startbereich: React.FC = () => {
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
                    Ich entwickle <br />
                    <Schreibmaschine woerter={["moderne Web Apps", "Mendix Lösungen", "skalierbare APIs", "Java Software"]} />
                </h1>

                <p className="max-w-2xl mx-auto text-muted text-lg mb-10 text-pretty leading-relaxed font-medium hindernis">
                    Leidenschaftlicher Entwickler mit Fokus auf <b>Java</b>, <b>Web-Technologien</b> und <b>Mendix</b>.
                    Ich verwandle komplexe Anforderungen in effiziente, benutzerfreundliche Anwendungen.
                </p>

                <div className="flex gap-4 justify-center flex-wrap">
                    <a
                        href="#projekte"
                        className="btn btn-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95"
                        aria-label="Zu meinen Projekten scrollen"
                    >
                        Meine Projekte
                    </a>
                    <a
                        href="#kontakt"
                        className="btn btn-outline hover:bg-white/5 active:scale-95 transition-all"
                        aria-label="Kontaktbereich öffnen"
                    >
                        Kontakt aufnehmen
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default Startbereich;

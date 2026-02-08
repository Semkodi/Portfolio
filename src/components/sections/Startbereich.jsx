import { motion } from 'framer-motion';
import Schreibmaschine from '../ui/Schreibmaschine';

const Startbereich = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
            {/* Dekorative Hintergrundelemente (leuchtende Blobs) */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10"
            >
                {/* Status Badge "Open to Work" */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block"
                >
                    <span className="px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-6 inline-flex items-center gap-2 border border-primary/20 shadow-lg shadow-primary/10">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Verfügbar
                    </span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl mb-6 font-extrabold tracking-tight">
                    Ich entwickle <br />
                    {/* Schreibmaschinen-Effekt mit wechselnden Texten */}
                    <Schreibmaschine words={["moderne Web Apps", "Mendix Lösungen", "skalierbare APIs", "Java Software"]} />
                </h1>
                <p className="max-w-2xl mx-auto text-muted text-lg mb-10 text-pretty leading-relaxed">
                    Leidenschaftlicher Entwickler mit Fokus auf <b>Java</b>, <b>Web-Technologien</b> und <b>Mendix</b>.
                    Ich verwandle komplexe Anforderungen in effiziente, benutzerfreundliche Anwendungen.
                </p>
                <div className="flex gap-4 justify-center">
                    <a href="#projects" className="btn btn-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">Meine Projekte</a>
                    <a href="#contact" className="btn btn-outline hover:bg-white/5">Kontakt aufnehmen</a>
                </div>
            </motion.div>
        </section>
    );
};

export default Startbereich;

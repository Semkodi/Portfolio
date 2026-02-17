import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, ChevronDown } from 'lucide-react';
import ScrollEnthuellung from '../../components/ui/ScrollEnthuellung';
import SpotlightKarte from '../../components/ui/SpotlightKarte';
import { useSpracheStore } from '../../store/useSpracheStore';

/**
 * Schnittstellen für die Lebenslauf-Datenstruktur.
 */
interface LebenslaufEintrag {
    titel: string;
    unternehmen: string;
    zeitraum: string;
    beschreibung: string;
    typ: 'arbeit' | 'bildung';
}

interface ZeitstrahlEintragProps extends LebenslaufEintrag {
    index: number;
}

/**
 * ZeitstrahlEintrag - Ein interaktives Element innerhalb der Timeline.
 * Erlaubt das Auf- und Zuklappen von Details mit geschmeidigen Animationen.
 */
const ZeitstrahlEintrag: React.FC<ZeitstrahlEintragProps> = ({
    titel,
    unternehmen,
    zeitraum,
    beschreibung,
    typ,
    index
}) => {
    const [istOffen, setzeIstOffen] = useState<boolean>(false);

    return (
        <ScrollEnthuellung verzoegerung={index * 0.1}>
            <div className="relative pl-12 pb-10 last:pb-0 group">
                {/* Dynamische vertikale Verbindungslinie */}
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-transparent group-last:from-transparent" aria-hidden="true" />

                {/* Interaktiver Markierungspunkt */}

                <SpotlightKarte
                    klasse={`transition-all duration-500 cursor-pointer overflow-visible ${istOffen ? 'ring-2 ring-primary/50 shadow-2xl shadow-primary/10' : ''}`}
                >
                    <div
                        className="p-6"
                        onClick={() => setzeIstOffen(!istOffen)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setzeIstOffen(!istOffen)}
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-grow">
                                <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                                    <h3 className="text-2xl font-bold text-fg tracking-tight">{titel}</h3>
                                    <div className="flex items-center gap-2 text-primary text-sm font-mono bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                                        <Calendar size={14} aria-hidden="true" />
                                        {zeitraum}
                                    </div>
                                </div>
                                <div className="text-secondary font-semibold text-lg">{unternehmen}</div>
                            </div>

                            <motion.div
                                animate={{ rotate: istOffen ? 180 : 0 }}
                                transition={{ duration: 0.4, ease: "backOut" }}
                                className="text-muted bg-muted/10 p-2 rounded-lg"
                                aria-hidden="true"
                            >
                                <ChevronDown size={24} />
                            </motion.div>
                        </div>

                        <AnimatePresence>
                            {istOffen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-6 mt-6 border-t border-border">
                                        <p className="text-muted text-lg leading-relaxed text-pretty font-medium">
                                            {beschreibung}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </SpotlightKarte>
            </div>
        </ScrollEnthuellung>
    );
};

/**
 * Lebenslauf - Strukturiert den beruflichen Werdegang in einer interaktiven Timeline.
 */
const Lebenslauf: React.FC = () => {
    const { sprache } = useSpracheStore();

    const lebenslaufDaten: LebenslaufEintrag[] = [
        {
            titel: sprache === 'de' ? "Umschulung zum Fachinformatiker" : "Retraining as IT Specialist",
            unternehmen: "Institut für Bildung und Beruf, Hachenburg",
            zeitraum: sprache === 'de' ? "seit 02.2025" : "since 02.2025",
            beschreibung: sprache === 'de'
                ? "Spezialisierung auf Anwendungsentwicklung mit Schwerpunkt Java und modernen Web-Technologien. Erwerb fundierter Kenntnisse in agiler Softwareentwicklung und Systemarchitektur."
                : "Specialization in Application Development with a focus on Java and modern web technologies. Acquiring in-depth knowledge in agile software development and system architecture.",
            typ: "bildung"
        }
    ];

    return (
        <section className="py-24 px-4" aria-labelledby="resume-title">
            <ScrollEnthuellung richtung="unten">
                <div className="text-center mb-20">
                    <h2 id="resume-title" className="text-5xl font-extrabold mb-6 tracking-tight text-fg">
                        {sprache === 'de' ? 'Mein ' : 'My '}
                        <span className="gradient-text">{sprache === 'de' ? 'Werdegang' : 'Career'}</span>
                    </h2>
                    <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        {sprache === 'de'
                            ? "Ein interaktiver Überblick über meine Ausbildung und meinen Weg in die Softwareentwicklung. Klicke auf die Karten, um Details zu entdecken."
                            : "An interactive overview of my education and my path into software development. Click on the cards to discover details."}
                    </p>
                </div>
            </ScrollEnthuellung>

            <div className="max-w-4xl mx-auto">
                {lebenslaufDaten.map((eintrag, index) => (
                    <ZeitstrahlEintrag key={index} {...eintrag} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Lebenslauf;

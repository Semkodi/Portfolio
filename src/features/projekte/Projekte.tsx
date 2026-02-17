import React, { useState } from 'react';
import { Database, Heart, Terminal } from 'lucide-react';
import ScrollEnthuellung from '../../components/ui/ScrollEnthuellung';
import SpotlightKarte from '../../components/ui/SpotlightKarte';
import ProjektModal, { Projekt } from '../../components/ui/ProjektModal';

/**
 * Hilfskomponente für eine einzelne Projektkarte.
 */
interface ProjektKarteProps extends Projekt {
    index: number;
    beiOeffnen: (projekt: Projekt) => void;
}

const ProjektKarte: React.FC<ProjektKarteProps> = ({
    titel,
    beschreibung,
    technologien,
    link,
    vertiefung,
    hervorgehoben,
    index,
    beiOeffnen
}) => {
    // Dynamische Gradienten für visuelle Abwechslung
    const gradienten = [
        'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20',
        'from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20',
        'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20'
    ];

    return (
        <ScrollEnthuellung verzoegerung={index * 0.1}>
            <article className="h-full">
                <SpotlightKarte klasse={`flex flex-col h-full group border-white/10 bg-slate-900/40 shadow-sm hover:shadow-xl transition-all duration-500`}>
                    {/* Visualisierung des Projekts */}
                    <div className="h-36 bg-gradient-to-br transition-all duration-500 group-hover:opacity-80 relative overflow-hidden flex items-center justify-center">
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradienten[index % gradienten.length]}`} />
                        <div className="absolute inset-0 opacity-5 bg-grid-white/[0.2] bg-[size:20px_20px]" />

                        <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                            {titel.includes('Mendix') ? <Database className="text-primary" size={28} /> :
                                titel.includes('LoveHub') ? <Heart className="text-secondary" size={28} /> :
                                    <Terminal className="text-primary" size={28} />}
                        </div>
                    </div>

                    <div className="p-5 flex-grow flex flex-col items-center text-center">
                        <header className="mb-3 w-full">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-bold opacity-80">Entwicklung</span>
                            <h3 className="text-xl font-extrabold tracking-tight text-white mt-1 uppercase">
                                {titel}
                            </h3>
                        </header>

                        <p className="text-muted text-sm mb-6 leading-relaxed line-clamp-3 font-medium">
                            {beschreibung}
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 mb-8 mt-auto">
                            {technologien.map(tech => (
                                <span key={tech} className="text-[10px] uppercase font-bold px-2.5 py-1 bg-white/5 text-muted rounded-lg border border-white/5">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <button
                            onClick={() => beiOeffnen({ titel, beschreibung, technologien, link, vertiefung, hervorgehoben })}
                            className="btn btn-primary w-full text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all cursor-pointer active:scale-95"
                            aria-label={`Details zu Projekt ${titel} anzeigen`}
                        >
                            Projekt Details
                        </button>
                    </div>
                </SpotlightKarte>
            </article>
        </ScrollEnthuellung>
    );
};

/**
 * Projekte - Die Galerie der ausgewählten Arbeiten.
 */
const Projekte: React.FC = () => {
    const [ausgewaehltesProjekt, setzeAusgewaehltesProjekt] = useState<Projekt | null>(null);
    const [istModalOffen, setzeIstModalOffen] = useState<boolean>(false);

    const oeffneProjekt = (projekt: Projekt) => {
        setzeAusgewaehltesProjekt(projekt);
        setzeIstModalOffen(true);
    };

    const projekte: Projekt[] = [
        {
            titel: "Mendix THM Projekt",
            beschreibung: "Entwicklung einer umfangreichen Unternehmensanwendung im Rahmen des Studiums/der Umschulung.",
            vertiefung: "Herausforderung: Integration komplexer Datenmodelle und Benutzerrollen. Lösung: Nutzung von Mendix Domain Models und Microflows zur Abbildung der Geschäftslogik.",
            technologien: ["Mendix", "Java", "SQL", "XPath"],
            link: "#",
            hervorgehoben: true
        },
        {
            titel: "LoveHub Projekt",
            beschreibung: "Eine Dating-Plattform mit Fokus auf Authentizität und Sicherheit. Modernes UI/UX Design.",
            vertiefung: "Implementierung eines Echtzeit-Chats und Matching-Algorithmus.",
            technologien: ["React", "Spring Boot", "PostgreSQL", "WebSocket"],
            link: "#"
        },
        {
            titel: "DevGram",
            beschreibung: "Ein soziales Netzwerk für Entwickler zum Teilen von Code-Snippets.",
            technologien: ["Node.js", "Express", "MongoDB", "React"],
            link: "#"
        }
    ];

    return (
        <section className="py-24 px-4" aria-labelledby="projects-title">
            <ScrollEnthuellung richtung="unten">
                <div className="flex justify-between items-end mb-12 text-center md:text-left mx-auto max-w-7xl">
                    <div className="w-full">
                        <h2 id="projects-title" className="text-4xl md:text-5xl mb-4 font-extrabold text-white uppercase tracking-tight">
                            Ausgewählte <span className="gradient-text">Projekte</span>
                        </h2>
                        <p className="text-muted text-lg font-medium max-w-2xl mx-auto md:mx-0">
                            Ein Einblick in meine bisherigen Arbeiten und Experimente.
                        </p>
                    </div>
                </div>
            </ScrollEnthuellung>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {projekte.map((projekt, index) => (
                    <ProjektKarte key={projekt.titel} {...projekt} index={index} beiOeffnen={oeffneProjekt} />
                ))}
            </div>

            <ProjektModal
                istOffen={istModalOffen}
                beiSchliessen={() => setzeIstModalOffen(false)}
                projekt={ausgewaehltesProjekt}
            />
        </section>
    );
};

export default Projekte;

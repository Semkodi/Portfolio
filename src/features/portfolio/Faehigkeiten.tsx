import React, { useState } from 'react';
import { Layout, Server, Database, Cpu, Terminal } from 'lucide-react';
import {
    SiReact, SiJavascript, SiTailwindcss, SiHtml5, SiCss3,
    SiSpringboot, SiNodedotjs, SiExpress, SiPython,
    SiPostgresql, SiMongodb, SiMariadb, SiMysql,
    SiGit, SiGithub, SiDocker
} from 'react-icons/si';
import { VscJson, VscCode } from 'react-icons/vsc';
import { motion, useDragControls } from 'framer-motion';
import ScrollEnthuellung from '../../components/ui/ScrollEnthuellung';
import { useSpracheStore } from '../../store/useSpracheStore';
import { uebersetzungen } from '../../data/uebersetzungen';

/**
 * Definition der Datenstrukturen für technische Fähigkeiten.
 */
interface Faehigkeit {
    name: string;
    beherrschung: number;
    icon?: React.ReactNode;
}

interface FaehigkeitsKategorie {
    titel: string;
    bildmarke: React.ReactNode;
    liste: Faehigkeit[];
}

/**
 * FaehigkeitFenster - Eine einzelne Skill-Kategorie als interaktives Desktop-Fenster.
 */
const FaehigkeitFenster: React.FC<{ kategorie: FaehigkeitsKategorie; index: number }> = ({ kategorie, index }) => {
    const [sichtbar, setSichtbar] = useState(true);
    const [minimiert, setMinimiert] = useState(false);
    const [crtEffektAktiv, setCrtEffektAktiv] = useState(false);
    const dragControls = useDragControls();

    const schliesseFenster = () => {
        setCrtEffektAktiv(true);
        setTimeout(() => setSichtbar(false), 500); // Warte auf Animation
    };

    const oeffneWieder = () => {
        setSichtbar(true);
        setCrtEffektAktiv(false);
        setMinimiert(false);
    };

    // Wenn geschlossen, zeige einen "System Neustart" Button
    if (!sichtbar) {
        return (
            <div className="h-full flex items-end justify-center pb-4 opacity-50 hover:opacity-100 transition-opacity min-h-[200px]">
                <button
                    onClick={oeffneWieder}
                    className="flex flex-col items-center gap-2 text-muted hover:text-primary transition-colors group"
                >
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:animate-spin-slow">
                        <Terminal size={20} />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest">Restore Module</span>
                </button>
            </div>
        );
    }

    return (
        <ScrollEnthuellung verzoegerung={index * 0.1}>
            <article className={`h-full group transition-all duration-300 ${minimiert ? 'h-auto mb-auto' : ''}`}>
                <motion.div
                    drag
                    dragControls={dragControls}
                    dragListener={false}
                    dragElastic={0.1}
                    whileDrag={{ scale: 1.02, zIndex: 100, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    className={`relative flex flex-col h-full rounded-xl overflow-hidden border border-border bg-card shadow-lg hover:shadow-2xl transition-shadow duration-500 ${minimiert ? 'h-auto' : ''}`}
                >
                    {/* Fenster-Leiste (Drag Handle) */}
                    <div
                        className="h-9 bg-muted/10 border-b border-border flex items-center px-4 justify-between backdrop-blur-sm select-none cursor-grab active:cursor-grabbing touch-none"
                        onPointerDown={(e) => dragControls.start(e)}
                        onDoubleClick={() => setMinimiert(!minimiert)}
                    >
                        <div className="flex gap-2 group/controls" onPointerDown={(e) => e.stopPropagation()}>
                            <button
                                onClick={schliesseFenster}
                                className="w-3 h-3 rounded-full bg-red-400/80 hover:bg-red-500 transition-colors cursor-pointer flex items-center justify-center group/btn"
                                aria-label="Schließen"
                            >
                                <span className="text-[8px] opacity-0 group-hover/controls:opacity-100 text-black/50 font-bold">×</span>
                            </button>
                            <button
                                onClick={() => setMinimiert(!minimiert)}
                                className="w-3 h-3 rounded-full bg-yellow-400/80 hover:bg-yellow-500 transition-colors cursor-pointer flex items-center justify-center group/btn"
                                aria-label="Minimieren"
                            >
                                <span className="text-[8px] opacity-0 group-hover/controls:opacity-100 text-black/50 font-bold">−</span>
                            </button>
                            <div className="w-3 h-3 rounded-full bg-green-400/80 cursor-default opacity-50" />
                        </div>
                        <div className="text-[10px] font-mono text-muted opacity-60 truncate max-w-[150px]">
                            ~/skills/{kategorie.titel.toLowerCase().replace(/[\s&]+/g, '-')}
                        </div>
                    </div>

                    {/* Content-Bereich */}
                    {!minimiert && (
                        <div className={`p-6 flex-grow flex flex-col relative z-10 ${crtEffektAktiv ? 'animate-crt-off origin-center' : 'animate-in fade-in duration-500'}`}>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 flex items-center justify-center text-primary shadow-sm border border-primary/10">
                                    {kategorie.bildmarke}
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-fg">{kategorie.titel}</h3>
                            </div>

                            <div className="space-y-4">
                                {kategorie.liste.map(talent => (
                                    <div key={talent.name} className="group/element">
                                        <div className="flex justify-between items-end gap-4 mb-2">
                                            <div className="flex items-center gap-3">
                                                {talent.icon && (
                                                    <span className="text-muted group-hover/element:text-primary transition-colors duration-300 text-lg">
                                                        {talent.icon}
                                                    </span>
                                                )}
                                                <span className="text-sm font-bold text-muted group-hover/element:text-primary transition-colors duration-300">
                                                    {talent.name}
                                                </span>
                                            </div>
                                            <div className="flex gap-1" aria-hidden="true">
                                                {[...Array(5)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i < talent.beherrschung ? 'bg-primary scale-110 shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'bg-muted/20'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {/* Optionaler Fortschrittsbalken-Hintergrund für bessere Lesbarkeit */}
                                        <div className="h-1 w-full bg-muted/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary/20 to-primary/40 rounded-full"
                                                style={{ width: `${(talent.beherrschung / 5) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </article>
        </ScrollEnthuellung>
    );
};

/**
 * Faehigkeiten - Präsentiert das technische Stack in ansprechenden, interaktiven Karten.
 * Nutzt eine 5-Punkte-Skala zur Visualisierung der Expertise.
 */
const Faehigkeiten: React.FC = () => {
    const { sprache } = useSpracheStore();
    const t = uebersetzungen[sprache];

    // Zentrales Daten-Array der technischen Kompetenzen
    const faehigkeitsKategorien: FaehigkeitsKategorie[] = [
        {
            titel: t.skills.kategorien.frontend,
            bildmarke: <Layout size={24} />,
            liste: [
                { name: 'React', beherrschung: 2, icon: <SiReact /> },
                { name: 'JavaScript', beherrschung: 2, icon: <SiJavascript /> },
                { name: 'Tailwind CSS', beherrschung: 2, icon: <SiTailwindcss /> },
                { name: 'HTML5/CSS3', beherrschung: 2, icon: <div className="flex gap-1"><SiHtml5 /><SiCss3 /></div> }
            ]
        },
        {
            titel: t.skills.kategorien.backend,
            bildmarke: <Server size={24} />,
            liste: [
                { name: 'Java (Spring)', beherrschung: 2, icon: <SiSpringboot /> },
                { name: 'Node.js', beherrschung: 2, icon: <SiNodedotjs /> },
                { name: 'Express', beherrschung: 2, icon: <SiExpress /> },
                { name: 'Python', beherrschung: 2, icon: <SiPython /> }
            ]
        },
        {
            titel: t.skills.kategorien.datenbank,
            bildmarke: <Database size={24} />,
            liste: [
                { name: 'PostgreSQL', beherrschung: 2, icon: <SiPostgresql /> },
                { name: 'MongoDB', beherrschung: 2, icon: <SiMongodb /> },
                { name: 'MariaDB', beherrschung: 2, icon: <SiMariadb /> },
                { name: 'SQL', beherrschung: 2, icon: <SiMysql /> }
            ]
        },
        {
            titel: t.skills.kategorien.tools,
            bildmarke: <Cpu size={24} />,
            liste: [
                { name: 'Mendix Expert', beherrschung: 3, icon: <VscCode /> },
                { name: 'Git & GitHub', beherrschung: 2, icon: <div className="flex gap-1"><SiGit /><SiGithub /></div> },
                { name: 'Docker', beherrschung: 2, icon: <SiDocker /> },
                { name: 'REST APIs', beherrschung: 2, icon: <VscJson /> }
            ]
        },
    ];

    return (
        <section className="py-24 px-4 bg-opacity-50" aria-labelledby="skills-title">
            <ScrollEnthuellung richtung="unten">
                <div className="text-center mb-16">
                    <h2 id="skills-title" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 uppercase text-fg">
                        {t.skills.titel.split(" ")[0]} <span className="gradient-text">{t.skills.titel.split(" ").slice(1).join(" ")}</span>
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                        {t.skills.beschreibung}
                    </p>
                </div>
            </ScrollEnthuellung>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {faehigkeitsKategorien.map((kategorie, index) => (
                    <FaehigkeitFenster key={kategorie.titel} kategorie={kategorie} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Faehigkeiten;

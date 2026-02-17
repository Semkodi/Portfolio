import React, { useState } from 'react';
import { Database, Heart, Terminal } from 'lucide-react';
import { motion, useDragControls } from 'framer-motion';
import ScrollEnthuellung from '../../components/ui/ScrollEnthuellung';
import SpotlightKarte from '../../components/ui/SpotlightKarte';
import ProjektModal, { Projekt } from '../../components/ui/ProjektModal';
import { useSpracheStore } from '../../store/useSpracheStore';
import { uebersetzungen } from '../../data/uebersetzungen';

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
    const [sichtbar, setSichtbar] = useState(true);
    const [minimiert, setMinimiert] = useState(false);
    const [crtEffektAktiv, setCrtEffektAktiv] = useState(false);

    // Drag Controls für das Verschieben des Fensters
    const dragControls = useDragControls();

    const { sprache } = useSpracheStore();
    const t = uebersetzungen[sprache];

    const schliesseFenster = () => {
        setCrtEffektAktiv(true);
        setTimeout(() => setSichtbar(false), 500); // Warte auf Animation
    };

    const oeffneWieder = () => {
        setSichtbar(true);
        setCrtEffektAktiv(false);
        setMinimiert(false);
    };

    // Wenn geschlossen, zeige einen "System Neustart" Button (oder einfach nichts/Platzhalter)
    if (!sichtbar) {
        return (
            <div className="h-full flex items-end justify-center pb-4 opacity-50 hover:opacity-100 transition-opacity">
                <button
                    onClick={oeffneWieder}
                    className="flex flex-col items-center gap-2 text-muted hover:text-primary transition-colors group"
                >
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:animate-spin-slow">
                        <Terminal size={20} />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest">System Reboot</span>
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
                    // Constraints entfernen oder anpassen, falls nötig. 'dragConstraints' weglassen für freies Bewegen.
                    whileDrag={{ scale: 1.02, zIndex: 100, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    className={`relative flex flex-col h-full rounded-xl overflow-hidden border border-border bg-card shadow-lg hover:shadow-2xl transition-shadow duration-500 ${minimiert ? 'h-auto' : ''}`}
                    role="group"
                    aria-label={`Projekt: ${titel}`}
                >
                    {/* Fenster-Leiste (Browser-Look) - Jetzt Drag-Handle */}
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
                                title="Projekt schließen (TV-Effekt)"
                            >
                                <span className="text-[8px] opacity-0 group-hover/controls:opacity-100 text-black/50 font-bold">×</span>
                            </button>
                            <button
                                onClick={() => setMinimiert(!minimiert)}
                                className="w-3 h-3 rounded-full bg-yellow-400/80 hover:bg-yellow-500 transition-colors cursor-pointer flex items-center justify-center group/btn"
                                aria-label="Minimieren"
                                title={minimiert ? "Wiederherstellen" : "Minimieren"}
                            >
                                <span className="text-[8px] opacity-0 group-hover/controls:opacity-100 text-black/50 font-bold">−</span>
                            </button>
                            <button
                                onClick={() => beiOeffnen({ titel, beschreibung, technologien, link, vertiefung, hervorgehoben })}
                                className="w-3 h-3 rounded-full bg-green-400/80 hover:bg-green-500 transition-colors cursor-pointer flex items-center justify-center group/btn"
                                aria-label="Vergrößern / Details"
                                title="Details öffnen (Popup)"
                            >
                                <span className="text-[6px] opacity-0 group-hover/controls:opacity-100 text-black/50 font-bold">↗</span>
                            </button>
                        </div>
                        <div className="text-[10px] font-mono text-muted opacity-60 truncate max-w-[150px]">
                            ~/projekte/{titel.toLowerCase().replace(/\s+/g, '-')}
                        </div>
                    </div>

                    {/* Content-Bereich (wird ausgeblendet wenn minimiert) */}
                    {!minimiert && (
                        <div className={`p-6 flex-grow flex flex-col relative z-10 ${crtEffektAktiv ? 'animate-crt-off origin-center' : 'animate-in fade-in duration-500'}`}>
                            <header className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                        {titel.includes('Mendix') ? t.projekte.typ.lowCode : t.projekte.typ.fullstack}
                                    </span>
                                    {hervorgehoben && (
                                        <span className="flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold text-fg group-hover:text-primary transition-colors">
                                    {titel}
                                </h3>
                            </header>

                            <p className="text-muted text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                                {beschreibung}
                            </p>

                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {technologien.slice(0, 3).map(tech => (
                                        <span key={tech} className="px-2 py-1 text-[10px] font-mono rounded-md bg-muted/10 text-muted border border-border">
                                            {tech}
                                        </span>
                                    ))}
                                    {technologien.length > 3 && (
                                        <span className="px-2 py-1 text-[10px] font-mono rounded-md bg-muted/5 text-muted/60">
                                            +{technologien.length - 3}
                                        </span>
                                    )}
                                </div>

                                <button
                                    onClick={() => beiOeffnen({ titel, beschreibung, technologien, link, vertiefung, hervorgehoben })}
                                    className="w-full py-2.5 rounded-lg border border-border hover:bg-primary/5 hover:border-primary/50 text-sm font-semibold text-muted hover:text-primary transition-all flex items-center justify-center gap-2 group/btn"
                                >
                                    {t.projekte.buttons.details}
                                    <span className="text-lg leading-none group-hover/btn:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
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

    const { sprache } = useSpracheStore();
    const t = uebersetzungen[sprache];

    const oeffneProjekt = (projekt: Projekt) => {
        setzeAusgewaehltesProjekt(projekt);
        setzeIstModalOffen(true);
    };

    const projekte: Projekt[] = [
        {
            titel: t.projekte.liste.mendix.titel,
            beschreibung: t.projekte.liste.mendix.desc,
            vertiefung: t.projekte.liste.mendix.deep,
            technologien: ["Mendix", "Java Action", "SQL", "XPath"],
            link: "#",
            hervorgehoben: true
        },
        {
            titel: t.projekte.liste.lovehub.titel,
            beschreibung: t.projekte.liste.lovehub.desc,
            vertiefung: t.projekte.liste.lovehub.deep,
            technologien: ["React", "Spring Boot", "PostgreSQL", "WebSocket"],
            link: "#"
        },
        {
            titel: t.projekte.liste.devgram.titel,
            beschreibung: t.projekte.liste.devgram.desc,
            // Fallback for optional property if not in all items
            vertiefung: "Social Network Logic",
            technologien: ["Node.js", "Express", "MongoDB", "React"],
            link: "#"
        },
        {
            titel: t.projekte.liste.portfolio.titel,
            beschreibung: t.projekte.liste.portfolio.desc,
            vertiefung: t.projekte.liste.portfolio.deep,
            technologien: ["React", "TypeScript", "Tailwind", "Framer Motion"],
            link: "#"
        }
    ];

    return (
        <section className="py-24 px-4" aria-labelledby="projects-title">
            <ScrollEnthuellung richtung="unten">
                <div className="flex justify-between items-end mb-12 text-center md:text-left mx-auto max-w-7xl">
                    <div className="w-full">
                        <h2 id="projects-title" className="text-4xl md:text-5xl mb-4 font-extrabold text-fg uppercase tracking-tight">
                            {t.projekte.titel.split(" ")[0]} <span className="gradient-text">{t.projekte.titel.split(" ").slice(1).join(" ")}</span>
                        </h2>
                        <p className="text-muted text-lg font-medium max-w-2xl mx-auto md:mx-0">
                            {t.projekte.beschreibung}
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

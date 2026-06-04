import React, { useState } from 'react';
import { Database, Heart, Terminal } from 'lucide-react';
import ScrollEnthuellung from '../../components/ui/ScrollEnthuellung';
import SpotlightKarte from '../../components/ui/SpotlightKarte';
import ProjektModal, { Projekt } from '../../components/ui/ProjektModal';
import { benutzeSpracheSpeicher } from '@/speicher/spracheSpeicher';
import { uebersetzungen } from '../../data/uebersetzungen';

/**
 * Hilfskomponente für eine einzelne Projektkarte.
 * Verwendet die SpotlightKarte für 3D-Tilt und goldene Lichteffekte.
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
    const { sprache } = benutzeSpracheSpeicher();
    const t = uebersetzungen[sprache];

    return (
        <ScrollEnthuellung verzoegerung={index * 0.1}>
            <SpotlightKarte klasse="h-full border border-primary/20 bg-zinc-950/90 shadow-2xl transition-all duration-300">
                <article className="h-full flex flex-col justify-between p-6 min-h-[380px] select-none" role="group" aria-label={`Projekt: ${titel}`}>
                    <div className="flex flex-col gap-4">
                        <header className="flex justify-between items-start">
                            <span className="text-[9px] font-extrabold tracking-widest text-[#c5a880] uppercase px-2.5 py-1 rounded-md bg-[#c5a880]/10 border border-[#c5a880]/20">
                                {titel.includes('Mendix') ? t.projekte.typ.lowCode : t.projekte.typ.fullstack}
                            </span>
                            <div className="text-primary opacity-80">
                                {titel.includes('Mendix') ? <Database size={22} /> :
                                 titel.includes('LoveHub') ? <Heart size={22} className="text-[#cd7f32]" /> :
                                 <Terminal size={22} />}
                            </div>
                        </header>
                        
                        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mt-2">
                            {titel}
                        </h3>
                        
                        <p className="text-muted text-sm leading-relaxed font-medium line-clamp-4">
                            {beschreibung}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex flex-wrap gap-1.5">
                            {technologien.slice(0, 3).map(tech => (
                                <span key={tech} className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-muted">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        
                        <button
                            onClick={() => beiOeffnen({ titel, beschreibung, technologien, link, vertiefung, hervorgehoben })}
                            className="w-full py-2.5 rounded-2xl bg-[#c5a880] text-black font-extrabold text-xs tracking-wider uppercase hover:bg-white hover:shadow-lg transition-all active:scale-95 duration-300 cursor-pointer"
                        >
                            {t.projekte.buttons.details}
                        </button>
                    </div>
                </article>
            </SpotlightKarte>
        </ScrollEnthuellung>
    );
};

/**
 * Projekte - Die Galerie der ausgewählten Arbeiten als 3D-Hologramm-Karten.
 */
const Projekte: React.FC = () => {
    const [ausgewaehltesProjekt, setzeAusgewaehltesProjekt] = useState<Projekt | null>(null);
    const [istModalOffen, setzeIstModalOffen] = useState<boolean>(false);

    const { sprache } = benutzeSpracheSpeicher();
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
            vertiefung: "Social Network Logic & REST APIs",
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

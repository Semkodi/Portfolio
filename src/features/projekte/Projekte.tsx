import React, { useState } from 'react';
import { Database, Heart, Terminal, Shield, Trophy, Sword } from 'lucide-react';
import ScrollEnthuellung from '../../components/ui/ScrollEnthuellung';
import SpotlightKarte from '../../components/ui/SpotlightKarte';
import ProjektModal, { Projekt } from '../../components/ui/ProjektModal';
import { benutzeSpracheSpeicher } from '@/speicher/spracheSpeicher';
import { uebersetzungen } from '../../data/uebersetzungen';

/**
 * Hilfskomponente für eine einzelne Projekt-Questkarte (RPG-Quest-Style).
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
    const de = sprache === 'de';

    return (
        <ScrollEnthuellung verzoegerung={index * 0.1}>
            <SpotlightKarte klasse="h-full border border-primary/20 bg-zinc-950/95 shadow-2xl transition-all duration-300 group hover:border-[#cd7f32]/40">
                <article className="h-full flex flex-col justify-between p-7 min-h-[420px] select-none font-mono text-xs" role="group" aria-label={`Quest: ${titel}`}>
                    
                    {/* Header-Bereich */}
                    <div className="flex flex-col gap-3">
                        <header className="flex justify-between items-center text-[10px] text-muted border-b border-white/5 pb-2">
                            <span className="flex items-center gap-1.5 text-[#cd7f32] font-black uppercase tracking-widest">
                                <Sword size={12} className="animate-pulse" />
                                {de ? `QUEST // 0${index + 1}` : `QUEST // 0${index + 1}`}
                            </span>
                            <span className="text-primary font-bold opacity-60">
                                {titel.includes('Mendix') ? '[LOW-CODE]' : '[FULLSTACK]'}
                            </span>
                        </header>
                        
                        <h3 className="text-lg sm:text-xl font-black text-white leading-tight uppercase tracking-tight font-sans mt-2 group-hover:text-primary transition-colors">
                            {titel}
                        </h3>
                        
                        {/* Quest-Herausforderung */}
                        <div className="mt-2 space-y-1">
                            <span className="text-[9px] uppercase font-extrabold tracking-widest text-[#c5a880] block">
                                {de ? '➤ HERAUSFORDERUNG:' : '➤ CHALLENGE:'}
                            </span>
                            <p className="text-muted text-xs leading-relaxed font-sans font-medium line-clamp-4">
                                {beschreibung}
                            </p>
                        </div>
                    </div>

                    {/* Loot / Tech Stack */}
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="space-y-1.5">
                            <span className="text-[9px] uppercase font-extrabold tracking-widest text-[#cd7f32] flex items-center gap-1">
                                <Trophy size={10} />
                                {de ? 'LOOT (TECH STACK):' : 'LOOT (TECH STACK):'}
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {technologien.map(tech => (
                                    <span key={tech} className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-muted group-hover:border-[#c5a880]/20 transition-colors">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <button
                            onClick={() => beiOeffnen({ titel, beschreibung, technologien, link, vertiefung, hervorgehoben })}
                            className="w-full py-2.5 mt-2 rounded-2xl bg-zinc-900 text-[#c5a880] border border-[#c5a880]/30 font-extrabold text-[10px] tracking-wider uppercase hover:bg-[#c5a880] hover:text-black transition-all active:scale-95 duration-300 cursor-pointer flex items-center justify-center gap-2"
                        >
                            <Shield size={12} />
                            {de ? 'QUEST DETAILS' : 'QUEST DETAILS'}
                        </button>
                    </div>
                </article>
            </SpotlightKarte>
        </ScrollEnthuellung>
    );
};

/**
 * Projekte - Die Galerie der ausgewählten Arbeiten als RPG-Questboard.
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

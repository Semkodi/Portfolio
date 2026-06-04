import React from 'react';
import {
    SiReact, SiJavascript, SiTailwindcss, SiHtml5, SiCss3,
    SiSpringboot, SiNodedotjs, SiExpress, SiPython,
    SiPostgresql, SiMongodb, SiMariadb, SiMysql,
    SiGit, SiGithub, SiDocker
} from 'react-icons/si';
import { VscJson, VscCode } from 'react-icons/vsc';

/**
 * FliessbandSkills - Präsentiert Semirs technische Fähigkeiten als interaktives Fließband (Conveyor Belt).
 * Ersetzt das vorherige Orbiting-Circles-System ("die Bälle") durch ein horizontales Marquee auf einer Leiste.
 * Pausiert bei Hover und hebt das fokussierte Skill-Element mit Glanz- und Skalierungseffekten hervor.
 */
export const FliessbandSkills: React.FC = () => {
    // Vollständige Skill-Liste für das Fließband
    const skills = [
        { name: 'React', icon: <SiReact /> },
        { name: 'JavaScript', icon: <SiJavascript /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
        { name: 'HTML5', icon: <SiHtml5 /> },
        { name: 'CSS3', icon: <SiCss3 /> },
        { name: 'Java (Spring)', icon: <SiSpringboot /> },
        { name: 'Node.js', icon: <SiNodedotjs /> },
        { name: 'Express', icon: <SiExpress /> },
        { name: 'Python', icon: <SiPython /> },
        { name: 'PostgreSQL', icon: <SiPostgresql /> },
        { name: 'MongoDB', icon: <SiMongodb /> },
        { name: 'MariaDB', icon: <SiMariadb /> },
        { name: 'Docker', icon: <SiDocker /> },
        { name: 'Mendix', icon: <VscCode /> },
        { name: 'Git', icon: <SiGit /> },
        { name: 'REST APIs', icon: <VscJson /> }
    ];

    // Verdreifachen der Liste für einen absolut nahtlosen Endlos-Loop
    const verdoppelteSkills = [...skills, ...skills, ...skills];

    return (
        <div className="w-full max-w-7xl mx-auto py-6 overflow-hidden relative select-none">
            {/* Weicher Ein-/Ausblendeffekt an den Seiten */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

            {/* Die Leiste (Das Förderband-Gehäuse) */}
            <div className="relative border border-primary/20 bg-zinc-950/60 rounded-2xl py-5 px-6 backdrop-blur-sm overflow-hidden flex items-center shadow-[inset_0_0_25px_rgba(197,168,128,0.06)]">
                
                {/* Zierlinien oben und unten für Maschinen-Optik */}
                <div className="absolute inset-x-0 h-[1px] top-1.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 h-[1px] bottom-1.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />

                {/* Der laufende Riemen */}
                <div 
                    className="flex gap-6 animate-laufendes-band hover:[animation-play-state:paused]"
                    style={{
                        width: 'max-content',
                        animation: 'laufendes-band-anim 40s linear infinite'
                    }}
                >
                    {verdoppelteSkills.map((skill, index) => (
                        <div
                            key={`${skill.name}-${index}`}
                            className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-zinc-900/90 border border-[#c5a880]/10 text-fg hover:border-primary hover:text-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(197,168,128,0.15)] cursor-pointer group shrink-0"
                        >
                            <span className="text-2xl text-primary/70 group-hover:text-primary transition-colors duration-300">
                                {skill.icon}
                            </span>
                            <span className="text-xs font-bold font-mono tracking-wide">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes laufendes-band-anim {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.3333%); }
                }
            `}</style>
        </div>
    );
};

export default FliessbandSkills;

import React from 'react';
import { SiReact, SiSpringboot, SiPostgresql, SiDocker } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { benutzeSpracheSpeicher } from '@/speicher/spracheSpeicher';
import { benutzeMagicSpeicher } from '@/speicher/magicSpeicher';

/**
 * KreisendeSkills - Ein interaktiver Planetensimulator für Semirs Skills.
 * Rendert kreisende Icons um ein zentrales "DEV"-Element, wenn der Effekt aktiviert ist.
 */
export const KreisendeSkills: React.FC = () => {
    const { sprache } = benutzeSpracheSpeicher();
    const { kreisendeSkillsAktiv } = benutzeMagicSpeicher();

    if (!kreisendeSkillsAktiv) return null;

    // Technologien mit React-Icons
    const skills = [
        { name: 'React', icon: <SiReact className="text-[#c5a880]" /> },
        { name: 'Spring Boot', icon: <SiSpringboot className="text-[#c5a880]" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#c5a880]" /> },
        { name: 'Docker', icon: <SiDocker className="text-[#c5a880]" /> },
        { name: 'Mendix', icon: <VscCode className="text-[#c5a880]" /> }
    ];

    return (
        <div className="relative w-full max-w-[500px] h-[360px] mx-auto flex items-center justify-center overflow-hidden border border-primary/10 bg-zinc-950/45 rounded-3xl backdrop-blur-sm shadow-2xl">
            {/* Zentraler Node */}
            <div className="w-20 h-20 rounded-full bg-zinc-900 border border-primary flex items-center justify-center text-white z-10 shadow-[0_0_20px_rgba(197,168,128,0.3)] relative select-none">
                <span className="text-sm font-black font-mono tracking-wider text-primary">DEV</span>
                <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-25 pointer-events-none" />
            </div>

            {/* Umlaufbahn-Kreis */}
            <div className="absolute w-[240px] h-[240px] rounded-full border border-primary/10 pointer-events-none" />

            {/* Orbiting Icons Styles */}
            {skills.map((skill, index) => {
                const winkel = (index * 360) / skills.length;
                return (
                    <style key={skill.name}>{`
                        @keyframes orbit-animation-${index} {
                            from { transform: rotate(${winkel}deg) translateY(-120px) rotate(-${winkel}deg); }
                            to { transform: rotate(${winkel + 360}deg) translateY(-120px) rotate(-${winkel + 360}deg); }
                        }
                        .orbit-icon-item-${index} {
                            animation: orbit-animation-${index} 22s linear infinite;
                        }
                    `}</style>
                );
            })}

            {/* Orbiting Icons */}
            {skills.map((skill, index) => (
                <div
                    key={skill.name}
                    className={`absolute w-12 h-12 rounded-2xl bg-zinc-900/90 border border-primary/20 flex flex-col items-center justify-center shadow-lg hover:scale-110 hover:border-primary transition-all cursor-help group orbit-icon-item-${index}`}
                >
                    <span className="text-xl leading-none">{skill.icon}</span>
                    <div className="absolute bottom-14 scale-0 group-hover:scale-100 bg-zinc-950 border border-primary/30 px-2.5 py-1 rounded text-[10px] font-bold text-white transition-transform shadow-2xl font-mono whitespace-nowrap z-50">
                        {skill.name}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KreisendeSkills;

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Shield, Compass } from 'lucide-react';
import { benutzeKonzeptSpeicher, KonzeptTyp } from '@/speicher/konzeptSpeicher';
import { benutzeSpracheSpeicher } from '@/speicher/spracheSpeicher';

/**
 * KonzeptWaehler - Eine schwebende Leiste, um zwischen Konzept 1, 2 und 3 live umzuschalten.
 * Bietet dem Benutzer einen direkten Vergleich der unterschiedlichen Design-Effekte.
 */
const KonzeptWaehler: React.FC = () => {
    const { aktivesKonzept, setzeAktivesKonzept } = benutzeKonzeptSpeicher();
    const { sprache } = benutzeSpracheSpeicher();
    const de = sprache === 'de';

    const konzepte = [
        {
            id: 'konzept1' as KonzeptTyp,
            titel: de ? 'Konzept 1: 3D Hologramm' : 'Concept 1: 3D Hologramm',
            beschreibung: de ? '3D-Hintergrund & Tilt-Karten' : '3D Grid & Tilt Cards',
            icon: <Compass size={14} />
        },
        {
            id: 'konzept2' as KonzeptTyp,
            titel: de ? 'Konzept 2: RPG-Quest' : 'Concept 2: RPG Quest',
            beschreibung: de ? 'Projekte im Spiel-Design' : 'Projects in RPG Style',
            icon: <Shield size={14} />
        },
        {
            id: 'konzept3' as KonzeptTyp,
            titel: de ? 'Konzept 3: Morphing' : 'Concept 3: Morphing',
            beschreibung: de ? 'Morphing Story-Linien' : 'Morphing Timeline Art',
            icon: <Eye size={14} />
        }
    ];

    return (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-8 z-[999] w-[90%] max-w-2xl select-none">
            <div className="glass bg-zinc-950/90 border-primary/20 p-2.5 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-2xl justify-between items-center">
                
                {/* Titel links */}
                <div className="px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-muted/80 hidden md:block">
                    {de ? 'Design wählen:' : 'Select Design:'}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center">
                    {konzepte.map((k) => {
                        const istAktiv = aktivesKonzept === k.id;
                        return (
                            <button
                                key={k.id}
                                onClick={() => setzeAktivesKonzept(k.id)}
                                className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-left cursor-pointer transition-all duration-300 active:scale-95
                                    ${istAktiv 
                                        ? 'bg-primary text-black font-extrabold shadow-lg shadow-primary/10' 
                                        : 'bg-zinc-900/50 border border-zinc-800 text-muted hover:text-white hover:border-zinc-700'}`}
                                title={k.beschreibung}
                            >
                                {k.icon}
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-black tracking-wider leading-none">
                                        {k.titel.split(":")[0]}
                                    </span>
                                    <span className="text-[8px] opacity-70 font-sans font-medium mt-0.5 leading-none">
                                        {k.titel.split(":")[1]}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default KonzeptWaehler;

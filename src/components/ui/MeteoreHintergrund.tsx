import React, { useState, useEffect } from 'react';
import { benutzeMagicSpeicher } from '@/speicher/magicSpeicher';

interface MeteorSchnittstelle {
    id: number;
    top: string;
    left: string;
    verzoegerung: string;
    dauer: string;
}

/**
 * Erzeugt goldene Sternschnuppen, die diagonal durch den Hintergrund fliegen.
 * Wird nur gerendert, wenn der Effekt im Magic-Speicher aktiviert ist.
 */
export const MeteoreHintergrund: React.FC = () => {
    const { meteorHintergrundAktiv } = benutzeMagicSpeicher();
    const [meteore, setMeteore] = useState<MeteorSchnittstelle[]>([]);

    useEffect(() => {
        if (!meteorHintergrundAktiv) {
            setMeteore([]);
            return;
        }

        // Generiere 15 Sternschnuppen mit unterschiedlichen Positionen und Geschwindigkeiten
        const temporaereMeteore = Array.from({ length: 15 }).map((_, index) => ({
            id: index,
            top: Math.random() * -100 + 'px',
            left: Math.random() * 100 + '%',
            verzoegerung: Math.random() * 10 + 's',
            dauer: Math.random() * 4 + 3 + 's'
        }));
        setMeteore(temporaereMeteore);
    }, [meteorHintergrundAktiv]);

    if (!meteorHintergrundAktiv) return null;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
            {meteore.map((m) => (
                <span
                    key={m.id}
                    className="absolute h-0.5 w-0.5 bg-primary rounded-full animate-meteor"
                    style={{
                        top: m.top,
                        left: m.left,
                        animationDelay: m.verzoegerung,
                        animationDuration: m.dauer,
                    }}
                />
            ))}
            <style>{`
                @keyframes meteor-flug-global {
                    0% { 
                        transform: rotate(215deg) translateX(0); 
                        opacity: 1; 
                    }
                    70% { 
                        opacity: 1; 
                    }
                    100% { 
                        transform: rotate(215deg) translateX(-1000px); 
                        opacity: 0; 
                    }
                }
                .animate-meteor {
                    box-shadow: 0 0 0 1px rgba(197, 168, 128, 0.1), 
                                0 0 0 2px rgba(197, 168, 128, 0.2), 
                                0 0 12px rgba(197, 168, 128, 1);
                    animation-name: meteor-flug-global;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    will-change: transform, opacity;
                }
            `}</style>
        </div>
    );
};

export default MeteoreHintergrund;

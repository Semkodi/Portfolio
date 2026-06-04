import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { benutzeMagicSpeicher } from '@/speicher/magicSpeicher';

/**
 * Schnittstelle für Eigenschaften von GlitzerText.
 */
interface GlitzerTextProps {
    children: React.ReactNode;
    klasse?: string;
}

interface GlitzerStern {
    id: number;
    top: string;
    left: string;
    groesse: number;
}

/**
 * Erzeugt glitzernde, rotierende Sterne um den Text herum, wenn der Effekt im Magic-Speicher aktiviert ist.
 */
export const GlitzerText: React.FC<GlitzerTextProps> = ({ children, klasse = '' }) => {
    const { glitzerTextAktiv } = benutzeMagicSpeicher();
    const [sterne, setSterne] = useState<GlitzerStern[]>([]);

    useEffect(() => {
        if (!glitzerTextAktiv) {
            setSterne([]);
            return;
        }

        const intervall = setInterval(() => {
            const neuerStern: GlitzerStern = {
                id: Math.random(),
                top: Math.random() * 80 - 10 + '%',
                left: Math.random() * 100 + '%',
                groesse: Math.random() * 0.6 + 0.4
            };
            setSterne(vorherige => [...vorherige.slice(-3), neuerStern]); // Maximal 4 Sterne gleichzeitig
        }, 600);

        return () => clearInterval(intervall);
    }, [glitzerTextAktiv]);

    if (!glitzerTextAktiv) {
        return <span className={klasse}>{children}</span>;
    }

    return (
        <span className={`relative inline-block select-none ${klasse}`}>
            <span className="relative z-10">{children}</span>
            <AnimatePresence>
                {sterne.map((stern) => (
                    <motion.span
                        key={stern.id}
                        initial={{ opacity: 0, scale: 0, rotate: 0 }}
                        animate={{ 
                            opacity: [0, 1, 1, 0], 
                            scale: stern.groesse, 
                            rotate: [0, 180] 
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.0, ease: "easeInOut" }}
                        className="absolute text-amber-400 text-xs pointer-events-none"
                        style={{ top: stern.top, left: stern.left }}
                    >
                        ✦
                    </motion.span>
                ))}
            </AnimatePresence>
        </span>
    );
};

export default GlitzerText;

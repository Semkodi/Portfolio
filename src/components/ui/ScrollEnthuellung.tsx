import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

/**
 * Schnittstelle für die Eigenschaften der ScrollEnthuellung Komponente.
 */
interface ScrollEnthuellungProps {
    children: ReactNode;
    verzoegerung?: number;
    richtung?: 'oben' | 'unten' | 'links' | 'rechts';
    distanz?: number;
    dauer?: number;
}

/**
 * Eine hochwertige Wrapper-Komponente für elegante Einblend-Animationen beim Scrollen.
 */
const ScrollEnthuellung: React.FC<ScrollEnthuellungProps> = ({
    children: kinder,
    verzoegerung = 0,
    richtung = 'oben',
    distanz = 40,
    dauer = 0.8
}) => {

    // Definition der Framer-Motion Varianten für geschmeidige Übergänge
    const varianten: Variants = {
        versteckt: {
            opacity: 0,
            x: richtung === 'links' ? -distanz : richtung === 'rechts' ? distanz : 0,
            y: richtung === 'oben' ? distanz : richtung === 'unten' ? -distanz : 0,
            scale: 0.98
        },
        sichtbar: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: {
                delay: verzoegerung,
                duration: dauer,
                ease: [0.22, 1, 0.36, 1], // Cubic Bezier für Premium-Feeling
                type: 'spring',
                stiffness: 50,
                damping: 20
            }
        }
    };

    return (
        <motion.div
            initial="versteckt"
            whileInView="sichtbar"
            viewport={{ once: true, margin: "-100px" }}
            variants={varianten}
            style={{ width: '100%' }}
        >
            {kinder}
        </motion.div>
    );
};

export default ScrollEnthuellung;

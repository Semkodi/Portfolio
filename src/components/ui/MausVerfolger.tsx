import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MausVerfolger - Erzeugt einen interaktiven Cursor-Effekt und ein dynamisches Hintergrund-Leuchten.
 * Nutzt Feder-Animationen (Springs) für geschmeidige Verfolgungsbewegungen.
 */
const MausVerfolger: React.FC = () => {
    const [istAmHovern, setzeIstAmHovern] = useState<boolean>(false);

    // Initialisierung der Bewegungswerte
    const mausX = useMotionValue(-100);
    const mausY = useMotionValue(-100);
    const glimmenX = useMotionValue(-500);
    const glimmenY = useMotionValue(-500);

    // Konfiguration für sanfte, physikalisch wirkende Bewegungen
    const cursorFederKonfiguration = { damping: 25, stiffness: 400 };
    const cursorXFeder = useSpring(mausX, cursorFederKonfiguration);
    const cursorYFeder = useSpring(mausY, cursorFederKonfiguration);

    const glimmenFederKonfiguration = { damping: 50, stiffness: 100 };
    const glimmenXFeder = useSpring(glimmenX, glimmenFederKonfiguration);
    const glimmenYFeder = useSpring(glimmenY, glimmenFederKonfiguration);

    useEffect(() => {
        /**
         * Aktualisiert die Positionsdaten bei jeder Mausbewegung.
         */
        const bewegeMaus = (ereignis: MouseEvent) => {
            mausX.set(ereignis.clientX - 20);
            mausY.set(ereignis.clientY - 20);

            glimmenX.set(ereignis.clientX - 300);
            glimmenY.set(ereignis.clientY - 300);
        };

        /**
         * Erkennt interaktive Elemente unter dem Cursor zur visuellen Rückmeldung.
         */
        const verarbeiteMausUeber = (ereignis: MouseEvent) => {
            const ziel = ereignis.target as HTMLElement;
            if (ziel && ziel.closest && ziel.closest('a, button, .cursor-pointer, .glass, [role="button"]')) {
                setzeIstAmHovern(true);
            } else {
                setzeIstAmHovern(false);
            }
        };

        window.addEventListener("mousemove", bewegeMaus, { passive: true });
        window.addEventListener("mouseover", verarbeiteMausUeber, { passive: true });

        return () => {
            window.removeEventListener("mousemove", bewegeMaus);
            window.removeEventListener("mouseover", verarbeiteMausUeber);
        };
    }, [mausX, mausY, glimmenX, glimmenY]);

    return (
        <>
            {/* Hintergrund-Glow: Folgt der Maus dezent für mehr Atmosphäre */}
            <motion.div
                className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-[-5] opacity-20 hidden md:block"
                style={{
                    translateX: glimmenXFeder,
                    translateY: glimmenYFeder,
                    background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.1) 40%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
                aria-hidden="true"
            />

            {/* Custom Cursor: Äußerer Ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-primary/60 pointer-events-none z-[9999] hidden md:block"
                style={{
                    translateX: cursorXFeder,
                    translateY: cursorYFeder,
                    scale: istAmHovern ? 1.5 : 1,
                    backgroundColor: istAmHovern ? "rgba(99, 102, 241, 0.1)" : "transparent",
                }}
                aria-hidden="true"
            />

            {/* Custom Cursor: Innerer Punkt */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999] hidden md:block shadow-[0_0_15px_rgba(99,102,241,1)]"
                style={{
                    translateX: mausX,
                    translateY: mausY,
                    x: 16,
                    y: 16,
                    scale: istAmHovern ? 0.5 : 1,
                }}
                aria-hidden="true"
            />
        </>
    );
};

export default MausVerfolger;

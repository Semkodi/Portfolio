import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollFortschritt - Zeigt einen dezenten Fortschrittsbalken am oberen Bildschirmrand an.
 * Visualisiert, wie weit der Nutzer bereits durch die Seite gescrollt hat.
 */
const ScrollFortschritt: React.FC = () => {
    const { scrollYProgress } = useScroll();

    // Glättung des Fortschrittswerts durch eine Feder-Animation
    const skaliertesX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            {/* Top Bar - Standard von links nach rechts */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-secondary origin-left z-[99999] shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                style={{ scaleX: skaliertesX }}
                aria-hidden="true"
            />

            {/* Right Bar - Nur rechts, passend zum Ende der Top-Bar */}
            <motion.div
                className="fixed top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-purple-500 to-primary origin-top z-[99999] shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                style={{ scaleY: skaliertesX }}
                aria-hidden="true"
            />
        </>
    );
};

export default ScrollFortschritt;

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
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-[5000]"
            style={{ scaleX: skaliertesX }}
            aria-hidden="true"
        />
    );
};

export default ScrollFortschritt;

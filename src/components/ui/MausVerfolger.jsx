import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MausVerfolger = () => {
    // Speichert die aktuelle Mausposition (Startet außerhalb des Bildschirms bei -100)
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Konfiguration für die Feder-Animation (macht die Bewegung weich)
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Funktion, die bei jeder Mausbewegung aufgerufen wird
        const moveCursor = (e) => {
            // Zentriert den Kreis um den Mauszeiger (deshalb -16px Versatz)
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        // Event-Listener hinzufügen
        window.addEventListener("mousemove", moveCursor);
        // Aufräumen, wenn die Komponente entfernt wird
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <motion.div
            // CSS: Fixiert, rund, primär-Farbe, nur auf großen Bildschirmen (md:block)
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] hidden md:block"
            // Wendet die berechnete Feder-Position an
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        >
            <div className="w-full h-full bg-primary/20 rounded-full blur-sm"></div>
        </motion.div>
    );
};

export default MausVerfolger;

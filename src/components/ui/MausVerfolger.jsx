import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MausVerfolger = () => {
    const [isHovering, setIsHovering] = useState(false);

    // Positionen für den Cursor
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Positionen für den großen Hintergrund-Glow (langsamer)
    const glowX = useMotionValue(-500);
    const glowY = useMotionValue(-500);

    // Sanfte Federung für den Cursor
    const cursorSpringConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, cursorSpringConfig);
    const cursorYSpring = useSpring(cursorY, cursorSpringConfig);

    // Sehr sanfte Federung für den Hintergrund-Glow (langsamer für Tiefe)
    const glowSpringConfig = { damping: 50, stiffness: 100 };
    const glowXSpring = useSpring(glowX, glowSpringConfig);
    const glowYSpring = useSpring(glowY, glowSpringConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 20);
            cursorY.set(e.clientY - 20);

            glowX.set(e.clientX - 300); // 300 ist die Hälfte der Glow-Breite (600px)
            glowY.set(e.clientY - 300);
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, .cursor-pointer, .glass')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* 1. DER HINTERGRUND-GLOW (Living Background) */}
            <motion.div
                className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-[-5] opacity-20 hidden md:block"
                style={{
                    translateX: glowXSpring,
                    translateY: glowYSpring,
                    background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.1) 40%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
            />

            {/* 2. ÄUBERER RING DES CURSORS */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-primary/60 pointer-events-none z-[9999] hidden md:block"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgba(99, 102, 241, 0.1)" : "transparent",
                }}
            />

            {/* 3. INNERER PUNKT DES CURSORS */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999] hidden md:block shadow-[0_0_15px_rgba(99,102,241,1)]"
                style={{
                    translateX: cursorX.get() + 16, // Korrektur zum Zentrieren im Ring
                    translateY: cursorY.get() + 16,
                    scale: isHovering ? 0.5 : 1,
                }}
            />
        </>
    );
};

export default MausVerfolger;

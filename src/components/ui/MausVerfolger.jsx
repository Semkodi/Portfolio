import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MausVerfolger = () => {
    const [isHovering, setIsHovering] = useState(false);

    // Positionen für den äußeren Ring
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Positionen für den inneren Punkt (folgt direkt ohne Verzögerung)
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    // Sanfte Federung für den äußeren Ring
    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            // Äußerer Ring (mit Versatz zum Zentrieren)
            cursorX.set(e.clientX - 20);
            cursorY.set(e.clientY - 20);

            // Innerer Punkt
            dotX.set(e.clientX - 4);
            dotY.set(e.clientY - 4);
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
            {/* Äußerer Ring: Reagiert mit Vergrößerung beim Hover */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-primary/60 pointer-events-none z-[9999] hidden md:block"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgba(99, 102, 241, 0.1)" : "transparent",
                }}
            />

            {/* Innerer Punkt: Kleiner, präziser Glow */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999] hidden md:block"
                style={{
                    translateX: dotX,
                    translateY: dotY,
                    scale: isHovering ? 0.5 : 1,
                }}
            >
                <div className="absolute inset-0 bg-primary blur-sm rounded-full opacity-50 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
            </motion.div>
        </>
    );
};

export default MausVerfolger;

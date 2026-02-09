import { motion } from 'framer-motion';

// Erweiterte Wrapper-Komponente für elegante Scroll-Animationen
const ScrollEnthuellung = ({ children, delay = 0, direction = 'up', distance = 40, duration = 0.8 }) => {
    // Dynamische Offsets basierend auf der Richtung
    const variants = {
        hidden: {
            opacity: 0,
            x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
            y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
            scale: 0.98
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: {
                delay,
                duration,
                ease: [0.22, 1, 0.36, 1], // Custom Cubic Bezier für "Premium"-Gefühl
                type: 'spring',
                stiffness: 50,
                damping: 20
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
            style={{ width: '100%' }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollEnthuellung;

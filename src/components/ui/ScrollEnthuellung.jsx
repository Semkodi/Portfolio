import { motion } from 'framer-motion';

// Wrapper-Komponente, die Elemente beim Scrollen animiert
const ScrollEnthuellung = ({ children, delay = 0 }) => {
    return (
        <motion.div
            // Startzustand: Unsichtbar, etwas nach unten verschoben, leicht verkleinert
            initial={{ opacity: 0, y: 75, scale: 0.95 }}

            // Zielzustand wenn im Sichtfeld: Sichtbar, normale Position, normale Größe
            whileInView={{ opacity: 1, y: 0, scale: 1 }}

            // Einstellungen: Nur einmal animieren, Margin von -50px
            viewport={{ once: true, margin: "-50px" }}

            // Animations-Art: Federung, mit optionaler Verzögerung
            transition={{ duration: 0.5, delay, type: "spring", stiffness: 120, damping: 20 }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollEnthuellung;

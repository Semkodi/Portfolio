import React, { useState, useEffect } from 'react';

/**
 * Eigenschaften für die Schreibmaschine Komponente.
 */
interface SchreibmaschineProps {
    woerter: string[];
}

/**
 * Schreibmaschine - Erzeugt einen animierten Tipp-Effekt für Texte.
 * Wechselt zyklisch durch eine Liste von Wörtern und simuliert realistisches Tippverhalten.
 */
const Schreibmaschine: React.FC<SchreibmaschineProps> = ({ woerter }) => {
    const [woerterIndex, setzeWoerterIndex] = useState<number>(0);
    const [zeichenIndex, setzeZeichenIndex] = useState<number>(0);
    const [rueckwaerts, setzeRueckwaerts] = useState<boolean>(false);
    const [blinkt, setzeBlinkt] = useState<boolean>(true);

    // Steuerung des blinkenden Cursors
    useEffect(() => {
        const intervallID = setInterval(() => {
            setzeBlinkt((vorher) => !vorher);
        }, 530); // Leicht ungleiches Intervall für natürlicheres Blinken
        return () => clearInterval(intervallID);
    }, []);

    // Kern-Logik des Tipp- und Löschvorgangs
    useEffect(() => {
        // Pause am Ende eines Wortes, bevor gelöscht wird
        if (zeichenIndex === woerter[woerterIndex].length && !rueckwaerts) {
            const pauseTimeout = setTimeout(() => setzeRueckwaerts(true), 2000);
            return () => clearTimeout(pauseTimeout);
        }

        // Wechsel zum nächsten Wort, sobald das aktuelle gelöscht wurde
        if (zeichenIndex === 0 && rueckwaerts) {
            setzeRueckwaerts(false);
            setzeWoerterIndex((vorher) => (vorher + 1) % woerter.length);
            return;
        }

        // Berechnung der Tipp-Geschwindigkeit (zufälliger Versatz für Authentizität)
        const geschwindigkeit = rueckwaerts ? 50 : 100 + Math.random() * 50;

        const zeitlimit = setTimeout(() => {
            setzeZeichenIndex((vorher) => vorher + (rueckwaerts ? -1 : 1));
        }, geschwindigkeit);

        return () => clearTimeout(zeitlimit);
    }, [zeichenIndex, woerterIndex, rueckwaerts, woerter]);

    return (
        <span className="gradient-text inline-block min-w-[20px]" aria-live="polite">
            {woerter[woerterIndex].substring(0, zeichenIndex)}
            <span className={`${blinkt ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ml-1 text-primary`}>
                |
            </span>
        </span>
    );
};

export default Schreibmaschine;

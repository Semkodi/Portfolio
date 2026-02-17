import React, { useRef, useState, ReactNode } from 'react';

/**
 * Eigenschaften für die SpotlightKarte Komponente.
 */
interface SpotlightKarteProps {
    children: ReactNode;
    klasse?: string;
}

/**
 * SpotlightKarte - Erzeugt einen interaktiven Lichteffekt (Glow), der der Mausbewegung folgt.
 * Unterstützt sowohl Maus-Hover als auch Tastatur-Fokus für Barrierefreiheit.
 */
const SpotlightKarte: React.FC<SpotlightKarteProps> = ({ children: kinder, klasse = "" }) => {
    const divReferenz = useRef<HTMLDivElement>(null);
    const [istFokussiert, setzeIstFokussiert] = useState<boolean>(false);
    const [mausPosition, setzeMausPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [deckkraft, setzeDeckkraft] = useState<number>(0);

    /**
     * Berechnet die Mausposition relativ zum Karten-Container.
     */
    const verarbeiteMausbewegung = (ereignis: React.MouseEvent<HTMLDivElement>) => {
        if (!divReferenz.current) return;

        const element = divReferenz.current;
        const bereich = element.getBoundingClientRect();

        setzeMausPosition({
            x: ereignis.clientX - bereich.left,
            y: ereignis.clientY - bereich.top
        });
    };

    const verarbeiteFokus = () => {
        setzeIstFokussiert(true);
        setzeDeckkraft(1);
    };

    const verarbeiteFokusVerlust = () => {
        setzeIstFokussiert(false);
        setzeDeckkraft(0);
    };

    return (
        <div
            ref={divReferenz}
            onMouseMove={verarbeiteMausbewegung}
            onFocus={verarbeiteFokus}
            onBlur={verarbeiteFokusVerlust}
            onMouseEnter={() => setzeDeckkraft(1)}
            onMouseLeave={() => setzeDeckkraft(0)}
            className={`relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 transition-colors duration-500 ${klasse}`}
        >
            {/* Der Spotlight-Effekt: Ein radialer Gradient, der der Maus folgt */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity: deckkraft,
                    background: `radial-gradient(600px circle at ${mausPosition.x}px ${mausPosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`
                }}
                aria-hidden="true"
            />
            <div className="relative h-full">{kinder}</div>
        </div>
    );
};

export default SpotlightKarte;

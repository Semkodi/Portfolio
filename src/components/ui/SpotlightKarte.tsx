import React, { useRef, useState, ReactNode } from 'react';

/**
 * Eigenschaften für die SpotlightKarte Komponente.
 */
interface SpotlightKarteProps {
    children: ReactNode;
    klasse?: string;
}

/**
 * SpotlightKarte - Erzeugt einen interaktiven Lichteffekt (Glow) und einen plastischen 3D-Kippeffekt (Tilt),
 * der der Mausbewegung folgt. Unterstützt Hover und Fokus.
 */
const SpotlightKarte: React.FC<SpotlightKarteProps> = ({ children: kinder, klasse = "" }) => {
    const divReferenz = useRef<HTMLDivElement>(null);
    const [istFokussiert, setzeIstFokussiert] = useState<boolean>(false);
    const [mausPosition, setzeMausPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [rotation, setzeRotation] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [deckkraft, setzeDeckkraft] = useState<number>(0);

    /**
     * Berechnet die Mausposition und die Neigung relativ zum Mittelpunkt der Karte.
     */
    const verarbeiteMausbewegung = (ereignis: React.MouseEvent<HTMLDivElement>) => {
        if (!divReferenz.current) return;

        const element = divReferenz.current;
        const bereich = element.getBoundingClientRect();

        const x = ereignis.clientX - bereich.left;
        const y = ereignis.clientY - bereich.top;

        setzeMausPosition({ x, y });

        // Neigung berechnen (Mittelpunkt der Karte ist der Nullpunkt)
        const mitteX = bereich.width / 2;
        const mitteY = bereich.height / 2;
        
        // Begrenzung auf maximal 8 Grad Neigung für ein dezentes Gefühl
        const maxNeigung = 8;
        const kippX = -((y - mitteY) / mitteY) * maxNeigung;
        const kippY = ((x - mitteX) / mitteX) * maxNeigung;

        setzeRotation({ x: kippX, y: kippY });
    };

    const verarbeiteFokus = () => {
        setzeIstFokussiert(true);
        setzeDeckkraft(1);
    };

    const verarbeiteFokusVerlust = () => {
        setzeIstFokussiert(false);
        setzeDeckkraft(0);
        setzeRotation({ x: 0, y: 0 });
    };

    const verarbeiteMausVerlassen = () => {
        setzeDeckkraft(0);
        setzeRotation({ x: 0, y: 0 }); // Karte wieder flach legen
    };

    return (
        <div
            ref={divReferenz}
            onMouseMove={verarbeiteMausbewegung}
            onFocus={verarbeiteFokus}
            onBlur={verarbeiteFokusVerlust}
            onMouseEnter={() => setzeDeckkraft(1)}
            onMouseLeave={verarbeiteMausVerlassen}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: deckkraft === 0 ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                transformStyle: 'preserve-3d'
            }}
            className={`relative overflow-hidden rounded-xl border border-border bg-card spotlight-karte ${klasse}`}
        >
            {/* Goldener Spotlight-Effekt */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity: deckkraft,
                    background: `radial-gradient(600px circle at ${mausPosition.x}px ${mausPosition.y}px, rgba(0, 242, 254, 0.15), transparent 40%)`
                }}
                aria-hidden="true"
            />
            
            {/* Inhalt der Karte mit leichtem 3D-Z-Offset */}
            <div className="relative h-full" style={{ transform: 'translateZ(20px)' }}>
                {kinder}
            </div>
        </div>
    );
};

export default SpotlightKarte;

import React from 'react';

/**
 * Schnittstelle für Eigenschaften von LaserRahmen.
 */
interface LaserRahmenProps {
    radius?: number;
    geschwindigkeitS?: number;
    farbe?: string;
}

/**
 * Eine Komponente, die einen rotierenden Laserstrahl um die Kanten eines Elements zieht.
 */
export const LaserRahmen: React.FC<LaserRahmenProps> = ({
    radius = 20,
    geschwindigkeitS = 5,
    farbe = 'url(#laserGrad)'
}) => {
    return (
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] border border-transparent z-50">
            <svg className="absolute inset-0 w-full h-full rounded-[inherit]" fill="none">
                <defs>
                    <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--primary, #00f2fe)" />
                        <stop offset="100%" stopColor="var(--secondary, #ec4899)" />
                    </linearGradient>
                </defs>
                <rect
                    rx={radius}
                    className="w-full h-full"
                    strokeWidth="2"
                    strokeDasharray="120 380"
                    strokeDashoffset="0"
                    style={{
                        animation: `laser-rahmen-animation ${geschwindigkeitS}s linear infinite`,
                        stroke: farbe,
                    }}
                />
            </svg>
            <style>{`
                @keyframes laser-rahmen-animation {
                    0% { stroke-dashoffset: 500; }
                    100% { stroke-dashoffset: 0; }
                }
            `}</style>
        </div>
    );
};

export default LaserRahmen;


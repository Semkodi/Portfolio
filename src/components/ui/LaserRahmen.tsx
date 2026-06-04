import React from 'react';
import { benutzeMagicSpeicher } from '@/speicher/magicSpeicher';

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
 * Wird nur gerendert, wenn der Effekt im Magic-Speicher aktiviert ist.
 */
export const LaserRahmen: React.FC<LaserRahmenProps> = ({
    radius = 20,
    geschwindigkeitS = 5,
    farbe = '#c5a880'
}) => {
    const { laserRahmenAktiv } = benutzeMagicSpeicher();

    if (!laserRahmenAktiv) return null;

    return (
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] border border-transparent z-50">
            <svg className="absolute inset-0 w-full h-full rounded-[inherit]" fill="none">
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

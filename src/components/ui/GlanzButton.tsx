import React from 'react';
import { benutzeMagicSpeicher } from '@/speicher/magicSpeicher';

/**
 * Eigenschaften für den interaktiven GlanzButton.
 */
interface GlanzButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    href?: string;
    klasse?: string;
    typ?: 'button' | 'submit' | 'reset';
    ariaLabel?: string;
}

/**
 * Eine universelle Button-/Link-Komponente, die einen fließenden metallischen Lichtreflex zeigt,
 * wenn der GlanzButton-Effekt im Magic-Speicher aktiviert ist.
 */
export const GlanzButton: React.FC<GlanzButtonProps> = ({
    children,
    onClick,
    href,
    klasse = '',
    typ = 'button',
    ariaLabel
}) => {
    const { glanzButtonAktiv } = benutzeMagicSpeicher();

    // Dynamische Klassen für den glänzenden Button-Effekt
    const basisKlassen = glanzButtonAktiv
        ? `relative overflow-hidden group transition-all duration-300 active:scale-95 cursor-pointer shadow-lg ${klasse}`
        : `transition-all active:scale-95 cursor-pointer ${klasse}`;

    const inhalt = (
        <>
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
            {glanzButtonAktiv && (
                <span 
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none"
                    style={{ willChange: 'transform' }}
                />
            )}
        </>
    );

    if (href) {
        return (
            <a 
                href={href} 
                className={basisKlassen} 
                aria-label={ariaLabel} 
                onClick={(e) => onClick?.(e)}
            >
                {inhalt}
            </a>
        );
    }

    return (
        <button 
            type={typ} 
            onClick={(e) => onClick?.(e)} 
            className={basisKlassen} 
            aria-label={ariaLabel}
        >
            {inhalt}
        </button>
    );
};

export default GlanzButton;

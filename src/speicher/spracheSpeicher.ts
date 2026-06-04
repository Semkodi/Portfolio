import { create } from 'zustand';

export type Sprache = 'de' | 'en';

/**
 * Schnittstelle für den globalen Sprach-Zustand.
 */
interface SpracheZustand {
    sprache: Sprache;
    setzeSprache: (sprache: Sprache) => void;
    umschaltenSprache: () => void;
}

/**
 * Zustand-Speicher für die Internationalisierung (Deutsch/Englisch).
 */
export const benutzeSpracheSpeicher = create<SpracheZustand>((setze) => ({
    sprache: 'de', // Standardmäßig auf Deutsch
    setzeSprache: (sprache) => setze({ sprache }),
    umschaltenSprache: () => setze((zustand) => ({ 
        sprache: zustand.sprache === 'de' ? 'en' : 'de' 
    })),
}));

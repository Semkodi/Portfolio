import { create } from 'zustand';

export type KonzeptTyp = 'konzept1' | 'konzept2' | 'konzept3';

interface KonzeptZustand {
    aktivesKonzept: KonzeptTyp;
    setzeAktivesKonzept: (konzept: KonzeptTyp) => void;
}

/**
 * konzeptSpeicher - Verwaltet das aktuell ausgewählte Design-Konzept (1, 2 oder 3).
 * Ermöglicht dem Benutzer das einfache Umschalten zwischen den einzelnen Entwürfen.
 */
export const benutzeKonzeptSpeicher = create<KonzeptZustand>((set) => ({
    aktivesKonzept: 'konzept1',
    setzeAktivesKonzept: (konzept) => set({ aktivesKonzept: konzept }),
}));

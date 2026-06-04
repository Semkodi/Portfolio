import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Schnittstelle für den Zustand der Magic UI-Effekte.
 */
interface MagicZustand {
    laserRahmenAktiv: boolean;
    glanzButtonAktiv: boolean;
    kreisendeSkillsAktiv: boolean;
    meteorHintergrundAktiv: boolean;
    glitzerTextAktiv: boolean;
    setzeLaserRahmenAktiv: (aktiv: boolean) => void;
    setzeGlanzButtonAktiv: (aktiv: boolean) => void;
    setzeKreisendeSkillsAktiv: (aktiv: boolean) => void;
    setzeMeteorHintergrundAktiv: (aktiv: boolean) => void;
    setzeGlitzerTextAktiv: (aktiv: boolean) => void;
    alleAktivieren: () => void;
    alleDeaktivieren: () => void;
}

/**
 * Zustand-Speicher für die interaktiven Magic-UI Effekte.
 * Speichert den Aktivierungsstatus der Effekte im LocalStorage.
 */
export const benutzeMagicSpeicher = create<MagicZustand>()(
    persist(
        (setze) => ({
            laserRahmenAktiv: true,
            glanzButtonAktiv: true,
            kreisendeSkillsAktiv: true,
            meteorHintergrundAktiv: true,
            glitzerTextAktiv: true,
            setzeLaserRahmenAktiv: (aktiv) => setze({ laserRahmenAktiv: aktiv }),
            setzeGlanzButtonAktiv: (aktiv) => setze({ glanzButtonAktiv: aktiv }),
            setzeKreisendeSkillsAktiv: (aktiv) => setze({ kreisendeSkillsAktiv: aktiv }),
            setzeMeteorHintergrundAktiv: (aktiv) => setze({ meteorHintergrundAktiv: aktiv }),
            setzeGlitzerTextAktiv: (aktiv) => setze({ glitzerTextAktiv: aktiv }),
            alleAktivieren: () => setze({
                laserRahmenAktiv: true,
                glanzButtonAktiv: true,
                kreisendeSkillsAktiv: true,
                meteorHintergrundAktiv: true,
                glitzerTextAktiv: true,
            }),
            alleDeaktivieren: () => setze({
                laserRahmenAktiv: false,
                glanzButtonAktiv: false,
                kreisendeSkillsAktiv: false,
                meteorHintergrundAktiv: false,
                glitzerTextAktiv: false,
            }),
        }),
        {
            name: 'magic-speicher',
        }
    )
);

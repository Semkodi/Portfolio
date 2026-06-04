import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Schnittstelle für den Zustand der verbleibenden Magic UI-Effekte.
 */
interface MagicZustand {
    laserRahmenAktiv: boolean;
    glanzButtonAktiv: boolean;
    fliessbandSkillsAktiv: boolean;
    glitzerTextAktiv: boolean;
    setzeLaserRahmenAktiv: (aktiv: boolean) => void;
    setzeGlanzButtonAktiv: (aktiv: boolean) => void;
    setzeFliessbandSkillsAktiv: (aktiv: boolean) => void;
    setzeGlitzerTextAktiv: (aktiv: boolean) => void;
    alleAktivieren: () => void;
    alleDeaktivieren: () => void;
}

/**
 * Zustand-Speicher für die interaktiven Magic-UI Effekte.
 * Verwaltet die Zustände der aktiven Effekte im LocalStorage.
 */
export const benutzeMagicSpeicher = create<MagicZustand>()(
    persist(
        (setze) => ({
            laserRahmenAktiv: true,
            glanzButtonAktiv: true,
            fliessbandSkillsAktiv: true,
            glitzerTextAktiv: true,
            setzeLaserRahmenAktiv: (aktiv) => setze({ laserRahmenAktiv: aktiv }),
            setzeGlanzButtonAktiv: (aktiv) => setze({ glanzButtonAktiv: aktiv }),
            setzeFliessbandSkillsAktiv: (aktiv) => setze({ fliessbandSkillsAktiv: aktiv }),
            setzeGlitzerTextAktiv: (aktiv) => setze({ glitzerTextAktiv: aktiv }),
            alleAktivieren: () => setze({
                laserRahmenAktiv: true,
                glanzButtonAktiv: true,
                fliessbandSkillsAktiv: true,
                glitzerTextAktiv: true,
            }),
            alleDeaktivieren: () => setze({
                laserRahmenAktiv: false,
                glanzButtonAktiv: false,
                fliessbandSkillsAktiv: false,
                glitzerTextAktiv: false,
            }),
        }),
        {
            name: 'magic-speicher',
        }
    )
);

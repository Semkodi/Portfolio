import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Interface für das globale Theme-Management.
 */
interface ThemaZustand {
    istHell: boolean;
    umschalten: () => void;
}

/**
 * Zustand-Speicher für das Design-Thema (Hell/Dunkel).
 * Speichert die Auswahl dauerhaft im LocalStorage des Browsers.
 */
export const benutzeThemaSpeicher = create<ThemaZustand>()(
    persist(
        (setze) => ({
            istHell: false, // Standardmäßig Dark-Mode für Premium-Look
            umschalten: () => setze((zustand) => {
                const neuesIstHell = !zustand.istHell;

                // DOM-Manipulation für globale Tailwind-Thematisierungs-Unterstützung
                if (neuesIstHell) {
                    document.documentElement.classList.add('light');
                } else {
                    document.documentElement.classList.remove('light');
                }

                return { istHell: neuesIstHell };
            }),
        }),
        {
            name: 'thema-speicher',
        }
    )
);

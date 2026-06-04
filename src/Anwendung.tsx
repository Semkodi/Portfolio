import React, { useEffect } from 'react';
import ScrollFortschritt from './components/ui/ScrollFortschritt';
import Navigationsleiste from './components/layout/Navigationsleiste';
import Fusszeile from './components/layout/Fusszeile';
import Startbereich from './features/portfolio/Startbereich';
import InteraktivesTerminal from './features/terminal/InteraktivesTerminal';
import UeberMich from './features/portfolio/UeberMich';
import Faehigkeiten from './features/portfolio/Faehigkeiten';
import Projekte from './features/projekte/Projekte';
import Kontakt from './features/kontakt/Kontakt';
import Lebenslauf from './features/lebenslauf/Lebenslauf';
import PhysikHintergrund from './features/physik/PhysikHintergrund';
import SchaltkreisHintergrund from './components/ui/SchaltkreisHintergrund';
import { benutzeThemaSpeicher } from './speicher/themaSpeicher';

/**
 * Die Hauptkomponente der Anwendung, die alle Sektionen zusammenführt.
 */
const Anwendung: React.FC = () => {
    const { istHell } = benutzeThemaSpeicher();

    // Synchronisation des Farbmodus mit dem HTML-Root-Element für Tailwind-Klassen
    useEffect(() => {
        if (istHell) {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
    }, [istHell]);

    return (
        <div className="anwendung relative min-h-screen bg-bg text-fg selection:bg-primary/30">
            {/* Globale UI-Effekte */}
            <PhysikHintergrund />
            <SchaltkreisHintergrund />

            {/* Globale LED-Leuchtstäbe an den Seiten (Workstation-Atmosphäre aus dem Foto) */}
            <div 
                className="fixed left-6 top-1/2 -translate-y-1/2 w-1.5 h-[65vh] rounded-full bg-[#00f2fe] animate-led-cyan z-0 pointer-events-none hidden lg:block" 
                style={{ content: "''" }}
            />
            <div 
                className="fixed right-6 top-1/2 -translate-y-1/2 w-1.5 h-[65vh] rounded-full bg-[#ec4899] animate-led-pink z-0 pointer-events-none hidden lg:block" 
                style={{ content: "''" }}
            />

            {/* Navigation & Layout */}
            <Navigationsleiste />

            <main className="relative z-10">
                <section id="home">
                    <Startbereich />
                </section>

                <section id="terminal">
                    <InteraktivesTerminal />
                </section>

                <section id="ueber-mich">
                    <UeberMich />
                </section>

                <section id="skills">
                    <Faehigkeiten />
                </section>

                <section id="projekte">
                    <Projekte />
                </section>

                <section id="lebenslauf">
                    <Lebenslauf />
                </section>

                <section id="kontakt">
                    <Kontakt />
                </section>
            </main>

            <Fusszeile />
        </div>
    );
};

export default Anwendung;



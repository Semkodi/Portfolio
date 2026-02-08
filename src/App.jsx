import MausVerfolger from './components/ui/MausVerfolger';
import ScrollFortschritt from './components/ui/ScrollFortschritt';
import Navigationsleiste from './components/layout/Navigationsleiste';
import Fusszeile from './components/layout/Fusszeile';
import Startbereich from './components/sections/Startbereich';
import InteractiveTerminal from './components/ui/InteractiveTerminal';
import UeberMich from './components/sections/UeberMich';
import Faehigkeiten from './components/sections/Faehigkeiten';
import Projekte from './components/sections/Projekte';
import Kontakt from './components/sections/Kontakt';
import Lebenslauf from './components/sections/Lebenslauf';

const App = () => {
    return (
        <div className="app">
            {/* Globale UI-Effekte */}
            <MausVerfolger /> {/* Der leuchtende Kreis, der der Maus folgt */}
            <ScrollFortschritt /> {/* Der Ladebalken oben am Rand */}

            {/* Navigation */}
            <Navigationsleiste />

            {/* Hauptinhalt der Seite */}
            <main>
                <Startbereich /> {/* Hero-Sektion mit Begrüßung */}
                <InteractiveTerminal /> {/* Interaktives Terminal */}
                <UeberMich />    {/* Persönliche Vorstellung */}
                <Faehigkeiten /> {/* Skill-Gitter */}
                <Projekte />     {/* Projekt-Portfolio */}
                <Lebenslauf />    {/* Zeitachse des Werdegangs */}
                <Kontakt />      {/* Kontaktformular/Links */}
            </main>

            {/* Footer mit Impressum */}
            <Fusszeile />
        </div>
    );
};

export default App;

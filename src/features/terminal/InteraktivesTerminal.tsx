import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, HelpCircle } from 'lucide-react';

/**
 * Nachrichtentyps für den Verlauf des Terminals.
 */
interface Verlaufseintrag {
    typ: 'system' | 'nutzer' | 'bot';
    inhalt: string;
}

/**
 * InteraktivesTerminal - Simuliert eine Kommandozeile zur spielerischen Erkundung des Portfolios.
 * Unterstützt verschiedene Befehle und reagiert dynamisch auf Benutzereingaben.
 */
const InteraktivesTerminal: React.FC = () => {
    const [verlauf, setzeVerlauf] = useState<Verlaufseintrag[]>([
        { typ: 'system', inhalt: 'Semir OS [Version 1.0.0] wird geladen...' },
        { typ: 'system', inhalt: 'System-Check: Alle Module aktiv.' },
        { typ: 'system', inhalt: 'Willkommen im interaktiven Bereich. Tippe "hilfe", um zu sehen, was du tun kannst.' }
    ]);

    const [eingabe, setzeEingabe] = useState<string>('');
    const scrollReferenz = useRef<HTMLDivElement>(null);

    // Konfiguration der verfügbaren Terminal-Befehle
    const befehle: Record<string, string> = {
        hilfe: 'Verfügbare Befehle: wer, skills, kontakt, projekte, werdegang, clear',
        wer: 'Semir Borogovac - Angehender Fachinformatiker AE. Leidenschaft für moderne Web-Apps und effiziente Software.',
        skills: 'Frontend: React, JavaScript, Tailwind CSS | Backend: Java, Spring Boot, Node.js | Low-Code: Mendix Expert.',
        kontakt: 'E-Mail: borogovacsemir@gmail.com | Standort: Dornburg (Hessen) | Status: Bereit für neue Projekte.',
        projekte: 'Aktuelle Highlights: Mendix Business-Lösung, LoveHub Dating-Plattform, DevGram Dev-Netzwerk.',
        werdegang: 'Von der Baustellenleitung (Polier) zum Softwareentwickler. Ein Macher mit technischem Fokus.',
        clear: 'clear'
    };

    /**
     * Verarbeitet die Eingabe, wenn die Enter-Taste gedrückt wird.
     */
    const verarbeiteBefehl = (ereignis: React.KeyboardEvent<HTMLInputElement>) => {
        if (ereignis.key === 'Enter') {
            const befehlBereinigt = eingabe.toLowerCase().trim();
            let antwort = '';

            if (befehlBereinigt === 'clear') {
                setzeVerlauf([]);
            } else if (befehle[befehlBereinigt]) {
                antwort = befehle[befehlBereinigt];
                setzeVerlauf(vorher => [...vorher,
                { typ: 'nutzer', inhalt: `semir@portfolio:~$ ${eingabe}` },
                { typ: 'bot', inhalt: antwort }
                ]);
            } else if (befehlBereinigt !== '') {
                antwort = `Befahl "${befehlBereinigt}" nicht gefunden. Tippe "hilfe" für eine Liste aller Befehle.`;
                setzeVerlauf(vorher => [...vorher,
                { typ: 'nutzer', inhalt: `semir@portfolio:~$ ${eingabe}` },
                { typ: 'bot', inhalt: antwort }
                ]);
            }

            setzeEingabe('');
        }
    };

    // Automatisches Scrollen zum Ende bei neuen Nachrichten
    useEffect(() => {
        if (scrollReferenz.current) {
            scrollReferenz.current.scrollTop = scrollReferenz.current.scrollHeight;
        }
    }, [verlauf]);

    return (
        <section className="py-12 px-4" aria-labelledby="terminal-title">
            <div className="w-full max-w-3xl mx-auto font-mono text-sm shadow-2xl rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md">
                {/* Mimik einer Fenster-Kopfzeile */}
                <div className="px-4 py-3 flex justify-between items-center border-b border-white/10">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div id="terminal-title" className="text-muted flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                        <TerminalIcon size={14} className="text-primary" />
                        Interaktive Konsole
                    </div>
                    <div className="w-12" />
                </div>

                <div
                    ref={scrollReferenz}
                    className="bg-black/90 h-80 p-6 overflow-y-auto custom-scrollbar leading-relaxed"
                    onClick={() => document.getElementById('terminal-eingabe')?.focus()}
                >
                    {verlauf.map((zeile, index) => (
                        <div key={index} className={`mb-2 ${zeile.typ === 'nutzer' ? 'text-white' :
                                zeile.typ === 'system' ? 'text-muted italic opacity-70' :
                                    'text-gray-300'
                            }`}>
                            {zeile.inhalt}
                        </div>
                    ))}

                    <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">semir@portfolio:~$</span>
                        <input
                            id="terminal-eingabe"
                            type="text"
                            value={eingabe}
                            onChange={(ereignis) => setzeEingabe(ereignis.target.value)}
                            onKeyDown={verarbeiteBefehl}
                            style={{ color: 'white', caretColor: '#6366f1' }}
                            className="bg-transparent border-none outline-none flex-grow"
                            placeholder="tippe 'hilfe'..."
                            autoComplete="off"
                            aria-label="Terminal Eingabe"
                        />
                    </div>
                </div>

                <div className="bg-white/5 px-4 py-2 border-t border-white/10 text-[10px] text-muted flex items-center gap-2">
                    <HelpCircle size={12} />
                    <span>Tippe deine Befehle ein und drücke <b>Enter</b></span>
                </div>
            </div>
        </section>
    );
};

export default InteraktivesTerminal;

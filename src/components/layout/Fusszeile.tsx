import React, { useState } from 'react';
import { FileText, Shield } from 'lucide-react';
import RechtlichesModal from '../ui/RechtlichesModal';

/**
 * Fusszeile - Beinhaltet das Impressum, den Datenschutz und rechtliche Hinweise.
 * Nutzt Modals zur Anzeige der rechtlichen Texte, um den Lesefluss nicht zu unterbrechen.
 */
const Fusszeile: React.FC = () => {
    const [rechtlichesGeoeffnet, setzeRechtlichesGeoeffnet] = useState<string | null>(null);

    const impressumInhalt = `Angaben gemäß § 5 TMG
Semir Borogovac
Wirtshof 15
65599 Dornburg

Kontakt:
E-Mail: borogovacsemir@gmail.com`;

    const datenschutzInhalt = `Datenschutzerklärung
Verantwortlicher im Sinne der Datenschutzgesetze ist:
Semir Borogovac
Wirtshof 15
65599 Dornburg

1. Lokales Hosting & Schriftarten
Diese Webseite wird lokal gehostet. Alle Schriftarten (Google Fonts) werden lokal vom eigenen Server geladen. Es findet keine Verbindung zu Servern von Google statt.

2. Kontaktformular
Wenn Sie mir per E-Mail (mailto:) Anfragen zukommen lassen, werden Ihre Angaben aus der E-Mail inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei mir gespeichert. Diese Daten gebe ich nicht ohne Ihre Einwilligung weiter.

3. Cookies & Tracking
Diese Webseite verwendet keine Cookies und keine Analyse-Tools (wie Google Analytics). Es findet kein Tracking Ihres Nutzerverhaltens statt.`;

    return (
        <footer className="py-12 border-t border-white/10 text-center text-muted text-sm" role="contentinfo">
            <div className="flex justify-center gap-6 mb-6">
                <button
                    onClick={() => setzeRechtlichesGeoeffnet('impressum')}
                    className="hover:text-primary transition-colors flex items-center gap-2 bg-transparent border-none cursor-pointer text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-2"
                    aria-label="Impressum anzeigen"
                >
                    <FileText size={14} aria-hidden="true" /> Impressum
                </button>
                <button
                    onClick={() => setzeRechtlichesGeoeffnet('datenschutz')}
                    className="hover:text-primary transition-colors flex items-center gap-2 bg-transparent border-none cursor-pointer text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-2"
                    aria-label="Datenschutzerklärung anzeigen"
                >
                    <Shield size={14} aria-hidden="true" /> Datenschutz
                </button>
            </div>

            <p className="opacity-60 font-medium">
                &copy; {new Date().getFullYear()} Semir Borogovac. Alle Rechte vorbehalten.
            </p>

            {/* Rechtliche Modals */}
            <RechtlichesModal
                titel="Impressum"
                istOffen={rechtlichesGeoeffnet === 'impressum'}
                beiSchliessen={() => setzeRechtlichesGeoeffnet(null)}
                inhalt={impressumInhalt}
            />

            <RechtlichesModal
                titel="Datenschutzerklärung"
                istOffen={rechtlichesGeoeffnet === 'datenschutz'}
                beiSchliessen={() => setzeRechtlichesGeoeffnet(null)}
                inhalt={datenschutzInhalt}
            />
        </footer>
    );
};

export default Fusszeile;

import { useState } from 'react';
import { FileText, Shield } from 'lucide-react';
import RechtlichesModal from '../ui/RechtlichesModal';

const Fusszeile = () => {
    const [legalOpen, setLegalOpen] = useState(null); // 'impressum' oder 'datenschutz'

    const impressumText = `Angaben gemäß § 5 TMG
Semir Borogovac
Wirtshof 15
65599 Dornburg

Kontakt:
E-Mail: borogovacsemir@gmail.com`;

    const datenschutzText = `Datenschutzerklärung
Verantwortlicher im Sinne der Datenschutzgesetze ist:
Semir Borogovac
Wirtshof 15
65599 Dornburg

Erfassung allgemeiner Informationen:
Wenn Sie auf unsere Webseite zugreifen, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und ähnliches.`;

    return (
        <footer className="py-12 border-t border-gray-900 text-center text-muted text-sm">
            <div className="flex justify-center gap-6 mb-6">
                <button onClick={() => setLegalOpen('impressum')} className="hover:text-primary transition-colors flex items-center gap-2">
                    <FileText size={14} /> Impressum
                </button>
                <button onClick={() => setLegalOpen('datenschutz')} className="hover:text-primary transition-colors flex items-center gap-2">
                    <Shield size={14} /> Datenschutz
                </button>
            </div>
            <p>&copy; {new Date().getFullYear()} Semir Borogovac. Entwickelt mit ❤️.</p>

            <RechtlichesModal
                title="Impressum"
                isOpen={legalOpen === 'impressum'}
                onClose={() => setLegalOpen(null)}
                content={impressumText}
            />
            <RechtlichesModal
                title="Datenschutzerklärung"
                isOpen={legalOpen === 'datenschutz'}
                onClose={() => setLegalOpen(null)}
                content={datenschutzText}
            />
        </footer>
    );
};

export default Fusszeile;

import React from 'react';
import { X } from 'lucide-react';

/**
 * Eigenschaften für die RechtlichesModal Komponente.
 */
interface RechtlichesModalProps {
    titel: string;
    istOffen: boolean;
    beiSchliessen: () => void;
    inhalt: string;
}

/**
 * RechtlichesModal - Ein klassisches Modal zur Anzeige von statischen Rechtstexten.
 * Optimiert für Lesbarkeit und einfache Navigation.
 */
const RechtlichesModal: React.FC<RechtlichesModalProps> = ({ titel, istOffen, beiSchliessen, inhalt }) => {
    if (!istOffen) return null;

    return (
        <div
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
        >
            <div className="bg-slate-900 w-full max-w-2xl max-h-[80vh] flex flex-col rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                {/* Modal Header */}
                <header className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 z-10 bg-slate-900">
                    <h2 id="legal-modal-title" className="text-2xl font-bold gradient-text">{titel}</h2>
                    <button
                        onClick={beiSchliessen}
                        className="p-2 hover:bg-white/10 rounded-full transition-all text-muted hover:text-white bg-transparent border-none cursor-pointer active:scale-90"
                        aria-label="Modal schließen"
                    >
                        <X size={24} />
                    </button>
                </header>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto whitespace-pre-wrap text-muted text-sm leading-relaxed font-medium custom-scrollbar">
                    {inhalt}
                </div>
            </div>
        </div>
    );
};

export default RechtlichesModal;

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Terminal, Database, Heart, Code2 } from 'lucide-react';

/**
 * Definition der Projekt-Datenstruktur.
 */
export interface Projekt {
    titel: string;
    beschreibung: string;
    vertiefung?: string;
    technologien: string[];
    link: string;
    hervorgehoben?: boolean;
}

interface ProjektModalProps {
    istOffen: boolean;
    beiSchliessen: () => void;
    projekt: Projekt | null;
}

/**
 * ProjektModal - Detailansicht für ein ausgewähltes Projekt.
 * Bietet tiefergehende technische Einblicke und Links zum Quellcode bzw. zur Live-Demo.
 */
const ProjektModal: React.FC<ProjektModalProps> = ({ istOffen, beiSchliessen, projekt }) => {

    // Ermöglicht das Schließen des Modals mittels Escape-Taste
    useEffect(() => {
        const verarbeiteEscape = (ereignis: KeyboardEvent) => {
            if (ereignis.key === 'Escape') beiSchliessen();
        };
        window.addEventListener('keydown', verarbeiteEscape);
        return () => window.removeEventListener('keydown', verarbeiteEscape);
    }, [beiSchliessen]);

    if (!projekt) return null;

    const grundfarben = [
        'from-blue-500/20 to-indigo-500/20',
        'from-purple-500/20 to-pink-500/20',
        'from-emerald-500/20 to-teal-500/20'
    ];

    return (
        <AnimatePresence>
            {istOffen && (
                <div
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    {/* Backdrop mit Blur-Effekt */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={beiSchliessen}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl border border-white/10 bg-slate-900 overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={beiSchliessen}
                            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-white/20 transition-all duration-300 z-[1100] group text-white border border-white/20 shadow-xl cursor-pointer active:scale-90"
                            aria-label="Modal schließen"
                        >
                            <X size={20} className="group-hover:scale-110 transition-transform" />
                        </button>

                        <div className="overflow-y-auto w-full h-full custom-scrollbar">
                            <div className={`h-64 sm:h-72 bg-gradient-to-br ${grundfarben[0]} relative flex items-center justify-center overflow-hidden`}>
                                <div className="absolute inset-0 opacity-10 bg-grid-white/[0.2] bg-[size:40px_40px]" />

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl glass flex items-center justify-center border border-white/20 shadow-2xl relative z-10"
                                >
                                    {projekt.titel.includes('Mendix') ? <Database className="text-primary" size={40} /> :
                                        projekt.titel.includes('LoveHub') ? <Heart className="text-secondary" size={40} /> :
                                            <Terminal className="text-primary" size={40} />}
                                </motion.div>
                            </div>

                            <div className="p-8 sm:p-12 text-white">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                                    <header>
                                        <h2 id="modal-title" className="text-4xl sm:text-5xl font-extrabold mt-2 tracking-tighter uppercase">
                                            {projekt.titel}
                                        </h2>
                                    </header>
                                    <div className="flex gap-4">
                                        <a href={projekt.link} className="btn btn-primary flex items-center gap-2 active:scale-95 transition-all">
                                            <ExternalLink size={18} /> Projekt ansehen
                                        </a>
                                        <a href="#" className="btn btn-outline flex items-center gap-2 text-white active:scale-95 transition-all">
                                            <Github size={18} /> Code
                                        </a>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-2">
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <Code2 className="text-primary" size={24} /> Über das Projekt
                                        </h3>
                                        <p className="text-muted text-lg mb-8 leading-relaxed font-medium">
                                            {projekt.beschreibung}
                                        </p>

                                        {projekt.vertiefung && (
                                            <article className="p-6 rounded-2xl bg-primary/5 border border-primary/20 mb-8 shadow-inner">
                                                <h4 className="text-primary font-bold uppercase text-[10px] tracking-widest mb-3 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                                    Technische Details
                                                </h4>
                                                <p className="text-slate-200 leading-relaxed font-medium">
                                                    {projekt.vertiefung}
                                                </p>
                                            </article>
                                        )}

                                        <h3 className="text-xl font-bold mb-4">Besonderheiten</h3>
                                        <p className="text-muted leading-relaxed mb-8 font-medium">
                                            Dieses Projekt zeigt meinen Fokus auf sauberen Code und eine performante Umsetzung.
                                            Die Architektur wurde so gewählt, dass zukünftige Erweiterungen problemlos möglich sind.
                                        </p>
                                    </div>

                                    <aside className="space-y-8">
                                        <div>
                                            <h4 className="text-xs uppercase font-bold text-muted tracking-widest mb-4">Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {projekt.technologien.map(technologie => (
                                                    <span key={technologie} className="px-3 py-1.5 glass rounded-xl text-xs font-bold text-primary border border-primary/20">
                                                        {technologie}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-xs uppercase font-bold text-muted tracking-widest mb-4">Rolle</h4>
                                            <p className="text-white font-bold">Entwickler</p>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjektModal;

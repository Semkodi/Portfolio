import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Terminal, Database, Heart, Code2 } from 'lucide-react';
import { useEffect } from 'react';

const ProjektModal = ({ isOpen, onClose, project }) => {
    // Schließt das Modal bei ESC-Taste
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!project) return null;

    const gradients = [
        'from-blue-500/20 to-indigo-500/20',
        'from-purple-500/20 to-pink-500/20',
        'from-emerald-500/20 to-teal-500/20'
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content container with scroll */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-3xl max-h-[90vh] glass rounded-3xl shadow-2xl border border-white/10 bg-slate-900/90 text-fg flex flex-col overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* THE FIX: Close Button moved outside of the scrollable area to be ALWAYS visible */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2.5 rounded-full glass bg-black/40 hover:bg-white/20 transition-all duration-300 z-[1100] group text-white border border-white/20 shadow-xl"
                            aria-label="Close"
                        >
                            <X size={20} className="group-hover:scale-110 transition-transform" />
                        </button>

                        <div className="overflow-y-auto w-full h-full custom-scrollbar">
                            {/* Header Image/Gradient Area */}
                            <div className={`h-64 sm:h-72 bg-gradient-to-br ${gradients[0]} relative flex items-center justify-center overflow-hidden`}>
                                <div className="absolute inset-0 opacity-10 bg-grid-white/[0.2] bg-[size:40px_40px]"></div>

                                {/* Project Icon */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl glass flex items-center justify-center border border-white/20 shadow-2xl relative z-10"
                                >
                                    {project.title.includes('Mendix') ? <Database className="text-primary" size={40} /> :
                                        project.title.includes('LoveHub') ? <Heart className="text-secondary" size={40} /> :
                                            <Terminal className="text-primary" size={40} />}
                                </motion.div>
                            </div>

                            {/* Content Body */}
                            <div className="p-8 sm:p-12">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                                    <div>
                                        <h2 className="text-4xl sm:text-5xl font-extrabold mt-2 tracking-tighter">
                                            {project.title}
                                        </h2>
                                    </div>
                                    <div className="flex gap-4">
                                        <a href={project.link} className="btn btn-primary flex items-center gap-2">
                                            <ExternalLink size={18} /> Projekt ansehen
                                        </a>
                                        <a href="#" className="btn btn-outline flex items-center gap-2 text-white">
                                            <Github size={18} /> Code
                                        </a>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    {/* Left Column: Description & Insights */}
                                    <div className="lg:col-span-2">
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <Code2 className="text-primary" size={24} /> Über das Projekt
                                        </h3>
                                        <p className="text-muted text-lg mb-8 leading-relaxed font-medium">
                                            {project.desc}
                                        </p>

                                        {project.deepDive && (
                                            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 mb-8 shadow-inner">
                                                <h4 className="text-primary font-bold uppercase text-[10px] tracking-widest mb-3 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                                                    Technische Details
                                                </h4>
                                                <p className="text-fg leading-relaxed font-medium">
                                                    {project.deepDive}
                                                </p>
                                            </div>
                                        )}

                                        <h3 className="text-xl font-bold mb-4">Besonderheiten</h3>
                                        <p className="text-muted leading-relaxed mb-8">
                                            Dieses Projekt zeigt meinen Fokus auf sauberen Code und eine performante Umsetzung.
                                            Die Architektur wurde so gewählt, dass zukünftige Erweiterungen problemlos möglich sind.
                                        </p>
                                    </div>

                                    {/* Right Column: Tech Stack & Info */}
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-xs uppercase font-bold text-muted tracking-widest mb-4">Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map(t => (
                                                    <span key={t} className="px-3 py-1.5 glass rounded-xl text-xs font-bold text-primary border border-primary/20">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-xs uppercase font-bold text-muted tracking-widest mb-4">Rolle</h4>
                                            <p className="text-fg font-bold">Developer</p>
                                        </div>
                                    </div>
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

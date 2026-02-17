import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Sun, Moon } from 'lucide-react';
import { benutzeThemaSpeicher } from '../../speicher/themaSpeicher';

/**
 * Navigationsleiste - Das zentrale Steuerungselement am oberen Bildschirmrand.
 * Beinhaltet die Sektions-Navigation und den Theme-Toggle (Hell/Dunkel).
 */
const Navigationsleiste: React.FC = () => {
    const [beimScrollen, setzeBeimScrollen] = useState<boolean>(false);
    const [aktiveSektion, setzeAktiveSektion] = useState<string>('home');

    // Zugriff auf den globalen Theme-Speicher (Zustand)
    const { istHell, umschalten: umschalteThema } = benutzeThemaSpeicher();

    useEffect(() => {
        /**
         * Verarbeitet Scroll-Ereignisse zur visuellen Anpassung der Navigationsleiste
         * und zur Identifizierung der aktuell sichtbaren Sektion für Screen-Highlighting.
         */
        const verarbeiteScroll = () => {
            setzeBeimScrollen(window.scrollY > 50);

            // Bestimmung der aktiven Sektion basierend auf dem Viewport
            const sektionen = ['home', 'ueber-mich', 'skills', 'projekte', 'lebenslauf', 'kontakt'];
            const aktuelleSektionID = sektionen.find(sektion => {
                const element = document.getElementById(sektion);
                if (element) {
                    const bereich = element.getBoundingClientRect();
                    // Fokus-Schwelle bei 1/3 der Bildschirmhöhe für präziseres Highlighting
                    return bereich.top <= 200 && bereich.bottom >= 200;
                }
                return false;
            });
            if (aktuelleSektionID) setzeAktiveSektion(aktuelleSektionID);
        };

        window.addEventListener('scroll', verarbeiteScroll, { passive: true });
        return () => window.removeEventListener('scroll', verarbeiteScroll);
    }, []);

    const navigationsLinks = [
        { name: 'Home', link: '#home', id: 'home' },
        { name: 'Über Mich', link: '#ueber-mich', id: 'ueber-mich' },
        { name: 'Skills', link: '#skills', id: 'skills' },
        { name: 'Projekte', link: '#projekte', id: 'projekte' },
        { name: 'Werdegang', link: '#lebenslauf', id: 'lebenslauf' },
        { name: 'Kontakt', link: '#kontakt', id: 'kontakt' },
    ];

    return (
        <nav className="px-4 fixed top-0 left-0 w-full z-50">
            {/* Responsiver Nav-Container mit Glasmorphismus-Effekt */}
            <div className={`nav-content glass transition-all duration-500 mx-auto max-w-7xl flex justify-between items-center py-3 px-6 rounded-3xl mt-4 
                ${beimScrollen ? (istHell ? 'bg-white/80 shadow-lg' : 'bg-black/80 shadow-2xl') : ''}`}>

                <div className="flex items-center gap-4">
                    <a href="#home" className="logo font-bold text-xl uppercase tracking-tighter flex items-center gap-2 hover:opacity-80 transition-opacity" aria-label="Zur Startseite">
                        <Terminal size={20} className="text-primary" />
                        Semir<span className="gradient-text">Borogovac</span>
                    </a>
                </div>

                <div className="flex items-center gap-6">
                    {/* Desktop Navigation */}
                    <ul className="nav-links hidden md:flex items-center gap-6 list-none m-0 p-0">
                        {navigationsLinks.map((eintrag) => (
                            <li key={eintrag.id}>
                                <a
                                    href={eintrag.link}
                                    className={`text-[11px] font-bold uppercase tracking-wider transition-all duration-300 relative py-1 px-2
                                        ${aktiveSektion === eintrag.id ? 'text-primary' : 'hover:text-primary/70 text-muted'}`}
                                >
                                    {eintrag.name}
                                    {aktiveSektion === eintrag.id && (
                                        <motion.div
                                            layoutId="nav-unterstreichung"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_8px_rgba(99,102,241,0.3)]"
                                        />
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* High-End Theme-Schalter */}
                    <button
                        onClick={umschalteThema}
                        className={`glass px-3 py-1.5 rounded-xl transition-all duration-300 flex items-center justify-center text-muted hover:text-primary border cursor-pointer active:scale-90
                            ${istHell ? 'border-slate-300 hover:bg-slate-200/50' : 'border-white/10 hover:bg-white/10'}`}
                        aria-label={`In den ${istHell ? 'Dunkelmodus' : 'Hellmodus'} wechseln`}
                        title={istHell ? 'Dark Mode' : 'Light Mode'}
                    >
                        <motion.div
                            animate={{ rotate: istHell ? 360 : 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                            {istHell ? <Moon size={18} className="text-slate-700" /> : <Sun size={18} className="text-white" />}
                        </motion.div>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navigationsleiste;

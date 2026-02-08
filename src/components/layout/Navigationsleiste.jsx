import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Sun, Moon } from 'lucide-react';

const Navigationsleiste = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        // Theme beim Laden prüfen
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsLight(true);
            document.documentElement.classList.add('light');
        }
    }, []);

    const toggleTheme = () => {
        setIsLight(!isLight);
        if (!isLight) {
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Aktive Sektion erkennen
            const sections = ['home', 'about', 'projects', 'resume', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home', id: 'home' },
        { name: 'Über Mich', href: '#about', id: 'about' },
        { name: 'Projekte', href: '#projects', id: 'projects' },
        { name: 'Werdegang', href: '#resume', id: 'resume' },
        { name: 'Kontakt', href: '#contact', id: 'contact' },
    ];

    return (
        <nav className="px-4">
            <div className={`nav-content glass transition-all duration-500 ${scrolled ? (isLight ? 'scrolled bg-white/80 shadow-lg' : 'scrolled bg-black/80') : 'mt-4'}`}>
                <div className="flex items-center gap-4">
                    <div className="logo font-bold text-xl uppercase tracking-tighter flex items-center gap-2">
                        <Terminal size={20} className="text-primary" />
                        Semir<span className="gradient-text">Borogovac</span>
                    </div>

                    {/* Mechanical Toggle - Clean & Intuitive - Larger Version */}
                    <div className="flex items-center ml-8">
                        <button
                            onClick={toggleTheme}
                            className={`relative w-20 h-10 rounded-lg p-1.5 transition-all duration-500 shadow-inner border
                                ${isLight ? 'bg-slate-200 border-slate-300' : 'bg-slate-800 border-slate-700'}`}
                            aria-label="Toggle Theme"
                        >
                            <motion.div
                                animate={{ x: isLight ? 40 : 0 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className={`h-full w-8 rounded flex items-center justify-center shadow-lg z-10 relative
                                    ${isLight ? 'bg-slate-800 text-white' : 'bg-white text-amber-500'}`}
                            >
                                {/* Zeigt das Ziel-Icon an: Im Dunkeln die Sonne zum Einschalten, im Hellen den Mond */}
                                {isLight ? <Moon size={18} fill="currentColor" /> : <Sun size={18} fill="currentColor" />}
                            </motion.div>
                        </button>
                    </div>
                </div>

                <ul className="nav-links">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                href={link.href}
                                className={`text-sm font-medium transition-all duration-300 relative py-1 px-2
                                    ${activeSection === link.id ? 'text-primary' : 'hover:text-primary/70 text-muted'}`}
                            >
                                {link.name}
                                {activeSection === link.id && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                                    />
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigationsleiste;

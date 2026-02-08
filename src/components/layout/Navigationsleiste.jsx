import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const Navigationsleiste = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav>
            <div className={`nav-content glass ${scrolled ? 'scrolled' : ''}`}>
                <div className="logo font-bold text-xl uppercase tracking-tighter flex items-center gap-2">
                    <Terminal size={20} className="text-primary" />
                    Semir<span className="gradient-text">Borogovac</span>
                </div>
                <ul className="nav-links">
                    <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
                    <li><a href="#about" className="hover:text-primary transition-colors">Über Mich</a></li>
                    <li><a href="#projects" className="hover:text-primary transition-colors">Projekte</a></li>
                    <li><a href="#contact" className="hover:text-primary transition-colors">Kontakt</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigationsleiste;

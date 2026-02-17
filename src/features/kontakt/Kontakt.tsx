import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import ScrollEnthuellung from '../../components/ui/ScrollEnthuellung';
import { useSpracheStore } from '../../store/useSpracheStore';
import { uebersetzungen } from '../../data/uebersetzungen';

/**
 * Kontakt - Sektion mit Kontaktmöglichkeiten und sozialen Links.
 */
const Kontakt: React.FC = () => {
    const { sprache } = useSpracheStore();
    const t = uebersetzungen[sprache];

    return (
        <section className="text-center py-24 px-4" aria-labelledby="contact-title">
            <ScrollEnthuellung richtung="oben">
                <div className="glass p-6 sm:p-10 md:p-16 w-full max-w-3xl mx-auto rounded-3xl border-glass-border shadow-2xl relative z-10">
                    <h2 id="contact-title" className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight break-words text-fg">
                        {sprache === 'de' ? 'Lass uns ' : "Let's "} <br className="sm:hidden" />
                        <span className="gradient-text text-3xl sm:text-4xl md:text-5xl">
                            {sprache === 'de' ? 'zusammenarbeiten' : 'work together'}
                        </span>
                    </h2>

                    <p className="text-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">
                        {t.kontakt.text}
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6">
                        {/* E-Mail */}
                        <a
                            href="mailto:borogovacsemir@gmail.com"
                            className="flex items-center justify-center gap-3 glass px-8 py-4 rounded-xl hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all text-fg border border-glass-border active:scale-95"
                            aria-label="E-Mail senden an borogovacsemir@gmail.com"
                        >
                            <Mail className="text-primary" size={20} />
                            <span className="font-bold uppercase tracking-wider text-sm">E-Mail</span>
                        </a>

                        {/* GitHub */}
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 glass px-8 py-4 rounded-xl hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all text-fg border border-glass-border active:scale-95"
                            aria-label="GitHub Profil von Semir Borogovac besuchen"
                        >
                            <Github className="text-primary" size={20} />
                            <span className="font-bold uppercase tracking-wider text-sm">GitHub</span>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="#"
                            className="flex items-center justify-center gap-3 glass px-8 py-4 rounded-xl hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all text-fg border border-glass-border active:scale-95"
                            aria-label="LinkedIn Profil von Semir Borogovac besuchen"
                        >
                            <Linkedin className="text-primary" size={20} />
                            <span className="font-bold uppercase tracking-wider text-sm">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </ScrollEnthuellung>
        </section>
    );
};

export default Kontakt;

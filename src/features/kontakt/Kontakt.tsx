import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import ScrollEnthuellung from '../../components/ui/ScrollEnthuellung';
import GlitzerText from '../../components/ui/GlitzerText';
import GlanzButton from '../../components/ui/GlanzButton';
import { benutzeSpracheSpeicher } from '@/speicher/spracheSpeicher';
import { uebersetzungen } from '../../data/uebersetzungen';

/**
 * Kontakt - Sektion mit interaktivem Kontaktformular und sozialen Links.
 */
const Kontakt: React.FC = () => {
    const { sprache } = benutzeSpracheSpeicher();
    const t = uebersetzungen[sprache];

    // Formular-Zustände
    const [name, setzeName] = useState<string>('');
    const [betreff, setzeBetreff] = useState<string>('');
    const [nachricht, setzeNachricht] = useState<string>('');

    // Fehler-Zustände
    const [fehler, setzeFehler] = useState<{ name?: string; betreff?: string; nachricht?: string }>({});

    /**
     * Validiert die Formulareingaben und öffnet den Mail-Client.
     */
    const verarbeiteAbsenden = (ereignis: React.FormEvent) => {
        ereignis.preventDefault();
        const neueFehler: { name?: string; betreff?: string; nachricht?: string } = {};

        if (!name.trim()) neueFehler.name = t.kontakt.formular.fehlerName;
        if (!betreff.trim()) neueFehler.betreff = t.kontakt.formular.fehlerBetreff;
        if (!nachricht.trim()) neueFehler.nachricht = t.kontakt.formular.fehlerNachricht;

        if (Object.keys(neueFehler).length > 0) {
            setzeFehler(neueFehler);
            return;
        }

        setzeFehler({});

        // mailto Link generieren und öffnen
        const mailtoLink = `mailto:${t.kontakt.email}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(
            `Hallo Semir,\n\n${nachricht}\n\nViele Grüße,\n${name}`
        )}`;
        window.open(mailtoLink, '_self');
    };

    return (
        <section className="py-24 px-4" aria-labelledby="contact-title">
            <ScrollEnthuellung richtung="oben">
                <div className="glass p-6 sm:p-10 md:p-16 w-full max-w-3xl mx-auto rounded-3xl border-glass-border shadow-2xl relative z-10">
                    <h2 id="contact-title" className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight break-words text-fg text-center">
                        <GlitzerText>{sprache === 'de' ? 'Lass uns ' : "Let's "}</GlitzerText> <br className="sm:hidden" />
                        <span className="gradient-text text-3xl sm:text-4xl md:text-5xl">
                            {sprache === 'de' ? 'zusammenarbeiten' : 'work together'}
                        </span>
                    </h2>

                    <p className="text-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium text-center">
                        {t.kontakt.text}
                    </p>

                    {/* Interaktives Kontaktformular */}
                    <form onSubmit={verarbeiteAbsenden} className="flex flex-col gap-6 text-left w-full mb-12 max-w-xl mx-auto">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="form-name" className="text-xs font-bold uppercase tracking-wider text-muted px-1">
                                {t.kontakt.formular.name}
                            </label>
                            <input
                                id="form-name"
                                type="text"
                                value={name}
                                onChange={(e) => setzeName(e.target.value)}
                                className={`w-full glass px-4 py-3.5 rounded-xl border transition-all text-fg placeholder:text-muted/40 outline-none
                                    ${fehler.name ? 'border-red-500/80 focus:border-red-500' : 'border-glass-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20'}`}
                                placeholder={t.kontakt.formular.name}
                                autoComplete="name"
                                aria-invalid={!!fehler.name}
                                aria-describedby={fehler.name ? "error-name" : undefined}
                            />
                            {fehler.name && (
                                <span id="error-name" className="text-xs font-semibold text-red-500/90 px-1 mt-1">
                                    {fehler.name}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="form-betreff" className="text-xs font-bold uppercase tracking-wider text-muted px-1">
                                {t.kontakt.formular.betreff}
                            </label>
                            <input
                                id="form-betreff"
                                type="text"
                                value={betreff}
                                onChange={(e) => setzeBetreff(e.target.value)}
                                className={`w-full glass px-4 py-3.5 rounded-xl border transition-all text-fg placeholder:text-muted/40 outline-none
                                    ${fehler.betreff ? 'border-red-500/80 focus:border-red-500' : 'border-glass-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20'}`}
                                placeholder={t.kontakt.formular.betreff}
                                aria-invalid={!!fehler.betreff}
                                aria-describedby={fehler.betreff ? "error-betreff" : undefined}
                            />
                            {fehler.betreff && (
                                <span id="error-betreff" className="text-xs font-semibold text-red-500/90 px-1 mt-1">
                                    {fehler.betreff}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="form-nachricht" className="text-xs font-bold uppercase tracking-wider text-muted px-1">
                                {t.kontakt.formular.nachricht}
                            </label>
                            <textarea
                                id="form-nachricht"
                                rows={5}
                                value={nachricht}
                                onChange={(e) => setzeNachricht(e.target.value)}
                                className={`w-full glass px-4 py-3.5 rounded-xl border transition-all text-fg placeholder:text-muted/40 outline-none resize-none
                                    ${fehler.nachricht ? 'border-red-500/80 focus:border-red-500' : 'border-glass-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20'}`}
                                placeholder={t.kontakt.formular.nachricht}
                                aria-invalid={!!fehler.nachricht}
                                aria-describedby={fehler.nachricht ? "error-nachricht" : undefined}
                            />
                            {fehler.nachricht && (
                                <span id="error-nachricht" className="text-xs font-semibold text-red-500/90 px-1 mt-1">
                                    {fehler.nachricht}
                                </span>
                            )}
                        </div>

                        <GlanzButton
                            typ="submit"
                            klasse="btn btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-98 transition-all"
                        >
                            <Send size={18} />
                            <span>{t.kontakt.formular.senden}</span>
                        </GlanzButton>
                    </form>

                    <div className="w-full border-t border-glass-border my-8" aria-hidden="true" />

                    {/* Soziale Verknüpfungen */}
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6">
                        {/* GitHub */}
                        <GlanzButton
                            href="https://github.com/"
                            klasse="flex items-center justify-center gap-3 glass px-8 py-4 rounded-xl hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all text-fg border border-glass-border active:scale-95"
                            ariaLabel="GitHub Profil von Semir Borogovac besuchen"
                        >
                            <Github className="text-primary" size={20} />
                            <span className="font-bold uppercase tracking-wider text-sm">GitHub</span>
                        </GlanzButton>

                        {/* LinkedIn */}
                        <GlanzButton
                            href="#"
                            klasse="flex items-center justify-center gap-3 glass px-8 py-4 rounded-xl hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all text-fg border border-glass-border active:scale-95"
                            ariaLabel="LinkedIn Profil von Semir Borogovac besuchen"
                        >
                            <Linkedin className="text-primary" size={20} />
                            <span className="font-bold uppercase tracking-wider text-sm">LinkedIn</span>
                        </GlanzButton>
                    </div>
                </div>
            </ScrollEnthuellung>
        </section>
    );
};

export default Kontakt;


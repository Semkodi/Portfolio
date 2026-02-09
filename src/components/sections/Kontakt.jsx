import { Mail, Github, Linkedin } from 'lucide-react';
import ScrollEnthuellung from '../ui/ScrollEnthuellung';

const Kontakt = () => {
    return (
        <section id="contact" className="text-center">
            <ScrollEnthuellung>
                <div className="glass p-6 sm:p-10 md:p-16 w-full max-w-3xl mx-auto rounded-3xl border border-white/10 shadow-2xl">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight break-words">
                        Lass uns <br className="sm:hidden" />
                        <span className="gradient-text text-3xl sm:text-4xl md:text-5xl">zusammenarbeiten</span>
                    </h2>
                    <p className="text-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                        Ich bin immer offen für spannende Projekte, Kooperationen oder einfach einen Austausch über Technologie.
                    </p>
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6">
                        <a href="mailto:borogovacsemir@gmail.com" className="flex items-center justify-center gap-3 glass px-8 py-4 rounded-xl hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all text-fg">
                            <Mail className="text-primary" size={20} /> <span className="font-bold uppercase tracking-wider text-sm">E-Mail</span>
                        </a>
                        <a href="#" className="flex items-center justify-center gap-3 glass px-8 py-4 rounded-xl hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all text-fg">
                            <Github className="text-primary" size={20} /> <span className="font-bold uppercase tracking-wider text-sm">GitHub</span>
                        </a>
                        <a href="#" className="flex items-center justify-center gap-3 glass px-8 py-4 rounded-xl hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all text-fg">
                            <Linkedin className="text-primary" size={20} /> <span className="font-bold uppercase tracking-wider text-sm">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </ScrollEnthuellung>
        </section>
    );
};

export default Kontakt;

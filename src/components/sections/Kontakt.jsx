import { Mail, Github, Linkedin } from 'lucide-react';
import ScrollEnthuellung from '../ui/ScrollEnthuellung';

const Kontakt = () => {
    return (
        <section id="contact" className="text-center">
            <ScrollEnthuellung>
                <div className="glass p-12 max-w-3xl mx-auto">
                    <h2 className="text-4xl mb-6">Lass uns <span className="gradient-text">zusammenarbeiten</span></h2>
                    <p className="text-muted mb-10">
                        Ich bin immer offen für spannende Projekte, Kooperationen oder einfach einen Austausch über Technologie.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="mailto:borogovacsemir@gmail.com" className="flex items-center gap-3 glass px-6 py-4 hover:border-primary transition-all">
                            <Mail className="text-primary" /> <span>E-Mail</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 glass px-6 py-4 hover:border-primary transition-all">
                            <Github className="text-primary" /> <span>GitHub</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 glass px-6 py-4 hover:border-primary transition-all">
                            <Linkedin className="text-primary" /> <span>LinkedIn</span>
                        </a>
                    </div>
                </div>
            </ScrollEnthuellung>
        </section>
    );
};

export default Kontakt;

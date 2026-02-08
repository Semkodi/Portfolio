import { Code2, ExternalLink } from 'lucide-react';
import ScrollEnthuellung from '../ui/ScrollEnthuellung';
import SpotlightKarte from '../ui/SpotlightKarte';

const ProjektKarte = ({ title, desc, tech, link, deepDive, featured, i }) => (
    <ScrollEnthuellung delay={i * 0.1}>
        <SpotlightKarte className={`flex flex-col h-full ${featured ? 'border-primary/50 border-2' : ''}`}>
            <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden group">
                {/* Platzhalter für Projekt-Screenshot */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-muted text-sm group-hover:bg-black/40 transition-colors">
                    {featured ? "Hier Screenshot einfügen (z.B. Mendix UI)" : "Projekt Vorschau"}
                </div>
                <Code2 size={48} className="text-gray-700 relative z-10 group-hover:scale-110 transition-transform duration-500" />

                {/* Überlagerungsverlauf beim Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
            </div>
            <div className="p-6 flex-grow flex flex-col glass bg-transparent border-0 backdrop-blur-none">
                <h3 className="text-xl mb-2 flex items-center justify-between font-bold">
                    {title}
                    {featured && <span className="text-[10px] uppercase tracking-wider bg-primary/20 text-primary px-2 py-1 rounded border border-primary/20">Highlight</span>}
                </h3>
                <p className="text-muted text-sm mb-4 leading-relaxed">{desc}</p>

                {deepDive && (
                    <div className="mb-4 p-3 bg-white/5 rounded-lg border-l-2 border-primary">
                        <p className="text-xs text-muted italic">"{deepDive}"</p>
                    </div>
                )}

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {tech.map(t => (
                        <span key={t} className="text-[10px] uppercase font-bold px-2 py-1 bg-white/5 rounded-md text-gray-400 border border-white/10">
                            {t}
                        </span>
                    ))}
                </div>
                <a href={link} className="flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all group">
                    Zum Projekt <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </SpotlightKarte>
    </ScrollEnthuellung>
);

const Projekte = () => {
    const projects = [
        {
            title: "Mendix THM Projekt",
            desc: "Entwicklung einer umfangreichen Unternehmensanwendung im Rahmen des Studiums/der Umschulung.",
            deepDive: "Herausforderung: Integration komplexer Datenmodelle und Benutzerrollen. Lösung: Nutzung von Mendix Domain Models und Microflows zur Abbildung der Geschäftslogik.",
            tech: ["Mendix", "Java", "SQL", "XPath"],
            link: "#",
            featured: true
        },
        {
            title: "LoveHub Projekt",
            desc: "Eine Dating-Plattform mit Fokus auf Authentizität und Sicherheit. Modernes UI/UX Design.",
            deepDive: "Implementierung eines Echtzeit-Chats und Matching-Algorithmus.",
            tech: ["React", "Spring Boot", "PostgreSQL", "WebSocket"],
            link: "#"
        },
        {
            title: "DevGram",
            desc: "Ein soziales Netzwerk für Entwickler zum Teilen von Code-Snippets.",
            tech: ["Node.js", "Express", "MongoDB", "React"],
            link: "#"
        }
    ];

    return (
        <section id="projects">
            <ScrollEnthuellung>
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl mb-4">Ausgewählte <span className="gradient-text">Projekte</span></h2>
                        <p className="text-muted">Ein Einblick in meine bisherigen Arbeiten und Experimente.</p>
                    </div>
                </div>
            </ScrollEnthuellung>
            <div className="grid">
                {projects.map((p, i) => <ProjektKarte key={p.title} {...p} i={i} />)}
            </div>
        </section>
    );
};

export default Projekte;

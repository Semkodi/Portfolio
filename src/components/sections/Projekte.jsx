import { useState } from 'react';
import { Code2, ExternalLink, Database, Heart, Terminal } from 'lucide-react';
import ScrollEnthuellung from '../ui/ScrollEnthuellung';
import SpotlightKarte from '../ui/SpotlightKarte';
import ProjektModal from '../ui/ProjektModal';

const ProjektKarte = ({ title, desc, tech, link, deepDive, featured, i, onOpen }) => {
    // Sanfte Pastell-Farben für den Light Mode, kräftiger für Dark
    const gradients = [
        'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20',
        'from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20',
        'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20'
    ];

    return (
        <ScrollEnthuellung delay={i * 0.1}>
            <SpotlightKarte className={`flex flex-col h-full group border-[var(--border)] bg-[var(--card-bg)] shadow-sm hover:shadow-xl transition-all duration-500 ${featured ? 'ring-2 ring-primary/20' : ''}`}>
                <div className={`h-44 bg-gradient-to-br ${gradients[i % gradients.length]} flex flex-col items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-grid-black/[0.2] dark:bg-grid-white/[0.2] bg-[size:20px_20px]"></div>

                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/50 dark:border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                        {title.includes('Mendix') ? <Database className="text-primary" size={28} /> :
                            title.includes('LoveHub') ? <Heart className="text-secondary" size={28} /> :
                                <Terminal className="text-primary" size={28} />}
                    </div>

                    <div className="absolute inset-0 bg-white/20 dark:bg-transparent pointer-events-none"></div>
                </div>

                <div className="p-6 flex-grow flex flex-col items-center text-center">
                    <div className="mb-4 w-full">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-bold opacity-80">Development</span>
                        <h3 className="text-2xl font-extrabold tracking-tight text-fg mt-1 uppercase">
                            {title}
                        </h3>
                    </div>

                    <p className="text-muted text-sm mb-6 leading-relaxed line-clamp-3 font-medium">
                        {desc}
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mb-8 mt-auto">
                        {tech.map(t => (
                            <span key={t} className="text-[10px] uppercase font-bold px-2.5 py-1 bg-primary/5 dark:bg-white/5 text-muted rounded-lg border border-[var(--border)]">
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* DER RIESENGROßE BUTTON */}
                    {/* DER BUTTON IM ORIGINAL-STIL */}
                    <div className="w-full mt-6">
                        <button
                            onClick={() => onOpen({ title, desc, tech, link, deepDive })}
                            className="btn btn-primary w-full text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                        >
                            Projekt
                        </button>
                    </div>
                </div>
            </SpotlightKarte>
        </ScrollEnthuellung>
    );
};

const Projekte = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openProject = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

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
                        <h2 className="text-4xl mb-4 font-extrabold text-fg">Ausgewählte <span className="gradient-text">Projekte</span></h2>
                        <p className="text-muted font-medium">Ein Einblick in meine bisherigen Arbeiten und Experimente.</p>
                    </div>
                </div>
            </ScrollEnthuellung>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p, i) => (
                    <ProjektKarte key={p.title} {...p} i={i} onOpen={openProject} />
                ))}
            </div>

            <ProjektModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={selectedProject}
            />
        </section>
    );
};

export default Projekte;

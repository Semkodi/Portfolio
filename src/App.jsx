import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Code2,
    Database,
    Layout,
    Server,
    ChevronRight,
    Terminal,
    Cpu
} from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav>
            <div className={`nav-content glass ${scrolled ? 'scrolled' : ''}`}>
                <div className="logo font-bold text-xl uppercase tracking-tighter">
                    Dev<span className="gradient-text">Portfolio</span>
                </div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">Über Mich</a></li>
                    <li><a href="#projects">Projekte</a></li>
                    <li><a href="#contact">Kontakt</a></li>
                </ul>
            </div>
        </nav>
    );
};

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="px-4 py-1 glass rounded-full text-xs font-semibold uppercase tracking-widest text-primary mb-6 inline-block">
                    FIAE Umschüler in Ausbildung
                </span>
                <h1 className="text-5xl md:text-7xl mb-6">
                    Ich entwickle <br />
                    <span className="gradient-text">moderne Software</span>
                </h1>
                <p className="max-w-2xl mx-auto text-muted text-lg mb-10 text-pretty">
                    Leidenschaftlicher Full-Stack-Entwickler mit Fokus auf React, Node.js und sauberen Code.
                    Ich verwandle komplexe Probleme in simple, benutzerfreundliche Lösungen.
                </p>
                <div className="flex gap-4 justify-center">
                    <a href="#projects" className="btn btn-primary">Meine Projekte</a>
                    <a href="#contact" className="btn btn-outline">Kontakt aufnehmen</a>
                </div>
            </motion.div>
        </section>
    );
};

const About = () => {
    return (
        <section id="about">
            <div className="grid md:grid-cols-2 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl mb-6">Mein Weg als <span className="gradient-text">FIAE</span></h2>
                    <p className="text-muted mb-6">
                        Als Umschüler zum Fachinformatiker für Anwendungsentwicklung kombiniere ich meine bisherige Berufserfahrung mit modernsten Tech-Stacks.
                        Ich liebe es, neue Technologien zu lernen und diese in realen Projekten anzuwenden.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass p-4 text-center">
                            <h4 className="text-2xl font-bold gradient-text">Clean Code</h4>
                            <p className="text-xs text-muted uppercase">Priorität</p>
                        </div>
                        <div className="glass p-4 text-center">
                            <h4 className="text-2xl font-bold gradient-text">Lernbereit</h4>
                            <p className="text-xs text-muted uppercase">Mindset</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative flex justify-center"
                >
                    <div className="w-64 h-64 bg-primary rounded-full absolute -z-10 opacity-20 blur-3xl"></div>
                    <div className="relative group">
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 p-2 glass transition-all duration-700 group-hover:border-primary/50 group-hover:scale-[1.02]">
                            <img
                                src="/profile.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover object-center rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 -m-4 pointer-events-none"
                        ></motion.div>
                        <div className="absolute -bottom-2 -right-2 glass p-4 rounded-2xl shadow-xl">
                            <Terminal size={24} className="text-primary" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const Skills = () => {
    const skillCategories = [
        { name: 'Frontend', icon: <Layout />, list: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5/CSS3'] },
        { name: 'Backend', icon: <Server />, list: ['Node.js', 'Express', 'Java (Spring Boot)', 'Python'] },
        { name: 'Database', icon: <Database />, list: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL'] },
        { name: 'Tools', icon: <Cpu />, list: ['Git & GitHub', 'Docker', 'REST APIs', 'Vite'] },
    ];

    return (
        <section className="bg-opacity-50">
            <h2 className="text-3xl text-center mb-12">Meine <span className="gradient-text">Skills</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillCategories.map((cat, i) => (
                    <motion.div
                        key={cat.name}
                        className="glass p-6 hover:border-primary transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="text-primary mb-4">{cat.icon}</div>
                        <h3 className="text-xl mb-4">{cat.name}</h3>
                        <ul className="space-y-2">
                            {cat.list.map(skill => (
                                <li key={skill} className="text-muted flex items-center gap-2">
                                    <ChevronRight size={14} className="text-primary" /> {skill}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const ProjectCard = ({ title, desc, tech, link, i }) => (
    <motion.div
        className="glass overflow-hidden flex flex-col"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
    >
        <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-8 relative overflow-hidden group">
            <Code2 size={64} className="text-gray-700 transition-transform group-hover:scale-110 duration-500" />
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </div>
        <div className="p-6 flex-grow">
            <h3 className="text-xl mb-2">{title}</h3>
            <p className="text-muted text-sm mb-4">{desc}</p>
            <div className="flex flex-wrap gap-2 mb-6">
                {tech.map(t => (
                    <span key={t} className="text-[10px] uppercase font-bold px-2 py-1 bg-gray-800 rounded-md text-gray-400">
                        {t}
                    </span>
                ))}
            </div>
            <a href={link} className="flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all">
                Code ansehen <ExternalLink size={14} />
            </a>
        </div>
    </motion.div>
);

const Projects = () => {
    const projects = [
        {
            title: "LoveHub Project",
            desc: "Eine Dating-Plattform mit Fokus auf Authentizität und Sicherheit. Implementiert mit einem modernen Tech-Stack.",
            tech: ["React", "Spring Boot", "PostgreSQL"],
            link: "#"
        },
        {
            title: "DevGram",
            desc: "Ein soziales Netzwerk für Entwickler zum Teilen von Code-Snippets und Projekterfolgen.",
            tech: ["Node.js", "Express", "MongoDB"],
            link: "#"
        },
        {
            title: "E-Commerce API",
            desc: "Robustes Backend-System für Online-Shops mit Warenkorb, Zahlungsabwicklung und Bestandsverwaltung.",
            tech: ["Java", "Spring Boot", "MySQL"],
            link: "#"
        }
    ];

    return (
        <section id="projects">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl mb-4">Ausgewählte <span className="gradient-text">Projekte</span></h2>
                    <p className="text-muted">Ein Einblick in meine bisherigen Arbeiten und Experimente.</p>
                </div>
            </div>
            <div className="grid">
                {projects.map((p, i) => <ProjectCard key={p.title} {...p} i={i} />)}
            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <section id="contact" className="text-center">
            <div className="glass p-12 max-w-3xl mx-auto">
                <h2 className="text-4xl mb-6">Lass uns <span className="gradient-text">zusammenarbeiten</span></h2>
                <p className="text-muted mb-10">
                    Ich bin immer offen für spannende Projekte, Kooperationen oder einfach einen Austausch über Technologie.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <a href="mailto:deine@email.de" className="flex items-center gap-3 glass px-6 py-4 hover:border-primary transition-all">
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
        </section>
    );
};

const App = () => {
    return (
        <div className="app">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </main>
            <footer className="py-12 border-t border-gray-900 text-center text-muted text-sm">
                <p>&copy; {new Date().getFullYear()} [Semir Borogovac]. Entwickelt mit ❤️.</p>
            </footer>
        </div>
    );
};

export default App;

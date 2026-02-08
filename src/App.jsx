import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';
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
    Cpu,
    AppWindow,
    Shield,
    FileText,
    X,
    FolderGit2
} from 'lucide-react';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-modal"
            style={{ scaleX }}
        />
    );
};

const MouseFollower = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] hidden md:block"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        >
            <div className="w-full h-full bg-primary/20 rounded-full blur-sm"></div>
        </motion.div>
    );
};

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

const Typewriter = ({ words }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    // Blinking cursor
    useEffect(() => {
        const timeout2 = setInterval(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearInterval(timeout2);
    }, []);

    // Typing logic
    useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
            setReverse(true);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt(Math.random() * 350)));

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words]);

    return (
        <span className="gradient-text">
            {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
        </span>
    );
};

const RevealOnScroll = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 75, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay, type: "spring", stiffness: 120, damping: 20 }}
        >
            {children}
        </motion.div>
    );
};

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block"
                >
                    <span className="px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-6 inline-flex items-center gap-2 border border-primary/20 shadow-lg shadow-primary/10">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Open to Work
                    </span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl mb-6 font-extrabold tracking-tight">
                    Ich entwickle <br />
                    <Typewriter words={["moderne Web Apps", "Mendix Lösungen", "skalierbare APIs", "Java Software"]} />
                </h1>
                <p className="max-w-2xl mx-auto text-muted text-lg mb-10 text-pretty leading-relaxed">
                    Leidenschaftlicher Entwickler mit Fokus auf <b>Java</b>, <b>Web-Technologien</b> und <b>Mendix</b>.
                    Ich verwandle komplexe Anforderungen in effiziente, benutzerfreundliche Anwendungen.
                </p>
                <div className="flex gap-4 justify-center">
                    <a href="#projects" className="btn btn-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">Meine Projekte</a>
                    <a href="#contact" className="btn btn-outline hover:bg-white/5">Kontakt aufnehmen</a>
                </div>
            </motion.div>
        </section>
    );
};

const About = () => {
    return (
        <section id="about">
            <RevealOnScroll>
                <div className="grid md:grid-cols-2 items-center">
                    <div>
                        <h2 className="text-4xl mb-6">Mein Weg in die <span className="gradient-text">IT</span></h2>
                        <p className="text-muted mb-6">
                            Warum der Wechsel? Die Faszination daran, durch Code echte Probleme zu lösen und etwas zu erschaffen, hat mich zur Umschulung bewogen.
                        </p>
                        <p className="text-muted mb-6">
                            Als angehender Fachinformatiker liegt mein Fokus darauf, nicht nur Code zu schreiben, sondern nachhaltige Lösungen zu entwickeln.
                            Mein technisches Verständnis kombiniert mit meiner vorherigen Berufserfahrung hilft mir, Projekte ganzheitlich zu betrachten.
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
                    </div>
                    <div className="relative flex justify-center">
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
                    </div>
                </div>
            </RevealOnScroll>
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
            <RevealOnScroll>
                <h2 className="text-3xl text-center mb-12">Meine <span className="gradient-text">Skills</span></h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillCategories.map((cat, i) => (
                    <RevealOnScroll key={cat.name} delay={i * 0.1}>
                        <div className="glass p-6 hover:border-primary transition-colors h-full">
                            <div className="text-primary mb-4">{cat.icon}</div>
                            <h3 className="text-xl mb-4">{cat.name}</h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.list.map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-sm text-muted hover:bg-primary/20 hover:text-primary transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </section>
    );
};

const SpotlightCard = ({ children, className = "" }) => {
    const divRef = React.useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current || !isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/50 ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
};

const ProjectCard = ({ title, desc, tech, link, deepDive, featured, i }) => (
    <RevealOnScroll delay={i * 0.1}>
        <SpotlightCard className={`flex flex-col h-full ${featured ? 'border-primary/50 border-2' : ''}`}>
            <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden group">
                {/* Placeholder for Project Screenshot */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-muted text-sm group-hover:bg-black/40 transition-colors">
                    {featured ? "Hier Screenshot einfügen (z.B. Mendix UI)" : "Projekt Vorschau"}
                </div>
                <Code2 size={48} className="text-gray-700 relative z-10 group-hover:scale-110 transition-transform duration-500" />

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
            </div>
            <div className="p-6 flex-grow flex flex-col glass bg-transparent border-0 backdrop-blur-none">
                <h3 className="text-xl mb-2 flex items-center justify-between font-bold">
                    {title}
                    {featured && <span className="text-[10px] uppercase tracking-wider bg-primary/20 text-primary px-2 py-1 rounded border border-primary/20">Featured</span>}
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
        </SpotlightCard>
    </RevealOnScroll>
);

const Projects = () => {
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
            title: "LoveHub Project",
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
            <RevealOnScroll>
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl mb-4">Ausgewählte <span className="gradient-text">Projekte</span></h2>
                        <p className="text-muted">Ein Einblick in meine bisherigen Arbeiten und Experimente.</p>
                    </div>
                </div>
            </RevealOnScroll>
            <div className="grid">
                {projects.map((p, i) => <ProjectCard key={p.title} {...p} i={i} />)}
            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <section id="contact" className="text-center">
            <RevealOnScroll>
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
            </RevealOnScroll>
        </section>
    );
};

const App = () => {
    return (
        <div className="app">
            <MouseFollower />
            <ScrollProgress />
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

const LegalModal = ({ title, isOpen, onClose, content }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-modal-overlay backdrop-blur-sm">
            <div className="bg-modal-content w-full max-w-2xl max-h-80vh flex flex-col rounded-3xl border glass-border shadow-2xl relative">
                <div className="flex justify-between items-center p-6 border-b sticky top-0 z-10 bg-modal-content rounded-t-2xl">
                    <h2 className="text-2xl font-bold gradient-text">{title}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto whitespace-pre-wrap text-muted">
                    {content}
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    const [legalOpen, setLegalOpen] = useState(null); // 'impressum' or 'datenschutz'

    const impressumText = `Angaben gemäß § 5 TMG
Semir Borogovac
Wirtshof 15
65599 Dornburg

Kontakt:
E-Mail: borogovacsemir@gmail.com`;

    const datenschutzText = `Datenschutzerklärung
Verantwortlicher im Sinne der Datenschutzgesetze ist:
Semir Borogovac
Wirtshof 15
65599 Dornburg

Erfassung allgemeiner Informationen:
Wenn Sie auf unsere Webseite zugreifen, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und ähnliches.`;

    return (
        <footer className="py-12 border-t border-gray-900 text-center text-muted text-sm">
            <div className="flex justify-center gap-6 mb-6">
                <button onClick={() => setLegalOpen('impressum')} className="hover:text-primary transition-colors flex items-center gap-2">
                    <FileText size={14} /> Impressum
                </button>
                <button onClick={() => setLegalOpen('datenschutz')} className="hover:text-primary transition-colors flex items-center gap-2">
                    <Shield size={14} /> Datenschutz
                </button>
            </div>
            <p>&copy; {new Date().getFullYear()} Semir Borogovac. Entwickelt mit ❤️.</p>

            <LegalModal
                title="Impressum"
                isOpen={legalOpen === 'impressum'}
                onClose={() => setLegalOpen(null)}
                content={impressumText}
            />
            <LegalModal
                title="Datenschutzerklärung"
                isOpen={legalOpen === 'datenschutz'}
                onClose={() => setLegalOpen(null)}
                content={datenschutzText}
            />
        </footer>
    );
};

export default App;

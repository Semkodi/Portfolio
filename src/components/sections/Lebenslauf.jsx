import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, ChevronDown } from 'lucide-react';
import ScrollEnthuellung from '../ui/ScrollEnthuellung';
import SpotlightKarte from '../ui/SpotlightKarte';

const TimelineItem = ({ title, company, period, description, type, i }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ScrollEnthuellung delay={i * 0.1}>
            <div className="relative pl-12 pb-10 last:pb-0">
                {/* Verbindungslinie */}
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-transparent"></div>

                {/* Icon/Punkt mit Rotation */}
                <motion.div
                    animate={{ rotate: isOpen ? 360 : 0, scale: isOpen ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gray-900 border-2 border-primary flex items-center justify-center z-10 cursor-pointer shadow-lg shadow-primary/20"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {type === 'work' ? <Briefcase size={18} className="text-primary" /> : <GraduationCap size={18} className="text-primary" />}
                </motion.div>

                <SpotlightKarte
                    className={`transition-all duration-500 cursor-pointer overflow-visible ${isOpen ? 'ring-2 ring-primary/50 shadow-2xl shadow-primary/10' : ''}`}
                >
                    <div
                        className="p-6"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-grow">
                                <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                                    <h3 className="text-2xl font-bold text-fg tracking-tight">{title}</h3>
                                    <div className="flex items-center gap-2 text-primary text-sm font-mono bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                                        <Calendar size={14} />
                                        {period}
                                    </div>
                                </div>
                                <div className="text-secondary font-semibold text-lg">{company}</div>
                            </div>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.4, ease: "backOut" }}
                                className="text-muted bg-white/5 p-2 rounded-lg"
                            >
                                <ChevronDown size={24} />
                            </motion.div>
                        </div>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-6 mt-6 border-t border-white/10">
                                        <p className="text-muted text-lg leading-relaxed text-pretty">
                                            {description}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </SpotlightKarte>
            </div>
        </ScrollEnthuellung>
    );
};

const Lebenslauf = () => {
    const data = [
        {
            title: "Umschulung zum Fachinformatiker",
            company: "Institut für Bildung und Beruf, Hachenburg",
            period: "seit 02.2025",
            description: "Fokus auf Anwendungsentwicklung, Softwarearchitektur und moderne Programmiersprachen wie Java und JavaScript. Vertiefung in Web-Technologien und agile Entwicklungsprozesse.",
            type: "education"
        }
    ];

    return (
        <section id="resume" className="py-20">
            <ScrollEnthuellung direction="down">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-extrabold mb-6 tracking-tight">Mein <span className="gradient-text">Werdegang</span></h2>
                    <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
                        Ein interaktiver Überblick über meine Ausbildung und meinen Weg in die Softwareentwicklung. Klicke auf die Karten, um Details zu entdecken.
                    </p>
                </div>
            </ScrollEnthuellung>

            <div className="max-w-4xl mx-auto px-4">
                {data.map((item, i) => (
                    <TimelineItem key={i} {...item} i={i} />
                ))}
            </div>
        </section>
    );
};

export default Lebenslauf;

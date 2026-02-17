import React from 'react';
import { Layout, Server, Database, Cpu } from 'lucide-react';
import ScrollEnthuellung from '../../components/ui/ScrollEnthuellung';

/**
 * Definition der Datenstrukturen für technische Fähigkeiten.
 */
interface Faehigkeit {
    name: string;
    beherrschung: number;
}

interface FaehigkeitsKategorie {
    titel: string;
    bildmarke: React.ReactNode;
    liste: Faehigkeit[];
}

/**
 * Faehigkeiten - Präsentiert das technische Stack in ansprechenden, interaktiven Karten.
 * Nutzt eine 5-Punkte-Skala zur Visualisierung der Expertise.
 */
const Faehigkeiten: React.FC = () => {
    // Zentrales Daten-Array der technischen Kompetenzen
    const faehigkeitsKategorien: FaehigkeitsKategorie[] = [
        {
            titel: 'Frontend',
            bildmarke: <Layout />,
            liste: [
                { name: 'React', beherrschung: 5 },
                { name: 'JavaScript', beherrschung: 5 },
                { name: 'Tailwind CSS', beherrschung: 5 },
                { name: 'HTML5/CSS3', beherrschung: 4 }
            ]
        },
        {
            titel: 'Backend',
            bildmarke: <Server />,
            liste: [
                { name: 'Java (Spring)', beherrschung: 4 },
                { name: 'Node.js', beherrschung: 4 },
                { name: 'Express', beherrschung: 4 },
                { name: 'Python', beherrschung: 3 }
            ]
        },
        {
            titel: 'Datenbank',
            bildmarke: <Database />,
            liste: [
                { name: 'PostgreSQL', beherrschung: 4 },
                { name: 'MongoDB', beherrschung: 4 },
                { name: 'MariaDB', beherrschung: 5 },
                { name: 'SQL', beherrschung: 5 }
            ]
        },
        {
            titel: 'Low-Code & Tools',
            bildmarke: <Cpu />,
            liste: [
                { name: 'Mendix Expert', beherrschung: 5 },
                { name: 'Git & GitHub', beherrschung: 5 },
                { name: 'Docker', beherrschung: 3 },
                { name: 'REST APIs', beherrschung: 4 }
            ]
        },
    ];

    return (
        <section className="py-24 px-4 bg-opacity-50" aria-labelledby="skills-title">
            <ScrollEnthuellung richtung="unten">
                <div className="text-center mb-16">
                    <h2 id="skills-title" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 uppercase text-white">
                        Meine <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                        Ein technischer Überblick über meine Werkzeuge. Die Punkte zeigen meinen aktuellen Grad der Beherrschung in der Praxis.
                    </p>
                </div>
            </ScrollEnthuellung>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {faehigkeitsKategorien.map((kategorie, index) => (
                    <ScrollEnthuellung key={kategorie.titel} verzoegerung={index * 0.1} richtung="oben" distanz={50}>
                        <article className="glass p-8 rounded-[2rem] border border-white/10 hover:border-primary/50 transition-all duration-500 h-full group shadow-lg hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] hover:-translate-y-2">
                            {/* Visualisierung der Kategorie */}
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6 shadow-inner">
                                {kategorie.bildmarke}
                            </div>

                            <h3 className="text-2xl font-black mb-6 tracking-tight text-white">{kategorie.titel}</h3>

                            <div className="space-y-4">
                                {kategorie.liste.map(talent => (
                                    <div key={talent.name} className="group/element" aria-label={`${talent.name}: ${talent.beherrschung} von 5 Punkten`}>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-sm font-bold text-muted group-hover/element:text-primary transition-colors duration-300">
                                                {talent.name}
                                            </span>
                                            <div className="flex gap-1" aria-hidden="true">
                                                {[...Array(5)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i < talent.beherrschung ? 'bg-primary scale-110 shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'bg-white/10'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </ScrollEnthuellung>
                ))}
            </div>
        </section>
    );
};

export default Faehigkeiten;

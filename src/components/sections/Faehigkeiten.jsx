import { Layout, Server, Database, Cpu } from 'lucide-react';
import ScrollEnthuellung from '../ui/ScrollEnthuellung';

const Faehigkeiten = () => {
    const skillCategories = [
        {
            name: 'Frontend',
            icon: <Layout />,
            list: [
                { name: 'React', level: 5 },
                { name: 'JavaScript', level: 5 },
                { name: 'Tailwind CSS', level: 5 },
                { name: 'HTML5/CSS3', level: 4 }
            ]
        },
        {
            name: 'Backend',
            icon: <Server />,
            list: [
                { name: 'Java (Spring)', level: 4 },
                { name: 'Node.js', level: 4 },
                { name: 'Express', level: 4 },
                { name: 'Python', level: 3 }
            ]
        },
        {
            name: 'Database',
            icon: <Database />,
            list: [
                { name: 'PostgreSQL', level: 4 },
                { name: 'MongoDB', level: 4 },
                { name: 'MariaDB', level: 5 },
                { name: 'SQL', level: 5 }
            ]
        },
        {
            name: 'Low-Code & Tools',
            icon: <Cpu />,
            list: [
                { name: 'Mendix Expert', level: 5 },
                { name: 'Git & GitHub', level: 5 },
                { name: 'Docker', level: 3 },
                { name: 'REST APIs', level: 4 }
            ]
        },
    ];

    return (
        <section className="bg-opacity-50 py-10">
            <ScrollEnthuellung direction="down">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 uppercase">Meine <span className="gradient-text">Skills</span></h2>
                    <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
                        Ein technischer Überblick über meine Werkzeuge. Die Punkte zeigen meinen aktuellen Grad der Beherrschung in der Praxis.
                    </p>
                </div>
            </ScrollEnthuellung>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skillCategories.map((cat, i) => (
                    <ScrollEnthuellung key={cat.name} delay={i * 0.1} direction="up" distance={50}>
                        <div className="glass p-8 rounded-[2rem] border border-white/10 hover:border-primary/50 transition-all duration-500 h-full group shadow-lg hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] hover:-translate-y-2">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6 shadow-inner">
                                {cat.icon}
                            </div>
                            <h3 className="text-2xl font-black mb-6 tracking-tight text-fg">{cat.name}</h3>
                            <div className="space-y-4">
                                {cat.list.map(skill => (
                                    <div key={skill.name} className="group/item">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-sm font-bold text-muted group-hover/item:text-primary transition-colors duration-300">
                                                {skill.name}
                                            </span>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i < skill.level ? 'bg-primary scale-110 shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'bg-white/10'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollEnthuellung>
                ))}
            </div>
        </section>
    );
};

export default Faehigkeiten;

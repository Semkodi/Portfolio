import { Layout, Server, Database, Cpu } from 'lucide-react';
import ScrollEnthuellung from '../ui/ScrollEnthuellung';

const Faehigkeiten = () => {
    const skillCategories = [
        { name: 'Frontend', icon: <Layout />, list: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5/CSS3'] },
        { name: 'Backend', icon: <Server />, list: ['Node.js', 'Express', 'Java (Spring Boot)', 'Python'] },
        { name: 'Database', icon: <Database />, list: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL'] },
        { name: 'Tools', icon: <Cpu />, list: ['Git & GitHub', 'Docker', 'REST APIs', 'Vite'] },
    ];

    return (
        <section className="bg-opacity-50">
            <ScrollEnthuellung>
                <h2 className="text-3xl text-center mb-12">Meine <span className="gradient-text">Skills</span></h2>
            </ScrollEnthuellung>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillCategories.map((cat, i) => (
                    <ScrollEnthuellung key={cat.name} delay={i * 0.1}>
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
                    </ScrollEnthuellung>
                ))}
            </div>
        </section>
    );
};

export default Faehigkeiten;

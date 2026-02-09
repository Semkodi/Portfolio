import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import ScrollEnthuellung from '../ui/ScrollEnthuellung';

const UeberMich = () => {
    return (
        <section id="about">
            <ScrollEnthuellung>
                <div className="grid md:grid-cols-2 items-center">
                    <div>
                        <h2 className="text-4xl mb-6">Mein Weg in die <span className="gradient-text">IT</span></h2>
                        <p className="text-muted mb-6">
                            Warum der Wechsel? Die Faszination daran, durch Code echte Probleme zu lösen und etwas zu erschaffen, hat mich zur Umschulung bewogen.
                        </p>
                        <p className="text-muted mb-6">
                            Als Fachinformatiker liegt mein Fokus darauf, nicht nur Code zu schreiben, sondern nachhaltige Lösungen zu entwickeln.
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
            </ScrollEnthuellung>
        </section>
    );
};

export default UeberMich;

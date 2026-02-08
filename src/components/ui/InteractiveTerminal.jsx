import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, HelpCircle } from 'lucide-react';

const InteractiveTerminal = () => {
    const [history, setHistory] = useState([
        { type: 'system', content: 'Semir OS [Version 1.0.0] wird geladen...' },
        { type: 'system', content: 'System-Check: Alle Module aktiv.' },
        { type: 'system', content: 'Willkommen im interaktiven Bereich. Tippe "hilfe", um zu sehen, was du tun kannst.' }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    const commands = {
        hilfe: 'Verfügbare Befehle: wer, skills, kontakt, projekte, werdegang, clear',
        wer: 'Semir Borogovac - Angehender Fachinformatiker AE. Leidenschaft für moderne Web-Apps und effiziente Software.',
        skills: 'Frontend: React, JavaScript, Tailwind CSS | Backend: Java, Spring Boot, Node.js | Low-Code: Mendix Expert.',
        kontakt: 'E-Mail: borogovacsemir@gmail.com | Standort: Dornburg (Hessen) | Status: Bereit für neue Projekte.',
        projekte: 'Aktuelle Highlights: Mendix Business-Lösung, LoveHub Dating-Plattform, DevGram Dev-Netzwerk.',
        werdegang: 'Von der Baustellenleitung (Polier) zum Softwareentwickler. Ein Macher mit technischem Fokus.',
        clear: 'clear'
    };

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.toLowerCase().trim();
            let response = '';

            if (cmd === 'clear') {
                setHistory([]);
            } else if (commands[cmd]) {
                response = commands[cmd];
                setHistory(prev => [...prev, { type: 'user', content: `semir@portfolio:~$ ${input}` }, { type: 'bot', content: response }]);
            } else if (cmd !== '') {
                response = `Befehl "${cmd}" nicht gefunden. Tippe "hilfe" für eine Liste aller Befehle.`;
                setHistory(prev => [...prev, { type: 'user', content: `semir@portfolio:~$ ${input}` }, { type: 'bot', content: response }]);
            }

            setInput('');
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <section className="py-12 px-4">
            <div className="w-full max-w-3xl mx-auto font-mono text-sm shadow-2xl rounded-xl overflow-hidden border border-white/10 glass-effect">
                {/* Terminal Header */}
                <div className="bg-black/40 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-white/10">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-muted flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                        <TerminalIcon size={14} className="text-primary" />
                        Interaktive Konsole
                    </div>
                    <div className="w-12"></div>
                </div>

                {/* Terminal Body */}
                <div
                    ref={scrollRef}
                    className="bg-black/90 h-80 p-6 overflow-y-auto custom-scrollbar leading-relaxed"
                    onClick={() => document.getElementById('terminal-input').focus()}
                >
                    {history.map((line, i) => (
                        <div key={i} className={`mb-2 ${line.type === 'user' ? 'text-white' : line.type === 'system' ? 'text-muted italic opacity-70' : 'text-gray-300'}`}>
                            {line.content}
                        </div>
                    ))}
                    <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">semir@portfolio:~$</span>
                        <input
                            id="terminal-input"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleCommand}
                            style={{ color: 'white', caretColor: '#6366f1' }}
                            className="bg-transparent border-none outline-none flex-grow"
                            autoFocus
                            placeholder="tippe 'hilfe'..."
                        />
                    </div>
                </div>

                {/* Bedienungshinweis */}
                <div className="bg-white/5 px-4 py-2 border-t border-white/10 text-[10px] text-muted flex items-center gap-2">
                    <HelpCircle size={12} />
                    <span>Tippe deine Befehle ein und drücke <b>Enter</b></span>
                </div>
            </div>
        </section>
    );
};

export default InteractiveTerminal;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Settings2, CheckCircle2 } from 'lucide-react';
import { benutzeMagicSpeicher } from '@/speicher/magicSpeicher';
import { benutzeSpracheSpeicher } from '@/speicher/spracheSpeicher';

/**
 * MagicKonfigurator - Das interaktive Live-Effekt-Kontrollzentrum.
 * Erlaubt dem Benutzer, alle verbleibenden Magic UI-Effekte direkt auf der Live-Webseite zu testen.
 */
export const MagicKonfigurator: React.FC = () => {
    const { sprache } = benutzeSpracheSpeicher();
    const de = sprache === 'de';

    const {
        laserRahmenAktiv,
        glanzButtonAktiv,
        fliessbandSkillsAktiv,
        glitzerTextAktiv,
        setzeLaserRahmenAktiv,
        setzeGlanzButtonAktiv,
        setzeFliessbandSkillsAktiv,
        setzeGlitzerTextAktiv,
        alleAktivieren,
        alleDeaktivieren
    } = benutzeMagicSpeicher();

    const [istOffen, setIstOffen] = useState<boolean>(false);

    // Hilfsfunktion zum Rendern eines Toggles
    const rendereSchalter = (titel: string, beschreibung: string, wert: boolean, aendern: (w: boolean) => void) => (
        <label className="flex items-start justify-between gap-4 p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer select-none">
            <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    {wert && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                    {titel}
                </span>
                <span className="text-[10px] text-muted leading-tight font-medium font-sans max-w-[200px]">
                    {beschreibung}
                </span>
            </div>
            <div className="relative inline-flex items-center mt-1">
                <input 
                    type="checkbox" 
                    checked={wert} 
                    onChange={(e) => aendern(e.target.checked)} 
                    className="sr-only peer"
                />
                <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 peer-checked:after:bg-black after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary transition-colors" />
            </div>
        </label>
    );

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {istOffen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ duration: 0.2 }}
                        className="mb-3 w-80 glass bg-zinc-950/95 border border-primary/20 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 max-h-[80vh] overflow-y-auto select-none"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <Sparkles size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-sm font-black text-white tracking-wide uppercase">
                                        {de ? 'Effekt-Labor' : 'Effect Lab'}
                                    </h4>
                                    <span className="text-[9px] text-[#cd7f32] font-mono tracking-widest">MAGIC UI v1.1</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIstOffen(false)}
                                className="w-6 h-6 rounded-full border border-white/5 flex items-center justify-center text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                                aria-label="Schließen"
                            >
                                <X size={12} />
                            </button>
                        </div>

                        {/* Toggles */}
                        <div className="flex flex-col gap-1.5 py-1">
                            {rendereSchalter(
                                de ? '⚡ Glow-Rahmen' : '⚡ Glow Border',
                                de ? 'Border Beam um Projektkarten für futuristischen Look.' : 'Border beam around project cards for a futuristic look.',
                                laserRahmenAktiv,
                                setzeLaserRahmenAktiv
                            )}
                            {rendereSchalter(
                                de ? '💎 Glänzende Buttons' : '💎 Shiny Buttons',
                                de ? 'Metallischer Lichtschimmer auf allen Haupt-Buttons.' : 'Metallic light sweep on all main action buttons.',
                                glanzButtonAktiv,
                                setzeGlanzButtonAktiv
                            )}
                            {rendereSchalter(
                                de ? '⚙️ Skill-Fließband' : '⚙️ Skill Conveyor',
                                de ? 'Fließband-Förderer für Core-Technologien im Skillbereich.' : 'Conveyor belt for core technologies in skills section.',
                                fliessbandSkillsAktiv,
                                setzeFliessbandSkillsAktiv
                            )}
                            {rendereSchalter(
                                de ? '✨ Glitzer-Text' : '✨ Sparkle Text',
                                de ? 'Glitzernde Sterne heben die Sektions-Überschriften hervor.' : 'Sparkling stars highlighting section titles.',
                                glitzerTextAktiv,
                                setzeGlitzerTextAktiv
                            )}
                        </div>

                        {/* Controls */}
                        <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
                            <button
                                onClick={alleDeaktivieren}
                                className="py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-muted hover:text-white transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
                            >
                                {de ? 'Alle aus' : 'All off'}
                            </button>
                            <button
                                onClick={alleAktivieren}
                                className="py-2 rounded-xl bg-primary text-black text-[10px] font-black hover:bg-white hover:shadow-lg transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
                            >
                                {de ? 'Alle an' : 'All on'}
                            </button>
                        </div>

                        {/* Info Note */}
                        <div className="bg-[#c5a880]/5 border border-[#c5a880]/15 rounded-2xl p-2.5 flex items-start gap-2">
                            <CheckCircle2 size={12} className="text-primary mt-0.5 shrink-0" />
                            <p className="text-[9px] text-[#c5a880] leading-normal font-sans font-medium">
                                {de 
                                    ? 'Scrolle über die Seite, um die Effekte live zu vergleichen. Sag mir danach, welche davon dauerhaft bleiben sollen!'
                                    : 'Scroll the page to compare effects live. Let me know afterwards which ones should stay permanently!'}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Schwebender Button */}
            <motion.button
                onClick={() => setIstOffen(!istOffen)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-black shadow-lg cursor-pointer transition-all active:scale-90 hover:scale-105 z-50
                    ${istOffen 
                        ? 'bg-white shadow-white/10' 
                        : 'bg-primary shadow-primary/20 hover:shadow-primary/40 animate-pulse'}`}
                layout
                aria-label="Effektkonfigurator öffnen"
            >
                {istOffen ? <X size={20} /> : <Settings2 size={20} />}
            </motion.button>
        </div>
    );
};

export default MagicKonfigurator;


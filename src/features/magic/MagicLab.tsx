import React from 'react';
import { benutzeSpracheSpeicher } from '@/speicher/spracheSpeicher';
import { benutzeMagicSpeicher } from '@/speicher/magicSpeicher';
import LaserRahmen from '../../components/ui/LaserRahmen';
import GlanzButton from '../../components/ui/GlanzButton';
import FliessbandSkills from '../../components/ui/FliessbandSkills';
import GlitzerText from '../../components/ui/GlitzerText';

/**
 * MagicLab - Das interaktive Live-Labor.
 * Zeigt Demonstrationskarten für die verschiedenen Magic UI Effekte an,
 * die direkt mit dem globalen Zustand synchronisiert sind.
 */
export const MagicLab: React.FC = () => {
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
        setzeGlitzerTextAktiv
    } = benutzeMagicSpeicher();

    return (
        <section className="py-24 px-4 border-t border-white/5 bg-zinc-950/40 relative overflow-hidden" id="magic-lab">
            <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
                {/* Header */}
                <div className="text-center mx-auto max-w-3xl select-none">
                    <h2 className="text-3xl md:text-4xl mb-4 font-extrabold text-white uppercase tracking-tight">
                        ✨ MAGIC <GlitzerText>UI LAB</GlitzerText>
                    </h2>
                    <p className="text-muted text-base font-medium">
                        {de 
                            ? 'Willkommen im Test-Labor! Hier sind alle verbleibenden Magic UI Effekte live. Klicke dich durch und sag mir, was du davon hältst.'
                            : 'Welcome to the Test Lab! Here are all remaining Magic UI effects live. Test them out and let me know what you think.'}
                    </p>
                </div>

                {/* Grid der Effekte (1 Reihe für alle 3 verbleibenden Effekte) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Effekt A: Border Beam */}
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center px-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#cd7f32] font-bold">
                                EFFEKT 01 // BORDER BEAM
                            </span>
                            <button
                                onClick={() => setzeLaserRahmenAktiv(!laserRahmenAktiv)}
                                className={`text-[10px] font-bold tracking-widest uppercase hover:underline cursor-pointer transition-colors ${laserRahmenAktiv ? 'text-[#c5a880]' : 'text-zinc-600'}`}
                            >
                                {laserRahmenAktiv ? (de ? 'Deaktivieren' : 'Disable') : (de ? 'Aktivieren' : 'Enable')}
                            </button>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden min-h-[220px]">
                            {/* Die Testkarte */}
                            <div className="absolute inset-0 glass bg-zinc-950 p-6 flex flex-col justify-between border border-white/5 h-full">
                                <div className="space-y-2">
                                    <h4 className="text-lg font-bold text-white">Laser-Glow Card</h4>
                                    <p className="text-muted text-xs leading-relaxed font-sans font-medium">
                                        {de ? 'Ein feiner, rotierender Laserstrahl wandert um die Kanten deiner Karten. Sieht exzellent auf Projektkarten aus.' : 'A fine, rotating laser beam moves around the card edges. Looks excellent on project cards.'}
                                    </p>
                                </div>
                                <div className={`text-[10px] font-mono transition-colors ${laserRahmenAktiv ? 'text-primary' : 'text-zinc-600'}`}>
                                    STATUS: {laserRahmenAktiv ? 'ACTIVE' : 'INACTIVE'}
                                </div>
                            </div>
                            {/* Aktivierter Strahl */}
                            <LaserRahmen />
                        </div>
                    </div>

                    {/* Effekt B: Shiny Button */}
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center px-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#cd7f32] font-bold">
                                EFFEKT 02 // SHINY BUTTON
                            </span>
                            <button
                                onClick={() => setzeGlanzButtonAktiv(!glanzButtonAktiv)}
                                className={`text-[10px] font-bold tracking-widest uppercase hover:underline cursor-pointer transition-colors ${glanzButtonAktiv ? 'text-[#c5a880]' : 'text-zinc-600'}`}
                            >
                                {glanzButtonAktiv ? (de ? 'Deaktivieren' : 'Disable') : (de ? 'Aktivieren' : 'Enable')}
                            </button>
                        </div>
                        <div className="glass bg-zinc-950 p-6 rounded-3xl border border-white/5 min-h-[220px] flex flex-col justify-between">
                            <div className="space-y-2">
                                <h4 className="text-lg font-bold text-white">Reflex Button</h4>
                                <p className="text-muted text-xs leading-relaxed font-sans font-medium">
                                    {de ? 'Der Button hat einen fließenden, metallischen Lichtschimmer. Wird beim Überfahren mit der Maus ausgelöst.' : 'The button features a metallic, moving light reflection. Triggers when hovering.'}
                                </p>
                            </div>
                            <div className="pt-4">
                                <GlanzButton klasse="py-3 px-6 rounded-2xl bg-zinc-900 border border-primary/30 text-[#c5a880] font-bold text-xs tracking-wider uppercase hover:border-[#c5a880] hover:text-white transition-all active:scale-95 duration-300 cursor-pointer shadow-lg w-full">
                                    {de ? 'Quest annehmen ⚔️' : 'Accept Quest ⚔️'}
                                </GlanzButton>
                            </div>
                        </div>
                    </div>

                    {/* Effekt C: Conveyor Belt Skills */}
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center px-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#cd7f32] font-bold">
                                EFFEKT 03 // SKILL CONVEYOR
                            </span>
                            <button
                                onClick={() => setzeFliessbandSkillsAktiv(!fliessbandSkillsAktiv)}
                                className={`text-[10px] font-bold tracking-widest uppercase hover:underline cursor-pointer transition-colors ${fliessbandSkillsAktiv ? 'text-[#c5a880]' : 'text-zinc-600'}`}
                            >
                                {fliessbandSkillsAktiv ? (de ? 'Deaktivieren' : 'Disable') : (de ? 'Aktivieren' : 'Enable')}
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            {fliessbandSkillsAktiv ? (
                                <div className="border border-white/5 bg-zinc-950/20 rounded-3xl p-2 h-[220px] overflow-hidden flex items-center">
                                    <FliessbandSkills />
                                </div>
                            ) : (
                                <div className="w-full h-[220px] flex items-center justify-center border border-white/5 bg-zinc-950/20 rounded-3xl text-muted text-xs select-none">
                                    {de ? 'Fließband-Effekt ist deaktiviert' : 'Conveyor effect is disabled'}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MagicLab;

import React, { useState } from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { skillGruppen } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import { ScanHeadline } from '../components/ScanHeadline';
import { audio } from '../utils/audio';
import { Terminal, Check, Sparkles, Code2, Database, Layout } from 'lucide-react';

export const Skills: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const [gewaehlterSkill, setGewaehlterSkill] = useState<{
    name: string;
    info: string;
  }>({
    name: 'React',
    info: skillGruppen[0].items[0].info[sprache],
  });

  const klickSkill = (name: string, info: string) => {
    setGewaehlterSkill({ name, info });
    audio.spieleTastatur();
  };

  const icons = [Layout, Code2, Database];
  const tags = ['PRAXISEINSATZ', 'AUSBILDUNGS-FOKUS', 'BETRIEB & TOOLS'];

  return (
    <section
      id="skills"
      className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 bg-raum border-b border-linie-stark"
    >
      <SektionKopf
        nummer="03"
        label={sprache === 'de' ? 'Werkzeuge & Stack' : 'Tooling & Stack'}
        rechts={sprache === 'de' ? 'Echte Praxiserfahrung' : 'Hands-on experience'}
      />

      <div className="mt-8 border-b border-linie pb-8">
        <div className="max-w-[760px]">
          <ScanHeadline
            titel={
              sprache === 'de'
                ? 'Technologien, mit denen ich arbeite.'
                : 'Technologies I build with.'
            }
            kursivWort="denen"
            akzentWort="arbeite."
            subtitel="FACHINFORMATIKER AUSBILDUNG // ECHTE PRAXIS STATT PROZENT-ZAHLEN"
          />
          <p className="mt-5 text-[15.5px] leading-[1.7] text-text-2">
            {sprache === 'de'
              ? 'Als angehender Fachinformatiker für Anwendungsentwicklung (FIAE) verzichte ich bewusst auf erfundene Prozentbalken. Hier sind die Werkzeuge und soliden Grundlagen, die ich in echten Projekten (wie simply-switch.de) und meiner Ausbildung einsetze.'
              : 'As a software developer nearing apprenticeship completion (FIAE), I focus on honest fundamentals rather than arbitrary percentages. Here are the tools and core skills I use across live projects and vocational training.'}
          </p>
        </div>
      </div>

      {/* Die 3 ehrlichen Skill-Kategorien im Terminal-Look */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {skillGruppen.map((g, gIdx) => {
          const Icon = icons[gIdx] || Code2;

          return (
            <div
              key={g.kategorie.de}
              className="overflow-hidden rounded-xl border border-linie bg-raum-2/90 shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-signal/80"
            >
              {/* Terminal Titelleiste */}
              <div className="flex items-center justify-between border-b border-linie bg-raum-3 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                  <span className="ml-2 font-mono-code text-[11px] font-semibold text-text-2">
                    0{gIdx + 1}_{g.kategorie.de.toLowerCase().replace(/[^a-z]/g, '_')}.sh
                  </span>
                </div>
                <span className="font-mono-code text-[9.5px] text-signal font-bold">
                  [{tags[gIdx]}]
                </span>
              </div>

              {/* Kategorie Header */}
              <div className="p-5 border-b border-linie/50 bg-raum/40 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded border border-signal/40 bg-signal/15 text-signal">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-mono-code text-[13.5px] font-bold text-text uppercase tracking-wider">
                    {g.kategorie[sprache]}
                  </h3>
                  <span className="font-mono-code text-[10.5px] text-text-3">
                    {g.items.length} Kernwerkzeuge
                  </span>
                </div>
              </div>

              {/* Skill Liste (Klickbar für Inspektion) */}
              <div className="p-4 space-y-2.5">
                {g.items.map((it) => {
                  const istAktiv = gewaehlterSkill.name === it.name;

                  return (
                    <div
                      key={it.name}
                      onClick={() => klickSkill(it.name, it.info[sprache])}
                      className={`group cursor-pointer rounded-lg p-3 transition-all ${
                        istAktiv
                          ? 'border border-signal bg-signal/15 shadow-[0_0_12px_rgba(255,154,60,0.2)]'
                          : 'border border-linie/60 bg-raum/50 hover:border-linie-stark hover:bg-raum/80'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono-code text-[12px]">
                        <span
                          className={`font-semibold transition-colors flex items-center gap-2 ${
                            istAktiv ? 'text-signal' : 'text-text group-hover:text-signal'
                          }`}
                        >
                          <Check className="h-3 w-3 text-signal" />
                          <span>{it.name}</span>
                        </span>
                        <span className="text-[10px] text-text-3 font-semibold">
                          {istAktiv ? '[AKTIV]' : 'INFO'}
                        </span>
                      </div>

                      <p className="mt-1.5 text-[12px] leading-[1.6] text-text-3 group-hover:text-text-2 transition-colors">
                        {it.info[sprache]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Skill Inspector Pill */}
      {gewaehlterSkill && (
        <div className="mt-10 rounded-xl border border-signal/50 bg-raum-2/95 p-4 sm:p-5 font-mono-code text-[12px] shadow-[0_12px_32px_rgba(255,154,60,0.18)] backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-signal animate-ping shrink-0 mt-1 sm:mt-0" />
              <div>
                <span className="text-signal font-bold uppercase tracking-wider mr-2">
                  [INSPEKTION: {gewaehlterSkill.name}]
                </span>
                <span className="text-text-2">{gewaehlterSkill.info}</span>
              </div>
            </div>
            <span className="text-text-3 text-[10.5px] hidden md:inline">
              Klicke auf einen anderen Skill für Details
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;

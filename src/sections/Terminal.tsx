import React, { useEffect, useRef, useState } from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { profil, skillGruppen, projekte } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';

interface Zeile { id: string; art: 'system' | 'user' | 'bot' | 'warn'; inhalt: React.ReactNode }
let z = 0;
const nid = () => `z${z++}-${Date.now()}`;

export const Terminal: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState('');
  const [verlauf, setVerlauf] = useState<string[]>([]);
  const [vi, setVi] = useState(-1);

  const [zeilen, setZeilen] = useState<Zeile[]>([
    { id: nid(), art: 'system', inhalt: 'sb-shell · type "help"' },
  ]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [zeilen]);

  const run = (roh: string) => {
    const c = roh.trim().toLowerCase();
    if (!c) return;
    setVerlauf((v) => [...v, roh]);
    setVi(-1);
    setInput('');
    if (c === 'clear' || c === 'cls') return setZeilen([]);

    const user: Zeile = { id: nid(), art: 'user', inhalt: `~ $ ${roh}` };
    let a: Zeile;

    if (c === 'help' || c === 'hilfe' || c === '?') {
      a = {
        id: nid(),
        art: 'bot',
        inhalt: (
          <span className="text-[#d8c9ad]">
            about · skills · projects · contact · clear
          </span>
        ),
      };
    } else if (c === 'about' || c === 'whoami') {
      a = {
        id: nid(),
        art: 'bot',
        inhalt: (
          <div>
            <div className="text-[#e08a52]">{profil.name}</div>
            <div className="text-[#a99575]">{profil.rolle[sprache]} — {profil.standort[sprache]}</div>
          </div>
        ),
      };
    } else if (c === 'skills' || c === 'faehigkeiten') {
      a = {
        id: nid(),
        art: 'bot',
        inhalt: (
          <div className="space-y-0.5">
            {skillGruppen.map((g) => (
              <div key={g.kategorie.de}>
                <span className="text-[#e08a52]">{g.kategorie[sprache]}: </span>
                <span className="text-[#a99575]">{g.items.map((i) => i.name).join(', ')}</span>
              </div>
            ))}
          </div>
        ),
      };
    } else if (c === 'projects' || c === 'projekte') {
      a = {
        id: nid(),
        art: 'bot',
        inhalt: (
          <div className="space-y-0.5 text-[#a99575]">
            {projekte.map((p) => (
              <div key={p.id}>
                <span className="text-[#e08a52]">·</span> {p.titel} — {p.untertitel[sprache]}
              </div>
            ))}
          </div>
        ),
      };
    } else if (c === 'contact' || c === 'kontakt') {
      a = {
        id: nid(),
        art: 'bot',
        inhalt: (
          <div className="text-[#a99575]">
            {profil.email} · {profil.github}
          </div>
        ),
      };
    } else {
      a = { id: nid(), art: 'warn', inhalt: `${sprache === 'de' ? 'unbekannt' : 'unknown'}: ${roh}` };
    }
    setZeilen((s) => [...s, user, a]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') run(input);
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!verlauf.length) return;
      const n = Math.min(vi + 1, verlauf.length - 1);
      setVi(n);
      setInput(verlauf[verlauf.length - 1 - n] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = vi - 1;
      if (n < 0) { setVi(-1); setInput(''); }
      else { setVi(n); setInput(verlauf[verlauf.length - 1 - n] ?? ''); }
    }
  };

  return (
    <section id="terminal" className="relative py-24 sm:py-36 px-5 sm:px-8 max-w-[1500px] mx-auto">
      <SektionKopf
        nummer="05"
        label={sprache === 'de' ? 'Interaktiv' : 'Interactive'}
        titel={
          <>
            {sprache === 'de' ? 'Im' : 'In a'}{' '}
            <span className="italic-display text-[color:var(--color-sienna)]">Terminal</span>
          </>
        }
      />

      <div className="bg-[color:var(--color-night)] text-[#d8c9ad] rounded-sm overflow-hidden shadow-[12px_12px_0_0_var(--color-ink)] border border-[color:var(--color-ink)]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-[#bf5227]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#b0842d]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#8b7c64]" />
          <span className="ml-3 font-mono-code text-[11px] text-[#a99575]">semir@portfolio</span>
        </div>
        <div
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
          className="h-72 sm:h-80 overflow-y-auto p-5 font-mono-code text-xs sm:text-sm leading-relaxed cursor-text"
        >
          <div className="space-y-1.5">
            {zeilen.map((zl) => (
              <div
                key={zl.id}
                className={
                  zl.art === 'user'
                    ? 'text-[#d8c9ad]'
                    : zl.art === 'system'
                      ? 'text-[#7d6f58] italic'
                      : zl.art === 'warn'
                        ? 'text-[#e08a52]'
                        : ''
                }
              >
                {zl.inhalt}
              </div>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[#e08a52] shrink-0">~ $</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent outline-none text-[#f0e6d2] caret-[#e08a52]"
                placeholder="help"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;

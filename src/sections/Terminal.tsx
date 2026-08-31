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
          <span className="text-text-2">
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
            <div className="text-signal">{profil.name}</div>
            <div className="text-text-2">{profil.rolle[sprache]} — {profil.standort[sprache]}</div>
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
                <span className="text-signal">{g.kategorie[sprache]}: </span>
                <span className="text-text-2">{g.items.map((i) => i.name).join(', ')}</span>
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
          <div className="space-y-0.5 text-text-2">
            {projekte.map((p) => (
              <div key={p.id}>
                <span className="text-signal">·</span> {p.titel} — {p.untertitel[sprache]}
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
          <div className="text-text-2">
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
    <section id="terminal" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SektionKopf
        nummer="06"
        label={sprache === 'de' ? 'Interaktiv' : 'Interactive'}
        rechts={sprache === 'de' ? 'help für Befehle' : 'help for commands'}
      />

      <div className="overflow-hidden border border-linie bg-raum-2">
        <div className="flex items-center gap-2 border-b border-linie px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-signal" />
          <span className="h-2 w-2 rounded-full bg-text/20" />
          <span className="h-2 w-2 rounded-full bg-text/20" />
          <span className="ml-3 font-mono-code text-[11px] text-text-3">semir@portfolio</span>
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
                    ? 'text-text'
                    : zl.art === 'system'
                      ? 'text-text-3'
                      : zl.art === 'warn'
                        ? 'text-signal'
                        : 'text-text-2'
                }
              >
                {zl.inhalt}
              </div>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <span className="shrink-0 text-signal">~ $</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                spellCheck={false}
                autoComplete="off"
                aria-label={sprache === 'de' ? 'Terminal-Eingabe' : 'Terminal input'}
                className="flex-1 bg-transparent text-text caret-signal outline-none placeholder:text-text-3"
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

import React, { useEffect, useRef, useState } from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { profil, skillGruppen, projekte } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import { audio } from '../utils/audio';
import { Terminal as TerminalIcon, CornerDownLeft, Play, Sparkles } from 'lucide-react';

interface Zeile {
  id: string;
  art: 'system' | 'user' | 'bot' | 'warn';
  inhalt: React.ReactNode;
}

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
    {
      id: nid(),
      art: 'system',
      inhalt: (
        <span className="text-text-3">
          Semir Borogovac Developer Console v2.4 (React 19 / Web Engine) — Gib <strong className="text-signal">"help"</strong> ein oder klicke auf einen Schnellbefehl.
        </span>
      ),
    },
  ]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [zeilen]);

  const run = (roh: string) => {
    const c = roh.trim().toLowerCase();
    if (!c) return;

    audio.spieleBefehl();
    setVerlauf((v) => [...v, roh]);
    setVi(-1);
    setInput('');

    if (c === 'clear' || c === 'cls') {
      return setZeilen([]);
    }

    const user: Zeile = { id: nid(), art: 'user', inhalt: `semir@portfolio:~$ ${roh}` };
    let a: Zeile;

    if (c === 'help' || c === 'hilfe' || c === '?') {
      a = {
        id: nid(),
        art: 'bot',
        inhalt: (
          <div className="space-y-1 text-text-2">
            <div>Verfügbare Befehle:</div>
            <div>• <span className="text-signal font-bold">whoami</span> — Persönliches Profil & Standort</div>
            <div>• <span className="text-signal font-bold">skills</span> — Kompletter Tech-Stack (Java, React, PostgreSQL)</div>
            <div>• <span className="text-signal font-bold">projects</span> — simply-switch & weitere Repositories</div>
            <div>• <span className="text-signal font-bold">contact</span> — Direkte Kontaktdaten & Mail</div>
            <div>• <span className="text-signal font-bold">clear</span> — Konsole leeren</div>
          </div>
        ),
      };
    } else if (c === 'about' || c === 'whoami') {
      a = {
        id: nid(),
        art: 'bot',
        inhalt: (
          <div className="space-y-1">
            <div className="text-signal font-bold">{profil.name}</div>
            <div className="text-text">{profil.rolle[sprache]} — {profil.standort[sprache]}</div>
            <div className="text-text-3">Verfügbar ab sofort für Junior- & Vollzeit-Positionen im Bereich Fullstack & Backend.</div>
          </div>
        ),
      };
    } else if (c === 'skills' || c === 'faehigkeiten') {
      a = {
        id: nid(),
        art: 'bot',
        inhalt: (
          <div className="space-y-1">
            {skillGruppen.map((g) => (
              <div key={g.kategorie.de} className="flex flex-wrap gap-2">
                <span className="text-signal font-bold">{g.kategorie[sprache]}:</span>
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
          <div className="space-y-1 text-text-2">
            {projekte.map((p) => (
              <div key={p.id} className="flex items-center gap-2">
                <span className="text-signal font-bold">✔</span>
                <span className="text-text font-semibold">{p.titel}</span>
                <span className="text-text-3">— {p.untertitel[sprache]}</span>
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
          <div className="space-y-1">
            <div>Email: <a href={`mailto:${profil.email}`} className="text-signal underline">{profil.email}</a></div>
            <div>GitHub: <a href={profil.github} target="_blank" rel="noreferrer" className="text-text-2 underline">{profil.github}</a></div>
          </div>
        ),
      };
    } else {
      a = {
        id: nid(),
        art: 'warn',
        inhalt: (
          <span className="text-[#ff5f56]">
            Befehl nicht gefunden: "{roh}". Tippe "help" für alle Befehle.
          </span>
        ),
      };
    }

    setZeilen((s) => [...s, user, a]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    audio.spieleTastatur();
  };

  const schnallAusfuehren = (befehl: string) => {
    setInput(befehl);
    run(befehl);
  };

  return (
    <section id="terminal" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 bg-raum border-b border-linie-stark">
      <SektionKopf
        nummer="05"
        label={sprache === 'de' ? 'Interaktives Terminal' : 'Interactive Terminal'}
        rechts="bash // zsh runtime"
      />

      <div className="mt-8 overflow-hidden rounded-xl border border-linie bg-raum-2/95 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-linie bg-raum-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 font-mono-code text-[11px] font-semibold text-text-2">
              semir@portfolio:~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono-code text-[10.5px] text-signal font-bold">
            <TerminalIcon className="h-3.5 w-3.5" />
            <span>ONLINE // TTY_01</span>
          </div>
        </div>

        {/* Quick Action Command Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-linie/60 bg-raum/60 px-4 py-2 font-mono-code text-[11px]">
          <span className="text-text-3 mr-1">SCHNELLBEFEHLE:</span>
          {['help', 'whoami', 'skills', 'projects', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => schnallAusfuehren(cmd)}
              className="rounded border border-linie bg-raum-2 px-2.5 py-0.5 text-text-2 hover:border-signal hover:text-signal transition-colors flex items-center gap-1"
            >
              <Play className="h-2 w-2 fill-current text-signal" />
              <span>{cmd}</span>
            </button>
          ))}
        </div>

        {/* Terminal Output Body */}
        <div
          ref={bodyRef}
          className="h-[340px] overflow-y-auto p-4 sm:p-6 font-mono-code text-[12.5px] space-y-3"
        >
          {zeilen.map((z) => (
            <div
              key={z.id}
              className={`leading-[1.6] ${
                z.art === 'user'
                  ? 'text-signal font-semibold'
                  : z.art === 'warn'
                  ? 'text-[#ff5f56]'
                  : 'text-text-2'
              }`}
            >
              {z.inhalt}
            </div>
          ))}
        </div>

        {/* Command Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
          }}
          className="flex items-center gap-2 border-t border-linie bg-raum-3 px-4 py-3 font-mono-code text-[13px]"
        >
          <span className="text-signal font-bold">semir@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={sprache === 'de' ? 'Befehl eingeben...' : 'Type a command...'}
            className="flex-1 bg-transparent text-text outline-none placeholder:text-text-3 font-mono-code"
          />
          <button
            type="submit"
            className="flex items-center gap-1 rounded bg-signal/20 px-3 py-1 text-signal text-[11px] font-semibold hover:bg-signal/30 transition-colors"
          >
            <span>SEND</span>
            <CornerDownLeft className="h-3 w-3" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Terminal;

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { profil } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import { ScanHeadline } from '../components/ScanHeadline';
import { audio } from '../utils/audio';
import { Terminal, Check, Play, RefreshCw, ChevronDown, Layers } from 'lucide-react';

interface TerminalKarte {
  id: string;
  datei: string;
  befehl: string;
  tag: string;
  ausgaben: { icon?: boolean; text: string; farbe?: string }[];
  beschreibung: { de: string; en: string };
}

const TERMINAL_KARTEN: TerminalKarte[] = [
  {
    id: 'clean-code',
    datei: '01_clean_code.sh',
    befehl: 'solid --verify-architecture',
    tag: 'CODE_QUALITY',
    beschreibung: {
      de: 'Lesbarer, modularer Code schlägt unkontrollierte Komplexität.',
      en: 'Maintainable, clean architecture over uncontrolled complexity.',
    },
    ausgaben: [
      { text: 'Single Responsibility Principle', farbe: '#27c93f', icon: true },
      { text: 'Klare Namensgebung für Methoden & Variablen', farbe: '#f5ebe0', icon: true },
      { text: 'Modulare Services statt monolithischer Spaghetti', farbe: '#ffb066', icon: true },
      { text: 'Status: [PASS] Wartbar & erweiterbar', farbe: '#d4a373' },
    ],
  },
  {
    id: 'backend',
    datei: '02_backend_engine.sh',
    befehl: 'spring-boot:run --stack=backend',
    tag: 'JAVA_CLUSTER',
    beschreibung: {
      de: 'Robuste Backend-Services und saubere relationale Datenmodelle.',
      en: 'Robust enterprise backend services and relational schemas.',
    },
    ausgaben: [
      { text: 'Java 21 LTS Runtime [ACTIVE]', farbe: '#27c93f', icon: true },
      { text: 'Spring Data JPA & Hibernate Mapping', farbe: '#f5ebe0', icon: true },
      { text: 'PostgreSQL Tabellen & ACID Transaktionen', farbe: '#ff9a3c', icon: true },
      { text: 'Typisierte REST APIs [PORT: 8080 READY]', farbe: '#d4a373' },
    ],
  },
  {
    id: 'ihk',
    datei: '03_fiae_status.sh',
    befehl: 'candidate --info --name=Semir_Borogovac',
    tag: 'IHK_KOBLENZ',
    beschreibung: {
      de: 'Geprüfte Fachinformatiker-Umschulung mit echten Projekten.',
      en: 'Certified software developer apprenticeship with real live systems.',
    },
    ausgaben: [
      { text: 'Umschulung: FIAE Anwendungsentwicklung', farbe: '#27c93f', icon: true },
      { text: 'Zuständige Kammer: IHK Koblenz (2026)', farbe: '#f5ebe0', icon: true },
      { text: 'Praxis: simply-switch.de live ausgeliefert', farbe: '#ff9a3c', icon: true },
      { text: 'Status: [READY] Bereit für Junior / Vollzeit', farbe: '#27c93f' },
    ],
  },
];

export const Profil: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const [aktiverTab, setAktiverTab] = useState<'kompakt' | 'deepdive'>('kompakt');
  const [reExecutingId, setReExecutingId] = useState<string | null>(null);

  // Scroll Container für die gesamte Sektion (280vh Höhe für gepinnte Scroll-Erfahrung)
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Sound-Trigger bei Phasen-Übergang
  const letztePhase = useRef<number>(0);
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let phase = 0;
    if (latest < 0.45) phase = 1;
    else phase = 2;

    if (phase !== letztePhase.current) {
      letztePhase.current = phase;
      audio.spieleKlick();
    }
  });

  // Framer Motion Scroll Transforms:
  // Phase 1 (0.0 - 0.45): Fokus auf Profil-Header, Text & 3D ID-Karte
  // Phase 2 (0.45 - 1.0): Sanfter Übergang zu den 3 interaktiven Terminal-Konsolen
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Oberer Bereich (Header + ID Card) gleitet sanft nach oben bei weiterem Scrollen
  const upperY = useTransform(scrollYProgress, [0.35, 0.75], [0, -70]);
  const upperOpacity = useTransform(scrollYProgress, [0.45, 0.8], [1, 0.45]);

  // Unterer Bereich (3 Terminal-Fenster) gleitet dynamisch hoch und aktiviert sich voll
  const lowerY = useTransform(scrollYProgress, [0.25, 0.65], [60, 0]);
  const lowerOpacity = useTransform(scrollYProgress, [0.2, 0.55], [0.35, 1]);

  // 3D Parallax Tilt für die ID-Card
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const wechsleTab = (tab: 'kompakt' | 'deepdive') => {
    setAktiverTab(tab);
    audio.spieleKlick();
  };

  const runCommand = (id: string) => {
    setReExecutingId(id);
    audio.spieleTastatur();

    setTimeout(() => {
      audio.spieleTastatur();
    }, 120);

    setTimeout(() => {
      audio.spieleBefehl();
      setReExecutingId(null);
    }, 450);
  };

  return (
    <div
      ref={sectionRef}
      id="profil"
      style={{ position: 'relative' }}
      className="relative h-[270vh] bg-raum border-b border-linie-stark"
    >
      {/* Sticky Pinned Container über die gesamte Bildschirmhöhe */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-5 py-6 sm:px-10 lg:px-14">
        {/* Subtiler Hintergrund-Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(212,163,115,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,163,115,0.03)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]"
        />

        {/* Leuchtender Fortschrittsbalken oben */}
        <div className="absolute top-0 inset-x-0 h-1 bg-linie/30">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-gradient-to-r from-signal/60 via-signal to-[#ffb066] shadow-[0_0_12px_#ff9a3c]"
          />
        </div>

        {/* 1. Sektions-Kopfzeile */}
        <div className="relative z-10 w-full pt-2">
          <SektionKopf
            nummer="01"
            label={sprache === 'de' ? 'Profil & Arbeitsweise' : 'Profile & Workflow'}
            rechts={profil.standort[sprache]}
          />
        </div>

        {/* 2. Oberer Bereich: Text & 3D ID-Card (Scroll-animiert mit Framer Motion) */}
        <motion.div
          style={{ y: upperY, opacity: upperOpacity }}
          className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
        >
          {/* Linke Spalte: Typografie, Tab-Umschalter & Arbeitsweise */}
          <div className="lg:col-span-7">
            <ScanHeadline
              titel={
                sprache === 'de'
                  ? 'Struktur, saubere Architektur und ein Blick für das Ganze.'
                  : 'Structure, clean architecture and an eye for the whole system.'
              }
              kursivWort="Architektur"
              akzentWort="Ganze."
              subtitel="SEMIR BOROGOVAC // FIAE UMSCHULUNG 2026"
            />

            {/* Tab-Umschalter */}
            <div className="mt-5 flex items-center gap-3 border-b border-linie pb-2.5">
              <button
                type="button"
                onClick={() => wechsleTab('kompakt')}
                className={`flex items-center gap-2 rounded px-3 py-1 font-mono-code text-[11.5px] tracking-wide transition-all ${
                  aktiverTab === 'kompakt'
                    ? 'border border-signal bg-signal/15 text-signal font-semibold shadow-[0_0_12px_rgba(255,154,60,0.2)]'
                    : 'text-text-3 hover:text-text'
                }`}
              >
                <span>[01]</span>
                <span>{sprache === 'de' ? 'AUF EINEN BLICK' : 'AT A GLANCE'}</span>
              </button>

              <button
                type="button"
                onClick={() => wechsleTab('deepdive')}
                className={`flex items-center gap-2 rounded px-3 py-1 font-mono-code text-[11.5px] tracking-wide transition-all ${
                  aktiverTab === 'deepdive'
                    ? 'border border-signal bg-signal/15 text-signal font-semibold shadow-[0_0_12px_rgba(255,154,60,0.2)]'
                    : 'text-text-3 hover:text-text'
                }`}
              >
                <span>[02]</span>
                <span>{sprache === 'de' ? 'MEINE ARBEITSWEISE' : 'HOW I WORK'}</span>
              </button>
            </div>

            {/* Tab Inhalt 1: Kompakt */}
            {aktiverTab === 'kompakt' ? (
              <div className="mt-4 space-y-3 text-[15px] leading-[1.65] text-text-2">
                <p>
                  In meiner Umschulung zum{' '}
                  <strong className="text-text font-semibold">
                    Fachinformatiker für Anwendungsentwicklung
                  </strong>{' '}
                  habe ich die Grundlagen objektorientierter Programmierung, relationaler Datenbanken
                  und moderner Web-Technologien praxisnah vertieft.
                </p>
                <p>
                  Am liebsten arbeite ich an der{' '}
                  <span className="text-signal font-medium">
                    Schnittstelle zwischen Backend und Oberfläche
                  </span>
                  : Saubere Datenmodelle in PostgreSQL entwerfen, Berechnungen in robusten Java-Services kapseln und
                  das Ergebnis in einer verständlichen React-UI sichtbar machen.
                </p>
              </div>
            ) : (
              /* Tab Inhalt 2: Deep Dive */
              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono-code text-[11.5px]">
                <div className="rounded border border-linie bg-raum-2/80 p-2.5">
                  <span className="text-signal font-bold">[01] Domäne & Problem:</span>
                  <p className="mt-0.5 text-text-3">Anforderungen exakt klären vor dem Coden.</p>
                </div>
                <div className="rounded border border-linie bg-raum-2/80 p-2.5">
                  <span className="text-signal font-bold">[02] Datenmodell zuerst:</span>
                  <p className="mt-0.5 text-text-3">PostgreSQL-Tabellen & Java-Services nach SOLID.</p>
                </div>
                <div className="rounded border border-linie bg-raum-2/80 p-2.5">
                  <span className="text-signal font-bold">[03] REST Schnittstellen:</span>
                  <p className="mt-0.5 text-text-3">Typisierte Endpunkte mit verständlichem JSON.</p>
                </div>
                <div className="rounded border border-linie bg-raum-2/80 p-2.5">
                  <span className="text-signal font-bold">[04] Intuitive UI:</span>
                  <p className="mt-0.5 text-text-3">Barrierefreie, responsive React-Oberflächen.</p>
                </div>
              </div>
            )}
          </div>

          {/* Rechte Spalte: Interaktive 3D Developer ID Card */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <motion.div
              ref={cardRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              animate={{ rotateY: tilt.x, rotateX: tilt.y }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              style={{ perspective: 1000 }}
              className="group relative w-full max-w-[310px] rounded-xl border border-linie-stark bg-gradient-to-b from-raum-2 to-raum p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Viewfinder Crosshairs */}
              <span className="pointer-events-none absolute top-2 left-2 font-mono-code text-[10px] text-signal/80">
                +
              </span>
              <span className="pointer-events-none absolute top-2 right-2 font-mono-code text-[10px] text-signal/80">
                +
              </span>
              <span className="pointer-events-none absolute bottom-2 left-2 font-mono-code text-[10px] text-signal/80">
                +
              </span>
              <span className="pointer-events-none absolute bottom-2 right-2 font-mono-code text-[10px] text-signal/80">
                +
              </span>

              {/* ID Header */}
              <div className="flex items-center justify-between border-b border-linie/80 pb-2 font-mono-code text-[9.5px] text-text-3">
                <span className="tracking-widest uppercase text-signal">DEV_ID // SB-2026</span>
                <span>FIAE ENTWICKLUNG</span>
              </div>

              {/* Foto mit Hover-Farbwechsel */}
              <div className="relative mt-2.5 overflow-hidden rounded border border-linie/60 bg-raum-3">
                <img
                  src="/profile.jpg"
                  alt={profil.name}
                  loading="lazy"
                  className="w-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-[1.02]"
                  style={{ aspectRatio: '4 / 4.4' }}
                />

                <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-raum/85 px-1.5 py-0.5 font-mono-code text-[8.5px] text-text-3 backdrop-blur-sm">
                  50.53° N, 8.03° O // DORNBURG
                </div>
              </div>

              {/* Namenszeile */}
              <div className="mt-2.5 flex items-baseline justify-between">
                <div>
                  <h3 className="text-base font-bold tracking-tight text-text">{profil.name}</h3>
                  <p className="font-mono-code text-[10px] text-text-3">
                    Fullstack & Backend Entwickler
                  </p>
                </div>
                <span className="font-mono-code text-[10px] text-signal">2026</span>
              </div>

              {/* Live Status */}
              <div className="mt-3 flex items-center gap-2 rounded border border-signal/40 bg-signal/10 px-2.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                <span className="font-mono-code text-[9.5px] font-semibold tracking-wide uppercase text-text">
                  STATUS: VERFÜGBAR FÜR JUNIOR / VOLLZEIT
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 3. Unterer Bereich: 3 Terminal-Konsolen (Gleitet beim Scrollen voll hoch) */}
        <motion.div
          style={{ y: lowerY, opacity: lowerOpacity }}
          className="relative z-10 w-full pt-4 pb-2"
        >
          <div className="flex items-center justify-between pb-2.5 border-b border-linie/50">
            <div className="flex items-center gap-2 font-mono-code text-[11px] text-signal">
              <Terminal className="h-3.5 w-3.5" />
              <span className="tracking-[0.2em] uppercase font-semibold">
                INTERAKTIVE RUNTIME-KONSOLEN // SCROLL-PHASE 02
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono-code text-[10px] text-text-3">
              <span className="hidden sm:inline">KLICKE ZUM AUSFÜHREN // WEITERSCROLLEN ZU PROJEKTEN</span>
              <ChevronDown className="h-3.5 w-3.5 text-signal animate-bounce" />
            </div>
          </div>

          {/* 3 Terminal-Fenster im Grid */}
          <div className="mt-3.5 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {TERMINAL_KARTEN.map((karte) => {
              const isRunning = reExecutingId === karte.id;

              return (
                <div
                  key={karte.id}
                  onClick={() => runCommand(karte.id)}
                  className="group relative cursor-pointer overflow-hidden rounded-lg border border-linie bg-raum-2/95 shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-signal hover:shadow-[0_12px_32px_rgba(255,154,60,0.18)]"
                >
                  {/* Titelleiste */}
                  <div className="flex items-center justify-between border-b border-linie bg-raum-3 px-3.5 py-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                      <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                      <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
                      <span className="ml-2 font-mono-code text-[10.5px] font-semibold text-text-2">
                        {karte.datei}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono-code text-[9.5px] text-signal font-bold">
                        [{karte.tag}]
                      </span>
                      <RefreshCw
                        className={`h-2.5 w-2.5 text-text-3 transition-colors group-hover:text-signal ${
                          isRunning ? 'animate-spin text-signal' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-3 font-mono-code text-[11px] space-y-2">
                    <div className="flex items-center gap-2 text-text">
                      <span className="text-signal font-bold">$</span>
                      <span className="font-semibold text-text">{karte.befehl}</span>
                      {isRunning && (
                        <span className="inline-block h-3 w-1 animate-pulse bg-signal" />
                      )}
                    </div>

                    <div className="space-y-1 pt-1 border-t border-linie/40">
                      {karte.ausgaben.map((ausgabe, aIdx) => (
                        <div
                          key={aIdx}
                          className={`flex items-center gap-1.5 transition-opacity duration-300 ${
                            isRunning ? 'opacity-30' : 'opacity-100'
                          }`}
                          style={{ color: ausgabe.farbe || '#e3d5ca' }}
                        >
                          {ausgabe.icon ? (
                            <Check className="h-2.5 w-2.5 shrink-0 text-[#27c93f]" />
                          ) : (
                            <span className="text-text-3 font-bold">›</span>
                          )}
                          <span className="truncate">{ausgabe.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-1.5 flex items-center justify-between text-[9.5px] text-text-3 border-t border-linie/40">
                      <span className="truncate">{karte.beschreibung[sprache]}</span>
                      <span className="text-signal flex items-center gap-1 group-hover:underline shrink-0 ml-2">
                        <Play className="h-2 w-2 fill-current" /> RUN
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profil;

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { audio } from '../utils/audio';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { Layers, Database, Cpu, Layout, ShieldCheck, ChevronDown } from 'lucide-react';

interface BlueprintSchicht {
  id: string;
  titel: { de: string; en: string };
  icon: React.ElementType;
  beschreibung: { de: string; en: string };
  farbcode: string;
  tags: string[];
}

const SCHICHTEN: BlueprintSchicht[] = [
  {
    id: 'layer-security',
    titel: { de: '01. Schnittstellen & Sicherheit', en: '01. APIs & Security' },
    icon: ShieldCheck,
    beschreibung: {
      de: 'Sichere REST-Schnittstellen, damit Oberfläche und Server zuverlässig Daten austauschen und Zugriffe geschützt bleiben.',
      en: 'Secure REST APIs for reliable data exchange between frontend and backend with protected access.',
    },
    farbcode: '#ff9a3c',
    tags: ['REST APIs', 'Sichere Endpunkte', 'JSON', 'HTTPS'],
  },
  {
    id: 'layer-db',
    titel: { de: '02. Datenbank & Datensätze', en: '02. Database & Data Records' },
    icon: Database,
    beschreibung: {
      de: 'PostgreSQL mit sauberen Tabellenstrukturen für Kunden, Verträge und Schadensmeldungen, damit jeder Datensatz sicher gespeichert ist.',
      en: 'PostgreSQL with clean table schemas for clients, policies and claims ensuring dependable storage.',
    },
    farbcode: '#d4a373',
    tags: ['PostgreSQL', 'Tabellen & Relationen', 'SQL', 'Datensicherheit'],
  },
  {
    id: 'layer-services',
    titel: { de: '03. Java & Backend-Logik', en: '03. Java & Business Logic' },
    icon: Cpu,
    beschreibung: {
      de: 'Das Rechenzentrum im Hintergrund: Tarifberechnungen, Validierungen und Geschäftsregeln programmiert in Java mit Spring Boot.',
      en: 'The backend calculation engine: premium calculations, validations and business rules built in Java and Spring Boot.',
    },
    farbcode: '#ffb066',
    tags: ['Java 21', 'Spring Boot 3', 'Geschäftslogik', 'Validierung'],
  },
  {
    id: 'layer-ui',
    titel: { de: '04. Oberfläche & Interaktion', en: '04. User Interface & Interaction' },
    icon: Layout,
    beschreibung: {
      de: 'Was der Nutzer sieht und klickt: Schnelle, responsive Web-Oberflächen in React und TypeScript mit intuitiver Bedienung auf Handy und PC.',
      en: 'What users see and click: Fast, responsive web interfaces in React and TypeScript with intuitive controls across mobile and desktop.',
    },
    farbcode: '#f5ebe0',
    tags: ['React 18/19', 'TypeScript', 'Responsive Design', 'Tailwind CSS'],
  },
];

export const ArchitekturBlueprint: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll Progress über den gepinnten Container (300vh Scroll-Strecke)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [aktiveSchicht, setAktiveSchicht] = useState<number>(0);
  const letzteSchicht = useRef<number>(0);

  // Synchronisiere Scroll-Fortschritt mit der aktiven Schicht (0, 1, 2, 3)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let index = 0;
    if (latest < 0.25) index = 0;
    else if (latest < 0.55) index = 1;
    else if (latest < 0.82) index = 2;
    else index = 3;

    if (index !== letzteSchicht.current) {
      setAktiveSchicht(index);
      letzteSchicht.current = index;
      audio.spieleKlick();
    }
  });

  // Framer Motion Transforms für die 4 SVG-Schichten
  // Schicht 1 (Schnittstellen)
  const l1Opacity = useTransform(scrollYProgress, [0.0, 0.15], [0.15, 1.0]);
  const l1Y = useTransform(scrollYProgress, [0.0, 0.15], [30, 0]);

  // Schicht 2 (Datenbank)
  const l2Opacity = useTransform(scrollYProgress, [0.15, 0.38], [0.1, 1.0]);
  const l2Y = useTransform(scrollYProgress, [0.15, 0.38], [40, 0]);

  // Schicht 3 (Java Backend)
  const l3Opacity = useTransform(scrollYProgress, [0.42, 0.65], [0.1, 1.0]);
  const l3Y = useTransform(scrollYProgress, [0.42, 0.65], [50, 0]);

  // Schicht 4 (React UI)
  const l4Opacity = useTransform(scrollYProgress, [0.68, 0.9], [0.08, 1.0]);
  const l4Y = useTransform(scrollYProgress, [0.68, 0.9], [60, 0]);

  // Fortschrittsbalken Breite
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const springeZuSchicht = (index: number) => {
    if (!sectionRef.current) return;
    const targets = [0.05, 0.35, 0.65, 0.92];
    const top = sectionRef.current.offsetTop;
    const height = sectionRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + height * targets[index],
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={sectionRef}
      style={{ position: 'relative' }}
      className="relative h-[280vh] bg-raum-2 border-b border-linie-stark"
    >
      {/* Sticky Pinned Viewport Container */}
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden px-6 sm:px-12">
        {/* Subtle Background Architectural Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(212,163,115,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,163,115,0.035)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]"
        />

        {/* Top Progress Line across the sticky header */}
        <div className="absolute top-0 inset-x-0 h-1 bg-linie/30">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-gradient-to-r from-signal/70 via-signal to-[#ffb066] shadow-[0_0_12px_#ff9a3c]"
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1440px]">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-linie/60 pb-6">
            <div>
              <div className="flex items-center gap-2.5">
                <Layers className="h-4 w-4 text-signal" />
                <span className="font-mono-code text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">
                  SCROLL-ASSEMBLY // 02
                </span>
                <span className="h-px w-6 bg-signal/40" />
                <span className="font-mono-code text-[10px] tracking-widest text-text-3">
                  PROGRESSIV VOM FUNDAMENT ZUR OBERFLÄCHE
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-text sm:text-4xl">
                {sprache === 'de' ? (
                  <>
                    Vom <span className="font-serif italic text-[#e6ccb2]">Klick im Browser</span> bis zur Datenbank.
                  </>
                ) : (
                  <>
                    From <span className="font-serif italic text-[#e6ccb2]">user click</span> to the database.
                  </>
                )}
              </h2>
            </div>

            {/* Scroll Indicator Hint */}
            <div className="flex items-center gap-2 font-mono-code text-[11px] text-text-3">
              <span className="hidden md:inline">BEIM SCROLLEN BAUT SICH DAS SYSTEM AUF</span>
              <div className="flex h-7 w-7 items-center justify-center rounded border border-linie bg-raum text-signal">
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Main Content Grid: SVG on Left (Assembles smoothly), Cards on Right (Auto-Activates) */}
          <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
            {/* Left: Axonometric Animated SVG */}
            <div className="relative flex items-center justify-center rounded-xl border border-linie bg-raum/90 p-6 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.55)] lg:col-span-7">
              {/* HUD Tags */}
              <div className="absolute top-4 left-4 font-mono-code text-[10px] text-text-3">
                [SYSTEM: 4 SCHICHTEN] [SCROLL-GESTEUERT]
              </div>
              <div className="absolute top-4 right-4 font-mono-code text-[10px] text-signal">
                [SCHICHT: 0{aktiveSchicht + 1} // {SCHICHTEN[aktiveSchicht].titel.de.split('.')[1].trim()}]
              </div>

              <svg
                viewBox="0 0 600 440"
                className="w-full max-w-[560px] drop-shadow-[0_16px_32px_rgba(255,154,60,0.18)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SCHICHT 1: REST-Schnittstellen & Sicherheit */}
                <motion.g
                  style={{ opacity: l1Opacity, y: l1Y }}
                  className="cursor-pointer"
                  onClick={() => springeZuSchicht(0)}
                >
                  <polygon
                    points="300,340 500,260 300,180 100,260"
                    fill="#1b1613"
                    stroke={aktiveSchicht === 0 ? '#ff9a3c' : '#d4a373'}
                    strokeWidth={aktiveSchicht === 0 ? '2' : '1.5'}
                    strokeDasharray={aktiveSchicht === 0 ? 'none' : '4 2'}
                  />
                  <text
                    x="300"
                    y="325"
                    textAnchor="middle"
                    fill={aktiveSchicht === 0 ? '#ff9a3c' : '#d4a373'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    01 // REST-SCHNITTSTELLEN & SCHUTZ
                  </text>
                </motion.g>

                {/* SCHICHT 2: PostgreSQL Datenbank */}
                <motion.g
                  style={{ opacity: l2Opacity, y: l2Y }}
                  className="cursor-pointer"
                  onClick={() => springeZuSchicht(1)}
                >
                  <polygon
                    points="300,280 500,200 300,120 100,200"
                    fill="#221b16"
                    stroke={aktiveSchicht === 1 ? '#ff9a3c' : '#d4a373'}
                    strokeWidth={aktiveSchicht === 1 ? '2.2' : '1.5'}
                    fillOpacity="0.88"
                  />
                  {/* Database Nodes */}
                  <circle cx="220" cy="200" r="5" fill="#ff9a3c" />
                  <circle cx="300" cy="180" r="5" fill="#ff9a3c" />
                  <circle cx="380" cy="200" r="5" fill="#ff9a3c" />
                  <text
                    x="300"
                    y="225"
                    textAnchor="middle"
                    fill={aktiveSchicht === 1 ? '#ff9a3c' : '#d4a373'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    02 // POSTGRESQL DATENBANK & TABELLEN
                  </text>
                </motion.g>

                {/* SCHICHT 3: Java 21 & Spring Boot Logik */}
                <motion.g
                  style={{ opacity: l3Opacity, y: l3Y }}
                  className="cursor-pointer"
                  onClick={() => springeZuSchicht(2)}
                >
                  <polygon
                    points="300,220 500,140 300,60 100,140"
                    fill="#2b211a"
                    stroke={aktiveSchicht === 2 ? '#ff9a3c' : '#ffb066'}
                    strokeWidth={aktiveSchicht === 2 ? '2.4' : '1.8'}
                    fillOpacity="0.92"
                  />
                  {/* Monolith Icon */}
                  <polygon points="300,110 330,95 300,80 270,95" fill="#ff9a3c" />
                  <text
                    x="300"
                    y="155"
                    textAnchor="middle"
                    fill={aktiveSchicht === 2 ? '#ff9a3c' : '#ffb066'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    03 // JAVA 21 & SPRING BOOT LOGIK
                  </text>
                </motion.g>

                {/* SCHICHT 4: React & UI Oberfläche */}
                <motion.g
                  style={{ opacity: l4Opacity, y: l4Y }}
                  className="cursor-pointer"
                  onClick={() => springeZuSchicht(3)}
                >
                  <polygon
                    points="300,160 500,80 300,0 100,80"
                    fill="#38291f"
                    stroke={aktiveSchicht === 3 ? '#ff9a3c' : '#ffffff'}
                    strokeWidth={aktiveSchicht === 3 ? '2.5' : '2'}
                    fillOpacity="0.96"
                  />
                  <line x1="220" y1="75" x2="280" y2="45" stroke="#ff9a3c" strokeWidth="1.5" />
                  <line x1="320" y1="45" x2="380" y2="75" stroke="#d4a373" strokeWidth="1.5" />
                  <circle cx="300" cy="60" r="7" fill="#ff9a3c" className="animate-pulse" />
                  <text
                    x="300"
                    y="85"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    04 // REACT & BENUTZEROBERFLÄCHE
                  </text>
                </motion.g>
              </svg>

              {/* Status Badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded border border-signal/60 bg-raum/90 px-3 py-1 font-mono-code text-[11px] text-signal shadow-lg backdrop-blur-sm">
                ● AKTIV: {SCHICHTEN[aktiveSchicht].titel.de}
              </div>
            </div>

            {/* Right: Layer Inspector Accordion (Leuchtet synchron auf) */}
            <div className="space-y-3 lg:col-span-5">
              {SCHICHTEN.map((schicht, idx) => {
                const Icon = schicht.icon;
                const istAusgewaehlt = aktiveSchicht === idx;

                return (
                  <div
                    key={schicht.id}
                    onClick={() => springeZuSchicht(idx)}
                    className={`group cursor-pointer rounded-lg border p-4 sm:p-5 transition-all duration-400 ${
                      istAusgewaehlt
                        ? 'border-signal bg-raum shadow-[0_6px_28px_rgba(255,154,60,0.18)] scale-[1.02]'
                        : 'border-linie/60 bg-raum/40 opacity-60 hover:opacity-90 hover:border-linie-stark'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded border transition-colors ${
                            istAusgewaehlt
                              ? 'border-signal bg-signal/20 text-signal'
                              : 'border-linie text-text-3'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <h3
                          className={`font-mono-code text-[13.5px] font-semibold transition-colors ${
                            istAusgewaehlt ? 'text-text' : 'text-text-3 group-hover:text-text-2'
                          }`}
                        >
                          {schicht.titel[sprache]}
                        </h3>
                      </div>

                      <span
                        className={`font-mono-code text-[10.5px] font-bold ${
                          istAusgewaehlt ? 'text-signal' : 'text-text-3'
                        }`}
                      >
                        {istAusgewaehlt ? '[AKTIV]' : `0${idx + 1}`}
                      </span>
                    </div>

                    <p
                      className={`mt-2.5 text-[13.5px] leading-[1.6] transition-colors ${
                        istAusgewaehlt ? 'text-text-2' : 'text-text-3'
                      }`}
                    >
                      {schicht.beschreibung[sprache]}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {schicht.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-linie/70 bg-raum-2 px-2 py-0.5 font-mono-code text-[9.5px] text-text-3"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitekturBlueprint;

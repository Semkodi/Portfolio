import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, ChevronDown, Compass, Terminal as TerminalIcon } from 'lucide-react';
import { DevWorkspace3D, STAGES } from '../components/DevWorkspace3D';
import { ScanHeadline } from '../components/ScanHeadline';
import { audio } from '../utils/audio';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { profil } from '../data/inhalt';

const STAGE_CONTENT = [
  {
    kategorie: '01 / FULLSTACK WORKSPACE',
    titel: 'Architektur, gehalten in Code und Präzision.',
    kursiv: 'Code',
    akzent: 'Präzision.',
    untertitel: 'FULLSTACK SOFTWARE ENGINEERING // 2026',
    beschreibung: {
      de: 'Moderne Software-Entwicklung vom responsiven Web-Frontend in React & TypeScript bis zu soliden Backends und APIs mit Java und Spring Boot.',
      en: 'Modern software engineering from responsive React & TypeScript frontends to solid APIs and backends with Java and Spring Boot.',
    },
    tech: ['React 18/19', 'TypeScript', 'Java 21', 'Spring Boot 3', 'PostgreSQL'],
    stat: { label: 'Tech Stack', value: 'Fullstack' },
  },
  {
    kategorie: '02 / FRONTEND & INTERAKTION',
    titel: 'Reaktive Komponenten, 60 FPS Physik.',
    kursiv: 'Komponenten,',
    akzent: 'Physik.',
    untertitel: 'CLIENT RUNTIME & USER EXPERIENCE',
    beschreibung: {
      de: 'Elegante, barrierefreie Interfaces mit Matter.js-Physik, Framer Motion Scroll-Animationen und strikter Barrierefreiheit (WCAG 2.1).',
      en: 'Accessible, elegant interfaces powered by Matter.js physics, Framer Motion scroll mechanics and strict WCAG 2.1 conformance.',
    },
    tech: ['Matter.js', 'Framer Motion', 'Tailwind CSS', 'A11y 95+'],
    stat: { label: 'Framerate', value: '60 FPS' },
  },
  {
    kategorie: '03 / BACKEND & SCHNITTSTELLEN',
    titel: 'Solide Schichten, saubere APIs.',
    kursiv: 'Schichten,',
    akzent: 'APIs.',
    untertitel: 'REST-SERVICES & DATENBANKEN // JAVA',
    beschreibung: {
      de: 'Typisierte REST-Schnittstellen, relationale Datenmodelle und saubere Service-Schichten mit Spring Data JPA, DTOs und SQL-Abfragen.',
      en: 'Type-safe REST APIs, relational schemas and clean service layers with Spring Data JPA, DTOs and SQL queries.',
    },
    tech: ['Java 21', 'Spring Boot', 'PostgreSQL', 'REST-APIs', 'Clean Code'],
    stat: { label: 'Architektur', value: 'Clean Code' },
  },
  {
    kategorie: '04 / FLAGSHIP CASE STUDY',
    titel: 'simply switch, live in Produktion.',
    kursiv: 'simply',
    akzent: 'Produktion.',
    untertitel: 'COMMERCIAL FINTECH PLATFORM',
    beschreibung: {
      de: 'B2C-Versicherungsmakler Web-App mit interaktivem Tarifrechner, Wizard-Architektur, Schadensmelder und hochkonvertierendem Lead-Funnel.',
      en: 'Commercial insurance broker platform featuring interactive premium calculators, wizard state machines and lead funnels.',
    },
    tech: ['React', 'TypeScript', 'Tailwind', 'Lead Funnel'],
    stat: { label: 'Status', value: 'Live' },
    link: 'https://simply-switch.de',
  },
  {
    kategorie: '05 / ENTWICKLER & STATUS',
    titel: 'Bereit für anspruchsvolle Systeme.',
    kursiv: 'Bereit',
    akzent: 'Systeme.',
    untertitel: 'FIAE UMSCHULUNG // DEVELOPER FOR HIRE',
    beschreibung: {
      de: 'Semir Borogovac — Fachinformatiker für Anwendungsentwicklung. Verfügbar für Vollzeit- und Junior-Entwickler-Positionen mit Fokus auf Fullstack & Java.',
      en: 'Semir Borogovac — Software Developer (FIAE). Available for Fullstack & Java engineering positions.',
    },
    tech: ['Fullstack', 'Java & Spring Boot', 'React & Web', 'Koblenz / Remote'],
    stat: { label: 'Verfügbarkeit', value: 'Sofort' },
  },
];

export const CineHero: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const [aktiveStufe, setAktiveStufe] = useState<number>(0);
  const [isAudioAktiv, setIsAudioAktiv] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);

  const toggleAudio = () => {
    const aktiv = audio.toggle();
    setIsAudioAktiv(aktiv);
  };

  const wechsleStufe = useCallback(
    (neueStufe: number) => {
      if (isTransitioning) return;
      if (neueStufe < 0 || neueStufe >= STAGES.length) return;

      setIsTransitioning(true);
      setAktiveStufe(neueStufe);
      audio.spieleWhoosh();

      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
    },
    [isTransitioning]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const heroEl = containerRef.current;
      if (!heroEl) return;

      const rect = heroEl.getBoundingClientRect();
      const istImHero = rect.top <= 10 && rect.bottom >= window.innerHeight * 0.7;

      if (!istImHero) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 1300) {
        if (aktiveStufe < STAGES.length - 1 || (aktiveStufe === STAGES.length - 1 && e.deltaY < 0)) {
          e.preventDefault();
        }
        return;
      }

      const delta = e.deltaY;
      const threshold = 35;

      if (delta > threshold) {
        if (aktiveStufe < STAGES.length - 1) {
          e.preventDefault();
          lastScrollTime.current = now;
          wechsleStufe(aktiveStufe + 1);
        }
      } else if (delta < -threshold) {
        if (aktiveStufe > 0) {
          e.preventDefault();
          lastScrollTime.current = now;
          wechsleStufe(aktiveStufe - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [aktiveStufe, wechsleStufe]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (aktiveStufe < STAGES.length - 1) {
          e.preventDefault();
          wechsleStufe(aktiveStufe + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (aktiveStufe > 0) {
          e.preventDefault();
          wechsleStufe(aktiveStufe - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [aktiveStufe, wechsleStufe]);

  const aktuellerInhalt = STAGE_CONTENT[aktiveStufe];

  return (
    <section
      ref={containerRef}
      id="start"
      className="relative min-h-screen w-full overflow-hidden bg-raum border-b border-linie-stark"
    >
      {/* 3D WebGL Canvas Layer (Rechts fokussiert, dezent im Hintergrund) */}
      <div className="absolute inset-0 z-0 pointer-events-auto max-w-full overflow-hidden">
        <DevWorkspace3D aktiveStufe={aktiveStufe} />
      </div>

      {/* Sanfter linker Gradient, damit der Text immer 100% kontrastreich und lesbar bleibt */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full max-w-[760px] bg-gradient-to-r from-raum via-raum/90 to-transparent"
      />

      {/* Top Editorial Wordmark & Audio Controls Bar */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-20 sm:px-12 sm:pt-8">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_8px_#ff9a3c]" />
          <span className="hidden sm:inline font-mono-code text-[11px] font-semibold tracking-[0.22em] uppercase text-text">
            SEMIR BOROGOVAC // 3D CODE WORKSPACE
          </span>
          <span className="sm:hidden font-mono-code text-[10.5px] font-semibold tracking-[0.18em] uppercase text-text">
            3D CODE WORKSPACE
          </span>
        </div>

        {/* Global Sound Toggle & Explore Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAudio}
            type="button"
            className="flex items-center gap-2 rounded-full border border-linie bg-raum-2/80 px-3 py-1 font-mono-code text-[10.5px] sm:text-[11px] text-text-2 tracking-wider transition-colors hover:border-signal hover:text-signal"
          >
            {isAudioAktiv ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-signal animate-pulse" />
                <span>AUDIO [ON]</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-text-3" />
                <span>AUDIO [OFF]</span>
              </>
            )}
          </button>

          <button
            onClick={() => wechsleStufe((aktiveStufe + 1) % STAGES.length)}
            type="button"
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-linie bg-raum-2/80 px-3.5 py-1.5 font-mono-code text-[11px] text-text-2 tracking-wider transition-colors hover:border-signal hover:text-signal"
          >
            <Compass className="h-3.5 w-3.5 text-signal" />
            <span>NÄCHSTES FENSTER</span>
          </button>
        </div>
      </div>

      {/* Main Editorial Content Overlay */}
      <div className="relative z-10 flex min-h-[calc(100vh-140px)] flex-col justify-between px-5 py-4 sm:px-12 sm:py-10 lg:py-16">
        {/* Left Column: Reiner Text-Bereich ohne störende 3D-Verdeckung */}
        <div className="mt-2 sm:mt-8 max-w-[620px]">
          {/* Stage Tag */}
          <div className="flex items-center gap-2.5">
            <span className="font-mono-code text-[11px] tracking-[0.24em] uppercase text-signal">
              {aktuellerInhalt.kategorie}
            </span>
            <span className="h-px w-8 bg-signal/40" />
            <span className="font-mono-code text-[10px] tracking-widest text-text-3">
              {STAGES[aktiveStufe].tag}
            </span>
          </div>

          {/* Headline with Scanline Sweep Effect */}
          <div className="mt-5">
            <ScanHeadline
              key={aktiveStufe}
              titel={aktuellerInhalt.titel}
              kursivWort={aktuellerInhalt.kursiv}
              akzentWort={aktuellerInhalt.akzent}
              subtitel={aktuellerInhalt.untertitel}
            />
          </div>

          {/* Dynamic Description */}
          <p className="mt-6 text-[16px] leading-[1.7] text-text-2 transition-opacity duration-300">
            {aktuellerInhalt.beschreibung[sprache]}
          </p>

          {/* Tech Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {aktuellerInhalt.tech.map((t) => (
              <span
                key={t}
                className="rounded border border-linie bg-raum-2/80 px-2.5 py-1 font-mono-code text-[11px] tracking-wide text-text-3"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Stage 4 Special: Live Project CTA */}
          {aktiveStufe === 3 && (
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://simply-switch.de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-signal px-6 py-3 font-mono-code text-[13px] font-semibold text-signal-tief shadow-[0_8px_32px_rgba(255,154,60,0.35)] transition-transform hover:scale-[1.02]"
              >
                <span>SIMPLY-SWITCH.DE ÖFFNEN</span>
                <span className="text-base">↗</span>
              </a>
            </div>
          )}

          {/* Stage 5 Special: Hire & Contact CTA */}
          {aktiveStufe === 4 && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profil.email}`}
                className="inline-flex items-center gap-2 bg-signal px-6 py-3 font-mono-code text-[13px] font-semibold text-signal-tief shadow-[0_8px_32px_rgba(255,154,60,0.35)] transition-transform hover:scale-[1.02]"
              >
                <TerminalIcon className="h-4 w-4" />
                <span>KONTAKT AUFNEHMEN</span>
              </a>
              <a
                href="#profil"
                className="border border-linie-stark px-6 py-3 font-mono-code text-[13px] text-text-2 transition-colors hover:border-signal hover:text-signal"
              >
                ZUM PROFIL ↓
              </a>
            </div>
          )}
        </div>

        {/* Bottom Control Bar: Transparent "Views Panel" in all 5 Stages */}
        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-t border-linie/60 pt-6">
          {/* 5-Stage View Selector */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {STAGES.map((s, idx) => {
              const istAktiv = aktiveStufe === idx;
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => wechsleStufe(idx)}
                  className={`group relative flex items-center gap-2 rounded px-3 py-1.5 font-mono-code text-[11px] tracking-wider transition-all duration-300 ${
                    istAktiv
                      ? 'border border-signal/80 bg-signal/15 text-signal font-semibold shadow-[0_0_12px_rgba(255,154,60,0.2)]'
                      : 'border border-linie/40 bg-raum-2/50 text-text-3 hover:border-linie-stark hover:text-text-2'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      istAktiv ? 'bg-signal' : 'bg-text-3 group-hover:bg-text-2'
                    }`}
                  />
                  <span>0{idx + 1}</span>
                  <span className="hidden md:inline">{s.label.split('/')[1]}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Guidance & Down Indicator */}
          <div className="flex items-center gap-4 text-text-3 font-mono-code text-[11px]">
            <span className="hidden lg:inline">
              {aktiveStufe < STAGES.length - 1
                ? 'SCROLL // NÄCHSTES CODE-FENSTER'
                : 'SCROLL // WEITER ZUM INHALT'}
            </span>
            <button
              onClick={() => {
                if (aktiveStufe < STAGES.length - 1) {
                  wechsleStufe(aktiveStufe + 1);
                } else {
                  document.getElementById('profil')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex h-8 w-8 items-center justify-center rounded border border-linie bg-raum-2/80 text-signal transition-colors hover:border-signal"
            >
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* Looping Strip of Architectural Tech Labels (Bottom Edge) */}
      <div className="pointer-events-none relative z-10 w-full overflow-hidden border-t border-linie/40 bg-raum-2/40 py-2">
        <div className="flex w-max animate-[laufband_28s_linear_infinite] gap-8 font-mono-code text-[10px] tracking-[0.2em] text-text-3 uppercase">
          <span>[REACT_19_TYPESCRIPT]</span>
          <span>•</span>
          <span>[JAVA_21_SPRING_BOOT_3]</span>
          <span>•</span>
          <span>[POSTGRESQL_RELATIONAL_ACID]</span>
          <span>•</span>
          <span>[SPRING_DATA_JPA_SERVICES]</span>
          <span>•</span>
          <span>[SIMPLY_SWITCH_PRODUCTION_RELEASE]</span>
          <span>•</span>
          <span>[MATTER_JS_60FPS_PHYSICS]</span>
          <span>•</span>
          <span>[RESTFUL_API_ARCHITECTURE]</span>
          <span>•</span>
          <span>[REACT_19_TYPESCRIPT]</span>
          <span>•</span>
          <span>[JAVA_21_SPRING_BOOT_3]</span>
        </div>
      </div>
    </section>
  );
};

export default CineHero;

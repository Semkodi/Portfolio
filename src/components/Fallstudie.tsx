import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import type { Projekt } from '../data/inhalt';
import { audio } from '../utils/audio';
import {
  ExternalLink,
  Smartphone,
  Monitor,
  Zap,
  Layers,
  UploadCloud,
  ArrowRight,
} from 'lucide-react';

// Desktop Screenshots
import simplySwitchImg from '../assets/projekte/simply-switch.png';
import simplySwitchWizardImg from '../assets/projekte/simply-switch-wizard.jpg';
import simplySwitchUploadImg from '../assets/projekte/simply-switch-upload.jpg';

// Mobile Screenshots (Echte Smartphone-Aufnahmen!)
import simplySwitchMobileHomeImg from '../assets/projekte/simply-switch-mobile-home.jpg';
import simplySwitchMobileWizardImg from '../assets/projekte/simply-switch-mobile-wizard.jpg';
import simplySwitchMobileUploadImg from '../assets/projekte/simply-switch-mobile-upload.jpg';

interface FallstudieProps {
  projekt: Projekt;
}

export const Fallstudie: React.FC<FallstudieProps> = ({ projekt }) => {
  const { sprache } = benutzeSpracheSpeicher();

  // Ansichts-Modus: Desktop vs. Mobile
  const [ansicht, setAnsicht] = useState<'desktop' | 'mobile'>('desktop');

  // Aktive Inspektions-Phase (0 = Startseite, 1 = 4-Schritte-Wizard, 2 = Beleg-Upload)
  const [aktivePhase, setAktivePhase] = useState<number>(0);

  const phasen = [
    {
      nr: '01',
      titel: { de: 'Startseite & Tarifberatung', en: 'Landing & Premium Advice' },
      icon: Zap,
      kurz: {
        de: 'Kunden finden sofort das richtige Angebot: Schnelle Navigation, klare Vorteile und transparente Beratung.',
        en: 'Clients find the right policy instantly: Fast navigation, clear benefits and transparent advice.',
      },
      tech: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      badge: 'MODUL 01 // STARTSEITE & TARIFE',
      bildDesktop: simplySwitchImg,
      bildMobile: simplySwitchMobileHomeImg,
      pill: {
        titel: 'B2C PLATTFORM:',
        text: 'Echter Live-Betrieb • Schnelle Ladezeiten unter 1s',
      },
    },
    {
      nr: '02',
      titel: { de: '4-Schritte-Schadensmelder (Wizard)', en: '4-Step Claims Wizard' },
      icon: Layers,
      kurz: {
        de: 'Schritt für Schritt geführt: Schadensart, Details, Belege und Daten ohne Überforderung erfassen.',
        en: 'Step-by-step guidance: Claim category, details, documents and contact data without form fatigue.',
      },
      tech: ['Multi-Step Wizard', 'Zustand State', 'Typisierte DTOs', 'Zod Schema'],
      badge: 'MODUL 02 // 4-SCHRITTE WIZARD',
      bildDesktop: simplySwitchWizardImg,
      bildMobile: simplySwitchMobileWizardImg,
      pill: {
        titel: 'WIZARD-ENGINE:',
        text: 'Schritt 1 von 4 • 25% erledigt • Persistenter State',
      },
    },
    {
      nr: '03',
      titel: { de: 'Dokumenten- & Foto-Upload', en: 'Document & Photo Upload' },
      icon: UploadCloud,
      kurz: {
        de: 'Unfallfotos, Rechnungen und Berichte per Drag & Drop hochladen (mit Validierung bis 10 MB).',
        en: 'Upload damage photos, invoices and reports via drag & drop (validated up to 10 MB).',
      },
      tech: ['Drag & Drop API', 'File Validation', 'PostgreSQL DB', 'SSL/TLS'],
      badge: 'MODUL 03 // BELEG-UPLOAD',
      bildDesktop: simplySwitchUploadImg,
      bildMobile: simplySwitchMobileUploadImg,
      pill: {
        titel: 'UPLOAD-ENGINE:',
        text: 'Schritt 3 von 4 • 75% erledigt • Direkte Makler-Übergabe',
      },
    },
  ];

  const handleAnsichtWechsel = (modus: 'desktop' | 'mobile') => {
    setAnsicht(modus);
    audio.spieleKlick();
  };

  const handlePhaseWechsel = (idx: number) => {
    setAktivePhase(idx);
    audio.spieleBefehl();
  };

  const aktuellePhaseInfo = phasen[aktivePhase];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-linie-stark bg-raum-2/80 p-6 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
      {/* Background Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(212,163,115,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,163,115,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]"
      />

      {/* Top Header Bar: Status + Ansichts-Umschalter */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-linie pb-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-signal" />
          </span>
          <span className="font-mono-code text-[11.5px] font-semibold uppercase tracking-[0.2em] text-signal">
            FLAGSHIP CASE STUDY // LIVE IN PRODUKTION
          </span>
          <span className="hidden sm:inline font-mono-code text-[11px] text-text-3">
            [GEWERBLICHE FINTECH-PLATTFORM]
          </span>
        </div>

        {/* Device Switcher (Desktop ↔ Mobile) */}
        <div className="flex items-center gap-2 rounded-lg border border-linie bg-raum p-1 font-mono-code text-[11px]">
          <button
            type="button"
            onClick={() => handleAnsichtWechsel('desktop')}
            className={`flex items-center gap-1.5 rounded px-3 py-1 transition-all ${
              ansicht === 'desktop'
                ? 'bg-signal/20 text-signal font-semibold border border-signal/50 shadow-[0_0_8px_rgba(255,154,60,0.2)]'
                : 'text-text-3 hover:text-text'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>DESKTOP</span>
          </button>

          <button
            type="button"
            onClick={() => handleAnsichtWechsel('mobile')}
            className={`flex items-center gap-1.5 rounded px-3 py-1 transition-all ${
              ansicht === 'mobile'
                ? 'bg-signal/20 text-signal font-semibold border border-signal/50 shadow-[0_0_8px_rgba(255,154,60,0.2)]'
                : 'text-text-3 hover:text-text'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>MOBILE</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Live Mockup on Left, Architecture Breakdown on Right */}
      <div className="relative z-10 mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left: Device Mockup Frame (Desktop Browser vs. Echte Mobile Ansicht) */}
        <div className="lg:col-span-7 flex justify-center">
          {ansicht === 'desktop' ? (
            /* Desktop Browser Frame */
            <div className="w-full overflow-hidden rounded-xl border border-linie bg-raum shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between border-b border-linie bg-raum-3 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                  <a
                    href={projekt.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 flex items-center gap-2 rounded bg-raum-2 px-3 py-1 font-mono-code text-[11px] text-text-3 transition-colors hover:text-signal"
                  >
                    <span>https://simply-switch.de</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <span className="font-mono-code text-[10px] text-signal font-bold">
                  {aktuellePhaseInfo.badge}
                </span>
              </div>

              {/* Dynamic Image Viewport mit weichem Fade-Wechsel */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-raum-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`desktop-phase-${aktivePhase}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full w-full"
                  >
                    <img
                      src={aktuellePhaseInfo.bildDesktop}
                      alt={aktuellePhaseInfo.titel.de}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />

                    {/* Live Parameter Pill Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 sm:right-auto flex flex-wrap items-center gap-2 rounded-lg border border-signal/60 bg-raum/90 p-2.5 font-mono-code text-[11px] text-text shadow-lg backdrop-blur-md">
                      <span className="flex items-center gap-1.5 text-signal font-bold">
                        <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
                        <span>{aktuellePhaseInfo.pill.titel}</span>
                      </span>
                      <span className="text-text-2">{aktuellePhaseInfo.pill.text}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* Echter Smartphone Frame mit echten Mobile-Screenshots! */
            <div className="relative w-[280px] sm:w-[310px] overflow-hidden rounded-[2.8rem] border-[7px] border-[#2c2420] bg-black shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
              {/* Dynamic Island / Speaker Pill */}
              <div className="absolute top-2.5 inset-x-0 z-20 flex justify-center">
                <div className="h-4 w-24 rounded-full bg-black/90 border border-white/10" />
              </div>

              {/* Mobile Content Viewport */}
              <div className="relative aspect-[9/19] w-full overflow-hidden bg-raum-3 pt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mobile-phase-${aktivePhase}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full w-full"
                  >
                    <img
                      src={aktuellePhaseInfo.bildMobile}
                      alt={`${aktuellePhaseInfo.titel.de} Mobile`}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                    {/* Badge am unteren Rand des Handys */}
                    <div className="absolute bottom-3 inset-x-3 rounded-lg bg-raum/95 p-2 text-center font-mono-code text-[10px] text-signal border border-signal/40 shadow-lg backdrop-blur-sm">
                      {aktuellePhaseInfo.badge}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Right: Architecture Phases & Key Metrics */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="font-mono-code text-[11px] tracking-[0.2em] uppercase text-text-3">
              KUNDENPROJEKT // FULLSTACK DELIVERY
            </span>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
              simply switch
            </h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-text-2">
              {projekt.beschreibung[sprache]}
            </p>
          </div>

          {/* 3 Interactive Feature Tabs (Durchschalten ändert Desktop- und Mobile-Bild links!) */}
          <div className="space-y-3 pt-2">
            <span className="font-mono-code text-[10.5px] uppercase tracking-wider text-signal font-semibold">
              FUNKTIONEN DURCHSCHALTEN (ÄNDERT DIE VORSCHAU LINKS):
            </span>

            {phasen.map((phase, idx) => {
              const Icon = phase.icon;
              const istAktiv = aktivePhase === idx;

              return (
                <div
                  key={phase.nr}
                  onClick={() => handlePhaseWechsel(idx)}
                  className={`group cursor-pointer rounded-xl border p-4 transition-all duration-300 ${
                    istAktiv
                      ? 'border-signal bg-raum shadow-[0_4px_20px_rgba(255,154,60,0.18)] scale-[1.01]'
                      : 'border-linie bg-raum/40 hover:border-linie-stark hover:bg-raum/70 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded border transition-colors ${
                          istAktiv
                            ? 'border-signal bg-signal/20 text-signal'
                            : 'border-linie text-text-3 group-hover:text-text-2'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <h4
                        className={`font-mono-code text-[13px] font-semibold ${
                          istAktiv ? 'text-text' : 'text-text-2'
                        }`}
                      >
                        {phase.titel[sprache]}
                      </h4>
                    </div>

                    <span
                      className={`font-mono-code text-[10px] font-bold ${
                        istAktiv ? 'text-signal' : 'text-text-3'
                      }`}
                    >
                      {istAktiv ? '[AKTIV]' : phase.nr}
                    </span>
                  </div>

                  <p className="mt-2 text-[13px] leading-[1.6] text-text-2">
                    {phase.kurz[sprache]}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {phase.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-linie/80 bg-raum-2 px-2 py-0.5 font-mono-code text-[9.5px] text-text-3"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 gap-3 border-t border-linie pt-5">
            <div className="rounded border border-linie bg-raum/50 p-3 text-center">
              <span className="block text-xl font-bold text-signal">100%</span>
              <span className="font-mono-code text-[10px] uppercase text-text-3">Responsive</span>
            </div>
            <div className="rounded border border-linie bg-raum/50 p-3 text-center">
              <span className="block text-xl font-bold text-signal">&lt; 0.9s</span>
              <span className="font-mono-code text-[10px] uppercase text-text-3">Ladezeit</span>
            </div>
            <div className="rounded border border-linie bg-raum/50 p-3 text-center">
              <span className="block text-xl font-bold text-signal">Live</span>
              <span className="font-mono-code text-[10px] uppercase text-text-3">Betrieb</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <a
              href="https://simply-switch.de"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.spieleBefehl()}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-signal px-6 py-3.5 font-mono-code text-[13px] font-bold uppercase tracking-wider text-signal-tief shadow-[0_8px_30px_rgba(255,154,60,0.35)] transition-all hover:scale-[1.01] hover:bg-[#ffb066]"
            >
              <span>SIMPLY-SWITCH.DE LIVE TESTEN</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fallstudie;

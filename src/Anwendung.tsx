import React from 'react';
import Cursor from './components/Cursor';
import Atmosphaere from './components/Atmosphaere';
import Seitenleiste from './components/Seitenleiste';
import Statusleiste from './components/Statusleiste';
import Fussbereich from './components/Fussbereich';
import Marquee from './components/Marquee';
import CineHero from './sections/CineHero';
import ArchitekturBlueprint from './components/ArchitekturBlueprint';
import Profil from './sections/Profil';
import Werk from './sections/Werk';
import Skills from './sections/Skills';
import Werdegang from './sections/Werdegang';
import Terminal from './sections/Terminal';
import Kontakt from './sections/Kontakt';

const band = [
  'Java 21', 'Spring Boot 3', 'Spring Data JPA', 'Mendix Studio Pro', 'Microflows',
  'React 18', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'REST', 'Clean Code', 'Git',
];

/** Portfolio von Semir Borogovac — 2026. Design "Kontrollraum" mit Cinematic 3D Architecture Engine. */
const Anwendung: React.FC = () => (
  <div className="relative min-h-screen bg-raum text-text">
    <Cursor />
    <Atmosphaere />
    <Seitenleiste />
    <Statusleiste />

    <div className="relative z-[2] lg:pl-[88px]">
      <main className="mx-auto max-w-[1520px]">
        <CineHero />
        <Marquee eintraege={band} />
        <ArchitekturBlueprint />
        <Profil />
        <Werk />
        <Skills />
        <Werdegang />
        <Terminal />
        <Kontakt />
      </main>

      <div className="mx-auto max-w-[1520px]">
        <Fussbereich />
      </div>
    </div>
  </div>
);

export default Anwendung;

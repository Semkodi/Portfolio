import React from 'react';
import Cursor from './components/Cursor';
import Navigation from './components/Navigation';
import Fussbereich from './components/Fussbereich';
import Marquee from './components/Marquee';
import Hero from './sections/Hero';
import Profil from './sections/Profil';
import Werk from './sections/Werk';
import Skills from './sections/Skills';
import Werdegang from './sections/Werdegang';
import Terminal from './sections/Terminal';
import Kontakt from './sections/Kontakt';

const band = [
  'Java', 'Spring Boot', 'Mendix', 'React', 'TypeScript', 'PostgreSQL', 'REST', 'Git', 'Docker', 'Tailwind',
];

/** Portfolio von Semir Borogovac — 2026. Warmes, editoriales Design. */
const Anwendung: React.FC = () => (
  <div className="papier relative min-h-screen">
    <Cursor />
    <Navigation />

    <main className="relative z-[2]">
      <Hero />
      <Marquee eintraege={band} />
      <Profil />
      <Werk />
      <Skills />
      <Werdegang />
      <Terminal />
      <Kontakt />
    </main>

    <Fussbereich />
  </div>
);

export default Anwendung;

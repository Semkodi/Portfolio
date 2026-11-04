import type { Sprache } from '../speicher/spracheSpeicher';

/* =====================================================================
   Zentrale Inhalte des Portfolios (Deutsch / Englisch).
   Rein technischer Fokus.
   ===================================================================== */

type LS = Record<Sprache, string>;
type LA = Record<Sprache, string[]>;

export const profil = {
  name: 'Semir Borogovac',
  initialen: 'SB',
  rolle: {
    de: 'Fachinformatiker für Anwendungsentwicklung',
    en: 'Application Developer',
  } as LS,
  standort: {
    de: 'Limburg an der Lahn, Hessen',
    en: 'Limburg an der Lahn, Hesse, Germany',
  } as LS,
  email: 'borogovacsemir@gmail.com',
  github: 'https://github.com/semkodi',
  linkedin: 'https://www.linkedin.com/',
  verfuegbar: {
    de: 'Offen für neue Aufgaben',
    en: 'Open to work',
  } as LS,
};

export const ui = {
  nav: {
    home: { de: 'Start', en: 'Home' } as LS,
    terminal: { de: 'Terminal', en: 'Terminal' } as LS,
    ueber: { de: 'Über mich', en: 'About' } as LS,
    skills: { de: 'Skills', en: 'Skills' } as LS,
    projekte: { de: 'Projekte', en: 'Projects' } as LS,
    werdegang: { de: 'Werdegang', en: 'Career' } as LS,
    kontakt: { de: 'Kontakt', en: 'Contact' } as LS,
  },
  mehr: { de: 'Mehr erfahren', en: 'Learn more' } as LS,
  schliessen: { de: 'Schließen', en: 'Close' } as LS,
};

export const hero = {
  kicker: { de: 'Portfolio · 2027', en: 'Portfolio · 2027' } as LS,
  /* Dreizeilige Schlagzeile; Zeile 2 steht in Signalfarbe. */
  zeile1: { de: 'Eine meiner', en: 'One of my' } as LS,
  zeile2: { de: 'Anwendungen läuft', en: 'applications is' } as LS,
  zeile3: { de: 'gerade produktiv.', en: 'live in production.' } as LS,
  rollen: {
    de: ['Java & Spring Boot', 'Mendix Low-Code', 'React & TypeScript', 'REST-APIs & SQL'],
    en: ['Java & Spring Boot', 'Mendix Low-Code', 'React & TypeScript', 'REST APIs & SQL'],
  } as LA,
  intro: {
    de: 'Backend mit Java und Spring Boot, Enterprise-Low-Code mit Mendix, Oberflächen mit React und TypeScript. Gelernt in der Umschulung, geprüft an echten Projekten.',
    en: 'Backend with Java and Spring Boot, enterprise low-code with Mendix, interfaces with React and TypeScript. Learned in retraining, proven on real projects.',
  } as LS,
  ctaProjekte: { de: 'Arbeiten ansehen', en: 'View work' } as LS,
  ctaKontakt: { de: 'Kontakt aufnehmen', en: 'Get in touch' } as LS,
};

export const kennzahlen: { wert: string; label: LS }[] = [
  { wert: 'Java 21', label: { de: 'Backend & Spring Boot', en: 'Backend & Spring Boot' } },
  { wert: 'Mendix', label: { de: 'Enterprise Low-Code', en: 'Enterprise low-code' } },
  { wert: 'React 18', label: { de: 'TypeScript & Tailwind', en: 'TypeScript & Tailwind' } },
  { wert: 'PostgreSQL', label: { de: 'Datenmodellierung & SQL', en: 'Data modelling & SQL' } },
];

export const ueberMich = {
  titel: { de: 'Über mich', en: 'About me' } as LS,
  headline: {
    de: 'Struktur, saubere Architektur und ein Blick für das Ganze.',
    en: 'Structure, clean architecture and an eye for the whole system.',
  } as LS,
  absatz1: {
    de: 'In meiner Umschulung zum Fachinformatiker für Anwendungsentwicklung habe ich die Grundlagen objektorientierter Entwicklung, relationaler Datenbanken und moderner Web-Technologien von Grund auf gelernt und in praxisnahen Projekten angewendet.',
    en: 'During my retraining as an application developer I learned the fundamentals of object-oriented programming, relational databases and modern web technologies from the ground up and applied them in hands-on projects.',
  } as LS,
  absatz2: {
    de: 'Am liebsten arbeite ich an der Schnittstelle zwischen Backend-Logik und der Oberfläche: Datenmodelle sauber entwerfen, Geschäftslogik in klaren Services kapseln und das Ergebnis in einer verständlichen UI sichtbar machen.',
    en: 'I enjoy working at the seam between backend logic and the interface: designing clean data models, encapsulating business logic in clear services and making the result visible in an understandable UI.',
  } as LS,
  werte: [
    {
      titel: { de: 'Clean Code', en: 'Clean code' } as LS,
      text: {
        de: 'Wartbarer, modularer und testbarer Code nach SOLID-Prinzipien.',
        en: 'Maintainable, modular and testable code following SOLID principles.',
      } as LS,
    },
    {
      titel: { de: 'Lernbereit', en: 'Eager to learn' } as LS,
      text: {
        de: 'Jeden Tag ein Stück besser – neue Technologien, Muster und Werkzeuge.',
        en: 'A little better every day – new technologies, patterns and tools.',
      } as LS,
    },
    {
      titel: { de: 'Teamplayer', en: 'Team player' } as LS,
      text: {
        de: 'Klare Kommunikation, Code Reviews und gemeinsame Verantwortung.',
        en: 'Clear communication, code reviews and shared ownership.',
      } as LS,
    },
  ],
};

export const skillGruppen: {
  kategorie: LS;
  farbe: string;
  items: { name: string; info: LS }[];
}[] = [
  {
    kategorie: { de: 'Frontend & Web (Praxis)', en: 'Frontend & Web (Hands-on)' },
    farbe: '#cca35d',
    items: [
      { name: 'React', info: { de: 'Komponentenbasierte Oberflächen, State-Management und Hooks (eingesetzt bei simply-switch.de).', en: 'Component-driven interfaces, state management and hooks.' } },
      { name: 'TypeScript', info: { de: 'Strikte Typisierung von Daten und Props zur Vermeidung von Laufzeitfehlern.', en: 'Strict typing for data structures and props.' } },
      { name: 'Tailwind CSS', info: { de: 'Moderne, responsive Layouts für mobile Geräte und Desktop.', en: 'Modern responsive layouts across mobile and desktop.' } },
      { name: 'Git & GitHub', info: { de: 'Versionskontrolle, Commits, Branches und Team-Arbeit über GitHub.', en: 'Version control, commits, branching and collaboration.' } }
    ]
  },
  {
    kategorie: { de: 'Java & Backend-Grundlagen', en: 'Java & Backend Basics' },
    farbe: '#e0a35c',
    items: [
      { name: 'Java (OOP Grundlagen)', info: { de: 'Solide Grundlagen objektorientierter Programmierung: Klassen, Vererbung, Methoden.', en: 'Solid OOP fundamentals: classes, inheritance, methods.' } },
      { name: 'Spring Boot (Grundlagen)', info: { de: 'Erste Backend-Services, Controller-Aufbau und Strukturierung von REST-Endpunkten.', en: 'Backend service structuring and REST endpoint wiring.' } },
      { name: 'REST-APIs', info: { de: 'Verständnis für HTTP-Methoden, Status-Codes und JSON-Datenaustausch.', en: 'Core understanding of HTTP verbs, status codes and JSON payloads.' } }
    ]
  },
  {
    kategorie: { de: 'Datenbanken & Enterprise Tools', en: 'Databases & Enterprise Tools' },
    farbe: '#d47b52',
    items: [
      { name: 'PostgreSQL & SQL', info: { de: 'Relationale Tabellen anlegen, Primär- und Fremdschlüssel sowie SQL-Abfragen.', en: 'Relational schemas, keys and SQL queries.' } },
      { name: 'Mendix Studio Pro', info: { de: 'Visuelle Datenmodellierung, Microflow-Logik und Rollenberechtigungen im Ausbildungsbetrieb.', en: 'Visual data modeling, microflow workflows and security roles.' } },
      { name: 'Agiles Arbeiten (Scrum / Kanban)', info: { de: 'Arbeiten mit Tickets, Sprints und strukturierter Aufgabenverteilung im Entwickler-Alltag.', en: 'Working with backlog tickets and structured sprints.' } }
    ]
  }
];

export interface Projekt {
  id: string;
  kategorie: 'lowcode' | 'java' | 'web';
  badge: string;
  titel: string;
  untertitel: LS;
  beschreibung: LS;
  architektur: LS;
  highlights: LA;
  tags: string[];
  farbe: string;
  /** Pfad zu einem Vorschaubild/Screenshot. */
  bild?: string;
  /** Öffentlich erreichbare Adresse, falls das Projekt live ist. */
  live?: string;
  github?: string;
  /** Zahlen für das Live-Panel im Hero. Nur bei belegbaren Werten setzen. */
  kennzahlen?: { wert: number; suffix?: string; label: LS }[];
}

export const projekte: Projekt[] = [
  {
    id: 'simply-switch',
    kategorie: 'web',
    badge: 'KUNDENPROJEKT · LIVE',
    titel: 'Simply Switch',
    live: 'https://simply-switch.de',
    github: 'https://github.com/Semkodi/versicherung',
    bild: '/projekte/simply-switch.png',
    untertitel: {
      de: 'Fintech-Plattform für einen freien Versicherungsmakler',
      en: 'Fintech platform for an independent insurance broker',
    },
    beschreibung: {
      de: 'Produktiv im Einsatz: B2C-Fintech- und Maklerplattform für den Versicherungsmakler Sven Kegler. Getrennte Beratungsstrecken für Privatkunden, Beamte und Gewerbe, interaktiver Tarifrechner, geführter 4-Schritte-Schadensmelder mit Client-Bildkomprimierung und Simplr-Kundenportal-Anbindung.',
      en: 'In active production: B2C fintech and broker platform for independent broker Sven Kegler. Dedicated advisory journeys for private clients, civil servants and business clients, interactive quote calculator, 4-step claims wizard with client-side image compression and Simplr portal integration.',
    },
    architektur: {
      de: 'React 19 mit Vite und Tailwind CSS. Multipage-Routing, reaktive State-Machines für die Rechnerstrecken, barrierefreie Formulare nach WCAG 2.1 AA und PHP-Mailservice mit Spamschutz.',
      en: 'React 19 with Vite and Tailwind CSS. Multipage routing, reactive state machines for calculation funnels, accessible WCAG 2.1 AA forms and secure PHP mailer service with honeypot protection.',
    },
    highlights: {
      de: [
        '4-Schritte-Schadensmelder mit Client-seitiger Bildkomprimierung',
        'Interaktiver Bedarfs- und Tarifrechner mit Live-Ersparnis',
        'Vollständig barrierefrei nach WCAG 2.1 AA & Mobile-First optimiert',
        'Simplr-Kundenportal und sichere Terminanfrage-Integration',
      ],
      en: [
        '4-step claims wizard with client-side image compression',
        'Interactive coverage & rate calculator with instant savings',
        'Fully WCAG 2.1 AA accessible and mobile-first optimized',
        'Simplr customer portal and appointment booking integration',
      ],
    },
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'A11y WCAG 2.1', 'Zustand'],
    farbe: '#ff9a3c',
    kennzahlen: [
      { wert: 9, label: { de: 'Routen', en: 'Routes' } },
      { wert: 100, suffix: '%', label: { de: 'Responsive', en: 'Responsive' } },
    ],
  },
  {
    id: 'mendix-thm',
    kategorie: 'lowcode',
    badge: 'ENTERPRISE LOW-CODE',
    titel: 'Mendix THM Enterprise Platform',
    untertitel: {
      de: 'Domain Models, Microflows, 12 Tickets & Rollenkonzept',
      en: 'Domain models, microflows, 12 tickets & permissions',
    },
    beschreibung: {
      de: 'Umfangreiche Hochschul- und Unternehmensanwendung zur Digitalisierung und Prozessautomatisierung an der THM Wetzlar (Isy-Suite). Erfolgreicher Abschluss von 12 Feature-Tickets im Produktivsystem rund um Studienbewerber, EIEM-Praktikumsplätze und intuitive Benutzeroberflächen.',
      en: 'Extensive higher-education enterprise application digitising student operations at THM Wetzlar (Isy-Suite). Successfully completed 12 production feature tickets covering student applicants, EIEM internships, and intuitive interfaces.',
    },
    architektur: {
      de: 'Strukturiertes Mendix Domain Model mit Validierungsregeln, Microflows & Nanoflows für komplexe Geschäftslogiken, feingliedrige Sicherheitsrollen und bidirektionaler Datenaustausch mit PostgreSQL-Datenbanken.',
      en: 'Structured Mendix domain models with validation rules, microflows & nanoflows for business logic, granular security roles and bidirectional PostgreSQL database persistence.',
    },
    highlights: {
      de: [
        '12 Feature-Tickets im Produktivbetrieb der THM eigenständig umgesetzt',
        'Domain-Modelle für Studienbewerber und EIEM-Praktikumsverwaltung',
        'Feingliedriges Rechte- und Sicherheitskonzept mit Nutzerrollen',
        'Mitarbeit an Modulen wie IsyStarterSolution, IsyEvent und Datenbereinigung',
      ],
      en: [
        '12 feature tickets independently delivered in THM production system',
        'Domain models for student applicants and EIEM internship placement',
        'Granular role-based security concepts and user permissions',
        'Contributed to core modules including IsyStarterSolution, IsyEvent and data hygiene',
      ],
    },
    tags: ['Mendix Studio Pro', '12 Tickets', 'Microflows', 'Domain Models', 'PostgreSQL', 'THM Wetzlar'],
    farbe: '#d47b52',
  },
  {
    id: 'ibv',
    kategorie: 'web',
    badge: 'B2B WEBKATALOG · LIVE',
    titel: 'IBV Engelhardt — B2B Produktkatalog',
    live: 'https://semkodi.github.io/ibv/',
    github: 'https://github.com/Semkodi/ibv',
    untertitel: {
      de: 'React 19, TypeScript, React Router 7 & Digitaler Anfragekorb',
      en: 'React 19, TypeScript, React Router 7 & Digital RFQ Cart',
    },
    beschreibung: {
      de: 'Digitaler B2B-Produktkatalog für induktive Bauelemente, Ferritkerne und Spulenkörper der IBV Engelhardt. Ermöglicht Geschäftskunden das gezielte Filtern technischer Bauteile nach Kerngeometrie und Werkstoffen sowie das direkte Absenden strukturierter Projekt-Anfragen.',
      en: 'Digital B2B component catalogue for ferrite cores and inductive components for IBV Engelhardt. Allows industrial customers to filter technical components by core geometry and materials, and assemble direct RFQ project inquiries.',
    },
    architektur: {
      de: 'Modernster Stack auf Basis von React 19, TypeScript und React Router 7. Performante Client-Filterung tausender Bauteilvarianten, reaktiver Warenkorb-State und responsives Industrie-Layout mit Tailwind CSS.',
      en: 'Modern architecture built with React 19, TypeScript and React Router 7. High-performance client-side filtering across component specs, reactive cart state management and industrial responsive layout with Tailwind CSS.',
    },
    highlights: {
      de: [
        'Reaktiver B2B-Anfragekorb mit Mengenkalkulation & Notizfunktion',
        'Schnellfilter nach Bauformen, Kernwerkstoffen, Abmessungen und Toleranzen',
        'Neueste React 19 Features & strikte TypeScript Typensicherheit',
        'Automatisierte Datenaufbereitung für industrielle Produktserien',
      ],
      en: [
        'Reactive B2B inquiry cart with quantity calculation & custom project notes',
        'Instant multi-parameter filters for core geometries, materials and tolerances',
        'Leveraging cutting-edge React 19 architecture with strict TypeScript types',
        'Structured product catalog data pipelines for industrial series',
      ],
    },
    tags: ['React 19', 'TypeScript', 'React Router 7', 'Tailwind CSS', 'State Management', 'B2B'],
    farbe: '#38bdf8',
  },
  {
    id: 'bepo',
    kategorie: 'web',
    badge: 'HANDWERK SHOWCASE · LIVE',
    titel: 'Meisterbetrieb Giuseppe Milazzo',
    live: 'https://semkodi.github.io/Bepo/',
    github: 'https://github.com/Semkodi/Bepo',
    untertitel: {
      de: 'React, Tailwind CSS, Framer Motion & Anfrage-Funnel',
      en: 'React, Tailwind CSS, Framer Motion & Inquiry Funnel',
    },
    beschreibung: {
      de: 'Repräsentativer Webauftritt und digitale Neukunden-Akquise für den regionalen Handwerks-Meisterbetrieb Giuseppe Milazzo (Fenster-, Türen- und Rollladenbau). Entwickelt mit Fokus auf lokales Vertrauen, visuelle Leistungspräsentation und unkomplizierte Beratungsanfragen.',
      en: 'High-converting web presence and customer acquisition platform for master craftsman Giuseppe Milazzo (windows, doors, roller shutters). Built to foster local credibility, visual portfolio showcases and seamless consultation booking.',
    },
    architektur: {
      de: 'Single Page Application in React mit Tailwind CSS. Animierte Übergänge und Scroll-Reveals mit Framer Motion, optimierte Bild-Assets und conversion-optimierte Kontaktstrecken.',
      en: 'Responsive React single-page application styled with Tailwind CSS. Smooth animated interactions and scroll reveals with Framer Motion, optimized responsive media and conversion-focused contact funnels.',
    },
    highlights: {
      de: [
        'Interaktiver Leistungsüberblick für Fenster, Rollläden & Insektenschutz',
        'Geführter Anfrage-Funnel für Eigenheimbesitzer & Modernisierer',
        'Flüssige Scroll-Animationen und Mikro-Interaktionen mit Framer Motion',
        '100% mobiloptimiert für schnelle Kontaktaufnahme via Smartphone',
      ],
      en: [
        'Interactive service overview for windows, shutters and insect screens',
        'Guided consultation request funnel for home owners and renovators',
        'Smooth scroll mechanics and micro-interactions via Framer Motion',
        '100% mobile-optimized for instant smartphone contact',
      ],
    },
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Lead Funnel', 'Mobile First'],
    farbe: '#4ade80',
  },
  {
    id: 'portfolio',
    kategorie: 'web',
    badge: 'INTERAKTIV · OPEN SOURCE',
    titel: 'Dieses Portfolio',
    live: 'https://semirborogovac.de',
    github: 'https://github.com/Semkodi/Portfolio',
    untertitel: {
      de: 'React 18, Three.js 3D-Engine, Audio & CLI-Terminal',
      en: 'React 18, Three.js 3D Engine, Audio & CLI Terminal',
    },
    beschreibung: {
      de: 'Industrielles Kontrollraum-Portfolio zur interaktiven Präsentation von Architektur, Clean Code und Fullstack-Kompetenz. Ausgestattet mit interaktiver Three.js 3D-Code-Engine, reaktivem Sound-System via Web Audio API, interaktivem Terminal und voller Zweisprachigkeit (DE/EN).',
      en: 'Industrial control-room developer portfolio showcasing system architecture, clean code and fullstack engineering. Powered by an interactive Three.js 3D engine, Web Audio API sound effects, an interactive CLI terminal and full DE/EN localization.',
    },
    architektur: {
      de: 'React 18 & TypeScript mit Vite, Tailwind CSS und Framer Motion. Direkte Three.js Canvas-Steuerung synchron zum Scroll-Fortschritt, Matter.js Physik-Effekte, IntersectionObserver-Navigation und null externe CDN-Abhängigkeiten.',
      en: 'React 18 & TypeScript with Vite, Tailwind CSS and Framer Motion. Scroll-driven Three.js camera transitions, Matter.js physics interactions, custom Web Audio synthesis and zero external CDN requests.',
    },
    highlights: {
      de: [
        'Three.js 3D-Workspace mit scroll-synchronisierten Perspektivwechseln',
        'Interaktives CLI-Terminal mit dynamischer Befehlsauswertung',
        'Subtiles Audio-Feedback-System über native Web Audio API',
        'A11y-Audit 95+ und performante 60-FPS-Scrollmechanik',
      ],
      en: [
        'Three.js 3D workspace with scroll-synchronized perspective shifts',
        'Interactive CLI terminal with dynamic command parsing and execution',
        'Subtle audio feedback powered by native Web Audio API synthesis',
        'A11y audit score 95+ and smooth 60 FPS scroll performance',
      ],
    },
    tags: ['React 18', 'TypeScript', 'Three.js 3D', 'Web Audio API', 'Tailwind CSS', 'Framer Motion'],
    farbe: '#cca35d',
  },
];

export interface Station {
  zeitraum: LS;
  titel: LS;
  organisation: LS;
  badge: LS;
  beschreibung: LS;
  punkte: LA;
}

export const werdegang: Station[] = [
  {
    zeitraum: { de: '02/2025 – 01/2027', en: '02/2025 – 01/2027' },
    titel: {
      de: 'Umschulung zum Fachinformatiker für Anwendungsentwicklung',
      en: 'Retraining as Software Developer (FIAE)',
    },
    organisation: {
      de: 'IBB Hachenburg · Praxisphase THM Wetzlar (IHK Koblenz)',
      en: 'IBB Hachenburg · Practical phase at THM Wetzlar (IHK Koblenz)',
    },
    badge: { de: 'IHK-Abschluss 01/2027', en: 'IHK Degree 01/2027' },
    beschreibung: {
      de: 'Fundierte Ausbildung zum Fachinformatiker für Anwendungsentwicklung. Schwerpunkt auf Mendix Low-Code-Entwicklung an der THM Wetzlar, moderne Single-Page-Apps mit React & TypeScript sowie objektorientierte Backend-Services mit Java & Spring Boot.',
      en: 'In-depth software engineering qualification. Focus on Mendix enterprise development at THM Wetzlar, modern React & TypeScript applications, and object-oriented backend services with Java & Spring Boot.',
    },
    punkte: {
      de: [
        'Mendix-Entwicklung: Domain-Modelle, Microflows, Nanoflows & Sicherheitsrollen',
        '12 abgeschlossene Tickets im THM-Projekt (Studienbewerber, EIEM-Praktikumsplätze)',
        'Mitarbeit an Mendix-Projekten im Isy-Suite-Umfeld (u. a. IsyStarterSolution, IsyEvent)',
        'Produktive Web-Entwicklung: simply-switch.de (React, TS) & interaktives Portfolio',
      ],
      en: [
        'Mendix development: domain models, microflows, nanoflows & security roles',
        '12 completed tickets in THM platform (student applicants, internship portals)',
        'Enterprise Mendix projects in Isy-Suite ecosystem (IsyStarterSolution, IsyEvent)',
        'Shipped web applications: simply-switch.de (React, TS) & interactive portfolio',
      ],
    },
  },
  {
    zeitraum: { de: '02/2023 – 11/2024', en: '02/2023 – 11/2024' },
    titel: {
      de: 'Triebfahrzeugführer',
      en: 'Train Driver (Long-Distance Passenger Rail)',
    },
    organisation: {
      de: 'Deutsche Bahn Fernverkehr AG · Frankfurt am Main',
      en: 'Deutsche Bahn Fernverkehr AG · Frankfurt am Main',
    },
    badge: { de: 'Verantwortung & Präzision', en: 'Responsibility & Precision' },
    beschreibung: {
      de: 'Führen von Zügen im bundesweiten Fernverkehrsnetz unter strikter Einhaltung komplexer Regelwerke und Zugsicherungssysteme. Höchste Konzentration, Stressresistenz und eigenverantwortliches Handeln unter Echtzeit-Bedingungen.',
      en: 'Operating high-speed and long-distance trains nationwide under strict safety protocols and train protection systems. High concentration, stress resilience, and accountable decision-making in real-time operations.',
    },
    punkte: {
      de: [
        'Volle Verantwortung für Fahrgastsicherheit, Betriebsabläufe und Pünktlichkeit',
        'Sicherer Umgang mit komplexen elektronischen Fahrzeug- und Leitsystemen',
        'Analytische Fehlerdiagnose und schnelles Handeln bei Betriebsstörungen',
        'Strikte Einhaltung von Sicherheitsrichtlinien und Protokollen',
      ],
      en: [
        'Full operational accountability for passenger safety and on-time performance',
        'Operating and monitoring complex train control and electrical systems',
        'Analytical fault diagnosis and rapid response during operational deviations',
        'Strict adherence to mission-critical safety standards and protocols',
      ],
    },
  },
  {
    zeitraum: { de: '07/2017 – 01/2023', en: '07/2017 – 01/2023' },
    titel: {
      de: 'Vorarbeiter & Baustellenleitung / Polier',
      en: 'Foreman & Site Lead / Construction Supervisor',
    },
    organisation: {
      de: 'Wilhelm Schütz Straßenbau GmbH / S&N Tiefbau GmbH',
      en: 'Wilhelm Schütz Straßenbau GmbH / S&N Tiefbau GmbH',
    },
    badge: { de: 'Führung & Koordination', en: 'Leadership & Execution' },
    beschreibung: {
      de: 'Verantwortliche Leitung und Führung gewerblicher Teams auf anspruchsvollen Infrastruktur-Baustellen. Koordination von Arbeitsabläufen, Material- und Personaldisposition sowie Sicherstellung von Termintreue und Qualitätsstandards.',
      en: 'Leading teams of 4–5 specialists on demanding infrastructure sites. Coordinating daily operations, resource planning, schedule adherence, and quality control under strict deadlines.',
    },
    punkte: {
      de: [
        'Teamleitung und Führung von 4 bis 5 Fachkräften auf Baustellen',
        'Koordination von Bauabläufen, Materialdisposition und Maschineneinsatz',
        'Praktische Problemlösung vor Ort unter hohem Zeit- und Termindruck',
        'Hohe Zuverlässigkeit, Durchsetzungsstärke und klare Kommunikation',
      ],
      en: [
        'Team leadership and direct supervision of 4 to 5 crew members',
        'Coordinating site workflows, logistics, materials, and equipment',
        'Hands-on pragmatic problem solving under strict deadlines',
        'High dependability, assertiveness, and clear team communication',
      ],
    },
  },
];

export const kontakt = {
  titel: { de: 'Kontakt', en: 'Contact' } as LS,
  text: {
    de: 'Ich bin offen für neue berufliche Aufgaben und spannende Projekte. Schreib mir gern direkt.',
    en: 'I am open to new roles and interesting projects. Feel free to reach out directly.',
  } as LS,
  formName: { de: 'Dein Name', en: 'Your name' } as LS,
  formEmail: { de: 'Deine E-Mail', en: 'Your email' } as LS,
  formNachricht: { de: 'Deine Nachricht', en: 'Your message' } as LS,
  formSenden: { de: 'Nachricht senden', en: 'Send message' } as LS,
  kopiert: { de: 'E-Mail kopiert', en: 'Email copied' } as LS,
  emailKopieren: { de: 'E-Mail kopieren', en: 'Copy email' } as LS,
  ortszeit: { de: 'Ortszeit', en: 'Local time' } as LS,
  clientGeoeffnet: { de: 'E-Mail-Programm geöffnet.', en: 'Email client opened.' } as LS,
  sendetStatus: { de: 'Wird gesendet...', en: 'Sending message...' } as LS,
  gesendetErfolg: {
    de: 'Danke für die Kontaktaufnahme! Deine Nachricht wurde versendet und eine Bestätigung ist per E-Mail unterwegs.',
    en: 'Thank you for reaching out! Your message was sent and a confirmation email is on its way.',
  } as LS,
  fehlerStatus: {
    de: 'Fehler beim Senden. Bitte schreib mir direkt an borogovacsemir@gmail.com',
    en: 'Error sending message. Please email me directly at borogovacsemir@gmail.com',
  } as LS,
};

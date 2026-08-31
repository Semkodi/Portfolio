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
    de: 'Dornburg, Hessen',
    en: 'Dornburg, Hesse, Germany',
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
  kicker: { de: 'Portfolio · 2026', en: 'Portfolio · 2026' } as LS,
  titel1: { de: 'Ich baue', en: 'I build' } as LS,
  titel2: { de: 'saubere Software.', en: 'clean software.' } as LS,
  rollen: {
    de: ['Java & Spring Boot', 'Mendix Low-Code', 'React & TypeScript', 'REST-APIs & SQL'],
    en: ['Java & Spring Boot', 'Mendix Low-Code', 'React & TypeScript', 'REST APIs & SQL'],
  } as LA,
  intro: {
    de: 'Fachinformatiker für Anwendungsentwicklung mit Fokus auf wartbarem Backend-Code, Enterprise-Low-Code und modernen Web-Oberflächen. Ich lerne schnell und setze Wissen direkt in Projekten um.',
    en: 'Application developer focused on maintainable backend code, enterprise low-code and modern web interfaces. I learn fast and turn knowledge straight into working projects.',
  } as LS,
  ctaProjekte: { de: 'Projekte ansehen', en: 'View projects' } as LS,
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
  items: { name: string; level: number }[];
}[] = [
  {
    kategorie: { de: 'Backend & Java', en: 'Backend & Java' },
    farbe: '#e0a35c',
    items: [
      { name: 'Java 21', level: 85 },
      { name: 'Spring Boot 3', level: 80 },
      { name: 'Spring Data JPA / Hibernate', level: 76 },
      { name: 'REST-API Design', level: 82 },
      { name: 'JUnit 5 & Tests', level: 72 },
      { name: 'Maven', level: 74 },
    ],
  },
  {
    kategorie: { de: 'Low-Code & Mendix', en: 'Low-code & Mendix' },
    farbe: '#d47b52',
    items: [
      { name: 'Mendix Studio Pro', level: 88 },
      { name: 'Domain Models & Entities', level: 85 },
      { name: 'Microflows & Nanoflows', level: 84 },
      { name: 'Rollen & Berechtigungen', level: 80 },
      { name: 'REST-Integration', level: 78 },
    ],
  },
  {
    kategorie: { de: 'Frontend & Web', en: 'Frontend & web' },
    farbe: '#cca35d',
    items: [
      { name: 'React 18 & Hooks', level: 80 },
      { name: 'TypeScript', level: 78 },
      { name: 'Tailwind CSS', level: 84 },
      { name: 'HTML5 & Barrierefreiheit', level: 82 },
      { name: 'Framer Motion', level: 72 },
    ],
  },
  {
    kategorie: { de: 'Daten & Werkzeuge', en: 'Data & tooling' },
    farbe: '#a7ad82',
    items: [
      { name: 'PostgreSQL & SQL', level: 80 },
      { name: 'Git & GitHub', level: 84 },
      { name: 'Docker (Basics)', level: 68 },
      { name: 'Scrum / Kanban', level: 80 },
      { name: 'Linux / CLI', level: 74 },
    ],
  },
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
}

export const projekte: Projekt[] = [
  {
    id: 'mendix-thm',
    kategorie: 'lowcode',
    badge: 'ENTERPRISE LOW-CODE',
    titel: 'Mendix THM Enterprise Platform',
    untertitel: {
      de: 'Domain Models, Microflows & Rollenkonzept',
      en: 'Domain models, microflows & role concept',
    },
    beschreibung: {
      de: 'Umfangreiche Unternehmensanwendung zur Digitalisierung von Geschäftsprozessen mit granularem Rollen- und Rechtesystem, automatisierten Microflow-Workflows und REST-Schnittstellen.',
      en: 'Comprehensive enterprise application digitising business processes with a granular role and permission system, automated microflow workflows and REST interfaces.',
    },
    architektur: {
      de: 'Strukturiertes Mendix Domain Model mit Validierungsregeln, Microflows für die Geschäftslogik und bidirektionaler REST-Datenaustausch mit einer SQL-Datenbank.',
      en: 'Structured Mendix domain model with validation rules, microflows for business logic and bidirectional REST data exchange with a SQL database.',
    },
    highlights: {
      de: [
        'Feingliedriges Rechtesystem & Benutzerrollen',
        'Automatisierte Validierung über Microflows',
        'REST-Anbindung an Drittsysteme',
      ],
      en: [
        'Granular permission system & user roles',
        'Automated validation via microflows',
        'REST integration with third-party systems',
      ],
    },
    tags: ['Mendix Studio Pro', 'Domain Models', 'Microflows', 'PostgreSQL', 'REST'],
    farbe: '#d47b52',
  },
  {
    id: 'devgram',
    kategorie: 'java',
    badge: 'JAVA & SPRING BOOT',
    titel: 'DevGram',
    untertitel: {
      de: 'Java 21, Spring Boot & Code-Sharing',
      en: 'Java 21, Spring Boot & code sharing',
    },
    beschreibung: {
      de: 'Soziales Netzwerk für Entwickler zum Teilen, Diskutieren und Bewerten von Code-Snippets, mit einem Spring Boot REST-Backend.',
      en: 'A social network for developers to share, discuss and rate code snippets, backed by a Spring Boot REST API.',
    },
    architektur: {
      de: 'Java 21 & Spring Boot 3 mit Spring Data JPA, PostgreSQL, JWT-Authentifizierung und einem React-Frontend mit Syntax-Highlighting.',
      en: 'Java 21 & Spring Boot 3 with Spring Data JPA, PostgreSQL, JWT authentication and a React frontend with syntax highlighting.',
    },
    highlights: {
      de: [
        'Saubere Schichtung: Controller / Service / Repository',
        'JWT-Authentifizierung & geschützte Endpunkte',
        'Tag-Suche und Bewertungslogik',
      ],
      en: [
        'Clean layering: controller / service / repository',
        'JWT authentication & protected endpoints',
        'Tag search and rating logic',
      ],
    },
    tags: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'JWT', 'React'],
    farbe: '#e0a35c',
  },
  {
    id: 'lovehub',
    kategorie: 'web',
    badge: 'FULLSTACK WEB',
    titel: 'LoveHub',
    untertitel: {
      de: 'React, TypeScript & Echtzeit-Chat',
      en: 'React, TypeScript & real-time chat',
    },
    beschreibung: {
      de: 'Social- und Dating-Plattform mit Fokus auf klare UX, Matching nach Präferenzen und einen reaktiven Echtzeit-Chat.',
      en: 'A social and dating platform focused on clear UX, preference-based matching and a reactive real-time chat.',
    },
    architektur: {
      de: 'React 18 & TypeScript Frontend mit Zustand für State Management, WebSocket-Verbindungen für Instant Messaging und einem modularen Tailwind-Designsystem.',
      en: 'React 18 & TypeScript frontend with Zustand for state management, WebSocket connections for instant messaging and a modular Tailwind design system.',
    },
    highlights: {
      de: [
        'Echtzeit-Chat & Typing-Status über WebSockets',
        'Präferenz- und Entfernungsfilter',
        'Responsive Micro-Interaktionen',
      ],
      en: [
        'Real-time chat & typing status via WebSockets',
        'Preference and distance filters',
        'Responsive micro-interactions',
      ],
    },
    tags: ['React 18', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Zustand'],
    farbe: '#cf9a75',
  },
  {
    id: 'portfolio',
    kategorie: 'web',
    badge: 'INTERAKTIV · 3D & CLI',
    titel: 'Dieses Portfolio',
    untertitel: {
      de: 'Canvas-Partikel, Scroll-Effekte & Terminal',
      en: 'Canvas particles, scroll effects & terminal',
    },
    beschreibung: {
      de: 'Diese Website: ein selbst gebautes Partikel-Monogramm im Canvas, scroll-getriebene Animationen, ein interaktives Terminal und volle Zweisprachigkeit (DE/EN).',
      en: 'This website: a hand-built canvas particle monogram, scroll-driven animations, an interactive terminal and full DE/EN localisation.',
    },
    architektur: {
      de: 'React 18 & TypeScript, Vite, Tailwind CSS v4, Framer Motion für Scroll-Animationen und eine eigene Canvas-2D-Projektion für den 3D-Effekt – ohne schwere 3D-Bibliothek.',
      en: 'React 18 & TypeScript, Vite, Tailwind CSS v4, Framer Motion for scroll animations and a custom canvas 2D projection for the 3D effect – without a heavy 3D library.',
    },
    highlights: {
      de: [
        'Eigene 3D-Punktwolke, Maus-reaktiv',
        'Scroll-Reveal & Parallax durchgängig',
        'Interaktives Terminal mit Befehlen',
      ],
      en: [
        'Custom 3D point cloud, mouse-reactive',
        'Scroll reveal & parallax throughout',
        'Interactive terminal with commands',
      ],
    },
    tags: ['React 18', 'TypeScript', 'Vite', 'Tailwind v4', 'Framer Motion', 'Canvas'],
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
    zeitraum: { de: '2023 – 2025', en: '2023 – 2025' },
    titel: {
      de: 'Umschulung zum Fachinformatiker für Anwendungsentwicklung',
      en: 'Retraining as an application developer',
    },
    organisation: { de: 'IHK · Kooperation mit der THM', en: 'IHK · in cooperation with THM' },
    badge: { de: 'IHK-Abschluss', en: 'IHK certificate' },
    beschreibung: {
      de: 'Theoretische und praktische Ausbildung mit Schwerpunkt auf objektorientierter Software-Entwicklung, Datenbanken und Web-Technologien.',
      en: 'Academic and practical training focused on object-oriented software development, databases and web technologies.',
    },
    punkte: {
      de: [
        'Java, Spring Boot, REST-Architektur und Clean Code',
        'Low-Code-Entwicklung mit Mendix Studio Pro',
        'Frontend mit React, TypeScript und modernen UI-Systemen',
        'Relationale Datenmodellierung mit PostgreSQL',
      ],
      en: [
        'Java, Spring Boot, REST architecture and clean code',
        'Low-code development with Mendix Studio Pro',
        'Frontend with React, TypeScript and modern UI systems',
        'Relational data modelling with PostgreSQL',
      ],
    },
  },
  {
    zeitraum: { de: '2024 – 2025', en: '2024 – 2025' },
    titel: { de: 'Praxisprojekte', en: 'Hands-on projects' },
    organisation: { de: 'Umschulung & eigenständig', en: 'Retraining & self-directed' },
    badge: { de: 'Projektarbeit', en: 'Project work' },
    beschreibung: {
      de: 'Umsetzung mehrerer Anwendungen von der Datenmodellierung bis zur Oberfläche – einzeln und im Team.',
      en: 'Building several applications from data model to interface – solo and in a team.',
    },
    punkte: {
      de: [
        'Mendix THM Enterprise Platform',
        'DevGram – Java & Spring Boot',
        'LoveHub – React & TypeScript',
      ],
      en: [
        'Mendix THM enterprise platform',
        'DevGram – Java & Spring Boot',
        'LoveHub – React & TypeScript',
      ],
    },
  },
  {
    zeitraum: { de: 'Fortlaufend', en: 'Ongoing' },
    titel: { de: 'Kontinuierliche Weiterbildung', en: 'Continuous learning' },
    organisation: { de: 'Autodidaktisch & Zertifizierungen', en: 'Self-taught & certifications' },
    badge: { de: 'Lifelong Learning', en: 'Lifelong learning' },
    beschreibung: {
      de: 'Vertiefung moderner Architekturen, Clean-Code-Praktiken und Cloud-Grundlagen.',
      en: 'Deepening modern architectures, clean-code practices and cloud fundamentals.',
    },
    punkte: {
      de: [
        'Mendix Rapid Developer',
        'Docker, CI/CD und Microservice-Muster',
        'Eigene Open-Source- und Portfolio-Projekte',
      ],
      en: [
        'Mendix Rapid Developer',
        'Docker, CI/CD and microservice patterns',
        'Own open-source and portfolio projects',
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
};

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
    bild: '/projekte/simply-switch.png',
    untertitel: {
      de: 'Website für einen freien Versicherungsmakler',
      en: 'Website for an independent insurance broker',
    },
    beschreibung: {
      de: 'Auftritt eines freien Versicherungsmaklers – von mir umgesetzt und ausgeliefert. Getrennte Beratungsstrecken für Beamte und Privatkunden, Terminbuchung, Schadenmeldung und eingebundene Google-Bewertungen.',
      en: 'The site of an independent insurance broker – built and shipped by me. Separate advisory paths for civil servants and private clients, appointment booking, claims reporting and embedded Google reviews.',
    },
    architektur: {
      de: 'React 18 mit Vite und Tailwind CSS. Neun Seiten mit eigenem Routing, Komponenten je Zielgruppe getrennt, durchgängig responsiv und auf Auffindbarkeit optimiert.',
      en: 'React 18 with Vite and Tailwind CSS. Nine pages with their own routing, components split per audience, fully responsive and optimised for search.',
    },
    highlights: {
      de: [
        'Getrennte Strecken für Beamte und Privatkunden',
        'Terminbuchung und Schadenmeldung',
        'Google-Bewertungen des Maklers eingebunden',
      ],
      en: [
        'Separate paths for civil servants and private clients',
        'Appointment booking and claims reporting',
        "The broker's Google reviews embedded",
      ],
    },
    tags: ['React 18', 'Vite', 'Tailwind CSS', 'Routing', 'SEO'],
    farbe: '#ff9a3c',
    kennzahlen: [
      { wert: 9, label: { de: 'Routen', en: 'Routes' } },
    ],
  },
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
    id: 'portfolio',
    kategorie: 'web',
    badge: 'INTERAKTIV · CLI',
    titel: 'Dieses Portfolio',
    untertitel: {
      de: 'Scroll-Reveals, Live-Zähler & Terminal',
      en: 'Scroll reveals, live counters & terminal',
    },
    beschreibung: {
      de: 'Diese Website: scroll-getriebene Einblendungen, eine Navigation, die per IntersectionObserver mitläuft, hochzählende Kennzahlen, ein interaktives Terminal und volle Zweisprachigkeit (DE/EN).',
      en: 'This website: scroll-driven reveals, navigation that follows along via IntersectionObserver, counting-up figures, an interactive terminal and full DE/EN localisation.',
    },
    architektur: {
      de: 'React 18 & TypeScript, Vite, Tailwind CSS v4 mit eigenem Token-Set, Framer Motion für die Reveals. Schriften liegen lokal, es geht kein Request an ein CDN.',
      en: 'React 18 & TypeScript, Vite, Tailwind CSS v4 with a custom token set, Framer Motion for the reveals. Fonts are served locally, no request goes to a CDN.',
    },
    highlights: {
      de: [
        'Navigation folgt der Sektion im Blickfeld',
        'Kennzahlen zählen beim Erscheinen hoch',
        'Interaktives Terminal mit Befehlen',
      ],
      en: [
        'Navigation follows the section in view',
        'Figures count up when they appear',
        'Interactive terminal with commands',
      ],
    },
    tags: ['React 18', 'TypeScript', 'Vite', 'Tailwind v4', 'Framer Motion'],
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

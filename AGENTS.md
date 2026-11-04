# Projekt-Gedächtnis & Entwicklungs-Richtlinien (AGENTS.md)

Dieses Dokument hält alle Kernentscheidungen, Architekturmuster, Design-Vorgaben und Verhaltensregeln für das **FIAE Developer Portfolio** fest.

---

## 📌 Projektübersicht
- **Name:** Interaktives Fullstack Developer Portfolio (FIAE Umschulung)
- **Fokus / Profil:** Fullstack Softwareentwickler (Frontend: **React & TypeScript**, Backend: **Java & Enterprise APIs / Spring Boot**).
- **Zielgruppe:** Recruiter, Tech-Leads, Ausbildungsbetriebe & Entwicklungsteams für Bewerbungen.
- **Tech-Stack:** React 18/19, TypeScript, Vite, Tailwind CSS, Framer Motion, Matter.js (Physik/Interaktivität), Zustand, Lucide React.
- **Primäre Case Studies:**
  1. **simply switch** – Versicherungsmakler Web-App (Tarifrechner, Schadensmelder, Wizard-Architektur, Lead-Funnel).
  2. **Interaktives Portfolio** – Diese Web-App selbst als Showcase für moderne Architektur, Matter.js-Physik, Performance & Clean Code.
  3. *(Roadmap)* **Java / Spring Boot Backend API & Microservices**.

---

## 🎨 Design- & Ästhetik-Regeln (STRIKT BEACHTEN)

1. **Farbwelt – Clean Dark Warm Brown / Mocha / Espresso:**
   - **KEIN generisches, kaltes #000000 Schwarz!**
   - Stattdessen: Hochwertige, warme Töne wie Deep Roast Mocha (`#1A1614` / `#161311`), Warm Charcoal (`#221D1A`), sanfte Sand-/Bronze-Akzente (`#D4A373`, `#E6CCB2`, `#C58F5B`) und warmer Text (`#F5EBE0` / `#E3D5CA`).
2. **KEIN Glassmorphism:**
   - Keine übertriebenen Milchglas-Effekte, Backdrop-Blur-Orgien oder kitschigen Glass-Cards.
3. **KEINE Karten-Flut (Anti-Card-Clutter):**
   - Nicht jede Information in 20 gleiche rechteckige Boxen sperren.
   - Stattdessen: Mutige Typografie, offene Layouts, elegante Trennlinien, horizontale Timelines und geführte Sektionen.
4. **Interaktiver WOW-Effekt (Geordnet & Elegant):**
   - Flüssige Scroll-Effekte & Scroll-Trigger via Framer Motion.
   - Dezente, spannende 3D- / Matter.js-Physik-Elemente (z. B. fallende/interaktive Tech-Badges oder interaktive Hero-Elemente), die Spaß machen, aber die Usability nicht stören.
   - Alles bleibt geordnet, aufgeräumt und auf Anhieb verständlich für Recruiter.
5. **Barrierefreiheit (A11y) & Performance:**
   - Touch-Targets $\ge 44\times44\text{px}$, saubere semantische HTML5-Struktur, Lighthouse Score $95+$.

---

## 🤖 Token-Ökonomie & Subagenten-Workflow (STRIKT BEACHTEN)

- **Context-Schutz:** Der Haupt-Agent bleibt schlank und fungiert als Orchestrator. Keine unbegrenzten Volltext-Reads (> 150 Zeilen) im Hauptkontext.
- **Minimal-Modell-Prinzip (Model Routing nach Bedarf):**
  - Reine Datei-Existenz-, Interface- & Typen-Lookups $\rightarrow$ `flash_lite` (minimaler Verbrauch).
  - Code-Recherchen, Audits, UI-Implementierungen $\rightarrow$ `flash` (Standard-Arbeitspferd).
  - Hochkomplexe Berechnungen / State-Machine Refactorings $\rightarrow$ `pro` oder `inherit`.
- **Subagents bevorzugen:** 
  - Bewerbungs-Storytelling & Case Studies $\rightarrow$ `01-fiae-career-storyteller`
  - UI-Styling, Warm-Brown-Theme & Animation $\rightarrow$ `02-frontend-ui-designer`
  - React/TypeScript Komponentenbau $\rightarrow$ `02-frontend-developer`
  - Code Quality, Clean Code & A11y Review $\rightarrow$ `03-tech-lead-code-reviewer`
  - SEO, Social Share Cards & Performance $\rightarrow$ `04-seo-og-performance`
- **Registry & Guides:** Siehe [`.agent/AGENT_REGISTRY.md`](file:///d:/Programmieren/portfolio/.agent/AGENT_REGISTRY.md) und [`.agent/workflows/PORTFOLIO-GUIDE.md`](file:///d:/Programmieren/portfolio/.agent/workflows/PORTFOLIO-GUIDE.md).

---

## ⚡ Wichtige Befehle

- **Dev-Server:** `npm run dev`
- **Produktions-Build:** `npm run build`
- **Linting:** `npm run lint`
- **Vorschau:** `npm run preview`

---

## 🛑 Arbeitsablauf & Sicherungs-Regel (STRIKT BEACHTEN)

- **Kein automatisches Lint / Build / Git / Doc-Update:** Während der normalen Entwicklung KEIN `npm run build`, `npm run lint`, Git-Push oder Aktualisieren der `projekt.md` ausführen.
- **Trigger-Wort "sichern":** Erst wenn der Nutzer **"sichern"** (oder einen expliziten Befehl dazu) schreibt, wird das gesamte Sicherungspaket in einem Rutsch ausgeführt:
  1. `npm run lint`
  2. `npm run build`
  3. `projekt.md` aktualisieren
  4. Git-Status / Commit / Push vorbereiten bzw. ausführen.

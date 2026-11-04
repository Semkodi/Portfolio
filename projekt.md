# 🚀 Projektstatus & Roadmap (projekt.md)

## 📌 Projekt: Interaktives Fullstack Developer Portfolio (FIAE)
- **Entwickler:** Semir Borogovac (FIAE Anwendungsentwicklung, IHK Koblenz 2026)
- **Status:** Produktionsreif & Bereit für Hosting (FileZilla / Webhosting)
- **Letzte Aktualisierung:** 2026-11-04

---

## 🎯 Abgeschlossene Kernmodule & Features

- [x] **Warm-Dark-Brown / Mocha Design-System**
  - Strikte Palette: Deep Roast Mocha (`#161311`), Warm Charcoal (`#1E1917` / `#28221F`), Bronze (`#D4A373`), bernsteinfarbenes Signal (`#FF9A3C`), warmer Text (`#F5EBE0` / `#E3D5CA`).
  - Kein Glassmorphism-Kitsch, kein Karten-Clutter, saubere semantische HTML5-Struktur.

- [x] **Cinematic 3D Hero & Orbit-Karussell (Sektion 01)**
  - Three.js 3D-Orbit mit 5 Code-Fenstern (BoxGeometry mit Kanten & Dicke):
    1. `ArchitectureEngine.ts` (Fullstack Core)
    2. `TarifRechner.tsx` (React 19 / State Engine)
    3. `VersicherungsService.java` (Java 21 / Spring Boot 3)
    4. `SimplySwitchProduction.ts` (Flagship Plattform)
    5. `Terminal ~ dev-env` (Git, Vite Bundle, PostgreSQL)
  - Interaktives Drehen per Scroll und Maus-Drag mit Parallax-Kippung.
  - Web Audio API Sound-Engine (Whoosh, Mechanical Typing, Command Confirm, Ambient Drone) mit globalem Stummschalter.
  - Bereinigt von allen Docker-, Maven- und Senior-Übertreibungen.

- [x] **Gepinnter Architektur-Blueprint & Profil-Hub**
  - **Architektur-Blueprint:** 4 Schichten (Schnittstellen & Sicherheit, PostgreSQL-Datenbank, Java-Rechenlogik, React-UI) bauen sich beim Scrollen Schritt für Schritt auf.
  - **Profil & ID-Card:** 3D-Developer-Ausweis mit Parallax-Tilt, Koordinaten und aktuellem Status (*Verfügbar für Junior & Vollzeit*).
  - Drei interaktive Konsolen: `01_clean_code.sh`, `02_backend_engine.sh`, `03_fiae_status.sh`.

- [x] **Flagship Fallstudie simply switch (Sektion 02)**
  - Echte Screenshots der Live-Plattform (Desktop & Smartphone) für Startseite, 4-Schritte-Schadensmelder und Beleg-Upload.
  - Umschaltbar zwischen Desktop- und mobiler Smartphone-Ansicht.

- [x] **Ehrliche Skills & Werdegang (Sektionen 03 & 04)**
  - Bewusster Verzicht auf erfundene Prozentbalken.
  - Aufteilung in: Frontend & Web (Praxis), Java & Backend-Grundlagen, Datenbanken & Enterprise-Tools.
  - Git-Commit Timeline mit interaktiver Meilenstein-Inspektion.

- [x] **Interaktives Terminal & Kontakt-Sicherheit (Sektionen 05 & 06)**
  - Terminal mit interaktiven Befehlen (`whoami`, `skills`, `projects`, `contact`, `clear`).
  - **Unsichtbarer Spam- & Bot-Schutz:**
    - Honeypot-Feld (`website_check`)
    - Time-Gate (> 2,2s Mindest-Ausfüllzeit)
    - Dynamisch zusammengesetzte E-Mail-Adresse gegen Scraping-Crawler.
  - Server-seitiges PHP-Skript (`public/mail.php`) mit SSL-Header und doppelter Validierung.

- [x] **FileZilla & Webhosting Deployment-Paket**
  - Produktions-Build in `dist/`.
  - Vollständige `.htaccess` für Apache-Webserver mit SPA-Routing, Caching-Headern, GZIP-Komprimierung und MIME-Type Definitionen.

---

## 📝 Changelog
- **2026-11-04:**
  - Großes Cinematic 3D Update nach Vorlage Forma Studio implementiert.
  - 3D-Karussell mit 5 Codefenstern, Orbit-Ringen und leuchtendem Hologramm-Kern gebaut.
  - Echte Desktop- und Mobile-Screenshots für *simply switch* eingebunden.
  - Prozentbalken und Senior-Buzzwords entfernt; alle Bezüge zu Trainee, Docker, Maven und Linux-Distros bereinigt.
  - Spam-Bot-Schutz (Honeypot + Time-Gate + Obfuscation) in Kontaktformular und Footer integriert.
  - Warm Mocha Theme (`#161311`) finalisiert und `.htaccess` für FileZilla Webhosting eingerichtet.
  - ESLint 9 & TypeScript-Build validiert: 0 Fehler.
- **2026-09-03:** Vollständiges Agenten-, Skill- und Workflow-System initialisiert.

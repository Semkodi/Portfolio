# Projekt-Dokumentation: Portfolio - Semir Borogovac

In dieser Datei halten wir alle Fortschritte und durchgeführten Änderungen an deinem Portfolio-Projekt fest.

## 🚀 Status: Projekt bereit zur Veröffentlichung

Wir haben das Portfolio erfolgreich aufgebaut, personalisiert und für das Hosting auf IONOS vorbereitet.

### 1. Technische Basis & Setup
- **Framework:** React mit Vite.
- **Styling:** Tailwind CSS & Framer Motion (für Animationen).
- **Icons:** Lucide-React.
- **Versionierung:** Das Projekt ist mit Git initialisiert und auf [GitHub](https://github.com/Semkodi/Portfolio.git) gesichert.

### 2. Visuelle & Inhaltliche Anpassungen
- **Profilbild:** Ein neues Porträtfoto wurde in der "Über Mich"-Sektion integriert.
- **Design-Features:**
    - Rundes Design mit Glas-Effekt-Rahmen.
    - Interaktiver Hover-Effekt (Schwarz-Weiß zu Farbe).
    - Rotierender, gestrichelter Ring für einen modernen Look.
    - Perfekte Zentrierung des Gesichts im Rahmen.
- **Footer:** Personalisierung mit dem Namen "Semir Borogovac".

### 3. Hosting & Deployment (IONOS)
Da "Deploy Now" zusätzliche Kosten verursacht hätte, haben wir uns für das klassische FTP-Hosting auf deinem bestehenden Webspace entschieden:
- **Server:** `access-5019125526.webspace-host.com`.
- **Anleitung:** Eine detaillierte `HOSTING.md` wurde erstellt, die den gesamten Prozess von der Code-Änderung bis zum Live-Gang via FileZilla erklärt.

### 4. Der Update-Workflow
Wir haben einen klaren Workflow für zukünftige Änderungen etabliert:
1. **Ändern:** Code in `src/App.jsx` anpassen.
2. **Testen:** Über `npm run dev` lokal prüfen.
3. **Sichern:** Mit `git push` auf GitHub archivieren.
4. **Bauen:** Mit `npm run build` den `dist`-Ordner generieren.
5. **Hochladen:** Inhalt von `dist` via FileZilla auf den IONOS-Server schieben.

---
*Letztes Update: 03.02.2026*

## 💡 Ideen für das nächste Mal (Backlog)

1. **Interaktives Kontaktformular:**
   - Ein funktionierendes Formular, das dir direkt eine E-Mail schickt (z. B. via *EmailJS* oder einem kleinen Backend).
2. **Projekt-Detailseiten:**
   - Klickbare Projekte, die mehr Details, Bilder und vielleicht sogar ein Video deiner Software zeigen.
3. **Blogbereich:**
   - Ein kleiner Bereich, in dem du über deine Lernfortschritte als FIAE-Umschüler schreiben kannst (gut für SEO!).
4. **Social Media Feeds:**
   - Integration deiner neuesten GitHub-Repositories oder LinkedIn-Posts.

---

## 🚀 Status-Update: Projekt stark individualisiert & "Wow"-Effekte implementiert (08.02.2026)

Wir haben das Portfolio massiv überarbeitet, um es professioneller, moderner und persönlicher zu gestalten – mit einem klaren Fokus auf "Wow"-Effekte.

### 1. **Content & Personal Branding**
- **Header:**
    - Jobtitel angepasst: "Angehender Fachinformatiker für Anwendungsentwicklung".
    - "Open to Work"-Badge mit pulsierendem Indikator hinzugefügt.
    - **Typewriter-Effekt:** Die Headline tippt sich selbst ("Ich entwickle moderne Web Apps", "Mendix Lösungen", etc.).
- **Über Mich:**
    - Motivationstext hinzugefügt: Fokus auf Problemlösung und Leidenschaft für Code.
    - Bereich in "Mein Weg in die IT" umbenannt.
- **Skills:**
    - Modernes "Pill"-Design für Skills statt einfacher Listen.
- **Projekte:**
    - **Mendix-Projekt:** Prominent als "Featured Project" hervorgehoben.
    - **Deep Dive:** Neue Sektion in den Projektkarten für technische Details (Herausforderungen & Lösungen).
    - **Spotlight-Karten:** Interaktiver Licht-Effekt, der der Maus folgt.
- **Rechtliches:**
    - Impressum & Datenschutz als schicke Modals (Popups) integriert.
    - Text an deine echten Daten (Dornburg) angepasst.

### 2. **Visuelle "Wow"-Effekte & Animationen**
- **Maus-Verfolger:** Ein leuchtender Cursor-Kreis, der sanft der Maus folgt (nur Desktop).
- **Scroll-Progress:** Ein feiner Ladebalken am oberen Bildschirmrand, der den Lesefortschritt zeigt.
- **Reveal-On-Scroll:**
    - Inhalte "ploppen" jetzt dynamisch auf, wenn man runter scrollt (Feder-Animation, Skalierung & Fade-In).
- **Hintergrund:**
    - Animierte, pulsierende Blobs im Hintergrund für mehr Tiefe.
    - Glassmorphismus im Header und bei Karten verstärkt.

### 3. **Premium Features & Theme-Management (Update 08.02.2026 - Abends)**

- **Dark & Light Mode (Theme-Toggle):**
    - Komplettes Redesign für beide Modi. Im hellen Modus wirkt das Portfolio jetzt "clean" und professionell, im dunklen Modus edel und technisch.
    - **Mechanischer Lichtschalter:** Ein eckiger Schalter in der Navigationsleiste ermöglicht den Wechsel. Die Icons (Sonne/Mond) zeigen immer den Ziel-Modus an.
    - Persistenz: Das gewählte Theme wird im `localStorage` gespeichert.
- **Interaktives Terminal (Deutsch):**
    - Ein voll funktionsfähiges Terminal mit Befehlen wie `hilfe`, `wer`, `projekte`, `skills`, `kontakt` und `werdegang`.
- **Lebenslauf (Timeline):**
    - Eine visuelle Zeitachse (`Lebenslauf.jsx`) zeigt deinen Werdegang (Schule, Umschulung, praktische Erfahrung) modern an.

---
*Letztes Update: 09.02.2026 (10:00 Uhr)*

## 🚀 Status-Update: UX-Optimierung & Navigation (09.02.2026)

Wir haben gezielte Verbesserungen an der Benutzerfreundlichkeit (UX) und dem Design vorgenommen:

### 1. **Navigation & Logo**
- **Logo-Link:** Das Logo (Terminal-Icon + Name) in der Navigationsleiste fungiert nun als aktiver Link (`<a>`-Tag) zum Startbereich (`#home`).
- **Feedback:** Ein dezenter Hover-Effekt signalisiert die Klickbarkeit.

### 2. **Theme-Toggle (Dark/Light Mode)**
- **Design:** Eleganter Glass-Button auf der rechten Seite mit adaptivem Rahmen.
- **Animation:** Interaktive 360°-Drehung beim Klicken.
- **Farben:** Passt sich dem Modus an (weiße Sonne im Dark Mode, dunkler Mond im Light Mode).

### 3. **Favicon (Browser-Tab-Icon)**
- **Design:** Das standardmäßige Weltkugel-Icon wurde durch ein eigenes Logo ersetzt.
- **Farben:** Ein weißes **S** und ein lila **B** auf dunklem Hintergrund sorgen für eine professionelle Wiedererkennung im Browser-Tab.

## 🚀 Status-Update: Dokumentation & High-End Polishing (09.02.2026 - Mittag)

Wir haben das Portfolio auf ein echtes Premium-Niveau gehoben und alle geplanten Features erfolgreich umgesetzt.

### 1. **High-End Animationen (Scroll-Reveal)**
- **Intelligente Richtungen:** Inhalte fließen jetzt dynamisch ein (Text von links, Bilder von rechts, Titel von oben).
- **Premium Easing:** Nutzung von Cubic-Bezier Kurven für ultra-geschmeidige Bewegungen.
- **Stagger-Effekte:** Karten (Skills & Projekte) tauchen nacheinander auf, was den visuellen Fluss massiv verbessert.

### 2. **Interaktive Skills-Sektion (v2)**
- **Level-Indikatoren:** Jede Fähigkeit hat nun eine Punkt-Skala (1-5) zur Visualisierung der Expertise.
- **Visuals:** Karten haben einen Glow-Hover-Effekt und heben sich beim Draufzeigen an.
- **Fokus:** Kategorien wie Frontend, Backend, Database und Low-Code/Tools sind klar getrennt.

### 3. **Living Background & UI Fixes**
- **Mouse-Follower Glow:** Ein großer, weicher Lichtfleck im Hintergrund folgt der Maus mit Trägheit (Parallax-Effekt).
- **Aufräumarbeiten:** 
    - "Verfügbar"-Badge entfernt für einen cleaner Look.
    - Mobile Navigation optimiert (Links auf kleinen Screens versteckt).
    - Terminal-Fokus-Fix (Seite startet jetzt immer ganz oben).

---
*Letztes Update: 09.02.2026 (13:00 Uhr)*

## 🛠 Geplante Features (Roadmap)

- [x] Projekt-Detailansichten (Modals)
- [x] Scroll-Reveal-Animationen
- [x] Interaktive Skills-Sektion
- [x] Hintergrund-Effekte (Living Background)
- [ ] **Blogbereich:** (Optional für die Zukunft) Bereich für Lernfortschritte.
- [ ] **Echter E-Mail Versand:** Integration von EmailJS für das Kontaktformular.

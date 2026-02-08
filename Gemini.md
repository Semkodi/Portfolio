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

Hier sind einige coole Features, die wir in zukünftigen Sessions einbauen könnten, um dein Portfolio noch professioneller zu machen:

1. **Interaktives Kontaktformular:**
   - Ein funktionierendes Formular, das dir direkt eine E-Mail schickt (z. B. via *EmailJS* oder einem kleinen Backend).
2. **Projekt-Detailseiten:**
   - Klickbare Projekte, die mehr Details, Bilder und vielleicht sogar ein Video deiner Software zeigen.
3. **Dark/Light Mode:**
   - Ein Umschalter, mit dem Besucher zwischen einem dunklen und hellen Design wählen können.
4. **Lebenslauf-Download:**
   - Ein schicker Button, mit dem man deinen Lebenslauf direkt als PDF herunterladen kann.
5. **Blogbereich:**
   - Ein kleiner Bereich, in dem du über deine Lernfortschritte als FIAE-Umschüler schreiben kannst (gut für SEO!).
6. **Timeline-Komponente:**
   - Eine visuelle Zeitachse deiner beruflichen Laufbahn und deiner Umschulung.
7. **Social Media Feeds:**
   - Integration deiner neuesten GitHub-Repositories oder LinkedIn-Posts.

---

## 🚀 Status-Update: Projekt stark individualisiert & "Wow"-Effekte implementiert (08.02.2026)

Wir haben das Portfolio massiv überarbeitet, um es professioneller, moderner und persönlicher zu gestalten – mit einem klaren Fokus auf "Wow"-Effekte.

### 1. **Content & Personal Branding (Feedback-Umsetzung)**
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
    - Ersetzt statisches Einblenden für ein lebendigeres Gefühl.
- **Hintergrund:**
    - Animierte, pulsierende Blobs im Hintergrund für mehr Tiefe.
    - Glassmorphismus im Header und bei Karten verstärkt.

### 3. **Technik & SEO**
- **Meta-Tags:** Titel und Beschreibung in `index.html` für Google optimiert ("Semir Borogovac | Angehender Fachinformatiker...").
- **Performance:** Animationen sind performant mit `framer-motion` umgesetzt.

---

## 🛠 Was noch fehlt / Nächste Schritte (To-Do)

Um das Portfolio final fertigzustellen, fehlen noch folgende Inhalte:

1.  **Bilder & Screenshots:**
    *   **Mendix-Projekt:** Ersetze den Platzhalter `<div ...>Hier Screenshot einfügen...</div>` in `App.jsx` mit einem echten Screenshot deiner App.
    *   **Profilbild:** Prüfe, ob `public/profile.jpg` dein aktuelles Bild ist.
    *   **Projekt-Vorschauen:** Auch für die anderen Projekte (LoveHub, etc.) fehlen noch Bilder.

2.  **Verlinkungen:**
    *   **Social Media:** Die Links zu LinkedIn und GitHub in der `Contact`-Sektion zeigen noch auf `#`. Hier müssen deine echten Profil-URLs rein.
    *   **Projekt-Links:** Die "Zum Projekt"-Buttons führen noch nirgendwo hin.

3.  **Inhaltliche Details:**
    *   **Deep Dive Texte:** Die Texte bei den Projekten (außer Mendix) sind noch Platzhalter. Ergänze hier spezifische technische Herausforderungen, die du gelöst hast.

4.  **Favicon:**
    *   Das Standard-Vite-Icon im Browser-Tab sollte durch ein persönliches Logo (z.B. "SB" oder ein Terminal-Icon) ersetzt werden.

5.  **Deployment:**
    *   Nach dem Einfügen der Bilder: `npm run build` ausführen und den `dist`-Ordner erneut auf IONOS hochladen.

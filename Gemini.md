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

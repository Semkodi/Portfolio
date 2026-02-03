# Portfolio Hosting Guide (IONOS Webspace + GitHub)

In dieser Anleitung erfährst du, wie du Änderungen an deinem Portfolio vornimmst und diese sicher auf deinen IONOS Webspace bringst.

## 1. Änderungen vornehmen & Lokal testen
1. **Entwicklungsserver:** Öffne dein Terminal in VS Code und starte den Server (falls er nicht schon läuft):
   ```bash
   npm run dev
   ```
2. **Echtzeit-Vorschau:** Öffne `http://localhost:5173`. Jede Änderung in deinem Code (z.B. in `src/App.jsx`) wird hier sofort sichtbar.

---

## 2. Code-Sicherung (GitHub)
Bevor du die Seite veröffentlichst, speichere deinen Stand auf GitHub:
```bash
git add .
git commit -m "Deine Beschreibung der Änderung"
git push
```

---

## 3. Veröffentlichung auf IONOS (Der wichtigste Teil!)

Du musst nicht auf die IONOS-Webseite gehen. **FileZilla ist dein Werkzeug, um alles live zu schalten.**

### SCHRITT 1: Die Dateien "übersetzen" (BUILD)
**WICHTIG:** Du musst nach jeder Code-Änderung diesen Befehl ausführen, sonst wird FileZilla nur deine alten Dateien hochladen!
```bash
npm run build
```
Dieser Befehl erstellt den Ordner `dist` mit den fertigen Dateien für das Internet.

### SCHRITT 2: Hochladen mit FileZilla
1. Öffne **FileZilla**.
2. Verbinde dich mit deinem IONOS-Server (`access-5019125526.webspace-host.com`).
3. **Links (Dein PC):** Gehe in den Ordner `c:\Users\sem27\Desktop\Portfolio\dist`.
4. **Rechts (IONOS):** Gehe in dein Hauptverzeichnis (meist `/` oder `/htdocs`).
5. **Aktion:** Markiere **alle Dateien innerhalb** des `dist`-Ordners und ziehe sie auf die rechte Seite.
6. Bestätige das Überschreiben ("Immer diese Aktion ausführen" anklicken).

**Fertig!** Sobald FileZilla die Meldung "Übertragung erfolgreich" zeigt, ist deine Seite live.

---

## Kurz-Checkliste für jedes Update:
1. [ ] Code ändern & in VS Code speichern.
2. [ ] `git push` (Sicherung auf GitHub).
3. [ ] `npm run build` (**MUSS** ausgeführt werden!).
4. [ ] Inhalt von `dist` via FileZilla hochladen.

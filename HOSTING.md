# Portfolio Hosting Guide (IONOS)

Dein Portfolio ist nun bereit für den Einsatz! Hier ist eine einfache Anleitung, wie du es auf IONOS hosten kannst.

## 1. Lokale Vorschau
Bevor du es hochlädst, kannst du es lokal testen:
```bash
npm run dev
```
Öffne dann `http://localhost:5173` im Browser.

## 2. Projekt bauen (Build)
Falls du Änderungen am Code vornimmst, führe diesen Befehl aus, um die Dateien für den Webserver zu generieren:
```bash
npm run build
```
Dies erstellt einen Ordner namens `dist`. Nur der Inhalt dieses Ordners muss hochgeladen werden.

## 3. Hosting auf IONOS (SFTP/FTP)
1. **Login:** Logge dich in dein IONOS Control Center ein.
2. **Webspace:** Navigiere zu "Hosting" -> "SFTP & SSH".
3. **SFTP-Zugang:** Falls du noch keinen hast, erstelle einen neuen Benutzer. Notiere dir:
   - Server (Host)
   - Benutzername
   - Passwort
4. **FTP-Programm nutzen:** Öffne ein Tool wie **FileZilla** oder **WinSCP**.
5. **Verbindung:** Gib deine IONOS-Daten ein und verbinde dich.
6. **Hochladen:**
   - Suche auf deinem PC den Ordner `c:\Users\sem27\Desktop\Portfolio\dist`.
   - Suche auf dem IONOS-Server deinen Zielordner (meistens `/` oder `/htdocs`).
   - Ziehe den kompletten **Inhalt** des `dist`-Ordners (nicht den Ordner selbstr, sonden die Dateien darin) in den IONOS-Zielordner.
7. **Fertig:** Deine Seite sollte nun unter deiner Domain erreichbar sein!

## 4. Updates
Wenn du etwas ändern möchtest (z.B. neue Projekte hinzufügen):
1. Ändere den Code in `src/App.jsx`.
2. Führe `npm run build` aus.
3. Lade den neuen Inhalt von `dist` erneut auf den IONOS-Server hoch (überschreiben).

# Portfolio Hosting Guide (IONOS Webspace + GitHub)

In dieser Anleitung erfährst du, wie du Änderungen an deinem Portfolio vornimmst, diese lokal testest und anschließend sicher auf IONOS veröffentlichst.

## 1. Arbeiten an der Seite (Entwicklungszyklus)
Wenn du etwas am Design oder Text ändern möchtest, gehst du so vor:

1. **Entwicklungsserver starten:** Stell sicher, dass dein Terminal im Projektordner ist und gib ein:
   ```bash
   npm run dev
   ```
2. **Echtzeit-Vorschau:** Öffne `http://localhost:5173` im Browser. 
3. **Änderungen vornehmen:** Wenn du jetzt Dateien (z.B. `src/App.jsx`) änderst und speicherst, siehst du das Ergebnis **sofort** im Browser, ohne die Seite neu laden zu müssen (Hot Module Replacement).

---

## 2. Code-Sicherung mit GitHub
Sobald du mit deinen Änderungen zufrieden bist, solltest du deinen Code sichern:

```bash
# 1. Alle geänderten Dateien für den Upload vormerken
git add .

# 2. Die Änderungen mit einer kurzen Nachricht versehen
git commit -m "Update: Portfolio Texte und Farben angepasst"

# 3. Zu GitHub hochladen
git push
```

---

## 3. Veröffentlichung auf IONOS (Live-Gang)
Wenn die lokale Version perfekt ist, bringst du sie auf deine echte Website:

### Schritt A: Die Dateien für den Server bauen
Reiner React-Code läuft nicht direkt auf dem Webserver. Du musst ihn erst "übersetzen" (builden):
```bash
npm run build
```
Dies erstellt den Ordner `dist`. Darin befinden sich die fertigen Dateien (HTML, CSS, JS).

### Schritt B: Hochladen via FTP (FileZilla)
1. **SFTP-Daten nutzen:**
   - **Server:** `access-5019125526.webspace-host.com`
   - **Benutzer:** (Dein Benutzername von der IONOS-Seite)
2. **Verbinden:** Daten in FileZilla eingeben und verbinden.
3. **Hochladen:** 
   - Lokal: Ordner `dist` öffnen.
   - Server: Zielordner (meist `/` oder `/htdocs`) öffnen.
   - **Wichtig:** Markiere alle Dateien **im** `dist`-Ordner und ziehe sie auf den Server. Bestehende Dateien einfach überschreiben.

---

## 4. Wichtige Befehle im Überblick
| Befehl | Zweck | Wann nutzen? |
| :--- | :--- | :--- |
| `npm run dev` | Lokale Vorschau | Während du programmierst |
| `git push` | Backup auf GitHub | Wenn ein Arbeitsschritt fertig ist |
| `npm run build` | Dist-Ordner erstellen | Kurz vor dem Hochladen auf IONOS |

---

## 5. Hinweis für später (Routing)
Falls du später React Router verwendest und Unterseiten beim Neuladen einen 404-Fehler zeigen, lege eine `.htaccess` Datei in deinen Hauptordner auf dem Server mit diesem Inhalt:
mach 
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

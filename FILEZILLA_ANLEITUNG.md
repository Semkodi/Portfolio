# 🌐 FileZilla Hosting-Anleitung für dein Portfolio

Dein Produktions-Build liegt fertig kompiliert im Ordner:
`D:\Programmieren\portfolio\dist`

---

## 🚀 In 4 Schritten mit FileZilla online stellen:

### 1. In FileZilla mit deinem Webhosting verbinden
- **Server / Host:** z. B. `ftp.deinedomain.de` (oder die SFTP-Adresse deines Hosters)
- **Benutzername:** Dein FTP-Benutzername
- **Passwort:** Dein FTP-Passwort
- **Port:** `21` (für normales FTP) oder `22` (für SFTP)
- Klicke auf **„Verbinden“**.

---

### 2. Zu den richtigen Ordnern navigieren
- **Linke Fensterhälfte (Lokaler PC):**
  Navigiere zu deinem Portfolio-Projekt:
  `D:\Programmieren\portfolio\dist`
  *(Wichtig: Geh **in** den `dist`-Ordner hinein!)*

- **Rechte Fensterhälfte (Webserver):**
  Navigiere in das Stammverzeichnis deiner Domain. Je nach Hoster heißt dieser Ordner meist:
  - `htdocs` (z. B. bei Strato, IONOS, Hetzner)
  - oder `public_html` (z. B. bei cPanel / Hostinger / All-Inkl)
  - oder direkt `/` (Root)

---

### 3. Dateien hochladen
1. Markiere in FileZilla auf der **linken Seite (im `dist`-Ordner)** alle Dateien und Ordner:
   - `assets/` *(Ordner mit allen komprimierten Styles, Skripten & Bildern)*
   - `projekte/` *(Screenshots)*
   - `index.html` *(Hauptseite)*
   - `.htaccess` *(Server-Konfiguration für Routing, GZIP & Caching)*
   - `mail.php` *(Spam-geschütztes Kontaktformular)*
   - `profile.jpg` *(Dein Profilfoto)*
   - `favicon.svg` *(Browser-Tab-Icon)*
   - `404.html`
2. Klicke mit der rechten Maustaste auf die markierten Dateien und wähle **„Hochladen“**.
3. Warte kurz, bis der Fortschrittsbalken unten 100% anzeigt („Erfolgreiche Übertragungen“).

---

### 4. Prüfen & Fertig!
- Öffne deine Domain im Browser (z. B. `https://semirborogovac.de`).
- Teste:
  1. Dreht sich das 3D-Karussell flüssig?
  2. Funktionieren Sound und Klicks?
  3. Funktioniert das Kontaktformular mit einer Test-Nachricht?

---

> [!NOTE]
> Wenn du später Änderungen machst:
> Einfach `npm run build` ausführen und danach wieder den Inhalt aus `dist/` per FileZilla überschreiben.


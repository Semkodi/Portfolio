# ⚡ Schnelle Befehls-Referenz (BEFEHLE.md)

Alle Kernbefehle für das Portfolio-Projekt auf einen Blick.

---

## 🛠️ Entwicklung & Server

```bash
# Entwicklungs-Server starten
npm run dev

# Lokale Produktions-Vorschau starten
npm run preview
```

---

## 🏗️ Build & Code-Qualität

```bash
# TypeScript Check & Produktions-Build
npm run build

# ESLint Code-Analyse
npm run lint
```

---

## 🛑 Der "sichern"-Workflow

Während du entwickelst, führst du **keine** automatischen Builds oder Git-Commits durch.
Sobald du den Befehl **`sichern`** gibst, führt der Agent folgendes Paket aus:

1. `npm run lint` (Überprüfung auf Syntax- & Lintfehler)
2. `npm run build` (Sicherstellung, dass der TypeScript-Build fehlerfrei kompiliert)
3. Aktualisierung von `projekt.md` mit dem aktuellen Fortschritt
4. Vorbereitung des Git-Commits.

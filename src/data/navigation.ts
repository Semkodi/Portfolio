import type { ui } from './inhalt';

/** Reihenfolge der Sektionen in Seitenleiste und Statuszeile.
 *  Modulkonstante, damit die Referenz stabil bleibt — der
 *  Scroll-Beobachter hängt als Abhängigkeit daran. */
export const sektionen = [
  { id: 'profil', navSchluessel: 'ueber' },
  { id: 'werk', navSchluessel: 'projekte' },
  { id: 'skills', navSchluessel: 'skills' },
  { id: 'werdegang', navSchluessel: 'werdegang' },
  { id: 'kontakt', navSchluessel: 'kontakt' },
] as const satisfies readonly { id: string; navSchluessel: keyof typeof ui.nav }[];

export const sektionsIds = sektionen.map((s) => s.id);

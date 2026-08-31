import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Sprache = 'de' | 'en';

interface SpracheZustand {
  sprache: Sprache;
  setzeSprache: (sprache: Sprache) => void;
  umschalten: () => void;
}

/** Globaler Sprach-Zustand (Deutsch / Englisch), dauerhaft im LocalStorage. */
export const benutzeSpracheSpeicher = create<SpracheZustand>()(
  persist(
    (setze) => ({
      sprache: 'de',
      setzeSprache: (sprache) => setze({ sprache }),
      umschalten: () => setze((z) => ({ sprache: z.sprache === 'de' ? 'en' : 'de' })),
    }),
    { name: 'sb-sprache' },
  ),
);

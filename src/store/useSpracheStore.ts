import { create } from 'zustand';

type Sprache = 'de' | 'en';

interface SpracheState {
    sprache: Sprache;
    setSprache: (sprache: Sprache) => void;
    toggleSprache: () => void;
}

export const useSpracheStore = create<SpracheState>((set) => ({
    sprache: 'de', // Standard auf Deutsch
    setSprache: (sprache) => set({ sprache }),
    toggleSprache: () => set((state) => ({ sprache: state.sprache === 'de' ? 'en' : 'de' })),
}));

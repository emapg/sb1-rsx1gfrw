import { create } from 'zustand';
import type { Verse, Bookmark } from '../types/quran';

interface QuranStore {
  currentSurah: number;
  currentVerse: number;
  bookmarks: Bookmark[];
  isDarkMode: boolean;
  fontSize: number;
  setCurrentSurah: (surah: number) => void;
  setCurrentVerse: (verse: number) => void;
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  toggleDarkMode: () => void;
  setFontSize: (size: number) => void;
}

export const useQuranStore = create<QuranStore>((set) => ({
  currentSurah: 1,
  currentVerse: 1,
  bookmarks: [],
  isDarkMode: false,
  fontSize: 18,
  setCurrentSurah: (surah) => set({ currentSurah: surah }),
  setCurrentVerse: (verse) => set({ currentVerse: verse }),
  addBookmark: (bookmark) =>
    set((state) => ({ bookmarks: [...state.bookmarks, bookmark] })),
  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== id),
    })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setFontSize: (size) => set({ fontSize: size }),
}));
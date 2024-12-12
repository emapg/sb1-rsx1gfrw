export interface Verse {
  id: number;
  surahNumber: number;
  verseNumber: number;
  arabicText: string;
  translation: string;
  transliteration: string;
  audioUrl?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface WordAnalysis {
  word: string;
  translation: string;
  grammar: string;
  root?: string;
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  verseNumber: number;
  timestamp: number;
  note?: string;
}
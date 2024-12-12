import React from 'react';
import { Bookmark } from 'lucide-react';
import { useQuranStore } from '../../store/quranStore';
import { formatArabicNumber } from '../../lib/utils';
import type { Verse } from '../../types/quran';

interface VerseViewProps {
  verse: Verse;
  isPlaying?: boolean;
  onPlay?: () => void;
}

export function VerseView({ verse, isPlaying, onPlay }: VerseViewProps) {
  const { addBookmark, bookmarks } = useQuranStore();
  const isBookmarked = bookmarks.some(
    (b) => b.surahNumber === verse.surahNumber && b.verseNumber === verse.verseNumber
  );

  const handleBookmark = () => {
    addBookmark({
      id: `${verse.surahNumber}-${verse.verseNumber}`,
      surahNumber: verse.surahNumber,
      verseNumber: verse.verseNumber,
      timestamp: Date.now()
    });
  };

  return (
    <div className="group relative rounded-lg border p-4 transition-all hover:border-primary-500 dark:border-gray-700">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-arabic text-lg">
          {formatArabicNumber(verse.verseNumber)}
        </span>
        <div className="flex items-center space-x-2">
          {verse.audioUrl && (
            <button
              onClick={onPlay}
              className={`rounded-full p-2 transition-colors ${
                isPlaying
                  ? 'bg-primary-500 text-white'
                  : 'hover:bg-primary-100 dark:hover:bg-primary-900'
              }`}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
          )}
          <button
            onClick={handleBookmark}
            className={`rounded-full p-2 transition-colors ${
              isBookmarked
                ? 'text-primary-500'
                : 'text-gray-400 hover:text-primary-500'
            }`}
          >
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </div>

      <p className="mb-4 font-arabic text-2xl leading-loose" dir="rtl">
        {verse.arabicText}
      </p>

      <p className="text-gray-600 dark:text-gray-400">{verse.translation}</p>

      {verse.transliteration && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
          {verse.transliteration}
        </p>
      )}
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSurah, fetchRecitation } from '../lib/api';
import { VerseView } from '../components/quran/VerseView';
import { AudioPlayer } from '../components/quran/AudioPlayer';
import type { Verse } from '../types/quran';

export function SurahPage() {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentVerse, setCurrentVerse] = useState<number | null>(null);

  useEffect(() => {
    const loadSurah = async () => {
      if (!surahNumber) return;

      try {
        setLoading(true);
        const data = await fetchSurah(parseInt(surahNumber));
        
        // Combine Arabic and translation data
        const combinedVerses = data.arabic.ayahs.map((ayah: any, index: number) => ({
          id: ayah.number,
          surahNumber: parseInt(surahNumber),
          verseNumber: ayah.numberInSurah,
          arabicText: ayah.text,
          translation: data.translation.ayahs[index].text,
          audioUrl: ayah.audio
        }));

        setVerses(combinedVerses);
      } catch (err) {
        setError('Failed to load surah');
      } finally {
        setLoading(false);
      }
    };

    loadSurah();
  }, [surahNumber]);

  if (loading) {
    return <div className="space-y-4">
      {Array(10).fill(0).map((_, i) => (
        <div key={i} className="animate-pulse space-y-4 rounded-lg border p-4">
          <div className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-16 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </div>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24">
      {verses.map((verse) => (
        <VerseView
          key={verse.id}
          verse={verse}
          isPlaying={currentVerse === verse.verseNumber}
          onPlay={() => setCurrentVerse(verse.verseNumber)}
        />
      ))}

      {currentVerse && verses[currentVerse - 1]?.audioUrl && (
        <AudioPlayer
          audioUrl={verses[currentVerse - 1].audioUrl}
          onEnded={() => {
            if (currentVerse < verses.length) {
              setCurrentVerse(currentVerse + 1);
            } else {
              setCurrentVerse(null);
            }
          }}
        />
      )}
    </div>
  );
}
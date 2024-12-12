import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { fetchSurahList } from '../../lib/api';
import { SurahCard } from './SurahCard';
import type { Surah } from '../../types/quran';

export function SurahList() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await fetchSurahList();
        setSurahs(data);
        setFilteredSurahs(data);
      } catch (err) {
        setError('Failed to load surah list');
      } finally {
        setLoading(false);
      }
    };

    loadSurahs();
  }, []);

  useEffect(() => {
    const filtered = surahs.filter(
      (surah) =>
        surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSurahs(filtered);
  }, [searchQuery, surahs]);

  if (loading) {
    return <div className="grid gap-4">{Array(10).fill(0).map((_, i) => (
      <div key={i} className="animate-pulse rounded-lg border p-4">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    ))}</div>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="sticky top-16 z-40 bg-white/95 pb-4 backdrop-blur dark:bg-gray-900/95">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search surahs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-primary-400"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredSurahs.map((surah) => (
          <SurahCard key={surah.number} surah={surah} />
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatArabicNumber } from '../../lib/utils';
import type { Surah } from '../../types/quran';

interface SurahCardProps {
  surah: Surah;
}

export function SurahCard({ surah }: SurahCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/surah/${surah.number}`)}
      className="group cursor-pointer rounded-lg border p-4 transition-all hover:border-primary-500 hover:shadow-lg dark:border-gray-700 dark:hover:border-primary-400"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
            <span className="font-arabic text-lg">{formatArabicNumber(surah.number)}</span>
          </div>
          <div>
            <h3 className="font-arabic text-xl">{surah.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {surah.englishName} • {surah.englishNameTranslation}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {surah.revelationType}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {surah.numberOfAyahs} verses
          </p>
        </div>
      </div>
    </div>
  );
}
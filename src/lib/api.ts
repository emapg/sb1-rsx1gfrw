const API_BASE_URL = 'https://api.alquran.cloud/v1';

export async function fetchSurahList() {
  const response = await fetch(`${API_BASE_URL}/surah`);
  if (!response.ok) throw new Error('Failed to fetch surah list');
  const data = await response.json();
  return data.data;
}

export async function fetchSurah(surahNumber: number, translation = 'en.asad') {
  const [arabicResponse, translationResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/surah/${surahNumber}`),
    fetch(`${API_BASE_URL}/surah/${surahNumber}/${translation}`)
  ]);

  if (!arabicResponse.ok || !translationResponse.ok) {
    throw new Error('Failed to fetch surah data');
  }

  const [arabicData, translationData] = await Promise.all([
    arabicResponse.json(),
    translationResponse.json()
  ]);

  return {
    arabic: arabicData.data,
    translation: translationData.data
  };
}

export async function fetchRecitation(identifier: string, surahNumber: number) {
  const response = await fetch(`${API_BASE_URL}/surah/${surahNumber}/${identifier}`);
  if (!response.ok) throw new Error('Failed to fetch recitation');
  const data = await response.json();
  return data.data;
}
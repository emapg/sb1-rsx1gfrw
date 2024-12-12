import React from 'react';
import { Header } from './components/Header';
import { useQuranStore } from './store/quranStore';

function App() {
  const isDarkMode = useQuranStore((state) => state.isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              {/* Surah List Component will go here */}
            </div>
            <div className="lg:col-span-6">
              {/* Quran Text Component will go here */}
            </div>
            <div className="lg:col-span-3">
              {/* Translation and Tools Component will go here */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
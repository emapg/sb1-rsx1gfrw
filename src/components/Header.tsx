import React from 'react';
import { Moon, Sun, Search, Menu } from 'lucide-react';
import { useQuranStore } from '../store/quranStore';

export function Header() {
  const { isDarkMode, toggleDarkMode } = useQuranStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold">القرآن الكريم</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

export const ThemeToggle = () => {
  const { actualTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(actualTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
      aria-label={actualTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {actualTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import darkModeAtom from '@storage/dark-mode.atom';

// Todo : Enhance this component with design and story in the future
const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [setDarkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    localStorage.setItem('darkMode', newDarkMode ? 'true' : 'false');
    document.documentElement.classList.toggle('dark', newDarkMode);
    setDarkMode(newDarkMode);
  };

  return (
    <button onClick={toggleDarkMode}>
      Basculer en mode {darkMode ? 'clair' : 'sombre'}
    </button>
  );
};

export default DarkModeToggle;

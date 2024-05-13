'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import darkModeAtom from '@storage/dark-mode.atom';
import { Switch } from '@components/ui/switch';

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
    <div className="flex gap-2">
      <label htmlFor="toggle" className="flex cursor-pointer items-center">
        Dark Mode
      </label>
      <Switch id={'toggle'} checked={darkMode} onClick={toggleDarkMode} />
    </div>
  );
};

export default DarkModeToggle;

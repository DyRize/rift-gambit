'use client';

import { Switch } from '@components/ui/switch';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// Todo : Enhance this component with design and story in the future
const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);

  useEffect(() => {
    theme && setCurrentTheme(theme);
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex gap-2">
      <label htmlFor="toggle" className="flex cursor-pointer items-center">
        Dark Mode
      </label>
      <Switch id={'toggle'} checked={currentTheme === 'dark'} onClick={toggleDarkMode} />
    </div>
  );
};

export default DarkModeToggle;

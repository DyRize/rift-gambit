'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

// Todo : Enhance this component with design and story in the future
const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation('example');

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => localStorage.setItem('locale', lng));
  };

  return (
    <div>
      <p>{t('Changement de la langue par défaut')}</p>
      <button onClick={() => handleChangeLanguage('en')}>English</button>
      <button onClick={() => handleChangeLanguage('fr')}>Français</button>
    </div>
  );
};

export default LanguageSwitcher;

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

// Todo : Enhance this component with design and story in the future
const LanguageSwitcher = () => {
  const t = useTranslations('example');
  const router = useRouter();

  const handleChangeLanguage = (lng: string) => {
    router.push(`/${lng}`);
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

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';

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
      <Button onClick={() => handleChangeLanguage('en')}>English</Button>
      <Button onClick={() => handleChangeLanguage('fr')}>Français</Button>
    </div>
  );
};

export default LanguageSwitcher;

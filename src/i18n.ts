import fr from '@/locales/fr';
import en from '@/locales/en';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';

export const defaultNS = 'common';
export const resources = {
  fr,
  en,
};
export const i18nInit = (lng: string): void => {
  i18next
    .use(initReactI18next)
    .init({
      lng,
      ns: Object.keys(fr),
      defaultNS,
      resources,
      fallbackLng: {
        default: ['fr'],
      },
      preload: Object.keys(resources),
      interpolation: {
        escapeValue: false,
      },
    })
    .then();
};

'use client';

import React, { useEffect } from 'react';
import { Provider, useSetAtom } from 'jotai';
import { i18nInit } from '../i18n';
import darkModeAtom from '@storage/dark-mode.atom';

const DEFAULT_LOCALE = 'fr';

i18nInit(DEFAULT_LOCALE);

const GlobalContext = ({ children }: React.PropsWithChildren) => {
  useEffect(() => {
    const locale = localStorage.getItem('locale');

    if (locale && locale !== DEFAULT_LOCALE) {
      i18nInit(locale);
    }
  }, []);

  return <Provider>{children}</Provider>;
};

export default GlobalContext;

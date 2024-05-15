import React, { PropsWithChildren } from 'react';
import GlobalContext, { DEFAULT_LOCALE } from '@contexts/GlobalContext';

const GlobalContextMock = ({ children }: PropsWithChildren) => {
  const locale = DEFAULT_LOCALE;
  const messages = require(`../../../locales/${locale}.json`);

  return (
    <GlobalContext messages={messages} locale={locale}>
      {children}
    </GlobalContext>
  );
};

export default GlobalContextMock;

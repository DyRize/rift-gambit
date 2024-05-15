import React, { PropsWithChildren } from 'react';
import { Provider } from 'jotai';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

export const DEFAULT_LOCALE = 'fr';

type GlobalContextProps = {
  messages: AbstractIntlMessages;
  locale?: string;
} & PropsWithChildren;

const GlobalContext = ({
  messages,
  locale = DEFAULT_LOCALE,
  children,
}: GlobalContextProps) => {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Provider>{children}</Provider>
    </NextIntlClientProvider>
  );
};

export default GlobalContext;

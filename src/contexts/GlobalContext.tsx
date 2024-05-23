import React, { PropsWithChildren } from 'react';
import { Provider } from 'jotai';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import ThemeProvider from '@themes/ThemeProvider';

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
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Provider>{children}</Provider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
};

export default GlobalContext;

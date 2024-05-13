import React from 'react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { Decorator, StoryContext } from '@storybook/react';

const messages: AbstractIntlMessages = {
  fr: require('../../locales/fr.json'),
  en: require('../../locales/en.json'),
};

const WithNextIntlDecorator: Decorator = (Story, context: StoryContext) => {
  const locale: string = context.globals.locale || 'fr';
  const prevLocale = localStorage.getItem('locale') ?? 'fr';
  if (prevLocale !== locale) {
    localStorage.setItem('locale', locale);
  }

  return (
    <NextIntlClientProvider
      messages={messages[locale ?? 'fr'] as AbstractIntlMessages}
      locale={locale}
    >
      <Story {...context} />
    </NextIntlClientProvider>
  );
};

export default WithNextIntlDecorator;

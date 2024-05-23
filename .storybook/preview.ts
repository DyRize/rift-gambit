import '../app/globals.css';
import '../tailwind.config';
import type { Preview } from '@storybook/react';
import WithNextIntlDecorator from './decorators/WithNextIntlDecorator';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [WithNextIntlDecorator],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: localStorage.getItem('locale') ?? 'fr' },
      },
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'fr', right: '🇫🇷', title: 'Français' },
        ],
      },
    },
  },
};

export default preview;

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';
import GlobalContext from '@contexts/GlobalContext';

const mockChangeLanguage = jest.fn(() => Promise.resolve());

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: mockChangeLanguage,
      language: 'fr',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks(); // Réinitialise les appels et instances de toutes les simulations
});

describe('LanguageSwitcher', () => {
  test('Renders component correctly', () => {
    render(
      <GlobalContext>
        <LanguageSwitcher />
      </GlobalContext>,
    );
    expect(screen.getByText('Changement de la langue par défaut')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Français' })).toBeInTheDocument();
  });

  test.each([
    { language: 'en', name: 'English' },
    { language: 'fr', name: 'Français' },
  ])(
    'Calls i18n.changeLanguage with correct argument when %s button is clicked',
    ({ language, name }) => {
      render(
        <GlobalContext>
          <LanguageSwitcher />
        </GlobalContext>,
      );

      fireEvent.click(screen.getByRole('button', { name }));

      expect(mockChangeLanguage).toHaveBeenCalledWith(language);
    },
  );
});

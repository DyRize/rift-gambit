import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';
import { useRouter } from 'next/navigation';
import GlobalContextMock from '@contexts/mocks/GlobalContext.mock';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push,
    });
  });

  test('Renders component correctly', () => {
    render(
      <GlobalContextMock>
        <LanguageSwitcher />
      </GlobalContextMock>,
    );
    expect(screen.getByText('Changement de la langue par défaut')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Français' })).toBeInTheDocument();
  });

  test.each([
    { language: 'en', name: 'English' },
    { language: 'fr', name: 'Français' },
  ])(
    'Calls router.push with correct argument when %s button is clicked',
    ({ language, name }) => {
      const push = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({ push });

      render(
        <GlobalContextMock>
          <LanguageSwitcher />
        </GlobalContextMock>,
      );

      fireEvent.click(screen.getByRole('button', { name }));
      expect(push).toHaveBeenCalledWith(`/${language}`);
    },
  );
});

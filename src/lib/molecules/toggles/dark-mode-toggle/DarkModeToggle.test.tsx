import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import DarkModeToggle from './DarkModeToggle';
import GlobalContext from '@contexts/GlobalContext';

beforeEach(() => {
  localStorage.clear();
});

describe('DarkModeToggle', () => {
  test.each(['true', 'false'])(
    'toggles dark mode when button is clicked',
    (initialDarkMode) => {
      localStorage.setItem('darkMode', initialDarkMode);
      render(
        <GlobalContext>
          <DarkModeToggle />
        </GlobalContext>,
      );
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(localStorage.getItem('darkMode')).toBe(
        initialDarkMode === 'true' ? 'false' : 'true',
      );
    },
  );
});

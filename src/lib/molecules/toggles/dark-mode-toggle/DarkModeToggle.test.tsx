import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import DarkModeToggle from './DarkModeToggle';
import GlobalContextMock from '@contexts/mocks/GlobalContext.mock';

beforeEach(() => {
  localStorage.clear();
});

describe('DarkModeToggle', () => {
  test.each(['true', 'false'])(
    'toggles dark mode when button is clicked',
    (initialDarkMode) => {
      localStorage.setItem('darkMode', initialDarkMode);
      render(
        <GlobalContextMock>
          <DarkModeToggle />
        </GlobalContextMock>,
      );
      const toggle = screen.getByRole('switch', { name: 'Dark Mode' });
      fireEvent.click(toggle);
      expect(localStorage.getItem('darkMode')).toBe(
        initialDarkMode === 'true' ? 'false' : 'true',
      );
    },
  );
});

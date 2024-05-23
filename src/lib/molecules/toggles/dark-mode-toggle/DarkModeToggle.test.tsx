import '@testing-library/jest-dom';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import DarkModeToggle from './DarkModeToggle';

describe('DarkModeToggle', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider attribute="class">
        <DarkModeToggle />
      </ThemeProvider>,
    );

    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('defaults to light mode', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <DarkModeToggle />
      </ThemeProvider>,
    );

    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('toggles to dark mode when clicked', async () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <DarkModeToggle />
      </ThemeProvider>,
    );

    const toggle = screen.getByRole('switch');
    expect(toggle).not.toBeChecked();

    await act(async () => {
      fireEvent.click(toggle);
    });

    expect(toggle).toBeChecked();
  });

  it('toggles back to light mode when clicked again', async () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <DarkModeToggle />
      </ThemeProvider>,
    );

    const toggle = screen.getByRole('switch');
    await act(async () => {
      fireEvent.click(toggle);
      fireEvent.click(toggle);
    });

    expect(toggle).not.toBeChecked();
  });
});

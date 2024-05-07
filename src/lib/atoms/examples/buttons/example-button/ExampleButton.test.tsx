import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ExampleButton from './ExampleButton';

describe('ExampleButton', () => {
  test('Renders component correctly', () => {
    const handleClick = jest.fn();
    render(<ExampleButton onClick={handleClick}>Example Button</ExampleButton>);

    const button = screen.getByRole('button', { name: 'Example Button' });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

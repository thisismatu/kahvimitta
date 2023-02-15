import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

test('renders inputs', () => {
  render(<App />);
  const coffeeInput = screen.getByTestId('CoffeeInput');
  const waterInput = screen.getByTestId('WaterInput');
  expect(coffeeInput).toBeInTheDocument();
  expect(waterInput).toBeInTheDocument();
});

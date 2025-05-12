import { render, screen } from '@testing-library/react';
import App from './Books';

test('renders learn react link', () => {
  render(<Books />);
  const buttonElement = screen.getByText(/Search/i);
  expect(buttonElement).toBeInTheDocument();
});

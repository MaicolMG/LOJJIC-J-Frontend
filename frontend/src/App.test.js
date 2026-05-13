import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SIGID corporate branding and hero title', () => {
  render(<App />);
  
  // Verifica que el nombre de la marca esté presente
  const brandElement = screen.getByText(/LOJJIC-J/i);
  expect(brandElement).toBeInTheDocument();

  // Verifica que el título principal del Hero se renderice
  const heroTitle = screen.getByText(/ELITE/i);
  expect(heroTitle).toBeInTheDocument();
});

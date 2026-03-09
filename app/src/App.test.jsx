import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders the landing page and logs in', () => {
  render(<App />);
  
  // 1. Check if the heading exists
  const headingElement = screen.getByText(/Welcome to NovaByte/i);
  expect(headingElement).toBeInTheDocument();

  // 2. Find the login button and click it
  const loginButton = screen.getByRole('button', { name: /Login/i });
  fireEvent.click(loginButton);

  // 3. Verify the state changed and the welcome message appears
  const welcomeMessage = screen.getByText(/Successfully Logged In!/i);
  expect(welcomeMessage).toBeInTheDocument();
});
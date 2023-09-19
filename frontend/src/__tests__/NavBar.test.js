import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

afterEach(()=>{
  cleanup();
})

describe('Navbar & Navigation Test', ()=>{
  test('renders correct nav link', () => {
    render(<App />);
    const linkElement = screen.getByText('Home');
    expect(linkElement).toBeInTheDocument();

    const linkElement2 = screen.getByText('Snippets');
    expect(linkElement2).toBeInTheDocument();
  });

  test('should redirect to the home page', () => {
    render(<App />);
    const linkElement = screen.getByText('Home');
    expect(linkElement.getAttribute('href')).toBe('/');
    // Click on link
    fireEvent.click(linkElement);
    // Expect to be on home page
    expect(screen.getByText('Create New Snippet')).toBeInTheDocument();
  })

  test('should redirect to the snippets page', () => {
    render(<App />);
    // Click on link
    const linkElement2 = screen.getByText('Snippets');
    expect(linkElement2.getAttribute('href')).toBe('/snippets');
    fireEvent.click(linkElement2);
    // Expect to be on Snippets page
    expect(screen.getByText('Snippets')).toBeInTheDocument();
  })
});

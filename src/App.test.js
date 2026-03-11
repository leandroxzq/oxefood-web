import { render, screen } from '@testing-library/react'
import App from './App'

test('renders oxefood navbar', () => {
    render(<App />)
    const linkElement = screen.getByText(/oxefood/i)
    expect(linkElement).toBeInTheDocument()
})

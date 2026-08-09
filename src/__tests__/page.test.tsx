import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline } from '@/components/Timeline';

vi.mock('@/components/QuoteCard', () => ({
  default: ({ quote }: { quote: { text: string; source: string | null } }) => (
    <div data-testid="quote-card">
      <blockquote>{quote.text}</blockquote>
      {quote.source && <cite>{quote.source}</cite>}
    </div>
  ),
}));

describe('Timeline Component', () => {
  it('renders all timeline events', () => {
    render(<Timeline />);
    
    const years = ['1999', '2013', '2019', '2020', '2021', '2022'];
    
    years.forEach((year) => {
      expect(screen.getByText(year)).toBeInTheDocument();
    });
  });

  it('renders the Blood God title', () => {
    render(<Timeline />);
    expect(screen.getByText('The Legend')).toBeInTheDocument();
  });
});

describe('QuoteCard Component (mocked)', () => {
  it('renders quote text', () => {
    const mockQuote = {
      id: 1,
      text: 'Technoblade never dies.',
      source: 'Technoblade',
      createdAt: new Date(),
    };

    const QuoteCard = vi.mocked(require('@/components/QuoteCard').default);
    render(<QuoteCard quote={mockQuote} />);

    expect(screen.getByText('Technoblade never dies.')).toBeInTheDocument();
  });
});

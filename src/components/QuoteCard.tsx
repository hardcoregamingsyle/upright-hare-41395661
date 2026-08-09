'use client';

import type { Quote } from '@prisma/client';

interface QuoteCardProps {
  quote: Quote;
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <div className="bg-nether/80 rounded-lg p-6 border border-blood/30 hover:border-crown/50 transition-colors">
      <blockquote className="text-gray-200 italic mb-4">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      {quote.source && (
        <cite className="text-gold text-sm not-italic">— {quote.source}</cite>
      )}
    </div>
  );
}

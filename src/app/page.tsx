import { PrismaClient } from '@prisma/client';
import QuoteCard from '@/components/QuoteCard';
import Timeline from '@/components/Timeline';

const prisma = new PrismaClient();

async function getQuotes() {
  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return quotes;
  } catch (error) {
    console.error('Failed to fetch quotes:', error);
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  const quotes = await getQuotes();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-radial-fade z-0" />
        <div className="absolute inset-0 bg-[url('/techno-bg.jpg')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10 text-center px-4">
          <div className="mb-6">
            <span className="text-6xl">🐷</span>
            <span className="text-6xl ml-4">👑</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-crown font-display mb-4">
            TECHNOBLADE
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 font-display mb-8">
            The Blood God
          </p>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            June 1, 1999 — June 30, 2022
          </p>
          
          <blockquote className="text-xl md:text-2xl text-gold font-display italic max-w-3xl mx-auto">
            &ldquo;Technoblade never dies.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-nether/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-crown font-display text-center mb-12">
            The Legend
          </h2>
          
          <div className="prose-custom text-gray-300 space-y-6">
            <p>
              Technoblade, born Alexander, was an American YouTuber known for his Minecraft gameplay videos. 
              He was a member of the Dream SMP and one of the most skilled PvP players in the Minecraft community.
            </p>
            
            <p>
              His dry wit, exceptional gaming skills, and unique personality earned him millions of fans 
              worldwide. Despite facing terminal cancer, he continued to create content and inspire his 
              community until the very end.
            </p>
            
            <p className="text-crown font-display">
              Technoblade never dies.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-crown font-display text-center mb-12">
            Timeline
          </h2>
          <Timeline />
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-20 px-4 bg-nether/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-crown font-display text-center mb-12">
            Famous Quotes
          </h2>
          
          {quotes.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {quotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p>Quotes loading...</p>
            </div>
          )}
        </div>
      </section>

      {/* Memorial Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-crown font-display mb-8">
            In Memory
          </h2>
          
          <div className="bg-blood/20 rounded-lg p-8 border border-blood/50">
            <p className="text-xl text-gray-300 mb-6">
              The Technoblade channel has raised over $2.3 million for sarcoma research 
              through the Sarcoma Foundation of America.
            </p>
            
            <a
              href="https://sarcoma.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-crown text-nether font-bold py-3 px-8 rounded-lg hover:bg-gold transition-colors"
            >
              Donate to Sarcoma Research
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

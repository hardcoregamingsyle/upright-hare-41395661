'use client';

import { Timeline } from '@/components/Timeline';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-nether to-blood text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-crown mb-4">
            Technoblade
          </h1>
          <p className="text-2xl text-gold italic">
            &quot;Technoblade Never Dies&quot;
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-crown mb-8 text-center">
            Timeline
          </h2>
          <Timeline />
        </section>

        <footer className="text-center text-gray-400 mt-16">
          <p>In loving memory of Alexander (1999-2022)</p>
          <p className="text-sm mt-2">Blood God • Potato War Champion • Minecraft Legend</p>
        </footer>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Technoblade Tribute - The Blood God',
  description: 'A tribute to Technoblade (1999-2022) - Minecraft legend, content creator, and the Blood God. Never forget.',
  keywords: ['Technoblade', 'Minecraft', 'tribute', 'Blood God', 'content creator'],
  authors: [{ name: 'Technoblade Tribute' }],
  openGraph: {
    title: 'Technoblade Tribute - The Blood God',
    description: 'A tribute to Technoblade (1999-2022) - Minecraft legend, content creator, and the Blood God.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-nether text-gray-100 antialiased">
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="py-8 text-center text-gray-500 text-sm">
          <p>Technoblade Never Dies 🐷👑</p>
          <p className="mt-2">In loving memory of Alex (June 1, 1999 - June 30, 2022)</p>
        </footer>
      </body>
    </html>
  );
}

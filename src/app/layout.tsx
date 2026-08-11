import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Technoblade Tribute',
  description: 'A tribute to the Blood God - Technoblade Never Dies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

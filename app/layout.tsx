import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Laboratorio digitale — Portale del biennio',
  description: 'Percorso settimanale di informatica per il biennio: attività, giochi, ripasso e materiali accessibili.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}

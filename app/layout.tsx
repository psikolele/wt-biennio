import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Laboratorio Digitale — Informatica Biennio & Triennio',
  description: 'Percorso settimanale di informatica per le classi 1ª-5ª: attività a PC, laboratorio SQL, reti, AI e materiali accessibili.',
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

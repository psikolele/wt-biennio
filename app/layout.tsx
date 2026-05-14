import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Digital Serenity — Attività HTML+CSS | Prof. Serra',
  description: 'Progetto web di riferimento per l\'attività HTML+CSS. Classe 4ª Commerciale, IPTSSCTS G. Pessina — A.S. 2025/2026.',
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

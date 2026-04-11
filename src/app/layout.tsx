import type { Metadata } from 'next';
import '../styles/globals.css';
import { LangProvider } from '@/context/LangContext';
import ConditionalLayout from '@/components/ConditionalLayout';

export const metadata: Metadata = {
  title: 'Cabinet Ratby — Avocat à Casablanca',
  description:
    'Cabinet juridique spécialisé en droit des affaires, droit de la famille, droit immobilier et contentieux.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <LangProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </LangProvider>
      </body>
    </html>
  );
}
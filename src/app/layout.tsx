import type { Metadata } from 'next';
import '../styles/globals.css';
import { LangProvider } from '@/context/LangContext';
import LayoutShell from '@/components/LayoutShell';

export const metadata: Metadata = {
  title: 'Cabinet Ratby— Avocat à Casablanca',
  description: 'Cabinet juridique spécialisé en droit des affaires, droit de la famille, droit immobilier et contentieux. Maître Ratby, Avocat au Barreau de Casablanca.',
  keywords: 'avocat casablanca, cabinet juridique, droit des affaires, محامي الدار البيضاء',
  openGraph: {
    title: 'Cabinet Ratby — Avocat à Casablanca',
    description: 'Excellence juridique & intégrité',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <LangProvider>
          <LayoutShell>{children}</LayoutShell>
        </LangProvider>
      </body>
    </html>
  );
}

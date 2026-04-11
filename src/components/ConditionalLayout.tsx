'use client';

import { usePathname } from 'next/navigation';
import LayoutShell from './LayoutShell';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return <LayoutShell>{children}</LayoutShell>;
}
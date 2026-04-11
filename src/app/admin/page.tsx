import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default async function AdminPage() {
  const authed = await isAuthenticated();
  if (authed) redirect('/admin/dashboard');
  else redirect('/admin/login');
}

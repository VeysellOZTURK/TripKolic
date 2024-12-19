// app/page.tsx
import { redirect } from 'next/navigation';

export function Home() {
  redirect('/tours');
}

// app/(auth)/login/page.tsx
import LoginPage from '../components/auth/login-page';

export function AuthLogin() {
  return <LoginPage />;
}
// app/(main)/tours/page.tsx
import ToursPage from '../components/layout/tours-page';

export default function Tours() {
  return <ToursPage />;
}

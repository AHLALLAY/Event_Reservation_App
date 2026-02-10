'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        const role = user?.role;
        if (role === 'admin') router.replace('/admin/dashboard');
        else if (role === 'participant') router.replace('/participant/dashboard');
      } catch {
        // invalid user, show landing
      }
    }
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 px-4 py-8 dark:bg-zinc-900">
      <div className="flex max-w-md flex-col items-center gap-8 text-center">
      <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
        Events Reservation
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Réservez votre place aux événements.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/auth/login"
          className="rounded-full bg-zinc-900 px-6 py-3 font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Connexion
        </Link>
        <Link
          href="/auth/register"
          className="rounded-full border border-zinc-300 px-6 py-3 font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Inscription
        </Link>
      </div>
      </div>
    </div>
  );
}

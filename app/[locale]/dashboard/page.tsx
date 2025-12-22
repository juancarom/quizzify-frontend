'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useAuthStore } from '@/lib/store';
import { Navbar } from '@/components/navbar';

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const locale = useLocale();
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Give Zustand persist a moment to hydrate from localStorage
    const timer = setTimeout(() => {
      setIsLoading(false);
      // If after hydration there's still no user, redirect to login
      if (!user) {
        router.push(`/${locale}/login`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user, router, locale]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-2">{t('email')}</h3>
                  <p className="text-indigo-700">{user.email}</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-2">{t('role')}</h3>
                  <p className="text-indigo-700 capitalize">{user.role}</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-2">{t('accountCreated')}</h3>
                  <p className="text-indigo-700">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

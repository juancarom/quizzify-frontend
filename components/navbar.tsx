'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useAuthStore } from '@/lib/store';
import { useLogout } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { LanguageSwitcher } from './language-switcher';

export function Navbar() {
  const t = useTranslations('nav');
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              Quizzify
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {user ? (
              <>
                <span className="text-gray-700 hidden sm:inline">
                  {t('hello')}, {user.name}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? '...' : t('logout')}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    {t('login')}
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">
                    {t('signup')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

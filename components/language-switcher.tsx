'use client';

import { useLocale } from 'next-intl';
import { usePathname as useNextPathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = useNextPathname();

  const switchLanguage = (newLocale: 'en' | 'es') => {
    // pathname already includes the locale (e.g., "/es/dashboard")
    // Replace the current locale with the new one
    const newPath = pathname.replace(/^\/(en|es)/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={locale === 'es' ? 'default' : 'outline'}
        size="sm"
        onClick={() => switchLanguage('es')}
        className="w-12"
      >
        ES
      </Button>
      <Button
        variant={locale === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => switchLanguage('en')}
        className="w-12"
      >
        EN
      </Button>
    </div>
  );
}

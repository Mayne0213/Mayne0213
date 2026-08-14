'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { useLocale } from 'next-intl';

type Locale = (typeof routing.locales)[number];

const LANGUAGES: { code: Locale; name: string; flag: string }[] = [
  { code: 'ko', name: '한국어', flag: 'KO' },
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'de', name: 'Deutsch', flag: 'DE' },
];

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLanguageChange = (locale: Locale) => {
    router.replace(pathname, { locale });
  };

  const currentLanguage = LANGUAGES.find(lang => lang.code === currentLocale) || LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="언어 선택"
          className="inline-flex items-center gap-0.5 text-[12px] leading-7 tracking-[0.06em] text-[#666560] transition-colors hover:text-black smalltablet:text-[14px]"
        >
          {currentLanguage.flag}
          <ChevronDown className="h-3 w-3 stroke-[1.5]" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-28">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="cursor-pointer"
          >
            <span className="mr-2 text-[11px] tracking-[0.06em] text-[#6b6b65]">{language.flag}</span>
            {language.name}
            {currentLanguage.code === language.code && (
              <span className="ml-2">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

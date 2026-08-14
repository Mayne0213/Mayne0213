'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { LanguageToggle } from '@/components/ui/language-toggle';

const menuItems = [
  { label: 'Work', path: '' },
  { label: 'Resume', path: '/resume/' },
  { label: 'About', path: '/about/' },
];

export default function Header() {
  const locale = useLocale();

  return (
    <header className="portfolio-shell flex items-center justify-between py-7 smalltablet:py-10">
      <Link href={`/${locale}/`} className="editorial-display text-[22px] leading-6 tracking-normal">
        Minjo Kim
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-4 text-[13px] leading-7 tracking-normal text-[#666560] smalltablet:gap-7 smalltablet:text-[16px]">
        {menuItems.map((item) => (
          <Link key={item.label} href={`/${locale}${item.path}`} className="transition-colors hover:text-black">
            {item.label}
          </Link>
        ))}
        <span className="h-4 w-px bg-[#d9d8d4]" aria-hidden="true" />
        <LanguageToggle />
      </nav>
    </header>
  );
}

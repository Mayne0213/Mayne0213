'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { useTranslations } from 'next-intl';

const HEADER_MENU_ITEMS = [
  { key: 'about', path: '/#about' },
  { key: 'skills', path: '/#skills' },
  { key: 'projects', path: '/#projects' },
  { key: 'monitoring', path: '/#monitoring' },
  { key: 'contact', path: '/#contact'}
];

const HeaderProfile = () => {
  return (
    <Link href="/#top" onClick={(e) => handleScrollClick(e, '/#top')} >
      <h1 className="text-base smalltablet:text-lg desktop:text-lg font-bold">
        MINJO
      </h1>
    </Link>
  );
};

const handleScrollClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  path: string,
) => {
  e.preventDefault();
  const sectionId = path.replace('/#', '');
  const element = document.getElementById(sectionId);
  const navbarHeight = 70;

  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  } else {
    // 요소를 찾지 못하면 최상단으로 스크롤
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

const HeaderMenuItemsDesktop = () => {
  const t = useTranslations('header');

  return (
    <div className="tablet:flex justify-center items-center hidden">
      {HEADER_MENU_ITEMS.map((item) => (
        <div
          key={item.key}
          className="px-2 tablet:px-4 desktop:px-6 transition-all"
        >
          <Link
            href={item.path}
            onClick={(e) => handleScrollClick(e, item.path)}
            className="font-extralight text-xs tablet:text-sm desktop:text-base duration-100 ease-in hover:border-b-2 hover:border-b-black hover:dark:border-b-white pb-1"
          >
            {t(item.key)}
          </Link>
        </div>
      ))}
    </div>
  );
};

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuButton = ({ isOpen, onToggle }: MobileMenuButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="cursor-pointer"
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <Menu className="w-6 h-6" />
      )}
    </button>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const t = useTranslations('header');

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    handleScrollClick(e, path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="border-b animate-in fade-in fade-out transition-all duration-300">
      <div className="flex flex-col items-center gap-6 py-6">
        {HEADER_MENU_ITEMS.map((item) => (
          <Link
            href={item.path}
            key={item.key}
            onClick={(e) => handleMenuClick(e, item.path)}
            className="text-lg smalltablet:text-xl duration-100 ease-in hover:border-b-2 hover:border-b-brand-primary hover:dark:border-b-white pb-1"
          >
            {t(item.key)}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-md border-b border-border"
    >
      {/* Header Bar */}
      <header className="h-[70px]">
        <div className="flex justify-between items-center tracking-wider tablet:tracking-widest font-brand-book px-4 smalltablet:px-6 desktop:px-8 py-4 max-w-[1920px] mx-auto relative">
          {/* 모바일: 왼쪽 - 햄버거 아이콘 */}
          <div className="tablet:hidden flex items-center relative">
            <MobileMenuButton isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
          </div>

          {/* 모바일: 가운데 - 이름, 태블릿 이상: 왼쪽 - 이름 */}
          <div className="tablet:hidden absolute left-1/2 -translate-x-1/2">
            <HeaderProfile />
          </div>
          <div className="hidden tablet:block">
            <HeaderProfile />
          </div>

          {/* 모바일: 오른쪽 - 토글 버튼들, 태블릿 이상: 오른쪽 - 메뉴 + 토글 버튼들 */}
          <div className="flex items-center relative tablet:hidden">
            <LanguageToggle />
            <ModeToggle />
          </div>
          <div className="hidden tablet:flex items-center">
            <HeaderMenuItemsDesktop />
            <LanguageToggle />
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Menu - 같은 블러 컨테이너 안에 있음 */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Header;

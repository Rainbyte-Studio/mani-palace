import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRoute, navigateTo, language, setLanguage, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: t.nav.home, route: 'home' },
    { key: 'about', label: t.nav.about, route: 'about' },
    { key: 'activities', label: t.nav.activities, route: 'services' },
    { key: 'contact', label: t.nav.contact, route: 'contact' },
  ];

  const handleNavClick = (route: string) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'el' ? 'en' : 'el');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E1DA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none whitespace-nowrap shrink-0 group"
            aria-label="MANI PALACE Home"
          >
            <div className="w-8 h-8 flex items-center justify-center border border-[#B49A70]/70 group-hover:border-[#B49A70] transition-colors">
              <span className="font-serif text-[#B49A70] text-sm font-semibold tracking-tighter">MP</span>
            </div>
            <span className="font-serif text-xl sm:text-2xl tracking-[0.22em] text-[#202320] uppercase font-medium">
              MANI <span className="text-[#B49A70]">PALACE</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links (Single-line, quiet hover underline) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#777A75]" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route || (item.route === 'services' && currentRoute === 'activities');
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.route)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#202320] ${
                    isActive ? 'text-[#202320] font-semibold' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B49A70]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Switcher & Primary Contact Action */}
          <div className="flex items-center gap-3.5 shrink-0">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#777A75] hover:text-[#202320] border border-[#E5E1DA] hover:border-[#B49A70]/60 transition-colors whitespace-nowrap shrink-0"
              title="Αλλαγή γλώσσας / Switch Language"
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#B49A70]" />
              <span className="uppercase font-semibold tracking-wider">
                {language === 'el' ? 'EN' : 'ΕΛ'}
              </span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              {t.nav.contact}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#202320] hover:text-[#B49A70] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-b border-[#E5E1DA] px-6 py-5 shadow-lg">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#202320]">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route || (item.route === 'services' && currentRoute === 'activities');
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.route)}
                  className={`text-left py-2 border-b border-[#E5E1DA]/50 transition-colors ${
                    isActive ? 'text-[#B49A70] font-semibold pl-2 border-[#B49A70]/40' : 'text-[#777A75]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors"
              >
                {t.nav.contact}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

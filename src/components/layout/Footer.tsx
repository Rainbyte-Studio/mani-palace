import React from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, Globe, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, settings, t, language } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#202320] text-[#FAF9F6] border-t border-[#323632]">
      {/* Upper Footer: Brand and Corporate Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Official Corporate Identity */}
          <div className="lg:col-span-2 flex flex-col pr-0 lg:pr-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center border border-[#B49A70] text-[#B49A70]">
                <span className="font-serif text-sm font-semibold tracking-tighter">MP</span>
              </div>
              <span className="font-serif text-2xl tracking-[0.24em] text-white uppercase font-medium">
                MANI <span className="text-[#B49A70]">PALACE</span>
              </span>
            </div>
            
            <p className="text-xs uppercase tracking-[0.22em] text-[#B49A70] mb-4 font-sans font-medium">
              {t.homeIntro.heading}
            </p>

            <p className="text-sm text-[#FAF9F6]/75 leading-relaxed max-w-md mb-6 font-light">
              {t.homeIntro.p1}
            </p>

            {/* Mandatory Legal Details Box */}
            <div className="p-4 bg-[#282B28] border border-[#3E423E] text-xs space-y-2 text-[#FAF9F6]/85">
              <div className="flex items-center gap-2 text-[#B49A70] font-semibold tracking-wide">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-white">
                <span>Α.Φ.Μ.: <strong className="font-semibold">801410664</strong></span>
                <span className="text-[#3E423E]">·</span>
                <span>Αρ.ΓΕΜΗ: <strong className="font-semibold">156223083300</strong></span>
              </div>
              <div className="text-[11px] text-[#FAF9F6]/65 font-mono pt-0.5">
                manipalace.com
              </div>
            </div>
          </div>

          {/* Column 2: Primary Navigation Links */}
          <div className="flex flex-col">
            <h4 className="font-serif text-base tracking-widest uppercase mb-4 text-[#B49A70]">
              {language === 'el' ? 'Πλοήγηση' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF9F6]/75">
              <li>
                <button 
                  onClick={() => navigateTo('home')} 
                  className="hover:text-white transition-colors text-left"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="hover:text-white transition-colors text-left"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('services')} 
                  className="hover:text-white transition-colors text-left"
                >
                  {t.nav.activities}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('contact')} 
                  className="hover:text-white transition-colors text-left"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Official Company Activities */}
          <div className="flex flex-col">
            <h4 className="font-serif text-base tracking-widest uppercase mb-4 text-[#B49A70]">
              {t.activities.heading}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF9F6]/75">
              {t.activities.items.map((act) => (
                <li key={act.id}>
                  <button 
                    onClick={() => navigateTo('services')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    {act.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Domain */}
          <div className="flex flex-col">
            <h4 className="font-serif text-base tracking-widest uppercase mb-4 text-[#B49A70]">
              {t.nav.contact}
            </h4>
            <div className="space-y-3 text-sm text-[#FAF9F6]/75">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#B49A70] shrink-0" />
                <span className="text-xs font-mono text-[#FAF9F6]/85">
                  manipalace.com
                </span>
              </div>
              
              {settings.email ? (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#B49A70] shrink-0" />
                  <a href={`mailto:${settings.email}`} className="text-xs hover:text-white transition-colors">
                    {settings.email}
                  </a>
                </div>
              ) : null}

              {settings.phone ? (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#B49A70] shrink-0" />
                  <a href={`tel:${settings.phone}`} className="text-xs hover:text-white transition-colors">
                    {settings.phone}
                  </a>
                </div>
              ) : null}

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('contact')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#B49A70] hover:text-white transition-colors underline underline-offset-4"
                >
                  <span>{language === 'el' ? 'Φόρμα Επικοινωνίας' : 'Contact Form'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mandatory Regulatory Strip (Always visible on mobile and desktop) */}
      <div className="bg-[#181A18] border-t border-[#2D302D] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF9F6]/65">
          
          {/* Copyright & Mandatory Legal Identifiers */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-center md:text-left">
            <span>&copy; {currentYear} ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε. (MANI PALACE). {t.common.allRightsReserved}</span>
            <span className="hidden sm:inline text-[#3E423E]">·</span>
            <span className="font-mono text-white/90">Α.Φ.Μ.: 801410664</span>
            <span className="text-[#3E423E]">·</span>
            <span className="font-mono text-white/90">Αρ.ΓΕΜΗ: 156223083300</span>
            <span className="text-[#3E423E]">·</span>
            <span className="font-mono text-white/80">manipalace.com</span>
          </div>

          {/* Legal Pages */}
          <div className="flex items-center gap-4 text-xs">
            <button 
              onClick={() => navigateTo('privacy')}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              {language === 'el' ? 'Πολιτική Απορρήτου' : 'Privacy Policy'}
            </button>
            <span className="text-[#3E423E]">·</span>
            <button 
              onClick={() => navigateTo('cookies')}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              {language === 'el' ? 'Cookies' : 'Cookie Policy'}
            </button>
            <span className="text-[#3E423E]">·</span>
            <button 
              onClick={() => navigateTo('terms')}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              {language === 'el' ? 'Όροι Χρήσης' : 'Terms of Use'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

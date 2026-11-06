import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const ContactCtaSection: React.FC = () => {
  const { t, language, navigateTo } = useApp();

  return (
    <section className="py-20 sm:py-24 bg-[#F2F0EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold">
          <span className="w-5 h-[1px] bg-[#B49A70]" />
          <span>ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.</span>
          <span className="w-5 h-[1px] bg-[#B49A70]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#202320] font-normal leading-tight">
          {t.contact.title}
        </h2>

        <p className="text-base text-[#777A75] font-light max-w-2xl mx-auto leading-relaxed">
          {t.contact.subtitle}
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigateTo('contact')}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors shadow-sm"
          >
            <span>{language === 'el' ? 'Φόρμα Επικοινωνίας' : 'Contact Form'}</span>
            <ArrowRight className="w-4 h-4 text-[#B49A70]" />
          </button>
          
          <button
            onClick={() => navigateTo('about')}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#202320] bg-[#FAF9F6] hover:bg-white border border-[#E5E1DA] hover:border-[#B49A70]/60 transition-colors"
          >
            <span>{t.nav.about}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

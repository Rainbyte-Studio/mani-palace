import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const IntroSection: React.FC = () => {
  const { t, navigateTo } = useApp();
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial 2-Column Split: Concise Company Preview with Link to Complete Company Page */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Uploaded Architectural Exterior Photo */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[16/11] bg-[#F2F0EB] border border-[#E5E1DA] overflow-hidden">
              {!imgError ? (
                <img
                  src="/assets/aistudio/after-renovation-concept_acf6c3a0.png"
                  alt={t.company.heading}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 bg-[#F2F0EB] text-[#B49A70] font-serif text-xl tracking-widest">
                  MANI PALACE
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Η Εταιρεία Preview & Link */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold">
              <span className="w-5 h-[1px] bg-[#B49A70]" />
              <span>MANI PALACE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#202320] leading-tight font-normal">
              {t.company.heading}
            </h2>

            <p className="text-base text-[#202320]/90 font-light leading-relaxed">
              {t.company.p1}
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('about')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#202320] hover:text-[#B49A70] pb-1.5 border-b border-[#202320] hover:border-[#B49A70] transition-colors group"
              >
                <span>{t.company.readMoreCta}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B49A70] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

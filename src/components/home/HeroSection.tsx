import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t, navigateTo } = useApp();
  const [heroImgError, setHeroImgError] = useState(false);

  return (
    <section className="relative bg-[#FAF9F6] border-b border-[#E5E1DA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24">
        
        {/* Editorial 2-Column Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          
          {/* Left Column: Official Heading & Introduction Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-medium">
              <span className="w-6 h-[1px] bg-[#B49A70]" />
              <span>MANI PALACE · ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.</span>
            </div>

            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] text-[#202320] font-normal leading-[1.12] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {t.homeIntro.heading}
            </h1>

            <div className="space-y-5 pt-2 border-t border-[#E5E1DA]">
              <p className="text-base sm:text-lg text-[#202320] font-normal leading-relaxed">
                {t.homeIntro.p1}
              </p>

              <p className="text-sm sm:text-base text-[#777A75] font-light leading-relaxed">
                {t.homeIntro.p2}
              </p>
            </div>

            {/* Corporate CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => navigateTo('services')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors shadow-sm whitespace-nowrap shrink-0"
              >
                <span>{t.homeIntro.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 text-[#B49A70]" />
              </button>

              <button
                onClick={() => navigateTo('about')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#202320] bg-transparent hover:bg-[#F2F0EB] border border-[#E5E1DA] hover:border-[#B49A70]/60 transition-colors whitespace-nowrap shrink-0"
              >
                <span>{t.homeIntro.ctaSecondary}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Primary Uploaded Architectural Photograph */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative w-full h-full min-h-[340px] sm:min-h-[440px] bg-[#F2F0EB] border border-[#E5E1DA] overflow-hidden">
              {!heroImgError ? (
                <img
                  src="/assets/aistudio/main_d2337de3.png"
                  alt={t.homeIntro.heading}
                  onError={() => setHeroImgError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#F2F0EB] to-[#E5E1DA] text-[#777A75]">
                  <span className="font-serif text-2xl tracking-[0.25em] text-[#B49A70] uppercase">MANI PALACE</span>
                  <span className="text-xs mt-2 tracking-widest uppercase">ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileCheck, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { t, language, navigateTo } = useApp();

  return (
    <div className="bg-[#FAF9F6] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header — Section B: Η Εταιρεία */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold mb-3">
            <span className="w-5 h-[1px] bg-[#B49A70]" />
            <span>MANI PALACE · ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#202320] font-normal leading-tight">
            {t.company.heading}
          </h1>
        </div>

        {/* Section B Official Paragraphs & Editorial Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 pb-20 border-b border-[#E5E1DA]">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-lg text-[#202320] font-normal leading-relaxed">
              {t.company.p1}
            </p>
            <p className="text-base sm:text-lg text-[#777A75] font-light leading-relaxed">
              {t.company.p2}
            </p>

            <div className="pt-4">
              <button
                onClick={() => navigateTo('services')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors"
              >
                <span>{t.activities.heading}</span>
                <ArrowRight className="w-4 h-4 text-[#B49A70]" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
            <div className="sm:col-span-7 aspect-[4/3] sm:aspect-auto bg-[#F2F0EB] border border-[#E5E1DA] overflow-hidden">
              <img
                src="/assets/aistudio/after-renovation-concept_acf6c3a0.png"
                alt={t.company.heading}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="sm:col-span-5 aspect-[3/4] bg-[#F2F0EB] border border-[#E5E1DA] overflow-hidden">
              <img
                src="/assets/aistudio/509428661_3864358557052704_2698689397829950444_n_28c173b4.jpg"
                alt={t.company.heading}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Section D — Η Προσέγγισή μας */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 pb-20 border-b border-[#E5E1DA]">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="aspect-[4/3] bg-[#F2F0EB] border border-[#E5E1DA] overflow-hidden">
              <img
                src="/assets/aistudio/509356966_3864358600386033_2259075254764134773_n_c998942c.jpg"
                alt={t.approach.heading}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold">
              <span className="w-5 h-[1px] bg-[#B49A70]" />
              <span>MANI PALACE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202320] font-normal leading-tight">
              {t.approach.heading}
            </h2>
            <p className="text-base sm:text-lg text-[#202320] font-light leading-relaxed">
              {t.approach.p1}
            </p>
            <p className="text-base text-[#777A75] font-light leading-relaxed">
              {t.approach.p2}
            </p>
          </div>
        </div>

        {/* Official Corporate Registration Block */}
        <div className="p-8 sm:p-10 bg-[#F2F0EB] border border-[#E5E1DA] space-y-6">
          <div className="flex items-center gap-3 text-[#202320]">
            <FileCheck className="w-5 h-5 text-[#B49A70]" />
            <h3 className="font-serif text-2xl font-normal">
              {t.company.registryTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
            <div className="p-5 bg-white border border-[#E5E1DA]">
              <span className="text-[10px] uppercase tracking-wider text-[#777A75] block mb-1">
                {language === 'el' ? 'Επωνυμία' : 'Legal Name'}
              </span>
              <span className="font-semibold text-[#202320]">
                ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.
              </span>
            </div>

            <div className="p-5 bg-white border border-[#E5E1DA]">
              <span className="text-[10px] uppercase tracking-wider text-[#777A75] block mb-1">
                {t.common.vatLabel}
              </span>
              <span className="font-mono text-sm font-semibold text-[#202320] tabular-nums">
                801410664
              </span>
            </div>

            <div className="p-5 bg-white border border-[#E5E1DA]">
              <span className="text-[10px] uppercase tracking-wider text-[#777A75] block mb-1">
                {t.common.gemiLabel}
              </span>
              <span className="font-mono text-sm font-semibold text-[#202320] tabular-nums">
                156223083300
              </span>
            </div>

            <div className="p-5 bg-white border border-[#E5E1DA]">
              <span className="text-[10px] uppercase tracking-wider text-[#777A75] block mb-1">
                Domain
              </span>
              <span className="font-mono text-sm font-semibold text-[#202320]">
                manipalace.com
              </span>
            </div>
          </div>
        </div>

        {/* Contact Action */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigateTo('contact')}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors"
          >
            <span>{t.nav.contact}</span>
            <ArrowRight className="w-4 h-4 text-[#B49A70]" />
          </button>
        </div>

      </div>
    </div>
  );
};

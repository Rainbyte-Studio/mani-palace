import React from 'react';
import { useApp } from '../../context/AppContext';

export const InvestmentSection: React.FC = () => {
  const { t } = useApp();

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Official Section D — Η Προσέγγισή μας */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold">
              <span className="w-5 h-[1px] bg-[#B49A70]" />
              <span>MANI PALACE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#202320] font-normal leading-tight">
              {t.approach.heading}
            </h2>

            <div className="space-y-5 pt-2">
              <p className="text-base sm:text-lg text-[#202320] font-light leading-relaxed">
                {t.approach.p1}
              </p>

              <p className="text-base text-[#777A75] font-light leading-relaxed border-t border-[#E5E1DA] pt-5">
                {t.approach.p2}
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Architectural & Interior Photo Composition */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
            <div className="sm:col-span-7 aspect-[4/5] bg-[#F2F0EB] border border-[#E5E1DA] overflow-hidden">
              <img
                src="/assets/aistudio/509356966_3864358600386033_2259075254764134773_n_c998942c.jpg"
                alt={t.approach.heading}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="sm:col-span-5 flex flex-col gap-4">
              <div className="aspect-[4/5] sm:aspect-auto sm:flex-1 bg-[#F2F0EB] border border-[#E5E1DA] overflow-hidden">
                <img
                  src="/assets/aistudio/508712159_3864358690386024_1590953754644817201_n_d593d81d.jpg"
                  alt={t.approach.heading}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="aspect-[4/5] sm:aspect-auto sm:flex-1 bg-[#F2F0EB] border border-[#E5E1DA] overflow-hidden">
                <img
                  src="/assets/aistudio/509422181_3864358710386022_5409755785406643769_n_b1d89ba9.jpg"
                  alt={t.approach.heading}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

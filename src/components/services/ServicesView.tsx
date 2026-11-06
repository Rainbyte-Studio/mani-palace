import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { t, navigateTo } = useApp();

  return (
    <div className="bg-[#FAF9F6] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header — Section C: Η Δραστηριότητά μας */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold mb-3">
            <span className="w-5 h-[1px] bg-[#B49A70]" />
            <span>MANI PALACE · ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#202320] font-normal leading-tight">
            {t.activities.heading}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#777A75] font-light leading-relaxed">
            {t.homeIntro.p1}
          </p>
        </div>

        {/* Four Official Activities Editorial Presentation */}
        <div className="space-y-12 sm:space-y-16">
          {t.activities.items.map((activity, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <section
                key={activity.id}
                className="bg-white border border-[#E5E1DA] hover:border-[#B49A70]/60 transition-colors duration-300 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  
                  {/* Image Column */}
                  <div className={`lg:col-span-6 aspect-[16/10] lg:aspect-auto bg-[#F2F0EB] overflow-hidden ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <img
                      src={activity.image}
                      alt={activity.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Text Column */}
                  <div className={`lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-3xl sm:text-4xl text-[#B49A70] font-light">
                        {activity.num}.
                      </span>
                      <span className="w-8 h-[1px] bg-[#E5E1DA]" />
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl text-[#202320] font-normal leading-snug">
                      {activity.title}
                    </h2>

                    <p className="text-base text-[#777A75] font-light leading-relaxed">
                      {activity.description}
                    </p>
                  </div>

                </div>
              </section>
            );
          })}
        </div>

        {/* Section D — Η Προσέγγισή μας */}
        <div className="mt-20 pt-20 border-t border-[#E5E1DA]">
          <div className="bg-[#F2F0EB] border border-[#E5E1DA] p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold">
                  <span className="w-5 h-[1px] bg-[#B49A70]" />
                  <span>MANI PALACE</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#202320] font-normal">
                  {t.approach.heading}
                </h2>
                <p className="text-base text-[#202320] font-light leading-relaxed">
                  {t.approach.p1}
                </p>
                <p className="text-base text-[#777A75] font-light leading-relaxed">
                  {t.approach.p2}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigateTo('contact')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors"
                  >
                    <span>{t.nav.contact}</span>
                    <ArrowRight className="w-4 h-4 text-[#B49A70]" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="aspect-[4/3] bg-white border border-[#E5E1DA] overflow-hidden">
                  <img
                    src="/assets/aistudio/508712159_3864358690386024_1590953754644817201_n_d593d81d.jpg"
                    alt={t.approach.heading}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

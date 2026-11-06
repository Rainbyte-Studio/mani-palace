import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const ServicesOverviewSection: React.FC = () => {
  const { t, navigateTo } = useApp();

  return (
    <section className="py-20 sm:py-28 bg-[#F2F0EB] border-b border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold mb-3">
              <span className="w-5 h-[1px] bg-[#B49A70]" />
              <span>MANI PALACE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#202320] font-normal leading-tight">
              {t.activities.heading}
            </h2>
          </div>

          <button
            onClick={() => navigateTo('services')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#202320] hover:text-[#B49A70] transition-colors group self-start md:self-auto"
          >
            <span>{t.activities.heading}</span>
            <ArrowUpRight className="w-4 h-4 text-[#B49A70] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Four Official Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {t.activities.items.map((activity) => (
            <article
              key={activity.id}
              className="group bg-[#FAF9F6] border border-[#E5E1DA] hover:border-[#B49A70]/60 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Uploaded Photograph */}
              <div className="relative aspect-[16/10] bg-[#E5E1DA] overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4 bg-[#202320]/90 text-[#B49A70] px-3 py-1 font-serif text-sm tracking-widest">
                  {activity.num}.
                </div>
              </div>

              {/* Complete Official Description */}
              <div className="p-7 sm:p-8 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-[#202320] font-medium leading-snug">
                    {activity.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#777A75] font-light leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from '../ui/PropertyCard';
import { ArrowRight, Info } from 'lucide-react';

export const FeaturedPropertiesSection: React.FC = () => {
  const { properties, t, navigateTo, language } = useApp();

  const featured = properties
    .filter(p => p.status === 'published' && p.isFeatured)
    .slice(0, 3);

  return (
    <section className="py-20 bg-[#F2F0EB] border-y border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold mb-2">
              <span className="w-5 h-[1px] bg-[#B49A70]" />
              <span>{t.properties.featuredBadge}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202320] font-normal">
              {t.properties.title}
            </h2>
          </div>

          <button
            onClick={() => navigateTo('properties')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#202320] hover:text-[#B49A70] transition-colors group"
          >
            <span>{t.common.viewAllProperties}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Demo content notice */}
        <div className="mb-8 p-3.5 bg-[#FAF9F6] border border-[#E5E1DA] text-xs text-[#777A75] flex items-center gap-2.5">
          <Info className="w-4 h-4 text-[#B49A70] shrink-0" />
          <span>{t.common.demoNote}</span>
        </div>

        {/* Grid of properties */}
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#FAF9F6] border border-[#E5E1DA] p-8">
            <p className="text-sm text-[#777A75]">{t.properties.noResultsDesc}</p>
          </div>
        )}

      </div>
    </section>
  );
};

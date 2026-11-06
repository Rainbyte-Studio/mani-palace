import React, { useState } from 'react';
import { Property } from '../../types';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, Bed, Bath, Maximize2, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  layout = 'grid',
}) => {
  const { language, t, navigateTo } = useApp();
  const [imageError, setImageError] = useState(false);

  const title = property.title[language] || property.title.el;
  const description = property.description[language] || property.description.el;
  const coverImage = property.images.find(img => img.isCover) || property.images[0];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'el' ? 'el-GR' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'residential_villa':
        return language === 'el' ? 'Έπαυλη' : 'Luxury Villa';
      case 'residential_apartment':
        return language === 'el' ? 'Διαμέρισμα' : 'Apartment';
      case 'residential_penthouse':
        return language === 'el' ? 'Ρετιρέ' : 'Penthouse';
      case 'residential_maisonette':
        return language === 'el' ? 'Μεζονέτα' : 'Maisonette';
      case 'commercial_office':
        return language === 'el' ? 'Κτίριο Γραφείων' : 'Commercial Office';
      case 'commercial_retail':
        return language === 'el' ? 'Εμπορικό Ακίνητο' : 'Commercial Retail';
      case 'commercial_hotel':
        return language === 'el' ? 'Ξενοδοχειακό Ακίνητο' : 'Hospitality Asset';
      case 'land_plot':
        return language === 'el' ? 'Οικόπεδο / Έκταση' : 'Land Parcel';
      case 'investment_portfolio':
        return language === 'el' ? 'Επενδυτικό Χαρτοφυλάκιο' : 'Investment Portfolio';
      default:
        return language === 'el' ? 'Ακίνητο' : 'Property';
    }
  };

  const handleCardClick = () => {
    navigateTo('property-detail', property.id);
  };

  if (layout === 'list') {
    return (
      <div 
        onClick={handleCardClick}
        className="group cursor-pointer bg-[#FAF9F6] border border-[#E5E1DA] hover:border-[#B49A70]/60 transition-all duration-300 flex flex-col md:flex-row overflow-hidden"
      >
        {/* Image slot */}
        <div className="relative md:w-2/5 aspect-[16/10] md:aspect-auto bg-[#F2F0EB] overflow-hidden shrink-0">
          {!imageError && coverImage?.url ? (
            <img
              src={coverImage.url}
              alt={title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#F2F0EB] to-[#E5E1DA] text-[#777A75]">
              <span className="font-serif text-lg tracking-widest text-[#B49A70] uppercase">MANI PALACE</span>
              <span className="text-xs mt-1 text-[#777A75] font-light">{property.referenceNumber}</span>
            </div>
          )}

          {/* Minimal non-pill listing indicator */}
          <div className="absolute top-3 left-3 bg-[#202320]/85 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase">
            {property.listingType === 'sale' ? t.properties.filterSale : t.properties.filterRent}
          </div>

          {property.isDemo && (
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#202320] px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono">
              Demo
            </div>
          )}
        </div>

        {/* Content slot */}
        <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
          <div>
            {/* Zero-pill metadata line */}
            <div className="flex items-center gap-2 text-xs text-[#777A75] mb-2 tracking-wide uppercase font-medium">
              <span>{getCategoryLabel(property.category)}</span>
              <span aria-hidden="true">·</span>
              <span>{property.location.city}, {property.location.region}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{property.referenceNumber}</span>
            </div>

            <h3 className="font-serif text-xl md:text-2xl text-[#202320] group-hover:text-[#B49A70] transition-colors leading-snug mb-3">
              {title}
            </h3>

            <p className="text-sm text-[#777A75] line-clamp-2 leading-relaxed mb-6 font-light">
              {description}
            </p>
          </div>

          <div>
            {/* Key specs strip */}
            <div className="flex items-center gap-6 py-3 border-t border-[#E5E1DA] text-xs text-[#202320]">
              <div className="flex items-center gap-1.5 font-medium">
                <Maximize2 className="w-3.5 h-3.5 text-[#B49A70]" />
                <span className="tabular-nums font-mono">{property.sizeSqm}</span> {t.common.sqm}
              </div>
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-1.5 font-medium">
                  <Bed className="w-3.5 h-3.5 text-[#B49A70]" />
                  <span className="tabular-nums font-mono">{property.bedrooms}</span> {t.common.beds}
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center gap-1.5 font-medium">
                  <Bath className="w-3.5 h-3.5 text-[#B49A70]" />
                  <span className="tabular-nums font-mono">{property.bathrooms}</span> {t.common.baths}
                </div>
              )}
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E5E1DA]">
              <div className="flex flex-col">
                <span className="text-[10px] tracking-widest uppercase text-[#777A75] font-medium">
                  {property.listingType === 'rent' ? `${t.properties.filterRent} / μήνα` : t.properties.filterSale}
                </span>
                <span className="font-serif text-xl md:text-2xl font-semibold text-[#202320] tabular-nums">
                  {formatPrice(property.price)}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#202320] group-hover:text-[#B49A70] transition-colors">
                <span>{t.common.viewProperty}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid layout
  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer bg-[#FAF9F6] border border-[#E5E1DA] hover:border-[#B49A70]/60 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Image slot */}
      <div className="relative aspect-[16/11] bg-[#F2F0EB] overflow-hidden">
        {!imageError && coverImage?.url ? (
          <img
            src={coverImage.url}
            alt={title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#F2F0EB] to-[#E5E1DA] text-[#777A75]">
            <span className="font-serif text-lg tracking-widest text-[#B49A70] uppercase">MANI PALACE</span>
            <span className="text-xs mt-1 text-[#777A75] font-light">{property.referenceNumber}</span>
          </div>
        )}

        {/* Minimal unboxed type tag */}
        <div className="absolute top-3 left-3 bg-[#202320]/85 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase">
          {property.listingType === 'sale' ? t.properties.filterSale : t.properties.filterRent}
        </div>

        {property.isDemo && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#202320] px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono">
            Demo
          </div>
        )}

        {property.status === 'under_offer' && (
          <div className="absolute top-3 right-3 bg-[#B49A70] text-white px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase">
            {t.properties.underOfferBadge}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
        <div>
          {/* Zero-pill metadata line */}
          <div className="flex items-center gap-2 text-xs text-[#777A75] mb-2 tracking-wide uppercase font-medium">
            <span>{getCategoryLabel(property.category)}</span>
            <span aria-hidden="true">·</span>
            <span>{property.location.city}</span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl text-[#202320] group-hover:text-[#B49A70] transition-colors leading-snug line-clamp-2 mb-3">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-[#777A75] mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#B49A70] shrink-0" />
            <span className="truncate">{property.location.areaName ? `${property.location.areaName}, ` : ''}{property.location.city}, {property.location.region}</span>
          </div>
        </div>

        <div>
          {/* Key specs strip */}
          <div className="flex items-center justify-between py-2.5 border-t border-[#E5E1DA] text-xs text-[#202320]">
            <div className="flex items-center gap-1 font-medium">
              <Maximize2 className="w-3.5 h-3.5 text-[#B49A70]" />
              <span className="tabular-nums font-mono">{property.sizeSqm}</span> {t.common.sqm}
            </div>
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1 font-medium">
                <Bed className="w-3.5 h-3.5 text-[#B49A70]" />
                <span className="tabular-nums font-mono">{property.bedrooms}</span> {t.common.beds}
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1 font-medium">
                <Bath className="w-3.5 h-3.5 text-[#B49A70]" />
                <span className="tabular-nums font-mono">{property.bathrooms}</span> {t.common.baths}
              </div>
            )}
          </div>

          {/* Price strip */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E5E1DA]">
            <div className="flex flex-col">
              <span className="text-[10px] tracking-widest uppercase text-[#777A75] font-medium">
                {property.listingType === 'rent' ? `${t.properties.filterRent} / μήνα` : t.properties.filterSale}
              </span>
              <span className="font-serif text-lg sm:text-xl font-semibold text-[#202320] tabular-nums">
                {formatPrice(property.price)}
              </span>
            </div>

            <div className="w-8 h-8 flex items-center justify-center border border-[#E5E1DA] group-hover:border-[#B49A70] group-hover:bg-[#B49A70] group-hover:text-white transition-colors text-[#202320]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

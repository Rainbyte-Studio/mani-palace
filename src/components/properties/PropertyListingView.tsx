import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from '../ui/PropertyCard';
import { 
  Filter, 
  Grid, 
  List, 
  X, 
  ChevronDown, 
  RotateCcw,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { PropertyCategory, PropertyListingType, FilterState } from '../../types';

interface PropertyListingViewProps {
  initialListingType?: 'all' | 'sale' | 'rent';
  initialCategory?: string;
  initialLocation?: string;
  initialMaxPrice?: number | null;
}

export const PropertyListingView: React.FC<PropertyListingViewProps> = ({
  initialListingType = 'all',
  initialCategory = 'all',
  initialLocation = '',
  initialMaxPrice = null,
}) => {
  const { properties, t, language } = useApp();

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter state
  const [listingType, setListingType] = useState<'all' | 'sale' | 'rent'>(initialListingType);
  const [category, setCategory] = useState<string>(initialCategory);
  const [locationSearch, setLocationSearch] = useState<string>(initialLocation);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>(initialMaxPrice ? initialMaxPrice.toString() : '');
  const [minSize, setMinSize] = useState<string>('');
  const [maxSize, setMaxSize] = useState<string>('');
  const [bedrooms, setBedrooms] = useState<string>('any');
  const [bathrooms, setBathrooms] = useState<string>('any');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'newest' | 'size_desc'>('featured');

  // Available feature filters
  const availableFeatures = [
    { key: 'sea_view', label: language === 'el' ? 'Θέα Θάλασσα' : 'Sea View' },
    { key: 'private_pool', label: language === 'el' ? 'Ιδιωτική Πισίνα' : 'Private Pool' },
    { key: 'smart_home', label: language === 'el' ? 'Smart Home / KNX' : 'Smart Home' },
    { key: 'garden', label: language === 'el' ? 'Κήπος' : 'Garden' },
    { key: 'security_system', label: language === 'el' ? 'Σύστημα Ασφαλείας' : 'Security System' },
    { key: 'elevator', label: language === 'el' ? 'Ανελκυστήρας' : 'Elevator' },
    { key: 'roof_garden', label: language === 'el' ? 'Roof Garden' : 'Roof Garden' },
  ];

  const toggleFeature = (key: string) => {
    setSelectedFeatures(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setListingType('all');
    setCategory('all');
    setLocationSearch('');
    setMinPrice('');
    setMaxPrice('');
    setMinSize('');
    setMaxSize('');
    setBedrooms('any');
    setBathrooms('any');
    setSelectedFeatures([]);
    setSortBy('featured');
    setCurrentPage(1);
  };

  // Filtered and sorted listings
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Must be published or under_offer
        if (p.status !== 'published' && p.status !== 'under_offer') return false;

        // Listing type
        if (listingType !== 'all' && p.listingType !== listingType) return false;

        // Category
        if (category !== 'all' && p.category !== category) return false;

        // Location text
        if (locationSearch.trim()) {
          const query = locationSearch.toLowerCase().trim();
          const matchCity = p.location.city.toLowerCase().includes(query);
          const matchRegion = p.location.region.toLowerCase().includes(query);
          const matchArea = p.location.areaName?.toLowerCase().includes(query);
          const matchTitleEl = p.title.el.toLowerCase().includes(query);
          const matchTitleEn = p.title.en.toLowerCase().includes(query);
          if (!matchCity && !matchRegion && !matchArea && !matchTitleEl && !matchTitleEn) return false;
        }

        // Price
        if (minPrice && p.price < Number(minPrice)) return false;
        if (maxPrice && p.price > Number(maxPrice)) return false;

        // Size
        if (minSize && p.sizeSqm < Number(minSize)) return false;
        if (maxSize && p.sizeSqm > Number(maxSize)) return false;

        // Bedrooms
        if (bedrooms !== 'any' && p.bedrooms < Number(bedrooms)) return false;

        // Bathrooms
        if (bathrooms !== 'any' && p.bathrooms < Number(bathrooms)) return false;

        // Features
        if (selectedFeatures.length > 0) {
          const hasAllFeatures = selectedFeatures.every(f => p.features.includes(f));
          if (!hasAllFeatures) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'size_desc') return b.sizeSqm - a.sizeSqm;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
      });
  }, [
    properties,
    listingType,
    category,
    locationSearch,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    bedrooms,
    bathrooms,
    selectedFeatures,
    sortBy,
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(start, start + itemsPerPage);
  }, [filteredProperties, currentPage]);

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold mb-2">
            <span className="w-5 h-[1px] bg-[#B49A70]" />
            <span>MANI PALACE · {language === 'el' ? 'Χαρτοφυλάκιο Ακινήτων' : 'Property Portfolio'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#202320] font-normal leading-tight">
            {t.properties.title}
          </h1>
          <p className="mt-2 text-base text-[#777A75] font-light max-w-2xl">
            {t.properties.subtitle}
          </p>
        </div>

        {/* Demo Content Warning Box */}
        <div className="mb-8 p-4 bg-[#F2F0EB] border border-[#E5E1DA] flex items-center justify-between gap-4 text-xs text-[#777A75]">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#B49A70] shrink-0" />
            <span>{t.common.demoNote}</span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#202320] bg-white px-2 py-0.5 border border-[#E5E1DA] shrink-0 hidden sm:inline-block">
            {filteredProperties.length} {language === 'el' ? 'Ακίνητα' : 'Listings'}
          </span>
        </div>

        {/* Filter Bar & Controls */}
        <div className="bg-white border border-[#E5E1DA] p-5 sm:p-6 mb-8 shadow-sm">
          
          {/* Top Filter Row: Type Tabs & Search Input */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-5 border-b border-[#E5E1DA]">
            
            {/* Type selector (Buy / Rent / All) */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => { setListingType('all'); setCurrentPage(1); }}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  listingType === 'all'
                    ? 'bg-[#202320] text-white'
                    : 'text-[#777A75] hover:text-[#202320] hover:bg-[#F2F0EB]'
                }`}
              >
                {t.properties.filterAll}
              </button>
              <button
                type="button"
                onClick={() => { setListingType('sale'); setCurrentPage(1); }}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  listingType === 'sale'
                    ? 'bg-[#202320] text-white'
                    : 'text-[#777A75] hover:text-[#202320] hover:bg-[#F2F0EB]'
                }`}
              >
                {t.properties.filterSale}
              </button>
              <button
                type="button"
                onClick={() => { setListingType('rent'); setCurrentPage(1); }}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  listingType === 'rent'
                    ? 'bg-[#202320] text-white'
                    : 'text-[#777A75] hover:text-[#202320] hover:bg-[#F2F0EB]'
                }`}
              >
                {t.properties.filterRent}
              </button>
            </div>

            {/* Quick text location search */}
            <div className="flex-grow max-w-md">
              <input
                type="text"
                value={locationSearch}
                onChange={(e) => { setLocationSearch(e.target.value); setCurrentPage(1); }}
                placeholder={language === 'el' ? 'Αναζήτηση με πόλη, περιοχή, τίτλο...' : 'Search by city, region, title...'}
                className="w-full px-3.5 py-2 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] placeholder-[#777A75]/60 focus:outline-none focus:border-[#B49A70]"
              />
            </div>

            {/* View Layout Toggle & Mobile Filter Toggle */}
            <div className="flex items-center gap-3 justify-between lg:justify-end">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-[#E5E1DA] text-[#202320]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#B49A70]" />
                <span>{t.common.filter}</span>
              </button>

              <div className="flex items-center border border-[#E5E1DA]">
                <button
                  onClick={() => setLayout('grid')}
                  className={`p-2 transition-colors ${layout === 'grid' ? 'bg-[#202320] text-white' : 'text-[#777A75] hover:text-[#202320]'}`}
                  title={t.properties.gridView}
                  aria-label={t.properties.gridView}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayout('list')}
                  className={`p-2 transition-colors ${layout === 'list' ? 'bg-[#202320] text-white' : 'text-[#777A75] hover:text-[#202320]'}`}
                  title={t.properties.listView}
                  aria-label={t.properties.listView}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Secondary Filter Row: Category, Price, Bedrooms, Sort */}
          <div className={`pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 ${showMobileFilters ? 'block' : 'hidden lg:grid'}`}>
            
            {/* Category dropdown */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#777A75]">
                {language === 'el' ? 'Κατηγορία' : 'Category'}
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
                  className="w-full appearance-none px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70] pr-8 cursor-pointer"
                >
                  <option value="all">{t.properties.allCategories}</option>
                  <option value="residential_villa">{language === 'el' ? 'Έπαυλη' : 'Luxury Villa'}</option>
                  <option value="residential_apartment">{language === 'el' ? 'Διαμέρισμα' : 'Apartment'}</option>
                  <option value="residential_penthouse">{language === 'el' ? 'Ρετιρέ' : 'Penthouse'}</option>
                  <option value="residential_maisonette">{language === 'el' ? 'Μεζονέτα' : 'Maisonette'}</option>
                  <option value="commercial_office">{language === 'el' ? 'Γραφεία / Κτίριο' : 'Office Building'}</option>
                  <option value="land_plot">{language === 'el' ? 'Οικόπεδο / Έκταση' : 'Land Parcel'}</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-[#777A75] pointer-events-none" />
              </div>
            </div>

            {/* Min Price */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#777A75]">
                {language === 'el' ? 'Ελάχιστη Τιμή (€)' : 'Min Price (€)'}
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }}
                placeholder="π.χ. 500000"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
              />
            </div>

            {/* Max Price */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#777A75]">
                {language === 'el' ? 'Μέγιστη Τιμή (€)' : 'Max Price (€)'}
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
                placeholder="π.χ. 5000000"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
              />
            </div>

            {/* Bedrooms */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#777A75]">
                {t.properties.bedrooms}
              </label>
              <div className="relative">
                <select
                  value={bedrooms}
                  onChange={(e) => { setBedrooms(e.target.value); setCurrentPage(1); }}
                  className="w-full appearance-none px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70] pr-8 cursor-pointer"
                >
                  <option value="any">{language === 'el' ? 'Οποιοδήποτε' : 'Any'}</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-[#777A75] pointer-events-none" />
              </div>
            </div>

            {/* Sort by */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#777A75]">
                {t.properties.sortBy}
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full appearance-none px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70] pr-8 cursor-pointer"
                >
                  <option value="featured">{t.properties.sortFeatured}</option>
                  <option value="price_asc">{t.properties.sortPriceAsc}</option>
                  <option value="price_desc">{t.properties.sortPriceDesc}</option>
                  <option value="size_desc">{t.properties.sortSizeDesc}</option>
                  <option value="newest">{t.properties.sortNewest}</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-[#777A75] pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Feature toggles */}
          <div className="pt-4 mt-4 border-t border-[#E5E1DA] flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#777A75] mr-2">
              {language === 'el' ? 'Χαρακτηριστικά:' : 'Amenities:'}
            </span>
            {availableFeatures.map((feat) => {
              const active = selectedFeatures.includes(feat.key);
              return (
                <button
                  key={feat.key}
                  type="button"
                  onClick={() => toggleFeature(feat.key)}
                  className={`px-2.5 py-1 text-xs border transition-colors ${
                    active
                      ? 'bg-[#202320] text-white border-[#202320]'
                      : 'bg-[#FAF9F6] text-[#777A75] border-[#E5E1DA] hover:border-[#B49A70]'
                  }`}
                >
                  {feat.label}
                </button>
              );
            })}

            {/* Reset Filter Button */}
            <button
              onClick={handleResetFilters}
              className="ml-auto inline-flex items-center gap-1.5 text-xs text-[#777A75] hover:text-[#202320] transition-colors py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.properties.resetFilters}</span>
            </button>
          </div>

        </div>

        {/* Results Count & Current Active Filters Summary */}
        <div className="flex items-center justify-between text-xs text-[#777A75] mb-6">
          <div>
            <span>{language === 'el' ? 'Εμφάνιση' : 'Showing'} </span>
            <strong className="text-[#202320] font-mono">{filteredProperties.length}</strong>
            <span> {language === 'el' ? 'αποτελεσμάτων' : 'properties'}</span>
          </div>
          <div>
            <span>{language === 'el' ? 'Σελίδα' : 'Page'} </span>
            <strong className="text-[#202320] font-mono">{currentPage}</strong>
            <span> / {totalPages || 1}</span>
          </div>
        </div>

        {/* Properties Presentation (Grid / List) */}
        {paginatedProperties.length > 0 ? (
          <div className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
            {paginatedProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} layout={layout} />
            ))}
          </div>
        ) : (
          /* Polished Empty State */
          <div className="text-center py-20 bg-white border border-[#E5E1DA] p-10 max-w-2xl mx-auto space-y-4">
            <h3 className="font-serif text-2xl text-[#202320]">
              {t.properties.noResultsTitle}
            </h3>
            <p className="text-sm text-[#777A75] max-w-md mx-auto leading-relaxed">
              {t.properties.noResultsDesc}
            </p>
            <div className="pt-4">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.properties.resetFilters}</span>
              </button>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-medium border border-[#E5E1DA] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#B49A70] transition-colors"
            >
              {language === 'el' ? 'Προηγούμενη' : 'Previous'}
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 text-xs font-mono font-medium transition-colors ${
                    currentPage === pageNum
                      ? 'bg-[#202320] text-white'
                      : 'border border-[#E5E1DA] text-[#202320] hover:border-[#B49A70]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-medium border border-[#E5E1DA] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#B49A70] transition-colors"
            >
              {language === 'el' ? 'Επόμενη' : 'Next'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

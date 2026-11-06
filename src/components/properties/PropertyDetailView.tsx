import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  MapPin, 
  Maximize2, 
  Bed, 
  Bath, 
  Layers, 
  Calendar, 
  Zap, 
  Share2, 
  Check, 
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { PropertyCard } from '../ui/PropertyCard';

interface PropertyDetailViewProps {
  propertyId: string;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({ propertyId }) => {
  const { properties, t, language, navigateTo, addEnquiry } = useApp();

  const property = properties.find((p) => p.id === propertyId);

  // Gallery current index
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Direct Enquiry Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    language === 'el'
      ? `Ενδιαφέρομαι για περισσότερες πληροφορίες σχετικά με το ακίνητο ${property?.referenceNumber || ''}.`
      : `I am interested in receiving further information regarding listing ${property?.referenceNumber || ''}.`
  );
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-[#FAF9F6]">
        <h2 className="font-serif text-2xl text-[#202320] mb-4">
          {language === 'el' ? 'Το ακίνητο δεν βρέθηκε' : 'Property Not Found'}
        </h2>
        <button
          onClick={() => navigateTo('properties')}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'el' ? 'Επιστροφή στα Ακίνητα' : 'Back to Listings'}</span>
        </button>
      </div>
    );
  }

  const title = property.title[language] || property.title.el;
  const description = property.description[language] || property.description.el;
  const images = property.images && property.images.length > 0 
    ? property.images 
    : [{ url: '', alt: 'Property' }];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'el' ? 'el-GR' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const featureLabels: Record<string, { el: string; en: string }> = {
    sea_view: { el: 'Θέα Θάλασσα', en: 'Sea View' },
    private_pool: { el: 'Ιδιωτική Πισίνα Υπερχείλισης', en: 'Private Infinity Pool' },
    smart_home: { el: 'Αυτοματισμοί KNX / Smart Home', en: 'KNX / Smart Home' },
    garden: { el: 'Διαμορφωμένος Κήπος', en: 'Landscaped Garden' },
    security_system: { el: 'Σύστημα Συναγερμού & CCTV', en: 'Alarm & CCTV' },
    underfloor_heating: { el: 'Ενδοδαπέδια Θέρμανση', en: 'Underfloor Heating' },
    elevator: { el: 'Ανελκυστήρας', en: 'Elevator' },
    garage_3_cars: { el: 'Κλειστό Γκαράζ 3 Θέσεων', en: '3-Car Enclosed Garage' },
    garage_4_cars: { el: 'Κλειστό Γκαράζ 4 Θέσεων', en: '4-Car Enclosed Garage' },
    city_view: { el: 'Πανοραμική Θέα Πόλης', en: 'Panoramic City View' },
    roof_garden: { el: 'Ιδιωτικό Roof Garden', en: 'Private Roof Garden' },
    jacuzzi: { el: 'Εξωτερικό Jacuzzi', en: 'Outdoor Jacuzzi' },
    fireplace: { el: 'Ενεργειακό Τζάκι', en: 'Energy Fireplace' },
    concierge: { el: 'Υπηρεσία Concierge', en: 'Concierge Service' },
    storage_room: { el: 'Αποθήκη', en: 'Storage Space' },
    underground_parking: { el: 'Υπόγειο Parking', en: 'Underground Parking' },
    guest_house: { el: 'Ανεξάρτητος Ξενώνας', en: 'Independent Guest House' },
    gym: { el: 'Ιδιωτικό Γυμναστήριο', en: 'Private Fitness Suite' },
    sauna: { el: 'Sauna / Spa', en: 'Sauna / Spa Suite' },
    wine_cellar: { el: 'Κάβα Κρασιών (Wine Cellar)', en: 'Wine Cellar' },
    direct_sea_access: { el: 'Άμεση Πρόσβαση σε Ακτή', en: 'Direct Beach Access' },
    outdoor_kitchen: { el: 'Υπαίθρια Κουζίνα & BBQ', en: 'Outdoor Summer Kitchen & BBQ' },
    helipad_access: { el: 'Δυνατότητα Προσγείωσης Ελικοπτέρου', en: 'Helipad Access' },
    daily_housekeeping: { el: 'Δυνατότητα Καθημερινής Καθαριότητας', en: 'Housekeeping Provision' },
    staff_quarters: { el: 'Χώροι Προσωπικού', en: 'Staff Quarters' },
    leed_certified: { el: 'Πιστοποίηση LEED Gold', en: 'LEED Gold Certified' },
    generator_backup: { el: 'Γεννήτρια Αυτονομίας', en: 'Backup Generator' },
    fiber_optic: { el: 'Δίκτυο Οπτικών Ινών', en: 'Dual Fiber Grid' },
    building_permit: { el: 'Εγκεκριμένη Οικοδομική Άδεια', en: 'Approved Building Permit' },
    electricity_connected: { el: 'Σύνδεση Δικτύου Ρεύματος', en: 'Electrical Connection' },
    water_drilling: { el: 'Γεώτρηση / Παροχή Νερού', en: 'Water Supply / Well' },
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprConsent) return;
    setIsSubmitting(true);
    await addEnquiry({
      propertyId: property.id,
      propertyReference: property.referenceNumber,
      propertyTitle: title,
      enquiryType: 'property_inquiry',
      fullName,
      email,
      phone,
      subject: `${language === 'el' ? 'Ενδιαφέρον για' : 'Inquiry for'} ${property.referenceNumber}`,
      message,
      gdprConsent,
    });
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Related properties (same listing type or region, excluding current)
  const relatedProperties = properties
    .filter(p => p.id !== property.id && p.status === 'published')
    .slice(0, 3);

  return (
    <div className="bg-[#FAF9F6] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar & Back CTA */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigateTo('properties')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#777A75] hover:text-[#202320] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#B49A70]" />
            <span>{t.common.back} {language === 'el' ? 'στα Ακίνητα' : 'to Listings'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#777A75] hover:text-[#202320] border border-[#E5E1DA] hover:border-[#B49A70] transition-colors bg-white"
              title="Αντιγραφή συνδέσμου"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5 text-[#B49A70]" />}
              <span>{copiedLink ? (language === 'el' ? 'Αντιγράφηκε' : 'Copied!') : (language === 'el' ? 'Κοινοποίηση' : 'Share')}</span>
            </button>
          </div>
        </div>

        {/* Demo Content Disclosure */}
        {property.isDemo && (
          <div className="mb-6 p-3.5 bg-[#F2F0EB] border border-[#E5E1DA] flex items-center gap-2.5 text-xs text-[#777A75]">
            <Info className="w-4 h-4 text-[#B49A70] shrink-0" />
            <span>{t.common.demoNote}</span>
          </div>
        )}

        {/* Title, Ref, and Pricing Strip */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E1DA] mb-8">
          <div className="space-y-2">
            {/* Zero-pill metadata line */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#777A75] tracking-wider uppercase font-medium">
              <span className="font-mono text-[#202320] font-semibold">{property.referenceNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#B49A70] font-semibold">
                {property.listingType === 'sale' ? t.properties.filterSale : t.properties.filterRent}
              </span>
              <span aria-hidden="true">·</span>
              <span>{property.location.city}, {property.location.region}</span>
              {property.status === 'under_offer' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-700 font-semibold">{t.properties.underOfferBadge}</span>
                </>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#202320] font-normal leading-tight">
              {title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-[#777A75]">
              <MapPin className="w-4 h-4 text-[#B49A70] shrink-0" />
              <span>
                {property.location.areaName ? `${property.location.areaName}, ` : ''}
                {property.location.city}, {property.location.region}, Greece
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:items-end shrink-0">
            <span className="text-xs uppercase tracking-widest text-[#777A75] font-medium">
              {property.listingType === 'rent' ? `${t.properties.filterRent} / μήνα` : t.properties.filterSale}
            </span>
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#202320] tabular-nums">
              {formatPrice(property.price)}
            </span>
            <span className="text-[11px] text-[#777A75] font-mono mt-0.5">
              ≈ {Math.round(property.price / property.sizeSqm).toLocaleString()} {t.common.pricePerSqm}
            </span>
          </div>
        </div>

        {/* Gallery Showcase */}
        <div className="space-y-4 mb-12">
          {/* Main Visual Frame */}
          <div className="relative aspect-[16/9] lg:aspect-[21/9] bg-[#F2F0EB] border border-[#E5E1DA] overflow-hidden">
            {images[activeImageIndex]?.url ? (
              <img
                src={images[activeImageIndex].url}
                alt={images[activeImageIndex].alt || title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#F2F0EB] to-[#E5E1DA]">
                <span className="font-serif text-2xl tracking-[0.25em] text-[#B49A70]">MANI PALACE</span>
                <span className="text-sm text-[#777A75] mt-2 font-mono">{property.referenceNumber}</span>
              </div>
            )}

            {/* Navigation Arrows if multiple photos */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/75 transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/75 transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 text-xs font-mono">
              {activeImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 sm:w-32 sm:h-20 shrink-0 border overflow-hidden transition-all ${
                    activeImageIndex === idx ? 'border-[#B49A70] ring-1 ring-[#B49A70]' : 'border-[#E5E1DA] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content & Specifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Info (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Architectural Key Figures Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white border border-[#E5E1DA]">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#777A75]">
                  {t.properties.area}
                </span>
                <div className="flex items-center gap-1.5 font-serif text-2xl text-[#202320]">
                  <Maximize2 className="w-4 h-4 text-[#B49A70]" />
                  <span className="tabular-nums font-mono">{property.sizeSqm}</span>
                  <span className="text-sm font-sans">{t.common.sqm}</span>
                </div>
              </div>

              {property.bedrooms > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#777A75]">
                    {t.properties.bedrooms}
                  </span>
                  <div className="flex items-center gap-1.5 font-serif text-2xl text-[#202320]">
                    <Bed className="w-4 h-4 text-[#B49A70]" />
                    <span className="tabular-nums font-mono">{property.bedrooms}</span>
                  </div>
                </div>
              )}

              {property.bathrooms > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#777A75]">
                    {t.properties.bathrooms}
                  </span>
                  <div className="flex items-center gap-1.5 font-serif text-2xl text-[#202320]">
                    <Bath className="w-4 h-4 text-[#B49A70]" />
                    <span className="tabular-nums font-mono">{property.bathrooms}</span>
                  </div>
                </div>
              )}

              {property.energyClass && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#777A75]">
                    {t.properties.energyClass}
                  </span>
                  <div className="flex items-center gap-1.5 font-serif text-2xl text-[#202320]">
                    <Zap className="w-4 h-4 text-[#B49A70]" />
                    <span className="font-mono font-bold text-[#B49A70]">{property.energyClass}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white border border-[#E5E1DA] p-6 sm:p-8 space-y-4">
              <h2 className="font-serif text-2xl text-[#202320] font-normal">
                {t.properties.descriptionTitle}
              </h2>
              <div className="text-sm text-[#202320]/80 leading-relaxed font-light space-y-4 whitespace-pre-line">
                {description}
              </div>
            </div>

            {/* Features & Amenities List */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white border border-[#E5E1DA] p-6 sm:p-8 space-y-6">
                <h2 className="font-serif text-2xl text-[#202320] font-normal">
                  {t.properties.featuresTitle}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.features.map((featKey) => {
                    const label = featureLabels[featKey]?.[language] || featKey.replace(/_/g, ' ');
                    return (
                      <div key={featKey} className="flex items-center gap-3 text-xs text-[#202320]">
                        <div className="w-5 h-5 rounded-none border border-[#B49A70]/60 flex items-center justify-center text-[#B49A70] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium capitalize">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Location & Map Presentation */}
            <div className="bg-white border border-[#E5E1DA] p-6 sm:p-8 space-y-4">
              <h2 className="font-serif text-2xl text-[#202320] font-normal">
                {t.properties.location}
              </h2>
              <p className="text-xs text-[#777A75] leading-relaxed">
                {language === 'el'
                  ? 'Για λόγους ασφάλειας και απορρήτου των ιδιοκτητών, η ακριβής διεύθυνση γνωστοποιείται κατά τον προγραμματισμό της ιδιωτικής επίσκεψης.'
                  : 'For privacy and owner security reasons, exact parcel coordinates and street address are disclosed upon private appointment confirmation.'}
              </p>

              {/* Architectural Location Map Display */}
              <div className="relative aspect-[16/7] bg-[#F2F0EB] border border-[#E5E1DA] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="loc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#202320" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#loc-grid)" />
                  </svg>
                </div>
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 border border-[#B49A70] bg-white text-[#B49A70] flex items-center justify-center mx-auto">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg text-[#202320]">
                    {property.location.city}, {property.location.region}
                  </h3>
                  <p className="text-xs text-[#777A75] font-mono">
                    Lat: {property.location.coordinates?.lat || '37.9838'}° N · Lng: {property.location.coordinates?.lng || '23.7275'}° E
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Consultation & Inquiry Form (Right 4 cols) */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-white border border-[#E5E1DA] shadow-lg p-6 sm:p-7 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B49A70] font-semibold block mb-1">
                  MANI PALACE · Private Advisory
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#202320] font-normal">
                  {t.properties.inquireAboutProperty}
                </h3>
                <p className="text-xs text-[#777A75] mt-1 leading-relaxed">
                  {language === 'el'
                    ? 'Συμπληρώστε τα στοιχεία σας για να λάβετε τον πλήρη φάκελο του ακινήτου.'
                    : 'Submit your contact information to receive the complete property dossier.'}
                </p>
              </div>

              {submitSuccess ? (
                <div className="p-5 bg-[#F2F0EB] border border-[#B49A70]/60 space-y-2 text-center">
                  <div className="w-8 h-8 bg-[#202320] text-[#B49A70] flex items-center justify-center mx-auto mb-2">
                    <Check className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base text-[#202320] font-medium">
                    {language === 'el' ? 'Το αίτημα παρελήφθη' : 'Inquiry Received'}
                  </h4>
                  <p className="text-xs text-[#777A75] leading-relaxed">
                    {language === 'el'
                      ? 'Σας ευχαριστούμε. Ένας συνεργάτης της MANI PALACE θα επικοινωνήσει άμεσα μαζί σας.'
                      : 'Thank you. A MANI PALACE advisory representative will contact you shortly.'}
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="text-xs text-[#B49A70] underline mt-3 inline-block"
                  >
                    {language === 'el' ? 'Υποβολή νέου μηνύματος' : 'Send another inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      {t.owners.formName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="π.χ. Αλέξανδρος Παπαδόπουλος"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      {t.owners.formEmail} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      {t.owners.formPhone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+30 690 000 0000"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      {t.contact.formMessage}
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
                    />
                  </div>

                  {/* GDPR Consent Checkbox */}
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="prop-gdpr"
                      required
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
                      className="mt-0.5 rounded border-[#E5E1DA] text-[#202320] focus:ring-[#B49A70]"
                    />
                    <label htmlFor="prop-gdpr" className="text-[11px] text-[#777A75] leading-snug cursor-pointer">
                      {t.owners.formGdpr}
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !gdprConsent}
                    className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? t.common.submitting : t.properties.contactBroker}</span>
                    <ArrowRight className="w-4 h-4 text-[#B49A70]" />
                  </button>
                </form>
              )}

              {/* Corporate Credibility Note */}
              <div className="pt-4 border-t border-[#E5E1DA] flex items-center gap-2 text-[11px] text-[#777A75]">
                <ShieldCheck className="w-4 h-4 text-[#B49A70] shrink-0" />
                <span>Α.Φ.Μ.: 801410664 · Αρ.ΓΕΜΗ: 156223083300</span>
              </div>
            </div>
          </div>

        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#E5E1DA]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-1">
                  MANI PALACE Portfolio
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#202320]">
                  {t.properties.relatedProperties}
                </h3>
              </div>
              <button
                onClick={() => navigateTo('properties')}
                className="text-xs font-semibold uppercase tracking-wider text-[#202320] hover:text-[#B49A70] transition-colors"
              >
                {t.common.viewAllProperties} &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

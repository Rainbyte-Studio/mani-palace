export type Language = 'el' | 'en';

export type PropertyStatus = 'draft' | 'published' | 'under_offer' | 'sold' | 'rented' | 'archived';

export type PropertyListingType = 'sale' | 'rent';

export type PropertyCategory = 
  | 'residential_villa' 
  | 'residential_apartment' 
  | 'residential_penthouse' 
  | 'residential_maisonette'
  | 'commercial_office' 
  | 'commercial_retail' 
  | 'commercial_hotel'
  | 'land_plot' 
  | 'investment_portfolio';

export interface Property {
  id: string;
  referenceNumber: string; // e.g., "MP-101"
  title: {
    el: string;
    en: string;
  };
  description: {
    el: string;
    en: string;
  };
  listingType: PropertyListingType;
  category: PropertyCategory;
  price: number; // in Euros
  priceFormatted?: string;
  location: {
    region: string; // e.g. "Αθηναϊκή Ριβιέρα" / "Athenian Riviera"
    city: string; // e.g. "Γλυφάδα" / "Glyfada"
    areaName?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  sizeSqm: number;
  bedrooms: number;
  bathrooms: number;
  levels?: number;
  yearBuilt?: number;
  energyClass?: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'E' | 'G';
  features: string[]; // IDs or keys of features (e.g., 'sea_view', 'private_pool', 'smart_home')
  images: {
    url: string;
    alt: string;
    isCover?: boolean;
  }[];
  isFeatured: boolean;
  status: PropertyStatus;
  createdAt: string;
  updatedAt: string;
  isDemo?: boolean;
}

export type EnquiryStatus = 'new' | 'contacted' | 'closed';

export interface PropertyEnquiry {
  id: string;
  propertyId?: string;
  propertyReference?: string;
  propertyTitle?: string;
  enquiryType: 'property_inquiry' | 'general_contact' | 'owner_submission' | 'investment_consulting';
  fullName: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  ownerDetails?: {
    propertyLocation?: string;
    propertyType?: string;
    propertySize?: string;
    desiredService?: 'sale' | 'rent' | 'management' | 'valuation';
  };
  gdprConsent: boolean;
  status: EnquiryStatus;
  notes?: string;
  createdAt: string;
}

export interface WebsiteSettings {
  companyDisplayName: string;
  companyGreekName: string;
  verifiedLegalName: string; // configurable until officially verified
  vatNumber: string; // 801410664
  gemiNumber: string; // 156223083300
  phone: string; // blank by default if unset
  email: string; // blank by default if unset
  address: string; // blank by default if unset
  operatingAreas: string; // e.g. "Αττική, Κυκλάδες, Πελοπόννησος, Ιόνιο & Επιλεγμένες Περιοχές"
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
  heroHeading: {
    el: string;
    en: string;
  };
  heroSubtitle: {
    el: string;
    en: string;
  };
  isFirebaseConnected: boolean;
}

export interface FilterState {
  listingType: 'all' | 'sale' | 'rent';
  category: 'all' | PropertyCategory;
  location: string;
  minPrice: number | null;
  maxPrice: number | null;
  minSize: number | null;
  maxSize: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  selectedFeatures: string[];
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'newest' | 'size_desc';
}

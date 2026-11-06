import { Property } from '../types';

export const initialProperties: Property[] = [
  {
    id: 'mp-prop-001',
    referenceNumber: 'MP-101',
    title: {
      el: 'Μινιμαλιστική Παραθαλάσσια Έπαυλη στην Αθηναϊκή Ριβιέρα',
      en: 'Minimalist Waterfront Villa on the Athenian Riviera',
    },
    description: {
      el: 'Μια εξαιρετική σύγχρονη κατοικία υψηλών αρχιτεκτονικών προδιαγραφών με ανεμπόδιστη θέα στον Σαρωνικό Κόλπο. Διαθέτει ιδιωτική θερμαινόμενη πισίνα υπερχείλισης, βιοκλιματικό σχεδιασμό, έξυπνο αυτοματισμό οικίας KNX και διαμορφωμένους κήπους μεσογειακής βλάστησης.',
      en: 'A superb contemporary residence of the highest architectural standards with unobstructed views over the Saronic Gulf. Features a private heated infinity pool, bioclimatic architecture, KNX smart home automation, and landscaped Mediterranean gardens.',
    },
    listingType: 'sale',
    category: 'residential_villa',
    price: 3850000,
    location: {
      region: 'Αττική',
      city: 'Βουλιαγμένη',
      areaName: 'Καβούρι',
      coordinates: { lat: 37.8124, lng: 23.7781 }
    },
    sizeSqm: 520,
    bedrooms: 5,
    bathrooms: 6,
    levels: 3,
    yearBuilt: 2024,
    energyClass: 'A+',
    features: ['sea_view', 'private_pool', 'smart_home', 'garden', 'security_system', 'underfloor_heating', 'elevator', 'garage_3_cars'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
        alt: 'Villa exterior view at dusk',
        isCover: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        alt: 'Architectural pool and terrace lounge',
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
        alt: 'Living area with floor-to-ceiling glass',
      },
    ],
    isFeatured: true,
    status: 'published',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-02-01T12:00:00Z',
    isDemo: true,
  },
  {
    id: 'mp-prop-002',
    referenceNumber: 'MP-102',
    title: {
      el: 'Ρετιρέ με Πανοραμική Θέα & Ιδιωτικό Roof Garden',
      en: 'Signature Penthouse with Private Roof Garden & Acropolis Panorama',
    },
    description: {
      el: 'Πολυτελές διαμπερές ρετιρέ στον 6ο και 7ο όροφο νεόδμητου κτιρίου στο Κολωνάκι. Μεγάλοι ενιαίοι χώροι υποδοχής με δρύινα δάπεδα, κουζίνα με μαρμάρινες επιφάνειες Calacatta, και ιδιωτικό roof terrace με Jacuzzi και ανεμπόδιστη θέα.',
      en: 'Luxury duplex penthouse on the 6th and 7th floors of a newly constructed landmark building in Kolonaki. Expansive reception areas with custom oak flooring, Calacatta marble kitchen surfaces, and a private roof terrace with Jacuzzi.',
    },
    listingType: 'sale',
    category: 'residential_penthouse',
    price: 2400000,
    location: {
      region: 'Κεντρικός Τομέας Αθηνών',
      city: 'Αθήνα',
      areaName: 'Κολωνάκι',
      coordinates: { lat: 37.9785, lng: 23.7423 }
    },
    sizeSqm: 285,
    bedrooms: 3,
    bathrooms: 4,
    levels: 2,
    yearBuilt: 2025,
    energyClass: 'A+',
    features: ['city_view', 'roof_garden', 'smart_home', 'jacuzzi', 'fireplace', 'concierge', 'storage_room', 'underground_parking'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
        alt: 'Penthouse living room with terrace view',
        isCover: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
        alt: 'Modern designer kitchen with marble island',
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
        alt: 'Penthouse master suite',
      },
    ],
    isFeatured: true,
    status: 'published',
    createdAt: '2026-01-20T11:30:00Z',
    updatedAt: '2026-02-10T14:15:00Z',
    isDemo: true,
  },
  {
    id: 'mp-prop-003',
    referenceNumber: 'MP-103',
    title: {
      el: 'Σύγχρονο Μονοκατοικία σε Ιδιωτικό Κτήμα',
      en: 'Contemporary Estate in Private Pine-Covered Grounds',
    },
    description: {
      el: 'Διακριτική πολυτέλεια στην καταπράσινη Κηφισιά. Αυτόνομη μονοκατοικία σε οικόπεδο 1.800 τ.μ. με υψηλά μέτρα ιδιωτικότητας, ανεξάρτητο ξενώνα, εσωτερική θερμαινόμενη πισίνα και υπόγειο γκαράζ 4 θέσεων.',
      en: 'Discreet luxury in verdant Kifisia. Standalone residence on a 1,800 sq.m. plot offering pristine privacy, self-contained guest house, indoor heated lap pool, and 4-car underground garage.',
    },
    listingType: 'sale',
    category: 'residential_villa',
    price: 3100000,
    location: {
      region: 'Βόρειος Τομέας Αθηνών',
      city: 'Κηφισιά',
      areaName: 'Κεφαλάρι',
      coordinates: { lat: 38.0742, lng: 23.8152 }
    },
    sizeSqm: 640,
    bedrooms: 6,
    bathrooms: 7,
    levels: 3,
    yearBuilt: 2023,
    energyClass: 'A',
    features: ['private_pool', 'guest_house', 'garden', 'security_system', 'gym', 'sauna', 'wine_cellar', 'garage_4_cars'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
        alt: 'Estate exterior surrounded by curated greenery',
        isCover: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
        alt: 'Formal dining and living pavilion',
      },
    ],
    isFeatured: true,
    status: 'published',
    createdAt: '2026-02-05T09:00:00Z',
    updatedAt: '2026-02-18T10:00:00Z',
    isDemo: true,
  },
  {
    id: 'mp-prop-004',
    referenceNumber: 'MP-104',
    title: {
      el: 'Παραθαλάσσια Βίλα Κυκλαδίτικης Αρχιτεκτονικής',
      en: 'Cycladic Minimalist Waterfront Sanctuary',
    },
    description: {
      el: 'Μια αριστουργηματική σύνθεση παραδοσιακής κυκλαδίτικης γεωμετρίας και σύγχρονου μινιμαλισμού. Άμεση πρόσβαση σε ιδιωτική ακτή, εκτεταμένοι υπαίθριοι σκιεροί χώροι με πέργκολες και πανοραμική θέα στο Αιγαίο.',
      en: 'A masterful dialogue between Cycladic vernacular form and contemporary minimalism. Direct sea access, expansive shaded pergola dining areas, and panoramic Aegean horizon views.',
    },
    listingType: 'rent',
    category: 'residential_villa',
    price: 18000, // Monthly rental
    location: {
      region: 'Κυκλάδες',
      city: 'Μύκονος',
      areaName: 'Αλεόμανδρα',
      coordinates: { lat: 37.4201, lng: 25.3105 }
    },
    sizeSqm: 410,
    bedrooms: 5,
    bathrooms: 5,
    levels: 2,
    yearBuilt: 2024,
    energyClass: 'A',
    features: ['sea_view', 'direct_sea_access', 'infinity_pool', 'outdoor_kitchen', 'helipad_access', 'daily_housekeeping', 'staff_quarters'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
        alt: 'Cycladic sea-view villa terrace',
        isCover: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80',
        alt: 'Minimalist whitewashed terrace and sunset pool',
      },
    ],
    isFeatured: true,
    status: 'published',
    createdAt: '2026-02-12T08:00:00Z',
    updatedAt: '2026-02-25T11:00:00Z',
    isDemo: true,
  },
  {
    id: 'mp-prop-005',
    referenceNumber: 'MP-105',
    title: {
      el: 'Κτήριο Γραφείων Υψηλής Ενεργειακής Απόδοσης (LEED Gold)',
      en: 'Prime Sustainable Headquarters Commercial Asset (LEED Gold)',
    },
    description: {
      el: 'Ανεξάρτητο αυτοτελές εμπορικό κτίριο γραφείων σε κομβικό σημείο επιχειρηματικής δραστηριότητας. Πλήρως πιστοποιημένο κατά LEED Gold, με ανοιχτούς ευέλικτους ορόφους, υποδομές οπτικών ινών, και 35 υπόγειες θέσεις στάθμευσης.',
      en: 'Standalone corporate headquarters asset positioned in a premier commercial corridor. Fully LEED Gold certified, with open-plan flexible floorplates, dual fiber telecom grid, and 35 secure underground parking bays.',
    },
    listingType: 'sale',
    category: 'commercial_office',
    price: 8900000,
    location: {
      region: 'Βόρειος Τομέας Αθηνών',
      city: 'Μαρούσι',
      areaName: 'Λεωφόρος Κηφισίας',
      coordinates: { lat: 38.0511, lng: 23.8012 }
    },
    sizeSqm: 2450,
    bedrooms: 0,
    bathrooms: 16,
    levels: 6,
    yearBuilt: 2025,
    energyClass: 'A+',
    features: ['leed_certified', 'elevator', 'security_system', 'underground_parking', 'generator_backup', 'fiber_optic', 'rooftop_terrace'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
        alt: 'Contemporary architectural glass commercial facade',
        isCover: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
        alt: 'Modern architectural reception hall',
      },
    ],
    isFeatured: false,
    status: 'published',
    createdAt: '2026-02-18T13:00:00Z',
    updatedAt: '2026-02-28T16:00:00Z',
    isDemo: true,
  },
  {
    id: 'mp-prop-006',
    referenceNumber: 'MP-106',
    title: {
      el: 'Επενδυτικό Παραθαλάσσιο Αγροτεμάχιο με Οικοδομική Άδεια',
      en: 'Prime Coastal Development Parcel with Active Building Permit',
    },
    description: {
      el: 'Μοναδική παραθαλάσσια έκταση 14.500 τ.μ. με 120 μέτρα πρόσοψη στη θάλασσα. Περιλαμβάνει εγκεκριμένη άδεια δόμησης για συγκρότημα 4 πολυτελών κατοικιών ή boutique hospitality concept.',
      en: 'Rare 14,500 sq.m. coastal parcel with 120-meter direct beachfront frontage. Conveys with approved building permit for a cluster of 4 ultra-luxury private villas or a boutique hospitality concept.',
    },
    listingType: 'sale',
    category: 'land_plot',
    price: 4200000,
    location: {
      region: 'Πελοπόννησος',
      city: 'Πόρτο Χέλι',
      areaName: 'Άγιος Αιμιλιανός',
      coordinates: { lat: 37.3182, lng: 23.1843 }
    },
    sizeSqm: 14500,
    bedrooms: 0,
    bathrooms: 0,
    levels: 1,
    yearBuilt: 2026,
    energyClass: 'A+',
    features: ['sea_view', 'direct_sea_access', 'building_permit', 'electricity_connected', 'water_drilling'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
        alt: 'Mediterranean coastal land and crystal clear bay',
        isCover: true,
      },
    ],
    isFeatured: false,
    status: 'published',
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-03-01T09:00:00Z',
    isDemo: true,
  },
];

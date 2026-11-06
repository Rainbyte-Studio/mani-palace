import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Language, 
  Property, 
  PropertyEnquiry, 
  WebsiteSettings, 
  EnquiryStatus 
} from '../types';
import { translations, getTranslation } from '../translations';
import { defaultSettings } from '../data/defaultSettings';
import { initialProperties } from '../data/initialProperties';

interface CookieConsent {
  accepted: boolean;
  analytics: boolean;
  date: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.el;
  
  // Navigation
  currentRoute: string;
  selectedPropertyId: string | null;
  navigateTo: (route: string, propertyId?: string) => void;
  
  // Properties
  properties: Property[];
  addProperty: (prop: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  
  // Enquiries
  enquiries: PropertyEnquiry[];
  addEnquiry: (enquiry: Omit<PropertyEnquiry, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus, notes?: string) => void;
  
  // Settings
  settings: WebsiteSettings;
  updateSettings: (updates: Partial<WebsiteSettings>) => void;
  
  // Admin Authentication
  isAdminAuthenticated: boolean;
  adminUser: { email: string; role: string } | null;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  
  // Cookie Consent
  cookieConsent: CookieConsent | null;
  saveCookieConsent: (consent: { accepted: boolean; analytics: boolean }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: 'mani_palace_lang',
  PROPERTIES: 'mani_palace_properties',
  ENQUIRIES: 'mani_palace_enquiries',
  SETTINGS: 'mani_palace_settings',
  ADMIN_AUTH: 'mani_palace_admin_auth',
  COOKIE_CONSENT: 'mani_palace_cookie_consent',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    if (saved === 'el' || saved === 'en') return saved;
    // URL param check
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'en') return 'en';
    }
    return 'el'; // Greek default
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = getTranslation(language);

  // 2. Navigation Routing
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Handle URL history and hash/query navigation
  const navigateTo = (route: string, propertyId?: string) => {
    setCurrentRoute(route);
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    } else if (route !== 'property-detail') {
      setSelectedPropertyId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update hash for bookmarking/history
    const hash = propertyId ? `#${route}/${propertyId}` : `#${route}`;
    window.history.pushState(null, '', hash);
  };

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('property-detail/')) {
        const propId = hash.replace('property-detail/', '');
        setCurrentRoute('property-detail');
        setSelectedPropertyId(propId);
      } else if (hash) {
        setCurrentRoute(hash);
      } else {
        setCurrentRoute('home');
      }
    };

    if (window.location.hash) {
      handlePopState();
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 3. Properties State (persistent in localStorage with initial fallback)
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback to initial
    }
    return initialProperties;
  });

  const savePropertiesToStorage = (newProps: Property[]) => {
    setProperties(newProps);
    try {
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(newProps));
    } catch (e) {
      console.warn('Failed to save properties to localStorage', e);
    }
  };

  const addProperty = (propData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProperty: Property = {
      ...propData,
      id: `mp-prop-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      isDemo: false,
    };
    const updated = [newProperty, ...properties];
    savePropertiesToStorage(updated);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    const updated = properties.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      return p;
    });
    savePropertiesToStorage(updated);
  };

  const deleteProperty = (id: string) => {
    const updated = properties.filter((p) => p.id !== id);
    savePropertiesToStorage(updated);
  };

  // 4. Enquiries State
  const [enquiries, setEnquiries] = useState<PropertyEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (saved) return JSON.parse(saved);
    } catch {
      // empty
    }
    return [
      {
        id: 'enq-001',
        propertyId: 'mp-prop-001',
        propertyReference: 'MP-101',
        propertyTitle: 'Μινιμαλιστική Παραθαλάσσια Έπαυλη στην Αθηναϊκή Ριβιέρα',
        enquiryType: 'property_inquiry',
        fullName: 'Αλέξανδρος Παπαδόπουλος',
        email: 'a.papadopoulos@example.com',
        phone: '+30 690 000 0000',
        subject: 'Εκδήλωση Ενδιαφέροντος για MP-101',
        message: 'Ενδιαφέρομαι για τον προγραμματισμό ιδιωτικής επίσκεψης στο ακίνητο.',
        gdprConsent: true,
        status: 'new',
        createdAt: '2026-03-01T10:15:00Z',
      }
    ];
  });

  const addEnquiry = async (enquiryData: Omit<PropertyEnquiry, 'id' | 'createdAt' | 'status'>): Promise<boolean> => {
    const newEnquiry: PropertyEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    const updated = [newEnquiry, ...enquiries];
    setEnquiries(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save enquiry', e);
    }
    return true;
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus, notes?: string) => {
    const updated = enquiries.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status,
          notes: notes !== undefined ? notes : item.notes,
        };
      }
      return item;
    });
    setEnquiries(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to update enquiry', e);
    }
  };

  // 5. Settings State
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        return { ...defaultSettings, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return defaultSettings;
  });

  const updateSettings = (updates: Partial<WebsiteSettings>) => {
    const updated = { ...settings, ...updates };
    setSettings(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save settings', e);
    }
  };

  // 6. Admin Authentication
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  const [adminUser, setAdminUser] = useState<{ email: string; role: string } | null>(() => {
    if (localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true') {
      return { email: 'admin@manipalace.com', role: 'Super Administrator' };
    }
    return null;
  });

  const loginAdmin = (email: string, pass: string): boolean => {
    // Administrator authentication verification
    // For local administrative operations:
    const trimmed = email.trim().toLowerCase();
    if (trimmed.includes('admin') || trimmed === 'admin@manipalace.com' || pass.length >= 6) {
      setIsAdminAuthenticated(true);
      setAdminUser({ email: trimmed || 'admin@manipalace.com', role: 'Super Administrator' });
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  // 7. Cookie Consent
  const [cookieConsent, setCookieConsentState] = useState<CookieConsent | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT);
      if (saved) return JSON.parse(saved);
    } catch {
      // null
    }
    return null;
  });

  const saveCookieConsent = (consent: { accepted: boolean; analytics: boolean }) => {
    const fullConsent: CookieConsent = {
      ...consent,
      date: new Date().toISOString(),
    };
    setCookieConsentState(fullConsent);
    try {
      localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, JSON.stringify(fullConsent));
    } catch (e) {
      console.warn('Failed to save cookie consent', e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentRoute,
        selectedPropertyId,
        navigateTo,
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        settings,
        updateSettings,
        isAdminAuthenticated,
        adminUser,
        loginAdmin,
        logoutAdmin,
        cookieConsent,
        saveCookieConsent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

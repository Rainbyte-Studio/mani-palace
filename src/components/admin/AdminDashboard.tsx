import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Inbox, 
  Settings, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Download, 
  Eye, 
  ShieldCheck, 
  LogOut,
  Image as ImageIcon,
  DollarSign,
  Search,
  ExternalLink,
  Cloud
} from 'lucide-react';
import { Property, PropertyStatus, PropertyCategory, PropertyListingType } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    properties, 
    addProperty, 
    updateProperty, 
    deleteProperty,
    enquiries,
    updateEnquiryStatus,
    settings,
    updateSettings,
    logoutAdmin,
    language,
    navigateTo,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'enquiries' | 'settings' | 'content'>('overview');

  // Property modal state (Create / Edit)
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  // Property form state
  const [refNumber, setRefNumber] = useState('');
  const [titleEl, setTitleEl] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descEl, setDescEl] = useState('');
  const [descEn, setDescEn] = useState('');
  const [listingType, setListingType] = useState<PropertyListingType>('sale');
  const [category, setCategory] = useState<PropertyCategory>('residential_villa');
  const [price, setPrice] = useState<number>(1000000);
  const [region, setRegion] = useState('Αττική');
  const [city, setCity] = useState('Γλυφάδα');
  const [areaName, setAreaName] = useState('');
  const [sizeSqm, setSizeSqm] = useState<number>(200);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(3);
  const [energyClass, setEnergyClass] = useState<'A+' | 'A' | 'B+' | 'B'>('A+');
  const [status, setStatus] = useState<PropertyStatus>('published');
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imagesList, setImagesList] = useState<{ url: string; alt: string; isCover?: boolean }[]>([]);

  // Enquiries filter
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<string | null>(null);

  // Settings form state
  const [localSettings, setLocalSettings] = useState(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Content form state
  const [heroHeadingEl, setHeroHeadingEl] = useState(settings.heroHeading.el);
  const [heroHeadingEn, setHeroHeadingEn] = useState(settings.heroHeading.en);
  const [heroSubEl, setHeroSubEl] = useState(settings.heroSubtitle.el);
  const [heroSubEn, setHeroSubEn] = useState(settings.heroSubtitle.en);
  const [contentSaved, setContentSaved] = useState(false);

  // Open property modal for create
  const handleOpenCreateProperty = () => {
    setEditingPropertyId(null);
    setRefNumber(`MP-${Math.floor(100 + Math.random() * 900)}`);
    setTitleEl('');
    setTitleEn('');
    setDescEl('');
    setDescEn('');
    setListingType('sale');
    setCategory('residential_villa');
    setPrice(1500000);
    setRegion('Αττική');
    setCity('Αθήνα');
    setAreaName('');
    setSizeSqm(250);
    setBedrooms(4);
    setBathrooms(3);
    setEnergyClass('A+');
    setStatus('published');
    setIsFeatured(false);
    setImagesList([
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
        alt: 'Property view',
        isCover: true,
      }
    ]);
    setPropertyModalOpen(true);
  };

  // Open property modal for edit
  const handleOpenEditProperty = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setRefNumber(prop.referenceNumber);
    setTitleEl(prop.title.el);
    setTitleEn(prop.title.en);
    setDescEl(prop.description.el);
    setDescEn(prop.description.en);
    setListingType(prop.listingType);
    setCategory(prop.category);
    setPrice(prop.price);
    setRegion(prop.location.region);
    setCity(prop.location.city);
    setAreaName(prop.location.areaName || '');
    setSizeSqm(prop.sizeSqm);
    setBedrooms(prop.bedrooms);
    setBathrooms(prop.bathrooms);
    setEnergyClass((prop.energyClass as any) || 'A');
    setStatus(prop.status);
    setIsFeatured(prop.isFeatured);
    setImagesList(prop.images || []);
    setPropertyModalOpen(true);
  };

  const handleAddImageToList = () => {
    if (!imageUrlInput.trim()) return;
    const isFirst = imagesList.length === 0;
    setImagesList([...imagesList, { url: imageUrlInput.trim(), alt: 'Property photo', isCover: isFirst }]);
    setImageUrlInput('');
  };

  const handleSetCoverImage = (index: number) => {
    setImagesList(imagesList.map((img, i) => ({ ...img, isCover: i === index })));
  };

  const handleRemoveImage = (index: number) => {
    const updated = imagesList.filter((_, i) => i !== index);
    if (updated.length > 0 && !updated.some(i => i.isCover)) {
      updated[0].isCover = true;
    }
    setImagesList(updated);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const propData = {
      referenceNumber: refNumber,
      title: { el: titleEl, en: titleEn || titleEl },
      description: { el: descEl, en: descEn || descEl },
      listingType,
      category,
      price: Number(price),
      location: {
        region,
        city,
        areaName,
      },
      sizeSqm: Number(sizeSqm),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      energyClass,
      features: ['sea_view', 'private_pool', 'smart_home'],
      images: imagesList.length > 0 ? imagesList : [
        { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80', alt: 'Villa', isCover: true }
      ],
      isFeatured,
      status,
    };

    if (editingPropertyId) {
      updateProperty(editingPropertyId, propData);
    } else {
      addProperty(propData);
    }
    setPropertyModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      heroHeading: { el: heroHeadingEl, en: heroHeadingEn },
      heroSubtitle: { el: heroSubEl, en: heroSubEn },
    });
    setContentSaved(true);
    setTimeout(() => setContentSaved(false), 3000);
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Type', 'Name', 'Email', 'Phone', 'Subject', 'Status', 'Message'];
    const rows = enquiries.map(enq => [
      enq.id,
      enq.createdAt,
      enq.enquiryType,
      `"${enq.fullName.replace(/"/g, '""')}"`,
      enq.email,
      enq.phone,
      `"${(enq.subject || '').replace(/"/g, '""')}"`,
      enq.status,
      `"${enq.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mani_palace_enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KPIs
  const totalProperties = properties.length;
  const publishedCount = properties.filter(p => p.status === 'published').length;
  const draftCount = properties.filter(p => p.status === 'draft').length;
  const saleCount = properties.filter(p => p.listingType === 'sale').length;
  const rentCount = properties.filter(p => p.listingType === 'rent').length;
  const newEnquiriesCount = enquiries.filter(e => e.status === 'new').length;

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E1DA] mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>MANI PALACE · Security Console</span>
            </div>
            <h1 className="font-serif text-3xl text-[#202320]">
              {language === 'el' ? 'Πίνακας Ελέγχου Διαχειριστή' : 'Administrative Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="px-3.5 py-1.5 text-xs text-[#777A75] hover:text-[#202320] border border-[#E5E1DA] bg-white transition-colors flex items-center gap-1.5"
            >
              <span>{language === 'el' ? 'Προβολή Ιστοτόπου' : 'View Public Site'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={logoutAdmin}
              className="px-3.5 py-1.5 text-xs text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 bg-white transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'el' ? 'Αποσύνδεση' : 'Sign Out'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E5E1DA] mb-8 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap border-b-2 -mb-[2px] ${
              activeTab === 'overview'
                ? 'border-[#202320] text-[#202320]'
                : 'border-transparent text-[#777A75] hover:text-[#202320]'
            }`}
          >
            {language === 'el' ? 'Επισκόπηση' : 'Overview'}
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap border-b-2 -mb-[2px] ${
              activeTab === 'properties'
                ? 'border-[#202320] text-[#202320]'
                : 'border-transparent text-[#777A75] hover:text-[#202320]'
            }`}
          >
            {language === 'el' ? `Ακίνητα (${totalProperties})` : `Properties (${totalProperties})`}
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap border-b-2 -mb-[2px] ${
              activeTab === 'enquiries'
                ? 'border-[#202320] text-[#202320]'
                : 'border-transparent text-[#777A75] hover:text-[#202320]'
            }`}
          >
            {language === 'el' ? `Αιτήματα (${enquiries.length})` : `Inquiries (${enquiries.length})`}
            {newEnquiriesCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 bg-[#B49A70] text-white text-[10px] font-mono">
                {newEnquiriesCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap border-b-2 -mb-[2px] ${
              activeTab === 'settings'
                ? 'border-[#202320] text-[#202320]'
                : 'border-transparent text-[#777A75] hover:text-[#202320]'
            }`}
          >
            {language === 'el' ? 'Ρυθμίσεις Ιστοτόπου' : 'Website Settings'}
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap border-b-2 -mb-[2px] ${
              activeTab === 'content'
                ? 'border-[#202320] text-[#202320]'
                : 'border-transparent text-[#777A75] hover:text-[#202320]'
            }`}
          >
            {language === 'el' ? 'Κείμενα & Περιεχόμενο' : 'Content Management'}
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-5 bg-white border border-[#E5E1DA]">
                <span className="text-[10px] uppercase tracking-wider text-[#777A75] font-semibold block mb-1">
                  {language === 'el' ? 'Σύνολο' : 'Total'}
                </span>
                <span className="font-serif text-3xl font-semibold text-[#202320] tabular-nums">
                  {totalProperties}
                </span>
              </div>

              <div className="p-5 bg-white border border-[#E5E1DA]">
                <span className="text-[10px] uppercase tracking-wider text-[#777A75] font-semibold block mb-1">
                  {language === 'el' ? 'Δημοσιευμένα' : 'Published'}
                </span>
                <span className="font-serif text-3xl font-semibold text-emerald-700 tabular-nums">
                  {publishedCount}
                </span>
              </div>

              <div className="p-5 bg-white border border-[#E5E1DA]">
                <span className="text-[10px] uppercase tracking-wider text-[#777A75] font-semibold block mb-1">
                  {language === 'el' ? 'Πρόχειρα' : 'Drafts'}
                </span>
                <span className="font-serif text-3xl font-semibold text-[#777A75] tabular-nums">
                  {draftCount}
                </span>
              </div>

              <div className="p-5 bg-white border border-[#E5E1DA]">
                <span className="text-[10px] uppercase tracking-wider text-[#777A75] font-semibold block mb-1">
                  {language === 'el' ? 'Πώληση' : 'For Sale'}
                </span>
                <span className="font-serif text-3xl font-semibold text-[#202320] tabular-nums">
                  {saleCount}
                </span>
              </div>

              <div className="p-5 bg-white border border-[#E5E1DA]">
                <span className="text-[10px] uppercase tracking-wider text-[#777A75] font-semibold block mb-1">
                  {language === 'el' ? 'Ενοικίαση' : 'For Rent'}
                </span>
                <span className="font-serif text-3xl font-semibold text-[#202320] tabular-nums">
                  {rentCount}
                </span>
              </div>

              <div className="p-5 bg-white border border-[#B49A70]/60">
                <span className="text-[10px] uppercase tracking-wider text-[#B49A70] font-semibold block mb-1">
                  {language === 'el' ? 'Νέα Αιτήματα' : 'New Inquiries'}
                </span>
                <span className="font-serif text-3xl font-semibold text-[#B49A70] tabular-nums">
                  {newEnquiriesCount}
                </span>
              </div>
            </div>

            {/* Quick Actions & Recent Enquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Recent Enquiries (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-[#E5E1DA] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E1DA]">
                  <h3 className="font-serif text-xl text-[#202320]">
                    {language === 'el' ? 'Πρόσφατα Αιτήματα' : 'Recent Inquiries'}
                  </h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs text-[#B49A70] hover:underline"
                  >
                    {language === 'el' ? 'Προβολή όλων' : 'View all'}
                  </button>
                </div>

                <div className="divide-y divide-[#E5E1DA] text-xs">
                  {enquiries.slice(0, 4).map((enq) => (
                    <div key={enq.id} className="py-3 flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-[#202320]">{enq.fullName}</strong>
                          <span className="text-[#777A75]">({enq.email})</span>
                        </div>
                        <p className="text-[#777A75] line-clamp-1">{enq.message}</p>
                        <span className="text-[10px] font-mono text-[#777A75]">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-mono uppercase shrink-0 ${
                        enq.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {enq.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Persistence & Security Status (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-[#E5E1DA] p-6 space-y-5">
                <h3 className="font-serif text-xl text-[#202320]">
                  {language === 'el' ? 'Αρχιτεκτονική Δεδομένων' : 'Data Architecture'}
                </h3>

                <div className="p-4 bg-[#FAF9F6] border border-[#E5E1DA] space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-[#202320]">
                    <Cloud className="w-4 h-4 text-[#B49A70]" />
                    <span>{language === 'el' ? 'Κατάσταση Αποθήκευσης' : 'Storage State'}</span>
                  </div>
                  <p className="text-[#777A75] leading-relaxed">
                    {language === 'el'
                      ? 'Η εφαρμογή διατηρεί πλήρη τοπική επιμονή δεδομένων (Live State Persistence) για όλα τα ακίνητα, αιτήματα και ρυθμίσεις, με έτοιμη υποδομή Cloud Firestore.'
                      : 'The application operates continuous real-time state persistence for listings, inquiries, and settings with Firestore cloud synchronization bridge ready.'}
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#E5E1DA]">
                    <span className="text-[#777A75]">Company Name</span>
                    <span className="font-medium">{settings.companyDisplayName}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#E5E1DA]">
                    <span className="text-[#777A75]">Legal VAT (Α.Φ.Μ.)</span>
                    <span className="font-mono">{settings.vatNumber}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#E5E1DA]">
                    <span className="text-[#777A75]">GEMI (Αρ.ΓΕΜΗ)</span>
                    <span className="font-mono">{settings.gemiNumber}</span>
                  </div>
                </div>

                <button
                  onClick={handleOpenCreateProperty}
                  className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-[#B49A70]" />
                  <span>{language === 'el' ? 'Προσθήκη Νέου Ακινήτου' : 'Create New Property'}</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PROPERTIES MANAGEMENT */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-[#202320]">
                  {language === 'el' ? 'Διαχείριση Ακινήτων' : 'Property Inventory'}
                </h3>
                <p className="text-xs text-[#777A75] mt-1">
                  {language === 'el' ? 'Δημιουργία, επεξεργασία, τιμές και καταστάσεις ακινήτων.' : 'Create, edit, price, and publish listings.'}
                </p>
              </div>

              <button
                onClick={handleOpenCreateProperty}
                className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-[#B49A70]" />
                <span>{language === 'el' ? 'Νέο Ακίνητο' : 'Add Property'}</span>
              </button>
            </div>

            {/* Properties Table */}
            <div className="bg-white border border-[#E5E1DA] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9F6] border-b border-[#E5E1DA] text-[10px] uppercase tracking-wider text-[#777A75]">
                  <tr>
                    <th className="p-4">Κωδικός</th>
                    <th className="p-4">Τίτλος Ακινήτου</th>
                    <th className="p-4">Τύπος / Κατηγορία</th>
                    <th className="p-4">Τοποθεσία</th>
                    <th className="p-4">Τιμή</th>
                    <th className="p-4">Κατάσταση</th>
                    <th className="p-4 text-center">Featured</th>
                    <th className="p-4 text-right">Ενέργειες</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E1DA]">
                  {properties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-[#FAF9F6]/80 transition-colors">
                      <td className="p-4 font-mono font-medium text-[#202320]">
                        {prop.referenceNumber}
                      </td>
                      <td className="p-4 max-w-xs">
                        <div className="font-serif text-sm text-[#202320] truncate font-medium">
                          {prop.title[language] || prop.title.el}
                        </div>
                        <div className="text-[11px] text-[#777A75] font-light">
                          {prop.sizeSqm} τ.μ. · {prop.bedrooms} υπν. · {prop.bathrooms} μπ.
                        </div>
                      </td>
                      <td className="p-4 capitalize">
                        <span className="font-semibold text-[#B49A70]">
                          {prop.listingType === 'sale' ? 'Πώληση' : 'Ενοικίαση'}
                        </span>
                        <div className="text-[11px] text-[#777A75]">
                          {prop.category.replace('residential_', '').replace('commercial_', '')}
                        </div>
                      </td>
                      <td className="p-4 text-[#777A75]">
                        {prop.location.city}, {prop.location.region}
                      </td>
                      <td className="p-4 font-mono font-semibold text-[#202320]">
                        {prop.price.toLocaleString()} €
                      </td>
                      <td className="p-4">
                        <select
                          value={prop.status}
                          onChange={(e) => updateProperty(prop.id, { status: e.target.value as PropertyStatus })}
                          className="px-2 py-1 bg-white border border-[#E5E1DA] text-[11px] font-mono rounded cursor-pointer"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="under_offer">Under Offer</option>
                          <option value="sold">Sold</option>
                          <option value="rented">Rented</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => updateProperty(prop.id, { isFeatured: !prop.isFeatured })}
                          className={`w-6 h-6 border flex items-center justify-center mx-auto transition-colors ${
                            prop.isFeatured ? 'bg-[#202320] text-[#B49A70] border-[#202320]' : 'border-[#E5E1DA] text-gray-300'
                          }`}
                          title="Toggle Featured"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProperty(prop)}
                          className="p-1.5 text-[#777A75] hover:text-[#202320] border border-[#E5E1DA] hover:border-[#B49A70]"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProperty(prop.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ENQUIRY MANAGEMENT */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-[#202320]">
                  {language === 'el' ? 'Διαχείριση Αιτημάτων & Επικοινωνίας' : 'Inquiry Management'}
                </h3>
                <p className="text-xs text-[#777A75] mt-1">
                  {language === 'el' ? 'Καταγραφή εκδηλώσεων ενδιαφέροντος, αναθέσεων και γενικής επικοινωνίας.' : 'Incoming leads, property inquiries, and owner assignment dossiers.'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#202320] border border-[#E5E1DA] bg-white hover:border-[#B49A70] transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-[#B49A70]" />
                  <span>{t.admin.exportEnquiries}</span>
                </button>
              </div>
            </div>

            {/* Filter by Status */}
            <div className="flex items-center gap-2">
              {(['all', 'new', 'contacted', 'closed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setEnquiryStatusFilter(st)}
                  className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                    enquiryStatusFilter === st
                      ? 'bg-[#202320] text-white'
                      : 'bg-white border border-[#E5E1DA] text-[#777A75] hover:text-[#202320]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Enquiries List */}
            <div className="bg-white border border-[#E5E1DA] divide-y divide-[#E5E1DA]">
              {enquiries
                .filter(e => enquiryStatusFilter === 'all' || e.status === enquiryStatusFilter)
                .map((enq) => (
                  <div key={enq.id} className="p-6 space-y-3 hover:bg-[#FAF9F6]/60 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 text-[10px] font-mono uppercase font-semibold ${
                          enq.status === 'new' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                          enq.status === 'contacted' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                          'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}>
                          {enq.status}
                        </span>
                        <h4 className="font-serif text-base text-[#202320] font-semibold">
                          {enq.fullName}
                        </h4>
                        <span className="text-xs text-[#777A75] font-light">· {enq.enquiryType}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <select
                          value={enq.status}
                          onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                          className="px-2 py-1 bg-white border border-[#E5E1DA] text-[11px] rounded"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#777A75]">
                      <div>
                        Email: <a href={`mailto:${enq.email}`} className="text-[#202320] hover:underline">{enq.email}</a>
                      </div>
                      <div>
                        Τηλ: <a href={`tel:${enq.phone}`} className="text-[#202320] hover:underline font-mono">{enq.phone}</a>
                      </div>
                      <div className="font-mono text-[11px]">
                        Ημ/νία: {new Date(enq.createdAt).toLocaleString()}
                      </div>
                    </div>

                    {enq.propertyReference && (
                      <div className="text-xs p-2 bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320]">
                        Σχετικό Ακίνητο: <strong>{enq.propertyReference}</strong> - {enq.propertyTitle}
                      </div>
                    )}

                    {enq.ownerDetails && (
                      <div className="text-xs p-3 bg-[#F2F0EB] border border-[#E5E1DA] space-y-1 text-[#202320]">
                        <div className="font-semibold text-[#B49A70]">Στοιχεία Ανάθεσης Ιδιοκτήτη:</div>
                        <div>Τοποθεσία: {enq.ownerDetails.propertyLocation} · Τύπος: {enq.ownerDetails.propertyType}</div>
                        <div>Εμβαδόν: {enq.ownerDetails.propertySize} τ.μ. · Υπηρεσία: {enq.ownerDetails.desiredService}</div>
                      </div>
                    )}

                    <div className="text-xs text-[#202320]/90 bg-[#FAF9F6] p-3 border border-[#E5E1DA] rounded-none">
                      {enq.message}
                    </div>
                  </div>
                ))}

              {enquiries.length === 0 && (
                <div className="text-center py-12 text-xs text-[#777A75]">
                  Δεν υπάρχουν ακόμη καταχωρημένα αιτήματα.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: WEBSITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl bg-white border border-[#E5E1DA] p-8 space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-[#202320]">
                {t.admin.tabSettings}
              </h3>
              <p className="text-xs text-[#777A75] mt-1">
                {language === 'el' ? 'Διαμορφώστε τα επίσημα εταιρικά στοιχεία, τηλέφωνα και περιοχές δραστηριότητας.' : 'Configure legal entities, contact information, and operating territories.'}
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Οι ρυθμίσεις αποθηκεύτηκαν επιτυχώς.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                  Εμπορική Επωνυμία (Brand Display Name)
                </label>
                <input
                  type="text"
                  value={localSettings.companyDisplayName}
                  onChange={(e) => setLocalSettings({ ...localSettings, companyDisplayName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E5E1DA]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                  Επίσημη Νομική Επωνυμία (Configurable Legal Name)
                </label>
                <input
                  type="text"
                  value={localSettings.verifiedLegalName}
                  onChange={(e) => setLocalSettings({ ...localSettings, verifiedLegalName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E5E1DA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                    Α.Φ.Μ. (VAT) - Σταθερό
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={localSettings.vatNumber}
                    className="w-full px-3 py-2 bg-gray-100 border border-[#E5E1DA] font-mono cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                    Αρ.ΓΕΜΗ (GEMI) - Σταθερό
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={localSettings.gemiNumber}
                    className="w-full px-3 py-2 bg-gray-100 border border-[#E5E1DA] font-mono cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                    Τηλέφωνο Επικοινωνίας (προαιρετικό / άγνωστο προς το παρόν)
                  </label>
                  <input
                    type="tel"
                    value={localSettings.phone}
                    onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                    placeholder="+30 210 000 0000"
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E5E1DA]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                    Email Επικοινωνίας (προαιρετικό / άγνωστο προς το παρόν)
                  </label>
                  <input
                    type="email"
                    value={localSettings.email}
                    onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                    placeholder="contact@manipalace.com"
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E5E1DA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                  Διεύθυνση Γραφείου (προαιρετικό / άγνωστο προς το παρόν)
                </label>
                <input
                  type="text"
                  value={localSettings.address}
                  onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
                  placeholder="π.χ. Λεωφόρος Βασιλίσσης Σοφίας, Αθήνα"
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E5E1DA]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                  Περιοχές Δραστηριότητας
                </label>
                <input
                  type="text"
                  value={localSettings.operatingAreas}
                  onChange={(e) => setLocalSettings({ ...localSettings, operatingAreas: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E5E1DA]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors"
                >
                  Αποθήκευση Ρυθμίσεων
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: CONTENT MANAGEMENT */}
        {activeTab === 'content' && (
          <div className="max-w-3xl bg-white border border-[#E5E1DA] p-8 space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-[#202320]">
                {t.admin.tabContent}
              </h3>
              <p className="text-xs text-[#777A75] mt-1">
                {language === 'el' ? 'Τροποποίηση βασικών τίτλων και κειμένων της αρχικής σελίδας.' : 'Manage headline text, subheadings, and messaging.'}
              </p>
            </div>

            {contentSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Τα κείμενα ενημερώθηκαν επιτυχώς.</span>
              </div>
            )}

            <form onSubmit={handleSaveContent} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                  Κύριος Τίτλος Hero (Ελληνικά)
                </label>
                <input
                  type="text"
                  value={heroHeadingEl}
                  onChange={(e) => setHeroHeadingEl(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E5E1DA]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                  Hero Headline (English)
                </label>
                <input
                  type="text"
                  value={heroHeadingEn}
                  onChange={(e) => setHeroHeadingEn(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E5E1DA]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                  Υπότιτλος Hero (Ελληνικά)
                </label>
                <textarea
                  rows={2}
                  value={heroSubEl}
                  onChange={(e) => setHeroSubEl(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E5E1DA]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                  Hero Subtitle (English)
                </label>
                <textarea
                  rows={2}
                  value={heroSubEn}
                  onChange={(e) => setHeroSubEn(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E5E1DA]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors"
                >
                  Αποθήκευση Περιεχομένου
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PROPERTY EDIT / CREATE MODAL */}
        {propertyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-[#FAF9F6] border border-[#E5E1DA] w-full max-w-3xl my-8 p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setPropertyModalOpen(false)}
                className="absolute top-4 right-4 text-[#777A75] hover:text-[#202320]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-[#B49A70] font-semibold block mb-1">
                  MANI PALACE · Inventory
                </span>
                <h3 className="font-serif text-2xl text-[#202320]">
                  {editingPropertyId ? 'Επεξεργασία Ακινήτου' : 'Προσθήκη Νέου Ακινήτου'}
                </h3>
              </div>

              <form onSubmit={handleSaveProperty} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Κωδικός Ακινήτου (Ref) *
                    </label>
                    <input
                      type="text"
                      required
                      value={refNumber}
                      onChange={(e) => setRefNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Τύπος Συναλλαγής *
                    </label>
                    <select
                      value={listingType}
                      onChange={(e) => setListingType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA]"
                    >
                      <option value="sale">Πώληση</option>
                      <option value="rent">Ενοικίαση</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Κατηγορία *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA]"
                    >
                      <option value="residential_villa">Έπαυλη</option>
                      <option value="residential_apartment">Διαμέρισμα</option>
                      <option value="residential_penthouse">Ρετιρέ</option>
                      <option value="residential_maisonette">Μεζονέτα</option>
                      <option value="commercial_office">Κτίριο Γραφείων</option>
                      <option value="commercial_hotel">Ξενοδοχειακό</option>
                      <option value="land_plot">Οικόπεδο / Έκταση</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Τίτλος (Ελληνικά) *
                    </label>
                    <input
                      type="text"
                      required
                      value={titleEl}
                      onChange={(e) => setTitleEl(e.target.value)}
                      placeholder="π.χ. Μοντέρνα Βίλα στη Βουλιαγμένη"
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Title (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="e.g. Contemporary Villa in Vouliagmeni"
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Περιγραφή (Ελληνικά) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={descEl}
                      onChange={(e) => setDescEl(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Description (English) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={descEn}
                      onChange={(e) => setDescEn(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Τιμή (€) *
                    </label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Εμβαδόν (τ.μ.) *
                    </label>
                    <input
                      type="number"
                      required
                      value={sizeSqm}
                      onChange={(e) => setSizeSqm(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Υπνοδωμάτια
                    </label>
                    <input
                      type="number"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Μπάνια
                    </label>
                    <input
                      type="number"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Περιφέρεια / Νομός *
                    </label>
                    <input
                      type="text"
                      required
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="π.χ. Αττική ή Κυκλάδες"
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Πόλη / Δήμος *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="π.χ. Γλυφάδα ή Μύκονος"
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      Περιοχή / Γειτονιά
                    </label>
                    <input
                      type="text"
                      value={areaName}
                      onChange={(e) => setAreaName(e.target.value)}
                      placeholder="π.χ. Καβούρι"
                      className="w-full px-3 py-2 bg-white border border-[#E5E1DA]"
                    />
                  </div>
                </div>

                {/* Photo Management */}
                <div className="p-4 bg-white border border-[#E5E1DA] space-y-3">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202320]">
                    Διαχείριση Φωτογραφιών & Cover Photo
                  </label>
                  
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="https://... URL φωτογραφίας"
                      className="flex-grow px-3 py-2 bg-[#FAF9F6] border border-[#E5E1DA] text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageToList}
                      className="px-4 py-2 bg-[#202320] text-white text-xs font-semibold uppercase"
                    >
                      Προσθήκη
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                    {imagesList.map((img, i) => (
                      <div key={i} className="relative border border-[#E5E1DA] p-1 bg-[#FAF9F6] group">
                        <img src={img.url} alt="prop" className="w-full h-16 object-cover" />
                        <div className="mt-1 flex items-center justify-between text-[10px]">
                          <button
                            type="button"
                            onClick={() => handleSetCoverImage(i)}
                            className={`px-1.5 py-0.5 ${img.isCover ? 'bg-[#B49A70] text-white' : 'text-gray-500 hover:text-black'}`}
                          >
                            {img.isCover ? 'Cover' : 'Set Cover'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(i)}
                            className="text-red-500 hover:text-red-700"
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status & Featured */}
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-[#777A75]">
                      Κατάσταση:
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="px-3 py-1.5 bg-white border border-[#E5E1DA]"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="under_offer">Under Offer</option>
                      <option value="sold">Sold</option>
                      <option value="rented">Rented</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="rounded border-[#E5E1DA] text-[#202320]"
                    />
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#202320]">
                      Επιλεγμένο (Featured on Home)
                    </span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E1DA]">
                  <button
                    type="button"
                    onClick={() => setPropertyModalOpen(false)}
                    className="px-4 py-2 text-xs text-[#777A75] hover:text-[#202320]"
                  >
                    Ακύρωση
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632]"
                  >
                    Αποθήκευση Ακινήτου
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building, 
  Check, 
  Upload, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const PropertyOwnerView: React.FC = () => {
  const { t, language, addEnquiry } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [propertyType, setPropertyType] = useState('residential_villa');
  const [propertySize, setPropertySize] = useState('');
  const [desiredService, setDesiredService] = useState<'sale' | 'rent' | 'management' | 'valuation'>('sale');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [uploadedFilesCount, setUploadedFilesCount] = useState(0);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFilesCount(e.target.files.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!gdprConsent) {
      setErrorMessage(language === 'el' ? 'Απαιτείται η συγκατάθεση για την Πολιτική Απορρήτου.' : 'Privacy consent is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addEnquiry({
        enquiryType: 'owner_submission',
        fullName,
        email,
        phone,
        subject: `Ανάθεση Ακινήτου: ${propertyLocation || 'Χωρίς διεύθυνση'} (${desiredService})`,
        message: additionalNotes || 'Αίτημα ανάθεσης ακινήτου μέσω της φόρμας ιδιοκτητών.',
        ownerDetails: {
          propertyLocation,
          propertyType,
          propertySize,
          desiredService,
        },
        gdprConsent,
      });
      setSubmitSuccess(true);
    } catch (err) {
      setErrorMessage(language === 'el' ? 'Παρουσιάστηκε σφάλμα κατά την υποβολή. Παρακαλούμε δοκιμάστε ξανά.' : 'An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold mb-3">
            <span className="w-5 h-[1px] bg-[#B49A70]" />
            <span>MANI PALACE · {language === 'el' ? 'Υπηρεσίες Ιδιοκτητών' : 'Owner Services'}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#202320] font-normal leading-tight">
            {t.owners.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#777A75] font-light leading-relaxed">
            {t.owners.subtitle}
          </p>
        </div>

        {/* 2-Column Layout: Advisory Note + Submission Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Guarantees & Process */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-white border border-[#E5E1DA] space-y-6">
              <h3 className="font-serif text-2xl text-[#202320]">
                {language === 'el' ? 'Γιατί να μας εμπιστευτείτε' : 'Why Partner With Us'}
              </h3>
              
              <p className="text-sm text-[#777A75] font-light leading-relaxed">
                {t.owners.p1}
              </p>

              <div className="space-y-4 pt-2 text-xs text-[#202320]">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 border border-[#B49A70] text-[#B49A70] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="block font-semibold mb-0.5">
                      {language === 'el' ? 'Εκτίμηση Εμπορικής Αξίας' : 'Market Valuation'}
                    </strong>
                    <span className="text-[#777A75] font-light leading-relaxed">
                      {language === 'el'
                        ? 'Ρεαλιστική τιμολόγηση βασισμένη σε δεδομένα πραγματικών συμβολαίων.'
                        : 'Accurate pricing methodology grounded in verified comparable sales.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 border border-[#B49A70] text-[#B49A70] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="block font-semibold mb-0.5">
                      {language === 'el' ? 'Απόλυτη Εχεμύθεια' : 'Strict Confidentiality'}
                    </strong>
                    <span className="text-[#777A75] font-light leading-relaxed">
                      {language === 'el'
                        ? 'Δυνατότητα διακριτικής προώθησης (Off-Market) χωρίς δημόσια έκθεση.'
                        : 'Discreet off-market campaigns preserving privacy.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 border border-[#B49A70] text-[#B49A70] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="block font-semibold mb-0.5">
                      {language === 'el' ? 'Ολοκληρωμένη Υποστήριξη' : 'Full Support'}
                    </strong>
                    <span className="text-[#777A75] font-light leading-relaxed">
                      {language === 'el'
                        ? 'Συνεργασία με νομικούς, τοπογράφους και μηχανικούς για άμεση επίλυση εκκρεμοτήτων.'
                        : 'Full legal, surveying, and engineering diligence network.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#F2F0EB] border border-[#E5E1DA] text-xs space-y-2 text-[#777A75]">
              <div className="flex items-center gap-2 text-[#202320] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#B49A70]" />
                <span>{language === 'el' ? 'Νομική Δέσμευση Απορρήτου' : 'Confidentiality Commitment'}</span>
              </div>
              <p className="leading-relaxed font-light">
                {language === 'el'
                  ? 'Όλα τα στοιχεία που υποβάλλετε προστατεύονται από τις διατάξεις του GDPR και δεν κοινοποιούνται σε τρίτους χωρίς τη ρητή συγκατάθεσή σας.'
                  : 'All property details submitted are strictly protected under GDPR and will never be shared without explicit authorization.'}
              </p>
            </div>
          </div>

          {/* Right Column: Submission Form */}
          <div className="lg:col-span-7 bg-white border border-[#E5E1DA] shadow-md p-8 sm:p-10">
            {submitSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 bg-[#202320] text-[#B49A70] flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#202320]">
                  {language === 'el' ? 'Η ανάθεση καταχωρήθηκε επιτυχώς' : 'Assignment Registered'}
                </h3>
                <p className="text-sm text-[#777A75] font-light max-w-md mx-auto leading-relaxed">
                  {t.owners.submitSuccess}
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setPropertyLocation('');
                      setPropertySize('');
                      setAdditionalNotes('');
                    }}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#202320] border border-[#E5E1DA] hover:border-[#B49A70]"
                  >
                    {language === 'el' ? 'Υποβολή Άλλου Ακινήτου' : 'Submit Another Property'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Section 1: Owner Details */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#B49A70] mb-4 pb-2 border-b border-[#E5E1DA]">
                    1. {language === 'el' ? 'Στοιχεία Επικοινωνίας Ιδιοκτήτη' : 'Owner Contact Information'}
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                        {t.owners.formName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="π.χ. Ιωάννης Δημητρίου"
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
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
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
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
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Property Specifications */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#B49A70] mb-4 pb-2 border-b border-[#E5E1DA]">
                    2. {language === 'el' ? 'Στοιχεία Ακινήτου' : 'Property Specifications'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                        {t.owners.formLocation} *
                      </label>
                      <input
                        type="text"
                        required
                        value={propertyLocation}
                        onChange={(e) => setPropertyLocation(e.target.value)}
                        placeholder="π.χ. Γλυφάδα, Αττική ή Μύκονος"
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                        {t.owners.formType} *
                      </label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70] cursor-pointer"
                      >
                        <option value="residential_villa">{language === 'el' ? 'Έπαυλη / Βίλα' : 'Villa'}</option>
                        <option value="residential_apartment">{language === 'el' ? 'Διαμέρισμα' : 'Apartment'}</option>
                        <option value="residential_penthouse">{language === 'el' ? 'Ρετιρέ' : 'Penthouse'}</option>
                        <option value="commercial_office">{language === 'el' ? 'Επαγγελματικό Κτίριο / Γραφεία' : 'Commercial Office'}</option>
                        <option value="land_plot">{language === 'el' ? 'Οικόπεδο / Έκταση' : 'Land Plot'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                        {t.owners.formSize} *
                      </label>
                      <input
                        type="number"
                        required
                        value={propertySize}
                        onChange={(e) => setPropertySize(e.target.value)}
                        placeholder="π.χ. 250"
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                        {t.owners.formService} *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(['sale', 'rent', 'management', 'valuation'] as const).map((srv) => (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => setDesiredService(srv)}
                            className={`p-2.5 text-xs font-medium border text-center transition-colors ${
                              desiredService === srv
                                ? 'bg-[#202320] text-white border-[#202320]'
                                : 'bg-[#FAF9F6] text-[#777A75] border-[#E5E1DA] hover:border-[#B49A70]'
                            }`}
                          >
                            {srv === 'sale' && t.owners.serviceSale}
                            {srv === 'rent' && t.owners.serviceRent}
                            {srv === 'management' && t.owners.serviceManagement}
                            {srv === 'valuation' && t.owners.serviceValuation}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                        {t.owners.formNotes}
                      </label>
                      <textarea
                        rows={3}
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        placeholder={language === 'el' ? 'Αναφέρετε τυχόν ιδιαίτερα χαρακτηριστικά, έτος, κατάσταση ή ζητούμενη τιμή...' : 'State notable features, year, condition or target price...'}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
                      />
                    </div>

                    {/* Optional File Upload */}
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                        {language === 'el' ? 'Φωτογραφίες / Κατόψεις (Προαιρετικό)' : 'Photos / Floorplans (Optional)'}
                      </label>
                      <label className="flex flex-col items-center justify-center p-4 border border-dashed border-[#E5E1DA] bg-[#FAF9F6] hover:border-[#B49A70] cursor-pointer transition-colors">
                        <Upload className="w-5 h-5 text-[#B49A70] mb-1" />
                        <span className="text-xs text-[#202320]">
                          {uploadedFilesCount > 0 
                            ? `${uploadedFilesCount} ${language === 'el' ? 'αρχεία επιλέχθηκαν' : 'files selected'}`
                            : (language === 'el' ? 'Επιλέξτε αρχεία για μεταφόρτωση' : 'Select files to upload')}
                        </span>
                        <span className="text-[10px] text-[#777A75] mt-0.5">JPG, PNG, PDF έως 15MB</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                    </div>

                  </div>
                </div>

                {/* GDPR Consent */}
                <div className="pt-2 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="owner-gdpr"
                    required
                    checked={gdprConsent}
                    onChange={(e) => setGdprConsent(e.target.checked)}
                    className="mt-0.5 rounded border-[#E5E1DA] text-[#202320] focus:ring-[#B49A70]"
                  />
                  <label htmlFor="owner-gdpr" className="text-xs text-[#777A75] leading-relaxed cursor-pointer">
                    {t.owners.formGdpr} *
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !gdprConsent}
                  className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? t.common.submitting : t.common.submit}</span>
                  <ArrowRight className="w-4 h-4 text-[#B49A70]" />
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, Shield } from 'lucide-react';

export const CookiePolicyView: React.FC = () => {
  const { t, language, settings } = useApp();

  return (
    <div className="bg-[#FAF9F6] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Review Notice */}
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold mb-0.5">
              {language === 'el' ? 'Νομική Επισήμανση / Legal Notice' : 'Legal Review Notice'}
            </strong>
            <span>{t.legal.notice}</span>
          </div>
        </div>

        <div className="bg-white border border-[#E5E1DA] p-8 sm:p-12 space-y-8">
          
          <div className="border-b border-[#E5E1DA] pb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-2">
              Cookies & Tracking Disclosure
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#202320]">
              {t.legal.cookiesTitle}
            </h1>
            <p className="text-xs text-[#777A75] mt-2">
              {language === 'el' ? 'Τελευταία ενημέρωση:' : 'Last updated:'} 2026-03-01 · MANI PALACE
            </p>
          </div>

          <div className="prose text-xs sm:text-sm text-[#202320]/80 leading-relaxed font-light space-y-6">
            <section className="space-y-2">
              <h2 className="font-serif text-lg text-[#202320] font-semibold">
                1. {language === 'el' ? 'Τι είναι τα Cookies;' : 'What are Cookies?'}
              </h2>
              <p>
                {language === 'el'
                  ? 'Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας κατά την περιήγηση σε έναν ιστότοπο, προκειμένου να διασφαλίζουν την ομαλή λειτουργία και να διατηρούν τις προτιμήσεις σας (π.χ. γλώσσα).'
                  : 'Cookies are compact text files stored on your device when accessing web applications to facilitate navigation stability, security, and state persistence (e.g. language preferences).'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg text-[#202320] font-semibold">
                2. {language === 'el' ? 'Κατηγορίες Cookies που Χρησιμοποιούμε' : 'Categories Utilized'}
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>{language === 'el' ? 'Απολύτως Απαραίτητα Cookies:' : 'Strictly Necessary Cookies:'}</strong>{' '}
                  {language === 'el'
                    ? 'Απαραίτητα για την τεχνική λειτουργία του ιστοτόπου, την ασφάλεια και την αποθήκευση της επιλογής γλώσσας.'
                    : 'Required for platform operational security and session language preservation.'}
                </li>
                <li>
                  <strong>{language === 'el' ? 'Στατιστικά / Analytics Cookies:' : 'Analytical Cookies:'}</strong>{' '}
                  {language === 'el'
                    ? 'Χρησιμοποιούνται ανώνυμα για τη μέτρηση της επισκεψιμότητας, μόνο εφόσον έχετε δώσει τη ρητή συγκατάθεσή σας.'
                    : 'Optionally utilized with explicit prior consent to anonymously aggregate traffic metrics.'}
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg text-[#202320] font-semibold">
                3. {language === 'el' ? 'Διαχείριση των Προτιμήσεών σας' : 'Managing Preferences'}
              </h2>
              <p>
                {language === 'el'
                  ? 'Μπορείτε ανά πάσα στιγμή να ανακαλέσετε ή να τροποποιήσετε τις προτιμήσεις σας μέσω του banner συγκατάθεσης ή μέσω των ρυθμίσεων του προγράμματος περιήγησής σας.'
                  : 'You may modify your preferences at any moment via our consent tool or through your client browser settings.'}
              </p>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
};

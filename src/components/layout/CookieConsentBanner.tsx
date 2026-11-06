import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Check, X } from 'lucide-react';

export const CookieConsentBanner: React.FC = () => {
  const { cookieConsent, saveCookieConsent, t, language, navigateTo } = useApp();
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  // If already decided, don't show floating banner
  if (cookieConsent && !showPreferences) {
    return null;
  }

  const handleAcceptAll = () => {
    saveCookieConsent({ accepted: true, analytics: true });
    setShowPreferences(false);
  };

  const handleRejectNonEssential = () => {
    saveCookieConsent({ accepted: true, analytics: false });
    setShowPreferences(false);
  };

  const handleSaveCustom = () => {
    saveCookieConsent({ accepted: true, analytics: analyticsEnabled });
    setShowPreferences(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-transparent pointer-events-none">
      <div className="max-w-4xl mx-auto bg-[#FAF9F6] border border-[#E5E1DA] shadow-2xl p-5 sm:p-6 rounded-none pointer-events-auto transition-all">
        
        {!showPreferences ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#B49A70] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-[#202320]">
                  {t.cookies.title}
                </h4>
                <p className="text-xs text-[#777A75] leading-relaxed max-w-2xl">
                  {t.cookies.desc}{' '}
                  <button
                    onClick={() => navigateTo('cookies')}
                    className="text-[#202320] underline hover:text-[#B49A70] transition-colors"
                  >
                    {language === 'el' ? 'Περισσότερα' : 'Read more'}
                  </button>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-3 py-1.5 text-xs font-medium text-[#777A75] hover:text-[#202320] border border-[#E5E1DA] hover:border-[#B49A70] transition-colors"
              >
                {t.cookies.customize}
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-3 py-1.5 text-xs font-medium text-[#202320] hover:bg-[#F2F0EB] border border-[#E5E1DA] transition-colors"
              >
                {t.cookies.rejectNonEssential}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-1.5 text-xs font-medium text-white bg-[#202320] hover:bg-[#323632] transition-colors"
              >
                {t.cookies.acceptAll}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E1DA] pb-3">
              <h4 className="text-base font-serif font-semibold text-[#202320]">
                {language === 'el' ? 'Προτιμήσεις Απορρήτου' : 'Privacy Preferences'}
              </h4>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-[#777A75] hover:text-[#202320]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-[#F2F0EB]">
                <div>
                  <div className="font-semibold text-[#202320]">
                    {language === 'el' ? 'Απαραίτητα Cookies' : 'Essential Cookies'}
                  </div>
                  <div className="text-[#777A75]">
                    {language === 'el'
                      ? 'Απαιτούνται για την ασφάλεια, τη γλώσσα και τη βασική λειτουργία.'
                      : 'Required for security, language preference, and core site operation.'}
                  </div>
                </div>
                <span className="text-[11px] font-mono font-semibold text-[#777A75] uppercase px-2 py-0.5 bg-white border border-[#E5E1DA]">
                  {language === 'el' ? 'Ενεργά' : 'Always Active'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 border border-[#E5E1DA]">
                <div>
                  <div className="font-semibold text-[#202320]">
                    {language === 'el' ? 'Στατιστικά / Analytics Cookies' : 'Analytical / Performance Cookies'}
                  </div>
                  <div className="text-[#777A75]">
                    {language === 'el'
                      ? 'Μας βοηθούν ανώνυμα να κατανοήσουμε την επισκεψιμότητα.'
                      : 'Helps us anonymously evaluate site reach and user experience.'}
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#202320]"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E5E1DA]">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-3 py-1.5 text-xs text-[#777A75] hover:text-[#202320]"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-4 py-1.5 text-xs font-medium text-white bg-[#202320] hover:bg-[#323632]"
              >
                {language === 'el' ? 'Αποθήκευση Επιλογών' : 'Save Preferences'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle } from 'lucide-react';

export const TermsOfUseView: React.FC = () => {
  const { t, language } = useApp();

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
              Terms & Conditions
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#202320]">
              {t.legal.termsTitle}
            </h1>
            <p className="text-xs text-[#777A75] mt-2">
              ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε. · manipalace.com
            </p>
          </div>

          <div className="prose text-xs sm:text-sm text-[#202320]/80 leading-relaxed font-light space-y-6">
            <section className="space-y-2">
              <h2 className="font-serif text-lg text-[#202320] font-semibold">
                1. {language === 'el' ? 'Εισαγωγή & Αποδοχή Όρων' : 'Introduction & Acceptance'}
              </h2>
              <p>
                {language === 'el'
                  ? 'Η χρήση του ιστοτόπου manipalace.com της εταιρείας ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε. (Α.Φ.Μ. 801410664, Αρ.ΓΕΜΗ 156223083300) υπόκειται στους παρόντες όρους. Η πλοήγηση στον ιστότοπο συνεπάγεται την ανεπιφύλακτη αποδοχή τους.'
                  : 'Use of the manipalace.com website of ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε. (VAT No. 801410664, GEMI Reg. No. 156223083300) is governed by these Terms of Use. Navigating the website constitutes unconditional acceptance of these provisions.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg text-[#202320] font-semibold">
                2. {language === 'el' ? 'Περιεχόμενο Ιστοτόπου' : 'Website Content'}
              </h2>
              <p>
                {language === 'el'
                  ? 'Το περιεχόμενο του ιστοτόπου έχει σκοπό την εταιρική παρουσίαση της ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε. και των δραστηριοτήτων της στον χώρο της κατοχής, αξιοποίησης, εκμίσθωσης και διαχείρισης ακινήτων.'
                  : 'The content of this website serves as the corporate presentation of MANI PALACE SINGLE MEMBER P.C. and its activities in owning, utilizing, leasing, and managing real estate assets.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg text-[#202320] font-semibold">
                3. {language === 'el' ? 'Πνευματική Ιδιοκτησία' : 'Intellectual Property'}
              </h2>
              <p>
                {language === 'el'
                  ? 'Η επωνυμία, το διακριτικό σήμα MANI PALACE, τα κείμενα και το οπτικό υλικό αποτελούν πνευματική ιδιοκτησία της εταιρείας και προστατεύονται από το ελληνικό και διεθνές δίκαιο.'
                  : 'The corporate name, MANI PALACE mark, texts, and visual materials constitute intellectual property of the company protected under Greek and international law.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg text-[#202320] font-semibold">
                4. {language === 'el' ? 'Εφαρμοστέο Δίκαιο' : 'Applicable Law'}
              </h2>
              <p>
                {language === 'el'
                  ? 'Οι παρόντες όροι διέπονται από το Ελληνικό Δίκαιο.'
                  : 'These Terms of Use are governed by the laws of Greece.'}
              </p>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
};

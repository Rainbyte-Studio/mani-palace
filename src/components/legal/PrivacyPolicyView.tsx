import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle } from 'lucide-react';

export const PrivacyPolicyView: React.FC = () => {
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
              GDPR & Data Protection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#202320]">
              {t.legal.privacyTitle}
            </h1>
            <p className="text-xs text-[#777A75] mt-2">
              ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε. · manipalace.com
            </p>
          </div>

          <div className="prose text-xs sm:text-sm text-[#202320]/80 leading-relaxed font-light space-y-6">
            <section className="space-y-2">
              <h2 className="font-serif text-lg text-[#202320] font-semibold">
                1. {language === 'el' ? 'Υπεύθυνος Επεξεργασίας' : 'Data Controller'}
              </h2>
              <p>
                {language === 'el'
                  ? 'Υπεύθυνος επεξεργασίας των προσωπικών σας δεδομένων είναι η εταιρεία ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε., με Α.Φ.Μ. 801410664 και Αρ.ΓΕΜΗ 156223083300 (εφεξής «MANI PALACE»).'
                  : 'The data controller for your personal information is ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε. (MANI PALACE SINGLE MEMBER P.C.), registered under Greek VAT No. 801410664 and GEMI Reg. No. 156223083300.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg text-[#202320] font-semibold">
                2. {language === 'el' ? 'Δεδομένα που Συλλέγουμε' : 'Categories of Data Collected'}
              </h2>
              <p>
                {language === 'el'
                  ? 'Συλλέγουμε αποκλειστικά τα δεδομένα που μας παρέχετε οικειοθελώς μέσω της φόρμας επικοινωνίας του ιστοτόπου (Ονοματεπώνυμο, Διεύθυνση Ηλεκτρονικού Ταχυδρομείου, Τηλέφωνο, Μήνυμα).'
                  : 'We collect solely the data provided voluntarily by you through our website contact form (Full Name, Email Address, Telephone, Message).'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg text-[#202320] font-semibold">
                3. {language === 'el' ? 'Σκοπός & Νομική Βάση Επεξεργασίας' : 'Purpose & Legal Grounds'}
              </h2>
              <p>
                {language === 'el'
                  ? 'Τα δεδομένα χρησιμοποιούνται αποκλειστικά για την εξέταση και απάντηση του μηνύματός σας, καθώς και για τη συμμόρφωση της εταιρείας με τις ισχύουσες νομικές υποχρεώσεις.'
                  : 'Personal data is utilized strictly to address your inquiry and comply with applicable statutory obligations.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg text-[#202320] font-semibold">
                4. {language === 'el' ? 'Δικαιώματα Υποκειμένων των Δεδομένων' : 'Your Rights under GDPR'}
              </h2>
              <p>
                {language === 'el'
                  ? 'Σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (ΕΕ 2016/679), διατηρείτε το δικαίωμα πρόσβασης, διόρθωσης, διαγραφής, περιορισμού της επεξεργασίας και φορητότητας των δεδομένων σας.'
                  : 'In compliance with the General Data Protection Regulation (EU 2016/679), you maintain rights of access, rectification, erasure, restriction of processing, and data portability.'}
              </p>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
};

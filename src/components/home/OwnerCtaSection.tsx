import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const OwnerCtaSection: React.FC = () => {
  const { t, language, navigateTo } = useApp();

  const benefits = language === 'el' ? [
    'Ακριβής εκτίμηση εμπορικής αξίας με βάση πρόσφατες πραγματικές συναλλαγές',
    'Στοχευμένη προώθηση σε επιλεγμένο δίκτυο ιδιωτών και επενδυτών',
    'Πλήρης νομική, τεχνική και φοροτεχνική υποστήριξη σε κάθε στάδιο',
    'Απόλυτη διακριτικότητα και προστασία των προσωπικών σας δεδομένων',
  ] : [
    'Precise commercial valuation based on verified historical market transactions',
    'Curated marketing to qualified private individuals and institutional buyers',
    'Comprehensive legal, technical, and tax advisory across every stage',
    'Unwavering discretion and rigorous protection of owner privacy',
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#202320] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold">
              <span className="w-5 h-[1px] bg-[#B49A70]" />
              <span>{language === 'el' ? 'Ιδιοκτήτες Ακινήτων' : 'Property Owners'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
              {language === 'el' 
                ? 'Σκέφτεστε την πώληση, μίσθωση ή ανάθεση διαχείρισης;' 
                : 'Considering selling, leasing, or entrusting property management?'}
            </h2>

            <p className="text-base text-[#FAF9F6]/75 font-light leading-relaxed max-w-xl">
              {language === 'el'
                ? 'Η ομάδα της MANI PALACE αναλαμβάνει την υπεύθυνη προώθηση και τη συνολική διαχείριση του ακινήτου σας, εξασφαλίζοντας μέγιστη απόδοση και απόλυτη ηρεμία.'
                : 'The MANI PALACE advisory team undertakes the discreet marketing and stewardship of your asset, ensuring optimal yield and complete peace of mind.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#FAF9F6]/85">
                  <CheckCircle2 className="w-4 h-4 text-[#B49A70] shrink-0 mt-0.5" />
                  <span className="leading-snug">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
            <div className="p-8 bg-[#282B28] border border-[#3E423E] w-full max-w-md space-y-6">
              <h3 className="font-serif text-xl text-white font-medium">
                {language === 'el' ? 'Άμεση Ανάθεση Ακινήτου' : 'Direct Property Assignment'}
              </h3>
              <p className="text-xs text-[#FAF9F6]/70 leading-relaxed font-light">
                {language === 'el'
                  ? 'Συμπληρώστε τη σύντομη φόρμα ανάθεσης για να ξεκινήσουμε τη διαδικασία εκτίμησης του ακινήτου σας.'
                  : 'Complete our brief submission form to initiate a confidential asset appraisal and consultation.'}
              </p>
              <button
                onClick={() => navigateTo('owners')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#202320] bg-[#B49A70] hover:bg-[#A3885F] transition-colors"
              >
                <span>{language === 'el' ? 'Φόρμα Ανάθεσης' : 'Submit Property'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CookieConsentBanner } from './components/layout/CookieConsentBanner';

// Home sections
import { HeroSection } from './components/home/HeroSection';
import { IntroSection } from './components/home/IntroSection';
import { ServicesOverviewSection } from './components/home/ServicesOverviewSection';
import { InvestmentSection } from './components/home/InvestmentSection';
import { ContactCtaSection } from './components/home/ContactCtaSection';

// Views
import { ServicesView } from './components/services/ServicesView';
import { AboutView } from './components/about/AboutView';
import { ContactView } from './components/contact/ContactView';
import { PrivacyPolicyView } from './components/legal/PrivacyPolicyView';
import { CookiePolicyView } from './components/legal/CookiePolicyView';
import { TermsOfUseView } from './components/legal/TermsOfUseView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';

const MainContent: React.FC = () => {
  const { currentRoute, isAdminAuthenticated } = useApp();
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'about':
        return <AboutView />;

      case 'services':
      case 'activities':
        return <ServicesView />;

      case 'contact':
        return <ContactView />;

      case 'privacy':
        return <PrivacyPolicyView />;

      case 'cookies':
        return <CookiePolicyView />;

      case 'terms':
        return <TermsOfUseView />;

      case 'admin':
        if (isAdminAuthenticated) {
          return <AdminDashboard />;
        }
        return (
          <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-[#FAF9F6]">
            <div className="max-w-md w-full bg-white border border-[#E5E1DA] p-8 text-center space-y-4 shadow-sm">
              <span className="font-serif text-2xl text-[#202320] block">
                MANI PALACE
              </span>
              <p className="text-xs text-[#777A75] leading-relaxed">
                Απαιτείται ταυτοποίηση διαχειριστή για πρόσβαση στον πίνακα ελέγχου.
              </p>
              <button
                onClick={() => setAdminLoginOpen(true)}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors"
              >
                Σύνδεση Διαχειριστή
              </button>
            </div>
            <AdminLoginModal
              isOpen={adminLoginOpen}
              onClose={() => setAdminLoginOpen(false)}
              onSuccess={() => setAdminLoginOpen(false)}
            />
          </div>
        );

      case 'home':
      default:
        return (
          <>
            <HeroSection />
            <IntroSection />
            <ServicesOverviewSection />
            <InvestmentSection />
            <ContactCtaSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#202320] selection:bg-[#B49A70]/20 selection:text-[#202320]">
      {/* Top Bar (Single-row, 3-zone contract) */}
      <Header />

      {/* Main Content View */}
      <main className="flex-grow">
        {renderCurrentView()}
      </main>

      {/* Footer with Mandatory Corporate Identifiers */}
      <Footer />

      {/* GDPR Cookie Consent */}
      <CookieConsentBanner />

      {/* Admin Login Modal if triggered */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onSuccess={() => setAdminLoginOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

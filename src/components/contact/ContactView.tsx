import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, Clock, Check, ArrowRight, ShieldCheck, AlertCircle, Globe } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { t, language, settings, addEnquiry } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        enquiryType: 'general_contact',
        fullName,
        email,
        phone,
        subject: subject || (language === 'el' ? 'Επικοινωνία μέσω manipalace.com' : 'Contact via manipalace.com'),
        message,
        gdprConsent,
      });
      setSubmitSuccess(true);
    } catch {
      setErrorMessage(language === 'el' ? 'Παρουσιάστηκε σφάλμα κατά την αποστολή.' : 'An error occurred while sending your message.');
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
            <span>MANI PALACE · ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#202320] font-normal leading-tight">
            {t.contact.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#777A75] font-light leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Corporate Identity & Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-[#E5E1DA] p-8 space-y-6">
              <h2 className="font-serif text-2xl text-[#202320] font-normal">
                {t.contact.directContact}
              </h2>

              <div className="space-y-4 text-xs text-[#202320]">
                {/* Official Domain */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 border border-[#E5E1DA] flex items-center justify-center text-[#B49A70] shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#777A75] block font-semibold mb-0.5">
                      Domain
                    </span>
                    <span className="font-mono text-sm">
                      manipalace.com
                    </span>
                  </div>
                </div>

                {/* Direct Phone only if configured */}
                {settings.phone ? (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 border border-[#E5E1DA] flex items-center justify-center text-[#B49A70] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#777A75] block font-semibold mb-0.5">
                        {language === 'el' ? 'Τηλέφωνο' : 'Telephone'}
                      </span>
                      <a href={`tel:${settings.phone}`} className="font-mono text-sm hover:text-[#B49A70]">
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                ) : null}

                {/* Direct Email only if configured */}
                {settings.email ? (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 border border-[#E5E1DA] flex items-center justify-center text-[#B49A70] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#777A75] block font-semibold mb-0.5">
                        Email
                      </span>
                      <a href={`mailto:${settings.email}`} className="text-sm hover:text-[#B49A70]">
                        {settings.email}
                      </a>
                    </div>
                  </div>
                ) : null}

                {/* Communication hours */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 border border-[#E5E1DA] flex items-center justify-center text-[#B49A70] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#777A75] block font-semibold mb-0.5">
                      {t.contact.hours}
                    </span>
                    <span className="leading-relaxed text-[#777A75]">
                      {t.contact.hoursText}
                    </span>
                  </div>
                </div>
              </div>

              {!settings.phone && !settings.email && (
                <div className="p-4 bg-[#FAF9F6] border border-[#E5E1DA] text-xs text-[#777A75] leading-relaxed font-light">
                  {t.contact.directContactNote}
                </div>
              )}
            </div>

            {/* Official Corporate Registry Card */}
            <div className="p-6 bg-[#F2F0EB] border border-[#E5E1DA] space-y-3 text-xs">
              <div className="flex items-center gap-2 text-[#202320] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#B49A70]" />
                <span>ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-xs text-[#202320]">
                <span>Α.Φ.Μ.: <strong>801410664</strong></span>
                <span>·</span>
                <span>Αρ.ΓΕΜΗ: <strong>156223083300</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#E5E1DA] shadow-sm p-8 sm:p-10">
            {submitSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 bg-[#202320] text-[#B49A70] flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#202320]">
                  {language === 'el' ? 'Το μήνυμα απεστάλη επιτυχώς' : 'Message Sent'}
                </h3>
                <p className="text-sm text-[#777A75] font-light max-w-md mx-auto leading-relaxed">
                  {t.contact.successMsg}
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setSubject('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#202320] border border-[#E5E1DA] hover:border-[#B49A70]"
                  >
                    {language === 'el' ? 'Νέο Μήνυμα' : 'New Message'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

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
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      {t.owners.formPhone}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      {t.contact.formSubject}
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
                      {t.contact.formMessage} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
                    />
                  </div>
                </div>

                {/* GDPR Consent */}
                <div className="flex items-start gap-2.5 pt-2">
                  <input
                    type="checkbox"
                    id="contact-gdpr"
                    required
                    checked={gdprConsent}
                    onChange={(e) => setGdprConsent(e.target.checked)}
                    className="mt-0.5 rounded border-[#E5E1DA] text-[#202320] focus:ring-[#B49A70]"
                  />
                  <label htmlFor="contact-gdpr" className="text-xs text-[#777A75] leading-relaxed cursor-pointer">
                    {t.owners.formGdpr} *
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !gdprConsent}
                  className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? t.common.submitting : t.contact.sendButton}</span>
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

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, X } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginAdmin, language } = useApp();
  const [email, setEmail] = useState('admin@manipalace.com');
  const [password, setPassword] = useState('mani2026');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = loginAdmin(email, password);
    if (success) {
      onSuccess();
    } else {
      setError(language === 'el' ? 'Μη έγκυρα διαπιστευτήρια διαχειριστή.' : 'Invalid administrator credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#FAF9F6] border border-[#E5E1DA] w-full max-w-md p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#777A75] hover:text-[#202320]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold mb-3">
          <Shield className="w-4 h-4" />
          <span>MANI PALACE Security</span>
        </div>

        <h3 className="font-serif text-2xl text-[#202320] font-normal mb-2">
          {language === 'el' ? 'Είσοδος Διαχειριστή' : 'Administrator Sign In'}
        </h3>
        
        <p className="text-xs text-[#777A75] font-light leading-relaxed mb-6">
          {language === 'el'
            ? 'Πρόσβαση στο σύστημα διαχείρισης ακινήτων, αιτημάτων και ρυθμίσεων της πλατφόρμας.'
            : 'Access the property catalog, client inquiry registry, and platform configuration.'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
              {language === 'el' ? 'Email Διαχειριστή' : 'Admin Email'}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
              />
              <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#777A75]" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777A75] mb-1">
              {language === 'el' ? 'Κωδικός Πρόσβασης' : 'Password'}
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E5E1DA] text-[#202320] focus:outline-none focus:border-[#B49A70]"
              />
              <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#777A75]" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#202320] hover:bg-[#323632] transition-colors flex items-center justify-center gap-2"
            >
              <span>{language === 'el' ? 'Σύνδεση στον Πίνακα' : 'Enter Dashboard'}</span>
              <ArrowRight className="w-4 h-4 text-[#B49A70]" />
            </button>
          </div>

          <div className="text-[11px] text-[#777A75] text-center pt-2">
            {language === 'el'
              ? 'Εξουσιοδοτημένη πρόσβαση μόνο για στελέχη της MANI PALACE.'
              : 'Authorized personnel access only.'}
          </div>
        </form>
      </div>
    </div>
  );
};

import { WebsiteSettings } from '../types';

export const defaultSettings: WebsiteSettings = {
  companyDisplayName: 'MANI PALACE',
  companyGreekName: 'ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.',
  verifiedLegalName: 'ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.',
  vatNumber: '801410664',
  gemiNumber: '156223083300',
  phone: '',
  email: '',
  address: '',
  operatingAreas: '',
  socialLinks: {
    linkedin: '',
    instagram: '',
    facebook: '',
  },
  heroHeading: {
    el: 'Ακίνητα με προοπτική και φροντίδα',
    en: 'Properties with perspective and care',
  },
  heroSubtitle: {
    el: 'Η ΜΑΝΗ ΠΑΛΛΑΣ ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε. δραστηριοποιείται στον χώρο της ακίνητης περιουσίας, με αντικείμενο την κατοχή, την αξιοποίηση, την εκμίσθωση και τη διαχείριση ακινήτων.',
    en: 'MANI PALACE SINGLE MEMBER P.C. operates in the real estate sector, focusing on the ownership, utilization, leasing, and management of properties.',
  },
  isFirebaseConnected: false,
};

import { el } from './el';
import { en } from './en';
import { Language } from '../types';

export const translations = {
  el,
  en,
};

export const getTranslation = (lang: Language) => {
  return translations[lang] || translations.el;
};

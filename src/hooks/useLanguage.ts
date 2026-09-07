import { useState, useCallback } from 'react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

const LANGUAGE_STORAGE_KEY = 'geopulse_lang';

export function useLanguage(defaultLanguage: Language = 'es') {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return stored === 'es' || stored === 'en' ? stored : defaultLanguage;
    } catch {
      return defaultLanguage;
    }
  });

  const changeLanguage = useCallback((newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  const translations = getTranslation(language);

  return {
    language,
    translations,
    setLanguage: changeLanguage,
  };
}

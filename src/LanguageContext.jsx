import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supportedLanguages, translations } from './translations';

const LanguageContext = createContext(null);

function getInitialLanguage() {
  const savedLanguage = window.localStorage.getItem('portfolio-language');
  return supportedLanguages.includes(savedLanguage) ? savedLanguage : 'uz';
}

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem('portfolio-language', currentLang);
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const value = useMemo(
    () => ({
      currentLang,
      setCurrentLang,
      t: translations[currentLang],
    }),
    [currentLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider.');
  }
  return context;
}

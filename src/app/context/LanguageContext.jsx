import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'atlas-language';
const LanguageContext = createContext(null);

function detectInitialLanguage() {
  if (typeof window === 'undefined') return 'es';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* localStorage no disponible */
  }
  // Si el navegador del visitante no está en español, asumimos que
  // podría ser un cliente extranjero y arrancamos en inglés.
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(detectInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* no-op */
    }
  }, [language]);

  const api = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === 'es' ? 'en' : 'es')),
    }),
    [language]
  );

  return <LanguageContext.Provider value={api}>{children}</LanguageContext.Provider>;
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage debe usarse dentro de <LanguageProvider>');
  return ctx;
}
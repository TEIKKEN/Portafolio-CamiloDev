import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const STORAGE_KEY = 'atlas-a11y-settings';

const DEFAULT_SETTINGS = {
  highContrast: false,
  reducedMotionOverride: false,
  fontScale: 1,
  letterSpacing: 0,
  wordSpacing: 0,
  readingGuide: false,
  readingMask: false,
};

function loadSettings() {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function useSystemReducedMotion() {
  const [prefers, setPrefers] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefers(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);
  return prefers;
}

const AccessibilityContext = createContext(null);

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState(loadSettings);
  const [announcement, setAnnouncement] = useState('');
  const systemReducedMotion = useSystemReducedMotion();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* localStorage no disponible (modo privado, etc.) — no es crítico */
    }
  }, [settings]);

  // El toggle manual SUMA restricción, nunca reactiva motion si el
  // sistema operativo ya pidió reducirlo. El SO manda.
  const reducedMotion = systemReducedMotion || settings.reducedMotionOverride;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', settings.highContrast ? 'high-contrast' : 'dark');
    root.style.setProperty('--a11y-font-scale', settings.fontScale);
    root.style.setProperty('--a11y-letter-spacing', `${settings.letterSpacing}em`);
    root.style.setProperty('--a11y-word-spacing', `${settings.wordSpacing}em`);
    root.classList.toggle('reduce-motion', reducedMotion);
  }, [settings, reducedMotion]);

  const update = useCallback((patch) => setSettings((prev) => ({ ...prev, ...patch })), []);

  const announce = useCallback((message) => {
    setAnnouncement('');
    requestAnimationFrame(() => setAnnouncement(message));
  }, []);

  const api = useMemo(() => {
    const toggleHighContrast = () => {
      update({ highContrast: !settings.highContrast });
      announce(settings.highContrast ? 'Alto contraste desactivado' : 'Alto contraste activado');
    };
    const toggleReducedMotionOverride = () => {
      update({ reducedMotionOverride: !settings.reducedMotionOverride });
      announce(
        settings.reducedMotionOverride ? 'Movimiento reducido desactivado' : 'Movimiento reducido activado'
      );
    };
    const toggleReadingGuide = () => {
      update({ readingGuide: !settings.readingGuide, readingMask: false });
      announce(settings.readingGuide ? 'Guía de lectura desactivada' : 'Guía de lectura activada');
    };
    const toggleReadingMask = () => {
      update({ readingMask: !settings.readingMask, readingGuide: false });
      announce(settings.readingMask ? 'Máscara de lectura desactivada' : 'Máscara de lectura activada');
    };
    const increaseFontScale = () =>
      update({ fontScale: Math.min(+(settings.fontScale + 0.1).toFixed(2), 1.4) });
    const decreaseFontScale = () =>
      update({ fontScale: Math.max(+(settings.fontScale - 0.1).toFixed(2), 0.9) });
    const reset = () => {
      update(DEFAULT_SETTINGS);
      announce('Ajustes de accesibilidad restablecidos');
    };

    return {
      ...settings,
      reducedMotion,
      announcement,
      announce,
      toggleHighContrast,
      toggleReducedMotionOverride,
      toggleReadingGuide,
      toggleReadingMask,
      increaseFontScale,
      decreaseFontScale,
      reset,
    };
  }, [settings, reducedMotion, announcement, announce, update]);

  return <AccessibilityContext.Provider value={api}>{children}</AccessibilityContext.Provider>;
};

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error('useAccessibility debe usarse dentro de <AccessibilityProvider>');
  }
  return ctx;
}
import { useEffect, useRef } from 'react';

/**
 * Progreso de scroll [0, 1] a lo largo de `sectionRef`.
 * 0 = la sección recién entra por abajo del viewport.
 * 1 = ya se scrolleó completamente fuera por arriba.
 */
export function useScrollProgress(sectionRef) {
  const progress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const scrolled = window.innerHeight - rect.top;
      progress.current = Math.min(Math.max(scrolled / total, 0), 1);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRef]);

  return progress;
}
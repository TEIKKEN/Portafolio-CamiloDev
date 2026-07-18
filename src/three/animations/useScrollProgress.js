import { useEffect, useRef } from 'react';

/**
 * Progreso de scroll [0, 1] a lo largo de `sectionRef`.
 *
 * Throttled con requestAnimationFrame: como mucho recalcula una vez
 * por frame de pantalla, sin importar cuántos eventos `scroll` dispare
 * el navegador en ese mismo frame (en Android puede ser bastante más
 * que 60/segundo durante el scroll con inercia). Esto evita repetir
 * getBoundingClientRect() —que fuerza un recálculo de layout— más
 * veces de las que hacen falta.
 */
export function useScrollProgress(sectionRef) {
  const progress = useRef(0);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height + window.innerHeight;
        const scrolled = window.innerHeight - rect.top;
        progress.current = Math.min(Math.max(scrolled / total, 0), 1);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRef]);

  return progress;
}
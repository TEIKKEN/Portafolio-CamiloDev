import { useEffect, useRef } from 'react';
import styles from './ScrollProgressBar.module.css';

/**
 * rAF-throttled, mutando el DOM directo (sin React state, sin Framer
 * Motion) en vez de re-renderizar por cada frame de scroll.
 *
 * Nota: se descartó `animation-timeline: scroll(root)` — en desktop
 * (donde el navegador soporta scroll-driven animations) introducía un
 * retraso perceptible en la respuesta al scroll nativo, porque el
 * navegador necesita mantener el frame de la animación perfectamente
 * sincronizado con la posición de scroll, lo que puede forzar un modo
 * de manejo de scroll menos asíncrono. Este approach imperativo es más
 * simple y no tiene ese efecto secundario.
 */
const ScrollProgressBar = () => {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return <div ref={barRef} className={styles.bar} aria-hidden="true" />;
};

export default ScrollProgressBar;

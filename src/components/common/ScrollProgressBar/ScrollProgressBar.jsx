import { useEffect, useRef } from 'react';
import styles from './ScrollProgressBar.module.css';

const supportsScrollTimeline =
  typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: scroll()');

/**
 * En navegadores con soporte, el fill lo maneja el CSS de
 * ScrollProgressBar.module.css vía `animation-timeline: scroll(root)`
 * (corre en el compositor, cero costo de hilo principal). Este efecto
 * es solo el fallback para navegadores sin soporte: mismo patrón de
 * throttle-a-rAF que useScrollProgress.js, mutando el DOM directo en
 * vez de pasar por React/Framer Motion en cada frame de scroll.
 */
const ScrollProgressBar = () => {
  const barRef = useRef(null);

  useEffect(() => {
    if (supportsScrollTimeline) return;

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

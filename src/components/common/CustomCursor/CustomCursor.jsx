import { useEffect, useRef, useState } from 'react';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import styles from './CustomCursor.module.css';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [role="button"], [data-cursor="link"]';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const { reducedMotion } = useAccessibility();

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine) and (hover: hover)');
    setEnabled(query.matches);
    const handler = (e) => setEnabled(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let mouseX = ringX;
    let mouseY = ringY;
    let frame;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      const isInteractive = e.target.closest?.(INTERACTIVE_SELECTOR);
      ring.classList.toggle(styles.ringActive, Boolean(isInteractive));
    };

    // Anillo con inercia — sigue al punto con retraso para dar sensación
    // de "peso", el punto central en cambio es 1:1 con el mouse.
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      frame = requestAnimationFrame(animateRing);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    frame = requestAnimationFrame(animateRing);
    document.body.classList.add(styles.hideNativeCursor);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(frame);
      document.body.classList.remove(styles.hideNativeCursor);
    };
  }, [enabled, reducedMotion]);

  if (!enabled || reducedMotion) return null;

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
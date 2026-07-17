import { useRef, useEffect } from 'react';
import { useAccessibility } from '@/app/context/AccessibilityContext';

/**
 * Atrae sutilmente un elemento hacia el cursor cuando está cerca, y lo
 * suelta con spring-back al salir. Se desactiva solo si reducedMotion
 * está activo o el dispositivo no tiene mouse fino (táctil).
 */
export function useMagnetic(strength = 0.3, radius = 70) {
  const ref = useRef(null);
  const { reducedMotion } = useAccessibility();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let frame;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const distance = Math.hypot(dx, dy);

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (distance < radius) {
          el.style.transition = 'transform 0.15s ease-out';
          el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        } else {
          el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
          el.style.transform = '';
        }
      });
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion, strength, radius]);

  return ref;
}
import { useEffect } from 'react';
import { useAccessibility } from '@/app/context/AccessibilityContext';

/**
 * Atajos globales — Alt + tecla. Se ignoran si el foco está en un
 * campo editable, para no pisar la escritura normal.
 *
 *  Alt+C → Alto contraste       Alt+G → Guía de lectura
 *  Alt+M → Reducir movimiento   Alt+K → Máscara de lectura
 *  Alt+= → Aumentar texto       Alt+- → Disminuir texto
 *  Alt+0 → Restablecer todo
 *
 * Nota: en algunos navegadores (Firefox en Windows) Alt solo puede
 * chocar con el menú nativo. Si te pasa, lo cambiamos por Ctrl+Shift.
 */
export function useAccessibilityShortcuts() {
  const a11y = useAccessibility();

  useEffect(() => {
    const isEditable = (el) =>
      el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable;

    const handler = (event) => {
      if (!event.altKey || isEditable(event.target)) return;

      switch (event.key.toLowerCase()) {
        case 'c':
          event.preventDefault();
          a11y.toggleHighContrast();
          break;
        case 'm':
          event.preventDefault();
          a11y.toggleReducedMotionOverride();
          break;
        case 'g':
          event.preventDefault();
          a11y.toggleReadingGuide();
          break;
        case 'k':
          event.preventDefault();
          a11y.toggleReadingMask();
          break;
        case '=':
        case '+':
          event.preventDefault();
          a11y.increaseFontScale();
          break;
        case '-':
          event.preventDefault();
          a11y.decreaseFontScale();
          break;
        case '0':
          event.preventDefault();
          a11y.reset();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [a11y]);
}
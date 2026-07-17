import { useEffect, useRef, useState } from 'react';
import { Eye, Contrast, Type, MousePointer2, RotateCcw, X } from 'lucide-react';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import Icon from '@/components/ui/Icon/Icon';
import styles from './AccessibilityPanel.module.css';

const AccessibilityPanel = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const a11y = useAccessibility();

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    panelRef.current?.querySelector('button')?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.panel} ref={panelRef} role="dialog" aria-label="Opciones de accesibilidad">
          <div className={styles.panelHeader}>
            <span>Accesibilidad</span>
            <button className={styles.iconButton} onClick={() => setOpen(false)} aria-label="Cerrar panel">
              <Icon icon={X} size={16} />
            </button>
          </div>

          <button className={styles.row} onClick={a11y.toggleHighContrast} aria-pressed={a11y.highContrast}>
            <Icon icon={Contrast} size={18} />
            <span>Alto contraste</span>
            <kbd className={styles.kbd}>Alt+C</kbd>
          </button>

          <button
            className={styles.row}
            onClick={a11y.toggleReducedMotionOverride}
            aria-pressed={a11y.reducedMotion}
          >
            <Icon icon={MousePointer2} size={18} />
            <span>Reducir movimiento</span>
            <kbd className={styles.kbd}>Alt+M</kbd>
          </button>

          <button className={styles.row} onClick={a11y.toggleReadingGuide} aria-pressed={a11y.readingGuide}>
            <Icon icon={Eye} size={18} />
            <span>Guía de lectura</span>
            <kbd className={styles.kbd}>Alt+G</kbd>
          </button>

          <button className={styles.row} onClick={a11y.toggleReadingMask} aria-pressed={a11y.readingMask}>
            <Icon icon={Eye} size={18} />
            <span>Máscara de lectura</span>
            <kbd className={styles.kbd}>Alt+K</kbd>
          </button>

          <div className={styles.fontRow}>
            <Icon icon={Type} size={18} />
            <span>Tamaño de texto</span>
            <div className={styles.fontControls}>
              <button onClick={a11y.decreaseFontScale} aria-label="Reducir tamaño de texto">
                −
              </button>
              <span>{Math.round(a11y.fontScale * 100)}%</span>
              <button onClick={a11y.increaseFontScale} aria-label="Aumentar tamaño de texto">
                +
              </button>
            </div>
          </div>

          <button className={styles.reset} onClick={a11y.reset}>
            <Icon icon={RotateCcw} size={16} />
            Restablecer
          </button>
        </div>
      )}

      <Tooltip label="Accesibilidad" side="top">
        <button
          className={styles.trigger}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir opciones de accesibilidad"
        >
          <Icon icon={Contrast} size={20} />
        </button>
      </Tooltip>
    </div>
  );
};

export default AccessibilityPanel;
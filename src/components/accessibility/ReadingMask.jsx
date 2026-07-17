import { useEffect, useRef } from 'react';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import styles from './ReadingMask.module.css';

const ReadingMask = () => {
  const { readingMask } = useAccessibility();
  const maskRef = useRef(null);

  useEffect(() => {
    if (!readingMask) return;
    const el = maskRef.current;
    const handleMove = (e) => {
      if (!el) return;
      el.style.setProperty('--mask-x', `${e.clientX}px`);
      el.style.setProperty('--mask-y', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [readingMask]);

  if (!readingMask) return null;

  return <div ref={maskRef} className={styles.mask} aria-hidden="true" />;
};

export default ReadingMask;
import { useEffect, useState } from 'react';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import styles from './ReadingGuide.module.css';

const ReadingGuide = () => {
  const { readingGuide } = useAccessibility();
  const [y, setY] = useState(0);

  useEffect(() => {
    if (!readingGuide) return;
    const handleMove = (e) => setY(e.clientY);
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [readingGuide]);

  if (!readingGuide) return null;

  return <div className={styles.guide} style={{ top: y }} aria-hidden="true" />;
};

export default ReadingGuide;
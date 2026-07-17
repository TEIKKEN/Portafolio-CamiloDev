import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Icon from '@/components/ui/Icon/Icon';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import styles from './ScrollToTop.module.css';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const { reducedMotion } = useAccessibility();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className={styles.button}
          onClick={scrollToTop}
          aria-label="Volver al inicio"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.25 }}
        >
          <Icon icon={ArrowUp} size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { usePageReady } from '@/app/context/PageReadyContext';
import styles from './PageTransition.module.css';

const PageTransition = () => {
  const { reducedMotion } = useAccessibility();
  const { setReady } = usePageReady();
  const [visible, setVisible] = useState(!reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setReady(true);
      return;
    }
    const timer = setTimeout(() => {
      setVisible(false);
      setReady(true);
    }, 900);
    return () => clearTimeout(timer);
  }, [reducedMotion, setReady]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.curtain}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        >
          <motion.span
            className={styles.mark}
            initial={{ opacity: 0, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, letterSpacing: '0.05em' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            CamiloDev
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
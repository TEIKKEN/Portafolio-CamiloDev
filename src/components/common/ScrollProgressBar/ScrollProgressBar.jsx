import { memo, useMemo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import styles from './ScrollProgressBar.module.css';

const ScrollProgressBar = () => {
  const { reducedMotion } = useAccessibility();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });
  const style = useMemo(() => ({ scaleX: reducedMotion ? scrollYProgress : smooth }), [reducedMotion, scrollYProgress, smooth]);

  return (
    <motion.div
      className={styles.bar}
      style={style}
      aria-hidden="true"
    />
  );
};

export default ScrollProgressBar;
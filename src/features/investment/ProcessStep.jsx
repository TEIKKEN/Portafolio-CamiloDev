import { memo } from 'react';
import { motion } from 'framer-motion';
import styles from './PricingProcess.module.css';

const item = (reducedMotion) => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: reducedMotion
      ? { duration: 0 }
      : { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
});

const ProcessStep = ({ step, index, reducedMotion }) => {
  return (
    <motion.li className={styles.step} variants={item(reducedMotion)}>
      <span className={styles.stepIndex}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <h4 className={styles.stepTitle}>{step.title}</h4>
      <p className={styles.stepDescription}>{step.description}</p>
    </motion.li>
  );
};

export default memo(ProcessStep);

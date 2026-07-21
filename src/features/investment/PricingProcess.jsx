import { motion } from 'framer-motion';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import ProcessStep from './ProcessStep';
import styles from './PricingProcess.module.css';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const PricingProcess = () => {
  const { reducedMotion } = useAccessibility();
  const { t } = useTranslation();
  const { title, steps } = t.investment.process;

  return (
    <div className={styles.process}>
      <h3 className={styles.title}>{title}</h3>

      <motion.ol
        className={styles.steps}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step, index) => (
          <ProcessStep
            key={step.title}
            step={step}
            index={index}
            reducedMotion={reducedMotion}
          />
        ))}
      </motion.ol>
    </div>
  );
};

export default PricingProcess;

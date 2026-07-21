import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PRICING_PLANS } from '@/data/pricing';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import PricingCard from './PricingCard';
import PricingProcess from './PricingProcess';
import styles from './Investment.module.css';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
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

const plansContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const planItem = (reducedMotion) => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 36,
    scale: reducedMotion ? 1 : 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: reducedMotion
      ? { duration: 0 }
      : { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
});

const Investment = () => {
  const { reducedMotion } = useAccessibility();
  const { t } = useTranslation();
  const inv = t.investment;
  const fadeUp = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: reducedMotion
      ? { duration: 0 }
      : { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  };

  const scrollToContact = () => {
    document
      .getElementById('contact')
      ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      className={`${styles.investment} section`}
      id="investment"
      aria-label={inv.eyebrow}
    >
      <div className="container">
        <header className={styles.header}>
          <span className={styles.eyebrow}>{inv.eyebrow}</span>
          <h2 className={styles.heading}>
            {inv.headingPre}
            <span className="font-serif">{inv.headingAccent}</span>
          </h2>
        </header>

        <motion.div
          className={styles.content}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p className={styles.intro} variants={item(reducedMotion)}>
            {inv.intro}
          </motion.p>

          <motion.div
            className={styles.discovery}
            variants={item(reducedMotion)}
          >
            <h3 className={styles.discoveryTitle}>{inv.discoveryTitle}</h3>
            <p className={styles.discoveryIntro}>{inv.discoveryIntro}</p>
            <ul className={styles.list}>
              {inv.discoveryList.map((entry) => (
                <li key={entry} className={styles.listItem}>
                  {entry}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.p className={styles.closing} variants={item(reducedMotion)}>
            {inv.closing}
          </motion.p>
        </motion.div>

        <div className={styles.plansSection}>
          <h3 className={styles.blockTitle}>{inv.plansTitle}</h3>
          <motion.div
            className={styles.plansGrid}
            variants={plansContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {PRICING_PLANS.map((plan) => (
              <motion.div
                key={plan.id}
                className={styles.planItem}
                variants={planItem(reducedMotion)}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -8,
                        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                      }
                }
              >
                <PricingCard plan={plan} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div className={styles.customNeeds} {...fadeUp}>
            <h4 className={styles.customNeedsHeading}>{inv.customNeeds.heading}</h4>
            <p className={styles.customNeedsText}>{inv.customNeeds.text}</p>
          </motion.div>
        </div>

        <PricingProcess />

        <motion.div className={styles.everyProject} {...fadeUp}>
          <h3 className={styles.blockTitle}>{inv.everyProject.title}</h3>
          <ul className={styles.list}>
            {inv.everyProject.items.map((entry) => (
              <li key={entry} className={styles.listItem}>
                {entry}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.p className={styles.note} {...fadeUp}>
          {inv.note}
        </motion.p>

        <motion.div className={styles.cta} {...fadeUp}>
          <h3 className={styles.ctaHeading}>{inv.cta.heading}</h3>
          <p className={styles.ctaText}>{inv.cta.text}</p>
          <Button
            variant="primary"
            size="lg"
            magnetic
            onClick={scrollToContact}
            aria-label={inv.cta.ariaLabel}
          >
            {inv.cta.button}
            <Icon icon={ArrowUpRight} size={18} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Investment;

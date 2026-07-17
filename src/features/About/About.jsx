import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Icon from '@/components/ui/Icon/Icon';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './About.module.css';

const fadeUp = (reducedMotion, delay = 0) => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: reducedMotion ? { duration: 0 } : { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

const About = () => {
  const { reducedMotion } = useAccessibility();
  const { t } = useTranslation();
  const meta = t.about.meta;

  return (
    <section className={`${styles.about} section`} id="about" aria-label={t.about.eyebrow}>
      <div className="container">
        <motion.div className={styles.grid} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <div className={styles.main}>
            <motion.span className={styles.eyebrow} variants={fadeUp(reducedMotion)}>
              {t.about.eyebrow}
            </motion.span>

            <motion.h2 className={styles.heading} variants={fadeUp(reducedMotion, 0.05)}>
              {t.about.headingPre}
              <span className="font-serif">{t.about.headingAccent}</span>
            </motion.h2>

            <motion.p className={styles.bio} variants={fadeUp(reducedMotion, 0.1)}>
              {t.about.bio}
            </motion.p>

            <motion.div className={styles.metaRow} variants={fadeUp(reducedMotion, 0.15)}>
              <span className={styles.statusBadge}>
                <span className={styles.statusDot} />
                {t.about.status}
              </span>

              <ul className={styles.metaList}>
                <li>
                  <span className={styles.metaLabel}>{meta.age.label}</span>
                  <span className={styles.metaValue}>{meta.age.value}</span>
                </li>
                <li>
                  <span className={styles.metaLabel}>{meta.role.label}</span>
                  <span className={styles.metaValue}>{meta.role.value}</span>
                </li>
                <li>
                  <span className={styles.metaLabel}>{meta.study.label}</span>
                  <span className={styles.metaValue}>{meta.study.value}</span>
                </li>
                <li>
                  <span className={styles.metaLabel}>{meta.location.label}</span>
                  <span className={styles.metaValue}>{meta.location.value}</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.aside className={styles.aiCallout} variants={fadeUp(reducedMotion, 0.2)}>
            <span className={styles.aiIcon}>
              <Icon icon={Sparkles} size={20} />
            </span>
            <h3 className={styles.aiTitle}>{t.about.aiTitle}</h3>
            <p className={styles.aiText}>{t.about.aiText}</p>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/data/skills';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import SkillCard from './SkillCard';
import styles from './Skills.module.css';

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = (reducedMotion) => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: reducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
});

const Skills = () => {
  const { reducedMotion } = useAccessibility();
  const { t } = useTranslation();

  return (
    <section className={`${styles.skills} section`} id="skills" aria-label={t.skills.eyebrow}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.eyebrow}>{t.skills.eyebrow}</span>
          <h2 className={styles.heading}>
            {t.skills.headingPre}
            <span className="font-serif">{t.skills.headingAccent}</span>
          </h2>
          <p className={styles.subheading}>{t.skills.subheading}</p>
        </header>

        <motion.div
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SKILL_CATEGORIES.map((category) => (
            <motion.div key={category.id} variants={item(reducedMotion)}>
              <SkillCard category={category} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
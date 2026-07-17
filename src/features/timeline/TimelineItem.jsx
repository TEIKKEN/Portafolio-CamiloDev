import { memo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import Icon from '@/components/ui/Icon/Icon';
import Tag from '@/components/ui/Tag/Tag';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import { getAccentVar } from '@/utils/accent';
import styles from './TimelineItem.module.css';

const TYPE_META = {
  experience: { icon: Briefcase, accent: 'mint' },
  education: { icon: GraduationCap, accent: 'cyan' },
  certification: { icon: Award, accent: 'amber' },
};

const TimelineItem = ({ entry, index }) => {
  const { reducedMotion } = useAccessibility();
  const { t } = useTranslation();
  const meta = TYPE_META[entry.type] ?? TYPE_META.experience;
  const copy = t.timeline.items[entry.id];

  return (
    <motion.li
      className={styles.item}
      style={{ '--item-accent': getAccentVar(meta.accent) }}
      initial={{ opacity: 0, x: reducedMotion ? 0 : -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={
        reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }
      }
    >
      <span className={styles.iconDot}>
        <Icon icon={meta.icon} size={16} />
      </span>

      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.type}>{t.timeline.typeLabel[entry.type]}</span>
          <span className={styles.period}>{copy.period}</span>
        </div>
        <h3 className={styles.role}>{copy.role}</h3>
        <p className={styles.org}>{entry.org}</p>
        <p className={styles.description}>{copy.description}</p>

        {entry.tags?.length > 0 && (
          <div className={styles.tags}>
            {entry.tags.map((tag) => (
              <Tag key={tag} tone={meta.accent}>
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  );
};

export default memo(TimelineItem);
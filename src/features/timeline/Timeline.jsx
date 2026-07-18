import { useRef } from 'react';
import { motion } from 'framer-motion';
import { TIMELINE } from '@/data/timeline';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import TimelineItem from './TimelineItem';
import styles from './Timeline.module.css';

const Timeline = () => {
  const trackRef = useRef(null);
  const { reducedMotion } = useAccessibility();
  const { t } = useTranslation();

  return (
    <section className={`${styles.timeline} section`} id="timeline" aria-label={t.timeline.eyebrow}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.eyebrow}>{t.timeline.eyebrow}</span>
          <h2 className={styles.heading}>
            {t.timeline.headingPre}
            <span className="font-serif">{t.timeline.headingAccent}</span>
          </h2>
        </header>

        <div className={styles.track} ref={trackRef}>
          <div className={styles.trackLine} aria-hidden="true">
            <motion.div
              className={styles.trackLineFill}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <ol className={styles.list}>
            {TIMELINE.map((entry, i) => (
              <TimelineItem key={entry.id} entry={entry} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
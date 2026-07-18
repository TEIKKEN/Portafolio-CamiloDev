import { useEffect, useRef } from 'react';
import { TIMELINE } from '@/data/timeline';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import TimelineItem from './TimelineItem';
import styles from './Timeline.module.css';

const supportsViewTimeline =
  typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: view()');

const Timeline = () => {
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const { reducedMotion } = useAccessibility();
  const { t } = useTranslation();

  // En navegadores con soporte, el llenado en tiempo real lo maneja el
  // CSS de Timeline.module.css vía `animation-timeline: view()` (corre
  // en el compositor). Este efecto es solo el fallback: mismo patrón
  // de throttle-a-rAF que useScrollProgress.js, escribiendo el estilo
  // directo al DOM en vez de re-renderizar React por cada scroll.
  useEffect(() => {
    if (supportsViewTimeline || reducedMotion) return;

    let ticking = false;

    const update = () => {
      const el = trackRef.current;
      if (el && fillRef.current) {
        const rect = el.getBoundingClientRect();
        const total = rect.height + window.innerHeight;
        const scrolled = window.innerHeight - rect.top;
        const progress = Math.min(Math.max(scrolled / total, 0), 1);
        fillRef.current.style.transform = `scaleY(${progress})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [reducedMotion]);

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
            <div ref={fillRef} className={styles.trackLineFill} />
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

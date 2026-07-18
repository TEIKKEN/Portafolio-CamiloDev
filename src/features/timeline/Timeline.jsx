import { useEffect, useRef } from 'react';
import { TIMELINE } from '@/data/timeline';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import TimelineItem from './TimelineItem';
import styles from './Timeline.module.css';

const Timeline = () => {
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const { reducedMotion } = useAccessibility();
  const { t } = useTranslation();

  // rAF-throttled, escribiendo el estilo directo al DOM (sin React
  // state, sin Framer Motion) en vez de re-renderizar por cada frame
  // de scroll.
  //
  // Nota: se descartó `animation-timeline: view()` por dos motivos —
  // (1) `.trackLine` tiene overflow:hidden, y cualquier ancestro con
  // overflow no-visible se vuelve el scroller de referencia del view
  // timeline si no se especifica uno explícito, así que el progreso se
  // calculaba contra `.trackLine` (que nunca scrollea) en vez de la
  // página real, dejando la animación congelada; (2) igual que en
  // ScrollProgressBar, en desktop introducía un retraso perceptible en
  // la respuesta al scroll nativo.
  useEffect(() => {
    if (reducedMotion) return;

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

import { useRef, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import EcosystemFallback from '@/three/scene/EcosystemFallback';
import ErrorBoundary from '@/components/common/ErrorBoundary/ErrorBoundary';
import { useScrollProgress } from '@/three/animations/useScrollProgress';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { usePageReady } from '@/app/context/PageReadyContext';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './Hero.module.css';

const EcosystemCanvas = lazy(() => import('@/three/scene/EcosystemCanvas'));

const Hero = () => {
  const sectionRef = useRef(null);
  const scrollProgress = useScrollProgress(sectionRef);
  const { reducedMotion } = useAccessibility();
  const { ready } = usePageReady();
  const { t } = useTranslation();

  // Precarga el chunk de Three.js EN PARALELO con la cortina de
  // entrada (para no perder tiempo de red), pero sin montarlo/
  // ejecutarlo todavía — eso pasa más abajo, solo cuando `ready` es
  // true, así el trabajo pesado del hilo principal nunca compite con
  // la animación de la cortina.
  useEffect(() => {
    import('@/three/scene/EcosystemCanvas');
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 16 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: reducedMotion ? { duration: 0 } : { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      id="hero"
      aria-label={`${t.hero.titleLine1} ${t.hero.titleLine2}`}
    >
      <div className={styles.canvasWrapper} aria-hidden="true">
        <ErrorBoundary fallback={<EcosystemFallback />}>
          {ready ? (
            <Suspense fallback={<EcosystemFallback />}>
              <EcosystemCanvas scrollRef={scrollProgress} />
            </Suspense>
          ) : (
            <EcosystemFallback />
          )}
        </ErrorBoundary>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          <motion.span custom={0} initial="hidden" animate="visible" variants={textVariants} className={`font-serif ${styles.line}`}>
            {t.hero.titleLine1}
          </motion.span>
          <motion.span custom={1} initial="hidden" animate="visible" variants={textVariants} className={`${styles.titleStrong} ${styles.line}`}>
            {t.hero.titleLine2}
          </motion.span>
        </h1>

        <motion.p className={styles.subtitle} custom={2} initial="hidden" animate="visible" variants={textVariants}>
          {t.hero.subtitle}
        </motion.p>

        <motion.div className={styles.actions} custom={3} initial="hidden" animate="visible" variants={textVariants}>
          <Button variant="primary" as="a" href="#projects" magnetic>
            {t.hero.viewProjects}
          </Button>
          <Button variant="secondary" as="a" href="#contact">
            {t.hero.contact}
          </Button>
        </motion.div>
      </div>

      <motion.button
        type="button"
        className={styles.scrollCue}
        onClick={scrollToNext}
        aria-label={t.hero.scrollCue}
        animate={reducedMotion ? {} : { y: [0, 8, 0] }}
        transition={reducedMotion ? {} : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon icon={ChevronDown} size={20} />
      </motion.button>
    </section>
  );
};

export default Hero;
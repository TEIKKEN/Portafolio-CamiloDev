import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Icon from '@/components/ui/Icon/Icon';
import Tag from '@/components/ui/Tag/Tag';
import Button from '@/components/ui/Button/Button';
import { getAccentVar } from '@/utils/accent';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './FeaturedProjectCard.module.css';

const FeaturedProjectCard = ({ project }) => {
  const { t } = useTranslation();
  const { reducedMotion } = useAccessibility();
  const { id, title, image, video, demoUrl, tech, status, accent } = project;
  const copy = t.projects.items[id];

  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [manuallyPlaying, setManuallyPlaying] = useState(false);
  const videoRef = useRef(null);

  const isPlaying = manuallyPlaying || (!reducedMotion && (hovering || focused));

  const handleToggle = useCallback(() => {
    setManuallyPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    if (isPlaying) {
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
    }
  }, [isPlaying]);

  return (
    <article className={styles.card} style={{ '--card-accent': getAccentVar(accent) }}>
      <div
        className={styles.media}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <img
          src={image}
          alt={`${title} — ${copy.tagline}`}
          loading="lazy"
          decoding="async"
          className={styles.image}
          data-hidden={isPlaying}
        />
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className={styles.video}
          data-hidden={!isPlaying}
        />

        <button
          type="button"
          className={styles.audioToggle}
          onClick={handleToggle}
          aria-pressed={isPlaying}
        >
          <Icon icon={isPlaying ? Volume2 : VolumeX} size={16} />
          {isPlaying ? t.projects.stopExperience : t.projects.playExperience}
        </button>
      </div>

      <div className={styles.body}>
        <span className={styles.eyebrow}>{t.projects.featuredLabel}</span>

        <div className={styles.headerRow}>
          <h3 className={styles.title}>
            <span className="font-serif">{title}</span>
          </h3>
          <span className={styles.status} data-status={status}>
            <span className={styles.statusDot} />
            {t.projects.status[status] ?? status}
          </span>
        </div>

        <p className={styles.tagline}>{copy.tagline}</p>
        <p className={styles.description}>{copy.description}</p>

        {tech.length > 0 && (
          <div className={styles.tags}>
            {tech.map((item) => (
              <Tag key={item} tone={accent}>
                {item}
              </Tag>
            ))}
          </div>
        )}

        <Button
          as="a"
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          magnetic
          className={styles.cta}
        >
          {t.projects.viewDemo}
        </Button>
      </div>
    </article>
  );
};

export default memo(FeaturedProjectCard);

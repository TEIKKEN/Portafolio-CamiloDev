import { memo } from 'react';
import Tag from '@/components/ui/Tag/Tag';
import Button from '@/components/ui/Button/Button';
import { getAccentVar } from '@/utils/accent';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './FeaturedProjectCard.module.css';

const FeaturedProjectCard = ({ project }) => {
  const { t } = useTranslation();
  const { id, title, image, demoUrl, tech, status, accent } = project;
  const copy = t.projects.items[id];

  return (
    <article className={styles.card} style={{ '--card-accent': getAccentVar(accent) }}>
      <div className={styles.media}>
        <img
          src={image}
          alt={`${title} — ${copy.tagline}`}
          loading="lazy"
          decoding="async"
          className={styles.image}
        />
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

import { memo } from 'react';
import { ArrowUpRight, CodeXml } from 'lucide-react';
import Icon from '@/components/ui/Icon/Icon';
import Tag from '@/components/ui/Tag/Tag';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './ProjectCard.module.css';

const ACCENT_VAR = {
  mint: 'var(--color-neo-mint)',
  amber: 'var(--color-soft-amber)',
  coral: 'var(--color-electric-coral)',
  cyan: 'var(--color-ice-cyan)',
};

const ProjectCard = ({ project, index }) => {
  const { t } = useTranslation();
  const { id, title, image, demoUrl, githubUrl, tech, status, accent } = project;
  const copy = t.projects.items[id];

  return (
    <article className={styles.card} style={{ '--card-accent': ACCENT_VAR[accent] }}>
      <div className={styles.media}>
        <img src={image} alt={`${title} — ${copy.tagline}`} loading="lazy" decoding="async" />
        {copy.highlight && <span className={styles.highlightBadge}>{copy.highlight}</span>}
        <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.headerRow}>
          <h3 className={styles.title}>{title}</h3>
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

        <div className={styles.links}>
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <Icon icon={ArrowUpRight} size={16} />
              {t.projects.viewDemo}
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <Icon icon={CodeXml} size={16} />
              {t.projects.code}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default memo(ProjectCard);
import { memo } from 'react';
import { getAccentVar } from '@/utils/accent';
import styles from './Tag.module.css';

/**
 * Tag — `emphasis="primary"` para tecnologías principales (más grande,
 * con fondo tintado). `emphasis="secondary"` (default) para las de apoyo.
 */
const Tag = ({ children, tone = 'mint', emphasis = 'secondary' }) => {
  return (
    <span className={`${styles.tag} ${styles[emphasis]}`} style={{ '--tag-accent': getAccentVar(tone) }}>
      {children}
    </span>
  );
};

export default memo(Tag);
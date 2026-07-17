import { memo } from 'react';
import styles from './Card.module.css';

/**
 * Card — contenedor base para proyectos, timeline items, etc.
 * `hoverable` se desactiva para tarjetas puramente informativas.
 */
const Card = ({ children, hoverable = true, className = '', ...props }) => {
  const classNames = [styles.card, hoverable && styles.hoverable, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

export default memo(Card);

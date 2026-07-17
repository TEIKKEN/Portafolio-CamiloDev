import { memo } from 'react';
import styles from './Icon.module.css';

/**
 * Icon — envuelve cualquier ícono de lucide-react para forzar un
 * stroke-width y tamaño consistentes en todo el sitio.
 *
 * Uso: <Icon icon={ArrowUpRight} size={18} />
 */
const Icon = ({ icon: LucideIcon, size = 20, strokeWidth = 1.75, className = '', ...props }) => {
  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={`${styles.icon} ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
};

export default memo(Icon);

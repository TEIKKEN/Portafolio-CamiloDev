import { useState, useCallback } from 'react';
import styles from './Button.module.css';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useMagnetic } from '@/hooks/useMagnetic';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  as: Component = 'button',
  className = '',
  magnetic = false,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState([]);
  const { reducedMotion } = useAccessibility();
  const magneticRef = useMagnetic(0.3, 70);

  const handleClick = useCallback(
    (event) => {
      if (!reducedMotion) {
        const rect = event.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.6;
        const ripple = {
          id: Date.now(),
          x: event.clientX - rect.left - size / 2,
          y: event.clientY - rect.top - size / 2,
          size,
        };
        setRipples((prev) => [...prev, ripple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
        }, 600);
      }
      onClick?.(event);
    },
    [onClick, reducedMotion]
  );

  const classNames = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={magnetic ? magneticRef : undefined}
      className={classNames}
      onClick={handleClick}
      {...props}
    >
      <span className={styles.label}>{children}</span>
      <span className={styles.rippleContainer} aria-hidden="true">
        {ripples.map((r) => (
          <span
            key={r.id}
            className={styles.ripple}
            style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          />
        ))}
      </span>
    </Component>
  );
};

export default Button;
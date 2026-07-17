import { cloneElement, useState, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import styles from './Tooltip.module.css';

const Tooltip = ({ children, label, side = 'top' }) => {
  const [visible, setVisible] = useState(false);
  const { reducedMotion } = useAccessibility();
  const id = useId();

  const trigger = cloneElement(children, {
    'aria-describedby': id,
    onMouseEnter: (e) => {
      children.props.onMouseEnter?.(e);
      setVisible(true);
    },
    onMouseLeave: (e) => {
      children.props.onMouseLeave?.(e);
      setVisible(false);
    },
    onFocus: (e) => {
      children.props.onFocus?.(e);
      setVisible(true);
    },
    onBlur: (e) => {
      children.props.onBlur?.(e);
      setVisible(false);
    },
  });

  return (
    <span className={styles.wrapper}>
      {trigger}
      <AnimatePresence>
        {visible && (
          <motion.span
            id={id}
            role="tooltip"
            className={styles.tooltip}
            data-side={side}
            initial={{ opacity: 0, y: reducedMotion ? 0 : side === 'top' ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.15 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default Tooltip;
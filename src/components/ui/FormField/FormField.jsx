import { forwardRef } from 'react';
import styles from './FormField.module.css';

const FormField = forwardRef(({ label, name, error, as = 'input', type = 'text', rows = 5, ...props }, ref) => {
  const Component = as === 'textarea' ? 'textarea' : 'input';
  const errorId = `${name}-error`;

  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <Component
        id={name}
        name={name}
        ref={ref}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        {...(as === 'textarea' ? { rows } : { type })}
        {...props}
      />
      <div className={styles.errorSlot}>
        {error && (
          <span id={errorId} role="alert" className={styles.errorText}>
            {error}
          </span>
        )}
      </div>
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;
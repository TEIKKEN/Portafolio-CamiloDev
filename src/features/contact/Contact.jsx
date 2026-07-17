import { AnimatePresence, motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import FormField from '@/components/ui/FormField/FormField';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useContactForm } from './useContactForm';
import styles from './Contact.module.css';

const Contact = () => {
  const { reducedMotion } = useAccessibility();
  const { t } = useTranslation();
  const { form, status, errorMessage, onSubmit, resetStatus } = useContactForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const isSubmitting = status === 'submitting';
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] };

  return (
    <section className={`${styles.contact} section`} id="contact" aria-label={t.contact.eyebrow}>
      <div className="container container--narrow">
        <header className={styles.header}>
          <span className={styles.eyebrow}>{t.contact.eyebrow}</span>
          <h2 className={styles.heading}>
            {t.contact.headingPre}
            <span className="font-serif">{t.contact.headingAccent}</span>
          </h2>
          <p className={styles.subheading}>{t.contact.subheading}</p>
        </header>

        <div className={styles.formWrapper}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                className={styles.statusPanel}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={transition}
              >
                <span className={styles.statusIcon}>
                  <Icon icon={CheckCircle2} size={28} />
                </span>
                <h3 className={styles.statusTitle}>{t.contact.successTitle}</h3>
                <p className={styles.statusText}>{t.contact.successText}</p>
                <Button variant="secondary" onClick={resetStatus}>
                  {t.contact.sendAnother}
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={transition}
                noValidate
              >
                {/* Honeypot — invisible para personas, visible para bots que llenan
                    todos los inputs a ciegas. */}
                <div className="visually-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input type="text" id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
                </div>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      className={styles.errorBanner}
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={transition}
                    >
                      <Icon icon={AlertCircle} size={18} />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={styles.row}>
                  <FormField
                    label={t.contact.fields.name.label}
                    placeholder={t.contact.fields.name.placeholder}
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <FormField
                    label={t.contact.fields.email.label}
                    type="email"
                    placeholder={t.contact.fields.email.placeholder}
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>

                <FormField
                  label={t.contact.fields.subject.label}
                  placeholder={t.contact.fields.subject.placeholder}
                  error={errors.subject?.message}
                  {...register('subject')}
                />

                <FormField
                  label={t.contact.fields.message.label}
                  as="textarea"
                  rows={6}
                  placeholder={t.contact.fields.message.placeholder}
                  error={errors.message?.message}
                  {...register('message')}
                />

                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Icon icon={Loader2} size={18} className={styles.spinner} />
                      {t.contact.submitting}
                    </>
                  ) : (
                    <>
                      <Icon icon={Send} size={18} />
                      {t.contact.submit}
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;
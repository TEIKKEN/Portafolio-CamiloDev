import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle, ChevronDown, Check } from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import FormField from '@/components/ui/FormField/FormField';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useSelectedPlan } from '@/app/context/SelectedPlanContext';
import { useTranslation } from '@/hooks/useTranslation';
import { PRICING_PLANS } from '@/data/pricing';
import { getAccentVar } from '@/utils/accent';
import { useContactForm } from './useContactForm';
import styles from './Contact.module.css';

const Contact = () => {
  const { reducedMotion } = useAccessibility();
  const { selectedPlanId, setSelectedPlanId } = useSelectedPlan();
  const { t } = useTranslation();
  const { form, status, errorMessage, onSubmit, resetStatus } = useContactForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const isSubmitting = status === 'submitting';
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] };

  const selectedPlan = PRICING_PLANS.find((plan) => plan.id === selectedPlanId) ?? null;
  const selectedPlanCopy = selectedPlan ? t.investment.plans[selectedPlan.id] : null;

  const pickPlan = (planId) => {
    setSelectedPlanId(planId);
    setIsPickerOpen(false);
  };

  const removeSelection = () => {
    setSelectedPlanId(null);
    setIsPickerOpen(false);
  };

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

                <AnimatePresence>
                  {selectedPlan && selectedPlanCopy && (
                    <motion.div
                      className={styles.selectedPlan}
                      style={{ '--selected-plan-accent': getAccentVar(selectedPlan.accent) }}
                      initial={{ opacity: 0, y: reducedMotion ? 0 : -10, scale: reducedMotion ? 1 : 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: reducedMotion ? 0 : -10, scale: reducedMotion ? 1 : 0.98 }}
                      transition={transition}
                    >
                      <div className={styles.selectedPlanRow}>
                        <span className={styles.selectedPlanDot} aria-hidden="true" />
                        <div className={styles.selectedPlanInfo}>
                          <span className={styles.selectedPlanLabel}>
                            {t.contact.selectedPlan.label}
                          </span>
                          <p className={styles.selectedPlanName}>
                            {selectedPlanCopy.title} — {t.investment.priceFromLabel} $
                            {selectedPlan.priceFrom.toLocaleString('en-US')} USD
                          </p>
                          <p className={styles.selectedPlanHint}>{t.contact.selectedPlan.hint}</p>
                        </div>
                        <button
                          type="button"
                          className={styles.selectedPlanChange}
                          onClick={() => setIsPickerOpen((open) => !open)}
                          aria-expanded={isPickerOpen}
                          aria-controls="plan-picker-list"
                          aria-label={`${t.contact.selectedPlan.change} — ${selectedPlanCopy.title}`}
                        >
                          {t.contact.selectedPlan.change}
                          <Icon
                            icon={ChevronDown}
                            size={14}
                            className={isPickerOpen ? styles.selectedPlanChangeIconOpen : undefined}
                          />
                        </button>
                      </div>

                      <AnimatePresence>
                        {isPickerOpen && (
                          <motion.div
                            id="plan-picker-list"
                            className={styles.planPicker}
                            initial={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
                            transition={transition}
                          >
                            <ul className={styles.planPickerList} aria-label={t.contact.selectedPlan.pickerLabel}>
                              {PRICING_PLANS.map((plan) => {
                                const planCopy = t.investment.plans[plan.id];
                                const isCurrent = plan.id === selectedPlan.id;
                                return (
                                  <li key={plan.id}>
                                    <button
                                      type="button"
                                      className={styles.planPickerItem}
                                      style={{ '--plan-picker-accent': getAccentVar(plan.accent) }}
                                      onClick={() => pickPlan(plan.id)}
                                      aria-current={isCurrent ? 'true' : undefined}
                                    >
                                      <span className={styles.planPickerDot} aria-hidden="true" />
                                      <span className={styles.planPickerName}>
                                        {planCopy.title}
                                        <span className={styles.planPickerPrice}>
                                          {t.investment.priceFromLabel} $
                                          {plan.priceFrom.toLocaleString('en-US')}
                                        </span>
                                      </span>
                                      {isCurrent && (
                                        <Icon icon={Check} size={16} className={styles.planPickerCheck} />
                                      )}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                            <button type="button" className={styles.planPickerRemove} onClick={removeSelection}>
                              {t.contact.selectedPlan.removeSelection}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
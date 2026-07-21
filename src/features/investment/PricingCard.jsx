import { memo } from 'react';
import { Clock } from 'lucide-react';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import { getAccentVar } from '@/utils/accent';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useSelectedPlan } from '@/app/context/SelectedPlanContext';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './PricingCard.module.css';

const PricingCard = ({ plan }) => {
  const { reducedMotion } = useAccessibility();
  const { setSelectedPlanId } = useSelectedPlan();
  const { t } = useTranslation();
  const { id, priceFrom, accent, featured } = plan;
  const copy = t.investment.plans[id];

  const requestThisPlan = () => {
    setSelectedPlanId(id);
    document
      .getElementById('contact')
      ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <Card
      hoverable={false}
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      style={{ '--card-accent': getAccentVar(accent) }}
    >
      {featured && (
        <span className={styles.featuredBadge}>
          {t.investment.featuredLabel}
        </span>
      )}

      <h4 className={styles.title}>{copy.title}</h4>

      <p className={styles.price}>
        <span className={styles.priceLabel}>{t.investment.priceFromLabel}</span>
        <span className={styles.priceValue}>
          ${priceFrom.toLocaleString('en-US')}
        </span>
        <span className={styles.priceCurrency}>USD</span>
      </p>

      <p className={styles.estimatedTime}>
        <Icon icon={Clock} size={14} />
        <span className="visually-hidden">{t.investment.estimatedTimeLabel}: </span>
        {copy.estimatedTime}
      </p>

      {copy.idealFor && (
        <div className={styles.block}>
          <span className={styles.blockLabel}>
            {t.investment.idealForLabel}
          </span>
          <p className={styles.idealForText}>{copy.idealFor.join(', ')}</p>
        </div>
      )}

      <div className={styles.block}>
        <span className={styles.blockLabel}>{t.investment.includesLabel}</span>
        <ul className={styles.includesList}>
          {copy.includes.map((entry) => (
            <li key={entry} className={styles.includesItem}>
              {entry}
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant="secondary"
        size="md"
        className={styles.requestButton}
        style={{ '--btn-accent': 'var(--card-accent)' }}
        onClick={requestThisPlan}
        aria-label={`${t.investment.requestPlan} — ${copy.title}`}
      >
        {t.investment.requestPlan}
      </Button>
    </Card>
  );
};

export default memo(PricingCard);

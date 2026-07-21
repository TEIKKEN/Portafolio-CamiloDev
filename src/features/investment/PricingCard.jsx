import { memo } from 'react';
import Card from '@/components/ui/Card/Card';
import { getAccentVar } from '@/utils/accent';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './PricingCard.module.css';

const PricingCard = ({ plan }) => {
  const { t } = useTranslation();
  const { id, priceFrom, accent, featured } = plan;
  const copy = t.investment.plans[id];

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

      <h3 className={styles.title}>{copy.title}</h3>

      <p className={styles.price}>
        <span className={styles.priceLabel}>{t.investment.priceFromLabel}</span>
        <span className={styles.priceValue}>
          ${priceFrom.toLocaleString('en-US')}
        </span>
        <span className={styles.priceCurrency}>USD</span>
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
    </Card>
  );
};

export default memo(PricingCard);

import { memo } from 'react';
import Card from '@/components/ui/Card/Card';
import Tag from '@/components/ui/Tag/Tag';
import { getAccentVar } from '@/utils/accent';
import { useEcosystemActivity } from '@/app/context/EcosystemActivityContext';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './SkillCard.module.css';

const SkillCard = ({ category }) => {
  const { setActiveMode } = useEcosystemActivity();
  const { t } = useTranslation();
  const { id, index, label, accent, primary, secondary, groups } = category;
  const copy = t.skills.categories[id];
  const resolvedSecondary = copy.secondary ?? secondary;

  return (
    <Card
      hoverable={false}
      className={styles.card}
      style={{ '--card-accent': getAccentVar(accent) }}
      onMouseEnter={() => setActiveMode(id)}
      onMouseLeave={() => setActiveMode(null)}
    >
      <span className={styles.index}>{index}</span>

      <div className={styles.categoryHeader}>
        <span className={styles.dot} />
        <h3 className={styles.categoryLabel}>{label}</h3>
      </div>

      <p className={styles.description}>{copy.description}</p>

      {groups ? (
        <div className={styles.groups}>
          {groups.map((group) => (
            <div key={group.id} className={styles.group}>
              <span className={styles.groupLabel}>{t.skills.categories.workflow.groups[group.id]}</span>
              <div className={styles.chips}>
                {group.tools.map((tool) => (
                  <Tag key={tool} tone={accent} emphasis="secondary">
                    {tool}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.chips}>
          {primary?.map((skill) => (
            <Tag key={skill} tone={accent} emphasis="primary">
              {skill}
            </Tag>
          ))}
          {resolvedSecondary?.map((skill) => (
            <Tag key={skill} tone={accent} emphasis="secondary">
              {skill}
            </Tag>
          ))}
        </div>
      )}
    </Card>
  );
};

export default memo(SkillCard);
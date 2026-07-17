import { motion } from 'framer-motion';
import { PROJECTS } from '@/data/projects';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = (reducedMotion) => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: reducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
});

const Projects = () => {
  const { reducedMotion } = useAccessibility();
  const { t } = useTranslation();

  return (
    <section className={`${styles.projects} section`} id="projects" aria-label={t.projects.eyebrow}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t.projects.eyebrow}</span>
          <h2 className={styles.heading}>
            {t.projects.headingPre}
            <span className="font-serif">{t.projects.headingAccent}</span>
            {t.projects.headingPost}
          </h2>
        </div>

        <motion.div
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PROJECTS.map((project, index) => (
            <motion.div key={project.id} variants={item(reducedMotion)}>
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
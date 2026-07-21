import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import Icon from '@/components/ui/Icon/Icon';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/TEIKKEN' },
  { label: 'LinkedIn', href: '#' }, // [CONFIRMAR] tu URL real de LinkedIn
];

const QUICK_LINKS = [
  { href: '#hero', id: 'hero' },
  { href: '#about', id: 'about' },
  { href: '#projects', id: 'projects' },
  { href: '#timeline', id: 'timeline' },
  { href: '#investment', id: 'investment' },
  { href: '#contact', id: 'contact' },
];

const EMAIL = 'camilocuchitini9@gmail.com';

const Footer = () => {
  const { reducedMotion } = useAccessibility();
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      }
    >
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>CamiloDev</span>
            <p className={styles.tagline}>{t.footer.tagline}</p>
          </div>

          <nav className={styles.quickNav} aria-label={t.footer.navTitle}>
            <span className={styles.columnTitle}>{t.footer.navTitle}</span>
            <ul className={styles.linkList}>
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {t.nav.links[link.id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contactColumn}>
            <span className={styles.columnTitle}>{t.footer.contactTitle}</span>
            <ul className={styles.linkList}>
              <li>
                <a href={`mailto:${EMAIL}`} className={styles.link}>
                  <Icon icon={Mail} size={14} />
                  {EMAIL}
                </a>
              </li>
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {social.label}
                    <Icon icon={ArrowUpRight} size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} CamiloDev. {t.footer.rights}
          </p>
          <p className={styles.builtWith}>{t.footer.builtWith}</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

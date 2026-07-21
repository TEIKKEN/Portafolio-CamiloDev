import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Languages } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import Icon from '@/components/ui/Icon/Icon';
import logoImg from '@/assets/images/Logonav.png';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '#hero', id: 'hero' },
  { href: '#about', id: 'about' },
  { href: '#projects', id: 'projects' },
  { href: '#timeline', id: 'timeline' },
  { href: '#investment', id: 'investment' },
  { href: '#contact', id: 'contact' },
];
const NAV_IDS = NAV_LINKS.map((l) => l.id);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(NAV_IDS);
  const { reducedMotion } = useAccessibility();
  const { t, language, toggleLanguage } = useTranslation();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 767) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const navigateTo = (id) => {
    setMobileOpen(false);
    document.body.style.overflow = '';
    requestAnimationFrame(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a
          href="#hero"
          className={styles.logo}
          aria-label="Ir al inicio"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('hero');
          }}
        >
          <img src={logoImg} alt="" className={styles.logoImg} />
          CamiloDev
        </a>

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.links}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.link}
                  data-active={activeId === link.id}
                  aria-current={activeId === link.id ? 'true' : undefined}
                >
                  {t.nav.links[link.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href="#contact" className={styles.cta}>
            {t.nav.availableForWork}
          </a>

          <button
            type="button"
            className={styles.langToggle}
            onClick={toggleLanguage}
            aria-label={t.nav.toggleLanguage}
          >
            <Icon icon={Languages} size={16} />
            <span>{language === 'es' ? 'EN' : 'ES'}</span>
          </button>

          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            <Icon icon={mobileOpen ? X : Menu} size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-panel"
            className={styles.mobilePanel}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <ul className={styles.mobileLinks}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    className={styles.mobileLink}
                    data-active={activeId === link.id}
                    onClick={() => navigateTo(link.id)}
                  >
                    {t.nav.links[link.id]}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={styles.mobileCta}
              onClick={() => navigateTo('contact')}
            >
              {t.nav.availableForWork}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

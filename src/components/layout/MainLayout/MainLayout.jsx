import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/features/footer/Footer';
import AccessibilityPanel from '@/components/accessibility/AccessibilityPanel';
import ReadingGuide from '@/components/accessibility/ReadingGuide';
import ReadingMask from '@/components/accessibility/ReadingMask';
import LiveRegion from '@/components/accessibility/LiveRegion';
import CustomCursor from '@/components/common/CustomCursor/CustomCursor';
import ScrollProgressBar from '@/components/common/ScrollProgressBar/ScrollProgressBar';
import ScrollToTop from '@/components/common/ScrollToTop/ScrollToTop';
import PageTransition from '@/components/common/PageTransition/PageTransition';
import { useAccessibilityShortcuts } from '@/hooks/useAccessibilityShortcuts';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
  useAccessibilityShortcuts();

  return (
    <div className={styles.layout}>
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      <PageTransition />
      <ScrollProgressBar />
      <CustomCursor />
      <Navbar />
      <main id="main-content" className={styles.main}>
        {children}
      </main>
      <Footer />
      <ReadingGuide />
      <ReadingMask />
      <AccessibilityPanel />
      <ScrollToTop />
      <LiveRegion />
    </div>
  );
};

export default MainLayout;
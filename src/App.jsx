import { lazy, Suspense, useRef } from 'react';
import MainLayout from '@/components/layout/MainLayout/MainLayout';
import Hero from '@/features/hero/Hero';
import Seo from '@/components/common/Seo/Seo';
import { useSequentialPrefetch } from '@/hooks/useSequentialPrefetch';

const About = lazy(() => import('@/features/About/About'));
const Projects = lazy(() => import('@/features/projects/Projects'));
const Timeline = lazy(() => import('@/features/timeline/Timeline'));
const Skills = lazy(() => import('@/features/skills/Skills'));
const Investment = lazy(() => import('@/features/investment/Investment'));
const Contact = lazy(() => import('@/features/contact/Contact'));

// Fuera del componente: referencia estable, no se recrea en cada render
// (mismo motivo por el que sacamos NAV_IDS del Navbar en la Fase 12).
const IMPORTERS = [
  () => import('@/features/About/About'),
  () => import('@/features/projects/Projects'),
  () => import('@/features/timeline/Timeline'),
  () => import('@/features/skills/Skills'),
  () => import('@/features/investment/Investment'),
  () => import('@/features/contact/Contact'),
];

function App() {
  const sentinelRef = useRef(null);
  useSequentialPrefetch(sentinelRef, IMPORTERS);

  return (
    <MainLayout>
      <Seo />
      <Hero />
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 1 }} />
      <Suspense fallback={null}>
        <About />
      </Suspense>
      <Suspense fallback={null}>
        <Projects />
      </Suspense>
      <Suspense fallback={null}>
        <Timeline />
      </Suspense>
      <Suspense fallback={null}>
        <Skills />
      </Suspense>
      <Suspense fallback={null}>
        <Investment />
      </Suspense>
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </MainLayout>
  );
}

export default App;

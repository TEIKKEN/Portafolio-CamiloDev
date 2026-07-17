import { lazy, Suspense, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout/MainLayout';
import Hero from '@/features/hero/Hero';
import Seo from '@/components/common/Seo/Seo';

const About = lazy(() => import('@/features/About/About'));
const Projects = lazy(() => import('@/features/projects/Projects'));
const Timeline = lazy(() => import('@/features/timeline/Timeline'));
const Skills = lazy(() => import('@/features/skills/Skills'));
const Contact = lazy(() => import('@/features/contact/Contact'));

function usePrefetchBelowFold() {
  useEffect(() => {
    const prefetch = () => {
      import('@/features/About/About');
      import('@/features/projects/Projects');
      import('@/features/timeline/Timeline');
      import('@/features/skills/Skills');
      import('@/features/contact/Contact');
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(prefetch, 1500);
    return () => clearTimeout(timer);
  }, []);
}

function App() {
  usePrefetchBelowFold();

  return (
    <MainLayout>
      <Seo />
      <Hero />
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
        <Contact />
      </Suspense>
    </MainLayout>
  );
}

export default App;
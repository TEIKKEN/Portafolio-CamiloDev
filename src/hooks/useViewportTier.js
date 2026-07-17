import { useEffect, useState } from 'react';
import { BREAKPOINTS } from '@/constants/breakpoints';

/**
 * Clasifica el viewport en un tier discreto. El Ecosystem 3D lo usa
 * para reducir carga en pantallas chicas en vez de renderizar la misma
 * escena "desktop" en un teléfono.
 */
export function useViewportTier() {
  const [tier, setTier] = useState(getTier());

  useEffect(() => {
    const handleResize = () => setTier(getTier());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return tier;
}

function getTier() {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width <= BREAKPOINTS.mobile) return 'mobile';
  if (width <= BREAKPOINTS.tablet) return 'tablet';
  return 'desktop';
}
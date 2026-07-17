import { useEffect, useState } from 'react';

/**
 * Esta es la pieza clave para que el objeto 3D sea accesible: el motion
 * de WebGL corre en JS, no en CSS, así que el token --duration-* de la
 * Fase 3 no lo alcanza. Este hook sí lo detiene de verdad.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const handler = (e) => setReduced(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return reduced;
}
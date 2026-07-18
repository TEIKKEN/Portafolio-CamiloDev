import { useEffect, useRef } from 'react';

/**
 * Precarga los chunks below-the-fold DE A UNO, en orden, esperando a
 * que cada import() resuelva antes de empezar el siguiente — en vez
 * de dispararlos todos en paralelo (que es lo que hacíamos antes con
 * requestIdleCallback). En un celular con CPU limitada, 5 chunks
 * compitiendo a la vez por el mismo hilo principal es justo lo que
 * congela la página y después "suelta" todo junto. Cargando de a
 * uno, el trabajo se reparte en el tiempo en vez de apilarse.
 *
 * Arranca cuando el `sentinelRef` se acerca al viewport, no de
 * inmediato — así no compite con el trabajo inicial del Hero
 * (fuentes, el objeto 3D) mientras todavía está asentándose.
 */
export function useSequentialPrefetch(sentinelRef, importers) {
  const startedRef = useRef(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const runSequentially = async () => {
      for (const importer of importers) {
        try {
          await importer();
        } catch {
          // Si uno falla (ej. se cortó la red un instante), seguimos
          // con el resto — Suspense lo reintenta solo cuando haga falta.
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          runSequentially();
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sentinelRef, importers]);
}
import { useEffect, useState, useRef } from 'react';

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const observedIdsRef = useRef(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    // Projects/Timeline/Skills/Contact se cargan diferido (Fase 11) —
    // puede que no existan en el DOM todavía cuando este observer se
    // crea. Reintentamos encontrarlas hasta 10s en vez de buscar una
    // sola vez al montar.
    let attempts = 0;
    const maxAttempts = 40;
    let timeoutId;

    const tryObserve = () => {
      sectionIds.forEach((id) => {
        if (observedIdsRef.current.has(id)) return;
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          observedIdsRef.current.add(id);
        }
      });

      attempts++;
      if (observedIdsRef.current.size < sectionIds.length && attempts < maxAttempts) {
        timeoutId = window.setTimeout(tryObserve, 250);
      }
    };

    tryObserve();

    return () => {
      window.clearTimeout(timeoutId);
      observer.disconnect();
      observedIdsRef.current = new Set();
    };
  }, [sectionIds]);

  return activeId;
}
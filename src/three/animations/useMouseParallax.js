import { useEffect, useRef } from 'react';

export function useMouseParallax() {
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      // Ignoramos touch a propósito: un dedo arrastrando por la pantalla
      // no debería mover la "cámara" del objeto como si fuera un mouse.
      if (event.pointerType === 'touch') return;
      target.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return target;
}
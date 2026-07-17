import { useAccessibility } from '@/app/context/AccessibilityContext';

/**
 * Región aria-live global. Cuando cualquier toggle llama a announce(),
 * un lector de pantalla lo lee sin mover el foco del usuario.
 */
const LiveRegion = () => {
  const { announcement } = useAccessibility();
  return (
    <div aria-live="polite" aria-atomic="true" className="visually-hidden">
      {announcement}
    </div>
  );
};

export default LiveRegion;
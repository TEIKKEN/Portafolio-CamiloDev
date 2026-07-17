import { createContext, useContext, useState, useMemo } from 'react';

const EcosystemActivityContext = createContext(null);

/**
 * Puente entre las Skills cards y el objeto 3D del Hero — viven en
 * secciones distintas, así que necesitan un estado compartido fuera
 * de ambas. `activeMode` es el `id` de la categoría de Skills bajo
 * el mouse ('frontend' | '3d-motion' | 'accessibility' | 'workflow'),
 * o null si no hay hover.
 */
export const EcosystemActivityProvider = ({ children }) => {
  const [activeMode, setActiveMode] = useState(null);
  const api = useMemo(() => ({ activeMode, setActiveMode }), [activeMode]);

  return <EcosystemActivityContext.Provider value={api}>{children}</EcosystemActivityContext.Provider>;
};

export function useEcosystemActivity() {
  const ctx = useContext(EcosystemActivityContext);
  if (!ctx) {
    throw new Error('useEcosystemActivity debe usarse dentro de <EcosystemActivityProvider>');
  }
  return ctx;
}